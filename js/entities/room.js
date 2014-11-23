(function (namespace, Lootr) {
	'use strict';

	/**
	 * @class Room
	 * @extends Entity
	 */
	function Room ( args ) {
		Entity.call(this);

        // And Sets the room ID
        this.setId();

		this.name = args.name;
		this.desc = args.desc;

        // Container for objects (players, things, monsters)
        this.entities = [];

        this.x = args.x;
        this.y = args.y;

        // this.randomizeExits();
	}

	Room.prototype = new Entity;

    Room.prototype.setId = function() {
        if(Room.counter == undefined) {
            Room.counter = 0;
            this.id = 0;
        } else {
            Room.counter++;
            this.id = Room.counter;
        }
    }

    // Add entity object to entities array
	Room.prototype.addEntity = function(entity) {
        this.entities.push(entity);
	}

    Room.prototype.removeEntity = function(entity) {
        console.log("Room entities list:");
        console.log(this.entities);

        for(var i=0; i<this.entities.length; i++) {
            if (this.entities[i].className == "Player" && entity.className == "Player") {
                console.log("Player FOUND ENTITIY IN ROOM");
                // Remove the Player from the room entities container
                this.entities.splice(i, 1);
            }
            else if (this.entities[i].className == "Mob" && entity.className == "Mob") {
                console.log("Mob FOUND ENTITY IN ROOM");
            }
            else if (this.entities[i].className == "Object" && entity.className == "Object") {
                console.log("Object Found in Room");
            }
            else
            {
                console.log("COULDNT FIND ENTITIY IN ROOM");
            }
        }
    }

    // Room.prototype.isDirectionAvailable = function(direction) {
    //     if (this["exit_" + direction] == false) {
    //         return false;
    //     }
    //
    //     return true;
    // }
    //
    // Room.prototype.isDirectionLinkAvailable = function(direction) {
    //     if (this["link_" + direction] != false) {
    //         return false;
    //     }
    //
    //     return true;
    // }

    // Room.prototype.randomizeExits = function() {
    //    this.exit_north = (Math.random() < 0.5);
    //    this.exit_south = (Math.random() < 0.5);
    //    this.exit_west = (Math.random() < 0.5);
    //    this.exit_east = (Math.random() < 0.5);
    //
    //    if (!this.exit_north && !this.exit_south && !this.exit_west && !this.exit_east) {
    //        console.log("NO EXITS");
    //    }
    // }

    // Room.prototype.getExits = function() {
    //     var exits = {
    //         north: this.exit_north,
    //         south: this.exit_south,
    //         west:  this.exit_west,
    //         east:  this.exit_east
    //     };
    //
    //     return exits;
    // }

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
