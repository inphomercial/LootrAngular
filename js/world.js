
function World ( ) {
    this.layout = new Array();
}

World.prototype.addRoom = function(room) {
    this.rooms.push(room);
}

World.prototype.generateMap = function(number_of_rooms) {

    UI.logDebug("Generating World!");
    for (var i=0; i<number_of_rooms; i++) {
       var container = [];
       for (var j=0; j<number_of_rooms; j++) {

           // Starting Room Seed
           var name = Math.random().toString(36).substring(2);
           var desc = Math.random().toString(36).substring(5);

           var room = new Lootr.rooms.Room({name:name, desc:desc, x:i, y:j});

           // #### EVENTS PER ROOM ####
           // # Randomize Treasures
           var treasure = Lootr.Treasure.generate();
           room.addEntity(treasure);

           if(Roller.roll(.40)) {
               // # Mobs
               // check if MobBag is empty
               if(MobBag.isBagEmpty())
               {
                   // true - generate new bag
                   MobBag.generate( 1 );
                }

               // PluckMob
               var monster = MobBag.pluckMob();
               monster.Location.$x = i;
               monster.Location.$y = j;
               monster.world = this;
               room.addEntity(monster);
           }
           // #########################

           container.push(room);
       }
           this.layout.push(container);
    }

    this.addWorldToAllRooms();
}

World.prototype.addWorldToAllRooms = function() {
    for (var i=0; i<this.layout.length; i++) {
        for (var j=0; j<this.layout.length; j++) {
            this.layout[i][j].world = this;
        }
    }
}

World.prototype.findStartingRoom = function() {

    UI.logDebug("Locating Starting Room");

    var ranX = Roller.randomNumber(0, this.layout.length);
    var ranY = Roller.randomNumber(0, this.layout.length);
    var startingRoom = this.layout[ranX][ranY];

	  // determine player race
	  var race = race_table[Math.floor(Math.random() * race_table.length)];

    // determine player name
	  var name = name_table[Math.floor(Math.random() * name_table.length)];

    race.x = ranX;
    race.y = ranY;

    // Initialize player object
    var player = new Lootr.entities.Player(race, name, this);

    startingRoom.addEntity(player);

    return player;
}

// Main game loop
World.prototype.tick = function(action) {

    var entities = this._getAllEntities();

    for (var i = 0; i < entities.length; i++) {
      entities[i].tick(action);
    }
}

World.prototype._getAllEntities = function() {

  var en = [];
  var player;

  for (var i=0; i<this.layout.length; i++) {
      for (var j=0; j<this.layout.length; j++) {

          for(var a=0; a<this.layout[i][j].entities.length; a++) {

              // Pulling out player to put him first in the array
             /* if(this.layout[i][j].entities[a].className == "Player") {

                  if(player === undefined) {
                      player = this.layout[i][j].entities[a];
                  }

                  continue;
              }*/

              en.push(this.layout[i][j].entities[a]);
          }
      }
  }

  // Throw player at the start of the array so player has the first move.
  // @todo Make it so that instead of the player always going first, have everything have a speed. Order by quickest first.
  //en.unshift(player);

  return en;
}

