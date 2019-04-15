// PLAYER: We still haven't decided if this table is necessary given how little information is on it (id, image link to token picture ).  We may just merge it into the USER table created for the purpose of sign in authentication.  It would be a nice to have to keep the USER table for security purposes and the PLAYER table for game play.  For example, if USER table had some kind of encryption, I wouldn't want to give anyone any reason to be looking into that table except for security reasons.  In fact I would want to hide the USER table from the view of anyone but the db admin/security folks
// Query needed: 2  A query to insert new record.  A query to change the name and/or update the icon image link

// module.exports = function(sequelize, DataTypes) {
//   let Author = sequelize.define("Author", {
//     // Giving the Author model a name of type STRING
//     name: DataTypes.STRING
//   });

//   Author.associate = function(models) {
//     // Associating Author with Posts
//     // When an Author is deleted, also delete any associated Posts
//     Author.hasMany(models.Post, {
//       onDelete: "cascade"
//     });
//   };

//   return Author;
// };
