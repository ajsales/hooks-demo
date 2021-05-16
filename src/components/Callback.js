import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { navigate } from "@reach/router";
import spotifyRequestUrl from '../helper/spotifyRequestUrl';

export default function Callback(props) {

	const [ spotify ] = useState(new SpotifyWebApi());
	const [ isTracksLoaded, setIsTracksLoaded ] = useState(false);
	const [ isArtistsLoaded, setIsArtistsLoaded ] = useState(false);
	const [ redirectLocation, setRedirectLocation ] = useState('/');

	useEffect(() => {
		const grabTopTracks = async () => {
			let topTracks = {};

			let response;
			response = await spotify.getMyTopTracks({limit: 10, time_range: 'short_term'});
			console.log(response);
			topTracks.recent = response.items;

			response = await spotify.getMyTopTracks({limit: 10, time_range: 'long_term'});
			console.log(response);
			topTracks.allTime = response.items;

			for (const [timeRange, tracks] of Object.entries(topTracks)) {
				topTracks[timeRange] = tracks.map((song) => {
					let artists = song.artists.map(artist => artist.name);
					artists = artists.filter(artist => !song.name.includes(artist));
					const trackObj = {
						img: song.album.images[0].url,
						name: song.name + ' by ' + artists.join(', '),
						preview: song.preview_url
					};
					return trackObj;
				});
			}
			props.onTopTracks(topTracks);
			setIsTracksLoaded(true);
		};

		const grabTopArtists = async () => {
			let topArtists = {};

			let response;
			response = await spotify.getMyTopArtists({limit: 10, time_range: 'short_term'});
			console.log(response);
			topArtists.recent = response.items;

			response = await spotify.getMyTopArtists({limit: 10, time_range: 'long_term'});
			console.log(response);
			topArtists.allTime = response.items;

			for (const [timeRange, artists] of Object.entries(topArtists)) {
				let artists = topArtists[timeRange];
				for (let i = 0; i < 10; i++) {
					let artist = artists[i];
					let entry = {
						img: artist.images[0].url,
						name: artist.name,
					};
					response = await spotify.getArtistTopTracks(artist.id, 'US');
					console.log(response);
					entry.preview = response.tracks[0].preview_url;
					topArtists[timeRange][i] = entry;
				}
			}
			props.onTopArtists(topArtists);
			setIsArtistsLoaded(true);
		};

		let token;
		if (window.location.hash) {
			token = window.location.hash.split('&')[0].split('=')[1];
			props.onToken(token);
		} else {
			let tokenTime = localStorage.getItem('time');
			let hour = 60 * 60 * 1000;
			console.log('Time left: ' + (Date.now() - tokenTime));
			if (!tokenTime || (Date.now() - tokenTime) > hour) {
				window.location.replace(spotifyRequestUrl());
			}

			token = localStorage.getItem('token');
			setRedirectLocation(props.location.state.redirectLocation);
		}

		spotify.setAccessToken(token);
		props.onLogin();

		grabTopTracks();
		grabTopArtists();
	}, []);

	if (isTracksLoaded && isArtistsLoaded) {
		navigate(redirectLocation, { replace: true });
		return null;
	} else {
		return (
			<div className="home">
				<h1 className="home-title">Loading Spotify data...</h1>
			</div>
		);
	}
}