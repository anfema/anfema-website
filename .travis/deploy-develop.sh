#!/bin/bash

DEPLOY_TIMESTAMP=$(date +%Y-%m-%dT%H-%I-%S)
DEPLOY_PAYLOAD="../$DEPLOY_TIMESTAMP.tgz"

cd $TRAVIS_BUILD_DIR

echo "Building Ember Application"
#ember build --env=production || exit 1

echo "Installing FastBoot packages"
pushd dist
	yarn install  || exit 1
popd

echo "Create dist archive at $DEPLOY_PAYLOAD"
cd dist
tar -czf $DEPLOY_PAYLOAD . || exit 1

echo "Copy payload to server"
scp $DEPLOY_PAYLOAD homepage@banana.anfema.net:/home/homepage/site/ || exit 1
rm $DEPLOY_PAYLOAD

ssh homepage@banana.anfema.net "~/bin/deploy.sh $DEPLOY_TIMESTAMP"
