# anfema-next-website

A brand new website for https://anfe.ma using Ember.js and Fastboot.



## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

To properly render the text, you have to copy the Calibre Webfonts into `/public/fonts`. We only use the following files:

* CalibreWeb-SemiboldItalic.woff2
* CalibreWeb-SemiboldItalic.woff
* CalibreWeb-Semibold.woff2
* CalibreWeb-SemiboldItalic.eot
* CalibreWeb-RegularItalic.woff2
* CalibreWeb-Semibold.eot
* CalibreWeb-Semibold.woff
* CalibreWeb-Regular.woff2
* CalibreWeb-RegularItalic.eot
* CalibreWeb-RegularItalic.woff
* CalibreWeb-Regular.eot
* CalibreWeb-Regular.woff

This list will likely shrink in the future. Do not commit these files under any circumstance.



## Installation

* `git clone git@github.com:anfema/anfema-next-website.git`
* `cd anfema-next-website`
* `yarn install`



## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).



### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

This project uses pods. `--pods` is enabled by default. Use `--no-pods` for models, helpers, utils, mixins, and services.



### Running Tests

* `ember test`
* `ember test --server`

This project uses [ember-mocha](https://github.com/emberjs/ember-mocha) with [ember-native-dom-helpers](https://github.com/cibernox/ember-native-dom-helpers) and [ember-test-selectors](https://github.com/simplabs/ember-test-selectors) for testing.

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.



## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
