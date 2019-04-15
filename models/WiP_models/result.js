// RESULT:  This table exists because we couldn't find a clean way to record win loss and other statistical information in GAME without making it too cubersome to work with.  It's premise is straight forward, and is just a log of game id, the player who played in it, the outcome of the game, the duration of the game, and the timestamp of game end.  Later we hopefully can add a record for "dropped games" that reflect the rage quits or the **sure** situations where connection was legitimately lost.  We still need to figure out a way to get heads up records (example KingJoffrey vs Tyrion Lannister, KingJoffrey vs reek).  This table can also likely be used to record "combo bonuses" or other type flagging of streak play (3 wins in a row, 3 losses in a row, etc).  We can also show "years played", "last won", "last lost."  All kinds of stuff
// query need: 1 mandatory: Insert record.  There will be no updating unless we go in there for admin reasons fixing an error.  There will be at least 1 query that shows the  win/loss per player and ideally some kind of league standings function.  There is plenty of fun slice and dice we can do with this table.

module.exports = function(sequelize, DataTypes) {
  let Author = sequelize.define("Author", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING
  });

  Author.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Author.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Author;
};
