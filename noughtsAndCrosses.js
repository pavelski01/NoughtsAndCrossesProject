"use strict";

goog.provide("project.game");

goog.require("goog.array");
goog.require("goog.dom");
goog.require("goog.dom.forms");
goog.require("goog.events");
goog.require("goog.style");

var elements = [];
var player1 =[];
var player2 = [];
var counter;
var conclusion;
var formatForm = [];

project.game.start = function() {
	project.game.menu();
	project.game.choice();
};

project.game.board = function(NorC) {
	var row = [];
	var cell = [];
	var table = goog.dom.createDom("table", { "id" : "board" }, null);
	goog.style.setStyle(table, "margin-left", "auto");
	goog.style.setStyle(table, "margin-right", "auto");
	goog.style.setStyle(table, "text-align", "center");
	var tableBody = goog.dom.createDom("tbody", null, null);
	for (var i = 0; i < 3; i++) {
		goog.array.insertAt(row, goog.dom.createDom("tr", null, null), i);
		for (var j = 0; j < 3; j++) {
			goog.array.insertAt(cell, goog.dom.createDom("td", {"id" : (3*i+j)}, null), j);
			goog.events.listen(cell[j], goog.events.EventType.MOUSEOVER,
				function() {
					this.innerHTML = (NorC);
					goog.style.setStyle(this, "color", "#f00");
					goog.style.setStyle(this, "font-weight", "bold");
					goog.style.setStyle(this, "background-color", "#70ff70");
				}, false);
			goog.events.listen(cell[j], goog.events.EventType.MOUSEOUT,
				function() {
					this.innerHTML = parseInt( this.getAttribute("id") ) + 1;
					goog.style.setStyle(this, "color", "#000");
					goog.style.setStyle(this, "font-weight", "");
					goog.style.setStyle(this, "background-color", "#fff");
				}, false);
			goog.events.listen(cell[j], goog.events.EventType.CLICK,
				function() {
					goog.style.setStyle(this, "background-color", "#fff");
					project.game.logic( this.getAttribute("id"), (NorC) );
					goog.events.removeAll(this);
				}, false);
			var content = goog.dom.createTextNode( (3*i+j+1) );
			goog.dom.appendChild(cell[j], content);
			goog.dom.appendChild(row[i], cell[j]);
			goog.style.setStyle(cell[j], "line-height", "50px");
			goog.style.setStyle(cell[j], "width", "50px");
			if ( (i == 0)&&(j == 0) ) {
				goog.style.setStyle(cell[j], "border-bottom", "3px solid #000");
				goog.style.setStyle(cell[j], "border-right", "3px solid #000");
			}
			else if ( (i == 0)&&(j == 1) ) {
				goog.style.setStyle(cell[j], "border-bottom", "3px solid #000");
				goog.style.setStyle(cell[j], "border-left", "3px solid #000");
				goog.style.setStyle(cell[j], "border-right", "3px solid #000");
			}
			else if ( (i == 0)&&(j == 2) ) {
				goog.style.setStyle(cell[j], "border-bottom", "3px solid #000");
				goog.style.setStyle(cell[j], "border-left", "3px solid #000");
			}
			else if ( (i == 1)&&(j == 0) ) {
				goog.style.setStyle(cell[j], "border-bottom", "3px solid #000");
				goog.style.setStyle(cell[j], "border-right", "3px solid #000");
				goog.style.setStyle(cell[j], "border-top", "3px solid #000");
			}
			else if ( (i == 1)&&(j == 1) ) {
				goog.style.setStyle(cell[j], "border-bottom", "3px solid #000");
				goog.style.setStyle(cell[j], "border-left", "3px solid #000");
				goog.style.setStyle(cell[j], "border-right", "3px solid #000");
				goog.style.setStyle(cell[j], "border-top", "3px solid #000");
			}
			else if ( (i == 1)&&(j == 2) ) {
				goog.style.setStyle(cell[j], "border-bottom", "3px solid #000");
				goog.style.setStyle(cell[j], "border-left", "3px solid #000");
				goog.style.setStyle(cell[j], "border-top", "3px solid #000");
			}
			else if ( (i == 2)&&(j == 0) ) {
				goog.style.setStyle(cell[j], "border-right", "3px solid #000");
				goog.style.setStyle(cell[j], "border-top", "3px solid #000");
			}
			else if ( (i == 2)&&(j == 1) ) {
				goog.style.setStyle(cell[j], "border-left", "3px solid #000");
				goog.style.setStyle(cell[j], "border-right", "3px solid #000");
				goog.style.setStyle(cell[j], "border-top", "3px solid #000");
			}
			else {
				goog.style.setStyle(cell[j], "border-left", "3px solid #000");
				goog.style.setStyle(cell[j], "border-top", "3px solid #000");
			}
		}
		goog.dom.appendChild(tableBody, row[i]);
	}
	goog.dom.appendChild(table, tableBody);
	goog.dom.appendChild(document.body, table);
};

project.game.menu = function() {
	var form = goog.dom.createDom("form", {"id" : "form"}, null);
	var dataIn = [];
	var table = goog.dom.createDom("table", null, null);
	goog.style.setStyle(table, "margin-left", "auto");
	goog.style.setStyle(table, "margin-right", "auto");
	goog.style.setStyle(table, "text-align", "center");
	var tableBody = goog.dom.createDom("tbody", null, null);
	goog.dom.appendChild(table, tableBody);
	goog.dom.appendChild(form, table);
	var row = [];
	var cell = [];
	var content = [];
	for (var i = 0; i < 2; i++) {
		goog.array.insertAt(row, goog.dom.createDom("tr", null, null), i);
		goog.array.insertAt(cell, goog.dom.createDom("td", null, null), 0);
		goog.array.insertAt(cell, goog.dom.createDom("td", null, null), 1);
		goog.array.insertAt(content, goog.dom.createTextNode( (i%2)?"Nought":"Cross"), i);
		goog.array.insertAt(dataIn, goog.dom.createDom("input", {
				"name" : "NorC", "id" : (i%2)?"nought":"cross", "type" : "radio"
			}, null), i);
		goog.events.listen(dataIn[i], goog.events.EventType.CLICK, project.game.choice, false);
		goog.dom.appendChild(form.firstChild.firstChild, row[i]);
		if (i == 0) {
			goog.dom.appendChild(form.firstChild.firstChild.firstChild, cell[0]);
			goog.dom.appendChild(form.firstChild.firstChild.firstChild, cell[1])
		}
		else {
			goog.dom.appendChild(form.firstChild.firstChild.childNodes[1], cell[0]);
			goog.dom.appendChild(form.firstChild.firstChild.childNodes[1], cell[1]);
		}
	}
	goog.dom.appendChild(form.firstChild.firstChild.firstChild.firstChild, content[0]);
	goog.dom.appendChild(form.firstChild.firstChild.firstChild.childNodes[1], content[1]);
	goog.dom.appendChild(form.firstChild.firstChild.childNodes[1].firstChild, dataIn[0]);
	goog.dom.appendChild(form.firstChild.firstChild.childNodes[1].childNodes[1], dataIn[1]);
	var seating = goog.dom.createDom("div", null, null);
	goog.style.setStyle(seating, "margin-left", "auto");
	goog.style.setStyle(seating, "margin-right", "auto");
	goog.style.setStyle(seating, "text-align", "center");
	goog.dom.appendChild(seating, form);
	goog.dom.appendChild(document.body, seating);
};

project.game.choice = function() {
	var node1 = goog.dom.getElement("board");
	var node2 = goog.dom.getElement("information");
	counter = 9;
	conclusion = 0;
	for (var i = 0; i < 9; i++) {
		goog.array.insertAt(elements, i, i);
		goog.array.insertAt(formatForm, 0, i);
	}
	goog.array.clear(player1);
	goog.array.clear(player2);
	if (node1) goog.dom.removeNode(node1);
	if (node2) goog.dom.removeNode(node2);
	if ( goog.dom.forms.getValue( goog.dom.getElement("cross") ) == "on" ) project.game.board("X");
	else if ( goog.dom.forms.getValue( goog.dom.getElement("nought") ) == "on" ) project.game.board("O");
};

project.game.logic = function(event, character) {
	character = (character == "X")?"O":"X";
	for (var i = 0; i < counter; i++) if (elements[i] == event) {
		counter--;
		goog.array.insert(player1, elements[i]);
		goog.array.insertAt(elements, elements[counter], i);
		goog.array.removeAt(elements, i + 1);
	}
	project.game.control(player1, 1);
	if (conclusion == 1) project.game.cleaning();
	counter--;
	if ( (conclusion != 1) && (counter > 0)) {
		var chance = ( Math.floor( Math.random() * 100 ) % ( counter + 1 ) );
		goog.array.insert(player2, elements[chance]);
		var move = goog.dom.getElement( elements[chance].toString() );
		move.innerHTML = character;
		goog.style.setStyle(move, "color", "#00f");
		goog.style.setStyle(move, "font-weight", "bold");
		goog.events.removeAll(move);
		goog.array.insertAt(elements, elements[counter], chance);
		goog.array.removeAt(elements, chance + 1);
		project.game.control(player2, 2);
		if (conclusion == 2) project.game.cleaning();
	}
	if (conclusion != 0) project.game.winner();
};

project.game.control = function(results, player) {
	goog.array.sort( results, function(a, b) {return a - b} );
	if (results.length >= 3) {
		var hits = [];
		var i;
		for (i = 0; i < results.length; i++) {
			if ( results[i] == 0 ) goog.array.insert(hits, results[i]);
			else if ( results[i] == 1 ) goog.array.insert(hits, results[i]);
			else if ( results[i] == 2 ) goog.array.insert(hits, results[i]);
			if (hits.length == 3) {
				conclusion = player;
				project.game.format( hits );
				break;
			}
		}
		goog.array.clear(hits);
		for (i = 0; i < results.length; i++) {
			if ( results[i] == 0 ) goog.array.insert(hits, results[i]);
			else if ( results[i] == 3 ) goog.array.insert(hits, results[i]);
			else if ( results[i] == 6 ) goog.array.insert(hits, results[i]);
			if (hits.length == 3) {
				conclusion = player;
				project.game.format( hits );
				break;
			}
		}
		goog.array.clear(hits);
		for (i = 0; i < results.length; i++) {
			if ( results[i] == 0 ) goog.array.insert(hits, results[i]);
			else if ( results[i] == 4 ) goog.array.insert(hits, results[i]);
			else if ( results[i] == 8 ) goog.array.insert(hits, results[i]);
			if (hits.length == 3) {
				conclusion = player;
				project.game.format( hits );
				break;
			}
		}
		goog.array.clear(hits);
        for (i = 0; i < results.length; i++) {
			if ( results[i] == 1 ) goog.array.insert(hits, results[i]);
			else if ( results[i] == 4 ) goog.array.insert(hits, results[i]);
			else if ( results[i] == 7 ) goog.array.insert(hits, results[i]);
			if (hits.length == 3) {
				conclusion = player;
				project.game.format( hits );
				break;
			}
		}
		goog.array.clear(hits);
		for (i = 0; i < results.length; i++) {
			if ( results[i] == 2 ) goog.array.insert(hits, results[i]);
			else if ( results[i] == 4 ) goog.array.insert(hits, results[i]);
			else if ( results[i] == 6 ) goog.array.insert(hits, results[i]);
			if (hits.length == 3) {
				conclusion = player;
				project.game.format( hits );
				break;
			}
		}
		goog.array.clear(hits);
		for (i = 0; i < results.length; i++) {
			if ( results[i] == 2 ) goog.array.insert(hits, results[i]);
			else if ( results[i] == 5 ) goog.array.insert(hits, results[i]);
			else if ( results[i] == 8 ) goog.array.insert(hits, results[i]);
			if (hits.length == 3) {
				conclusion = player;
				project.game.format( hits );
				break;
			}
		}
		goog.array.clear(hits);
		for (i = 0; i < results.length; i++) {
			if ( results[i] == 3 ) goog.array.insert(hits, results[i]);
			else if ( results[i] == 4 ) goog.array.insert(hits, results[i]);
			else if ( results[i] == 5 ) goog.array.insert(hits, results[i]);
			if (hits.length == 3) {
				conclusion = player;
				project.game.format( hits );
				break;
			}
		}
		goog.array.clear(hits);
		for (i = 0; i < results.length; i++) {
			if ( results[i] == 6 ) goog.array.insert(hits, results[i]);
			else if ( results[i] == 7 ) goog.array.insert(hits, results[i]);
			else if ( results[i] == 8 ) goog.array.insert(hits, results[i]);
			if (hits.length == 3) {
				conclusion = player;
				project.game.format( hits );
				break;
			}
		}
		goog.array.clear(hits);
	}
};

project.game.cleaning = function() {
	for (var i = 0; i < 9; i++) {
		var field = goog.dom.getElement( i.toString() );
		goog.events.removeAll(field);
	}
};

project.game.format = function( colored ) {
	for (var i = 0; i < colored.length; i++)
		goog.style.setStyle( goog.dom.getElement( colored[i].toString() ), "background-color", "#ff0" );
};

project.game.winner = function() {
	var seating = goog.dom.createDom( "div", { "id" : "information" }, 
		(conclusion == 1)?"You won":"You lost" );
	goog.style.setStyle(seating, "margin-left", "auto");
	goog.style.setStyle(seating, "margin-right", "auto");
	goog.style.setStyle(seating, "text-align", "center");
	goog.style.setStyle(seating, "color", (conclusion == 1)?"#f00":"#00f");
	goog.style.setStyle(seating, "font-weight", "bold");
	goog.style.setStyle(seating, "text-decoration", "blink");
	goog.dom.appendChild( document.body, seating );
	window.setTimeout( function() {goog.style.setStyle(seating, "text-decoration", "")}, 3000 );
};
