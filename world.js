
function World ( ) {
    this.number_of_rooms = 0;
    this.layout = new Array();
    // this.rooms = new Array();
    // this.rooms_pool = new Array();
}

World.prototype.addRoom = function(room) {
    this.rooms.push(room);
}

World.prototype.linkRooms = function(room1, room2, direction) {
    if( room1.isDirectionAvailable(direction)
        && room1.isDirectionLinkAvailable(direction)
        && room2.isDirectionAvailable(this.getOppositeDirection(direction))
        && room2.isDirectionLinkAvailable(this.getOppositeDirection(direction))
    ) {
      room1["link_" + direction] = room2.id;
      room2["link_" + this.getOppositeDirection(direction)] = room1.id;
    } else {
      console.log("cannot link rooms " + direction);
    }
}

World.prototype.getOppositeDirection = function(direction) {
    if( direction == Lootr.DIRECTIONS.NORTH ) {
        return Lootr.DIRECTIONS.SOUTH;
    }

    if( direction == Lootr.DIRECTIONS.SOUTH ) {
        return Lootr.DIRECTIONS.NORTH;
    }

    if( direction == Lootr.DIRECTIONS.WEST ) {
        return Lootr.DIRECTIONS.EAST;
    }

    if( direction == Lootr.DIRECTIONS.EAST ) {
        return Lootr.DIRECTIONS.WEST;
    }
}

World.prototype.printMap = function() {

    for (var i=0; i<this.layout.length; i++) {
        for ( var j=0; j<this.layout.length; j++) {
            console.log("X");
            // console.log(this.layout[i][j]);
        }
    }
}

World.prototype.printRoom = function(x, y) {

    var room = this.layout[x][y];

    console.log(room);
    console.table(room);
}

World.prototype.LookInDirection = function(currentX, currentY, direction) {

    if(direction == Lootr.DIRECTIONS.NORTH) {
        currentY--;
    }

    if(direction == Lootr.DIRECTIONS.SOUTH) {
       currentY++;
    }

    if(direction == Lootr.DIRECTIONS.WEST) {
       currentX--;
    }

    if(direction == Lootr.DIRECTIONS.EAST) {
       currentX++;
    }

    for (var x=0; x<this.layout.length; x++) {
        for(var y=0; y<this.layout.length; y++) {
            if(currentX == x && currentY == y) {
                var room = this.layout[x][y];

                if(typeof room === 'undefined') {
                    console.log(false);
                    return false;
                } else {
                    console.log(room);
                    return room;
                }
            }
        }
    }
}

World.prototype.generate = function(number_of_rooms) {

    for (var i=0; i<number_of_rooms; i++) {
       var container = [];
       for (var j=0; j<number_of_rooms; j++) {
           // Starting Room Seed
           var name = Math.random().toString(36).substring(2);
           var desc = Math.random().toString(36).substring(5);

           var room = new Lootr.rooms.Room({name:name, desc:desc, x:i, y:j});
           container.push(room);
           // this.number_of_rooms++;
       }
           // this.number_of_rooms++;
           this.layout.push(container);
    }

    // Build entire room collection
    // for (var i=0; i<number_of_rooms; i++) {
    //
    //     // Starting Room Seed
    //     var name = Math.random().toString(36).substring(2);
    //     var desc = Math.random().toString(36).substring(5);
    //
    //     var room = new Lootr.rooms.Room({name:name, desc:desc});
    //
    //     this.rooms_pool.push(room);
    //     this.number_of_rooms++;
    // }
    //
    // // Link rooms together
    // for (var r=0; r<number_of_rooms; r++) {
    //     // console.log(this.rooms[r]);
    //
    //     if(this.rooms[r].exit_north == true) {
    //         console.log("Building North Exit");
    //     }
    //     if(this.rooms[r].exit_south == true) {
    //         console.log("Building South Exit");
    //     }
    // }

       //  if(room.exit_north == true) {
       //
       //      var name = Math.random().toString(36).substring(2);
       //      var desc = Math.random().toString(36).substring(5);
       //
       //      var new_room = new Lootr.rooms.Room({name:name, desc:desc});
       //      console.log(new_room);
       //
       //      room.link("link_north", new_room.id);
       //
       //      this.rooms.push(new_room);
       //      this.number_of_rooms++;
       // }
       // if(room.exit_south == true) {
       //
       //      var name = Math.random().toString(36).substring(2);
       //      var desc = Math.random().toString(36).substring(5);
       //
       //      var new_room = new Lootr.rooms.Room({name:name, desc:desc});
       //
       //      room.link("link_south", new_room.id);
       //
       //      this.rooms.push(new_room);
       //      this.number_of_rooms++;
       // }
       // if(room.exit_west == true) {
       //
       //      var name = Math.random().toString(36).substring(2);
       //      var desc = Math.random().toString(36).substring(5);
       //
       //      var new_room = new Lootr.rooms.Room({name:name, desc:desc});
       //
       //      room.link("link_west", new_room.id);
       //
       //      this.rooms.push(new_room);
       //      this.number_of_rooms++;
       // }
       // if(room.exit_east == true) {
       //
       //      var name = Math.random().toString(36).substring(2);
       //      var desc = Math.random().toString(36).substring(5);
       //
       //      var new_room = new Lootr.rooms.Room({name:name, desc:desc});
       //
       //      room.link("link_east", new_room.id);
       //
       //      this.rooms.push(new_room);
       //      this.number_of_rooms++;
       // }
   // }
}
