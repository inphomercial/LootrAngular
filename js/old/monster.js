/*
function Monster()
{
}

Monster.prototype.init = function( monster ) {

	this.name = monster.name;
	this.desc = monster.desc;
	this.hp = monster.max_hp;
	this.max_hp = monster.max_hp;

	//this.Health = new HealthComponent(monster.max_hp);

	// Inventory Component
	//this.Inventory = new InventoryComponent();

	this.atk = monster.atk;
	this.def = monster.def;
	this.mag = monster.mag;
	this.exp = monster.exp;
	this.level = monster.level;

	this.attack_messages = monster.attack_messages;
	this.death_message = monster.death_message;
};

Monster.prototype.generate = function() {

		// find monster in monster_table
		var monster = event_monster[Math.floor(Math.random()*event_monster.length)];

		// Set all attributes to Monster class object
		this.init(monster);

		return this;
};

Monster.prototype.generateAmountByLevel = function( amount, level ) {

		var tempBag = [];
		var finalBag = [];

		// Build temp bag filled with only level monsters
		for(var i=0; i<event_monster.length; i++)
		{
			if(event_monster[i].level == level)
			{
				tempBag.push(event_monster[i]);
			}
		}

		// Populate final bag with random monsters for an amount
		for(var a=0; a<amount; a++)
		{
			var monster = tempBag[Math.floor(Math.random()*tempBag.length)];

			var i = new Monster();
			i.init(monster);

			finalBag.push(i);
		}

		// Remove non Monster type objects -- NOT WORKING.. why not?
		for(var e=0; e<finalBag.length; e++)
		{
			if(!(finalBag[e] instanceof Monster))
			{
				finalBag.splice(e, 1);
			}
		}

		return finalBag;
};

Monster.prototype.takeDamage = function( damage )
{
	this.hp -= damage;
};
*/






