/**
 * gives entities the ability to track stats
 * @class Progress
 * @extends Component
 * @param {Entity} entity
 * @param {Object} args
 */
 function Progress ( entity, args ) {
 	var progress = this;

 	Component.call(this, entity, args);

 	this.$moves = 0;
 	this.$kills = 0;
 	this.$items_collected = 0;

 	this.$entity.on('Progress.move', function () {
		progress._increment('moves');
		console.log("Moved");
	});

	this.$entity.on('Progress.items_collected', function() {
		progress._increment('items_collected');
		console.log("Item Collected");
	})
 }

 Progress.prototype = new Component;

 Progress.prototype.getProgress = function() {
 	return this;
 };

 Progress.prototype._increment = function( stat ) {
 	this[ "$" + stat ]++;
 };