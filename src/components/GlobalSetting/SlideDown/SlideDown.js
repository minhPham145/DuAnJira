import React from 'react';
import { useSpring, animated } from 'react-spring';

export default function SlideDown(Component) {
	const spring = useSpring({
		to: {
			y: 0,
			opacity: 1,
		},
		from: {
			y: -100,
			opacity: 0,
		},
		config: {
			tension: 280,
			friction: 120,
		},
	});

	return (
		<animated.div style={spring}>
			<Component />
		</animated.div>
	);
}
