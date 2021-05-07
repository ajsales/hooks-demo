import React, { useState } from 'react';

export default function RowItem(props) {

	const [showText, setShowText] = useState(false);
	const handleMouse = () => {
		setShowText((prev) => !prev);
	}

	return (
		<div
			onMouseEnter={handleMouse}
			onMouseLeave={handleMouse}
			onClick={() => props.onClick(props.preview)}
			className={"row-item" + (showText ? ' show-text' : '')}
		>
			<img src={props.img} alt={props.name} />
			<p>
				{props.name}
			</p>
		</div>
	);
}