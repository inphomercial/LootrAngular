
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
	         var room_template = room_base[Math.floor(Math.random() * room_base.length)];
           // Give each room a generated name
           room_template.name = Math.random().toString(36).substring(2);
           // Give each room object a world object to reference
           room_template.wold = this;

           var room = new Lootr.rooms.Room(room_template);

           container.push(room);
       }
           this.layout.push(container);
    }

/*    // Gives each room object a world object to reference
    for (var i=0; i<this.layout.length; i++) {
        for (var j=0; j<this.layout.length; j++) {
            this.layout[i][j].world = this;
        }
    }*/

    // Add random entities and items to map
    // 5 monsters
    for(var i=0; i<5; i++) {
        
        // check if MobBag is empty
        if(MobBag.isBagEmpty())
        {
            // true - generate new bag
            MobBag.generate( 1 );
        }

        // PluckMob
        var monster = MobBag.pluckMob();
        monster.world = this;

        this.addEntityAtRandomRoom(monster);
    }

    // 5 treasures
    for(var i=0; i<5; i++) {
      // Add Random Treasure
      var treasure = Lootr.Treasure.generate();
      this.addEntityAtRandomRoom(treasure);
    }
}


World.prototype.addEntityAtRandomRoom = function(entity) {
    var room = this.getRandomRoom();

    if(entity.className == "Monster" || entity.className == "Player") {
        entity.Location.setX(room.Location.getX());
        entity.Location.setY(room.Location.getY());  
    } 
    
    room.addEntity(entity);
};
/*
World.prototype.addWorldToAllRooms = function() {
    for (var i=0; i<this.layout.length; i++) {
        for (var j=0; j<this.layout.length; j++) {
            this.layout[i][j].world = this;
        }
    }
}*/

World.prototype.getRoomByLocation = function(x, y) {
    return this.layout[x][y];
}

World.prototype.getRandomRoom = function() {
    var x = Math.floor(Math.random() * this.layout.length);
    var y = Math.floor(Math.random() * this.layout.length);
    
    return this.layout[x][y];  
}

World.prototype.findStartingRoom = function() {

    UI.logDebug("Locating Starting Room");

    var startingRoom = this.getRandomRoom();

	  // determine player template
	  var template = race_table[Math.floor(Math.random() * race_table.length)];

    // determine player name
	  var name = name_table[Math.floor(Math.random() * name_table.length)];

    template.x = startingRoom.getX();
    template.y = startingRoom.getY();

    // Initialize player object
    var player = new Lootr.entities.Player(template, name, this);

    startingRoom.addEntity(player);

    startingRoom.displayContents();

    return player;
}

// Main game loop
World.prototype.tick = function(action, entity) {

    var entities = this._getAllEntities();

    for (var i = 0; i < entities.length; i++) {
      entities[i].tick(action, entity);
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

