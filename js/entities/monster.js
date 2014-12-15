(function (namespace, Lootr) {
	'use strict';

	var monster_id_counter = 0;

	/**
	 * @class Monster
	 * @extends Entity
	 */
	function Monster ( args, world ) {
		Entity.call(this);

		// And Sets the Monster UniqueID
        this._setId();

		this.component('Health', { hp: args.max_hp, max_hp: args.max_hp });
		this.component('Atk', { value: args.atk });
		this.component('Def', { value: args.def });

		this.component('Location', { x: args.x, y: args.y });
		this.component('Movement', { moveable: args.moveable });

		this.desc = args.desc;
		this.name = args.name;
		this.world = world;

		this.className = "Monster";

		this.mag = args.mag;
		this.exp = args.exp;
		this.level = args.level;
		this.attack_messages = args.attack_messages;
		this.death_message = args.death_message;
	}

	Monster.prototype = new Entity;

	Monster.prototype.tick = function() {
		console.log("A " + this.name + " is thinking what to do..");

        // Get the current mobs room
        var current_room = this.world.getRoomByLocation(this.Location.getX(), this.Location.getY());

        // If room has Player in it, we attack!
        if(current_room.hasEntityType("Player")) {
            var player = current_room.getEntityType("Player");
            var battle = new BattleEngine(this, player);
            battle.fight();
        // Else we move
        } else {
        	var dir = this.Movement.generateRandomDirection();
        	this.Movement._moveDirection(dir);	
        }        
	}

	Monster.prototype._setId = function () {
        this.id = ++monster_id_counter;
    };

	namespace.Monster = Monster;
})(Lootr.entities, Lootr);
