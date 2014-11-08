
function World ( ) {
    this.number_of_rooms = 0;
    this.rooms = new Array();
}

World.prototype.addRoom = function(room) {
    this.rooms.push(room);
}

World.prototype.generate = function(number_of_rooms) {

    // cycle through number of rooms adding links
    for (var i=0; i<number_of_rooms; i++) {
    
        // Starting Room Seed
        var name = Math.random().toString(36).substring(2);
        var desc = Math.random().toString(36).substring(5);
   
        var room = new Lootr.rooms.Room({name:name, desc:desc});
       
        // Build starting exits 
        room.randomizeExits();

        if(room.exit_north == true) {
                       
            var name = Math.random().toString(36).substring(2);
            var desc = Math.random().toString(36).substring(5);

            var new_room = new Lootr.rooms.Room({name:name, desc:desc});
            console.log(new_room);

            room.link("link_north", new_room.id);
            
            this.rooms.push(new_room);
            this.number_of_rooms++;
       }
       if(room.exit_south == true) {
                       
            var name = Math.random().toString(36).substring(2);
            var desc = Math.random().toString(36).substring(5);

            var new_room = new Lootr.rooms.Room({name:name, desc:desc});

            room.link("link_south", new_room.id);
            
            this.rooms.push(new_room);
            this.number_of_rooms++;
       }
       if(room.exit_west == true) {
                       
            var name = Math.random().toString(36).substring(2);
            var desc = Math.random().toString(36).substring(5);

            var new_room = new Lootr.rooms.Room({name:name, desc:desc});

            room.link("link_west", new_room.id);
            
            this.rooms.push(new_room);
            this.number_of_rooms++;
       }
       if(room.exit_east == true) {
                       
            var name = Math.random().toString(36).substring(2);
            var desc = Math.random().toString(36).substring(5);

            var new_room = new Lootr.rooms.Room({name:name, desc:desc});

            room.link("link_east", new_room.id);
            
            this.rooms.push(new_room);
            this.number_of_rooms++;
       }
   } 
}
