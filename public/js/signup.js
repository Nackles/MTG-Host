// We need to write username and password to USER
// THEN we need to write username, password, and user.id to PLAYER {Player is the table that is the player profile, where they can change their token image and whatever other player specific is in there}

function createUser(event) {
  // TODO: Create Jquery
  event.preventDefault();
  // Wont submit the post if we are missing a body, title, or author
  if (!userName.val().trim() || !passWord.val().trim()) {
    return;
  }
  // Constructing a newUser object to hand to the database
  let newUser = {
    username: userName.val().trim(),
    password: passWord.val().trim()
  };

  // Should be able to edit either username or password (probably?) Maybe we only allow the player.name to be updated and leave the user.username as uneditable?
  if (updating) {
    newUser.id = userId;
    updatePost(newUser);
  } else {
    submitPost(newUser);
    createPlayer(event);
  }
}

function createPlayer(event) {
  event.preventDefault();
  // Constructing a newPlayer object to hand to the database
  let newPlayer = {
    name: userName.val().trim(),
    user_id: newUser.id.val().trim()
  };

  // We are only creating the player record here.
  submitPost(newPlayer);
}
