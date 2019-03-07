import { h, Component } from 'preact';
import style from './style';
import Helmet from 'preact-helmet';

export default class Profile extends Component {
	state = {
		time: Date.now(),
		count: 10
	};

	// update the current time
	updateTime = () => {
		this.setState({ time: Date.now() });
	};

	increment = () => {
		this.setState({ count: this.state.count+1 });
	};

	decrement = () => {
		this.setState({ count: this.state.count-1 });
	};

	// gets called when this route is navigated to
	componentDidMount() {
		// start a timer for the clock:
		this.timer = setInterval(this.updateTime, 1000);
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ user }, { time, count }) {
		return (
			<div class={style.profile}>
				<Helmet title="Profilová stránka" />

				<h1>Profil uživatele: {user}</h1>
				<p>Toto je profil uživatele { user }.</p>

				<div>Přesný čas: {new Date(time).toLocaleString()}</div>

				<p>
					<button class={style.but1} onClick={this.increment}>+</button>
					<button class={style.but2} onClick={this.decrement}>-</button>
					{' '}
					Současná hodnota je {count}.
				</p>
			</div>
		);
	}
}
