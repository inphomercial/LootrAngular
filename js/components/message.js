/**
 * gives entities the ability to carry gold
 * @class Gold
 * @extends Component
 * @param {Entity} entity
 * @param {Object} args
 */
 function Message ( entity ) {
 	var message = this;

 	Component.call(this, entity);

 	this.$messages = [];

 	// What ever entity this component is on	
	this.$entity.on('Message.send', function ( msg ) {
		message.sendToUI(msg);
	});
 }

 Message.prototype = new Component;

 /*Message.prototype.getLast = function() {
 	UI.log(this.$messages.pop());
 }

 Message.prototype.add = function( message ) {
 	this.$messages.push(message);
 }

 Message.prototype.clear = function() {
 	this.$messages = [];
 }*/

 Message.prototype.sendToUI = function( message ) {
 	UI.log(message);
 }
