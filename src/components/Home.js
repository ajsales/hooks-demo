import React from 'react';
import spotifyRequestUrl from '../helper/spotifyRequestUrl';
import { Redirect } from '@reach/router';

export default function Home(props) {

	const token = localStorage.getItem('token');

	if (props.isLoggedIn) {
		return (
			<div className="home">
				<h1 className="home-title">Your Top 10</h1>
				<a>
					<button className="login-button" disabled>Hello!</button>
				</a>
			</div>
		);
	} else if (token) {
		return <Redirect to="/callback" state={{redirectLocation: "/"}} noThrow />;
	} else {
		return (
			<div className="home">
				<h1 className="home-title">Your Top 10</h1>
				<a href={spotifyRequestUrl()}>
					<button className="login-button">Login with Spotify</button>
				</a>
			</div>
		);
	}
}