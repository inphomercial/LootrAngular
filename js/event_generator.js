(function (namespace, Lootr) {
	'use strict';


	var EventGenerator = {

		trap: function( player )
		{
			UI.logDebug("Rolled Trap Event");

			var trap = new Trap(DrawEvent.trap(), player);

			// Inital trap description
			UI.logSpace();
			UI.log(trap.desc, UI.COLORS.ROOM_TRAP);
			UI.logSpace();

			// See if trap is sprung or not
			if(trap.isSprung())
			{
				// Apply trap damage
				trap.doDamage();
				UI.log(trap.fail, UI.COLORS.PLAYER_BAD);
				UI.logSpace();
				UI.log("You take " + trap.damage + " damage.", UI.COLORS.PLAYER_HIT);

				// See if trap applies a status
				if(trap.isAbnormalStatus())
				{
					trap.doStatus();
					UI.logSpace();
					UI.log("You have become poisioned", UI.COLORS.PLAYER_BAD);

					$('#player_status').text(trap.status);
					$('#player_hp').addClass(UI.COLORS.PLAYER_BAD);
				}
			}
			else
			{
				// Sucessfully dodged trap
				UI.log(trap.success, UI.COLORS.PLAYER_GOOD);
			}

			UI.logSpace();
		},

		gold: function( player )
		{
			UI.logDebug("Rolled Gold Event");

			var treasure = Lootr.Treasure.generate(Lootr.TREASURE_TYPES.GOLD);

			player.emit("Gold.giveGold", [treasure.value]);

			UI.log(treasure.desc, UI.COLORS.ROOM_TREASURE);
			UI.logSpace();
			UI.log("You pick up " + treasure.name, UI.COLORS.ROOM_TREASURE);
			UI.logSpace();
			UI.logSpace();
		},

		treasure: function( player )
		{
			UI.logDebug("Rolled Treasure Event");

			// Get Treasure Object
			var treasure = Lootr.Treasure.generate();

			// Give player the item
			player.emit("Inventory.giveItem", [treasure]);

			// Player collected an item
			player.emit("Progress.items_collected", []);

			UI.log(treasure.desc, UI.COLORS.ROOM_TREASURE);

			UI.logSpace();
			UI.log("You pick up " + treasure.name, UI.COLORS.ROOM_TREASURE);
			UI.logSpace();
			UI.logSpace();

			return treasure;
		},

		monster: function( player )
		{
			UI.logDebug("Rolled Monster Event");

			// check if MobBag is empty
			if(MobBag.isBagEmpty())
			{
				// true - generate new bag
				MobBag.generate( player.Level.getLevel() );

				// PluckMob
				var monster = MobBag.pluckMob();
			}
			else
			{
				// PluckMob
				var monster = MobBag.pluckMob();
			}

			UI.log(monster.desc, UI.COLORS.ROOM_MONSTER);
			UI.logSpace();

			UI.logDebug("Full Monster: ", monster);

			return monster;
		},

		save: function( player )
		{
			UI.logDebug("Rolled Save Event");

			var save = new Save(DrawEvent.save(), player);
			UI.logDebug(save);

			UI.log(save.desc);
			UI.logSpace();
			save.doAction( player );
			UI.logSpace();

			console.log(save);

			return save;
		},

		baseRoom: function()
		{
			// Get blank room
			var room = room_base[Math.floor(Math.random()*room_base.length)];

			// Print blank room
			UI.log(room.desc, UI.COLORS.ROOM_NORMAL);
			UI.logSpace();

			return room;
		}
	}

	namespace.EventGenerator = EventGenerator;
})(Lootr, Lootr);