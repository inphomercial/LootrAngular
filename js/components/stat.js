

// Base Stat
function Stat( entity, args ) {
	var stat = this;

	if(!args) {
		args = {};
	}

	Component.call(this, entity, args);

	// Stat value
	this.$stat = args.value;

	// Ensure an entity exists
	if (this.$entity) {
		this.$entity.on('Stat.giveStat', function ( stat_affected, amount ) {
			if(stat_affected === stat.$type) {
				stat._giveStat(amount);
			}
		});

		this.$entity.on('Stat.takeStat', function ( stat_affected, amount ) {
			if(stat_affected === stat.$type) {
				stat._takeStat(amount);
			}
		});
	}
};

Stat.prototype = new Component;

Stat.prototype._giveStat = function( amount ) {
	this.$stat += amount;
};

Stat.prototype._takeStat = function( amount ) {
	this.$stat -= amount;
};

Stat.prototype.getStat = function() {
	return this.$stat;
}


// Atk Stat
function Atk( entity, args ) {
	var stat = this;

	Stat.call(this, entity, args);

	// Atk value
	this.$stat = args.value;
	this.$type = Lootr.PLAYER_STATS.ATK;
};

Atk.prototype = new Stat;



// Def Stat
function Def( entity, args ) {
	var stat = this;

	Stat.call(this, entity, args);

	// Def value
	this.$stat = args.value;
	this.$type = Lootr.PLAYER_STATS.DEF;
};

Def.prototype = new Stat;



// Def Stat
function Mag( entity, args ) {
	var stat = this;

	Stat.call(this, entity, args);

	// Mag value
	this.$stat  = args.value;
	this.$type = Lootr.PLAYER_STATS.MAG;
};

Mag.prototype = new Stat;


Stat.prototype.save = function() {
	return {
		stat: this.$stat,
		type: this.$type
	}
}