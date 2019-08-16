#!/bin/sh

unzip -o front.zip -d /var/www/front/
find /var/www/front/ -type d -exec chmod 0755 {} \;
find /var/www/front/ -type f -exec chmod 0644 {} \;
rm front.zip