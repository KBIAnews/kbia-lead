var d3 = require("d3");
var topojson = require("topojson-client");

// HTML Elements
var parentElement; // JQuery selection - to use, select the node with [0].
var host;

// Module Variables
var svgSize;
var topo;
var geo;
var stGeo;

// Module D3 Items
var svg;
var path;

export function makeMap(container) {
	parentElement = container;
	host = d3.select(container[0]);
	makeSVG();
	drawMap();
}

function makeSVG(){
	svgSize = parentElement.width();
	svg = host.append("svg")
		.attr("width", svgSize)
		.attr("height", svgSize)
		.style("margin-top", (parentElement.height() - svgSize)/2);
}

function drawMap(){
	let q = d3.queue();

	q.defer(d3.json, "/assets/data/topo_counties.json");

	q.await((error, d) => {
		console.log(topojson);

		topo = d.topo;

		path = d3.geoPath();
		path.projection(d3.geoAlbersUsa());


		geo = topojson.feature(topo, topo.objects.mo_county_slice);

		path.projection().fitSize([svgSize, svgSize], geo);

		svg.append('g')
		.attr('class', 'counties')
		.selectAll('path')
		.data(geo.features)
		.enter()
		.append("path")
		.attr("d", path)
		.style("fill", "#fefefe")
		.style("stroke", "#373a3c")
		.style("stroke-width", "1px");
	});

	
}