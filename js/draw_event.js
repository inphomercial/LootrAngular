var DrawEvent = {

	trap: function() {

		// Find trap in trap event table
		var trap = event_trap[Math.floor(Math.random()*event_trap.length)];

		return trap;
	},

	save: function() {

		// find monster in monster_table
		var save = event_save[Math.floor(Math.random()*event_save.length)];

		return save;
	}
};
