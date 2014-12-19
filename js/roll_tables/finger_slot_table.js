// Finger Slot Table
var finger_table = [
	{
		name: "Immortal King's Gems",
		desc: "A rainbow of color emits from a small ring on the floor.",
		equip: "You feel powerful as you put the ring on.",
		unequip: "You feel weakend taking the ring off.",
		
		//stat_affected: Lootr.PLAYER_STATS.ATK,
		//stat_amount: 2,
		//stat_magical_amount : 2,

		atk: 2,

	    value: 2,
	    slot: Lootr.PLAYER_SLOTS.FINGER,
	    type:   Lootr.TREASURE_TYPES.FINGER,
	    rarity: Lootr.ITEM_RARITY.SET,
	    color:  Lootr.ITEM_RARITY_COLORS.SET,
	    is_consumable: false
	},
	{
		name: "Blue Ring",
		desc: "You find a blue stoned ring.",
		equip: "You slide the cold ring on your finger.",
		unequip: "You pull the ring off.",
		//stat_affected: Lootr.PLAYER_STATS.HP,
		//stat_amount: 4,
		//stat_magical_amount : 0,
		hp: 20,

	    value: 2,
	    slot: Lootr.PLAYER_SLOTS.FINGER,
	    type:   Lootr.TREASURE_TYPES.FINGER,
	    rarity: Lootr.ITEM_RARITY.COMMON,
	    color:  Lootr.ITEM_RARITY_COLORS.COMMON,
	    is_consumable: false
	},
	{
		name: "Coil Ring",
		desc: "You pick up what looks like coiled wire.",
		equip: "You struggle to slide the coils on.",
		unequip: "Your finger bleeds trying to remove the wiring.",
		//stat_affected: Lootr.PLAYER_STATS.MAG,
		//stat_amount: 2,
		//stat_magical_amount : 2,
		mag: 2,

	    value: 5,
	    slot: Lootr.PLAYER_SLOTS.FINGER,
	    type:   Lootr.TREASURE_TYPES.FINGER,
	    rarity: Lootr.ITEM_RARITY.MAGICAL,
	    color:  Lootr.ITEM_RARITY_COLORS.MAGICAL,
	    is_consumable: false
	},
	{
		name: "Metal Ring",
		desc: "You find a plain metal band.",
		equip: "You put on the ring.",
		unequip: "You pull off the ring.",
		//stat_affected: Lootr.PLAYER_STATS.MAG,
		//stat_amount: 1,
		//stat_magical_amount : 0,
		mag: 1,

	    value: 1,
	    slot:   Lootr.PLAYER_SLOTS.FINGER,
	    type:   Lootr.TREASURE_TYPES.FINGER,
	    rarity: Lootr.ITEM_RARITY.COMMON,
	    color:  Lootr.ITEM_RARITY_COLORS.COMMON,
	    is_consumable: false
	}
]