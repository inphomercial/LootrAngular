(function (namespace, Lootr) {
	'use strict';


	var TurnManager = {

		generate: function( player )
		{
			UI.logSpace();

			// Get and print out base room
			Lootr.EventGenerator.baseRoom();

			// Roll Gold Event
			if(Roller.roll(Lootr.EVENT_CHANCE.GOLD))
			{
				Lootr.EventGenerator.gold( player );
			}
			else
			{
				UI.logDebug("Failed gold event roll");
			}

			// Roll Trap Event
			if(Roller.roll(Lootr.EVENT_CHANCE.TRAP))
			{
				Lootr.EventGenerator.trap( player );
			}
			else
			{
				UI.logDebug("Failed trap event roll");
			}

			// Monster Event
			if(Roller.roll(Lootr.EVENT_CHANCE.MONSTER))
			{
				var what = Lootr.EventGenerator.monster( player );
			}
			else
			{
				UI.logDebug("Failed monster event roll");
			}

			// Treasure Event
			if(Roller.roll(Lootr.EVENT_CHANCE.TREASURE))
			{
				Lootr.EventGenerator.treasure( player );
			}
			else
			{
				UI.logDebug("Failed treasure event roll");
			}

			// Save Event
			if(Roller.roll(Lootr.EVENT_CHANCE.SAVE))
			{
				var what = Lootr.EventGenerator.save( player );
			}
			else
			{
				UI.logDebug("Failed save event roll");
			}

			player.emit("Progress.move", []);

			// Player Action
			//player.action();

			// Update Player UI
			//UI.logUpdatePlayer();

			//UI.logSpace();

			// Check if player still alive
			/*if(player.status == Lootr.PLAYER_STATUS.DEAD)
			{
				UI.logDead();
			}*/

			/*if(game_state == Lootr.GAME_STATES.DEAD)
			{
				UI.logDead();
			}*/

			return what;
		}
	}

	namespace.TurnManager = TurnManager;
})(Lootr, Lootr);
