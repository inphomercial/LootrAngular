/**
 * gives entities movement
 * @class Movement
 * @extends Component
 * @param {Entity} entity
 * @param {Object} args
 */
function Movement (entity, args) {
	var movement = this;

	Component.call(this, entity, args);

	// Movement related variables
	this.$moveable = args.moveable;

	// What ever entity this component is on
	// It will be looking for a generic giveDamage string
	this.$entity.on('Movement.move', function ( direction ) {
        if( this.$moveable == true ) {
		    movement._moveDirection( direction );
        } else {
            console.log(this.$entity.className + " Object is not moveable");
        }
	});
}

Movement.prototype = new Component;

Movement.prototype.generateRandomDirection = function() {

    var direction;
    var roll = Roller.randomNumber(1, 4);

    if(roll == 1) {
        direction = Lootr.DIRECTIONS.NORTH;
    }

    if(roll == 2) {
        direction = Lootr.DIRECTIONS.SOUTH;
    }

    if(roll == 3) {
        direction = Lootr.DIRECTIONS.WEST;
    }

    if(roll == 4) {
        direction = Lootr.DIRECTIONS.EAST;
    }

    return direction;
}

Movement.prototype._moveDirection = function ( direction ) {

    // Get the current room
    var room = this.$entity.world.layout[this.$entity.Location.$x][this.$entity.Location.$y];

    // Check if direction leads to a room
    if(room.canMoveInDirection(direction) == false) {
        console.log("There is a wall..");
        return;
    }

    // Update entities Location
	this.$entity.emit("Location.update", [direction]);

    // Remove the entity from the room
    room.removeEntity(this.$entity);

    // Get the moved to room and add the Entity to it.
    var new_room = this.$entity.world.layout[this.$entity.Location.$x][this.$entity.Location.$y];
    new_room.addEntity(this.$entity);

    // Show what dir a mob moves
    console.log(this.$entity.name + " moves " + direction);

    // Show new room contents for player only. {HACKY}
    // if(this.$entity.className == "Player") {
    //     // Say what's in the new room.
    //     new_room.displayContents();    
    // }
    
};
