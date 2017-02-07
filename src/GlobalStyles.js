// Global styling extending Aphrodite, heavily based on niksajanjic's comment
// at https://github.com/Khan/aphrodite/issues/139 and the example given in
// Aphrodite's README

import { StyleSheet } from 'aphrodite';

// Create a global extension that detects selectors beginning with '*'. The *
// is stripped, then the corresponding styles are generated under the base tag
// names.
const globalExtension = {
	selectorHandler: (selector, _, generateSubtreeStyles) => {
		if (selector[0] !== '*') {
			return null;
		}

		return generateSubtreeStyles(selector.slice(1));
	},
};

// Extend the Aphrodite StyleSheet system with the global selector.
const globalStyles = StyleSheet.extend([globalExtension]);

const styles = globalStyles.StyleSheet.create({
	globals: {
		'*h1, h2': {
			color: 'orange',
		},
	},
});

// Export the globally-scoped CSS directly.
export default globalStyles.css(styles.globals);
