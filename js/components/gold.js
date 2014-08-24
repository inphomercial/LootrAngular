/**
 * gives entities the ability to carry gold
 * @class Gold
 * @extends Component
 * @param {Entity} entity
 * @param {Object} args
 */
 function Gold ( entity, args ) {
 	var gold = this;

 	Component.call(this, entity, args);

 	this.$gold = args.gold;

 	// What ever entity this component is on
	// It will be looking for a generic giveGold string
	// Emitted from event_generator->gold->53
	this.$entity.on('Gold.giveGold', function ( amount ) {
		gold._giveGold(amount);
	});

	this.$entity.on('Gold.takeGold', function ( amount ) {
		gold._takeGold(amount);
	});
 }

 Gold.prototype = new Component;

 // Directly get gold
 Gold.prototype.getGold = function() {
 	return this.$gold;
 };


 // Should only be used by emits
 Gold.prototype._takeGold = function( amount ) {
 	this.$gold -= amount;
 };

 // Should only be used by emits
 Gold.prototype._giveGold = function( amount ) {
 	this.$gold += amount;
 	console.log('I got %s gold coins! I now have %s gold coins', amount, this.$gold);
 };

 // LocalStorage Saving Mechinisam
 Gold.prototype.save = function() {
 	var gold = {
 		gold: this.$gold
 	}

 	return gold;
 }