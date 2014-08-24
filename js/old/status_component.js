
// Status Component
function StatusComponent( status )
{
	this.init(status);
}

StatusComponent.prototype.init = function( status )
{
	this.status = status;
	this.status_affect_timer = 0;
}

StatusComponent.prototype.setStatus = function( status )
{
	this.status = status;
	this.status_affect_timer += Math.floor(Math.random() * 5);
}

StatusComponent.prototype.clearStatus = function()
{
	this.status = Lootr.PLAYER_STATUS.NORMAL;
	this.status_affect_timer = 0;
}

StatusComponent.prototype.checkStatus = function()
{
	if(player.Health.isDead())
	{
		this.status = Lootr.PLAYER_STATUS.DEAD;
		return false;
	}

	if(this.status == Lootr.PLAYER_STATUS.POISON)
	{
		UI.logSpace();
		UI.log("The poison takes a toll on you.", UI.COLORS.PLAYER_BAD);
		UI.logSpace();

		// Visual Representation of being poisoned
		//@todo move this out
		$('#player_hp').fadeOut(300).fadeIn(300);

		// Take poison damage, remove a timer counter @todo how to remove this from here
		player.Health.giveDamage(Math.floor(player.Health.getHp() / 10));
		this.status_affect_timer--;

		// See if timer is over, remove poison if so
		if(this.status_affect_timer <= 0)
		{
			this.clearStatus();

			UI.logSpace();
			UI.log("The poison has runs its course.", UI.COLORS.PLAYER_BAD);
			UI.logSpace();

			// @todo move thisese
			$('#player_status').text(this.status).fadeOut(300).fadeIn(300);;
			$('#player_hp').removeClass(UI.COLORS.PLAYER_BAD);
		}
	}

	return true;
}