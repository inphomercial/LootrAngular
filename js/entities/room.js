(function (namespace, Lootr) {
	'use strict';

	/**
	 * @class Room
	 * @extends Entity
	 */
	function Room ( args ) {
		Entity.call(this);

        // Keeps track of a global unique room counter
        // And Sets the room ID
        if(Room.counter == undefined) {
            Room.counter = 0;
            this.id = 0;
        } else {
            Room.counter++;
            this.id = Room.counter;
        }

		this.name = args.name;
		this.desc = args.desc;

        // Container for objects (players, things, monsters)
        this.entities = [];

        // Testing
        this.exit_north = false;
        this.exit_south = false;
        this.exit_west  = false;
        this.exit_east  = false;
        this.link_north = false;
        this.link_south = false;
        this.link_west = false;
        this.link_east = false;
	}

	Room.prototype = new Entity;

    // Add entity object to entities array
	Room.prototype.addEntity = function(entity) {
        this.entities.push(entity);
	}

    Room.prototype.removeEntity = function(entity) {
        //
    }

    Room.prototype.randomizeExits = function() {
       this.exit_north = (Math.random() < 0.5);
       this.exit_south = (Math.random() < 0.5);
       this.exit_west = (Math.random() < 0.5);
       this.exit_east = (Math.random() < 0.5);

       if (!this.exit_north && this.exit_south && this.exit_west && this.exit_east) {
           console.log("NO EXITS");
       }
    }

    Room.prototype.link = function(direction, room_id) {
        if (this[direction]) {
            return "Already linked";
        }

        this[direction] = room_id;
    }

    Room.prototype.getExits = function() {
        var exits = {
            north: this.exit_north,
            south: this.exit_south,
            west:  this.exit_west,
            east:  this.exit_east
        };

        return exits;
    }

    Room.prototype.displayContents = function() {
        for(var i=0; i<=this.entities.length; i++) {
            if(this.entities[i] instanceof Lootr.entities.Player) {
                console.log("A Player stands here.");
            }

            if(this.entities[i] instanceof Lootr.entities.Monster) {
                console.log("MOB: " + this.entities[i].desc);
            }

            if(this.entities[i] instanceof Lootr.entities.Thing) {
                console.log("On Floor: " + this.entities[i].desc);
            }
        }
    }

	namespace.Room = Room;
})(Lootr.rooms, Lootr);
