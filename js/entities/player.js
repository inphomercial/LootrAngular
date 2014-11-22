(function (namespace, Lootr) {
	'use strict';

	/**
	 * @class Player
	 * @extends Entity
	 */
	function Player ( args, name ) {
		Entity.call(this);

		console.log(args);

		this.race = args.race;
		this.name = name;

		// @todo it wont let me do args.Health.hp checks?!?
		this.component('Health',
			//(args.Health.hp && args.Health.max_hp)
			((args.hp && args.max_hp) != undefined)
				? { hp: args.hp, max_hp : args.max_hp }
				: { hp: 100, max_hp : 100 } );

		this.component('Gold',
			((args.gold) != undefined)
				? { gold: args.gold }
				: { gold: 0 });

        this.component('Location',
            ((args.x && args.y) != undefined)
                ? { x: args.x, y: args.y }
                : { x: 0, y: 0 } );

		this.component('Level',
			((args.level && args.current_exp && args.exp_to_level) != undefined)
				? { level: args.level, current_exp: args.current_exp, exp_to_level: args.exp_to_level}
				: { level: 1, current_exp: 0, exp_to_level: 50 } );

		this.component('Progress');

		this.component('Movement',
            ((args.moveable) != undefined)
                ? { moveable: args.moveable }
                : { moveable: false });

		this.component('Inventory',
			((args.inventory) != undefined)
				? { items: args.items }
				: { items: [] });

		this.component('Atk',
			((args.atk) != undefined)
				? { value: args.atk }
				: { value: 1 });

		this.component('Def',
			((args.def) != undefined)
				? { value: args.def }
				: { value: 1 });

		this.component('Mag',
			((args.mag) != undefined)
				? { value: args.mag }
				: { value: 1 });

		// *_item = item rarity, if one is passed generate an item of that rarity otherwise leave empty
		if(args.head_item) {
			this.component('SlotHead', { slot_type: Lootr.PLAYER_SLOTS.HEAD, slot_count: args.head_slot_count, item: Lootr.Treasure.generate(Lootr.TREASURE_TYPES.HEAD, args.head_item) });
		} else {
			this.component('SlotHead', { slot_type: Lootr.PLAYER_SLOTS.HEAD, slot_count: args.head_slot_count });
		}

		if(args.body_item) {
			this.component('SlotBody', { slot_type: Lootr.PLAYER_SLOTS.BODY, slot_count: args.body_slot_count, item: Lootr.Treasure.generate(Lootr.TREASURE_TYPES.BODY, args.body_item) });
		} else {
			this.component('SlotBody', { slot_type: Lootr.PLAYER_SLOTS.BODY, slot_count: args.body_slot_count });
		}

		if(args.hand_item) {
			this.component('SlotHand', { slot_type: Lootr.PLAYER_SLOTS.HAND, slot_count: args.hand_slot_count, item: Lootr.Treasure.generate(Lootr.TREASURE_TYPES.HAND, args.hand_item) });
		} else {
			this.component('SlotHand', { slot_type: Lootr.PLAYER_SLOTS.HAND, slot_count: args.hand_slot_count });
		}

		if(args.finger_item) {
			this.component('SlotFinger', { slot_type: Lootr.PLAYER_SLOTS.FINGER, slot_count: args.finger_slot_count, item: Lootr.Treasure.generate(Lootr.TREASURE_TYPES.FINGER, args.finger_item) });
		} else {
			this.component('SlotFinger', { slot_type: Lootr.PLAYER_SLOTS.FINGER, slot_count: args.finger_slot_count });
		}

		if(args.feet_item) {
			this.component('SlotFeet', { slot_type: Lootr.PLAYER_SLOTS.FEET, slot_count: args.feet_slot_count, item: Lootr.Treasure.generate(Lootr.TREASURE_TYPES.FEET, args.feet_item) });
		} else {
			this.component('SlotFeet', { slot_type: Lootr.PLAYER_SLOTS.FEET, slot_count: args.feet_slot_count });
		}
	}

	Player.prototype = new Entity;

	// Save the player object to a localStorage cookie
	Player.prototype.save = function() {
		var cache = {};
		$.each(this.$components, function(key, value) {
			if(typeof value.save === "function") {
				cache[key] = value.save();
			}
			else
			{
				UI.logDebug("component missing save() function", key);
			}
		});

		return cache;
	}

	namespace.Player = Player;
})(Lootr.entities, Lootr);
