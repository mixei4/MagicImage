import React from 'react';

const NotFoundPage = (props) => (
	<>
		<h1>Page not found</h1>
		{props.error && <p>{props.error}</p>}
	</>
);

export default NotFoundPage;