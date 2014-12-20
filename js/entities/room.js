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

		this.standing_desc = args.standing_desc;
		this.enter_desc = args.enter_desc;
        this.world = args.world;

        this.className = "Room";

        // Container for objects (players, things, monsters)
        this.entities = [];

        if(args.x == undefined || args.y == undefined) {
            throw new Error("No x, y for room template!");
        }
        this.component('Location', { x: args.x, y: args.y });

        // Messaging 
        this.component('Message');

        // this.randomizeExits();
	}

	Room.prototype = new Entity;

    Room.prototype.getX = function() {
        return this.Location.getX();
    };

    Room.prototype.getY = function() {
        return this.Location.getY();
    }

    // Add entity object to entities array
	Room.prototype.addEntity = function(entity) {

        UI.logDebug("Added entity to room", entity);

        this.entities.push(entity);
	}

    Room.prototype.removeEntity = function(entity) {

        for(var i=0; i<this.entities.length; i++) {

            // Only a single ID & ClassName match
            if(entity.id == this.entities[i].id && entity.className == this.entities[i].className) {

                var removed = this.entities.splice(i, 1);
                console.log("Removed entity :");
                console.log(removed[0]);
            }
            else {
                continue;
            }
        }
    }

    Room.prototype.canMoveInDirection = function(direction) {

        var x = this.Location.getX();
        var y = this.Location.getY();

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

        if(this.entities.length > 0) {
            for (var i = 0; i < this.entities.length; i++) {
                if(this.entities[i].className == type) {
                    return true;
                }
            }
        }

        return false;
    }

    Room.prototype.getEntityType = function ( type ) {

        // Used to return player directly instead of inside array
        if(type === "Player") {
            for (var i = 0; i < this.entities.length; i++) {
                if(this.entities[i].className == type) {
                    return this.entities[i];
                }
            }    
        // Otherwise return array of entities found, excluding Player
        } else {
            var entities = [];
            for (var i = 0; i < this.entities.length; i++) {
                if(this.entities[i].className == type) {
                    entities.push(this.entities[i]);
                }
            }

            return entities;    
        }        
    }

    Room.prototype.displayContents = function() {

        UI.logSpace();
        UI.log(this.standing_desc);
        UI.logSpace();

        for(var i=0; i<=this.entities.length; i++) {
            if(this.entities[i] instanceof Lootr.entities.Player) {
                UI.log(this.entities[i].getDescription() + " " + this.standing_desc); //@todo have a player.visualDesc based on health percentages for better descriptions
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

        UI.logDebug("## Room Stats ##");
        UI.logDebug("# Entities : " + this.entities.length);
        UI.logDebug("# Name: " + this.name);
        UI.logDebug("# Desc: " + this.desc);
        UI.logDebug("# X: " + this.getX());
        UI.logDebug("# Y: " + this.getY());

    }

    Room.prototype._setId = function () {
        this.id = ++room_id_counter;
    };

	namespace.Room = Room;
})(Lootr.rooms, Lootr);