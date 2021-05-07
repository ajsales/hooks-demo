import React from 'react';

export default class Login extends React.Component {
	get params() {
		let redirect_uri;
		if (window.location.host === 'localhost:3000') {
			redirect_uri = 'http://localhost:3000/callback';
		} else {
			redirect_uri = '';
		}

		return {
			client_id: 'fe044b0f871343f3a475af2fac6414a3',
			redirect_uri: redirect_uri,
			scope: 'user-top-read',
			response_type: 'token'
		}
	}

	toQueryString(params) {
		var query = [];
		for (var key in params) {
			query.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
		}
		return query.join('&')
	}

	render() {
		const url = 'https://accounts.spotify.com/authorize?' + this.toQueryString(this.params);
		window.location.replace(url);
		return null;
	}
}