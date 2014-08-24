
// Mag Component
function MagComponent( starting_mag )
{
	this.init(starting_mag);
}

MagComponent.prototype.init = function( starting_mag )
{
	this.mag = starting_mag;
}

MagComponent.prototype.giveStat = function( amount )
{
	this.mag += amount;
}

MagComponent.prototype.takeStat = function( amount )
{
	this.mag -= amount;
}

MagComponent.prototype.getStat = function()
{
	return this.mag;
}

