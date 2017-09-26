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

### Linting

This project uses [ESLint](https://eslint.org), [Stylelint](https://stylelint.io) and [Prettier](https://prettier.io) to ensure tidy code. 

Please enable the appropriate plugins in your editor. 

There are scripts in `package.json` which can be used to run the in-repo versions of these tools. You can also use `yarn run fix` to run all three tools at once. We recommend to do so before committing or pushing to the git origin.

### Running Tests

* `ember test`
* `ember test --server`

This project uses [ember-mocha](https://github.com/emberjs/ember-mocha) with [ember-native-dom-helpers](https://github.com/cibernox/ember-native-dom-helpers) and [ember-test-selectors](https://github.com/simplabs/ember-test-selectors) for testing.

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Use `yarn run fastboot` to run our standalone FastBoot server based on [fastboot-app-server](https://github.com/ember-fastboot/fastboot-app-server). See their README for documentation of available params. Our server uses [rc](https://github.com/dominictarr/rc) for configuration.

```sh
yarn run fastboot --port=31337 --host=anfe.ma
```



## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
