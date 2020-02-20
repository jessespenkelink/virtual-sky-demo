const options = {
    projection: 'polar',
    id: 'starmap',	// This should match the ID used in the DOM
    color: 'white',
    lang: 'nl',
    az: 180,
    width: 800,
    height: 800,
    background: 'rgba(0, 0, 0, 0)',
    transparent: false,
    negative: false,
    gradient: true,
    ground: false,
    keyboard: true,
    mouse: true,
    cardinalpoints: true,
    constellations: false,
    constellationslabels: false,
    constellationboundaries: false,
    constellationwidth: 0.7,
    constellationboundarieswidth: 0.7,
    meteorshowers: false,
    showplanets: true,
    showplanetlabels: true,
    showorbits: false,
    showstars: true,
    showstarlabels: false,
    scalestars: 1,
    showdate: true,
    showposition: true,
    gridlines_az: false,
    gridlines_eq: false,
    gridlines_gal: false,
    gridlineswidth: 0.7,
    gridstep: 30,
    ecliptic: false,
    meridian: false,
    showgalaxy: false,
    galaxywidth: 0.7,
    live: false,
    fontsize: '14px',

    magnitude: 5,
    longitude: 53.0,
    latitude: -2.5,
};

function updateStarMap () {
    console.log('Updated options: ', options);
    const o = Object.assign(options, {});
    if (o.transparent) {
        o.background = 'rgba(0, 0, 0, 0)';
    }
    S.virtualsky(options);
    S('#starmap').addClass('fadeIn');
}

S(document).ready(function() {
    updateStarMap();

    S('input, select').on('change', function(e) {
        switch(e.currentTarget.type) {
            case 'checkbox':
                options[e.currentTarget.name] = e.currentTarget.checked;
                break;
            case 'number':
                options[e.currentTarget.name] = parseInt(e.currentTarget.value, 10);
                break;
            default:
                options[e.currentTarget.name] = e.currentTarget.value;
                break;
        }
        S('#starmap').removeClass('fadeIn');
        setTimeout(function() {
            updateStarMap();
        }, 300);
    });
});
