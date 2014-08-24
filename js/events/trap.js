function Trap( trap, entity )
{
	// Set all attributes for object
	this.desc      = trap.desc;
	this.fail      = trap.fail;
	this.success   = trap.success;
	this.damage    = trap.damage;
	this.attribute = trap.attribute;
	this.status    = trap.status;

	// Player object for now. @todo try this out against mobs
	this.entity = entity;

	// Debug
	UI.logDebug(trap);
}

Trap.prototype.isAbnormalStatus = function() {

	if(this.status)
	{
		return true;
	}

	return false;
},

Trap.prototype.isSprung = function() {

	// @todo make this check against attribute to see if dodge ro not
	// Check to see if player succeeds or fails trap based on player STATS
	var check = Math.random();
	if(check < 0.50)
	{
		return false;
	}

	return true;
};

Trap.prototype.doDamage = function() {

	if(this.entity.has("Health"))
	{
		this.entity.emit("Health.giveDamage", [this.damage]);
	}
	else
	{
		console.log("Entity doesnt have a Health Component");
	}
};


Trap.prototype.doStatus = function() {

	//player.Status.setStatus(this.status);

	/*player.status = this.status;

	// set player status_affect_timer, adding to an existing poison if they were already
	player._status_affect_timer = player._status_affect_timer + Math.floor(Math.random() * 5);*/
};