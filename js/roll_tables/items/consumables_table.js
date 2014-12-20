// Consumables
var consumable_table = [
	{
		id: "EMPTY_FLASK",
		desc: "You find an almost empty bottle.",
		name: "Empty Flask",
		consume_amount: 3,
		value: 2,
		type: Lootr.TREASURE_TYPES.CONSUMABLE,
		color: Lootr.ITEM_RARITY_COLORS.COMMON,
		is_consumable: true,
		equipable: false,
		sips: 1
	},
	{
		id: "SMALL_FLASK",
		desc: "A metal flask filled with some type of liquid.",
		name: "Small Flask",
		consume_amount: 10,
		value: 5,
		type: Lootr.TREASURE_TYPES.CONSUMABLE,
		color: Lootr.ITEM_RARITY_COLORS.COMMON,
		is_consumable: true,
		equipable: false,
		sips: 2
	},
	{
		id: "HEALING_FLASK",
		desc: "A mighty potion.",
		name: "Healing Flask",
		consume_amount: 15,
		value: 10,
		type: Lootr.TREASURE_TYPES.CONSUMABLE,
		color: Lootr.ITEM_RARITY_COLORS.MAGICAL,
		is_consumable: true,
		equipable: false,
		sips: 4
	}
]