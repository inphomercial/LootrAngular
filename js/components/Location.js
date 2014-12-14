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
	this.$entity.on('Location.update', function ( direction ) {
		location._update( direction );
	});
}

Location.prototype = new Component;

Location.prototype.getX = function() {
    return this.$x;
};

Location.prototype.getY = function() {
    return this.$y;
};

Location.prototype.setX = function(x) {
    this.$x = x;
};

Location.prototype.setY = function(y) {
    this.$y = y;
};

Location.prototype._update = function ( direction ) {
    if(direction == Lootr.DIRECTIONS.NORTH) {
        this.$y--;
    }

    if(direction == Lootr.DIRECTIONS.SOUTH) {
        this.$y++;
    }

    if(direction == Lootr.DIRECTIONS.WEST) {
        this.$x--;
    }

    if(direction == Lootr.DIRECTIONS.EAST) {
        this.$x++;
    }
};
