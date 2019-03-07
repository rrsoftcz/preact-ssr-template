import * as functions from 'firebase-functions';
import { h } from 'preact';
import { render } from 'preact-render-to-string';
import App from './src/index';
import express from 'express';
import fs from 'fs';

const index = fs.readFileSync(__dirname + '/index.html', 'utf-8');

const app = express();

app.get('**', (req, res) => {
	const html = render(<App url={req.url} />);
	const finalHtml = index.replace('<!--::APP::-->', html);
	res.set('Cache-control', 'public', 'max-time=600', 's-maxtime=1200');
	res.send(finalHtml);
});

export let ssrapp = functions.https.onRequest(app);