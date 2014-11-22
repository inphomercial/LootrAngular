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
            console.log(this.$entity + " Object is not moveable");
        }
	});
}

Movement.prototype = new Component;

Movement.prototype._moveDirection = function ( direction ) {

    console.log("Attempting to move " + direction);
	this.$entity.emit("Location.update", [direction]);
};
