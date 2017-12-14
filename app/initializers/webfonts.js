import fontFaceOnload from 'font-face-onload';

function initialize() {
	if (typeof FastBoot === 'undefined') {
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
}

const initializer = {
	name: 'webfonts',
	initialize,
};

export { initialize };

export default initializer;
