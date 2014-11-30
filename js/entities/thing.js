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
		this.stat_affected = args.stat_affected;
		this.stat_amount = args.stat_amount;
		this.stat_magical_amount  = args.stat_magical_amount;
		this.value = args.value;
		this.slot = args.slot || "";
		this.type = args.type;
		this.rarity = args.rarity;
		this.color = args.color;
		this.look = args.look || "";
		this.total_amount = args.total_amount || "";
		this.bonus = args.bonus || "";

		this.component('Consumable', { is_consumable: args.is_consumable } || false);
	}

	Thing.prototype = new Entity;

	Thing.prototype.tick = function() {
		console.log("A " + this.name + " sits on the floor.");
	}

	Thing.prototype._setId = function () {
        this.id = ++thing_id_counter;
    };

	namespace.Thing = Thing;
})(Lootr.entities, Lootr);
