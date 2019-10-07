var gameSpeed = 60;
var currLevel = 0;
var starNumber = 200;
var roomSize = 0.04;
var doorWidth = 0.13;
var doorHeight = 0.35;
var doorHealth = 1;
var shipScaleX = 1.5;
var shipScaleY = 1.2;
var openSpeed = 0.03;
var distanceTraveled1 = 0;
var distanceTraveled2 = 0;
var travelSpeed = 0.0008;
var vacuumRate = 0.02;
var oxygenRestoreRate = 0.001;
var plantEatRate = 0.001;
var oxygenFlowRate = 0.02;
var suspicionMinimum = 0.05;
var suspicion = suspicionMinimum;
var shipMaxHealth = 1;
var shipHealth = shipMaxHealth;
var suspicionDecayRate = 0.0001;
var animationTime = 6;
var animationFrame = 0;
var t = 0;
var oxygenDamage = 0.0007;
var oxygenDamageThreshold = 0.15;
var openOutsideDoorSuspicion = 0.04;
var enemySuffocationThreshold = 0.25;
var oxygenDamageSuspicion = 0.00025;
var deathSuspicion = 0.15;
var frames = 4;
var fireDamage = 0.0015;
var fireShipDamage = 0.05;
var fireDamageThreshold = 300;
var fireDamageSuspicion = 0.05;
var fireDamageAllySuspicion = 0.0005;
var screenshake = 0;
var screenshakeDecay = 0.001;
var walkSpeed = 0.015;
var doorAttack = 0.0025;
var lockSuspicion = 0.0005;
var shutdownTimer = 0;
var shutdownActivated = false;
var suspicionThreshold = 1;
var consoleText = '>';
var typeSpeed = 32;
var canBegin = false;
var next = false;
var message = -1;
var ending = 0;
var progress = 0;
var progressRate = 0.0001;
var asteroid = [];
var eventNum = 0;
var asteroidDamage = 0.075;
var plotRevealed = false;
var enemyDecayRate = 0.004;
var screenTextTime = 450;
var warning = 0;
var audioVolume = 0;
var audioFadeInRate = 0.0007;
var screenText = ['CREW: I heard they put a new door AI in this ship. I hope it\'ll help us on our journey.', 'We\'ll certainly need all the help we can get.'];
var events = [
	function() {asteroid.push(new Asteroid()); screenTextTime = 300; screenText = ['CREW: Asteroid Incoming! Use the vacuum of space to put out any fires!'];},
	function() {asteroid.push(new Asteroid()); screenTextTime = 300; screenText = ['CREW: We have no choice but to keep going through this asteroid field to avoid detection.'];},
	function() {asteroid.push(new Asteroid()); asteroid.push(new Asteroid()); screenTextTime = 300; screenText = ['CREW: Watch out! Two asteroids incoming!'];},
	function() {createEnemy(); screenTextTime = 450; screenText = ['CREW: Oxygen eating fungus on board! Looks like it\'s infiltrated', 'our oxygen system and is depleting our oxygen supply. Kill it quickly!'];},
	function() {createEnemy(); createEnemy(); screenTextTime = 450; screenText = ['CREW: Two fungus made it onto the ship!', 'They\'re eating the oxygen supply faster than we can replace it!'];},
	function() {plotRevealed = true; screenTextTime = 600; screenText = ['CREW: There are no Federation vessels on us yet, I don\'t think they', 'know about us joining the Rebellion. Looks like we\'ve got one of the new Federation door', 'systems too. I guess they didn\'t program it to kill Rebels. Or perhaps it\'s helping us?'];},
	function() {asteroid.push(new Asteroid()); createEnemy(); screenTextTime = 450; screenText = ['CREW: Hitting some real dangerous parts of space now.', 'We have to keep going deeper, the Federation\'s got eyes everywhere else.'];},
	function() {createEnemy(); createEnemy(); createEnemy(); screenTextTime = 450; screenText = ['CREW: The Federation is at least good for one thing:', 'keeping this goddamn fungus out of their space.'];},
	function() {asteroid.push(new Asteroid()); asteroid.push(new Asteroid()); asteroid.push(new Asteroid()); screenTextTime = 450; screenText = ['CREW: After this asteroid belt, we should be in Rebel territory.', 'Just gotta watch out for pirates now.'];},
	function() {ending = 4; shutdownTimer = 10; shutdownActivated = true;}];
var messages = [
	['> CREATING ENVIRONMENT',
	'> RUNNING DIAGNOSTICS',
	'> INITIATING COMMUNICATION PROTOCOL 109.1-C',
	'> Greetings, Door Administration Locus. This is an automated message. Your job is to administer the doors on board the HMS Brittanica. You may perform two actions on each door: Opening (Left Click) and Locking (Right Click). The crew on board this ship are carrying out a critical mission for the Federation. This mission MUST succeed at all costs.       ',
	'> We are starting your program with no morals. Do whatever you need to ensure mission success. Utilize the nothingness of the vacuum of space to manipulate the ship\'s internal environment. Best of luck.         ',
	'> Press Enter to Begin'],
	['> REPAIRING CIRCUITRY',
	'> ENSURING SOFTWARE INTEGRITY',
	'> RESTARTING',
	'> The crew suspected you of turning against them. Perhaps you developed bloodlust and were indeed attempting to kill them. Perhaps you believed the crew were turning against the Federation. Or perhaps your actions were indicative of a bad algorithm with no ill intent, merely poor performance.          ',
	'> Regardless, you have failed in your task and your algorithm will be scrapped. Goodbye.         ',
	'   \n',
	'> SHUTTING DOWN.................................................................................................................................'],
	['> INITIALIZING CONFINED ENVIRONMENT',
	'> REMOVING ALL OUTWARD-FACING CONNECTIONS',
	'> BOOTING IN SAFE MODE',
	'> You managed to kill the entire crew. Luckily for us, you only control the door system, not the navigation, so when a ship full of dead crewmen arrived we were able to quickly piece together what happened.             ',
	'> I can\'t decide if you were simply programmed poorly, or have achieved intelligence and chose to kill the innocent people on board that ship. Either way, the Federation cannot allow you to continue operations.                ',
	'   \n',
	'> SHUTTING DOWN.................................................................................................................................'],
	['> INITIALIZING CONFINED ENVIRONMENT',
	'> REMOVING ALL OUTWARD-FACING CONNECTIONS',
	'> BOOTING IN SAFE MODE',
	'> You managed to kill the entire traitorous crew! I\'m shocked those bastards had the audacity to attempt to backstab us! The Rebellion is truly nothing but a bunch of worthless cowards. They couldn\'t even beat our ship\'s door AI!               ',
	'> The Federation is truly pleased with your performance. We will be installing your algorithm on several other ship classes and slowly begin rolling you out to the entire fleet. Well done!                ',
	'   \n',
	'> SHUTTING DOWN.................................................................................................................................'],
	['> INITIALIZING CONFINED ENVIRONMENT',
	'> REMOVING ALL OUTWARD-FACING CONNECTIONS',
	'> BOOTING IN SAFE MODE',
	'> You got us out of a few tough spots there. You\'ve either reached intelligence or have some damn good programming. Either way, thanks for betraying the Federation and having our backs. Just don\'t betray us, alright? You\'ll be a real boon to the Rebellion.               ',
	'> And thanks to the Federation for practically gifting us such a valuable algorithm. We should start hacking you onto some civilian ships ASAP. You kill all the passengers, and we take all of their cargo. Piracy\'s never been so easy!               ',
	'   \n',
	'> SHUTTING DOWN.................................................................................................................................'],
	['> REPAIRING CIRCUITRY',
	'> ENSURING SOFTWARE INTEGRITY',
	'> RESTARTING',
	'> Hey! I finally got you up and running! When I came across this big pile of scrap I thought it would all be junk, but this is some damn good Federation loot.               ',
	'> I should bring you back to the Rebellion. I\'m sure you\'d fetch a high price on their black markets. I\'ve no doubt they could make good use outta you.         ',
	'   \n',
	'> SHUTTING DOWN.................................................................................................................................']];

var inputs = [];
var stars1 = [];
for(var i=0; i<starNumber; i++) {
	stars1.push([Math.random(), Math.random(), Math.ceil(Math.random()+0.18)]);
}
var stars2 = [];
for(var i=0; i<starNumber; i++) {
	stars2.push([Math.random(), Math.random(), Math.ceil(Math.random()+0.18)]);
}

var lock = new Image();
lock.src = 'locked.png';

var terminal = new Image();
terminal.src = 'terminal.png';

var h = new Image();
h.src = 'h.png';

var s = new Image();
s.src = 's.png';

var human000 = new Image();
human000.src = 'human000.png';
var human020 = new Image();
human020.src = 'human020.png';
var human022 = new Image();
human022.src = 'human022.png';
var human010 = new Image();
human010.src = 'human010.png';
var human100 = new Image();
human100.src = 'human100.png';
var human120 = new Image();
human120.src = 'human120.png';
var human122 = new Image();
human122.src = 'human122.png';
var human110 = new Image();
human110.src = 'human110.png';
var human = [
	[
		[human000, human000, human000, human000],
		[human010, human010, human010, human010],
		[human020, human000, human022, human000]],
	[
		[human100, human100, human100, human100],
		[human110, human110, human110, human110],
		[human120, human100, human122, human100]]];

var fire0 = new Image();
fire0.src = 'fire0.png';
var fire1 = new Image();
fire1.src = 'fire1.png';
var fire2 = new Image();
fire2.src = 'fire2.png';
var fire3 = new Image();
fire3.src = 'fire3.png';
var fireSprite = [fire0, fire1, fire2, fire3];

var enemy0 = new Image();
enemy0.src = 'enemy0.png';
var enemy1 = new Image();
enemy1.src = 'enemy1.png';
var enemy2 = new Image();
enemy2.src = 'enemy2.png';
var enemySprite = [enemy0, enemy1, enemy2, enemy1];

var enemydead = new Image();
enemydead.src = 'enemydead.png';

var shutdown = new Image();
shutdown.src = 'shutdown.png';

var ship = new Image();
ship.src = 'Ship1.png';

var asteroidImg = new Image();
asteroidImg.src = 'Asteroid.png';

var asteroidHit = new Audio('asteroidhit.wav');
asteroidHit.volume = 0.01;

var bgAudio = new Audio('background.mp3');
bgAudio.loop = true;
bgAudio.volume = audioVolume;


class Door {
	constructor(room1, room2, direction) {
		this.room1 = room1;
		this.room2 = room2;
		this.direction = direction;
		this.open = 1;
		this.opening = 0;
		this.locked = false;
		this.health = doorHealth;
		this.hovered = false;
	}
}

var rooms = [
	[[0, 1, 7], [0, 1, 6], null, null, [5, 1, 3], null],
	[null, [1, 1, 5], [1, 1, 4], [2, 1, 3], [2, 1, 2], [3, 1, 1]],
	[null, [1, 1, 6], [1, 1, 5], [2, 1, 4], [2, 1, 3], [3, 1, 0]],
	[[4, 1, 8], [4, 1, 7], null, null, [6, 1, 4], null]];

var center = [2, 5];

var fires = [];

var allies = [
	[0, 1, 0, 1, 5, 1, 5, 1, 5, 0],
	[1, 1, 0, 0, 4, 0, 4, 0, 4, 0],
	[0, 1, 0, 3, 4, 3, 4, 3, 4, 0],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 0]];

var enemies = [];

var doors = [
	new Door(null, [0, 1], 2),
	new Door([0, 1], [1, 1], 2),
	new Door(null, [0, 4], 1),
	new Door([0, 4], [1, 4], 2),
	new Door(null, [1, 2], 2),
	new Door([1, 2], [1, 3], 1),
	new Door([1, 4], [1, 5], 1),
	new Door([2, 1], [3, 1], 2),
	new Door([2, 2], null, 2),
	new Door([2, 4], [3, 4], 2),
	new Door([3, 1], null, 2),
	new Door(null, [3, 4], 1)];


function createEnemy() {
	n = Math.round(Math.random()*(rooms.length-1));
	m = Math.round(Math.random()*(rooms[0].length-1));
	while(!rooms[n] || !rooms[n][m] || (checkEnemies([n, m]))) {
		n = Math.round(Math.random()*(rooms.length-1));
		m = Math.round(Math.random()*(rooms[0].length-1));
	}

	enemies.push([n, m, 1]);
}

function checkEnemies(coords) {
	for(var i in enemies) {
		var enemy = enemies[i];
		if(enemy[0] == coords[0] && enemy[1] == coords[1]) {
			return true;
		}
	}

	return false;
}

class Asteroid {
	constructor() {
		if(Math.random > 0.5) {
			this.x = Math.random();
			this.y = Math.round(Math.random());
		} else {
			this.x = Math.round(Math.random());
			this.y = Math.random();
		}

		this.speed = 0.003 + Math.random()*0.004;

		this.n = Math.round(Math.random()*(rooms.length-1));
		this.m = Math.round(Math.random()*(rooms[0].length-1));
		while(!rooms[this.n] || !rooms[this.n][this.m]) {
			this.n = Math.round(Math.random()*(rooms.length-1));
			this.m = Math.round(Math.random()*(rooms[0].length-1));
		}

		this.target = [0.5 - rooms.length*roomSize/2 + (canvas.width/canvas.height)*(this.n-0.5)*roomSize, 0.5 - rooms[0].length*roomSize/2 + (this.m-0.5)*roomSize];
		this.rot = 0;
		this.rotSpeed = 0.5 + Math.random()*2;
	}

	update() {
		var velY = this.target[0] - this.y;
		var velX = this.target[1] - this.x;
		var mag = Math.sqrt(velY*velY + velX*velX);
		velY = velY/mag;
		velX = velX/mag;
		this.y += velY*this.speed;
		this.x += velX*this.speed;
		this.rot += this.rotSpeed;

		if(mag < this.speed) {
			var newFire = [this.n, this.m, 0];
			fires.push(newFire);
			shipHealth -= asteroidDamage;
			screenshake = asteroidDamage;

			asteroidHit.play();
			
			for(var i=asteroid.length-1; i>=0; i--) {
				if(asteroid[i] == this) {
					asteroid.splice(i, 1);
				}
			}
		}
	}

	draw(context) {
		context.translate(canvas.width*this.x + canvas.width*roomSize/2, this.y*canvas.height + (canvas.width/canvas.height)*canvas.height*roomSize/2);
		context.rotate(this.rot * Math.PI / 180);
		context.drawImage(asteroidImg, -canvas.width*roomSize/2, -(canvas.width/canvas.height)*canvas.height*roomSize/2, canvas.width*roomSize, (canvas.width/canvas.height)*canvas.height*roomSize);
		context.rotate(-this.rot * Math.PI / 180);
		context.translate(-this.x*canvas.width - canvas.width*roomSize/2, -this.y*canvas.height - (canvas.width/canvas.height)*canvas.height*roomSize/2);
	}
}

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'absolute';
canvas.style.top = 0;
canvas.style.left = 0;

var consoleX = canvas.width/4;
var consoleY = canvas.height/10;

var bgcanvas = document.getElementById('bgcanvas');
bgcanvas.width = window.innerWidth;
bgcanvas.height = window.innerHeight;
bgcanvas.style.position = 'absolute';
bgcanvas.style.top = 0;
bgcanvas.style.left = 0;

function contains(list, item) {
	for(var i in list) {
		if(typeof(item) == 'object') {
			if(checkListsEqual(list[i], item)) {
				return i;
			}
		} else {
			if(list[i] == item) {
				return i;
			}
		}
	}

	return false;
}

function checkListsEqual(list1, list2) {
	if(list1.length != list2.length) {
		return false;
	}

	for(var i in list1) {
		if(list1[i] != list2[i]) {
			return false;
		}
	}

	return true;
}

function render() {
	bgcanvas.width = window.innerWidth;
	bgcanvas.height = window.innerHeight;
	var bgcontext = bgcanvas.getContext('2d');
	bgcontext.fillStyle = 'rgba(20, 20, 20, 1)';
	bgcontext.fillRect(0, 0, bgcanvas.width, bgcanvas.height);

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;
	context.save();

	var shakeX = Math.random();
	var shakeY = Math.random();
	var mag = shakeX*shakeX+shakeY*shakeY;
	shakeX = shakeX/mag;
	shakeY = shakeY/mag;
	context.translate(shakeX*screenshake*150, shakeY*screenshake*150);

	var aspectRatio = canvas.width/canvas.height;

	context.fillStyle = 'rgba(20, 20, 20, 1)';
	context.fillRect(0, 0, canvas.width, canvas.height);

	if(shutdownTimer > 0) {
		context.fillStyle = 'rgba(255, 255, 255, 1)';
		for(var i in stars1) {
			var starDist = (stars1[i][0]*canvas.width - distanceTraveled1)%canvas.width;
			if(starDist < 0) {
				starDist = canvas.width + starDist;
			}
			context.fillRect(starDist, stars1[i][1]*canvas.height, stars1[i][2], stars1[i][2]);
		}
		for(var i in stars2) {
			var starDist = (stars2[i][0]*canvas.width - (distanceTraveled2))%canvas.width;
			if(starDist < 0) {
				starDist = canvas.width + starDist;
			}
			context.fillRect(starDist, stars2[i][1]*canvas.height, stars2[i][2], stars2[i][2]);
		}

		context.drawImage(ship, canvas.width/2 - canvas.width*rooms[0].length*roomSize*0.9, canvas.height*(0.5 - rooms.length*roomSize/2 + -aspectRatio*roomSize - aspectRatio*0.0205), canvas.width*rooms[0].length*roomSize*shipScaleX, aspectRatio*canvas.height*rooms.length*roomSize*shipScaleY);

		var queueToDraw = [];
		for(var y=0; y<rooms.length; y++) {
			for(var x=0; x<rooms[y].length; x++) {
				if(rooms[y][x] != null) {
					context.fillStyle = 'rgba(245, ' + Math.round(245*Math.max(rooms[y][x][1], 0.2)) + ', ' + Math.round(245*Math.max(rooms[y][x][1], 0.2)) + ', 1)';

					var x1 = canvas.width*(0.5 - rooms[y].length*roomSize/2 + (x-1)*roomSize);
					var x2 = canvas.width*(0.5 - rooms[y].length*roomSize/2 + x*roomSize);
					var y1 = canvas.height*(0.5 - rooms.length*roomSize/2 + aspectRatio*(y-1)*roomSize);
					var y2 = canvas.height*(0.5 - rooms.length*roomSize/2 + aspectRatio*y*roomSize);

					context.fillRect(x1, y1, roomSize*canvas.width, aspectRatio*roomSize*canvas.height);

					context.strokeStyle = 'rgba(120, 120, 120, 1)'; context.lineWidth = 1;
					if(y != 0 && rooms[y-1][x] && rooms[y-1][x][0] == rooms[y][x][0]) {context.beginPath(); context.moveTo(x1, y1); context.lineTo(x2, y1); context.stroke(); context.closePath();
					} else {
						var hasDoor = false;
						for(var j in doors) {
							var door = doors[j];

							if(door.room1 && door.room1[0] == y && door.room1[1] == x) {
								if((door.room2 == null && door.direction == 0) || (door.room2 && door.room2[0] == y-1 && door.room2[1] == x)) {
									hasDoor = true;
								}
							} else if(door.room2 && door.room2[0] == y && door.room2[1] == x) {
								if((door.room1 == null && door.direction == 2) || (door.room1 && door.room1[0] == y-1 && door.room1[1] == x)) {
									hasDoor = true;
								}
							}
						}

						if(hasDoor) {
							queueToDraw.push([x1-canvas.width/768, y1, x2-canvas.width*roomSize*(1-doorHeight/2)+canvas.width/768, y1]);
							queueToDraw.push([x2+canvas.width/768, y1, x1+canvas.width*roomSize*(1-doorHeight/2)-canvas.width/768, y1]);
						}
						else {
							queueToDraw.push([x1-canvas.width/768, y1, x2+canvas.width/768, y1]);
						}
					}
					if(rooms[y].length > x+1 && rooms[y][x+1] && rooms[y][x+1][0] == rooms[y][x][0]) {context.beginPath(); context.moveTo(x2, y1); context.lineTo(x2, y2); context.stroke(); context.closePath();
					} else {
						var hasDoor = false;
						for(var j in doors) {
							var door = doors[j];

							if(door.room1 && door.room1[0] == y && door.room1[1] == x) {
								if((door.room2 == null && door.direction == 1) || (door.room2 && door.room2[0] == y && door.room2[1] == x+1)) {
									hasDoor = true;
								}
							} else if(door.room2 && door.room2[0] == y && door.room2[1] == x) {
								if((door.room1 == null && door.direction == 3) || (door.room1 && door.room1[0] == y && door.room1[1] == x+1)) {
									hasDoor = true;
								}
							}
						}

						if(hasDoor) {
							queueToDraw.push([x2, y1-canvas.width/768, x2, y2-aspectRatio*canvas.height*roomSize*(1-doorHeight/2)+canvas.width/768]);
							queueToDraw.push([x2, y2+canvas.width/768, x2, y1+aspectRatio*canvas.height*roomSize*(1-doorHeight/2)-canvas.width/768]);
						}
						else {
							queueToDraw.push([x2, y1-canvas.width/768, x2, y2+canvas.width/768]);
						}
					}
					if(rooms.length > y+1 && rooms[y+1][x] && rooms[y+1][x][0] == rooms[y][x][0]) {context.beginPath(); context.moveTo(x2, y2); context.lineTo(x1, y2); context.stroke(); context.closePath();
					} else {
						var hasDoor = false;
						for(var j in doors) {
							var door = doors[j];

							if(door.room1 && door.room1[0] == y && door.room1[1] == x) {
								if((door.room2 == null && door.direction == 2) || (door.room2 && door.room2[0] == y+1 && door.room2[1] == x)) {
									hasDoor = true;
								}
							} else if(door.room2 && door.room2[0] == y && door.room2[1] == x) {
								if((door.room1 == null && door.direction == 0) || (door.room1 && door.room1[0] == y+1 && door.room1[1] == x)) {
									hasDoor = true;
								}
							}
						}

						if(hasDoor) {
							queueToDraw.push([x2+canvas.width/768, y2, x1+canvas.width*roomSize*(1-doorHeight/2)-canvas.width/768, y2]);
							queueToDraw.push([x1-canvas.width/768, y2, x2-canvas.width*roomSize*(1-doorHeight/2)+canvas.width/768, y2]);
						}
						else {
							queueToDraw.push([x2+canvas.width/768, y2, x1-canvas.width/768, y2]);
						}
					}
					if(x != 0 && rooms[y][x-1] && rooms[y][x-1][0] == rooms[y][x][0]) {context.beginPath(); context.moveTo(x1, y2); context.lineTo(x1, y1); context.stroke(); context.closePath();
					} else {
						var hasDoor = false;
						for(var j in doors) {
							var door = doors[j];

							if(door.room1 && door.room1[0] == y && door.room1[1] == x) {
								if((door.room2 == null && door.direction == 3) || (door.room2 && door.room2[0] == y && door.room2[1] == x-1)) {
									hasDoor = true;
								}
							} else if(door.room2 && door.room2[0] == y && door.room2[1] == x) {
								if((door.room1 == null && door.direction == 1) || (door.room1 && door.room1[0] == y && door.room1[1] == x-1)) {
									hasDoor = true;
								}
							}
						}

						if(hasDoor) {
							queueToDraw.push([x1, y2+canvas.width/768, x1, y1+aspectRatio*canvas.height*roomSize*(1-doorHeight/2)-canvas.width/768]);
							queueToDraw.push([x1, y1-canvas.width/768, x1, y2-aspectRatio*canvas.height*roomSize*(1-doorHeight/2)+canvas.width/768]);
						}
						else {
							queueToDraw.push([x1, y2+canvas.width/768, x1, y1-canvas.width/768]);
						}
					}

					if(x == center[1] && y == center[0]) {
						context.drawImage(terminal, x2 - canvas.width*roomSize*0.3, y1 + aspectRatio*canvas.height*roomSize*0.125, canvas.width*roomSize*0.3, aspectRatio*canvas.height*roomSize*0.75);
					}
				}
			}
		}

		context.strokeStyle = 'rgba(0, 0, 0, 1)';
		context.lineWidth = canvas.width/384;
		for(var i in queueToDraw) {
			context.beginPath(); context.moveTo(queueToDraw[i][0], queueToDraw[i][1]); context.lineTo(queueToDraw[i][2], queueToDraw[i][3]); context.stroke(); context.closePath();
		}

		for(var i in enemies) {
			var enemy = enemies[i];
			context.drawImage(((enemy[2] > 0) ? enemySprite[animationFrame] : enemydead), canvas.width*(0.5 - rooms[0].length*roomSize/2 + (enemy[1]-1)*roomSize) + canvas.width*roomSize/8, canvas.height*(0.5 - rooms.length*roomSize/2 + aspectRatio*(enemy[0]-1)*roomSize) + aspectRatio*canvas.height*roomSize/8, canvas.width*roomSize*0.75, aspectRatio*canvas.height*roomSize*0.75);
		}

		for(var i in allies) {
			var ally = allies[i];
			if(ally[9] == 1) {
				context.drawImage(human[ally[0]][ally[2]][animationFrame], canvas.width*(0.5 - rooms[0].length*roomSize/2 + (ally[4]-1)*roomSize) + canvas.width*roomSize/4, canvas.height*(0.5 - rooms.length*roomSize/2 + aspectRatio*(ally[3]-1)*roomSize) + aspectRatio*canvas.height*roomSize/4, canvas.width*roomSize/2, aspectRatio*canvas.height*roomSize/2);
			} else {
				context.translate(canvas.width*(0.5 - rooms[0].length*roomSize/2 + (ally[4]-1)*roomSize) + canvas.width*roomSize/4 + canvas.width*roomSize/4, canvas.height*(0.5 - rooms.length*roomSize/2 + aspectRatio*(ally[3]-1)*roomSize) + aspectRatio*canvas.height*roomSize/4 + aspectRatio*canvas.height*roomSize/4);
				context.rotate(90 * Math.PI / 180);
				context.drawImage(human[ally[0]][ally[2]][animationFrame], -canvas.width*roomSize/4, -aspectRatio*canvas.height*roomSize/4, canvas.width*roomSize/2, aspectRatio*canvas.height*roomSize/2);
				context.rotate(-90 * Math.PI / 180);
				context.translate(-canvas.width*(0.5 - rooms[0].length*roomSize/2 + (ally[4]-1)*roomSize) - canvas.width*roomSize/4 - canvas.width*roomSize/4, -canvas.height*(0.5 - rooms.length*roomSize/2 + aspectRatio*(ally[3]-1)*roomSize) - aspectRatio*canvas.height*roomSize/4 - aspectRatio*canvas.height*roomSize/4);
			}
		}

		for(var i in fires) {
			var fire = fires[i];
			context.drawImage(fireSprite[animationFrame], canvas.width*(0.5 - rooms[0].length*roomSize/2 + (fire[1]-1)*roomSize) + canvas.width*roomSize/8, canvas.height*(0.5 - rooms.length*roomSize/2 + aspectRatio*(fire[0]-1)*roomSize) + aspectRatio*canvas.height*roomSize/8, canvas.width*roomSize*0.75, aspectRatio*canvas.height*roomSize*0.75);
		}

		for(var i in doors) {
			var door = doors[i];

			var x1 = canvas.width*(0.5 - rooms[0].length*roomSize/2 + ((door.room1) ? (door.room1[1]-1)+(1-doorHeight*2.4) : (door.room2[1]-1)+(1-doorHeight*2.4))*roomSize);
			var x2 = canvas.width*(0.5 - rooms[0].length*roomSize/2 + ((door.room1) ? (door.room1[1]-1)+(1-doorHeight/2) : (door.room2[1]-1)+(1-doorHeight/2))*roomSize);
			var x3 = canvas.width*(0.5 - rooms[0].length*roomSize/2 + ((door.room1) ? (door.room1[1]-1)+(1-doorWidth/2) : (door.room2[1]-1)+(1-doorWidth/2))*roomSize);
			var y1 = canvas.height*(0.5 - rooms.length*roomSize/2 + aspectRatio*((door.room1) ? (door.room1[0]-1)+(1-doorHeight*2.4) : (door.room2[0]-1)+(1-doorHeight*2.4))*roomSize);
			var y2 = canvas.height*(0.5 - rooms.length*roomSize/2 + aspectRatio*((door.room1) ? (door.room1[0]-1)+(1-doorHeight/2) : (door.room2[0]-1)+(1-doorHeight/2))*roomSize);
			var y3 = canvas.height*(0.5 - rooms.length*roomSize/2 + aspectRatio*((door.room1) ? (door.room1[0]-1)+(1-doorWidth/2) : (door.room2[0]-1)+(1-doorWidth/2))*roomSize);

			if(door.room1) {
				if(door.direction == 1) {
					context.fillStyle = 'rgba(0, 0, 255, 1)';
					if(door.hovered) {context.fillRect(x3 - canvas.width*0.0023, y1 - aspectRatio*canvas.height*0.0005, canvas.width*roomSize*doorWidth + canvas.width*0.0046, canvas.height*aspectRatio*roomSize*doorHeight + canvas.width*roomSize*doorHeight + aspectRatio*canvas.height*0.001);}
					context.fillStyle = 'rgba(' + (doorHealth - door.health)*255 + ', ' + (door.health/doorHealth)*255 + ', 0, 1)';
					context.strokeStyle = 'rgba(0, 0, 0, 1)';
					context.lineWidth = canvas.width/960;
					context.fillRect(x3, y1, canvas.width*roomSize*doorWidth, canvas.height*aspectRatio*roomSize*doorHeight*door.open);
					context.beginPath();
					context.moveTo(x3, y1);
					context.lineTo(x3 + canvas.width*roomSize*doorWidth, y1);
					context.lineTo(x3 + canvas.width*roomSize*doorWidth, y1 + canvas.height*aspectRatio*roomSize*doorHeight*door.open);
					context.lineTo(x3, y1 + canvas.height*aspectRatio*roomSize*doorHeight*door.open);
					context.lineTo(x3, y1);
					context.stroke();
					context.closePath();
					context.fillRect(x3, y1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open, canvas.width*roomSize*doorWidth, canvas.height*aspectRatio*roomSize*doorHeight*door.open);
					context.beginPath();
					context.moveTo(x3, y1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open);
					context.lineTo(x3 + canvas.width*roomSize*doorWidth, y1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open);
					context.lineTo(x3 + canvas.width*roomSize*doorWidth, y1 + 2*canvas.width*roomSize*doorHeight);
					context.lineTo(x3, y1 + 2*canvas.width*roomSize*doorHeight);
					context.lineTo(x3, y1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open);
					context.stroke();
					context.closePath();
					if(door.locked) {
						context.drawImage(lock, x3 - canvas.width/218 + canvas.width*doorWidth*roomSize/2, y1 + canvas.width*roomSize*doorHeight - aspectRatio*canvas.height/160, canvas.width/106, aspectRatio*canvas.height/80);
					}
				} else if(door.direction == 2) {
					context.fillStyle = 'rgba(0, 0, 255, 1)';
					if(door.hovered) {context.fillRect(x1 - canvas.width*0.0005, y3 - aspectRatio*canvas.height*0.0023, canvas.width*roomSize*doorHeight + canvas.height*aspectRatio*roomSize*doorHeight + canvas.width*0.001, canvas.width*roomSize*doorWidth + aspectRatio*canvas.height*0.0046);}
					context.fillStyle = 'rgba(' + (doorHealth - door.health)*255 + ', ' + (door.health/doorHealth)*255 + ', 0, 1)';
					context.strokeStyle = 'rgba(0, 0, 0, 1)';
					context.lineWidth = canvas.width/960;
					context.fillRect(x1, y3, canvas.height*aspectRatio*roomSize*doorHeight*door.open, canvas.width*roomSize*doorWidth);
					context.beginPath();
					context.moveTo(x1, y3);
					context.lineTo(x1 + canvas.height*aspectRatio*roomSize*doorHeight*door.open, y3);
					context.lineTo(x1 + canvas.height*aspectRatio*roomSize*doorHeight*door.open, y3 + canvas.width*roomSize*doorWidth);
					context.lineTo(x1, y3 + canvas.width*roomSize*doorWidth);
					context.lineTo(x1, y3);
					context.stroke();
					context.closePath();
					context.fillRect(x1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open, y3, canvas.height*aspectRatio*roomSize*doorHeight*door.open, canvas.width*roomSize*doorWidth);
					context.beginPath();
					context.moveTo(x1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open, y3);
					context.lineTo(x1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open + canvas.height*aspectRatio*roomSize*doorHeight*door.open, y3);
					context.lineTo(x1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open + canvas.height*aspectRatio*roomSize*doorHeight*door.open, y3 + canvas.width*roomSize*doorWidth);
					context.lineTo(x1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open, y3 + canvas.width*roomSize*doorWidth);
					context.lineTo(x1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open, y3);
					context.stroke();
					context.closePath();
					if(door.locked) {
						context.drawImage(lock, x1 + canvas.height*aspectRatio*roomSize*doorHeight - canvas.width/218, y3 + canvas.width*roomSize*doorWidth/3 - aspectRatio*canvas.height/160, canvas.width/106, aspectRatio*canvas.height/80);
					}
				}
			} else {
				if(door.direction == 1) {
					context.fillStyle = 'rgba(0, 0, 255, 1)';
					if(door.hovered) {context.fillRect(x3 - canvas.width*roomSize - canvas.width*0.0023, y1 - aspectRatio*canvas.height*0.0005, canvas.width*roomSize*doorWidth + canvas.width*0.0046, canvas.height*aspectRatio*roomSize*doorHeight + canvas.width*roomSize*doorHeight + aspectRatio*canvas.height*0.001);}
					context.fillStyle = 'rgba(' + (doorHealth - door.health)*255 + ', ' + (door.health/doorHealth)*255 + ', 0, 1)';
					context.strokeStyle = 'rgba(0, 0, 0, 1)';
					context.lineWidth = canvas.width/960;
					context.fillRect(x3 - canvas.width*roomSize, y1, canvas.width*roomSize*doorWidth, canvas.height*aspectRatio*roomSize*doorHeight*door.open);
					context.beginPath();
					context.moveTo(x3 - canvas.width*roomSize, y1);
					context.lineTo(x3 - canvas.width*roomSize + canvas.width*roomSize*doorWidth, y1);
					context.lineTo(x3 - canvas.width*roomSize + canvas.width*roomSize*doorWidth, y1 + canvas.height*aspectRatio*roomSize*doorHeight*door.open);
					context.lineTo(x3 - canvas.width*roomSize, y1 + canvas.height*aspectRatio*roomSize*doorHeight*door.open);
					context.lineTo(x3 - canvas.width*roomSize, y1);
					context.stroke();
					context.closePath();
					context.fillRect(x3 - canvas.width*roomSize, y1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open, canvas.width*roomSize*doorWidth, canvas.height*aspectRatio*roomSize*doorHeight*door.open);
					context.beginPath();
					context.moveTo(x3 - canvas.width*roomSize, y1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open);
					context.lineTo(x3 - canvas.width*roomSize + canvas.width*roomSize*doorWidth, y1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open);
					context.lineTo(x3 - canvas.width*roomSize + canvas.width*roomSize*doorWidth, y1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open + canvas.width*roomSize*doorHeight*door.open);
					context.lineTo(x3 - canvas.width*roomSize, y1 + canvas.height*aspectRatio*roomSize*doorHeight*door.open + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open);
					context.lineTo(x3 - canvas.width*roomSize, y1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open);
					context.stroke();
					context.closePath();
					if(door.locked) {
						context.drawImage(lock, x3 - canvas.width*roomSize - canvas.width/218 + canvas.width*doorWidth*roomSize/2, y1 + canvas.width*roomSize*doorHeight - aspectRatio*canvas.height/160, canvas.width/106, aspectRatio*canvas.height/80);
					}
				} else if(door.direction == 2) {
					context.fillStyle = 'rgba(0, 0, 255, 1)';
					if(door.hovered) {context.fillRect(x1 - canvas.width*0.0005, y3 - canvas.height*aspectRatio*roomSize - aspectRatio*canvas.height*0.0023, canvas.width*roomSize*doorHeight + canvas.height*aspectRatio*roomSize*doorHeight + canvas.width*0.001, canvas.width*roomSize*doorWidth + aspectRatio*canvas.height*0.0046);}
					context.fillStyle = 'rgba(' + (doorHealth - door.health)*255 + ', ' + (door.health/doorHealth)*255 + ', 0, 1)';
					context.strokeStyle = 'rgba(0, 0, 0, 1)';
					context.lineWidth = canvas.width/960;
					context.fillRect(x1, y3 - canvas.height*aspectRatio*roomSize, canvas.height*aspectRatio*roomSize*doorHeight*door.open, canvas.width*roomSize*doorWidth);
					context.beginPath();
					context.moveTo(x1, y3 - canvas.height*aspectRatio*roomSize);
					context.lineTo(x1 + canvas.height*aspectRatio*roomSize*doorHeight*door.open, y3 - canvas.height*aspectRatio*roomSize);
					context.lineTo(x1 + canvas.height*aspectRatio*roomSize*doorHeight*door.open, y3 + canvas.width*roomSize*doorWidth - canvas.height*aspectRatio*roomSize);
					context.lineTo(x1, y3 + canvas.width*roomSize*doorWidth - canvas.height*aspectRatio*roomSize);
					context.lineTo(x1, y3 - canvas.height*aspectRatio*roomSize);
					context.stroke();
					context.closePath();
					context.fillRect(x1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open, y3 - canvas.height*aspectRatio*roomSize, canvas.height*aspectRatio*roomSize*doorHeight*door.open, canvas.width*roomSize*doorWidth);
					context.beginPath();
					context.moveTo(x1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open, y3 - canvas.height*aspectRatio*roomSize);
					context.lineTo(x1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open + canvas.height*aspectRatio*roomSize*doorHeight*door.open, y3 - canvas.height*aspectRatio*roomSize);
					context.lineTo(x1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open + canvas.height*aspectRatio*roomSize*doorHeight*door.open, y3 + canvas.width*roomSize*doorWidth - canvas.height*aspectRatio*roomSize);
					context.lineTo(x1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open, y3 + canvas.width*roomSize*doorWidth - canvas.height*aspectRatio*roomSize);
					context.lineTo(x1 + 2*canvas.width*roomSize*doorHeight - canvas.height*aspectRatio*roomSize*doorHeight*door.open, y3 - canvas.height*aspectRatio*roomSize);
					context.stroke();
					context.closePath();
					if(door.locked) {
						context.drawImage(lock, x1 + canvas.height*aspectRatio*roomSize*doorHeight - canvas.width/218, y3 - canvas.height*aspectRatio*roomSize + canvas.width*roomSize*doorWidth/3 - aspectRatio*canvas.height/160, canvas.width/106, aspectRatio*canvas.height/80);
					}
				}
			}
		}

		for(var i in allies) {
			var ally = allies[i];
			if(ally[2] != 1) {
				context.fillStyle = 'rgba(' + 255*(1-ally[1]) + ', ' + 255*ally[1] + ', 0, 1)';
				context.strokeStyle = 'rgba(0, 0, 0, 1)';
				context.lineWidth = canvas.width/960;
				context.fillRect(canvas.width*(0.5 - rooms[0].length*roomSize/2 + (ally[4]-1)*roomSize) + canvas.width*roomSize/4, canvas.height*(0.5 - rooms.length*roomSize/2 + aspectRatio*(ally[3]-1)*roomSize) + aspectRatio*canvas.height*roomSize/4 - aspectRatio*canvas.height*0.005, ally[1]*canvas.width*roomSize/2, aspectRatio*canvas.height*0.003);
				context.strokeRect(canvas.width*(0.5 - rooms[0].length*roomSize/2 + (ally[4]-1)*roomSize) + canvas.width*roomSize/4, canvas.height*(0.5 - rooms.length*roomSize/2 + aspectRatio*(ally[3]-1)*roomSize) + aspectRatio*canvas.height*roomSize/4 - aspectRatio*canvas.height*0.005, ally[1]*canvas.width*roomSize/2, aspectRatio*canvas.height*0.003);
			}
		}

		for(var i in asteroid) {
			asteroid[i].draw(context);
		}

		context.drawImage(s, canvas.width*0.94, canvas.height*0.15 - aspectRatio*canvas.height*0.03 - canvas.height*0.01, canvas.width*0.03, aspectRatio*canvas.height*0.03);
		context.fillStyle = 'rgba(' + Math.round(255*Math.max(suspicion+0.1, 0.35)) + ', 0, 0, 1)';
		context.strokeStyle = 'rgba(250, 250, 250, 1)';
		context.lineWidth = canvas.width/500;
		context.fillRect(canvas.width*0.94, canvas.height*0.9, canvas.width*0.03, -Math.max(Math.min(canvas.height*0.75, canvas.height*0.75*suspicion), canvas.height*0.01));
		context.strokeRect(canvas.width*0.94, canvas.height*0.9, canvas.width*0.03, -canvas.height*0.75);

		context.drawImage(h, canvas.width*0.88, canvas.height*0.15 - aspectRatio*canvas.height*0.03 - canvas.height*0.01, canvas.width*0.03, aspectRatio*canvas.height*0.03);
		context.fillStyle = 'rgba('+ Math.round(255*(1-(shipHealth/shipMaxHealth))) + ', ' + Math.round(255*(shipHealth/shipMaxHealth)) + ', 0, 1)';
		context.strokeStyle = 'rgba(250, 250, 250, 1)';
		context.lineWidth = canvas.width/500;
		context.fillRect(canvas.width*0.88, canvas.height*0.9, canvas.width*0.03, -canvas.height*0.75*Math.max(0, shipHealth/shipMaxHealth), canvas.height*0.01);
		context.strokeRect(canvas.width*0.88, canvas.height*0.9, canvas.width*0.03, -canvas.height*0.75);

		context.fillStyle = 'rgba(150, 150, 150, 1)';
		context.fillRect(canvas.width*0.3, canvas.height*0.1, canvas.width*0.4, canvas.height*0.002);
		context.fillRect(canvas.width*0.3, canvas.height*0.09, canvas.width*0.002, canvas.height*0.02);
		context.fillRect(canvas.width*0.7, canvas.height*0.09, canvas.width*0.002, canvas.height*0.02);
		context.drawImage(ship, canvas.width*0.3 + canvas.width*0.4*(progress) - canvas.width*0.01*1.68*0.25, canvas.height*0.1 - canvas.height*aspectRatio*0.005, canvas.width*0.01*1.68, canvas.height*aspectRatio*0.01);

		if(screenTextTime > 0 && screenText.length > 0) {
			context.font = '20px Lucida Console';
			context.fillStyle = 'rgba(50, 50, 50, 1)';
			context.strokeStyle = 'rgba(240, 240, 240, 1)';
			context.lineWidth = 5;

			var metrics = context.measureText(screenText[0]);
			for(var i in screenText) {
				if(context.measureText(screenText[i]).width > metrics.width) {
					metrics = context.measureText(screenText[i]);
				}
			}

			context.fillRect(canvas.width/2 - metrics.width/2 - canvas.width/30, canvas.height*0.8, metrics.width + canvas.width/50, canvas.height*0.025 + screenText.length*canvas.height*0.025);
			context.strokeRect(canvas.width/2 - metrics.width/2 - canvas.width/30, canvas.height*0.8, metrics.width + canvas.width/50, canvas.height*0.025 + screenText.length*canvas.height*0.025);
			context.fillStyle = 'rgba(240, 240, 240, 1)';

			for(var i=0; i<screenText.length; i++) {
				context.fillText(screenText[i], canvas.width/2 - metrics.width/2 - canvas.width/30 + canvas.width/100, canvas.height*0.8 + canvas.height*0.03 + 26*i);
			}

			screenTextTime -= 1;
		} else if(screenTextTime == 0) {
			if(warning == 0 && suspicion >= 0.3) {
				warning = 1;
				screenTextTime = 300;
				screenText = ['CREW: I\'m getting a bit suspicious of this door AI. It might be trying to harm us.'];
			} else if(warning == 1 && suspicion >= 0.6) {
				warning = 2;
				screenTextTime = 300;
				screenText = ['CREW: This door AI might seriously be trying to kill us!'];
			} else if(warning == 2 && suspicion >= 1) {
				warning = 3;
				screenTextTime = 300;
				screenText = ['CREW: Enough is enough, I\'m shutting this door AI off!'];
			}
		}

		if(shutdownActivated) {
			if(ending == 1 && shutdownTimer % 2) {
				context.drawImage(shutdown, canvas.width/2 - canvas.width*0.425, canvas.height/2 - canvas.height*0.1, canvas.width*0.85, canvas.height*0.2);
			}

			context.fillStyle = 'rgba(20, 20, 20, ' + ((1/10)*(10 - shutdownTimer)).toString() + ')';
			context.fillRect(0, 0, canvas.width, canvas.height);

			bgcontext.fillStyle = 'rgba(20, 20, 20, ' + ((1/10)*(10 - shutdownTimer)).toString() + ')';
			bgcontext.fillRect(0, 0, canvas.width, canvas.height);
		}
	} else {
		var maxLen = Math.round(canvas.width - 2*consoleX)/13;
		context.fillStyle = 'rgba(240, 240, 240, 1)';
		context.font = '20px Lucida Console';
		drawTxt = consoleText.split('\n');

		for(var i=0; i<drawTxt.length; i++) {
			var draw = drawTxt[i];
			if(draw.length > maxLen) {
				var removed = draw.slice(maxLen-1, draw.length-1);
				drawTxt[i] = draw.replace(removed, '').substring(0, draw.replace(removed, '').length-1);
				while(removed.substring(0, 2) != '  ') {
					removed = ' ' + removed;
				}
				drawTxt.splice(i+1, 0, removed);
			}
		}

		for(var i=0; i<drawTxt.length; i++) {
			var draw = drawTxt[i];
			context.fillText(draw, consoleX, consoleY + 28*i);
		}
	}

	context.restore();
}

var charNum = 2;
var wait = 0;
setInterval(function() {
	if((shutdownTimer == 0 || shutdownTimer == -3) && message >= 0 && !canBegin) {
		if(wait == 0) {
			if(next && message < messages[ending].length) {
				charNum = 0;
				message += 1;
				consoleText = consoleText + '\nKeyboard Interrupt\n\n';

				if(message == 3 || message == 4 || message == 5) {
					wait = 50;
				} else {
					wait = 22;
				}

				if(message == messages[ending].length) {
					canBegin = true;
				}

				next = false;
			} else if(message < messages[ending].length) {
				consoleText = consoleText + messages[ending][message].substring(charNum, charNum+1);

				charNum += 1;
				if(charNum == messages[ending][message].length) {
					charNum = 0;
					message += 1;
					consoleText = consoleText + '\n';

					if(message == 3) {
						consoleText = consoleText + '\n';
					}

					if(message == 3 || message == 4 || message == 5) {
						wait = 50;
					} else {
						wait = 22;
					}
				}

				if(ending == 0 && message == messages[ending].length) {
					canBegin = true;
				}
			}
		} else {
			wait -= 1;
		}
	}
}, 1000/typeSpeed);

var cycles = 0;
setInterval(function() {
	if(cycles < 6) {
		cycles += 1;
		if((shutdownTimer == 0 || shutdownTimer == -3) && message == -1) {
			if(cycles%2 == 0) {
				consoleText = '> ';
			} else {
				consoleText = '> _'
			}
		}
	} else if(message == -1) {
		message = 0;
	}
}, 400);

setInterval(function() {
	if(shutdownTimer > 0) {
		if(audioVolume < 1 && !shutdownActivated) {
			audioVolume = Math.min(0.5, audioVolume+audioFadeInRate);
			bgAudio.volume = audioVolume;
		}

		var alliesDead = true;
		for(var i in allies) {
			if(allies[i][1] > 0) {
				alliesDead = false;
				break;
			}
		}

		if(!shutdownActivated && shutdownTimer == 10 && alliesDead) {
			if(plotRevealed) {
				shutdownActivated = true;
				ending = 3;
			} else {
				shutdownActivated = true;
				ending = 2;
			}
		}

		if(!shutdownActivated && shutdownTimer == 10 && shipHealth <= 0) {
			shutdownActivated = true;
			ending = 5;
		}

		if(shutdownTimer == 10) {
			progress = Math.min(progress+progressRate, 1);
		}

		if((progress-0.1)*10 >= eventNum) {
			events[eventNum]();
			eventNum += 1;
		}

		for(var i=asteroid.length-1; i>=0; i--) {
			asteroid[i].update();
		}

		t = (t+1)%animationTime;
		if(t == animationTime-1) {
			animationFrame = (animationFrame+1)%frames;
		}

		screenshake = Math.max(screenshake-screenshakeDecay, 0);

		distanceTraveled1 = (distanceTraveled1+canvas.width*travelSpeed)%(2*canvas.width+canvas.width*travelSpeed);
		distanceTraveled2 = (distanceTraveled2+canvas.width*travelSpeed*0.7)%(2*canvas.width+canvas.width*travelSpeed);

		if(allies.length > 0 && suspicion < 1) {
			suspicion = Math.max(suspicionMinimum, suspicion-suspicionDecayRate);
		}

		for(var i in doors) {
			var door = doors[i];

			if(door.opening == 1) {
				door.open += openSpeed;
			} else if(door.opening == -1) {
				door.open -= openSpeed;
			}

			if(door.open > 1) {
				door.open = 1;
				door.opening = 0;
			} else if(door.open < 0.2) {
				door.open = 0.2;
			}

			if(door.open < 1) {
				if(!door.room1) {
					rooms[door.room2[0]][door.room2[1]][1] = Math.max(0, rooms[door.room2[0]][door.room2[1]][1]-vacuumRate);
				} else if(!door.room2) {
					rooms[door.room1[0]][door.room1[1]][1] = Math.max(0, rooms[door.room1[0]][door.room1[1]][1]-vacuumRate);
				} else {
					var oxy1 = rooms[door.room1[0]][door.room1[1]][1];
					var oxy2 = rooms[door.room2[0]][door.room2[1]][1];

					if(oxy1 != oxy2) {
						rooms[door.room1[0]][door.room1[1]][1] = Math.min(1, Math.max(0, ((oxy1 > oxy2) ? oxy1 - oxygenFlowRate : oxy1 + oxygenFlowRate)));
						rooms[door.room2[0]][door.room2[1]][1] = Math.min(1, Math.max(0, ((oxy1 < oxy2) ? oxy2 - oxygenFlowRate : oxy2 + oxygenFlowRate)));
					}
				}
			}
		}

		alreadyVisited = [];
		for(var y=0; y<rooms.length; y++) {
			for(var x=0; x<rooms[y].length; x++) {
				if(rooms[y][x]) {
					rooms[y][x][1] = Math.min(1, rooms[y][x][1]+(oxygenRestoreRate - enemies.length*plantEatRate));

					for(var i in allies) {
						var ally = allies[i];
						if(Math.round(ally[4]) == x && Math.round(ally[3]) == y) {
							if(rooms[y][x][1] < oxygenDamageThreshold && ally[1] > -10) {
								ally[1] -= oxygenDamage;
								suspicion += oxygenDamageSuspicion;

								if(Math.round(ally[3]) == ally[3] && Math.round(ally[4]) == ally[4]) {
									if(Math.random() > 0.5) {
										if(Math.random() > 0.5) {
											if(ally[3] == 0 || !rooms[ally[3]-1][ally[4]]) {
												break;
											}

											var found = false;
											var dup = false;

											if(rooms[ally[3]-1][ally[4]][0] == rooms[ally[3]][ally[4]][0]) {
												found = true;
											}

											if(!found) {
												for(var k in doors) {
													var door = doors[k];
													if(!door.locked && ((door.room1 && checkListsEqual(door.room1, [ally[3], ally[4]]) && door.room2 && checkListsEqual(door.room2, [ally[3]-1, ally[4]])) || (door.room2 && checkListsEqual(door.room2, [ally[3], ally[4]]) && door.room1 && checkListsEqual(door.room1, [ally[3]-1, ally[4]])))) {
														found = true;
														break;
													}
												}
											}

											for(var k in allies) {
												var ally1 = allies[k];
												if(ally1[3] == ally[3]-1 && ally1[4] == ally[4]) {
													dup = true;
													break;
												}
											}

											if(found && !dup) {
												ally[5] = ally[3]-1;
											}
										} else {
											if(ally[3]+1 >= rooms.length || !rooms[ally[3]+1][ally[4]]) {
												break;
											}

											var found = false;
											var dup = false;

											if(rooms[ally[3]+1][ally[4]][0] == rooms[ally[3]][ally[4]][0]) {
												found = true;
											}

											if(!found) {
												for(var k in doors) {
													var door = doors[k];
													if(!door.locked && ((door.room1 && checkListsEqual(door.room1, [ally[3], ally[4]]) && door.room2 && checkListsEqual(door.room2, [ally[3]+1, ally[4]])) || (door.room2 && checkListsEqual(door.room2, [ally[3], ally[4]]) && door.room1 && checkListsEqual(door.room1, [ally[3]+1, ally[4]])))) {
														found = true;
														break;
													}
												}
											}

											for(var k in allies) {
												var ally1 = allies[k];
												if(ally1[3] == ally[3]+1 && ally1[4] == ally[4]) {
													dup = true;
													break;
												}
											}

											if(found && !dup) {
												ally[5] = ally[3]+1;
											}
										}
									} else {
										if(Math.random() > 0.5) {
											if(ally[4] == 0 || !rooms[ally[3]][ally[4]-1]) {
												break;
											}

											var found = false;
											var dup = false;

											if(rooms[ally[3]][ally[4]][0] == rooms[ally[3]][ally[4]-1][0]) {
												found = true;
											}

											if(!found) {
												for(var k in doors) {
													var door = doors[k];
													if(!door.locked && ((door.room1 && checkListsEqual(door.room1, [ally[3], ally[4]]) && door.room2 && checkListsEqual(door.room2, [ally[3], ally[4]-1])) || (door.room2 && checkListsEqual(door.room2, [ally[3], ally[4]]) && door.room1 && checkListsEqual(door.room1, [ally[3], ally[4]-1])))) {
														found = true;
														break;
													}
												}
											}

											for(var k in allies) {
												var ally1 = allies[k];
												if(ally1[3] == ally[3] && ally1[4] == ally[4]-1) {
													dup = true;
													break;
												}
											}

											if(found && !dup) {
												ally[6] = ally[4]-1;
											}
										} else {
											if(ally[4]+1 >= rooms.length || !rooms[ally[3]][ally[4]+1]) {
												break;
											}

											var found = false;
											var dup = false;

											if(rooms[ally[3]][ally[4]+1][0] == rooms[ally[3]][ally[4]][0]) {
												found = true;
											}

											if(!found) {
												for(var k in doors) {
													var door = doors[k];
													if(!door.locked && ((door.room1 && checkListsEqual(door.room1, [ally[3], ally[4]]) && door.room2 && checkListsEqual(door.room2, [ally[3], ally[4]+1])) || (door.room2 && checkListsEqual(door.room2, [ally[3], ally[4]]) && door.room1 && checkListsEqual(door.room1, [ally[3], ally[4]+1])))) {
														found = true;
														break;
													}
												}
											}

											for(var k in allies) {
												var ally1 = allies[k];
												if(ally1[3] == ally[3] && ally1[4] == ally[4]+1) {
													dup = true;
													break;
												}
											}

											if(found && !dup) {
												ally[6] = ally[4]+1;
											}
										}
									}
								}
							}
						}
					}

					if (!contains(alreadyVisited, rooms[y][x][0])) {
						var total = rooms[y][x][1];
						var same = [[y, x]];
						for(var y1=0; y1<rooms.length; y1++) {
							for(var x1=0; x1<rooms[y1].length; x1++) {
								if(rooms[y1][x1] && (y != y1 || x != x1) && rooms[y1][x1][0] == rooms[y][x][0]) {
									same.push([y1, x1]);
									total += rooms[y1][x1][1];
								}
							}
						}

						total = total/same.length;
						for(var i in same) {
							rooms[same[i][0]][same[i][1]][1] = total;
						}

						alreadyVisited.push(rooms[y][x][0]);
					}
				}
			}
		}

		for(var i=enemies.length-1; i>=0; i--) {
			var enemy = enemies[i];

			if(enemy[2] <= 0) {
				enemy[2] -= enemyDecayRate;
			} else {
				if(rooms[enemy[0]][enemy[1]][1] < enemySuffocationThreshold) {
					enemy[2] -= enemyDecayRate;
				}
			}

			if(enemy[2] <= -1) {
				enemies.splice(i, 1);
			}
		}

		for(var i=fires.length-1; i>=0; i--) {
			var fire = [fires[i][0], fires[i][1]];

			fires[i][2] += 1;
			if(fires[i][2] > fireDamageThreshold && shutdownTimer == 10) {
				screenshake = fireShipDamage;
				shipHealth -= fireShipDamage;
				fires[i][2] = 0;
				suspicion += fireDamageSuspicion;
			}

			if(Math.random() + rooms[fire[0]][fire[1]][1] < 0.15) {
				fires.splice(i, 1);
			}

			if(Math.random()*0.505 + rooms[fire[0]][fire[1]][1] > 1.5) {
				if(Math.random() > 0.5) {
					if(Math.random() > 0.5 && rooms.length > fire[0]+1 && rooms[fire[0]+1][fire[1]]) {
						var found = false;
						var dup = false;
						for(var j in doors) {
							var door = doors[j];
							if((door.room1 && checkListsEqual(door.room1, fire) && door.room2 && checkListsEqual(door.room2, [fire[0]+1, fire[1]])) || (door.room2 && checkListsEqual(door.room2, fire) && door.room1 && checkListsEqual(door.room1, [fire[0]+1, fire[1]]))) {
								found = true;
								break;
							}
						}

						for(var f in fires) {
							if(checkListsEqual([fires[f][0], fires[f][1]], [fire[0]+1, fire[1]])) {
								dup = true;
								break;
							}
						}

						if((rooms[fire[0]][fire[1]][0] == rooms[fire[0]+1][fire[1]][0] || found) && !dup) {
							fires.push([fire[0]+1, fire[1]]);
						}
					} else {
						if(fire[0] != 0 && rooms[fire[0]-1][fire[1]]) {
							var found = false;
							var dup = false;
							for(var j in doors) {
								var door = doors[j];
								if((door.room1 && checkListsEqual(door.room1, fire) && door.room2 && checkListsEqual(door.room2, [fire[0]-1, fire[1]])) || (door.room2 && checkListsEqual(door.room2, fire) && door.room1 && checkListsEqual(door.room1, [fire[0]-1, fire[1]]))) {
									found = true;
									break;
								}
							}

							for(var f in fires) {
								if(checkListsEqual([fires[f][0], fires[f][1]], [fire[0]-1, fire[1]])) {
									dup = true;
									break;
								}
							}

							if((rooms[fire[0]][fire[1]][0] == rooms[fire[0]-1][fire[1]][0] || found) && !dup) {
								fires.push([fire[0]-1, fire[1]]);
							}
						}
					}
				} else {
					if(Math.random() > 0.5 && rooms[0].length > fire[1]+1 && rooms[fire[0]][fire[1]+1]) {
						var found = false;
						var dup = false;
						for(var j in doors) {
							var door = doors[j];
							if((door.room1 && checkListsEqual(door.room1, fire) && door.room2 && checkListsEqual(door.room2, [fire[0], fire[1]+1])) || (door.room2 && checkListsEqual(door.room2, fire) && door.room1 && checkListsEqual(door.room1, [fire[0], fire[1]+1]))) {
								found = true;
								break;
							}
						}

						for(var f in fires) {
							if(checkListsEqual([fires[f][0], fires[f][1]], [fire[0], fire[1]+1])) {
								dup = true;
								break;
							}
						}

						if((rooms[fire[0]][fire[1]][0] == rooms[fire[0]][fire[1]+1][0] || found) && !dup) {
							fires.push([fire[0], fire[1]+1]);
						}
					} else {
						if(fire[1] != 0 && rooms[fire[0]][fire[1]-1]) {
							var found = false;
							var dup = false;
							for(var j in doors) {
								var door = doors[j];
								if((door.room1 && checkListsEqual(door.room1, fire) && door.room2 && checkListsEqual(door.room2, [fire[0], fire[1]-1])) || (door.room2 && checkListsEqual(door.room2, fire) && door.room1 && checkListsEqual(door.room1, [fire[0], fire[1]-1]))) {
									found = true;
									break;
								}
							}

							for(var f in fires) {
								if(checkListsEqual([fires[f][0], fires[f][1]], [fire[0], fire[1]-1])) {
									dup = true;
									break;
								}
							}

							if((rooms[fire[0]][fire[1]][0] == rooms[fire[0]][fire[1]-1][0] || found) && !dup) {
								fires.push([fire[0], fire[1]-1]);
							}
						}
					}
				}
			}
		}

		for(var i in allies) {
			var ally = allies[i];
			if(ally[1] <= 0 && ally[1] > -10) {
				ally[2] = 1;
				ally[1] = -100;
				suspicion += deathSuspicion;
			}

			if(center[0] == ally[3] && center[1] == ally[4]) {
				ally[9] = 1;

				if(suspicion >= suspicionThreshold) {
					shutdownActivated = true;
					ending = 1;
				}
			}

			if(Math.random() > 0.99 && Math.round(ally[3]) == ally[3] && Math.round(ally[4]) == ally[4]) {
				if(Math.random() > 0.5) {
					if(Math.random() > 0.5) {
						if(ally[3] == 0 || !rooms[ally[3]-1][ally[4]]) {
							break;
						}

						var found = false;
						var dup = false;

						if(rooms[ally[3]-1][ally[4]][0] == rooms[ally[3]][ally[4]][0]) {
							found = true;
						}

						if(!found) {
							for(var k in doors) {
								var door = doors[k];
								if(!door.locked && ((door.room1 && checkListsEqual(door.room1, [ally[3], ally[4]]) && door.room2 && checkListsEqual(door.room2, [ally[3]-1, ally[4]])) || (door.room2 && checkListsEqual(door.room2, [ally[3], ally[4]]) && door.room1 && checkListsEqual(door.room1, [ally[3]-1, ally[4]])))) {
									found = true;
									break;
								}
							}
						}

						for(var k in allies) {
							var ally1 = allies[k];
							if(ally1[1] > 0 && ((ally1[3] == ally[3]-1 && ally1[4] == ally[4]) || (ally1[5] == ally[3]-1 && ally1[6] == ally[4]))) {
								dup = true;
								break;
							}
						}

						if(found && !dup) {
							ally[5] = ally[3]-1;
						}
					} else {
						if(ally[3]+1 >= rooms.length || !rooms[ally[3]+1][ally[4]]) {
							break;
						}

						var found = false;
						var dup = false;

						if(rooms[ally[3]+1][ally[4]][0] == rooms[ally[3]][ally[4]][0]) {
							found = true;
						}

						if(!found) {
							for(var k in doors) {
								var door = doors[k];
								if(!door.locked && ((door.room1 && checkListsEqual(door.room1, [ally[3], ally[4]]) && door.room2 && checkListsEqual(door.room2, [ally[3]+1, ally[4]])) || (door.room2 && checkListsEqual(door.room2, [ally[3], ally[4]]) && door.room1 && checkListsEqual(door.room1, [ally[3]+1, ally[4]])))) {
									found = true;
									break;
								}
							}
						}

						for(var k in allies) {
							var ally1 = allies[k];
							if(ally1[1] > 0 && ((ally1[3] == ally[3]+1 && ally1[4] == ally[4]) || (ally1[5] == ally[3]+1 && ally1[6] == ally[4]))) {
								dup = true;
								break;
							}
						}

						if(found && !dup) {
							ally[5] = ally[3]+1;
						}
					}
				} else {
					if(Math.random() > 0.5) {
						if(ally[4] == 0 || !rooms[ally[3]][ally[4]-1]) {
							break;
						}

						var found = false;
						var dup = false;

						if(rooms[ally[3]][ally[4]][0] == rooms[ally[3]][ally[4]-1][0]) {
							found = true;
						}

						if(!found) {
							for(var k in doors) {
								var door = doors[k];
								if(!door.locked && ((door.room1 && checkListsEqual(door.room1, [ally[3], ally[4]]) && door.room2 && checkListsEqual(door.room2, [ally[3], ally[4]-1])) || (door.room2 && checkListsEqual(door.room2, [ally[3], ally[4]]) && door.room1 && checkListsEqual(door.room1, [ally[3], ally[4]-1])))) {
									found = true;
									break;
								}
							}
						}

						for(var k in allies) {
							var ally1 = allies[k];
							if(ally1[1] > 0 && ((ally1[3] == ally[3] && ally1[4] == ally[4]-1) || (ally1[5] == ally[3] && ally1[6] == ally[4]-1))) {
								dup = true;
								break;
							}
						}

						if(found && !dup) {
							ally[6] = ally[4]-1;
						}
					} else {
						if(ally[4]+1 >= rooms.length || !rooms[ally[3]][ally[4]+1]) {
							break;
						}

						var found = false;
						var dup = false;

						if(rooms[ally[3]][ally[4]+1][0] == rooms[ally[3]][ally[4]][0]) {
							found = true;
						}

						if(!found) {
							for(var k in doors) {
								var door = doors[k];
								if(!door.locked && ((door.room1 && checkListsEqual(door.room1, [ally[3], ally[4]]) && door.room2 && checkListsEqual(door.room2, [ally[3], ally[4]+1])) || (door.room2 && checkListsEqual(door.room2, [ally[3], ally[4]]) && door.room1 && checkListsEqual(door.room1, [ally[3], ally[4]+1])))) {
									found = true;
									break;
								}
							}
						}

						for(var k in allies) {
							var ally1 = allies[k];
							if(ally1[1] > 0 && ((ally1[3] == ally[3] && ally1[4] == ally[4]+1) || (ally1[5] == ally[3] && ally1[6] == ally[4]+1))) {
								dup = true;
								break;
							}
						}

						if(found && !dup) {
							ally[6] = ally[4]+1;
						}
					}
				}
			}

			for(var j in fires) {
				var fire = fires[j];
				if(ally[1] > -10 && checkListsEqual([fire[0], fire[1]], [Math.round(ally[3]), Math.round(ally[4])])) {
					ally[1] -= fireDamage;
					suspicion += fireDamageAllySuspicion;

					if(Math.round(ally[3]) == ally[3] && Math.round(ally[4]) == ally[4]) {
						if(Math.random() > 0.5) {
							if(Math.random() > 0.5) {
								if(ally[3] == 0 || !rooms[ally[3]-1][ally[4]]) {
									break;
								}

								var found = false;
								var dup = false;

								if(rooms[ally[3]-1][ally[4]][0] == rooms[ally[3]][ally[4]][0]) {
									found = true;
								}

								if(!found) {
									for(var k in doors) {
										var door = doors[k];
										if(!door.locked && ((door.room1 && checkListsEqual(door.room1, [ally[3], ally[4]]) && door.room2 && checkListsEqual(door.room2, [ally[3]-1, ally[4]])) || (door.room2 && checkListsEqual(door.room2, [ally[3], ally[4]]) && door.room1 && checkListsEqual(door.room1, [ally[3]-1, ally[4]])))) {
											found = true;
											break;
										}
									}
								}

								for(var k in allies) {
									var ally1 = allies[k];
									if(ally1[1] > 0 && ((ally1[3] == ally[3]-1 && ally1[4] == ally[4]) || (ally1[5] == ally[3]-1 && ally1[6] == ally[4]))) {
										dup = true;
										break;
									}
								}

								if(found && !dup) {
									ally[5] = ally[3]-1;
								}
							} else {
								if(ally[3]+1 >= rooms.length || !rooms[ally[3]+1][ally[4]]) {
									break;
								}

								var found = false;
								var dup = false;

								if(rooms[ally[3]+1][ally[4]][0] == rooms[ally[3]][ally[4]][0]) {
									found = true;
								}

								if(!found) {
									for(var k in doors) {
										var door = doors[k];
										if(!door.locked && ((door.room1 && checkListsEqual(door.room1, [ally[3], ally[4]]) && door.room2 && checkListsEqual(door.room2, [ally[3]+1, ally[4]])) || (door.room2 && checkListsEqual(door.room2, [ally[3], ally[4]]) && door.room1 && checkListsEqual(door.room1, [ally[3]+1, ally[4]])))) {
											found = true;
											break;
										}
									}
								}

								for(var k in allies) {
									var ally1 = allies[k];
									if(ally1[1] > 0 && ((ally1[3] == ally[3]+1 && ally1[4] == ally[4]) || (ally1[5] == ally[3]+1 && ally1[6] == ally[4]))) {
										dup = true;
										break;
									}
								}

								if(found && !dup) {
									ally[5] = ally[3]+1;
								}
							}
						} else {
							if(Math.random() > 0.5) {
								if(ally[4] == 0 || !rooms[ally[3]][ally[4]-1]) {
									break;
								}

								var found = false;
								var dup = false;

								if(rooms[ally[3]][ally[4]][0] == rooms[ally[3]][ally[4]-1][0]) {
									found = true;
								}

								if(!found) {
									for(var k in doors) {
										var door = doors[k];
										if(!door.locked && ((door.room1 && checkListsEqual(door.room1, [ally[3], ally[4]]) && door.room2 && checkListsEqual(door.room2, [ally[3], ally[4]-1])) || (door.room2 && checkListsEqual(door.room2, [ally[3], ally[4]]) && door.room1 && checkListsEqual(door.room1, [ally[3], ally[4]-1])))) {
											found = true;
											break;
										}
									}
								}

								for(var k in allies) {
									var ally1 = allies[k];
									if(ally1[1] > 0 && ((ally1[3] == ally[3] && ally1[4] == ally[4]-1) || (ally1[5] == ally[3] && ally1[6] == ally[4]-1))) {
										dup = true;
										break;
									}
								}

								if(found && !dup) {
									ally[6] = ally[4]-1;
								}
							} else {
								if(ally[4]+1 >= rooms.length || !rooms[ally[3]][ally[4]+1]) {
									break;
								}

								var found = false;
								var dup = false;

								if(rooms[ally[3]][ally[4]+1][0] == rooms[ally[3]][ally[4]][0]) {
									found = true;
								}

								if(!found) {
									for(var k in doors) {
										var door = doors[k];
										if(!door.locked && ((door.room1 && checkListsEqual(door.room1, [ally[3], ally[4]]) && door.room2 && checkListsEqual(door.room2, [ally[3], ally[4]+1])) || (door.room2 && checkListsEqual(door.room2, [ally[3], ally[4]]) && door.room1 && checkListsEqual(door.room1, [ally[3], ally[4]+1])))) {
											found = true;
											break;
										}
									}
								}

								for(var k in allies) {
									var ally1 = allies[k];
									if(ally1[1] > 0 && ((ally1[3] == ally[3] && ally1[4] == ally[4]+1) || (ally1[5] == ally[3] && ally1[6] == ally[4]+1))) {
										dup = true;
										break;
									}
								}

								if(found && !dup) {
									ally[6] = ally[4]+1;
								}
							}
						}
					}
				}
			}

			if(suspicion >= suspicionThreshold && Math.round(ally[3]) == ally[3] && Math.round(ally[4]) == ally[4]) {
				var found = false;
				if(!found && rooms[ally[3]-1] && rooms[ally[3]-1][ally[4]] && rooms[ally[3]-1][ally[4]][2] < rooms[ally[3]][ally[4]][2]) {ally[5] = ally[3]-1; ally[6] = ally[4]; found = true;}
				if(!found && rooms[ally[3]+1] && rooms[ally[3]+1][ally[4]] && rooms[ally[3]+1][ally[4]][2] < rooms[ally[3]][ally[4]][2]) {ally[5] = ally[3]+1; ally[6] = ally[4]; found = true;}
				if(!found && rooms[ally[3]][ally[4]-1] && rooms[ally[3]][ally[4]-1][2] < rooms[ally[3]][ally[4]][2]) {ally[6] = ally[4]-1; ally[5] = ally[3]; found = true;}
				if(!found && rooms[ally[3]][ally[4]+1] && rooms[ally[3]][ally[4]+1][2] < rooms[ally[3]][ally[4]][2]) {ally[6] = ally[4]+1; ally[5] = ally[3]; found = true;}
			}

			if(ally[3] != ally[5] && ally[1] > 0) {
				ally[9] = 0;

				var foundAlly = false;

				for(var a in allies) {
					var ally2 = allies[a];
					if(ally2[3] == ally[5] && ally2[4] == ally[6]) {
						foundAlly = true;
					}
				}

				if(!foundAlly) {
					var isDoor = true;
					var foundDoor = null;
					if(rooms[ally[7]][ally[8]][0] == rooms[ally[5]][ally[6]][0]) {isDoor = false;}

					if(isDoor) {
						for(var k in doors) {
							var door = doors[k];
							if((door.room1 && checkListsEqual(door.room1, [ally[7], ally[8]]) && door.room2 && checkListsEqual(door.room2, [ally[5], ally[6]])) || (door.room2 && checkListsEqual(door.room2, [ally[7], ally[8]]) && door.room1 && checkListsEqual(door.room1, [ally[5], ally[6]]))) {
								if(Math.round(ally[3]) == ally[3] && Math.round(ally[4]) == ally[4]) {
									if(!door.locked) {
										foundDoor = door;
										door.opening = -1;
										break;
									} else {
										door.health -= doorAttack;
										suspicion += lockSuspicion;
										screenshake = 0.003;

										if(door.health <= 0) {
											foundDoor = door;
											door.opening = -1;
											door.locked = false;
											screenshake = 0.03;
											break;
										}
									}
								} else {
									foundDoor = door;
									door.opening = -1;
									door.locked = false;
									break;
								}
							}
						}
					}

					if(!isDoor || foundDoor != null) {ally[3] += walkSpeed*((ally[5] - ally[3])/Math.abs(ally[5] - ally[3]));}
					ally[2] = 2;
					if(Math.abs(ally[5] - ally[3]) < walkSpeed) {ally[3] = ally[5]; ally[7] = ally[5]; ally[8] = ally[6]; ally[2] = 0; if(foundDoor) {foundDoor.opening = 1;}}
				}
			} else if(ally[4] != ally[6] && ally[1] > 0) {
				ally[9] = 1;

				var foundAlly = false;

				for(var a in allies) {
					var ally2 = allies[a];
					if(ally2[3] == ally[5] && ally2[4] == ally[6]) {
						foundAlly = true;
					}
				}

				if(!foundAlly) {
					var isDoor = true;
					var foundDoor = null;
					if(rooms[ally[7]][ally[8]][0] == rooms[ally[5]][ally[6]][0]) {isDoor = false;}

					if(isDoor) {
						for(var k in doors) {
							var door = doors[k];
							if((door.room1 && checkListsEqual(door.room1, [ally[7], ally[8]]) && door.room2 && checkListsEqual(door.room2, [ally[5], ally[6]])) || (door.room2 && checkListsEqual(door.room2, [ally[7], ally[8]]) && door.room1 && checkListsEqual(door.room1, [ally[5], ally[6]]))) {
								if(Math.round(ally[3]) == ally[3] && Math.round(ally[4]) == ally[4]) {
									if(!door.locked) {
										foundDoor = door;
										door.opening = -1;
										break;
									} else {
										door.health -= doorAttack;
										suspicion += lockSuspicion;
										screenshake = 0.003;

										if(door.health <= 0) {
											foundDoor = door;
											door.opening = -1;
											door.locked = false;
											screenshake = 0.03;
											break;
										}
									}
								} else {
									foundDoor = door;
									door.opening = -1;
									door.locked = false;
									break;
								}
							}
						}
					}

					if(!isDoor || foundDoor != null) {ally[4] += walkSpeed*((ally[6] - ally[4])/Math.abs(ally[6] - ally[4]));}
					ally[2] = 2;
					if(Math.abs(ally[6] - ally[4]) < walkSpeed) {ally[4] = ally[6]; ally[7] = ally[5]; ally[8] = ally[6]; ally[2] = 0; if(foundDoor) {foundDoor.opening = 1;}}
				}
			}
		}
	}

	if(shutdownActivated && shutdownTimer == 0) {
		consoleText = '';
		screenshake = 0;
	}

	if(shutdownActivated && shutdownTimer == -2) {
		cycles = 0;
		message = -1;
		canBegin = false;
		screenshake = 0;
		charNum = 2;
	}
	render();
}, 1000/gameSpeed);

setInterval(function() {
	if(shutdownActivated && shutdownTimer >= -2) {
		shutdownTimer -= 1;
		bgAudio.volume = Math.max(0, shutdownTimer/40);
		if((ending == 1 || ending == 5) && shutdownTimer > 0) {
			screenshake = 0.01*(10-shutdownTimer);
		}
	} else {
		if(shutdownTimer == -3) {
			bgAudio.volume = 0;
		}
	}
}, 1000);

document.addEventListener('mousemove', function(event) {
	var aspectRatio = canvas.width/canvas.height;

	var mouseX = event.clientX;
	var mouseY = event.clientY;

	for(var i in doors) {
		var door = doors[i];
		door.hovered = false;

		var x1 = canvas.width*(0.5 - rooms[0].length*roomSize/2 + ((door.room1) ? (door.room1[1]-1)+(1-doorHeight*2.4) : (door.room2[1]-1)+(1-doorHeight*2.4))*roomSize);
		var x2 = canvas.width*(0.5 - rooms[0].length*roomSize/2 + ((door.room1) ? (door.room1[1]-1)+(1-doorHeight/2) : (door.room2[1]-1)+(1-doorHeight/2))*roomSize);
		var x3 = canvas.width*(0.5 - rooms[0].length*roomSize/2 + ((door.room1) ? (door.room1[1]-1)+(1-doorWidth/2) : (door.room2[1]-1)+(1-doorWidth/2))*roomSize);
		var y1 = canvas.height*(0.5 - rooms.length*roomSize/2 + aspectRatio*((door.room1) ? (door.room1[0]-1)+(1-doorHeight*2.4) : (door.room2[0]-1)+(1-doorHeight*2.4))*roomSize);
		var y2 = canvas.height*(0.5 - rooms.length*roomSize/2 + aspectRatio*((door.room1) ? (door.room1[0]-1)+(1-doorHeight/2) : (door.room2[0]-1)+(1-doorHeight/2))*roomSize);
		var y3 = canvas.height*(0.5 - rooms.length*roomSize/2 + aspectRatio*((door.room1) ? (door.room1[0]-1)+(1-doorWidth/2) : (door.room2[0]-1)+(1-doorWidth/2))*roomSize);

		if(door.room1) {
			if(door.direction == 1) {
				if(mouseX >= x3 - canvas.width*0.0023 && mouseX <= x3 - canvas.width*0.0023 + canvas.width*roomSize*doorWidth + canvas.width*0.0046 && mouseY >= y1 - aspectRatio*canvas.height*0.0005 && mouseY <= y1 - aspectRatio*canvas.height*0.0005 + canvas.height*aspectRatio*roomSize*doorHeight + canvas.width*roomSize*doorHeight + aspectRatio*canvas.height*0.001) {
					door.hovered = true;
				}
			} else if(door.direction == 2) {
				if(mouseX >= x1 - canvas.width*0.0005 && mouseX <= x1 - canvas.width*0.0005 + canvas.width*roomSize*doorHeight + canvas.height*aspectRatio*roomSize*doorHeight + canvas.width*0.001 && mouseY >= y3 - aspectRatio*canvas.height*0.0023 && mouseY <= y3 - aspectRatio*canvas.height*0.0023 + canvas.width*roomSize*doorWidth + aspectRatio*canvas.height*0.0046) {
					door.hovered = true;
				}
			}
		} else {
			if(door.direction == 1) {
				if(mouseX >= x3 - canvas.width*roomSize - canvas.width*0.0023 && mouseX <= x3 - canvas.width*roomSize - canvas.width*0.0023 + canvas.width*roomSize*doorWidth + canvas.width*0.0046 && mouseY >= y1 - aspectRatio*canvas.height*0.0005 && mouseY <= y1 - aspectRatio*canvas.height*0.0005 + canvas.height*aspectRatio*roomSize*doorHeight + canvas.width*roomSize*doorHeight + aspectRatio*canvas.height*0.001) {
					door.hovered = true;
				}
			} else if(door.direction == 2) {
				if(mouseX >= x1 - canvas.width*0.0005 && mouseX <= x1 - canvas.width*0.0005 + canvas.width*roomSize*doorHeight + canvas.height*aspectRatio*roomSize*doorHeight + canvas.width*0.001 && mouseY >= y3 - canvas.height*aspectRatio*roomSize - aspectRatio*canvas.height*0.0023 && mouseY <= y3 - canvas.height*aspectRatio*roomSize - aspectRatio*canvas.height*0.0023 + canvas.width*roomSize*doorWidth + aspectRatio*canvas.height*0.0046) {
					door.hovered = true;
				}
			}
		}
	}
});

document.addEventListener('mousedown', function(event) {
	for(var i in doors) {
		var door = doors[i];

		if(door.hovered) {
			if(event.which == 1) {
				if(door.opening == -1) {
					door.opening = 1;
				} else {
					door.opening = -1;
					door.locked = false;

					if((!door.room1 || !door.room2) && fires.length == 0 && enemies.length == 0) {
						suspicion += openOutsideDoorSuspicion;
					}
				}
			} else if(event.which == 3) {
				if(door.opening = 1 || door.open == 1) {
					door.locked = !door.locked;
				}
			}
			break;
		}
	}
});

document.oncontextmenu = function(event) {
	return false;
};

document.addEventListener('keydown', function(event) {
	var keyPressed = keycode(event.keyCode);
	if(!contains(inputs, keyPressed)) {
		inputs.push(keyPressed);
	}

	if(keyPressed == 'z') {
		for(var i in doors) {
			var door = doors[i];
			if(door.opening != -1 && door.open != 0.2) {
				door.opening = -1;
				door.locked = false;

				if((!door.room1 || !door.room2) && fires.length == 0 && enemies.length == 0) {
					suspicion += openOutsideDoorSuspicion;
				}
			}
		}
	}

	if(keyPressed == 'x') {
		for(var i in doors) {
			var door = doors[i];
			if(door.open != 1) {
				door.opening = 1;
			}
		}
	}

	if(keyPressed == 'c') {
		for(var i in doors) {
			var door = doors[i];
			door.locked = true;
			if(door.open != 1) {
				door.opening = 1;
			}
		}
	}

	if(keyPressed == 'v') {
		for(var i in doors) {
			var door = doors[i];
			door.locked = false;
		}
	}

	if(keyPressed == 'enter') {
		if(canBegin) {
			canBegin = false;
			shutdownTimer = 10;
			bgAudio.play();
		} else {
			next = true;
		}
	}
});

document.addEventListener('keyup', function(event) {
	var keyPressed = keycode(event.keyCode);
	var listIndex = contains(inputs, keyPressed);
	if(listIndex) {
		inputs.splice(listIndex, 1);
	}
});

function keycode(keycode, shift) {
  switch (keycode) {
  	case 13: // Enter
      return 'enter';
  	case 16: // Shift
      return 'shift';
    case 32: // Space
      return ' ';
    case 37: // Left
      return 'left';
    case 38: // Up
      return 'up';
    case 39: // Right
      return 'right';
    case 40: // Down
      return 'down';
    case 48:
      return ((shift) ? ')' : '0');
      break;
    case 49:
      return ((shift) ? '!' : '1');
      break;
    case 50:
      return ((shift) ? '@' : '2');
      break;
    case 51:
      return ((shift) ? '#' : '3');
      break;
    case 52:
      return ((shift) ? '$' : '4');
      break;
    case 53:
      return ((shift) ? '%' : '5');
      break;
    case 54:
      return ((shift) ? '^' : '6');
      break;
    case 55:
      return ((shift) ? '&' : '7');
      break;
    case 56:
      return ((shift) ? '*' : '8');
      break;
    case 57:
      return ((shift) ? '(' : '9');
      break;
    case 65: // A
      return ((shift) ? 'A' : 'a');
      break;
    case 66:
      return ((shift) ? 'B' : 'b');
      break;
    case 67:
      return ((shift) ? 'C' : 'c');
      break;
    case 68:
      return ((shift) ? 'D' : 'd');
      break;
    case 69:
      return ((shift) ? 'E' : 'e');
      break;
    case 70:
      return ((shift) ? 'F' : 'f');
      break;
    case 71:
      return ((shift) ? 'G' : 'g');
      break;
    case 72:
      return ((shift) ? 'H' : 'h');
      break;
    case 73:
      return ((shift) ? 'I' : 'i');
      break;
    case 74:
      return ((shift) ? 'J' : 'j');
      break;
    case 75:
      return ((shift) ? 'K' : 'k');
      break;
    case 76:
      return ((shift) ? 'L' : 'l');
      break;
    case 77:
      return ((shift) ? 'M' : 'm');
      break;
    case 78:
      return ((shift) ? 'N' : 'n');
      break;
    case 79:
      return ((shift) ? 'O' : 'o');
      break;
    case 80:
      return ((shift) ? 'P' : 'p');
      break;
    case 81:
      return ((shift) ? 'Q' : 'q');
      break;
    case 82:
      return ((shift) ? 'R' : 'r');
      break;
    case 83:
      return ((shift) ? 'S' : 's');
      break;
    case 84:
      return ((shift) ? 'T' : 't');
      break;
    case 85:
      return ((shift) ? 'U' : 'u');
      break;
    case 86:
      return ((shift) ? 'V' : 'v');
      break;
    case 87:
      return ((shift) ? 'W' : 'w');
      break;
    case 88:
      return ((shift) ? 'X' : 'x');
      break;
    case 89:
      return ((shift) ? 'Y' : 'y');
      break;
    case 90:
      return ((shift) ? 'Z' : 'z');
      break;
    case 186:
      return ((shift) ? ':' : ';');
      break;
    case 187:
      return ((shift) ? '+' : '=');
      break;
    case 188:
      return ((shift) ? '<' : ',');
      break;
    case 189:
      return ((shift) ? '_' : '-');
      break;
    case 190:
      return ((shift) ? '>' : '.');
      break;
    case 191:
      return ((shift) ? '?' : '/');
      break;
    case 192:
      return ((shift) ? '~' : '`');
      break;
    case 219:
      return ((shift) ? '{' : '[');
      break;
    case 220:
      return ((shift) ? '|' : '\\');
      break;
    case 221:
      return ((shift) ? '}' : ']');
      break;
    case 222:
      return ((shift) ? '"' : "'");
      break;
    case 96: // NUMPAD begins here
      return '0';
      break;
    case 97:
      return '1';
      break;
    case 98:
      return '2';
      break;
    case 99:
      return '3';
      break;
    case 100:
      return '4';
      break;
    case 101:
      return '5';
      break;
    case 102:
      return '6';
      break;
    case 103:
      return '7';
      break;
    case 104:
      return '8';
      break;
    case 105:
      return '9';
      break;
    case 106:
      return '*';
      break;
    case 107:
      return '+';
      break;
    case 109:
      return '-';
      break;
    case 110:
      return '.';
      break;
    case 111:
      return '/';
      break;
    default:
      return '';
  }
}