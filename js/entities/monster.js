(function (namespace, Lootr) {
	'use strict';

	/**
	 * @class Monster
	 * @extends Entity
	 */
	function Monster ( args ) {
		Entity.call(this);

		this.component('Health', { hp: args.max_hp, max_hp: args.max_hp });
		this.component('Atk', { value: args.atk });
		this.component('Def', { value: args.def });
		//this.component('SlotHand', { slot_type: Lootr.PLAYER_SLOTS.HAND });
		/*this.component('Gold', { gold: 10 });
		this.component('Level', { level: 1, current_exp: 0, exp_to_level: 50 });
		this.component('Progress');
		this.component('Inventory');
		this.component('Mag', { value: 1 });
		this.component('SlotHead', { slot_type: Lootr.PLAYER_SLOTS.HEAD });
		this.component('SlotBody', { slot_type: Lootr.PLAYER_SLOTS.BODY });
		this.component('SlotFinger', { slot_type: Lootr.PLAYER_SLOTS.FINGER });
		this.component('SlotFeet', { slot_type: Lootr.PLAYER_SLOTS.FEET });*/

		this.desc = args.desc;
		this.name = args.name;

		this.className = "Monster";

		this.mag = args.mag;
		this.exp = args.exp;
		this.level = args.level;

		this.attack_messages = args.attack_messages;
		this.death_message = args.death_message;
	}

	Monster.prototype = new Entity;

	namespace.Monster = Monster;
})(Lootr.entities, Lootr);
