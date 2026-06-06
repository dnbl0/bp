import NextDocument, {
    DocumentContext,
    DocumentInitialProps,
    Head,
    Html,
    Main,
    NextScript,
} from 'next/document'
import Script from 'next/script'
import { getTealiumEnvironment } from '../utils/getTealiumEnvironment'

type Props = DocumentInitialProps & {
    isContentfulAppRoute: boolean
}

export default function Document({ isContentfulAppRoute }: Props) {
    // The document component is only rendered on the server.
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
        ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
        : '';

    const ScriptsToLoad = () => {
        
    }

    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href={`${baseUrl}/favicon.ico?v=2`} type="image/x-icon" />
            </Head>
            <body>
                    <Script 
                        id="gtm-data-layer" 
                        strategy="beforeInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `window.dataLayer = window.dataLayer || [];`
                        }}
                    />
                    
                {!isContentfulAppRoute && process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
                    <Script
                        id="google-tag-manager"
                        strategy="beforeInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}');`
                        }}
                    />
                )}

                {!isContentfulAppRoute && process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
                    <noscript
                        dangerouslySetInnerHTML={{
                            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}"
                                height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                        }}
                    />
                )}

                {!isContentfulAppRoute && 
                    <Script
                        src="https://www.youtube.com/iframe_api"
                        strategy="beforeInteractive"
                    />
                }

                {!isContentfulAppRoute &&
                    <Script 
                        id="tealium-utag-data" 
                        strategy="beforeInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `var utag_data = {
                            "ip_address"           : "101.161.82.243",
                            "member_auth_state"    : "loggedOut",
                            "page_name"            : "bupaagedcare:",
                            "page_type"            : "home",
                            "previous_page_name"   : "",
                            "server"               : "",
                            "site"                 : "bupa",
                            "site_section"         : "",
                            "site_section_level1"  : "",
                            "site_section_level2"  : "",
                            "site_display_format"  : ""
                            };`
                        }}
                    />
                }
                {!isContentfulAppRoute && 
                    <Script
                        id="tealium-utag"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `(function(a,b,c,d){
                            a='//tags.tiqcdn.com/utag/bupa.au/main/${getTealiumEnvironment()}/utag.js';
                            b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
                            a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
                            })();`
                        }}
                    />
                }

                {!isContentfulAppRoute && 
                    <Script
                        id="nebula-survey"
                        strategy="afterInteractive"
                        src="https://nebula-cdn.kampyle.com/au/wau/246189/onsite/embed.js"
                        async
                    />
                }

                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

Document.getInitialProps = async (
    ctx: DocumentContext
): Promise<Props> => {
    const initialProps = await NextDocument.getInitialProps(ctx)

    return {
        ...initialProps,
        isContentfulAppRoute: ctx.pathname.startsWith('/contentful-app/'),
    }
}
