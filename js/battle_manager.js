
function BattleEngine( monster, entitiy ) {

	this.m = monster;
	this.e = entitiy;
}

BattleEngine.prototype.fight = function() {

	if(!(this.m.Health.isDead() && this.e.Health.isDead()))
	{
		console.log("everyone is alive");

		// Determine who attacks first

		// Determine if you hit
		var hit = Math.floor(Math.random() * 100);
		if(hit > 50)
		{
			UI.logDebug("++++ ENTITY ATTACK ++++");
			// Find out how much damage you will do
			// random damage from 1-atk.$stat
			var e_atk_amount = Math.floor(Math.random() * this.e.Atk.$stat + 1);
			UI.logDebug("entity attack amount ", e_atk_amount);

			// random def from 0-def.$stat
			var m_def_amount = Math.floor(Math.random() * this.m.Def.$stat);
			UI.logDebug("monster def amount ", m_def_amount);

			// If atkamount > defamount apply damage
			var remaining = e_atk_amount - m_def_amount;
			UI.logDebug("actual damage ", remaining);
			if(remaining > 0)
			{
				// Apply damage
				this.m.Health._giveDamage(remaining);

				// Display hit message
				UI.logSpace();
				UI.log("You hit the " + this.m.name + " for [" + remaining + "]", UI.COLORS.FIGHT);
				UI.logSpace();
			}
			else
			{
				// Display hit but no damage message
				UI.logSpace();
				UI.log("Your hit didnt even phase the " + this.m.name, UI.COLORS.FIGHT);
				UI.logSpace();
			}
		}
		else
		{
			// Display missed message
			UI.logSpace();
			UI.log("You miss your attack!", UI.COLORS.FIGHT);
			UI.logSpace();
		}

		UI.logDebug("++++++++++++++++");

		// Check for death
		if(this.e.Health.isDead())
		{
			console.log("player died");
		}

		// Determine if they hit
		var hit = Math.floor(Math.random() * 100);
		if(hit > 50)
		{
			UI.logDebug("++++ MONSTER ATTACK ++++");
			var m_atk_amount = Math.floor(Math.random() * this.m.Atk.$stat + 1);
			var e_def_amount = Math.floor(Math.random() * this.e.Def.$stat);
			var remaining = m_atk_amount - e_def_amount;

			UI.logDebug("monster atk amount ", m_atk_amount);
			UI.logDebug("entity def amount ", e_def_amount);
			UI.logDebug("actual damage ", remaining);

			if(remaining > 0)
			{
				// Apply damage
				this.e.Health._giveDamage(remaining);

				var msg = this.m.attack_messages[Math.floor(Math.random()*this.m.attack_messages.length)];

				// Display hit message
				UI.logSpace();
				UI.log(msg + "   [" + remaining + "]", UI.COLORS.FIGHT);
				UI.logSpace();
			}
			else
			{
				// Display hit but no damage message
				UI.logSpace();
				UI.log("The " + this.m.name + "'s hit bounced right off you.", UI.COLORS.FIGHT);
				UI.logSpace();
			}
		}
		else
		{
			// Display missed message
			UI.logSpace();
			UI.log("The " + this.m.name + " misses its attack!", UI.COLORS.FIGHT);
			UI.logSpace();
		}

		UI.logDebug("++++++++++++++++");

		// Check for death
		if(this.m.Health.isDead())
		{
			console.log("monster died");

			UI.logSpace();
			UI.log(this.m.death_message, UI.COLORS.FIGHT);
			UI.logSpace();

			this.e.emit("Level.giveExp", [this.m.exp]);
			return true;
		}
	}

	return false;
}

// @todo this should probably use a real stat to see who goes first
BattleEngine.prototype._determineFirstAction = function() {
	var first = Math.random() * 100;
	var second = Math.random() * 100;

	return first > second;
}























var BattleManager = {

	m          : null,
	m_wins     : null,
	m_wins_atk : null,
	m_wins_def : null,
	m_wins_mag : null,
	e_wins     : null,
	e_wins_atk : null,
	e_wins_def : null,
	e_wins_mag : null,

	init: function( monster, entity ) {

		BattleManager.m = monster;
		BattleManager.e = entity;
	},

	battleLoop: function() {

		// Is monster or player dead?
		while(BattleManager.m.Health.getHp() > 0 && BattleManager.e.Health.getHp() > 0)
		{
			// Let player try to do something before next combat round
			//player.battleAction();

			//setInterval( BattleManager._battle(), 4000);
		}

		// Player has died during combat
		/*if(player.hp < 1)*/
		if(BattleManager.e.Health.isDead())
		{
			 alert("DIEDDD");
			//BattleManager.e.Health.dead();
		}

		// Monster died
		//if(BattleManager.m.hp < 1)
		if(BattleManager.m.Health.isDead())
		{
			// display death scream
			UI.logSpace();
			//UI.log("The " + BattleManager.m.name + " screams as you slay it.", UI.COLORS.FIGHT);
			UI.log(BattleManager.m.death_message, UI.COLORS.FIGHT);
			UI.logSpace();

			// Give the player exp
			player.Level.giveExp(BattleManager.m.exp);
		}
	},

	_battle: function() {

		// Set wins to 0
		BattleManager.m_wins = 0;
		BattleManager.m_wins_atk = false;
		BattleManager.m_wins_def = false;
		BattleManager.m_wins_mag = false;

		BattleManager.e_wins = 0;
		BattleManager.e_wins_atk = false;
		BattleManager.e_wins_def = false;
		BattleManager.e_wins_mag = false;

		// startRound 1
		BattleManager._startRound(Lootr.ROUND_ATR.ATK, Lootr.ROUND_ATR.DEF);

		// startRound 2
		BattleManager._startRound(Lootr.ROUND_ATR.DEF, Lootr.ROUND_ATR.ATK);

		// Check if someone has won
		var result = BattleManager._checkIfWinner(2);

		// If winner, find who
		if(result)
		{
			if(BattleManager.e_wins == 2)
			{
				BattleManager._attemptToHit(BattleManager.m);
			}

			if(BattleManager.m_wins == 2)
			{
				BattleManager._attemptToHit(BattleManager.e);
			}
		}
		else
		{
			// startRound 3
			BattleManager._startRound(Lootr.ROUND_ATR.MAG, Lootr.ROUND_ATR.MAG);

			// Did someone win all three - automatic hit!?
			var res = BattleManager._checkIfWinner(3);
			if(res)
			{
				if(BattleManager.e_wins == 3)
				{
					/*var isHit = BattleManager._attemptToHit(BattleManager.m);
					if(isHit)
					{*/
						BattleManager._rollHitDamage(player);
					//}
				}

				if(BattleManager.m_wins == 3)
				{
					/*var isHit = BattleManager._attemptToHit(player);
					if(isHit)
					{*/
						BattleManager._rollHitDamage(BattleManager.m);
					//}
				}
			}
			// Someone won their second round on round 3
			else
			{
				if(BattleManager.e_wins == 2)
				{
					var isHit = BattleManager._attemptToHit(BattleManager.m);
					if(isHit)
					{
						BattleManager._rollHitDamage(player);
					}
				}

				if(BattleManager.m_wins == 2)
				{
					var isHit = BattleManager._attemptToHit(player);
					if(isHit)
					{
						BattleManager._rollHitDamage(BattleManager.m);
					}
				}
			}
		}
	},

	_rollHitDamage: function( mob ) {

		var damage_die = 0;

		if(mob instanceof PlayerEntity)
		{
			var damage_die = BattleManager._getWinningAttributeTotals(player);

			var hitFor = Roller.rollDie(damage_die);

			// Method to do damage passing hitFor
			//BattleManager.m.takeDamage(hitFor);
			BattleManager.m.Health.giveDamage(hitFor);

			UI.logSpace();
			UI.log("You hit the " + BattleManager.m.name + " for [" + hitFor + "]", UI.COLORS.FIGHT);
			UI.logSpace();
		}

		if(mob instanceof Monster)
		{
			var damage_die = BattleManager._getWinningAttributeTotals(BattleManager.m);

			var hitFor = Roller.rollDie(damage_die);

			// Method to do damage passing hitFor
			player.Health.giveDamage(hitFor);

			var attack_message = BattleManager.m.attack_messages[Math.floor(Math.random()*BattleManager.m.attack_messages.length)];

			UI.logSpace();
			UI.log(attack_message + "   [" + hitFor + "]", UI.COLORS.FIGHT);
			UI.logSpace();
		}

	},

	_getWinningAttributeTotals: function( mob ) {

		var total = 0;

		if(mob instanceof PlayerEntity)
		{
			if(BattleManager.e_wins_atk)
				total += player[Lootr.PLAYER_STATS.ATK];

			if(BattleManager.e_wins_def)
				total += player[Lootr.PLAYER_STATS.DEF];

			if(BattleManager.e_wins_mag)
				total += player[Lootr.PLAYER_STATS.MAG];

			return total;
		}

		if(mob instanceof Monster)
		{
			if(BattleManager.m_wins_atk)
				total += BattleManager.m[Lootr.PLAYER_STATS.ATK];

			if(BattleManager.m_wins_def)
				total += BattleManager.m[Lootr.PLAYER_STATS.DEF];

			if(BattleManager.m_wins_mag)
				total += BattleManager.m[Lootr.PLAYER_STATS.MAG];

			return total;
		}
	},

	_attemptToHit: function( mob ) {

		if(mob instanceof Player)
		{
			// Roll against spds

			// return true or false
			return true;
		}

		if(mob instanceof Monster)
		{
			return true;
		}

	},

	_checkIfWinner: function( wins ) {

		if(BattleManager.e_wins == wins || BattleManager.m_wins == wins)
		{
			return true;
		}

		return false;
	},

	_determineDieForRound: function( round_atr, opposing_atr ) {

		var total = 0;

		total += BattleManager.e[round_atr];

		total += BattleManager.m[opposing_atr];

		return total;
	},

	_startRound: function( player_atr, opposing_atr ) {

		var die = BattleManager._determineDieForRound( player_atr, opposing_atr );

		// player rolls
		var player_roll = Roller.rollDie(die) + BattleManager.e[player_atr];

		// monster rolls
		var monster_roll = Roller.rollDie(die) + BattleManager.m[opposing_atr];

		if(player_roll > monster_roll)
		{
			BattleManager.e_wins++;
			if(player_atr == Lootr.ROUND_ATR.ATK)
			{
				BattleManager.e_wins_atk = true;
			}
			if(player_atr == Lootr.ROUND_ATR.DEF)
			{
				BattleManager.e_wins_def = true;
			}
			if(player_atr == Lootr.ROUND_ATR.MAG)
			{
				BattleManager.e_wins_mag = true;
			}
		}
		else
		{
			BattleManager.m_wins++;
			if(opposing_atr == Lootr.ROUND_ATR.ATK)
			{
				BattleManager.m_wins_atk = true;
			}
			if(opposing_atr == Lootr.ROUND_ATR.DEF)
			{
				BattleManager.m_wins_def = true;
			}
			if(opposing_atr == Lootr.ROUND_ATR.MAG)
			{
				BattleManager.m_wins_mags = true;
			}
		}
	}
}