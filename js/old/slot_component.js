
// Base Slot Component
function SlotComponent( slot_type )
{
	this.init(slot_type);
}

SlotComponent.prototype.init = function( slot_type )
{
	this.slot_type = slot_type;
	this.item = {};
}

SlotComponent.prototype.equipItem = function( item )
{
	//UI.logDebug("Equipting " + item.name + " in slot type " + this.slot_type);

	// Give item to slot
	//this.item = item;

	// Update player slot display @todo moves these
	//UI.logSpace();
	//UI.logPlayerEquipSlot( this.item );
	//UI.logSpace();

	// Update Inventory display @todo move these
	//UI.logRemovePlayerItem( this.item );

	// Update log with item equip action
	//UI.log(this.item.equip);

	// Determine item type, update stat for it
	if(this.item.stat_affected == Lootr.PLAYER_STATS.ATK)
	{
		player.Atk.giveStat(this.item.total_amount);
	}
	if(this.item.stat_affected == Lootr.PLAYER_STATS.DEF)
	{
		player.Def.giveStat(this.item.total_amount);
	}
	if(this.item.stat_affected == Lootr.PLAYER_STATS.MAG)
	{
		player.Mag.giveStat(this.item.total_amount);
	}

	// Update Stats @todo fix this
	//player.updateStat( this.item );
}

SlotComponent.prototype.unequipSlot = function()
{

	//console.log("UNequipting Slot " + this.slot_type);
	// debugging help
	/*if(slot === undefined)
	{
		console.log("There was a problem trying to unequip a slot : " + slot);
	}*/

	// Check if there is already an item
	if(!$.isEmptyObject(this.item))
	{
		// Get the item so we know how to modify the stats.
		var item = this.item;

		// Clear player slot
		this.item = {};

		// Update Stats @todo put this somewhere
		player[item.stat_affected] -= item.stat_amount;

		// Update display @todo where does this go
		UI.logPlayerUnequipSlot( item );

		// Update log with item unequip action
		UI.logSpace();
		UI.log(item.unequip);
		UI.logSpace();

		// Add unequiped item back to Inventory @todo where does this go
		player.Inventory.giveItem(item);
		//player.items.push(item);
	}
}

SlotComponent.prototype.totalAmount = function()
{
	return this.item.total_amount;
}

SlotComponent.prototype.getTotalSlotValue = function()
{
	if(this.slot_type == Lootr.PLAYER_SLOTS.HEAD)
	{
		return player.Head_slot.totalAmount();
	}
	else if(this.slot_type == Lootr.PLAYER_SLOTS.BODY)
	{
		return player.Body_slot.totalAmount();
	}
	else if(this.slot_type == Lootr.PLAYER_SLOTS.HAND)
	{
		return player.Hand_slot.totalAmount();
	}
	else if(this.slot_type == Lootr.PLAYER_SLOTS.FEET)
	{
		return player.Feet_slot.totalAmount();
	}
	else if(this.slot_type == Lootr.PLAYER_SLOTS.FINGER)
	{
		return player.Finger_slot.totalAmount();
	}
	else
	{
		return 0;
	}
}

SlotComponent.prototype.checkForUpgrade = function()
{
	// Get all of a slot type
	var slot_items = [];

	// Add all items of slot type to local array
	//for(var i=0; i<this.items.length; i++)
	for(var i=0; i<player.Inventory.items.length; i++)
	{
		//if(player.items[i].slot == slot)
		if(player.Inventory.items[i].slot == this.slot_type)
		{
			slot_items.push(player.Inventory.items[i]);
			//slot_items.push(player.items[i]);
		}
	}

	// Verify the slot has unequipped items
	if(slot_items.length < 1)
	{
		return false;
	}

	// Check current inventory slot types and get highest stat_amount
	var current_highest_item;
	var current_highest_value = 0;

	// If there is no equipped item already in the slot, set it to 0
	//if($.isEmptyObject(player[this.slot_type]))
	if($.isEmptyObject(this.item))
	{
		var slot_value = 0;
	}
	else
	{
		//@todo this needs to get the players total amount for slot.
		//how do we dynamically pass which slot to get it for?!
		//var slot_value = player[this.slot_type].total_amount;
		var slot_value = this.getTotalSlotValue();
	}

	for(var i=0; i<slot_items.length; i++)
	{
		if(slot_value < slot_items[i].total_amount)
		{
			current_highest_value = slot_items[i].total_amount;
			current_highest_item = slot_items.pop(i);
		}
	}

	// check stat_amount for slot type against what's equiped
	if(current_highest_value < slot_value)
	{
		// Currently eqiupped is the best
		return false;
	}
	else
	{
		// If there is a item in slot already, remove it
		if(!$.isEmptyObject(player[this.slot_type]))
		{
			// Unequip current item
			//player.unequipSlot(slot);
			this.unequipSlot();
		}

		// equip current_highest_item;
		// @todo get this moved out
		/*player.equipItem(current_highest_item);*/
		this.equipItem(current_highest_item);

		// Remove item from inventory
		// @todo get this moved out
		player.Inventory.removeItem(current_highest_item);
		//this.removeFromInventoryList(current_highest_item);
	}
}