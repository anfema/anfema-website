#!/bin/bash

DEPLOY_TIMESTAMP=$(date +%Y-%m-%dT%H-%I-%S)
DEPLOY_PAYLOAD="$DEPLOY_TIMESTAMP.tgz"

cd $TRAVIS_BUILD_DIR

echo "Downloading Webfonts"
pushd public/fonts

	WEBFONTS_BASE_URL='https://www-static.anfe.ma/2017/webfonts/'
	WEBFONTS=(
		'CalibreWeb-Regular.eot'
		'CalibreWeb-RegularItalic.eot'
		'CalibreWeb-RegularItalic.woff'
		'CalibreWeb-RegularItalic.woff2'
		'CalibreWeb-Regular.woff'
		'CalibreWeb-Regular.woff2'
		'CalibreWeb-Semibold.eot'
		'CalibreWeb-SemiboldItalic.eot'
		'CalibreWeb-SemiboldItalic.woff'
		'CalibreWeb-SemiboldItalic.woff2'
		'CalibreWeb-Semibold.woff'
		'CalibreWeb-Semibold.woff2'
	)

	for i in "${WEBFONTS[@]}"; do
		# We could use travis caching here, but I don't see the point for 49KB in total
		# if [ ! -f $i ]; then
			URL="$WEBFONTS_BASE_URL$i"

			echo "Downloading $URL"
			curl $URL -O -s &
		# else
		# 	echo "Skipped download: $i already exists"
		# fi
	done

	wait
popd

echo "Building Ember Application"
ember build --env=production || exit 1

echo "Installing FastBoot packages"
pushd dist || exit 1
	yarn install || exit 1

	echo "Create dist archive at $DEPLOY_PAYLOAD"
	tar -czf ../$DEPLOY_PAYLOAD . || exit 1
popd

echo "Copy payload to server"
scp $DEPLOY_PAYLOAD homepage@kiwi.anfema.net:/home/homepage/site/ || exit 1
rm $DEPLOY_PAYLOAD

ssh homepage@kiwi.anfema.net "~/bin/deploy.sh $DEPLOY_TIMESTAMP"
