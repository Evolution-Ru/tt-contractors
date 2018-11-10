## Getting started
install node.js 8+
To ensure run 
```
node -v
```

## Set up DB config & seed settings if needed
go to
```
cd packages/service
```
edit config.json file.
Notice "seed" field means the number of random seeded rows at launch.
You can set up one at first startup, and set back to 0 after


## Install lerna to manage all the packages at the same time
get back and install lerna & run some scripts
```
cd ../../
npm i -g lerna
lerna bootstra
lerna run dev --parallel
```
Watch for no errors in the console, other case repeate the previous steps please =)

