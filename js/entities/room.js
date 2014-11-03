(function (namespace, Lootr) {
	'use strict';

	/**
	 * @class Room
	 * @extends Entity
	 */
	function Room ( args ) {
		Entity.call(this);

		this.name = args.name;
		this.desc = args.desc;

        // Testing
        this.exit_north = true;
        this.exit_south = true;
        this.exit_west = true;
        this.exist_east = false;

        this.entities = [];

        this.id = 3;
	}

	Room.prototype = new Entity;

    // Add entity object to entities array
	Room.prototype.addEntity = function(entity) {
        this.entities.push(entity);
	}

    Room.prototype.getExits = function() {
       var exits;

      if(this.exit_north) {
         return "Exits: North";
      }
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
