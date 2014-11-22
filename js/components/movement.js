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

Movement.prototype._moveDirection = function ( direction ) {
    var room = w.layout[this.$entity.Location.$x][this.$entity.Location.$y];

    console.log("Am I the right room?");
    console.log(room);
    console.log("Attempting to move " + direction);
	this.$entity.emit("Location.update", [direction]);

    console.log("who is this entity");
    console.log(this.$entity);

    room.removeEntity(this.$entity);
};
