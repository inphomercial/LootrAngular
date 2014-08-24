// Event Trap
var event_trap = [
	{
		desc: "*Something shoots from the walls!*",
		fail: "You get pellted by darts.",
		success: "You roll, narrowly dodging what looks like darts.",
	 	damage: 2,
	 	attribute: Lootr.PLAYER_STATS.DEX,
	 	status: Lootr.PLAYER_STATUS.POISON
	 },
	 {
		desc: "*A foul smelling gas leaks into the room.*",
		fail: "You cough until there is blood present.",
		success: "You cover your mouth in time to not be affected.",
	 	damage: 1,
	 	attribute: Lootr.PLAYER_STATS.DEX,
	 	status: null
	 },
	 {
		desc: "*A rumbling is heard!*",
		fail: "Rocks from the wall collapse and crumble, striking you hard!.",
		success: "You move away just in time to see a giant stone smash into the ground.",
	 	damage: 8,
	 	attribute: Lootr.PLAYER_STATS.STR,
	 	status: null
	 },
	 {
		desc: "*The flooring starts to give way.*",
		fail: "You fall to the floor hitting hard, barely catching yourself from dropping to your doom.",
		success: "You jump away in time to not fall into the collapsing floor.",
	 	damage: 3,
	 	attribute: Lootr.PLAYER_STATS.STR,
	 	status: null
	 },
	 {
		desc: "",
		fail: "You step hard on a spike. The top of the spike is visible through your foot.",
		success: "You notice sharp spikes in the ground and walk around them.",
	 	damage: 5,
	 	attribute: Lootr.PLAYER_STATS.DEF,
	 	status: null
	 }
]