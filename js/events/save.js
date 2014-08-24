
function Save( save, entity )
{
	this.desc   = save.desc;
	this.action = save.action;

	this.entity = entity;
}

Save.prototype.doAction = function() {

	switch(this.action) {

		case 1:
			// merchant sell goods
			//Lootr.store_in_room = true;

			//this.entity.emit('Inventory.sellItems', []);

			// @todo remove this, just to get some xp, add some
			this.entity.emit('Level.giveExp', [10]);

			break;

		case 2:
			// heal alter
			this.entity.emit('Health.fullHeal', []);

			break;

		default:
		// anything else
	}
};