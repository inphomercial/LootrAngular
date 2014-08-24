
// Def Component
function DefComponent( starting_def )
{
	this.init(starting_def);
}

DefComponent.prototype.init = function( starting_def )
{
	this.def = starting_def;
}

DefComponent.prototype.giveStat = function( amount )
{
	this.def += amount;
}

DefComponent.prototype.takeStat = function( amount )
{
	this.def -= amount;
}

DefComponent.prototype.getStat = function()
{
	return this.def;
}

