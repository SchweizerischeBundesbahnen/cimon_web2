#!/bin/sh

# replace static values with environment-variables
if [ -n "$KEYCLOAK_REALM" ]; then
    sed -i "s#YOUR_REALM#$KEYCLOAK_REALM#g" /usr/share/nginx/html/main.*.js
fi
if [ -n "$KEYCLOAK_URL" ]; then
    sed -i "s#https://YOUR_SERVER.com#$KEYCLOAK_URL#g" /usr/share/nginx/html/main.*.js
fi
if [ -n "$KEYCLOAK_CLIENTID" ]; then
    sed -i "s#YOUR_CLIENT_ID#$KEYCLOAK_CLIENTID#g" /usr/share/nginx/html/main.*.js
fi

# start webserver
exec nginx
