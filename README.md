# MTG-Host Site
https://quiet-beyond-50847.herokuapp.com/

# MTG-Host Github
https://github.com/eblouin876/MTG-Host

# Instructions
To use MTG-Host, 
1. Create a login using the signup form.
2. If there is not yet a game hosted, host a game and tell your opponent(s) the Game Id so that they may join you.
3. Otherwise - Enter your host's ID and select Join Game.
4. Once in the game, the app will update the state of the game for all players, adding a tray for each that includes their name, life total, current tokens controlled, a slider/submit button combo to add or subtract life from that player's total, and a Token+ button to add a token to that player's tray.
5. Begin the game! Use the companion app as much as it is needed - some games will only require a life tracker! Depending on the player, you may need to track a lot of tokens.
6. Once the game is over, though there is no way to view the stats - win stats are stored (once a player drops below 0 life) in the database and can be accessed at a later date.
7. Thank you for playing!

# Project Goals
To create a companion app for paper - aka offline - Magic: The Gathering that adds some digital functionality to an otherwise analog game. Life tracking, token tracking (to reduce real-life board clutter), and statistic tracking are our core desired functions for MTG-Host.

# Status
As of writing, MTG-Host can successfully host games of up to four players, add tokens to the first player's tray (after a minor bugfix the token-adding function will work for more players), and life can be tracked. All of the tracked information updates on every player's device.

# Known Bugs
Beside allowing all players to add tokens to their tray, there is a known bug where trying to navigate back to the login screen while logged in will crash the app, and this is being worked on.

# Future Goals
We would like the app to be able to refresh the game state of the board for all players without needing the page to be refreshed, which is doable.

The app will be recieving continual updates to its appearance, which includes both looks and dynamic updates as the game state is updated, likely using Materialize toasts.

Finally, as M:TG has a *lot* of rules that often seem conflicting, we want to add a 'rules lookup' modal that will grab card rulings from Gatherer and display them in our app for reference, removing some of the hassle of Googling for such rulings.

# Frameworks Used
Express, Node.js, Handlebars, jQuery, Materialize, Socket, Sequelize, Passport.

# Team
Models - Bronson
Controllers - Emile
Views - Nick 
