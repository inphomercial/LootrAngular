// Race
var race_table = [
	{
		race: "Goblin",

		// Health Component
		hp: 70,
		max_hp: 70,

		// Gold Component
		gold: 25,

		// Level Component
		level: 1,
		current_exp: 0,
		exp_to_level: 70,

        // Movement Component
        moveable: true,

		// Stats Components
		atk: 1,
		def: 1,
		mag: 2,

		// Slots Components
		// Used to establish if the item slot starts with an item.
		head_item: false,
		body_item: false,
		hand_item: false,
		finger_item: false,
		feet_item: false,
		// Used to tell how many slots of that type the race gets
		head_slot_count: 1,
		body_slot_count: 1,
		hand_slot_count: 1,
		finger_slot_count: 1,
		feet_slot_count: 1
	},
	{
		race: "Orc",
		hp: 120,
		max_hp: 120,
		gold: 0,
		level: 1,
		current_exp: 0,
		exp_to_level: 200,
        // Movement Component
        moveable: true,
		atk: 3,
		def: 3,
		mag: 0,
		head_item: false,
		body_item: Lootr.ITEM_RARITY.COMMON,
		hand_item: false,
		finger_item: false,
		feet_item: false,
		head_slot_count: 1,
		body_slot_count: 1,
		hand_slot_count: 1,
		finger_slot_count: 1,
		feet_slot_count: 1
	},
	{
		race: "Two Headed Ogre",
		hp: 150,
		max_hp: 150,
		gold: 0,
		level: 1,
		current_exp: 0,
		exp_to_level: 220,
        // Movement Component
        moveable: true,
		atk: 1,
		def: 1,
		mag: 1,
		head_item: false,
		body_item: false,
		hand_item: false,
		finger_item: false,
		feet_item: false,
		head_slot_count: 2,
		body_slot_count: 1,
		hand_slot_count: 1,
		finger_slot_count: 1,
		feet_slot_count: 1
	},
	{
		race: "Wizard",
		hp: 40,
		max_hp: 40,
		gold: 0,
		level: 1,
		current_exp: 0,
		exp_to_level: 75,
        // Movement Component
        moveable: true,
		atk: 0,
		def: 0,
		mag: 2,
		head_item: false,
		body_item: false,
		hand_item: false,
		finger_item: Lootr.ITEM_RARITY.COMMON,
		feet_item: false,
		head_slot_count: 1,
		body_slot_count: 1,
		hand_slot_count: 1,
		finger_slot_count: 3,
		feet_slot_count: 1
	},
	{
		race: "Human",
		hp: 100,
		max_hp: 100,
		gold: 0,
		level: 1,
		current_exp: 0,
		exp_to_level: 100,
        // Movement Component
        moveable: true,
		atk: 1,
		def: 1,
		mag: 1,
		head_item: false,
		body_item: false,
		hand_item: false,
		finger_item: false,
		feet_item: false,
		head_slot_count: 1,
		body_slot_count: 1,
		hand_slot_count: 2,
		finger_slot_count: 2,
		feet_slot_count: 1
	},
	{
		race: "Centaur",
		hp: 110,
		max_hp: 110,
		gold: 0,
		level: 1,
		current_exp: 0,
		exp_to_level: 100,
        // Movement Component
        moveable: true,
		atk: 1,
		def: 1,
		mag: 1,
		head_item: false,
		body_item: false,
		hand_item: false,
		finger_item: false,
		feet_item: false,
		head_slot_count: 1,
		body_slot_count: 1,
		hand_slot_count: 1,
		finger_slot_count: 1,
		feet_slot_count: 2
	}
]
