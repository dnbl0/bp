export const loadScript = (src: string, async = false, type = "text/javascript") =>
    new Promise((resolve, reject) => {
        try {
            const scriptEle = document.createElement("script");
            scriptEle.type = type;
            scriptEle.async = async;
            scriptEle.src = src;

            scriptEle.addEventListener("load", event => {
                resolve({ sfLoaded: true });
            });

            scriptEle.addEventListener("error", event => {
                reject({
                    sfLoaded: false,
                    message: `Failed to load the script ＄{src}`,
                });
            });

            document.body.appendChild(scriptEle);
        } catch (error) {
            reject(error);
        }
    });
