// Webpack entry point for KBIA Special Project The Legacy of Lead
// Nathan Lawrence, 2016

import React from 'React';

var $ = require("jquery");

var StateMap = require("./statemap");

$(document).ready(function(){

	$(".titlecard").css("height", $(window).height() - 50);

	StateMap.makeMap($(".map"));

	console.log(window.location.pathname);
});