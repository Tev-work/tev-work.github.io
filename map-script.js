main();

async function main() {
    await loadExternalScript('https://api.mapy.cz/loader.js');
    
    window.Loader.async = true;
    await new Promise(resolve => window.Loader.load(null, null, resolve));

    const mapCenter = window.SMap.Coords.fromWGS84(14.71, 49.765);
    const map = new window.SMap(JAK.gel("map"), mapCenter, 13);
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