
// Inventory Component
function InventoryComponent()
{
	this.init();
}

InventoryComponent.prototype.init = function()
{
	this.items = [];
}

InventoryComponent.prototype.giveItem = function( item )
{
	this.items.push(item);

	//UI.logPlayerItem(item);
}

InventoryComponent.prototype.removeItem = function( item )
{
	// find item in inventory
	for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].name === item.name) {

        	// Remove item from display
        	//UI.logRemovePlayerItem(this.items[i]);

        	// Remove item from player items array
           this.items.splice(i, 1);
           return true;
        }
    }

    return false;
}

InventoryComponent.prototype.hasItem = function( item )
{
	for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].name === item) {
            return true;
        }
    }

    return false;
}

InventoryComponent.prototype.hasItemType = function( type )
{
	for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].type === type) {
            return true;
        }
    }

    return false;
}

// Returns an array of all of the items currently in player inventory of item_type
InventoryComponent.prototype.getAllItemsByType = function( item_type )
{
	var items = [];

	for(var i=0; i < this.items.length; i++)
	{
		if(this.items[i].type == Lootr.TREASURE_TYPES.CONSUMABLE)
		{
			items.push(this.items[i]);
		}
	}

	return items;
}

InventoryComponent.prototype.getItem = function( item )
{
	var item;

	for (var i = 0; i < this.items.length; i++) {
	        if (this.items[i].name === item) {
	            item = this.items[i];

	            break;
	        }
	    }

	return item;
}

InventoryComponent.prototype.getAllItems = function(  )
{
	return this.items;
}


InventoryComponent.prototype.sellItems = function()
{
	var value = 0;

	for(var i=0; i<this.items.length; i++)
	{
		if(this.items[i].type != Lootr.TREASURE_TYPES.CONSUMABLE)
		{
			value += this.items[i].value;

			// remove item from inventory
			this.removeItem(this.items[i]);

			// give player gold @todo remove this from here?!
			player.Gold.giveGold(value);
		}
	}

	if(value > 0)
	{
		UI.log("Items Sold for " + value);
	}
	else
	{
		UI.log("You had nothing the merchant wanted.");
	}
}

InventoryComponent.prototype.checkPotions = function()
{
	var percentage = 25;

	// If hp <= 25% of max_hp
	var remaining = (this.hp / this.max_hp) * 100;
	if(remaining <= percentage && player.hasItemType(Lootr.TREASURE_TYPES.CONSUMABLE))
	{
		// find potion of lowest value
		var pots = this.getAllItemsByType(Lootr.TREASURE_TYPES.CONSUMABLE);

		// get potion
		var pot = pots.pop();

		// use potion
		this.usePotion( pot );
	}
}

InventoryComponent.prototype.usePotion = function( potion )
{
	// Use Potion
	UI.log("You Quaff a potion for " + potion.stat_amount);

	// Modify player stats @todo get this out of here
	player.Health.giveHealth(potion.stat_amount);

	// remove from items list
	this.removeItem( potion );
}