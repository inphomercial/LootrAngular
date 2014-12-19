// Consumables
var consumable_table = [
	{
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