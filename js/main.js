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

let cities = [];

function updateStarMap () {
    console.log('Updated options: ', options);
    const o = Object.assign(options, {});
    if (o.transparent) {
        o.background = 'rgba(0, 0, 0, 0)';
    }
    S.virtualsky(options);
    S('#starmap').addClass('fadeIn');
}

async function fetchCities(lang = options.lang.toUpperCase()) {
    return fetch('./cities.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            cities = response;
        })
}

function updateCitySelect() {
    let html = "<option value=''>Choose a city</option>";
    cities.filter(function(c) {
        return c.country === options.lang.toUpperCase();
    }).forEach(function(c) {
        html += "<option value='" + c.cityId + "'>" + c.name + "</option>";
    });
    S('.cities').html(html);
}

S(document).ready(function() {
    fetchCities().then(function () {
        updateCitySelect();
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
            if (e.currentTarget.name === 'lang') {
                updateCitySelect();
            }
            if (e.currentTarget.name === 'cities') {
                const city = cities.find(function(c) {
                    return c.cityId === parseInt(e.currentTarget.value, 10);
                });
                if (city) {
                    options.longitude = city.loc.coordinates[0];
                    options.latitude = city.loc.coordinates[1];
                    S('#longitude').val(options.longitude);
                    S('#latitude').val(options.latitude);
                }
            }
            S('#starmap').removeClass('fadeIn');
            setTimeout(function() {
                updateStarMap();
            }, 300);
        });
        S('form').on('submit', function(e) {
            e.preventDefault();
            const imgData = S('#starmap canvas')[0].toDataURL('image/png');
            const w = window.open('about:blank', '_blank');
            const image = new Image();
            image.src = imgData;
            setTimeout(function(){
                w.document.write(image.outerHTML);
            }, 0);
        });
    });
});
