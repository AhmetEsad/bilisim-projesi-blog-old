'use strict';
const canvas = document.getElementById('canvas'), ctx = canvas.getContext('2d');

const images = {
	'character-right': 'assets/character-facing-right.png',
	'character-left': 'assets/character-facing-left.png',
	sign: 'assets/sign.png',
	day: 'assets/day.png',
	night: 'assets/night.png',
	gold: 'assets/gold.png',
	EVENMOREGOLD: 'assets/even-more-gold.png',
	x: 'assets/x.png'
}, tracks = { button: 'assets/button.mp3', coin: 'assets/coin.mp3' }, assets = new Map(), colors = {
	background: '#191829',
	progressBar: '#3a76ee',
	highlightedPost: '#fffb00'
},
	pressing = {};

const font = 'sans-serif'

let loaded = -2, done = false, postList = [], loadingText = 'Loading', scene = 1;

!localStorage.coins && (localStorage.coins = String(0));

canvas.width = window.innerWidth, canvas.height = window.innerHeight;
ctx.imageSmoothingEnabled = false;

function showSettings() {
	document.getElementById('settings').style.display = 'flex'
}

function hideSettings() {
	document.getElementById('settings').style.display = 'none'
}

function finishLoading() {
	loaded === Object.keys(images).length + Object.keys(tracks).length && (() => {
		!localStorage.visitedOnce ? (loadingText = 'Welcome to my blog', setTimeout(() => { done = true }, 3000)) : (done = true)
		localStorage.visitedOnce = String(true);
	})();
}

let zemin_kayganlığı = 0.5;

fetch('/postList', { method: 'GET' }).then(res => res.json()).then(json => (postList = json.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), loaded++, finishLoading())).then(() => {
	calculateLocations();
	loaded++;
});

Object.keys(images).forEach(i => {
	assets.set(i, new Image());
	assets.get(i).src = images[i];
	assets.get(i).onload = () => { loaded += 1; finishLoading() };
});

Object.keys(tracks).forEach(i => {
	assets.set(i, new Audio());
	assets.get(i).src = tracks[i];
	assets.get(i).oncanplay = () => { loaded += 1; finishLoading() };
});

window.addEventListener('resize', function () {
	canvas.width = window.innerWidth, canvas.height = window.innerHeight;
	ctx.imageSmoothingEnabled = false;

	calculateLocations();
});

let iframe = { element: document.getElementById('post'), shown: false, container: document.querySelector('.container'), close: document.querySelector('#close') };

function showiFrame(highlightedPost) {
	iframe.element.src = `/post/${encodeURIComponent(highlightedPost.title)}`;
	iframe.container.style.display = 'flex';
	iframe.element.style.display = 'block';
	iframe.close.style.display = 'unset';
	canvas.style.display = 'none';
	iframe.shown = true;
}

function hideiFrame() {
	iframe.element.style.display = 'none', canvas.style.display = 'unset';
	iframe.container.style.display = 'none';
	iframe.close.style.display = 'none';
	iframe.shown = false;
	iframe.element.src = 'about:blank';
}

function drawProgressBar() {
	let rect = { w: 100, h: 20 };
	ctx.strokeStyle = 'white', ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.rect(canvas.width / 2 - (rect.w + 15) / 2, canvas.height / 2 - (rect.h + 15) / 2, rect.w + 15, rect.h + 15);
	ctx.stroke();
	ctx.fillStyle = colors.progressBar;
	ctx.fillRect(canvas.width / 2 - rect.w / 2, canvas.height / 2 - rect.h / 2, rect.w * ((loaded <= 0 ? 0 : loaded) / assets.size), rect.h); // tam ortası
	ctx.fillStyle = 'white';
	ctx.textAlign = 'center';
	ctx.font = '16px ' + font;
	ctx.fillText(loadingText, canvas.width / 2, canvas.height / 2 + 40);
}

const character = { x: 500, y: 500, facing: 'right', w: 10 * 5, h: 5 * 5, x2: 0, y2: 0, speed: 300 }

function drawCharacter() {
	ctx.drawImage(assets.get(`character-${character.facing}`), character.x, character.y, character.w, character.h);
}

let coinLocations = [];

function randomLocations() {
	for (var i = 0; i < 30; i++) {
		coinLocations.push({ x: Math.random() * canvas.width, y: Math.floor(Math.random() * (canvas.height - 10 - 100 + 1)) + 100 });
	}
}

randomLocations();

let postButtons, postLocations = { m: 20, x: 0, y: 0, m2: 10, m3: 3 };

let postTitleFontSize = 40, postDayNightImageSize = 40;

function calculateLocations() {
	postButtons = [];
	postLocations = { m: 20, x: 0, y: 0, m2: 10, m3: 3 };
	let { m, m2, m3 } = postLocations;
	postList.forEach((post, pos) => {
		ctx.textAlign = 'start';
		ctx.font = postTitleFontSize + 'px ' + font;
		let p = post;
		let hour = new Date(post.date).getHours();
		p.x = postLocations.x + m;
		p.y = postLocations.y + m;
		p.day = (hour >= 7 && hour <= 20); // 7 am - 8 pm arasıysa sabah sayılacak
		postButtons.push(p);
		p.w = ctx.measureText(p.title).width + m3 * 3 + postDayNightImageSize;
		p.h = postDayNightImageSize + m3 * 2;
		p.highlighted = false;
		postLocations.x += p.w + m;
		postList[pos + 1] && postLocations.x + m * 2 + ctx.measureText(postList[pos + 1].title).width + m3 * 3 + postDayNightImageSize >= canvas.width && (postLocations.y += p.h + m2, postLocations.x = 0); //* ÇOK ÖNEMLİ
	});
}

function drawPosts() {
	ctx.textAlign = 'start';
	ctx.font = postTitleFontSize + 'px ' + font;
	postButtons.forEach(button => {
		ctx.fillStyle = 'black';
		ctx.fillRect(button.x, button.y, button.w, button.h);

		ctx.strokeStyle = (button.highlighted ? colors.highlightedPost : 'white');
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.rect(button.x, button.y, button.w, button.h);
		ctx.stroke();

		ctx.drawImage(assets.get(`${button.day ? 'day' : 'night'}`), button.x + postLocations.m3, button.y + postLocations.m3, postDayNightImageSize, postDayNightImageSize);

		ctx.fillStyle = (button.highlighted ? colors.highlightedPost : 'white');
		ctx.fillText(button.title, button.x + postLocations.m3 * 2 + postDayNightImageSize, button.y + postTitleFontSize);
	});
}

function captureInput() {
	(pressing['w'] || pressing['ArrowUp']) && (character.y2 -= character.speed * delta / 1000);
	(pressing['a'] || pressing['ArrowLeft']) && (character.x2 -= character.speed * delta / 1000, character.facing = 'left');
	(pressing['s'] || pressing['ArrowDown']) && (character.y2 += character.speed * delta / 1000);
	(pressing['d'] || pressing['ArrowRight']) && (character.x2 += character.speed * delta / 1000, character.facing = 'right');
}

document.onkeydown = (e) => {
	if (pressing['Control'] || iframe.shown) return;
	pressing[e.key] = true;
}

document.onkeyup = (e) => {
	pressing[e.key] = false;
	switch (e.key) {
		case 'Enter':
			let highlightedPost = postButtons.find(b => b.highlighted);
			highlightedPost && (showiFrame(highlightedPost), localStorage.coins = Number(localStorage.coins) + 20);
			break;
		case 'Escape':
			hideiFrame();
			break;
	}
}

function moveCharacter() {
	(character.x + character.x2 <= canvas.width && character.x + character.x2 >= 0) ? (character.x += character.x2, character.x2 *= zemin_kayganlığı) : (() => {
		(scene === 1 && character.x + character.x2 <= 0) && (coinLocations.length === 0 && randomLocations(), scene = 2, character.x = canvas.width - character.w);
		(Number(localStorage.coins) >= 100) && (scene === 1 && character.x + character.x2 >= canvas.width) && (scene = 3, character.x = 0, showSettings());
		(scene === 2 && character.x + character.x2 >= canvas.width) && (scene = 1, character.x = 0);
		(scene === 3 && character.x + character.x2 <= 0) && (scene = 1, character.x = canvas.width, hideSettings());
		zemin_kayganlığı <= .5 && (character.x2 = 0);
	})();
	(character.y + character.y2 <= canvas.height && character.y + character.y2 >= 0) ? (character.y += character.y2, character.y2 *= zemin_kayganlığı) : character.y2 = 0;
}

function checkCollision() {
	if (iframe.shown) return;
	let total = 0;
	postButtons.forEach(p => {
		if (
			character.x <= (p.x + p.w)
			&& character.x >= (p.x)
			&& p.x <= (character.x + character.w)
			&& character.y <= (p.y + p.h)
			&& character.y >= (p.y)
			&& p.y <= (character.y + character.h)
		)
			(p.highlighted = true, total++, p.playedonce
				|| (assets.get('button').pause(),
					assets.get('button').currentTime = 0,
					assets.get('button').play(), p.playedonce = true)/*,
				postButtons.filter(b => b.title !== p.title).forEach(p => (p.highlighted = false))*/);
	});
	total === 0 && postButtons.forEach(p => (p.highlighted = false, p.playedonce = false));
}

document.getElementById('zemin').addEventListener('input', (e) => { zemin_kayganlığı = document.getElementById('zemin').value })
document.getElementById('hız').addEventListener('input', (e) => { character.speed = document.getElementById('hız').value })

calculateLocations();

function drawMoney() {
	ctx.font = '24px ' + font;
	ctx.drawImage(assets.get('EVENMOREGOLD'), canvas.width / 2 - 500 / 2 / 5, canvas.height - 191 / 5, 500 / 5, 191 / 5);
	ctx.fillStyle = 'white'
	ctx.textAlign = 'center'
	ctx.fillText(localStorage.coins, canvas.width / 2 - 500 / 2 / 5, canvas.height - 191 / 5);
}

function drawCoins() {
	coinLocations.forEach(coin => {
		ctx.drawImage(assets.get('gold'), coin.x, coin.y, 17 * 3, 21 * 3);
	})
}

function checkCoinCollisionOrSomething() {
	coinLocations.forEach(p => { // üstteki kodun aynısını kopyaladım
		p.w = 17 * 3, p.h = 21 * 3;
		if (
			character.x <= (p.x + p.w)
			&& character.x >= (p.x)
			&& p.x <= (character.x + character.w)
			&& character.y <= (p.y + p.h)
			&& character.y >= (p.y)
			&& p.y <= (character.y + character.h)
		) {
			localStorage.coins = Number(localStorage.coins) + 5;
			assets.get('coin').pause(), assets.get('coin').currentTime = 0, assets.get('coin').play()
			coinLocations.splice(coinLocations.indexOf(coinLocations.find(c => c.x === p.x && c.y === p.y)), 1);
		}
	});
}

let lastFrame = Date.now(), delta = 0;
function render() {

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	done || drawProgressBar();
	done && (() => {
		switch (scene) {
			case 1:
				drawMoney(), captureInput(), drawPosts(), moveCharacter(), checkCollision(), drawCharacter()
				break;
			case 2:
				ctx.fillStyle = 'white';
				ctx.font = '24px ' + font;
				ctx.textAlign = 'start';
				ctx.fillText('Hakkımda', 12, 36);
				
				let lastTextY = 72;
				`• Adım Ahmet, 15 yaşında bir lise öğrencisiyim. programlamaya ilgi duyuyorum.`.split('\n').forEach(l => {
					ctx.fillText(l, 24, lastTextY); lastTextY += 24;
				})

				captureInput(), moveCharacter(), drawMoney(), drawCoins(), drawCharacter(), checkCoinCollisionOrSomething()
				break;
			case 3:
				console.log('SCENE 3')
				drawMoney(), captureInput(), moveCharacter(), drawCharacter()
				break;
		}
	})();

	delta = Date.now() - lastFrame;
	lastFrame = Date.now();

	requestAnimationFrame(render);
}

render();