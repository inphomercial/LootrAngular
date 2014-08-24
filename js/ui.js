
var UI = {

	COLORS: {

		ROOM_NORMAL   : "room",
		ROOM_TRAP     : "room_trap",
		ROOM_MONSTER  : "room_monster",
		ROOM_TREASURE : "room_treasure",
		PLAYER_GOOD   : "player_good",
		PLAYER_HIT    : "player_hit",
		PLAYER_BAD    : "player_bad",
		FIGHT         : "fight",
		PLAYER_LEVEL  : "player_level_up",
		GOLD          : "gold"
	},

	logQueueContainer : [],

	log: function( text, type, time, delay ) {

		if(text == "")
		{
			return;
		}

		var element = $("<span class='" + type + "'>" + text + "</span>").hide().delay(delay).fadeIn(time);
		$('#log').prepend(element);

		UI.dimBottomLog();
	},

	dimBottomLog: function() {
		var l = $('#log span').length;

		if(l > 15)
		{
			$("#log span:nth-last-of-type(6)").fadeTo("slow", 0.75);
			$("#log span:nth-last-of-type(5)").fadeTo("slow", 0.75);

			$("#log span:nth-last-of-type(4)").fadeTo("slow", 0.50);
			$("#log span:nth-last-of-type(3)").fadeTo("slow", 0.50);

			$("#log span:nth-last-of-type(2)").fadeTo("slow", 0.20);
			$("#log span:nth-last-of-type(1)").fadeTo("slow", 0.20);

			// Delete last span
			$("#log span").last().remove();

			// Delete last br
			$("#log br").last().remove();
		}
	},

	logSpace: function() {
		$('#log').prepend("<br>");
	},

	logDebug: function( text, obj ) {

		if(Lootr.DEBUG)
		{
			if(!obj)
			{
				console.log(text);
			}
			else if(typeof obj === "string" || typeof obj === "number")
			{
				console.log(text + "" + obj);
			}
			else
			{
				console.log(text);
				console.log(obj);
			}
		}
	}

	/*addToQueue: function( text ) {

		UI.logQueueContainer.push(text);
	},

	nextInQueue: function() {

		var next = UI.logQueueContainer.shift();

		return next;
	},*/

	//logUpdatePlayer : function() {

		//UI.logPlayerHealth();
		//UI.logPlayerLevel();
		//UI.logPlayerGold();
		//UI.logAtk();
		//UI.logDef();
		//UI.logMag();

		//UI.logPlayerItems();
	//},

	/*logPlayerHealth: function() {
		$('#player_max_hp').text(player.Health.getMaxHp());
		$('#player_hp').text(player.Health.getHp());
	},

	logPlayerGold: function() {
		$('#player_gold').text(player.Gold.getGold()).addClass(UI.COLORS.GOLD);
	},

	logPlayerLevel: function() {
		$('#player_level').text(player.Level.getLevel());
		$('#player_exp').text(player.Level.getExp());
		$('#player_exp_to_level').text(player.Level.getExpToLevel());
	},

	logAtk: function() {
		//$('#player_atk').text(player.atk).hide().delay("slow").fadeIn("slow").addClass("player_stat_bonus");
		$('#player_atk').text(player.Atk.atk).addClass("player_stat_bonus");
	},

	logDef: function() {
		$('#player_def').text(player.Def.def).addClass("player_stat_bonus");
	},

	logMag: function() {
		$('#player_mag').text(player.Mag.mag).addClass("player_stat_bonus");
	},*/

	/*logPlayerEquipSlot: function( item ) {

		var element_item = $("<span class='" + item.color + "'> " + item.name + "<span class='item_stat_amount'> [" + item.total_amount + "]</span></span>").hide().delay("slow").fadeIn("slow");

		$('#player_'+item.slot).html(element_item);
	},

	logPlayerUnequipSlot: function( item ) {

		// Remove item from Equipment Slot
		$('#player_'+item.slot).html("[empty]").hide().delay("slow").fadeIn("slow");

		// Add it to Inventory
		var element = $("<span class='" + item.color + "'> +  " + item.name + "<span class='item_stat_amount'> [" + item.total_amount + "]</span></span><br>").hide().delay("slow").fadeIn("slow");
		$('#player_items').append(element);

		// Update new Player Stat amount
		//$('#player_'+item.stat_affected).html(player[item.stat_affected]).hide().delay("slow").fadeIn("slow").removeClass("player_stat_bonus");

		// Fun +/- Indicator
		//$('#player_'+item.stat_affected+'_indicator').text("-").hide().delay("slow").fadeIn("slow").addClass("player_bad").hide(700);
	},

	logPlayerUpdateStat: function( stat_type )
	{
		$('#player_'+stat_type).html(player[stat_type]).hide().delay("slow").fadeIn("slow").addClass("player_stat_bonus");
	},

	//logPlayerItems: function( item ) {
	logPlayerItems: function( player ) {

		// Clear out inventory list to repopulate it
		$('#player_items').empty();

		var items = player.Inventory.getAll();

		if(items.length < 1)
		{
			return;
		}

		for(var i = 0; i<items.length; i++) {

			var color = items[i].color;
			var name  = items[i].name;
			var total_amount = items[i].total_amount;

			var element = $("<span class='" + color + "'> +  " + name + "<span class='item_stat_amount'> [" + total_amount + "]</span></span><br>");
			$('#player_items').append(element);
		}

		// old
		//var element = $("<span class='" + item.color + "'> +  " + item.name + "<span class='item_stat_amount'> [" + item.stat_amount + "]</span></span><br>").hide().delay("slow").fadeIn("slow");
		//$('#player_items').append(element);

		// working
		//var element = $("<span class='" + item.color + "'> +  " + item.name + "<span class='item_stat_amount'> [" + item.total_amount + "]</span></span><br>").hide().delay("slow").fadeIn("slow");
		//$('#player_items').append(element);
	},

	logRemovePlayerItem : function( item ) {

		var span = $("#player_items span:contains('"+item.name+"')").last();

		// Delete the item BR
		span.next().fadeOut("slow").remove();

		// Delete the Span
		span.fadeOut("slow").remove();
	},

	logDead: function() {

		if (typeof interval != 'undefined') {
			clearInterval(interval);
		}

		var element = $("<span class='player_dead'><br>YOU HAVE DIED <br> Round : " + total_rounds + ", Gold : " + player.Gold.getGold() + "</span>").hide().delay(2000).fadeIn("slow");
		$("#log").prepend(element);
	},*/
}