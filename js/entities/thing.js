(function (namespace, Lootr) {
	'use strict';

	var thing_id_counter = 0;

	/**
	 * @class Thing
	 * @extends Entity
	 */
	function Thing ( args ) {
		Entity.call(this);

		// And Sets the Thing unique ID
        this._setId();

		this.name = args.name;
		this.desc = args.desc;
		this.className = "Thing";

		// Need to determine which of these are actually in use.
		this.equip = args.equip;
		this.unequip = args.unequip;
		this.use = args.use || "";

		// New Stat System
		this[Lootr.PLAYER_STATS.ATK] = args[Lootr.PLAYER_STATS.ATK] || 0;
		this[Lootr.PLAYER_STATS.DEF] = args[Lootr.PLAYER_STATS.DEF] || 0;
		this[Lootr.PLAYER_STATS.MAG] = args[Lootr.PLAYER_STATS.MAG] || 0;
		this[Lootr.PLAYER_STATS.HP]  = args[Lootr.PLAYER_STATS.HP]  || 0;
		this[Lootr.PLAYER_STATS.MP]  = args[Lootr.PLAYER_STATS.MP]  || 0;

		this.value = args.value;
		this.slot = args.slot || "";
		this.type = args.type;
		this.rarity = args.rarity;
		this.color = args.color;
		this.look = args.look || "";
		this.total_amount = args.total_amount || "";
		this.bonus = args.bonus || "";

		this.component('Consumable', { is_consumable: args.is_consumable, consume_amount: args.consume_amount, sips: args.sips } || false);
		// Used for consumables
		this.stat_amount = args.stat_amount || 0;

		this.component('Equipable', { isEquipable: args.isEquipable })
	}

	Thing.prototype = new Entity;

	Thing.prototype.tick = function() {
		console.log("A " + this.name + " sits on the floor.");
	}

	Thing.prototype._setId = function() {
        this.id = ++thing_id_counter;
    };

    Thing.prototype.getStats = function() {
    	var stats =  {
    		"atk": this[Lootr.PLAYER_STATS.ATK],
    		"def": this[Lootr.PLAYER_STATS.DEF],
    		"mag": this[Lootr.PLAYER_STATS.MAG],
    		"hp":  this[Lootr.PLAYER_STATS.HP],
    		"mp":  this[Lootr.PLAYER_STATS.MP]
    	}

    	return stats;
    };

	namespace.Thing = Thing;
})(Lootr.entities, Lootr);

