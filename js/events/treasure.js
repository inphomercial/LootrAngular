(function (namespace, Lootr) {
	'use strict';

	var Treasure = {

		/**
		 * Generates a Thing entity Item
		 * Type: a roll table type {required}
		 * Rarity: Lootr.ITEM_RARITY.level {optional}
		 **/
		generate: function ( type, rarity ) {

			// The ability to manually pass in the type of treasure to generate
			if(type && rarity) {
				var item = Treasure._rollOnTypeTable( type, rarity );
				UI.logDebug(item);
			}
			else if(type) {
				var item = Treasure._rollOnTypeTable( type );
			}
			else
			{
				var localLoot = Treasure._buildLocalLootTable();
				var type = Treasure._determineType( localLoot );
				var item = Treasure._rollOnTypeTable( type );
			}

			// Build Thing Entity
			var thing_item = new Lootr.entities.Thing(item);

			UI.logDebug("Generated Treasure", thing_item);

			return thing_item;
		},

		_buildLocalLootTable: function() {

			// Build local array based on all loot tables
			var localLoot = [];

			// Head
			for(var i=0; i<head_table.length; i++)
			{
				localLoot.push(head_table[i]);
			}

			// Hands
			for(var i=0; i<hand_table.length; i++)
			{
				localLoot.push(hand_table[i]);
			}

			// Feet
			for(var i=0; i<feet_table.length; i++)
			{
				localLoot.push(feet_table[i]);
			}

			// Body
			for(var i=0; i<body_table.length; i++)
			{
				localLoot.push(body_table[i]);
			}

			// Finger
			for(var i=0; i<finger_table.length; i++)
			{
				localLoot.push(finger_table[i]);
			}

			// Consumables
			for(var i=0; i<consumable_table.length; i++)
			{
				localLoot.push(consumable_table[i]);
			}

			return localLoot;
		},

		_determineStatAmount: function( magical_stat )
		{
			var bonus = Math.floor(Math.random()*(magical_stat-0+1)+0);

			// For non common items, at the very least 1 to bonus
			if(bonus === 0)
			{
				bonus++
			}

			return bonus;
		},

		// Used to just determine what loot table type to roll on
		_determineType: function( localLoot ) {

			// Get a random number from the localLoot length
			var random_number = Math.floor(Math.random() * localLoot.length);

			// Grab a element randomly from array
			var item = localLoot[random_number];

			return item.type;
		},

		_rollOnTypeTable: function( type, rarity ) {

			var temp_item = {};

			switch( type ) {

				case Lootr.TREASURE_TYPES.GOLD:
					if(rarity)
					{
						while(temp_item.rarity != rarity)
						{
							temp_item = gold_table[Math.floor(Math.random()*gold_table.length)];
						}
					}
					else
					{
						temp_item = gold_table[Math.floor(Math.random()*gold_table.length)];
					}

					var item = $.extend({}, temp_item);
					break;

				case Lootr.TREASURE_TYPES.HEAD:
					if(rarity)
					{
						while(temp_item.rarity != rarity)
						{
							temp_item = head_table[Math.floor(Math.random()*head_table.length)];
						}
					}
					else
					{
						temp_item = head_table[Math.floor(Math.random()*head_table.length)];
					}

					var item = $.extend({}, temp_item);
					break;

				case Lootr.TREASURE_TYPES.HAND:
					if(rarity)
					{
						while(temp_item.rarity != rarity)
						{
							temp_item = hand_table[Math.floor(Math.random()*hand_table.length)];
						}
					}
					else
					{
						temp_item = hand_table[Math.floor(Math.random()*hand_table.length)];
					}

					var item = $.extend({}, temp_item);
					break;

				case Lootr.TREASURE_TYPES.FEET:
					if(rarity)
					{
						while(temp_item.rarity != rarity)
						{
							temp_item = feet_table[Math.floor(Math.random()*feet_table.length)];
						}
					}
					else
					{
						temp_item = feet_table[Math.floor(Math.random()*feet_table.length)];
					}

					var item = $.extend({}, temp_item);
					break;

				case Lootr.TREASURE_TYPES.BODY:
					if(rarity)
					{
						while(temp_item.rarity != rarity)
						{
							temp_item = body_table[Math.floor(Math.random()*body_table.length)];
						}
					}
					else
					{
						temp_item = body_table[Math.floor(Math.random()*body_table.length)];
					}

					var item = $.extend({}, temp_item);
					break;

				case Lootr.TREASURE_TYPES.FINGER:
					if(rarity)
					{
						while(temp_item.rarity != rarity)
						{
							temp_item = finger_table[Math.floor(Math.random()*finger_table.length)];
						}
					}
					else
					{
						temp_item = finger_table[Math.floor(Math.random()*finger_table.length)];
					}

					var item = $.extend({}, temp_item);
					break;

				case Lootr.TREASURE_TYPES.CONSUMABLE:
					if(rarity)
					{
						while(temp_item.rarity != rarity)
						{
							temp_item = consumable_table[Math.floor(Math.random()*consumable_table.length)];
						}
					}
					else
					{
						temp_item = consumable_table[Math.floor(Math.random()*consumable_table.length)];
					}

					var item = $.extend({}, temp_item);
					break;

				default:
				break;
			}

			// if item is not common
			if(item.rarity != Lootr.ITEM_RARITY.COMMON)
			{
				// if item is not consumable
				if(item.type != Lootr.TREASURE_TYPES.CONSUMABLE)
				{
					// if item is not gold
					if(item.type != Lootr.TREASURE_TYPES.GOLD)
					{
						// Get perfect roll amount for item + magical stats possibility
						var perfect_roll = item.stat_amount + item.stat_magical_amount;

						item.bonus = Treasure._determineStatAmount(item.stat_magical_amount);

						// Check if item is perfect roll
						if(perfect_roll == item.bonus + item.stat_amount)
						{
							var perfect_string = "*" + item.name + "*";
							item.name = perfect_string;
						}

					}
				}
			}

			return item;
		}
	}

	namespace.Treasure = Treasure;
})(Lootr, Lootr);