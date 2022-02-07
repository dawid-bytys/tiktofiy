#!/bin/bashs
set -e

DIR=`dirname $0`
ssh root@139.162.188.82 'bash -s' < $DIR/ssh-script-deploy.sh