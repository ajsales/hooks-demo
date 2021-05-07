import React, { useState } from 'react';
import { Redirect } from "@reach/router";
import RowItem from './RowItem';

export default function TopPage(props) {

	const [ timeRange, setTimeRange ] = useState('allTime');
	const handleClick = (newTimeRange) => {
		setTimeRange(newTimeRange);
	}

	if (!props.isLoggedIn) {
		const token = localStorage.getItem('token');
		if (token) {
			return <Redirect to="/callback" state={{redirectLocation: 'top-' + props.type}} noThrow />;
		} else {
			return <Redirect to="/" noThrow />;
		}
	}

	const renderRowItem = (img, name, preview) => {
		return (
			<RowItem
				img={img}
				name={name}
				key={img}
				preview={preview}
				onClick={props.onClick}
			/>
		);
	}
	console.log(props.topEntries);

	let entries = [];
	for (let i = 0; i < 10; i ++) {
		let entry = props.topEntries[timeRange][i];
		entries.push(renderRowItem(entry.img, entry.name, entry.preview));
	}

	let rows = [];
	for (let i = 0; i < 2; i++) {
		let row = entries.slice(i * 5, i * 5 + 5);
		rows.push(<div className={row} key={'row_' + i}>{row}</div>);
	}

	let title;
	if (props.type === 'tracks') {
		title = "Tracks";
	} else {
		title = "Artists";
	}

	return (
		<div>
			<h2>Top {title}</h2>
			<button onClick={() => handleClick('recent')}>Recent</button>
			<button onClick={() => handleClick('allTime')}>All Time</button>
			<div className={props.type}>
				{rows}
			</div>
		</div>
	);
}