// Head Slot Table
var head_table = [
	{
		name: "Cap",
		desc: "You find a little leather cap.",
		equip: "You throw on the cap.",
		unequip: "You pull off the cap.",
		use: "Does nothing..",
		stat_affected: Lootr.PLAYER_STATS.DEF,
		stat_amount: 1,
		stat_magical_amount : 0,
		value: 500,
		slot: Lootr.PLAYER_SLOTS.HEAD,
		type: Lootr.TREASURE_TYPES.HEAD,
		rarity: Lootr.ITEM_RARITY.COMMON,
		color : Lootr.ITEM_RARITY_COLORS.COMMON
	},
	{
		name: "Great Helm",
		desc: "You find a intimidating piece of armor.",
		equip: "Your vision disappears for a second while you fit into the helm.",
		unequip: "You pull the helm off.",
		use: "Does nothing..",
		stat_affected: Lootr.PLAYER_STATS.DEF,
		stat_amount: 5,
		stat_magical_amount : 3,
		value: 400,
		slot: Lootr.PLAYER_SLOTS.HEAD,
		type: Lootr.TREASURE_TYPES.HEAD,
		rarity: Lootr.ITEM_RARITY.MAGICAL,
		color : Lootr.ITEM_RARITY_COLORS.MAGICAL
	},
]
