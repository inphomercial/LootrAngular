(function (namespace, Lootr) {
	'use strict';

    var room_id_counter = 0;

	/**
	 * @class Room
	 * @extends Entity
	 */
	function Room ( args, world ) {
		Entity.call(this);

        // And Sets the room ID
        this._setId();

		this.name = args.name;
		this.desc = args.desc;
        this.world = world;

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
        if(x < 0 || x > this.world.layout.length - 1) {
            return false;
        }

        if(this.world.layout[x][y] != undefined && this.world.layout[x][y].className == "Room") {
            return true;
        }

        return false;
    }

    Room.prototype.hasEntityType = function( type ) {
        
        var result = false;        

        if(this.entities.length > 0) {
            for (var i = 0; i < this.entities.length; i++) {
                if(this.entities[i].className == type) {
                    result = true;
                }
            }
        }

        return result;
    }

    Room.prototype.getEntityType = function ( type ) {

        var entities = [];
        for (var i = 0; i < this.entities.length; i++) {
            if(this.entities[i].className == type) {
                entities.push(this.entities[i]);
            }
        }

        return entities;
    }

    Room.prototype.displayContents = function() {

        UI.logSpace();

        for(var i=0; i<=this.entities.length; i++) {
            if(this.entities[i] instanceof Lootr.entities.Player) {
                UI.log(this.entities[i].name + " is here."); //@todo have a player.visualDesc based on health percentages for better descriptions
                UI.logSpace();
            }

            if(this.entities[i] instanceof Lootr.entities.Monster) {
                UI.log(this.entities[i].desc);
                UI.logSpace();
            }

            if(this.entities[i] instanceof Lootr.entities.Thing) {
                UI.log(this.entities[i].desc);
                UI.logSpace();
            }
        }

        console.log("## Room Stats ##");
        console.log("# Entities : " + this.entities.length);
        console.log("# Name: " + this.name);
        console.log("# Desc: " + this.desc);
        console.log("# X: " + this.x);
        console.log("# Y: " + this.y);

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
