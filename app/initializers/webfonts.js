import fontFaceOnload from 'font-face-onload';
import ENV from 'anfema/config/environment';

function initialize() {
	// This should not be needed, no idea why the function below throws in testing mode
	if (ENV.environment === 'test') {
		return;
	}

	if (typeof FastBoot !== 'undefined') {
		return;
	}

	fontFaceOnload('Calibre Web', {
		success() {
			document.documentElement.classList.add('webfont-calibre-web--loaded');
		},
		error() {
			document.documentElement.classList.add('webfont-calibre-web--error');
		},
		timeout: 5000,
	});
}

const initializer = {
	name: 'webfonts',
	initialize,
};

export { initialize };

export default initializer;
