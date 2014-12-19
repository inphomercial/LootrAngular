/**
 * A Things Component
 * @class Equipable
 * @extends Component
 * @param {Entity} entity
 * @param {Object} args
 */
 function Equipable ( entity, args ) {
 	var equipable = this;

 	Component.call(this, entity, args);

 	this.$canEquip = args.equipable || true;
 }

 Equipable.prototype = new Component;

 Equipable.prototype.isEquipable = function() {
 	return this.$canEquip;
 };