
var Roller = {

	roll: function( chance )
	{
		var rng = Math.random();

		if(rng > chance)
		{
			return false;
		}
		else
		{
			return true;
		}
	},

	rollDie: function( sides )
	{
		var result;

		result = Math.floor(Math.random() * sides) + 1;

		return result;
	},

	//+ Jonas Raoni Soares Silva
	//@ http://jsfromhell.com/array/shuffle [v1.0]
	shuffleArray: function( o )
	{
    	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);

    	return o;
	}
}