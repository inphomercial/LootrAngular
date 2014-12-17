
// Base Slot Component
function Slot( entity, args ) {
	var slot = this;

	if (!args) {
		args = {};
	}

	Component.call(this, entity, args);

	this.$item = [];

	// Slot Type
	this.$slot_type = args.slot_type;

	// Slots
	this.$slot_count = args.slot_count;

	for(var i=0; i<args.slot_count; i++) {
		if(args.item) {
			this.$item.push(args.item);
			delete args.item;
		}
		else {
		    this.$item.push({ name: "empty" });
		}
	}
}

Slot.prototype = new Component;

Slot.prototype.equipSlot = function( item ) {

    var slot = this;

    // To tell if equip was success or not.
	var worked = false;

	$.each(slot.$item, function(index, value) {
		if(value.name === "empty") {
			// Remove the empty object
			slot.$item.splice(index, 1);
			// Push our new item in
			slot.$item.push(item);

			worked = true;
			return false;
		}
		else
		{
			UI.logSpace();
			UI.log("You have no place to equip that!");
			UI.logSpace();
			worked = false;
			return;
		}
	});

	// If nothing was equipped, we need to exit this function.
	if(!worked) {
		return;
	};

	// Debug info
	UI.logDebug("Equipeding " + item.name + " in slot type " + item.slot);

	// Display the equip description
	UI.logSpace();
	UI.log(item.equip);
	UI.logSpace();

	// Emit to Inventory that we equipped item, remove it from Inventory
	this.$entity.emit('Inventory.equippingItem', [item]);

	// Update Affected Stat value
	//this.$entity.emit('Stat.giveStat', [item.stat_affected, item.stat_amount]);

	// New Stat System
	this.$entity.emit('Stat.giveStat', [Lootr.PLAYER_STATS.ATK, item.atk]);
	this.$entity.emit('Stat.giveStat', [Lootr.PLAYER_STATS.DEF, item.def]);
	this.$entity.emit('Stat.giveStat', [Lootr.PLAYER_STATS.MAG, item.mag]);
	this.$entity.emit('Stat.giveStat', [Lootr.PLAYER_STATS.HP, item.hp]);
	this.$entity.emit('Stat.giveStat', [Lootr.PLAYER_STATS.MP, item.mp]);
};

Slot.prototype.unequipSlot = function( index ) {

	console.log("Unequippeding Slot " + this.$item.slot);

	// Ensure the slot isnt empty or just the empty place holder before trying to access it
	if(!$.isEmptyObject(this.$item[index]) && this.$item[index].name !== "empty")
	{
		// Display the equip description
		UI.logSpace();
		UI.log(this.$item[index].unequip);
		UI.logSpace();

		// Emit to Inventory that we equipped item, remove it from Inventory
		this.$entity.emit('Inventory.giveItem', [this.$item[index]]);

		// Update Affected Stat Value by removing removed item value
		//this.$entity.emit('Stat.takeStat', [this.$item[index].stat_affected, this.$item[index].stat_amount]);

		// New Stat System
		this.$entity.emit('Stat.takeStat', [Lootr.PLAYER_STATS.ATK, this.$item[index][Lootr.PLAYER_STATS.ATK]]);
		this.$entity.emit('Stat.takeStat', [Lootr.PLAYER_STATS.DEF, this.$item[index][Lootr.PLAYER_STATS.DEF]]);
		this.$entity.emit('Stat.takeStat', [Lootr.PLAYER_STATS.MAG, this.$item[index][Lootr.PLAYER_STATS.MAG]]);
		this.$entity.emit('Stat.takeStat', [Lootr.PLAYER_STATS.HP,  this.$item[index][Lootr.PLAYER_STATS.HP]]);
		this.$entity.emit('Stat.takeStat', [Lootr.PLAYER_STATS.MP,  this.$item[index][Lootr.PLAYER_STATS.MP]]);

		// Clear the slot
		this.$item[index] = { name: "empty" };
	}
};

Slot.prototype.getName = function() {
	return this.$item.name;
};

Slot.prototype.getBaseStat = function() {
	return this.$item.stat_amount;
};

Slot.prototype.getMagicStat = function() {
	return this.$item.stat_magical_amount;
};


// ** Extended Actual Slots used ** //

function SlotHead( entity, args ) {
	var slot = this;

	Slot.call(this, entity, args);
}

SlotHead.prototype = new Slot;


function SlotBody( entity, args ) {
	var slot = this;

	Slot.call(this, entity, args);
}

SlotBody.prototype = new Slot;


function SlotHand( entity, args ) {
	var slot = this;

	Slot.call(this, entity, args);
}

SlotHand.prototype = new Slot;


function SlotFinger( entity, args ) {
	var slot = this;

	Slot.call(this, entity, args);
}

SlotFinger.prototype = new Slot;


function SlotFeet( entity, args ) {
	var slot = this;

	Slot.call(this, entity, args);
}

SlotFeet.prototype = new Slot;
