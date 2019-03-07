import { h } from 'preact';
import style from './style';
import Helmet from 'preact-helmet';

const codeString = `const preactCliSwPrecachePlugin = require('preact-cli-sw-precache');

export default function (config) {
  const precacheConfig = {
    staticFileGlobs: [
      'build/vendor.css',
      'build/vendor.js',
      'build/app.js',
      'build/home.js',
      'build/index.html',
    ],
    runtimeCaching: [{
      urlPattern: /api\/user\//,
      handler: 'networkFirst'
    },{
      urlPattern: /api\/yourSuperCriticalAPI\//,
      handler: 'networkOnly'
    }],
    filename: 'sw.js',
    clientsClaim: true,
    skipWaiting: true,
  };

  return preactCliSwPrecachePlugin(config, precacheConfig);
}`;


const Home = () => (
	<div class={style.home}>
    <Helmet title="Úvodní stránka" />

		<h1>Create Preact SSR PWA App</h1>
		<p>This is a small guide how to create <a href="https://preactjs.com/">Preact</a> PWA used Preact-cli.</p>
		<p>As first stem we have install preact-cli use npm:</p>
		<pre class={style.code}>npm insall preact-cli -g</pre>
		<p>Now whet preact-cli has installed, we can create new project:</p>
		<pre class={style.code}>preact create default new-preact-project-name</pre>
		<p>This take a while, so be patient. When everything is done, just go to inside project folder and run project:</p>
		<pre class={style.code}>
			cd new-preact-project-name<br />
			preact watch
		</pre>
		<p>The project will run on localhost <pre class={style.code}>http://localhost:8080</pre></p>
		<div class={style.code}><pre data-lang="HTML"><code>{codeString}</code></pre></div>
	</div>
);

export default Home;
