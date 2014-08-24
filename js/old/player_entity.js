/*(function (namespace, Lootr) {
	'use strict';
*/
function PlayerEntity() {
	this.name = this.generateName();

	// Health Compoment
	this.Health = new HealthComponent(100);

	// Level Compoment
	this.Level = new LevelComponent(1);

	// Gold Component
	this.Gold = new GoldComponent(0);

	// Inventory Component
	this.Inventory = new InventoryComponent();

	// Atk Component
	this.Atk = new AtkComponent(5);

	// Def Component
	this.Def = new DefComponent(5);

	// Mag Component
	this.Mag = new MagComponent(5);

	// Gold Component
	this.Status = new StatusComponent(Lootr.PLAYER_STATUS.NORMAL);

	// Player Slot Components
	this.Head_slot   = new SlotComponent(Lootr.PLAYER_SLOTS.HEAD);
	this.Body_slot   = new SlotComponent(Lootr.PLAYER_SLOTS.BODY);
	this.Hand_slot   = new SlotComponent(Lootr.PLAYER_SLOTS.HAND);
	this.Feet_slot   = new SlotComponent(Lootr.PLAYER_SLOTS.FEET);
	this.Finger_slot = new SlotComponent(Lootr.PLAYER_SLOTS.FINGER);

	// Update players inital display
	//UI.logUpdatePlayer();
	//this.updatePlayerUI();

	$('#player_name').text(this.name);
	$('#player_status').text(this.status);

	// Player Slot Initialization
	$('#player_slot_head').text("[empty]");
	$('#player_slot_body').text("[empty]");
	$('#player_slot_hand').text("[empty]");
	$('#player_slot_feet').text("[empty]");
	$('#player_slot_finger').text("[empty]");
}

PlayerEntity.prototype.getMinOfArray = function( array )
{
	var lowest = {};

	for(var i=0; i<array.length; i++)
	{
		if(array[i].stat_amount < (lowest.stat_amount || 0))
		{
			lowest = array[i];
		}
	}

	return lowest;
}

PlayerEntity.prototype.generateName = function()
{
	var names = ["inpho", "cedric", "cythix", "exithe", "sooth", "soothsayer", "zarasustra", "nei", "helianthus", "bomber", "yethanol", "toin", "paraben"];

	return names[Math.floor(Math.random() * names.length)];
}

PlayerEntity.prototype.battleAction = function()
{
	UI.logDebug("Player takes his battle action");

	// Player Status Affects
	this.Status.checkStatus();

	// Player Potion/item usage
	this.Inventory.checkPotions();
}

PlayerEntity.prototype.action = function()
{
	UI.logDebug("Player takes his turn");

	// Player Status Affects
	this.Status.checkStatus();

	// Player Potion/item usage
	this.Inventory.checkPotions();

	// Player Check for better gear
	UI.logDebug("+ Player checks inventory for better gear");
	player.Head_slot.checkForUpgrade();
	player.Body_slot.checkForUpgrade();
	player.Hand_slot.checkForUpgrade();
	player.Feet_slot.checkForUpgrade();
	player.Finger_slot.checkForUpgrade();
}

PlayerEntity.prototype.dead = function()
{
	UI.logDead();
}

/*	namespace.PlayerEntity = PlayerEntity;
	window.PlayerEntity = namespace.PlayerEntity;
})(Lootr.entities, Lootr);*/

/*PlayerEntity.prototype.updatePlayerUI = function()
{
	UI.logPlayerHealth();
	UI.logPlayerLevel();
	UI.logPlayerGold();
	UI.logAtk();
	UI.logDef();
	UI.logMag();
	UI.logPlayerItems();
}*/


/*PlayerEntity.prototype.updateStat = function( item )
{
	//var affected = item.stat_affected;

	// Update stat
	player[item.stat_affected] += item.stat_amount;

	// Update state UI
	//UI.logPlayerUpdateStat( item.stat_affected );
}*/

/*PlayerEntity.prototype.checkStatus = function()
{
	if(this.Health.isDead())
	{
		this.status = Lootr.PLAYER_STATUS.DEAD;
		//game_state  = Lootr.GAME_STATES.DEAD;
		return false;
	}

	if(this.status == Lootr.PLAYER_STATUS.POISON)
	{
		UI.logSpace();
		UI.log("The poison takes a toll on you.", UI.COLORS.PLAYER_BAD);
		UI.logSpace();

		// Visual Representation of being poisoned
		$('#player_hp').fadeOut(300).fadeIn(300);

		// Take poison damage, remove a timer counter
		this.Health.giveDamage(Math.floor(this.Health.getHp() / 10));
		this._status_affect_timer--;

		// See if timer is over, remove poison if so
		if(this._status_affect_timer <= 0)
		{
			this.status = Lootr.PLAYER_STATUS.NORMAL;
			UI.logSpace();
			UI.log("The poison has runs its course.", UI.COLORS.PLAYER_BAD);
			UI.logSpace();

			$('#player_status').text(this.status).fadeOut(300).fadeIn(300);;
			$('#player_hp').removeClass(UI.COLORS.PLAYER_BAD);
		}
	}

	return true;
}*/

/*
PlayerEntity.prototype.unequipSlot = function( slot )
{
	// debugging help
	if(slot === undefined)
	{
		console.log("There was a problem trying to unequip a slot : " + slot);
	}

	// Check if there is already an item
	if(!$.isEmptyObject(player[slot]))
	{
		// Get the item so we know how to modify the stats.
		var item = player[slot];

		// Clear player slot
		player[slot] = {};

		// Update Stats
		player[item.stat_affected] -= item.stat_amount;

		// Update display
		UI.logPlayerUnequipSlot( item );

		// Update log with item unequip action
		UI.logSpace();
		UI.log(item.unequip);
		UI.logSpace();

		// Add unequiped item back to Inventory
		player.Inventory.giveItem(item);
		//player.items.push(item);
	}
}*/


/*Player.prototype.giveExp = function( exp )
{
	this._current_exp += exp;
	$('#player_exp').text(this._current_exp).fadeOut(300).fadeIn(300);;

 	// Check to see if we leveled up
	if(this._current_exp >= this._exp_to_level)
	{
		this.levelUp();
	}
}*/

/*Player.prototype.levelUp = function()
{
	// Display level up message
	UI.logSpace();
	UI.log("** You've leveled up! **", UI.COLORS.PLAYER_LEVEL);
	UI.logSpace();

	// Increment level
	this._level++;
	$('#player_level').text(this._level).fadeOut(300).fadeIn(300);;

	// Increment HP
	this.max_hp += this._level * 5;
	this.fullHeal();

	// Set new exp to level amount
	this._exp_to_level = this.getNewExpToLevel();
	$('#player_exp_to_level').text(this._exp_to_level).fadeOut(300).fadeIn(300);;

	// Reset Exp
	this._current_exp = 0;
	$('#player_exp').text(this._current_exp);

	// Generate a new mob bag pool
	MobBag.generate(this._level);
}*/

/*Player.prototype.getNewExpToLevel = function ()
{
	return this._current_exp * 2;
}*/

/*PlayerEntity.prototype.giveItem = function( item )
{
	this.items.push(item);

	UI.logPlayerItem(item);
}*/

/*Player.prototype.giveGold = function( amount )
{
	this.gold = +this.gold + +amount;

	$('#player_gold').text(this.gold).fadeOut(300).fadeIn(300);
}*/

/*Player.prototype.takeDamage = function( damage )
{
	this.hp -= damage;

	$('#player_hp').text(this.hp);
	$('#player_hp').fadeOut(300).fadeIn(300);
}*/

/*Player.prototype.fullHeal = function()
{
	this.hp = this.max_hp;

	$('#player_hp').text(this.hp).fadeOut(300).fadeIn(300);;
	$('#player_max_hp').text(this.max_hp).fadeOut(300).fadeIn(300);;
}*/

/*Player.prototype.heal = function( amount )
{
	this.hp += amount;

	if(this.hp > this.max_hp)
	{
		this.hp = this.max_hp;
	}

	$('#player_hp').text(this.hp);
}*/

/*PlayerEntity.prototype.hasItem = function( item )
{
	for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].name === item) {
            return true;
        }
    }

    return false;
}

PlayerEntity.prototype.hasItemType = function( type )
{
	for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].type === type) {
            return true;
        }
    }

    return false;
}*/


/*PlayerEntity.prototype.checkPotions = function()
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

PlayerEntity.prototype.usePotion = function( potion )
{
	// Use Potion
	UI.log("You Quaff a potion for " + potion.stat_amount);

	// Modify player stats
	this.heal(potion.stat_amount);

	// remove from items list
	this.removeFromInventoryList( potion );
}*/

/*
PlayerEntity.prototype.sellItems = function()
{
	var value = 0;

	for(var i=0; i<this.items.length; i++)
	{
		if(this.items[i].type != Lootr.TREASURE_TYPES.CONSUMABLE)
		{
			value += this.items[i].value;

			// remove item from inventory
			this.removeFromInventoryList(this.items[i]);

			// give player gold
			this.Gold.giveGold(value);
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
}*/

/*Player.prototype.isDead = function()
{
	if(this.status == Lootr.PLAYER_STATUS.DEAD)
	{
		return true;
	}

	return false;
}*/

/*// Returns an array of all of the items currently in player inventory of item_type
PlayerEntity.prototype.getAllItemsByType = function( item_type )
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

PlayerEntity.prototype.getItem = function( item )
{
	var item;

	for (var i = 0; i < this.items.length; i++) {
	        if (this.items[i].name === item) {
	            item = this.items[i];

	            break;
	        }
	    }

	return item;
}*/


/*PlayerEntity.prototype.checkSlotForUpgrade = function( slot )
{
	// Get all of a slot type
	var slot_items = [];

	// Add all items of slot type to local array
	//for(var i=0; i<this.items.length; i++)
	for(var i=0; i<this.Inventory.items.length; i++)
	{
		//if(this.items[i].slot == slot)
		if(this.Inventory.items[i].slot == slot)
		{
			slot_items.push(this.Inventory.items[i]);
			//slot_items.push(this.items[i]);
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
	if($.isEmptyObject(this[slot]))
	{
		var slot_value = 0;
	}
	else
	{
		var slot_value = this[slot].total_amount;
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
		if(!$.isEmptyObject(this[slot]))
		{
			// Unequip current item
			this.unequipSlot(slot);
		}

		// equip current_highest_item;
		this.equipItem(current_highest_item);

		// Remove item from inventory
		this.Inventory.removeItem(current_highest_item);
		//this.removeFromInventoryList(current_highest_item);
	}

}*/


/*PlayerEntity.prototype.removeFromInventoryList = function( item )
{
	// find item in inventory
	for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].name === item.name) {

        	// Remove item from display
        	UI.logRemovePlayerItem(this.items[i]);

        	// Remove item from player items array
           this.items.splice(i, 1);
           return true;
        }
    }

    return false;
}*/
/*
PlayerEntity.prototype.equipItem = function( item )
{
	// debugging help
	if(item.slot === undefined)
	{
		console.log("There was a problem trying to equip an item : " + JSON.stringify(item));
	}

	// Give item to slot
	this[item.slot] = item;

	// Update player slot display
	UI.logSpace();
	UI.logPlayerEquipSlot( item );
	UI.logSpace();

	// Update Inventory display
	UI.logRemovePlayerItem( item );

	// Update log with item equip action
	UI.log(item.equip);

	// Update Stats
	this.updateStat( item );
}*/




