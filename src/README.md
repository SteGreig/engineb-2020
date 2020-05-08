# Local Setup
This set up is designed for users with an intermediate skillset who have previously used programs like MAMP in order to set up a local web server.

It also assumes you are working on a Mac.

## WP_CONFIG.PHP
- This is excluded from Version Control, do not add it
- Create a new file in the root directory called `wp-config.php` and copy the contents of the corresponding `wp-congig-environment.php` to your newly created file.
- When updating the Staging or Production server, you need to create the wp-config.php file on the server. You can do this via the control panel, of deploy a local version using the new settings. Do not just replace the database settings. Each environment has their own settings which should be used.

## Requirements

You'll need the following installed on your machine
- NPM
- Gulp
- docsify

## Installing NPM
The quickest way to get NPM on your machine is to install Node JS <https://nodejs.org/en/>.

## Installing Gulp
You can get Gulp from <https://gulpjs.com/>.

## Installing docsify
Once you have NPM install in your terminal run...

```npm i docsify-cli -g```

This will instally docsify on your machine. We use docsify for the technical documents which will assist you in reskinning the white label setup. 

## Local Setup
Feel free to use a local setup using either MAMP, MAMP Pro, AMPPS or Docker if you have the knowhow

## Cloning the repo
Your repo should be cloned to 
```/Applications/AMPPS/www/dev.domain.com```

## Run the following commands
Once you've cloned the repo cd into the src directory
``` cd /Applications/AMPPS/www/dev.domain.com/src```

Then run
```npm install```

To view the docs in a web browser run 
```npm run docs```

You'll now be able to see the full docs at <http://localhost:3000/#/>

To compile Scss, JS etc to the theme directory run
```gulp```

## Database setup
In most cases you'll find a local database setup and ready to go which needs to be installed on your local set up. The database used will most likely be called client_dev but you should check the name in this file & set it up using AMPPS PHPMyAdmin instalation.

```wp-br-config/wp-config.development.php```

Note: The database should be set up with the Collation set as utf8_general_ci

## Syncing the ACF Fields
Once you've set up the database, log into WordPress and check if the ACF fields require a sync.

