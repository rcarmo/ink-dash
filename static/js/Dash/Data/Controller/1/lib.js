/**
 * @module Dash.Data.Controller
 * @author rui.carmo AT sapo.pt
 * @version 1
 */
Ink.createModule(
    'Dash.Data.Controller',  // full module name
    '1',                     // module version
    ['Dash.Data.Binding','Ink.Net.Ajax_1'], // array of dependency modules
    function(Binding,Ajax) {         // this fn will be called asynchronously with dependencies as arguments
        'use strict';

        /**
         * Controller for a set of widgets on a page 
         * - Grabs a JSON file off a server and instantiates widgets based on matching templates in the DOM
         * - Listens to an EventSource and updates each widget's data accordingly
         *
         * @class Dash.Data.Controller
         * @static
         */
        
        var Controller;

        return Controller;
    }
);