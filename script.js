main();

async function main() {
    let navOpen = false;
    const nav = document.querySelector('nav');
    function toggleNav() {
      navOpen = !navOpen;
      nav.classList[navOpen ? 'add' : 'remove']('menu-expanded');
    }

    const burgerBtn = nav.querySelector('.burger a');
    burgerBtn.addEventListener('click', toggleNav);

    const navElements = nav.querySelectorAll('li');
    navElements.forEach(elm => elm.addEventListener('click', event => {
        const element = document.querySelector(event.target.hash);
        const scrollTargetOffset = element.getBoundingClientRect().top - 75;

        document.documentElement.clientWidth < 701 && toggleNav();
        setTimeout(() => window.scrollBy({
            top: scrollTargetOffset,
            behavior: 'smooth',
        }));

        event.preventDefault();
    }));

    await initMap();
}

async function initMap() {
    await loadExternalScript('https://api.mapy.cz/loader.js');
    
    window.Loader.async = true;
    await new Promise(resolve => window.Loader.load(null, null, resolve));

    const mapCenter = window.SMap.Coords.fromWGS84(14.74, 49.769);

    const viewportWidth = document.documentElement.clientWidth;
    let zoomLevel = viewportWidth > 1000 ? 13 : 12;
    if (viewportWidth < 700) (zoomLevel = 11);
    const map = new window.SMap(JAK.gel("map"), mapCenter, zoomLevel);
    map.addDefaultLayer(SMap.DEF_BASE).enable();
    map.addDefaultControls();
    
    const markerLayer = new SMap.Layer.Marker(undefined);
    map.addLayer(markerLayer);
    markerLayer.enable();

    const pecinovTitle = new SMap.Card();
    pecinovTitle.getHeader().innerHTML = '<h3>Dvůr Pecínov</h3>';
    pecinovTitle.getBody().innerHTML = 'Místo svatby';

    const pecinovCoords = window.SMap.Coords.fromWGS84(14.7349, 49.75);
    const pecinovMarker = new SMap.Marker(pecinovCoords, 'dvurPecinov');
    pecinovMarker.decorate(SMap.Marker.Feature.Card, pecinovTitle);
    markerLayer.addMarker(pecinovMarker);

    const struharovTitle = new SMap.Card();
    struharovTitle.getHeader().innerHTML = '<h3>Vlaková zastávka</h3>';
    struharovTitle.getBody().innerHTML = 've Struhařově, kde vás rádi vyzvedneme autem';

    const struharovCoords = window.SMap.Coords.fromWGS84(14.7493, 49.7621);
    const struharovMarker = new SMap.Marker(struharovCoords, 'struharovZastavka', {});
    struharovMarker.decorate(SMap.Marker.Feature.Card, struharovTitle);
    markerLayer.addMarker(struharovMarker);
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