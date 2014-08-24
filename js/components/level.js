/**
 * gives entities level abilites
 * @class Level
 * @extends Component
 * @param {Entity} entity
 * @param {Object} args
 */
function Level (entity, args) {
	var level = this;

	Component.call(this, entity, args);

	// Level related variables
	this.$level = args.level;
	this.$current_exp = args.current_exp;
	this.$exp_to_level = args.exp_to_level;

	this.$entity.on('Level.giveExp', function ( amount ) {
		level.giveExp(amount);
	});
}

Level.prototype = new Component;

Level.prototype.getLevel = function() {
	return this.$level;
};

Level.prototype.getCurrentExp = function() {
	return this.$current_exp;
};

Level.prototype.getExpToLevel = function() {
	return this.$exp_to_level;
};

Level.prototype.giveExp = function( exp ) {
	// Check for exp overflow
	if((this.$current_exp + exp) > this.$exp_to_level)
	{
 		var overflow = (this.$current_exp + exp) - this.$exp_to_level;
 		var remaining = exp - overflow;

 		// Add remaining non-overflow exp
 		this.$current_exp += remaining;
 		this.levelUp();

		this.giveExp(overflow);
	}
	else
	{
		// If not over exp_to_level bounds, add to exp
		this.$current_exp += exp;

		// Check to see if we leveled up
		if(this.$current_exp >= this.$exp_to_level)
		{
			this.levelUp();
		}
	}
};

Level.prototype.generateNewExpToLevel = function() {
	return this.$current_exp * 2;
};

Level.prototype.levelUp = function() {

	console.log("Leveled up!");
	UI.logSpace();
	UI.log(" ** You have Gained a Level! ** ");
	UI.logSpace();

	this.$level++;

	this.$exp_to_level = this.generateNewExpToLevel();

	this.$current_exp = 0;

	// @todo emit a generate new mob bag signal @todo
	MobBag.generate( this.$level );

	// Emit a full heal for entity
	this.$entity.emit("Health.fullHp");
};

// LocalStorage Saving Mechinisam
Level.prototype.save = function() {
 	var level = {
 		level: this.$level,
 		exp_to_level: this.$exp_to_level,
 		current_exp: this.$current_exp
 	}

 	return level;
 }