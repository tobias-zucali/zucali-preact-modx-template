#!/bin/bash

TEMPLATE_PATH="assets/templates/zucali-preact-modx-template_build/"
REMOTE_TEMPLATE_PATH="/www/htdocs/w011a5bf/modx-git/${TEMPLATE_PATH}"

ssh ssh-w011a5bf@zucali.com "rm -fr ${REMOTE_TEMPLATE_PATH}"
scp -r build/${TEMPLATE_PATH} ssh-w011a5bf@zucali.com:${REMOTE_TEMPLATE_PATH}
