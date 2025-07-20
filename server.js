const express = require('express'), app = express(), fs = require('fs'), marked = require('marked');

let posts = new Map();

marked.setOptions({
	highlight: function (code, lang, callback) {
		return require('highlight.js').highlightAuto(code).value;
	}
});

fs.readdirSync('./posts').filter(f => f.endsWith('.md')).forEach(file => {
	let content_n = fs.readFileSync(`./posts/${file}`, 'utf8').split('\n'), date = new Date(content_n.pop())
	posts.set(decodeURIComponent(file.substr(0, file.length - 3)), { content: marked(content_n.join('\n')), date });
});

app.get('/postList', (req, res) => {
	let list = [];
	Object.keys(Object.fromEntries(Array.from(posts))).forEach(p => {
		list.push({ title: p, date: posts.get(p).date });
	});
	res.json(list);
});

function stylize(_) {
	return `<html>
	<head>
		<link rel="stylesheet" href="/post-style.css">
		<link rel="stylesheet" href="/code.css">
	</head>
	<body>
			${_}
	</body>
	</html>`
}

app.get('/post/:post', (req, res) => {
	let post = posts.get(req.params.post);
	post ? res.send(stylize(post.content)) : res.status(404).send('not found');
});

app.get('/code.css', (req, res) => {
	res.sendFile(__dirname + '/node_modules/highlight.js/styles/atom-one-dark-reasonable.css')
});

app.use(express.static(__dirname + '/blog'));

app.listen(2057);