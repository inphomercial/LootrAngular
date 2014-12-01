/**
 * gives entities health
 * @class Health
 * @extends Component
 * @param {Entity} entity
 * @param {Object} args
 */
function Health (entity, args) {
	var health = this;

	Component.call(this, entity, args);

	// Health related variables
	this.$hp = args.hp;
	this.$max_hp = args.max_hp;

	// What ever entity this component is on
	// It will be looking for a generic giveDamage string
	this.$entity.on('Health.giveDamage', function ( damage ) {
		health._giveDamage(damage);
	});

	this.$entity.on('Health.giveHp', function ( hp ) {
		health._giveHp(hp);
	});

	this.$entity.on('Health.fullHp', function() {
		health._fullHeal();
	});
}

Health.prototype = new Component;

Health.prototype.getHp = function () {
	return this.$hp;
};

Health.prototype.getMaxHp = function () {
	return this.$max_hp;
};

Health.prototype._giveHp = function( hp ) {
	this.$hp += hp;

	if(this.$hp > this.$max_hp)
	{
		this.$hp = this.$max_hp;
	}
};

Health.prototype._giveDamage = function ( damage ) {
	this.$hp -= damage;
	console.log("Took %s damage", damage);
};

Health.prototype._fullHeal = function() {
	this.$hp = this.$max_hp;
	console.log("Fully Heals");
};

Health.prototype.isDead = function()
{
	if(this.$hp < 1)
	{
		return true;
	}

	return false;
}

// LocalStorage Saving Mechinisam
Health.prototype.save = function() {
 	var health = {
 		hp: this.$hp,
 		max_hp: this.$max_hp
 	}

 	return health;
 }
