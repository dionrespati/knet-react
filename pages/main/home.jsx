import React from 'react';
import Link from 'next/link';

const home = () => {
	return (
		<div>
			<h1>Home</h1>
			<Link href="/main/about"><a>About</a></Link>
			<Link href="/posts"><a>Post</a></Link>	
		</div>
	);
};

export default home;
