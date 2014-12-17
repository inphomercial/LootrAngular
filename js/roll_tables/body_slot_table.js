// Body Slot Table
var body_table = [
	{
		name: "Immortal King's Eternal Reign",
		desc: "Next to a pile of bodies, you discover something.",
		equip: "You heave the armor with all your might onto your body.",
		unequip: "You peel the armor off your body, painfully.",
		use: "Does nothing..",
		stat_affected: Lootr.PLAYER_STATS.DEF,
		stat_amount: 7,
		stat_magical_amount : 5,

		// New stat system test
		atk : 1,
		def : 2,
		hp: 100,	

		value: 500,
		slot: Lootr.PLAYER_SLOTS.BODY,
		type: Lootr.TREASURE_TYPES.BODY,
		rarity: Lootr.ITEM_RARITY.SET,
		color : Lootr.ITEM_RARITY_COLORS.SET
	},
	{
		name: "Plain shirt",
		desc: "Next to a pile of bodies, you discover something.",
		equip: "You slip the cool shirt on.",
		unequip: "You throw the shirt off.",
		use: "Does nothing..",

		// Old Stat Systaem (Deprecation in the works)
		stat_affected: Lootr.PLAYER_STATS.DEF,
		stat_amount: 1,
		stat_magical_amount : 0,

		// New stat system test
		atk : 1,
		def : 2,	
		hp: 100,	

		value: 10,
		slot: Lootr.PLAYER_SLOTS.BODY,
		type: Lootr.TREASURE_TYPES.BODY,
		rarity: Lootr.ITEM_RARITY.COMMON,
		color : Lootr.ITEM_RARITY_COLORS.COMMON
	},
	{
		name: "Cloth",
		desc: "An old rag lays here.",
		equip: "You throw on the rags.",
		unequip: "You toss the rags off.",
		use: "Does nothing..",
		stat_affected: Lootr.PLAYER_STATS.DEF,
		stat_amount: 1,
		stat_magical_amount : 0,

		// New stat system test
		atk : 1,
		def : 2,	
		hp: 100,

		value: 10,
		slot: Lootr.PLAYER_SLOTS.BODY,
		type: Lootr.TREASURE_TYPES.BODY,
		rarity: Lootr.ITEM_RARITY.COMMON,
		color : Lootr.ITEM_RARITY_COLORS.COMMON
	},
	{
		name: "Tanned Leather skin",
		desc: "You find a foul smelling animal skin.",
		equip: "You hoist the leather over your shoulders.",
		unequip: "You throw off the leather.",
		use: "Does nothing..",
		stat_affected: Lootr.PLAYER_STATS.DEF,
		stat_amount: 2,
		stat_magical_amount : 0,

		// New stat system test
		atk : 1,
		def : 2,	
		hp: 100,

		value: 25,
		slot: Lootr.PLAYER_SLOTS.BODY,
		type: Lootr.TREASURE_TYPES.BODY,
		rarity: Lootr.ITEM_RARITY.COMMON,
		color : Lootr.ITEM_RARITY_COLORS.COMMON
	},
	{
		name: "Banded Mail",
		desc: "You see a stack of material on the ground.",
		equip: "You put on the mail.",
		unequip: "You take off the mail.",
		use: "Does nothing..",
		stat_affected: Lootr.PLAYER_STATS.DEF,
		stat_amount: 4,
		stat_magical_amount : 0,

		// New stat system test
		atk : 1,
		def : 2,	
		hp: 100,

		value: 70,
		slot: Lootr.PLAYER_SLOTS.BODY,
		type: Lootr.TREASURE_TYPES.BODY,
		rarity: Lootr.ITEM_RARITY.COMMON,
		color : Lootr.ITEM_RARITY_COLORS.COMMON
	}
]