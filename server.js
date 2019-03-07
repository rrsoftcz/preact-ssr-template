
const sirv = require('sirv');
const polka = require('polka');
const { h } = require('preact');
const { basename } = require('path');
const { readFileSync } = require('fs');
const compression = require('compression')();
const render = require('preact-render-to-string');
const bundle = require('./build/ssr-build/ssr-bundle');
const Helmet = require('preact-helmet');

const App = bundle.default;
const { PORT=3000 } = process.env;

// TODO: improve this?
const RGX = /<div id="app"[^>]*>.*?(?=<script)/i;
const template = readFileSync('build/index.html', 'utf8');

function setHeaders(res, file) {
	let cache = basename(file) === 'sw.js' ? 'private,no-cache' : 'public,max-age=31536000,immutable';
	res.setHeader('Cache-Control', cache); // don't cache service worker file
}
console.log('Starting server...');
polka()
	.use(compression)
	.use(sirv('build', { setHeaders }))
	.get('*', (req, res) => {
		let markup = render(h(App, { url: req.url }));
		const head = Helmet.rewind();
		console.log('Requested url:', req.url);
		console.log(head.title.toString());

		const html = template.replace(RGX, markup);
		res.write(html);
		res.end();
	})
	.listen(PORT, err => {
		if (err) throw err;
		console.log(`> Running on localhost:${PORT}`);
	}).catch(err => console.error(err));
