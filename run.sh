#!/bin/bash
ENV_FILE=/usr/share/nginx/html/static/env.json

# Generate env.json with all RA_ prefixed env var
echo "{" > ${ENV_FILE}
for var in `env | grep "^RA_" | cut -d"=" -f1`; do
  echo "  \"$var\": \"${!var}\"," >> ${ENV_FILE}
done
echo "  \"auto\": true" >> ${ENV_FILE}
echo "}" >> ${ENV_FILE}

nginx -g "daemon off;"
