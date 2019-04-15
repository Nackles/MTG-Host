// TOKEN: This table as it stands is the only pre-loaded table.  The intent is to dump all of the existing MtG game tokens into a databse for a player to use.  This should mean there are no queries other than the one that loads and refreshes the tabular information.  We will remain open to determine what else could be put in there







// Not likely to use sequelize as shown in this boilerplate.  I think folks use a "chron" job to update tables like this nightly using..... python?  For our part we'll just push it in manually
module.exports = function (sequelize, DataTypes) {
  var Author = sequelize.define("Author", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING
  });

  Author.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Author.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Author;
};
