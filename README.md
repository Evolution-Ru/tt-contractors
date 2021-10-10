## Getting started
install node.js v11 (only 11.x.x version)
To ensure run 
```
node -v
```

## Set up DB config & seed settings if needed
go to
```
cd tt-contractors/packages/service
```
edit config.json file.
Notice "seed" field means the number of random seeded rows at launch.
You can set up one at first startup, and set back to 0 after


## Install lerna to manage all the packages at the same time
get back and install lerna & run some scripts
server requirements = 4 cores * (> 1 GHz) + 1 GB RAM
```
cd tt-contractors
npm i -g lerna
npm run backend 
```
Watch for no errors in the console, other case repeat the previous steps please =)
May be you build only front becouse it is hard for server etc.
```
cd tt-contractors/packages/front
npm build 
```
## Set crontab to handle reboots
```
crontab -u root -e
```
then add your cron job:
```
@reboot /usr/local/bin/forever start /root/{PROJECT}/packages/service/built/main.js
```
