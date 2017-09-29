import Service from '@ember/service';
import fetch from 'fetch';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import RSVP from 'rsvp';

function cleanUrlSegment(segment) {
	return segment.replace(/^\/+/g, '').replace(/\/+$/g, '');
}

export default Service.extend({
	fastboot: service(),

	prefix: '/contents/de',
	suffix: '.json',

	host: '/',

	buildPathname(path) {
		const prefix = cleanUrlSegment(this.get('prefix'));

		path = cleanUrlSegment(path);

		return `${[prefix, path].join('/')}${this.get('suffix')}`;
	},

	read(path) {
		const pathname = this.buildPathname(path);
		const shoeboxContent = this.readShoebox(path);

		if (shoeboxContent) {
			return shoeboxContent;
		}

		return fetch(`${cleanUrlSegment(this.get('host'))}/${pathname}`).then(res => {
			if (res.status !== 200) {
				return RSVP.reject({
					status: res.status,
					statusText: res.statusText,
					response: res,
				});
			}

			// TODO: We could keep both the shoebox and the fetched data in localStorage or sessionStorage
			return res.json();
		});
	},

	readShoebox(path) {
		const pathname = this.buildPathname(path);
		const shoebox = this.get('fastboot.shoebox');
		let store = shoebox.retrieve('static-content-store');

		if (this.get('fastboot.isFastBoot')) {
			if (!store) {
				store = {};
				shoebox.put('static-content-store', store);
			}

			if (FASTBOOT_DATA !== 'undefined') {
				store[pathname] = FASTBOOT_DATA[pathname];
			}
		}

		if (shoebox && store && store[pathname]) {
			return store[pathname];
		}

		return null;
	},
});
