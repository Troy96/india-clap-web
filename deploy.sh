#!/bin/sh

git checkout master
git merge dev
git push origin master
git push heroku master
git checkout dev