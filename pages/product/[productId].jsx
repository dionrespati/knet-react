import React from 'react';
import {useRouter} from 'next/router';

const product = () => {
	const router = useRouter()
	const prodId = router.query.productId;
	return (
		<div>
			<h1>You choose {prodId}</h1>
		</div>
	);
};

export default product;
