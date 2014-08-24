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
 }

 Consumable.prototype = new Component;