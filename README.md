ink-dash
========

A set of [Ink][i]/[Ink.js][ij] modules to build data-oriented displays.

## Goals

* Provide tried and tested data-binding functionality.
* Lightweight (i.e., able to render quickly on a Raspberry Pi and/or limited browsers).
* Able to do "real time" updates without WebSockets (i.e., using EventSource), so that you don't have to punch holes in firewalls and other suchlike nonsense.
* Provide a set of minimalist widgets that "just work" without much coding.

## Why [Ink][i]?

There are a number of good reasons:

* It's what we use at the office (duh!).
* The CSS framework has a great grid system that beats the crap out of everything else I've used so far.
* The JS framework has the sanest approach to modularity and auto-loading I've seen yet, and is completely self-contained.

## Why [KnockoutJS][ko]?

* It's self-contained, stable and doesn't require me to suffer the pain of using `npm` to get things done.
* It has simple, serviceable templating built-in (as well as the nicest implementation of the observer pattern I've seen so far).
* The declarative binding engine lets non-JS developers customize views without hassles.
* Reinventing the wheel is stupid.

## Why all the Python bits?

They're just scaffolding for running a local development server. Ignore them and look inside `static/js` for the interesting stuff.


[i]: http://ink.sapo.pt
[ij]: https://github.com/sapo/Ink.js
[ko]: http://knockoutjs.com
