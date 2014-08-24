
// Atk Component
function AtkComponent( starting_atk )
{
	this.init(starting_atk);
}

AtkComponent.prototype.init = function( starting_atk )
{
	this.atk = starting_atk;
}

AtkComponent.prototype.giveStat = function( amount )
{
	this.atk += amount;
}

AtkComponent.prototype.takeStat = function( amount )
{
	this.atk -= amount;
}

AtkComponent.prototype.getStat = function()
{
	return this.atk;
}

