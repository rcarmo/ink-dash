#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Main application script

Created by: Rui Carmo
License: MIT (see LICENSE for details)
"""

import os, sys, json, logging, logging.config

# Make sure our bundled libraries take precedence
sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'lib'))

import bottle, config, utils

log = logging.getLogger()

if __name__ == "__main__":

    if config.settings.debug:
        if 'BOTTLE_CHILD' not in os.environ:
            log.debug('Using reloader, spawning first child.')
        else:
            log.debug('Child spawned.')

    if not config.settings.debug or ('BOTTLE_CHILD' in os.environ):
        log.info("Setting up application.")
        import routes
        log.info("Serving requests.")

    bottle.run(
        port     = config.settings.server.http.port, 
        host     = config.settings.server.http.bind_address, 
        debug    = config.settings.debug,
        reloader = config.settings.reloader
    )