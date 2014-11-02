
var Lootr = {

	// Global debug switch
	DEBUG: true,

	// Version
	VERSION: 0.22,

	TREASURE_TYPES: {

		GOLD        : "gold",
		HAND 		: "hand",
		FEET        : "feet",
		BODY		: "body",
		FINGER      : "finger",
		CONSUMABLE  : "consumable",
		HEAD        : "head"
	},

	ITEM_RARITY_COLORS: {

		COMMON  : "item_common",
		MAGICAL : "item_magical",
		SET     : "item_set",
		UNIQUE  : "item_unique"
	},

	ITEM_RARITY: {

		COMMON  : "common", // based damage
		MAGICAL : "magical", // based damage + range damage
		SET     : "set", // range damage, stat mods, bonus for multiple set items
		UNIQUE  : "unique" // range damage, stat mods, unique things
	},

	EVENT_CHANCE: {

		GOLD:     .30,
		TRAP:     .30,
		MONSTER:  .30,
		TREASURE: .30,
		SAVE:     .30
	},

	/*
	LOOT_CHANCE: {

		GOLD : .50,
		HAND : .10,
		FEET : .10,
		BODY : .10,
		FINGER : .10,
		CONSUMABLE : .20
	},
*/

	GAME_STATES: {

		DEAD: 0,
		RUNNING: 1,
		BATTLE: 2
	},

	PLAYER_STATS: {

		ATK: "atk",
		DEF: "def",
		MAG: "mag",
		HP:  "max_hp"
	},

	PLAYER_STATUS: {

		DEAD   : 0,
		NORMAL : 1,
		POISON : 2
	},

	PLAYER_SLOTS: {

		HAND   : "SlotHand",
		HEAD   : "SlotHead",
		BODY   : "SlotBody",
		FINGER : "SlotFinger",
		FEET   : "SlotFeet"
	},

	ROUND_ATR: {

		ATK: "atk",
		DEF: "def",
		MAG: "mag"
	},

	/**
	 * Treasure
	Treasure
	*/

	/**
	 * TurnManager controlls the entire turn
	TurnManager
	*/

	/**
	 * EventManager controls the generation of each event type
	EventManager
	 */

	/**
	 * holds all entity "classes"
	 * @type {Object}
	 */
	entities: {},

	/**
	 * Holds all room enttiies
	 */
	rooms: {}
}