
function Inventory( entity, args ) {
	var inventory = this;

	Component.call(this, entity, args);

	this.$items = [];

	// What ever entity this component is on
	this.$entity.on('Inventory.giveItem', function (item) {
		inventory._giveItem(item);
	});

	// Item is being equipped to a slot, remove from Inventory
	this.$entity.on('Inventory.equippingItem', function ( item ) {
		inventory._removeItem(item);
	});

	// What ever entity this component is on
	// It will be looking for a generic giveDamage string
	this.$entity.on('Inventory.sellItems', function () {
		inventory._sellItems();
	});

	this.$entity.on('Inventory.sellItem', function( item ) {
		inventory._sellItem(item);
	})

	this.$entity.on('Inventory.removeItem', function ( item ) {
		inventory._removeItem(item);
	});
}

Inventory.prototype = new Component;

Inventory.prototype.getAll = function()
{
	// Just a temp solution to not show a blank array on load.
	if(this.$items.length < 1)
	{
		return "";
	}

	return this.$items;
}

Inventory.prototype._giveItem = function( item )
{
	this.$items.push(item);
}

Inventory.prototype.totalItems = function() {
	return this.$items.length;
}

Inventory.prototype._sellItem = function( item )
{
	for(var i=0; i<this.$items.length; i++)
	{
		if(this.$items[i] == item)
		{
			// Give item value in gold
			this.$entity.emit("Gold.giveGold", [item.value]);

			UI.logSpace();
			UI.log("Sold " + item.name + " for " + item.value + " gold.");
			UI.logSpace();

			// Remove item from Inventory
			this._removeItem(item);
		}
	}
}

Inventory.prototype._sellItems = function()
{
	// Total value of items sold
	var value = 0;

	// Total number of sold items
	var num = 0;

	for(var i=0; i<this.$items.length; i++)
	{
		if(this.$items[i].type != Lootr.TREASURE_TYPES.CONSUMABLE)
		{
			value += this.$items[i].value;

			num += 1;

			// remove item from inventory
			this._removeItem(this.$items[i]);
		}
	}

	if(value > 0)
	{
		this.$entity.emit("Gold.giveGold", [value]);

		UI.logSpace();
		UI.log("Sold " + num + " items for " + value + " gold.");
		UI.logSpace();
	}
	else
	{
		UI.log("You had nothing the merchant wanted.");
	}
}

Inventory.prototype._removeItem = function( item )
{
	// find item in inventory
	for (var i = 0; i < this.$items.length; i++) {
        if (this.$items[i].name === item.name) {

        	// Remove item from player items array
           this.$items.splice(i, 1);

           return true;
        }
    }

    return false;
}

Inventory.prototype.save = function() {

	return false;

	var items_holder = {};

	$.each(this.$items, function(key, value) {
			debugger;
		//if(typeof value.save === "function") {
			items_holder[value.name] = value.save();
			//cache = {
				//key: value.save()
			//}
			//$.extend(cache, value.save());
			//cache.key = value.save();
			//cache[key].push(value.save());
			//cache.push(value.save());
		//}
		//else
		//{
		//	UI.logDebug("component missing save() function", key);
		//}
	});

	return items_holder;

	/*return {

		items: this.$items
	}*/
}