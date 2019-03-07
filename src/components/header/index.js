import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import logo from '../../assets/flying-eda2.svg';

const Header = () => (
	<header class={style.header}>
		<nav>
		<h1>
		<img class={style.logo} alt="logo" title="bajtlamer.com" src={logo} />
		Bajtlamer
		</h1>
			<Link activeClassName={style.active} href="/">Home</Link>
			<Link activeClassName={style.active} href="/profile">Profile</Link>
		</nav>
	</header>
);

export default Header;
