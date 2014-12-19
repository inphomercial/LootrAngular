
// Body Slot Template Available Options
//
// ** name
// ** desc
// ** equip  
// ** unequip
// ** atk
// ** def
// ** mag
// ** hp
// ** mp
// ** slot
// ** rarity  Lootr.ITEM_RARITY_COLORS.(COMMON, MAGICAL, SET, UNIQUE)
// ** color   Lootr.ITEM_RARITY.(COMMON, MAGICAL, SET, UNIQUE)
// ** equipable true/false (default: true)

var body_table = [
	{
		// Rework these
		desc: "Next to a pile of bodies, you discover something.",
		use: "Does nothing..",

		name: "Immortal King's Eternal Reign",		
		equip: "You heave the armor with all your might onto your body.",
		unequip: "You peel the armor off your body, painfully.",
		atk : 2,
		def : 2,
		hp: 100,
		mp: 25,
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
		atk : 1,
		def : 1,	
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
		def : 1,			
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
		def : 1,	
		hp: 10,
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
		def : 2,		
		value: 70,
		slot: Lootr.PLAYER_SLOTS.BODY,
		type: Lootr.TREASURE_TYPES.BODY,
		rarity: Lootr.ITEM_RARITY.COMMON,
		color : Lootr.ITEM_RARITY_COLORS.COMMON
	}
]