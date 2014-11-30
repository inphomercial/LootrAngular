var MobBag = {

	// if level 1 (20 level 1, 5 level 2, 1 level 3)
	// if level 2 (25 level 1-2, 5 level 3, 1 level 4)
	// if level 3 (25 level 1-3, 8 level 4, 1 level 5)
	// if level 4 (20 level 2-4, 8 level 5, 1 level 6)
	// ETC

	tempBag: [],
	enemiesBag: [],
	count: 0,

	// Main Bag generation method
	generate: function( player_level ) {

		// Reset remaining enemies bag
		MobBag.enemiesBag = [];

		// If player is lvl one, ignore doing a lvl - 1 build
		if(!player_level === 1)
		{
			var bag0 = MobBag._generateAmountByLevel( 5, player_level - 1);
			MobBag.tempBag.push(bag0);
		}

		var bag1 = MobBag._generateAmountByLevel( 20, player_level );
		MobBag.tempBag.push(bag1);

		var bag2 = MobBag._generateAmountByLevel( 5, player_level + 1 );
		MobBag.tempBag.push(bag2);

		var bag3 = MobBag._generateAmountByLevel( 1, player_level + 2 );
		MobBag.tempBag.push(bag3);

		// Put them all in a single array
		MobBag._stuffAllInBag();

		// Shuffle array
		Roller.shuffleArray(MobBag.enemiesBag);

		// Generating new bag Debug info
		UI.logDebug("Generating new Mob bag for level " + player_level);
	},

	// Pop array and return monster
	pluckMob: function( player_level ) {

		return MobBag.enemiesBag.pop();
	},

	isBagEmpty: function() {

		if(MobBag.enemiesBag.length <= 0) {
			return true;
		}

		return false;
	},

	// Grab lots of monsters
	_generateAmountByLevel: function( amount, level ) {

		var tempBag = [];
		var finalBag = [];

		// Build temp bag filled with only level monsters
		for(var i=0; i<event_monster.length; i++)
		{
			if(event_monster[i].level == level)
			{
				tempBag.push(event_monster[i]);
			}
		}

		// Populate final bag with random monsters for an amount
		for(var a=0; a<=amount; a++)
		{
			var monster = tempBag[Math.floor(Math.random()*tempBag.length)];

			// Build options object
			//var monster_options = MobBag._constructOptions(monster);

			// Construct new Monster
			var final_monster = new Lootr.entities.Monster(monster);

			finalBag.push(final_monster);
		}

		/*// Remove non Monster type objects -- NOT WORKING.. why not?
		for(var e=0; e<finalBag.length; e++)
		{
			if(!(finalBag[e] instanceof Monster))
			{
				finalBag.splice(e, 1);
			}
		}*/

		return finalBag;
	},

	_stuffAllInBag: function()
	{
		$.each(MobBag.tempBag, function() {

			if(Array.isArray(this))
			{
				$.each(this, function() {
					MobBag.enemiesBag.push(this);
				});
			}
			else
			{
				MobBag.enemiesBag.push(this);
			}
		});

		// Empty array
		MobBag.tempBag = [];
	}
}
