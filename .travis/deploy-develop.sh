#!/bin/bash

cd $TRAVIS_BUILD_DIR

ember deploy development
ember deploy development --activate
