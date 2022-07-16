main();

async function main() {
    await loadExternalScript('https://api.mapy.cz/loader.js');
    
    window.Loader.async = true;
    await new Promise(resolve => window.Loader.load(null, null, resolve));

    console.log('tadaaaaa');
}
  
function loadExternalScript(url) {
    return new Promise((resolve) => {
        const scriptElement = document.createElement('script');
        scriptElement.setAttribute('async', 'true');    
        document.head.appendChild(scriptElement);
        scriptElement.setAttribute('src', url);
        scriptElement.onload = function scriptOnLoad() {
            resolve();
        };
    });
}