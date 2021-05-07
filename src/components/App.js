import React, { useState }from 'react';
import { Router } from '@reach/router';

import Navbar from './Navbar';
import Home from './Home';
import TopPage from './TopPage';
import Callback from './Callback';

export default function App() {

	const [topTracks, setTopTracks] = useState([]);
	const handleTopTracks = (newTracks) => {
		setTopTracks(newTracks);
	}

	const [topArtists, setTopArtists] = useState([]);
	const handleTopArtists = (newArtists) => {
		setTopArtists(newArtists);
	}

	const [currentSong, setCurrentSong] = useState(null);
	const handleClick = (previewUrl) => {
		if (currentSong) {
			currentSong.pause();
		}

		if (previewUrl) {
			const newSong = new Audio(previewUrl);
			newSong.play();
			setCurrentSong(newSong);
		} else {
			setCurrentSong(null);
		}
	}

	const [ isLoggedIn, setIsLoggedIn ] = useState(false);
	const handleLogin = () => {
		setIsLoggedIn(true);
	}

	const handleToken = (token) => {
		localStorage.setItem('token', token);
		localStorage.setItem('time', Date.now());
	}

	return (
		<div className="window">
			<Navbar />

			<Router>
				<Home path="/" isLoggedIn={isLoggedIn}/>

				<TopPage
					path="top-tracks"
					topEntries={topTracks}
					type="tracks"
					onClick={handleClick}
					isLoggedIn={isLoggedIn}
				/>

				<TopPage 
					path="top-artists"
					topEntries={topArtists}
					type="artists"
					onClick={handleClick}
					isLoggedIn={isLoggedIn}
				/>

				<Callback
					path="callback"
					onTopTracks={handleTopTracks}
					onTopArtists={handleTopArtists}
					onLogin={handleLogin}
					onToken={handleToken}
				/>
			</Router>
		</div>
	);

}