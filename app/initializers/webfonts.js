import fontFaceOnload from 'font-face-onload';

export function initialize() {
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

export default {
	name: 'webfonts',
	initialize,
};
