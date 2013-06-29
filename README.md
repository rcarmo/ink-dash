ink-dash
========

A set of [InkJS][ij] modules to build data-oriented displays.

## Goals

* Provide tried and tested data-binding functionality (leveraging [KnockoutJS][ko] instead of reinventing the wheel)
* Lightweight (i.e., able to render quickly on a Raspberry Pi and/or limited browsers)
* Able to do "real time" updates without WebSockets (i.e., using EventSource), so that you don't have to punch holes in firewalls and other suchlike nonsense
* Provide a set of minimalist widgets that "just work" without much coding

[ij]: https://github.com/sapo/Ink.js
[ko]: http://knockoutjs.com
