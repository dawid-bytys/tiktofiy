#!/bin/bash
source ~/.profile
set -e

cd tiktofiy
echo "⌛ Pulling from the server…"
git fetch origin

if git diff --quiet remotes/origin/master; then
  echo "✅ Up to date; nothing to do!"
  exit
fi

git pull origin master

echo "⌛ Installing deps…"
yarn lerna bootstrap

echo "⌛ Bulding…"
yarn build

echo "⌛ Restarting the server…"
pm2 restart all

echo "✅ Done!"