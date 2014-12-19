/**
 * @class Entity
 * @extends Listener
 */
function Entity () {
	Listener.call(this)
	this.$components = {};
}

Entity.prototype = new Listener;

// For any possible component add it to this object
Entity.components = {
	Health: Health,
	Gold: Gold,
	Level: Level,
	Progress: Progress,
	Atk: Atk,
	Def: Def,
	Mag: Mag,
	Inventory: Inventory,
	SlotHead: SlotHead,
	SlotBody: SlotBody,
	SlotHand: SlotHand,
	SlotFinger: SlotFinger,
	SlotFeet: SlotFeet,
	Consumable: Consumable,
    Location: Location,
    Movement: Movement,
    Message: Message,
    Equipable: Equipable
};

Entity.prototype.component = function (name, args) {
	var generator, component;

	if (!(name in Entity.components)) {
		throw new Error('Invalid component: ' + name);
	}

	generator = Entity.components[ name ];
	component = new generator(this, args || {});

	this.$components[ name ] = component;
	this[ name ] = component;
};

Entity.prototype.has = function (name) {
	return name in this.$components;
};
