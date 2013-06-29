import os, sys, urllib2

if 'BUILD_RELEASE' in os.environ:
    ko = "http://ajax.aspnetcdn.com/ajax/knockout/knockout-2.2.1.js"
    strict = "'use strict;'"
else:
    ko = "http://knockoutjs.com/downloads/knockout-2.2.1.debug.js"
    strict = ''

prefix = """/**
 * @module Dash.Data.Binding
 * @author rui.carmo AT sapo.pt
 * @version 1
 */
Ink.createModule(
    'Dash.Data.Binding',     // full module name
    '1',                     // module version
    ['Ink.Net.Ajax_1'],      // array of dependency modules
    function(Ajax) {         // this fn will be called asynchronously with dependencies as arguments
        %(strict)s
        /**
         * First attempt at binding Knockout to Ink
         *
         * @class Dash.Data.Binding
         * @static
         */
        // END OF PREFIX
""" % locals()

suffix = """
        // START OF SUFFIX
        return window.ko;
    }
);
"""

open(os.path.join(os.path.dirname(__file__),'lib.js'),'w').write(prefix + urllib2.urlopen(ko).read() + suffix)
