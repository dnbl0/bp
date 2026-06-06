/*
    Client-side export of an SVG mark to SVG, PNG or JPEG, with no dependencies.

    - SVG: serialise the live <svg> element and download it.
    - PNG / JPEG: rasterise the serialised SVG onto a canvas. JPEG has no
      transparency, so the canvas is filled white first.

    Marks that contain <text> (the Bupa wordmark) need their font to render in
    the exported file, so the Montserrat web font is fetched once, base64
    encoded and embedded as an @font-face — keeping the export self-contained.
*/
export type MarkFormat = 'svg' | 'png' | 'jpeg'

const FONT_URL = '/fonts/montserrat/static/Montserrat-Bold.ttf'
let cachedFontCss: string | null | undefined

const toBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer)
    let binary = ''
    const chunk = 0x8000
    for (let i = 0; i < bytes.length; i += chunk) {
        binary += String.fromCharCode(
            ...(bytes.subarray(i, i + chunk) as unknown as number[])
        )
    }
    return btoa(binary)
}

const getFontCss = async (): Promise<string> => {
    if (cachedFontCss !== undefined) return cachedFontCss ?? ''
    try {
        const response = await fetch(FONT_URL)
        const base64 = toBase64(await response.arrayBuffer())
        cachedFontCss = `@font-face{font-family:'Montserrat';font-style:normal;font-weight:700;src:url(data:font/ttf;base64,${base64}) format('truetype');}`
    } catch {
        cachedFontCss = null
    }
    return cachedFontCss ?? ''
}

const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = filename
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
}

const exportDimensions = (svg: SVGSVGElement, target: number) => {
    const box = svg.viewBox?.baseVal
    const width = box?.width || Number(svg.getAttribute('width')) || target
    const height = box?.height || Number(svg.getAttribute('height')) || target
    const scale = target / Math.max(width, height)
    return { width: Math.round(width * scale), height: Math.round(height * scale) }
}

const serialize = (svg: SVGSVGElement, fontCss: string): string => {
    const clone = svg.cloneNode(true) as SVGSVGElement
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    clone.removeAttribute('class')
    if (fontCss) {
        const style = document.createElementNS('http://www.w3.org/2000/svg', 'style')
        style.textContent = fontCss
        clone.insertBefore(style, clone.firstChild)
    }
    return new XMLSerializer().serializeToString(clone)
}

const rasterize = async (
    serialized: string,
    width: number,
    height: number,
    format: 'png' | 'jpeg'
): Promise<Blob> => {
    const image = new Image()
    const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(serialized)}`
    await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve()
        image.onerror = () => reject(new Error('Could not load the SVG for export'))
        image.src = url
    })

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas is not supported')
    if (format === 'jpeg') {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, width, height)
    }
    ctx.drawImage(image, 0, 0, width, height)

    return new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
            blob => (blob ? resolve(blob) : reject(new Error('Export failed'))),
            format === 'jpeg' ? 'image/jpeg' : 'image/png',
            0.95
        )
    )
}

/** Download a rendered SVG mark in the requested format. */
export const downloadMark = async (
    svg: SVGSVGElement,
    name: string,
    format: MarkFormat,
    size = 512
): Promise<void> => {
    const fontCss = svg.querySelector('text') ? await getFontCss() : ''
    const serialized = serialize(svg, fontCss)

    if (format === 'svg') {
        triggerDownload(
            new Blob([serialized], { type: 'image/svg+xml;charset=utf-8' }),
            `${name}.svg`
        )
        return
    }

    const { width, height } = exportDimensions(svg, size)
    const blob = await rasterize(serialized, width, height, format)
    triggerDownload(blob, `${name}.${format === 'jpeg' ? 'jpg' : 'png'}`)
}
