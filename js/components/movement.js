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
	// this.$hp = args.hp;
	// this.$max_hp = args.max_hp;

	// What ever entity this component is on
	// It will be looking for a generic giveDamage string
	this.$entity.on('Movement.move', function ( direction ) {
		movement._moveDirection( direction );
	});
}

Movement.prototype = new Component;

Movement.prototype._moveDirection = function ( direction ) {
    console.log("Attempting to move " + direction);
    // player.emit("Location.update", [x, y]);
	// Emit a full heal for entity
	this.$entity.emit("Location.update", [x, y]);
};
