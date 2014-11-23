(function (namespace, Lootr) {
	'use strict';

	/**
	 * @class Thing
	 * @extends Entity
	 */
	function Thing ( args ) {
		Entity.call(this);

		this.component('Consumable', { is_consumable: args.is_consumable } || false);

		this.name = args.name;
		this.desc = args.desc;

		this.className = "Thing";

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
	}

	Thing.prototype = new Entity;

	namespace.Thing = Thing;
})(Lootr.entities, Lootr);
