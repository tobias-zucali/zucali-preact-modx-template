#!/bin/bash

BUILD_FOLDER="build/"
TMP_FOLDER="build_tmp/"
ASSETS_PATH="assets/"
TEMPLATE_PATH="${ASSETS_PATH}templates/zucali-preact-modx-template_build/"

mv ${BUILD_FOLDER} ${TMP_FOLDER}
mkdir ${BUILD_FOLDER}
mv ${TMP_FOLDER}${ASSETS_PATH} ${BUILD_FOLDER}${ASSETS_PATH}
cp ${TMP_FOLDER}index.html ${BUILD_FOLDER}
mv ${TMP_FOLDER}* ${BUILD_FOLDER}${TEMPLATE_PATH}
rm -fr ${TMP_FOLDER}
