update:
	wget http://knockoutjs.com/downloads/knockout-2.2.1.js
	mv knockout* ko.js
	rm lib.js
	cat lib-prefix.js >  lib.js
	cat ko.js         >> lib.js
	cat lib-suffix.js >> lib.js
