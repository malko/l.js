#!/bin/sh
echo "//https://github.com/malko/l.js" > l.min.js && uglifyjs l.js -m -c >> l.min.js && cat l.min.js | gzip > l.min.js.gz && ls -l
