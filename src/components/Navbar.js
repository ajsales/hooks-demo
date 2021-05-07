import React from 'react';
import { Link } from '@reach/router';

export default function Navbar() {
	return (
		<div className="navbar">
			<Link to="/" className="navbar-link">Home</Link>
			<Link to="top-tracks" className="navbar-link">Top Tracks</Link>
			<Link to="top-artists" className="navbar-link">Top Artists</Link>
		</div>
	);
}