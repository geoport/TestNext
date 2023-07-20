import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='tr'>
			<Head>
				<link
					href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<body style={{ overflow: 'auto' }}>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
