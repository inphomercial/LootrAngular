// Hand Slot Table
var hand_table = [
	{
		name: "Silver Sword",
		desc: "In the darkened room, you see a chest in the corner.",
		equip: "You take the sword into your hand.",
		unequip: "You pack away your sword.",
		look: "Looks to be a simple silver sword.",
		
		//stat_affected: Lootr.PLAYER_STATS.ATK,
		//stat_amount: 2,
		//stat_magical_amount : 0,
		atk: 2,

		value: 25,
		slot: Lootr.PLAYER_SLOTS.HAND,
		type: Lootr.TREASURE_TYPES.HAND,
		rarity: Lootr.ITEM_RARITY.COMMON,
		color : Lootr.ITEM_RARITY_COLORS.COMMON
		/*attribute_mod: Lootr.PLAYER_STATS.WIS,*/
		/*mod_amount: 4,*/
	},
	{
		name: "Skull Mace",
		desc: "Leaning against the wall, a skull tied to a club lies.",
		equip: "You put the power mace in your hands.",
		unequip: "You stop using the Skull Mace.",
		look: "A heafty knotty mace, resembling a skull on top.",
		
		//stat_affected: Lootr.PLAYER_STATS.ATK,
		//stat_amount: 4,
		//stat_magical_amount : 3,
		atk: 4,
		mag: 1,

		value: 55,
		slot: Lootr.PLAYER_SLOTS.HAND,
		type: Lootr.TREASURE_TYPES.HAND,
		rarity: Lootr.ITEM_RARITY.UNIQUE,
		color : Lootr.ITEM_RARITY_COLORS.UNIQUE
		/*mod_amount: 4,*/
	}
]
