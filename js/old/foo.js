




(function (namespace, Lootr) {
	'use strict';

	/**
	 * @class Listener
	 * @example
	 *     var one = new Listener;
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

	namespace.Listener = Listener;
})(Lootr2, Lootr2);


/**
 * @class Component
 * @extends Listener
 * @param {Entity} entity the entity that this component
 * is a part of
 * @param {Object} args information this component needs
 */
function Component (entity, args) {
	Listener.call(this);
	this.$entity = entity;
	this.$args = args;
}

Component.prototype = new Listener;





/**
 * gives entities health
 * @class Health
 * @extends Component
 * @param {Entity} entity
 * @param {Object} args
 */
function Health (entity, args) {
	var health = this;

	Component.call(this, entity, args);

	// Health related variables
	this.$hp = args.hp;
	this.$max_hp = args.hp;

	// Examples of on & emit
	/*this.$entity.on('health.give', function (hp) {
		health.give(hp);
	});

	this.$entity.on('health.take', function (hp) {
		health.take(hp);
	});

	this.$entity.on('level.up', function (level) {
		console.log('entity has leveled up to level %s', level);
		health.$max += level;
		health.giveMax();
	});*/

	/*if (this.$entity instanceof Player) {
		// player specific
	}*/
}

Health.prototype = new Component;

Health.prototype.getHp = function () {
	return this.$hp;
};

Health.prototype.getMaxHp = function () {
	return this.$max_hp;
};

Health.prototype.giveHp = function( hp ) {
	this.$hp += hp;

	if(this.$hp > this.$max_hp)
	{
		this.$hp = this.$max_hp;
	}
};

Health.prototype.giveDamage = function ( damage ) {
	this.$hp -= damage;
};

Health.prototype.fullHeal = function() {
	this.$hp = this.$max_hp;
};

/*Health.prototype.give = function ( hp ) {
	this.$hp += hp;
	this.emit('give', [ this.$hp ]);
	this.emit('health.give', [ this.$hp ]);
};

Health.prototype.giveMax = function () {
	this.give(this.$max - this.$hp);
};

Health.prototype.take = function ( hp ) {
	this.$hp -= hp;

	if (this.$hp <= 0) {
		this.emit('empty');
		this.$entity.emit('health.empty');
	}
};*/


/**
 * makes an entity "hittable" (you can hit it)
 * @class Hittable
 * @extends Component
 * @param {Entity} entity
 * @param {Object} args
 */
function Hittable (entity, args) {
	Component.call(this, entity, args);

	this.$entity.hit = function (hp) {
		this.emit('action.hit', [ hp ]);
		this.emit('health.take', [ hp ]);
	};
}

Hittable.prototype = new Component;






/**
 * gives entities the avility to level up
 * @class Level
 * @extends Component
 * @param {Entity} entity
 * @param {Object} args
 */
function Level (entity, args) {
	var level = this;

	Component.call(this, entity, args);
	this.$level = args.level;
}

Level.prototype = new Component;

Level.prototype.get = function () {
	return this.$level;
};

Level.prototype.set = function (level) {
	return this.$level = level;
};

Level.prototype.up = function (by) {
	this.set(this.get() + by);
	this.$entity.emit('level.up', [ this.get() ]);
};







/**
 * @class Entity
 * @extends Listener
 */
function Entity () {
	Listener.call(this)
	this.$components = {};
}

Entity.prototype = new Listener;

Entity.components = {
	health: Health,
	hittable: Hittable,
	level: Level
};

Entity.prototype.component = function (name, args) {
	var generator, component;

	if (!(name in Entity.components)) {
		throw new Error('Invalid component: ' + name);
	}

	generator = Entity.components[ name ];
	component = new generator(this, args || {});

	this.$components[ name ] = component;
	this[ name ] = component;
};

Entity.prototype.has = function (name) {
	return name in this.$components;
};





/**
 * @class Player
 * @extends Entity
 */
function Player () {
	Entity.call(this);

	this.component('health', { hp: 100 });
	this.component('hittable');
	this.component('level', { level: 1 });
}

Player.prototype = new Entity;




/**
 * @class Monster
 * @extends Entity
 */
function Monster () {
	Entity.call(this);

	this.component('health', { hp: 100 });
	this.component('hittable');
}

Monster.prototype = new Entity;



var sean = new Player,
	dragon = new Monster;


sean.health.on('empty', function () {
	console.log('I am out of health!!!');
});


sean.health.on('give', function () {
	console.log('I now have %s hp', this.$hp);
});

sean.on('health.empty', function () {
	console.log('I am dieded');
});

sean.on('action.hit', function () {
	console.log('I have been hit!');
});

sean.on('equip.head', function (equipment) {
	$scope.equipment.head = equipment;
});

// <span>{{ equipment.head.name }}</div>


if (sean.has('hittable')) {
	sean.hit(32)
}




/*

function RandomGold (entity, args) {
	Component.call(this, entity, args);
}

RandomGold.prototype.go = function () {
	this.$entity.emit('Gold.giveGold', [ parseInt(Math.random() * 100) ])
	this.$entity.emit('Health.giveDamage', [3]);
};*/