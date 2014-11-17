
function World ( ) {
    this.number_of_rooms = 0;
    this.rooms = new Array();
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
    if( direction == "north" ) {
        return "south";
    }

    if( direction == "south" ) {
        return "north";
    }

    if( direction == "west" ) {
        return "east";
    }

    if( direction == "east" ) {
        return "west";
    }
}

World.prototype.generate = function(number_of_rooms) {

    // Build entire room collection
    for (var i=0; i<number_of_rooms; i++) {

        // Starting Room Seed
        var name = Math.random().toString(36).substring(2);
        var desc = Math.random().toString(36).substring(5);

        var room = new Lootr.rooms.Room({name:name, desc:desc});

        this.rooms.push(room);
        this.number_of_rooms++;
    }

    // Link rooms together
    for (var r=0; r<number_of_rooms; i++) {
    }

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
