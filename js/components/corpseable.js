/**
 * A Things Component
 * @class Corpseable
 * @extends Component
 * @param {Entity} entity
 * @param {Object} args
 */
 function Corpseable ( entity, args ) {
 	var corpseable = this;

 	Component.call(this, entity, args);

 	this.$corpseable = args.corpseable || true;

 	// What ever entity this component is on
	this.$entity.on('Corpseable.create', function () {
		corpseable.createCorpse();
	});
 }

 Corpseable.prototype = new Component;

 Corpseable.prototype.createCorpse = function() {

 	if(this.isCorpseable()){
 		var current_room = this.$entity.world.getRoomByLocation(this.$entity.Location.getX(), this.$entity.Location.getY());

	 	current_room.removeEntity(this.$entity);

	 	var corpse = Lootr.Treasure.generateByName('CORPSE', Lootr.TREASURE_TYPES.MISC);
	 	current_room.addEntity(corpse);	
 	} 	
 }

 Corpseable.prototype.isCorpseable = function() {
 	return this.$corpseable;
 };