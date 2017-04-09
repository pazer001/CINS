#!/usr/bin/env bash

# Use single quotes instead of double quotes to make it work with special-character passwords
PASSWORD='c9j98y5t'
PROJECTFOLDER='CINS'

# create project folder
sudo mkdir "/var/www/${PROJECTFOLDER}"

# update / upgrade
sudo apt-get update
sudo apt-get -y upgrade

curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
sudo apt-get install -y net-tools
sudo npm install -g @angular/cli@latest
sudo npm install -g webpack
sudo apt-get install postgresql postgresql-contrib -y
sudo adduser CINS --force-badname
sudo postgres -p 5433
sudo sysctl -w vm.max_map_count=262144
sudo apt-get install -y openssh-server