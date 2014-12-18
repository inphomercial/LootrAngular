// A real recursive array clone that can handle 2d arrays
//http://stackoverflow.com/questions/2294703/multidimensional-array-cloning-using-javascript
Array.prototype.clone = function() {
    var isArr = function(elm){
        return String(elm.constructor).match(/array/i) ? true : false;
    }
    var cloner = function(arr){
        var arr2 = arr.slice(0), len = arr2.length;
        for(var i=0; i < len; i++){
            if( isArr(arr2[i]) )
               arr2[i]=cloner( arr2[i] );
        }
        return arr2;
    }
    return cloner(this);
}

var LootrApp = angular.module('LootrApp', ['ui.bootstrap', 'LocalStorageModule'])
	.value('Lootr', Lootr);

LootrApp.controller('LootrController', function ($scope, Lootr, $interval, StorageService) {

    $scope.world = new World();
    $scope.world.generateMap(5);

    $scope.player = $scope.world.findStartingRoom();

    // Lootr
    $scope.Lootr = Lootr;

    // Keeps track of total rounds
    $scope.total_rounds = 0;

    // If a store is present
    //$scope.store_in_room = false;

    UI.log("You desend a stair way into a dark abyss....", UI.COLORS.ROOM_NORMAL, 2000);
    UI.logSpace();

    UI.log("You light your torch.", UI.COLORS.ROOM_TREASURE, 10000);
    UI.logSpace();


    $scope.updateRoom = function() {

        // Keep an instance of the current room we are in
        var x = $scope.player.Location.getX();
        var y = $scope.player.Location.getY();
        $scope.current_room = $scope.world.getRoomByLocation(x, y);
        $scope.current_room.displayContents();
    }

    $scope.updateRoom();

	$scope.highlightStat = function( item, mood )
	{		
		if(item.Consumable.$is_consumable){
			return;
		}

		console.log(item);

     	// New STAT STUFF
		$scope.player[item.slot].highlight = true;
		var stats = item.getStats();

     	if(stats[Lootr.PLAYER_STATS.ATK] > 0 && !mood) {	     		
     		$scope.player.Atk.mod_pos = "+" + stats.atk;	
     	}		
     	else if (stats[Lootr.PLAYER_STATS.ATK] == 0) {
			// do nothing
		}
		else if (stats[Lootr.PLAYER_STATS.ATK] > 0 && mood) {
			$scope.player.Atk.mod_neg = "-" + stats.atk;
		}
		else if (stats[Lootr.PLAYER_STATS.ATK] < 0) {
			$scope.player.Atk.mod_neg = "-" + stats.atk;
		}

		if(stats[Lootr.PLAYER_STATS.DEF] > 0 && !mood) {	     		
     		$scope.player.Def.mod_pos = "+" + stats.def;	
     	}	
     	else if (stats[Lootr.PLAYER_STATS.DEF] == 0) {
     		// do nothing
     	}	
     	else if (stats[Lootr.PLAYER_STATS.DEF] > 0 && mood) {
			$scope.player.Def.mod_neg = "-" + stats.def;
		}
		else if (stats[Lootr.PLAYER_STATS.DEF] < 0) {
			$scope.player.Def.mod_neg = "-" + stats.def;
		}

		if(stats[Lootr.PLAYER_STATS.MAG] > 0 && !mood) {	     		
     		$scope.player.Mag.mod_pos = "+" + stats.mag;	
     	}		
     	else if (stats[Lootr.PLAYER_STATS.MAG] == 0) {
     		// do nothing
 		} else if (stats[Lootr.PLAYER_STATS.MAG] > 0 && mood) {
			$scope.player.Mag.mod_neg = "-" + stats.mag;
		} 
		else if (stats[Lootr.PLAYER_STATS.MAG] < 0) {
			$scope.player.Mag.mod_neg = "-" + stats.mag;
		}
			
			

     	// OLD STAT STUFF
     	/*var sa = item.stat_affected.charAt(0).toUpperCase() + item.stat_affected.slice(1);
     	var total = item.stat_amount + item.bonus;*/

     	/*$scope.player[item.slot].highlight = true;

		if(mood)
		{
			$scope.player[sa].mod_neg = "-" + total;
		}
		else
		{
			$scope.player[sa].mod_pos = "+" + total;
		}*/
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

	$scope.attack = function(monster) {

		console.log("Player is attacking!!");

		$scope.world.tick('attack', monster);
		$scope.updateRoom();
	}

	$scope.move = function( direction ) {
		
		UI.logDebug("Player is moving");

		$scope.world.tick(direction);
        $scope.updateRoom();
	}

	$scope.look = function() {

		UI.logDebug("Player is looking");

        $scope.updateRoom();
	}

	$scope.sell = function() {
		// merchant sell goods
		$scope.player.emit('Inventory.sellItems', []);

		$scope.store_in_room = false;

		// Always tick work and update room
        //$scope.world.tick();
        //$scope.updateRoom();
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

		// Always tick work and update room
        //$scope.world.tick();
        //$scope.updateRoom();
	}

    $scope.pickupItem = function( item )
    {
        UI.logDebug("Picking up ", item);
        $scope.player.emit('Inventory.giveItem', [item]);

        // remove item from room
        $scope.current_room.removeEntity(item);

        // Update display
        UI.log("You pick up a " + item.name);
        UI.logSpace();

        // Clear highlights
        $scope.unHighlightStat();

        // Always tick work and update room
        //$scope.world.tick();
        //$scope.updateRoom();
    }

    $scope.dropItem = function( item )
    {
        UI.logDebug("Dropping item ", item);

        // Remove from player.inventory
        $scope.player.emit('Inventory.removeItem', [item]);

        // add item to room
        $scope.current_room.addEntity(item);

        // Update display
        UI.log("You drop a " + item.name);
        UI.logSpace();

        // Clear highlight from interactin with item
        $scope.unhighlightStat();

        // Always tick work and update room
        //$scope.world.tick();
        //$scope.updateRoom();
    }

	$scope.unequipItem = function( slot, index )
	{
		console.log(index);
		UI.logDebug("Unequiping item from ", slot);
		$scope.player[slot].unequipSlot(index);

		// Always tick work and update room
        $scope.world.tick();
        $scope.updateRoom();
	}

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
			//$scope.store_in_room = false;

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

	/*
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
	}*/

	//$scope.interval = setInterval(function() { $scope.startTurn(1);}, 100000);

	$interval(function() {
		// Always tick work and update room
        $scope.world.tick();
        $scope.updateRoom();
	}, 5000);

	/*$interval(function() {
		$scope.player.emit('Health.giveDamage', [2]);
	}, 700);*/

	window.scope = $scope;
});
