// TOKEN: This table as it stands is the only pre-loaded table.  The intent is to dump all of the existing MtG game tokens into a databse for a player to use.  This should mean there are no queries other than the one that loads and refreshes the tabular information.  We will remain open to determine what else could be put in there

// Not likely to use sequelize as shown in this boilerplate.  I think folks use a "chron" job to update tables like this nightly using..... python?  For our part we'll just push it in manually

module.exports = function(sequelize, DataTypes) {
  let token = sequelize.define("token", {
              name: DataTypes.STRING,
             color: DataTypes.STRING,,
              type: DataTypes.STRING,,
                pt: DataTypes.STRING,
         abilities: VDataTypes.STRING,
              icon: DataTypes.STRING(2083),
   last_updated_by: { type: DataTypes.STRING, defaultValue: null }
  return token;
};


// create table if not exists token
// (
//   id INT NOT NULL AUTO_INCREMENT,
//   name VARCHAR (255) not null,
//   color VARCHAR (255),
//   type VARCHAR (255),
//   pt VARCHAR (255),
//   abilities VARCHAR (255),
//   icon varchar(500),
//   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
//   last_updated_by int default 1,
//   PRIMARY KEY (id)
// );