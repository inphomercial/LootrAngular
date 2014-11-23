var LootrApp = angular.module('LootrApp', ['ui.bootstrap', 'LocalStorageModule'])
	.value('Lootr', Lootr);

LootrApp.factory('StorageService', function(localStorageService) {

    var StorageService = {

        save: function( key, data )
        {
            localStorageService.set(key, data);
        },

        get: function( key )
        {
            var result = localStorageService.get(key);

            if(result === null || result.length < 0)
            {
                return [];
            }
            else
            {
                return result;
            }
        },

        clear: function()
        {
            console.log("clear");

            localStorageService.clearAll();
        }
    };

    return StorageService;
});

LootrApp.controller('LootrController', function ($scope, Lootr, $interval, StorageService) {

	// determine player race
	var race = race_table[Math.floor(Math.random() * race_table.length)];

	// determine player name
	var name = name_table[Math.floor(Math.random() * name_table.length)];

	// Initialize player object
	$scope.player = new Lootr.entities.Player(race, name);

	// Lootr
	$scope.Lootr = Lootr;

	// Keeps track of total rounds
	$scope.total_rounds = 0;

	// Keeps track if a monster is in the room
	$scope.monster_in_room = false;
	$scope.monster = {};

	// If a store is present
	$scope.store_in_room = false;

	var init = function()
	{
       /* world.generateMap(5);

        $scope.player = world.findStartingRoom();*/

		UI.log("You desend a stair way into a dark abyss....", UI.COLORS.ROOM_NORMAL, 2000);
		UI.logSpace();

		UI.log("You light your torch.", UI.COLORS.ROOM_TREASURE, 10000);
		UI.logSpace();
	}

	init();

	// Starts the Auto Explore
	$scope.start = function()
	{
		$scope.interval = setInterval(function() { $scope.startTurn(1);}, 4000);
	}

	// Stops the Auto Explore
	$scope.stop = function()
	{
		clearInterval($scope.interval);
	}

	$scope.save = function()
	{
		console.log("in save");
		StorageService.save('Lootr.player', $scope.player.save());
	}

	$scope.load = function()
	{
		console.log("Loading");

		var player_obj = StorageService.get('Lootr.player');

		$scope.player = new Lootr.entities.Player(player_obj);
	}

	$scope.highlightStat = function( item, mood )
	{
		if(item.Consumable.$is_consumable){
			return;
		}

		console.log(item);

     	var sa = item.stat_affected.charAt(0).toUpperCase() + item.stat_affected.slice(1);
     	var total = item.stat_amount + item.bonus;

     	$scope.player[item.slot].highlight = true;

		if(mood)
		{
			$scope.player[sa].mod_neg = "-" + total;
		}
		else
		{
			$scope.player[sa].mod_pos = "+" + total;
		}
	}

	$scope.unHighlightStat = function()
	{
		$scope.player.SlotBody.highlight = null;
		$scope.player.SlotHead.highlight = null;
		$scope.player.SlotHand.highlight = null;
		$scope.player.SlotFinger.highlight = null;
		$scope.player.SlotFeet.highlight = null;

		$scope.player.Atk.mod_pos = null;
		$scope.player.Atk.mod_neg = null;

		$scope.player.Def.mod_pos = null;
		$scope.player.Def.mod_neg = null;

		$scope.player.Mag.mod_pos = null;
		$scope.player.Mag.mod_neg = null;
	}

	$scope.quaffItem = function( consumable ) {

		UI.logDebug("Quaffing ", consumable);

		// emit health give life
		$scope.player.emit("Health.giveHp", [consumable.stat_amount]);

		// emit removal from inventory
		$scope.player.emit("Inventory.removeItem", [consumable]);
	}

	$scope.attack = function() {

		if($scope.player.Health.isDead())
		{
			UI.logDebug("Player Dead");
			$('#modal').modal('show')
			return;
		}

		console.log("attacking!!");
		var battle = new BattleEngine($scope.monster, $scope.player);

		var results = battle.fight();

		if(!$scope.player.Health.isDead() && results)
		{
			$scope.monster = {};
			$scope.monster_in_room = false;
		}

		if($scope.player.Health.isDead())
		{
			UI.logDebug("Player Dead");
			$('#modal').modal('show')
			return;
		}
	}

	$scope.flee = function() {

		UI.logSpace();
		UI.log("You get away!");
		UI.logSpace();

		$scope.monster = {};
		$scope.monster_in_room = false;

		return
	}

	$scope.moveNorth = function() {

		$scope.player.Movement._moveDirection("north");
	}

	$scope.moveSouth = function() {

		$scope.player.Movement._moveDirection("south");
	}

	$scope.sell = function() {
		// merchant sell goods
		$scope.player.emit('Inventory.sellItems', []);

		$scope.store_in_room = false;
	}

	$scope.sellItem = function( item ) {
		console.log("trying to sell " + item.name);
		$scope.player.emit('Inventory.sellItem', [item]);
	}

	$scope.equipItem = function( item )
	{
		UI.logDebug("Equipeding item", item);
		$scope.player[item.slot].equipSlot(item);

		// Test
		$scope.player.Atk.mod_pos = "";
	}

	$scope.unequipItem = function( slot, index )
	{
		console.log(index);
		UI.logDebug("Unequiping item from ", slot);
		$scope.player[slot].unequipSlot(index);
	}

    // // Testing Room Generation and world creation
    // $scope.generateWorld = function()
    // {
    //     $scope.Lootr.push(new Room('room1'));
    //     $scope.Lootr.push(new Room('room2'));
    // }

	$scope.startTurn = function( rounds )
	{
		// roll and get back a table to use
		for(var i=1; i<=rounds; i++)
		{
			if($scope.player.Health.isDead())
			{
				UI.logDebug("Player Dead");
				$('#modal').modal('show')
				return;
			}

			// Increment Total Rounds
			$scope.total_rounds++;

			// Clear store in room.
			$scope.store_in_room = false;

			/*// If the room has a monster in it, dont generate a new turn
			if($scope.monster_in_room)
			{
				console.log("nothing can happen till monster is dead");
				return;
			}*/

			UI.logDebug("==============");
			UI.logDebug("Start Round : " + $scope.total_rounds);

			var what = Lootr.TurnManager.generate($scope.player);
			if(what instanceof Lootr.entities.Monster)
			{
				$scope.monster = what;
				$scope.monster_in_room = true;
				console.log("WE GOT A MONSTER");
			}
			if(what instanceof Save && what.action === 1)
			{
				$scope.store_in_room = true;
				console.log("WE GOT A SAVE");
			}

			UI.logDebug("What was returned from turnManager.generate", what);

			UI.logDebug("End Round : " + $scope.total_rounds);
			UI.logDebug("==============");
		}
	}

	/*$interval(function() {
		$scope.player.emit('Gold.giveGold', [2]);
	}, 500);

	$interval(function() {
		$scope.player.emit('Health.giveDamage', [2]);
	}, 700);
*/
	window.scope = $scope;
});
