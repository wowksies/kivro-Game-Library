import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { showPresidentNameModal } from './ui.js';

let svg, projection, path, zoom;

export function initMap() {
    const container = document.getElementById('map-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    projection = d3.geoMercator()
        .scale(width / 2 / Math.PI)
        .translate([width / 2, height / 2 * 1.4]);

    path = d3.geoPath().projection(projection);

    const g = svg.append('g');

    zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });

    svg.call(zoom);

    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(world => {
        g.selectAll('path')
            .data(topojson.feature(world, world.objects.countries).features)
            .enter().append('path')
            .attr('class', 'country')
            .attr('d', path)
            .attr('data-name', d => d.properties.name)
            .on('click', handleCountryClick);
    });
}

function handleCountryClick(event, d) {
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    event.stopPropagation();
    
    svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity
            .translate(svg.attr('width') / 2, svg.attr('height') / 2)
            .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / svg.attr('width'), (y1 - y0) / svg.attr('height'))))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
    );

    // After zoom, show the name modal
    setTimeout(() => {
        showPresidentNameModal(d.properties.name);
    }, 800);
}