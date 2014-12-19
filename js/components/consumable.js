/**
 * gives entities the ability to carry gold
 * @class Gold
 * @extends Component
 * @param {Entity} entity
 * @param {Object} args
 */
 function Consumable ( entity, args ) {
 	var consumable = this;

 	Component.call(this, entity, args);

 	this.$is_consumable = args.is_consumable;
 	this.$consume_amount = args.consume_amount;
 	this.$sips = args.sips;
 }

 Consumable.prototype = new Component;

 Consumable.prototype.getSips = function() {
 	return this.$sips;
 }

 Consumable.prototype.hasSipsLeft = function() {
 	if(this.$sips > 0) {
 		return true;
 	} else {
 		return false;
 	}
 }

 Consumable.prototype.takeSip = function() { 	
	this.$sips--;
	return this.$consume_amount;	
 }

 Consumable.prototype.isConsumable = function() {
 	return this.$is_consumable;
 }