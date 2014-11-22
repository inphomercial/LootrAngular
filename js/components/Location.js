/**
 * gives entities Location
 * @class Location
 * @extends Component
 * @param {Entity} entity
 * @param {Object} args
 */
function Location (entity, args) {
	var location = this;

	Component.call(this, entity, args);

	// Location related variables
	this.$x = args.x;
	this.$y = args.y;

	// What ever entity this component is on
	// It will be looking for a generic giveDamage string
	this.$entity.on('Location.update', function ( x, y ) {
		location._update(x, y);
	});
}

Location.prototype = new Component;

Location.prototype._update = function (x, y) {
    this.$x = x;
    this.$y = y;
	console.log("Location updated to %x %y", x, y);
};
