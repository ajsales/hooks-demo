export default function spotifyRequestUrl() {

	let redirect_uri;
	if (window.location.host === 'localhost:3000') {
		redirect_uri = 'http://localhost:3000/callback';
	} else {
		redirect_uri = '';
	}

	const params = {
		client_id: 'fe044b0f871343f3a475af2fac6414a3',
		redirect_uri: redirect_uri,
		scope: 'user-top-read',
		response_type: 'token'
	}

	const toQueryString = (params) => {
		var query = [];
		for (var key in params) {
			query.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
		}
		return query.join('&')
	}

	return 'https://accounts.spotify.com/authorize?' + toQueryString(params);
}