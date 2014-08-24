/**
 * @class Component
 * @extends Listener
 * @param {Entity} entity the entity that this component
 * is a part of
 * @param {Object} args information this component needs
 */
function Component (entity, args) {
	Listener.call(this);
	this.$entity = entity;
	this.$args = args;
}

Component.prototype = new Listener;
