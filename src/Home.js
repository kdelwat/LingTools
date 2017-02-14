import React from 'react';

import Block, { Container } from './components/Layout';

const Home = () => (
	<Container>
		<Block width={'100%'}>
			<div className="content">
				<h1>Welcome to LingTools!</h1>
				<p>This site is a collection of tools for linguistics and conlanging. If you encounter any problems at all, please do not hesitate to contact me via <a href="mailto:cadel@cadelwatson.com">email</a>, or create an issue in the <a href="https://github.com/kdelwat/lingtools">GitHub repository</a>.</p>
				<p>Currently, the included tools are:
					<ul>
						<li><strong>Coda</strong>: creates professional-looking
						reference grammars from Markdown sources.</li>
					</ul>
				</p>
			</div>
		</Block>
	</Container >
);

export default Home;
