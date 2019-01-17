#!/bin/bash
echo "Region is $REGION"
sed -i 's@REGION_PLACEHOLDER@'"$REGION"'@g' src/config.js
sed -i 's@API_URL_PLACEHOLDER@'"$API_URL"'@g' src/config.js
sed -i 's@USER_POOL_ID_PLACEHOLDER@'"$USER_POOL_ID"'@g' src/config.js
sed -i 's@APP_CLIENT_ID_PLACEHOLDER@'"$APP_CLIENT_ID"'@g' src/config.js
sed -i 's@IDENTITY_POOL_ID_PLACEHOLDER@'"$IDENTITY_POOL_ID"'@g' src/config.js
npm install
npm run build