// PLAYER: We still haven't decided if this table is necessary given how little information is on it (id, image link to token picture ).  We may just merge it into the USER table created for the purpose of sign in authentication.  It would be a nice to have to keep the USER table for security purposes and the PLAYER table for game play.  For example, if USER table had some kind of encryption, I wouldn't want to give anyone any reason to be looking into that table except for security reasons.  In fact I would want to hide the USER table from the view of anyone but the db admin/security folks
// Query needed: 2  A query to insert new record.  A query to change the name and/or update the icon image link

module.exports = function(sequelize, DataTypes) {
  let players = sequelize.define("players", {
    // Giving the Author model a name of type STRING
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, validate: { len: [1, 25] } },
    img_link: {
      type: DataTypes.STRING(2083),
      allowNull: true,
      defaultValue: "http://placeimg.com/150/150/any"
    }
    // The html to insert will be something like: < a href='./index.html' > <img src='http://placeimg.com/150/150/any' alt='Mouseover'></a>
  });

  players.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    players.belongsTo(models.users, {
      forignKey: "user_id",
      onDelete: "no action",
      onUpdate: "cascade"
    });
  };

  return players;
};

// create table if not exists player
//   (
//     id INT NOT NULL AUTO_INCREMENT,
//     user_id INT NOT NULL REFERENCES user(id),
//     name VARCHAR(25) NOT NULL,
//     img_link VARCHAR(500),
//     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
//     PRIMARY KEY(id)
//   );
