// Feet Slot Table
var feet_table = [
	{
		name: "Leather Boots",
		desc: "On the wall you see a rack with assorted gear. You pull off the only good piece",
		equip: "You work the straps and put on the boots.",
		unequip: "You take the old boots off.",
		//use: "You work the straps and put on the boots.",
		
		//stat_affected: Lootr.PLAYER_STATS.DEF,
		//stat_amount: 2,
		//stat_magical_amount : 2,

		def: 2,

		value: 5,
		slot: Lootr.PLAYER_SLOTS.FEET,
		type: Lootr.TREASURE_TYPES.FEET,
		rarity: Lootr.ITEM_RARITY.MAGICAL,
		color : Lootr.ITEM_RARITY_COLORS.MAGICAL
	},
	{
		name: "Boots",
		desc: "On the wall you see a rack with assorted gear. You pull off the only good piece",
		equip: "You work the straps and put on the boots.",
		unequip: "You take the old boots off.",
		//use: "You work the straps and put on the boots.",
		//stat_affected: Lootr.PLAYER_STATS.DEF,
		//stat_amount: 2,
		//stat_magical_amount : 2,

		def: 2,

		value: 5,
		slot: Lootr.PLAYER_SLOTS.FEET,
		type: Lootr.TREASURE_TYPES.FEET,
		rarity: Lootr.ITEM_RARITY.MAGICAL,
		color : Lootr.ITEM_RARITY_COLORS.MAGICAL
	},
	{
		name: "Spike Strides",
		desc: "A glint catches your eye in the corner.",
		equip: "You tie the jagged covers to your heels.",
		unequip: "You kick off your feet coverings.",
		//use: "You work the straps and put on the boots.",
		
		//stat_affected: Lootr.PLAYER_STATS.ATK,
		//stat_amount: 2,
		//stat_magical_amount : 3,

		def: 2,
		atk: 2,

		value: 4,
		slot: Lootr.PLAYER_SLOTS.FEET,
		type: Lootr.TREASURE_TYPES.FEET,
		rarity: Lootr.ITEM_RARITY.SET,
		color : Lootr.ITEM_RARITY_COLORS.SET
	},
	{
		name: "Sandals",
		desc: "You find a plain pair of sandals",
		equip: "Your sore feet slip right in.",
		unequip: "The sandals fall off.",
		//use: "Your sore feet slip right in.",
		//stat_affected: Lootr.PLAYER_STATS.DEF,
		//stat_amount: 1,
		//stat_magical_amount : 0,

		def: 1,
		
		value: 1,
		slot: Lootr.PLAYER_SLOTS.FEET,
		type: Lootr.TREASURE_TYPES.FEET,
		rarity: Lootr.ITEM_RARITY.COMMON,
		color : Lootr.ITEM_RARITY_COLORS.COMMON
	}
]