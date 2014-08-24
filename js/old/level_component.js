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
	this.$current_exp += exp;

	// Check to see if we leveld up
	if(this.$current_exp >= this.$exp_to_level)
	{
		// @todo
		console.log(" WE NEED TO LEVEL UP ");
	}
};

Level.prototype.generateNewExpToLevel = function() {
	return this.$current_exp * 2;
};

Level.prototype.levelUp = function() {

	this.$level++;

	// emit a level up signal @todo

	this.$exp_to_level = this.generateNewExpToLevel();

	this.$current_exp = 0;

	// emit a generate new mob bag signal @todo

	// emit a fullheal signal to player @todo
};

/*
// Level Component
function LevelComponent( level )
{
	this.init(level);
}

LevelComponent.prototype.init = function( level )
{
	this.level = level;
	this.current_exp = 0;
	this.exp_to_level = 50;
}

LevelComponent.prototype.getLevel = function()
{
	return this.level;
}

LevelComponent.prototype.getExp = function()
{
	return this.current_exp;
}

LevelComponent.prototype.getExpToLevel = function()
{
	return this.exp_to_level;
}

LevelComponent.prototype.giveExp = function( amount )
{
	this.current_exp += amount;
	//$('#player_exp').text(this.current_exp).fadeOut(300).fadeIn(300);;

 	// Check to see if we leveled up
	if(this.current_exp >= this.exp_to_level)
	{
		this.levelUp();
	}
}

LevelComponent.prototype.getNewExpToLevel = function()
{
	return this.current_exp * 2;
}

LevelComponent.prototype.levelUp = function()
{
	// Display level up message
	UI.logSpace();
	UI.log("** You've leveled up! **", UI.COLORS.PLAYER_LEVEL);
	UI.logSpace();

	// Increment level
	this.level++;
	//$('#player_level').text(this.level).fadeOut(300).fadeIn(300);;

	// Increment HP @todo get this out of here
	player.Health.increaseMaxHp(this.level * 5);
	player.Health.fullHeal();

	//this.max_hp += this.level * 5;
	this.fullHeal();

	// Set new exp to level amount
	this.exp_to_level = this.getNewExpToLevel();
	//$('#player_exp_to_level').text(this.exp_to_level).fadeOut(300).fadeIn(300);;

	// Reset Exp
	this._current_exp = 0;
	//$('#player_exp').text(this.current_exp);

	// Generate a new mob bag pool @todo get this out of here
	MobBag.generate(this.level);

}
*/
