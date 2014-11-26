(function (namespace, Lootr) {
	'use strict';

    var room_id_counter = 0;

	/**
	 * @class Room
	 * @extends Entity
	 */
	function Room ( args ) {
		Entity.call(this);

        // And Sets the room ID
        this._setId();

		this.name = args.name;
		this.desc = args.desc;

        this.className = "Room";

        // Container for objects (players, things, monsters)
        this.entities = [];

        this.x = args.x;
        this.y = args.y;

        // this.randomizeExits();
	}

	Room.prototype = new Entity;

    // Add entity object to entities array
	Room.prototype.addEntity = function(entity) {
        this.entities.push(entity);
	}

    Room.prototype.removeEntity = function(entity) {

        for(var i=0; i<this.entities.length; i++) {
            this.entities.splice(i, 1);
            // if (this.entities[i].className == "Player" && entity.className == "Player") {
            //     // Remove the Player from the room entities container
            //     this.entities.splice(i, 1);
            // }
            // else if (this.entities[i].className == "Monster" && entity.className == "Monster") {
            //     this.entities.splice(i, 1);
            // }
            // else if (this.entities[i].className == "Thing" && entity.className == "Thing") {
            //     this.entities.splice(i, 1);
            // }
            // else
            // {
            //     console.log("Nothing in the room");
            // }
        }
    }

    Room.prototype.canMoveInDirection = function(direction) {

        var x = this.x;
        var y = this.y;

        if(direction == Lootr.DIRECTIONS.NORTH) {
            y--;
        }

        if(direction == Lootr.DIRECTIONS.SOUTH) {
            y++;
        }

        if(direction == Lootr.DIRECTIONS.WEST) {
            x--;
        }

        if(direction == Lootr.DIRECTIONS.EAST) {
            x++;
        }

        // Some strange and annoying bug if x is negative or over postitive... not sure why.
        if(x < 0 || x > world.layout.length - 1) {
            return false;
        }

        if(world.layout[x][y] != undefined && world.layout[x][y].className == "Room") {
            return true;
        }

        return false;
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

        console.log("Room Stats ======");
        console.log("name: " + this.name);
        console.log("desc: " + this.desc);
        console.log("x: " + this.x);
        console.log("y: " + this.y);

    }

    Room.prototype._setId = function () {
        this.id = ++room_id_counter;
    };

	namespace.Room = Room;
})(Lootr.rooms, Lootr);



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
