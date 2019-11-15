/**
=======================================
QuadPanels v1.0.2: Simple paneling system
Copyright (c) 2014 Long Technical
Author: Jarren Long
=======================================

Changelog:
=======================================
 v1.0.2 - 06/01/2014 - Next set of changes
 v1.0.1 - 02/17/2014 - More functions, optimizations
 v1.0.0 - 02/14/2014 - Initial Commit
*/
var QuadPanels = (function() {
	var private = {
		// Default config settings, no quads, no animations
		config: {
			animationTime: 0,
			quads: [
				{ id: '', show: { }, hide: { } },
			]
		},
		
		
		/** Begin Utility/Helper functions **/
		// Helper function to check if an element has a specific class assigned to it, else false
		_isClassSet: function(element, className) {
			var cls = '#' + element;
			var classes = $(cls);
			classes = classes.attr('class');

			if(classes) {
				classes = classes.split(' ');
			}
			
			if(classes) {
				return ($.inArray(className, classes) > -1);
			}
			
			return false;
		},
		// Returns true if the given quadrant is visible, else false
		isInvisible: function(quadrant) {
			if(!private || !private.config || quadrant >= private.numQuads()) return false;
			
			var quads = private.config['quads'];
			var quad = quads[quadrant];
			return quad ? private._isClassSet(quad['id'], 'invisible') : false;
		},
		// Returns the number of quadrants defined
		numQuads: function() {
			if(!private || !private.config) return 0;
			
			return private.config['quads'].length;
		},
		// Get number of element levels between specified node and <body>
		getDistanceToBody: function(elem) {
			var body = $(document.body);
			if(!body)
				alert('No body element!?!');
			var e = $(elem);
			var c = 0;
		
			while(e && !e.is('body')) {
				e = e.parent();
				c++;
			}
	
			return c;
		},
		test_getDistanceToBody: function() {
			var depth = getDistanceToBody('#submit');
			alert('#submit depth: ' + depth);
			depth = getDistanceToBody('#arch_1');
			alert('#arch_1 depth: ' + depth);
			depth = getDistanceToBody('#panel_center');
			alert('#panel_center depth: ' + depth);
		},
		/** EndUtility/Helper functions **/
		
		
		/** Panel Positioning **/
		// Center a panel within its parent container
		center: function(quadrant, async) {
			if(private.isInvisible(quadrant)) return;
			var async = !(typeof(async)==='undefined') && async;
			var quads = private.config['quads'];
			var quad = quads[quadrant];
			
			if(quad != null) {
				var w = window.innerWidth / 2;
				w = w - $('#' + quad.id).width() / 2;
				var h = window.innerHeight / 2;
				h = h - $('#' + quad.id).height() / 2;
				
				$('#' + quad.id).animate({
					position: 'absolute',
					top: h,
					left: w
				}, { duration: quad.animationTime, queue: !async });
			}
		},
		// Vertically center an element within its parent container
		vcenter: function(quadrant, async) {
			if(!private || !private.config || quadrant >= private.numQuads()) return false;
			
			var async = !(typeof(async)==='undefined') && async;
			var quads = private.config['quads'];
			var quad = quads[quadrant];
			
			if(quad != null) {
				var h = $('#' + quad.id).parent().height() / 2;
				h = h - $('#' + quad.id).height() / 2;
				h = h / 2;
				
				$('#' + quad.id).animate({
					position: 'absolute',
					top: h
				}, { duration: quad.animationTime, queue: !async });
			}
		},
		// Horizontally center an element within its parent container
		hcenter: function(quadrant, async) {
			if(!private || !private.config || quadrant >= private.numQuads()) return false;
			
			var async = !(typeof(async)==='undefined') && async;
			var quads = private.config['quads'];
			var quad = quads[quadrant];
			
			if(quad != null) {
				var w = window.innerWidth / 2;
				w = w - $('#' + quad.id).width() / 2;
				w = w / 2;
				
				$('#' + quad.id).animate({
					left: w
				}, { duration: quad.animationTime, queue: !async });
			}
		},
		// Left-justify an element within its parent container
		left: function(quadrant, async) {
			if(!private || !private.config || quadrant >= private.numQuads()) return false;
			
			var async = !(typeof(async)==='undefined') && async;
			var quads = private.config['quads'];
			var quad = quads[quadrant];
			
			if(quad != null) {
				$('#' + quad.id).css('left', 0);
				$('#' + quad.id).animate({
					left: 0
				}, { duration: quad.animationTime, queue: !async });
			}
		},
		// Right-justify
		right: function(quadrant, async) {
			if(!private || !private.config || quadrant >= private.numQuads()) return false;
			
			var async = !(typeof(async)==='undefined') && async;
			var quads = private.config['quads'];
			var quad = quads[quadrant];
			
			if(quad != null) {
				var w = window.innerWidth - $('#' + quad.id).width();
				
				$('#' + quad.id).animate({
					left: w
				}, { duration: quad.animationTime, queue: !async });
			}
		},
		// Top-Align
		top: function(quadrant, async) {
			if(!private || !private.config || quadrant >= private.numQuads()) return false;
			
			var async = !(typeof(async)==='undefined') && async;
			var quads = private.config['quads'];
			var quad = quads[quadrant];
			
			if(quad != null) {
				$('#' + quad.id).animate({
					top: 0
				}, { duration: quad.animationTime, queue: !async });
			}
		},
		// Bottom-Align
		bottom: function(quadrant, async) {
			if(!private || !private.config || quadrant >= private.numQuads()) return false;
			
			var async = !(typeof(async)==='undefined') && async;
			var quads = private.config['quads'];
			var quad = quads[quadrant];
			
			if(quad != null) {
				var h = window.innerHeight - $('#' + quad.id).height();
				$('#' + quad.id).animate({
					top: h
				}, { duration: quad.animationTime, queue: !async });
			}
		},
		// Resize panel along X and Y axis by percentage
		resize: function(quadrant, x, y, w, h, async) {
			if(!private || !private.config || quadrant >= private.numQuads()) return;
			
			var async = !(typeof(async)==='undefined') && async;
			var quads = private.config['quads'];
			var quad = quads[quadrant];
			
			if(quad != null) {
				$('#' + quad.id).animate({
					position: 'absolute',
					top: x,
					left: y,
					width: w,
					height: h
				}, { duration: quad.animationTime, queue: !async });
			}
		},
		// Reset panel's size and position using initially supplied dimensions
		reset: function(quadrant, async) {
			if(!private || !private.config || quadrant >= private.numQuads()) return;

			var async = !(typeof(async)==='undefined') && async;
			var quads = private.config['quads'];
			var quad = quads[quadrant];
			var rect = quad['rect'];
			
			if(quad != null) {
				$('#' + quad.id).animate({
					position: 'absolute',
					top: rect[0],
					left: rect[1],
					width: rect[2],
					height: rect[3]
				}, { duration: quad.animationTime, queue: !async });
			}
		},
		// "Animate" a panel's z-index
		animateZindex: function(quadrant, startZ, endZ) {
			if(!private || !private.config || quadrant >= private.numQuads()) return;

			var quads = private.config['quads'];
			var quad = quads[quadrant];
			var rect = quad['rect'];
			var i = 0, ms = quad.animationTime / (endZ - startZ);
			
			if(quad != null) {
				if(startZ < endZ) {
					do {
						$('#' + quad.id).css('z-index', startZ + i).delay(ms);
						i++;
					} while (startZ + i < endZ);
				} else {
					do {
						$('#' + quad.id).css('z-index', endZ + i).delay(ms);
						i++;
					} while (endZ + i < startZ);
				}
			}
		},

		
		/** Panel Visability **/
		// Show a single quadrant
		show: function(quadrant, async) {
			var async = !(typeof(async)==='undefined') && async;
			var quads = private.config['quads'];
			var quad = quads[quadrant];
			
			if(quad != null) {
				if(quad.beforeShow != null)
					quad.beforeShow();
				
				$('#' + quad.id).animate(quad.show, { duration: quad.animationTime, queue: !async });
				
				if(quad.afterShow != null)
					setTimeout(function() { quad.afterShow(); }, quad.animationTime + 100);
			}
		},
		// Hide a single quadrant
		hide: function(quadrant, async) {
			var async = !(typeof(async)==='undefined') && async;
			var quads = private.config['quads'];
			var quad = quads[quadrant];
			
			if(quad != null) {
				if(quad.beforeHide != null)
					quad.beforeHide();
					
				$('#' + quad.id).animate(quad.hide, { duration: quad.animationTime, queue: !async });
				
				if(quad.afterHide != null)
					setTimeout(function() { quad.afterHide(); }, quad.animationTime + 100);
			}
		},
		// Toggle a single quadrant's visibility
		toggle: function(quadrant, async) {
			if(private.isInvisible(quadrant, async)) {
				private.show(quadrant, async);
			} else {
				private.hide(quadrant, async);
			}
		},
		shake_x: function(quadrant, shakes, distance, duration) {
			if(shakes < 1 || private.isInvisible(quadrant)) return;
			
			var quads = private.config['quads'];
			var quad = quads[quadrant];
			
			if(quad != null) {
				var $el = $('#' + quad.id);
				var left = $el.css('left');
				
				$el.animate({
					left: "-=" + distance
				}, duration);
				$el.animate({
					left: "+=" + distance * 2
				}, duration);
				$el.animate({
					left: "-=" + distance
				}, duration);
				
				private.shake_x(quadrant, shakes-1, distance-1, duration);
			}
		},
		shake_y: function(quadrant, shakes, distance, duration) {
			if(shakes < 1 || private.isInvisible(quadrant)) return;
			
			var quads = private.config['quads'];
			var quad = quads[quadrant];
			
			if(quad != null) {
				var $el = $('#' + quad.id);
				var top = $el.css('top');
				
				$el.animate({
					top: "-=" + distance
				}, duration);
				$el.animate({
					top: "+=" + distance * 2
				}, duration);
				$el.animate({
					top: "-=" + distance
				}, duration);
				
				private.shake_y(quadrant, shakes-1, distance-1, duration);
			}
		},
		
		// Show/hide/toggle only this single quadrant, hide all others
		showOnly: function(quadrant) {
			var quads = private.numQuads();
			for(i=0;i<quads;i++) {
				private.hide(i, true);
			}
			
			private.show(quadrant, false);
		},
		hideOnly: function(quadrant) {
			var quads = private.numQuads();
			for(i=0;i<quads;i++) {
				private.show(i, true);
			}
			
			private.hide(quadrant, false);
		},
		toggleOnly: function(quadrant) {
			if(private.isInvisible(quadrant)) {
				private.showOnly(quadrant);
			} else {
				private.hideOnly(quadrant);
			}
		},
		
		// Show/hide/toggle all quadrants except specified quadrant
		hideAllExcept: function(quadrant) {
			var quads = private.numQuads();
			for(i=0;i<quads;i++) {
				private.hide(i, true);
			}
			
			private.show(quadrant, false);
		},
		showAllExcept: function(quadrant) {
			var quads = private.numQuads();
			for(i=0;i<quads;i++) {
				private.show(i, true);
			}
			
			private.hide(quadrant, false);
		},
		toggleAllExcept: function(quadrant) {
			if(private.isInvisible(quadrant)) {
				private.showAllExcept(quadrant);
			} else {
				private.hideAllExcept(quadrant);
			}
		},
		
		// Show/hide/toggle all quadrants except specified quadrant
		hideAll: function(quadrant) {
			var quads = private.numQuads();
			for(i=0;i<quads;i++) {
				private.hide(i, true);
			}
		},
		showAll: function(quadrant) {
			var quads = private.numQuads();
			for(i=0;i<quads;i++) {
				private.show(i, true);
			}
		},
		toggleAll: function(quadrant) {
			if(private.isInvisible(quadrant)) {
				private.showAll(quadrant);
			} else {
				private.hideAll(quadrant);
			}
		},
		resetAll: function(quadrant) {
			var quads = private.numQuads();
			for(i=0;i<quads;i++) {
				private.reset(i, true);
			}
		},
		/** End Panel Visability **/
		
		
		lerp: function(quadrant, x, y, async) {
			if(!private || !private.config || quadrant >= private.numQuads()) return;
			
			var async = !(typeof(async)==='undefined') && async;
			var quads = private.config['quads'];
			var quad = quads[quadrant];
			
			if(quad != null) {
				$('#' + quad.id).animate({
					position: 'absolute',
					top: x,
					left: y
				}, { duration: quad.animationTime, queue: !async });
			}
		},
		
		
		/** Begin API Initialization **/
		// Preloads the configuration if available. Used internally
		_preInit: function() {
			// Are we preconfigured?
			if (window._config) {
				private.init();
			}
		},
		// Initializes the API with user settings before use
		init: function(options) {
			private.config = options;
			// Init config
			if (options) {
				window._config = options;
			}
		}
		/** End API Initialization **/
	}
	
	// Pre-initialize the API's config if available and return an instance of the API
	private._preInit();
	return private;
})();
