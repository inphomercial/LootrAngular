/**
	 * @class Listener
	 * @example
	 *     var one = new Listener;
	 *	   var two = new Listner;
	 *
	 *     one.on('walk', function (steps) {
	 *     	console.log('you have walked %s steps', steps);
	 *     });
	 *
	 *     one.on('walk', function (steps) {
	 *     	console.log('you have walked %s steps!!!', steps);
	 *     });
	 *
	 *     one.emit('walk', [21]);
	 *     two.emit('walk', [23]);
	 */
	function Listener () {
		this.$listeners = {};
	}

	/**
	 * add an event listener
	 * @method on
	 * @param {string} ev event name (die, walk, etc.);
	 * @param {Function} action function to trigger when
	 * event is triggered
	 * @return {Listener} returns the object instance
	 */
	Listener.prototype.on = function (ev, action) {
		if (!this.$listeners[ ev ]) {
			this.$listeners[ ev ] = [];
		}

		this.$listeners[ ev ].push(action);
	};

	/**
	 * emit an event (trigger event litners)
	 * @method emit
	 * @param {string} ev event name
	 * @param {Array} args arguments to pass to listeners
	 * @return {Liteners} returns the object instance
	 */
	Listener.prototype.emit = function (ev, args) {
		var i, len;

		if (this.$listeners[ ev ]) {
			for (i = 0, len = this.$listeners[ ev ].length; i < len; i++) {
				this.$listeners[ ev ][ i ].apply(this, args || []);
			}
		}
	};