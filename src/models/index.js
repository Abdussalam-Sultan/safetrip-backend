import User from "./User.js";
import Contact from "./Contact.js";
import SOSAlert from "./SOSAlert.js";
import CheckIn from "./CheckIn.js";

// User - Contact
User.hasMany(Contact, {
  foreignKey: "user_UUID",  
  as: "contacts",
  onDelete: "CASCADE",
});
Contact.belongsTo(User, {
  foreignKey: "user_UUID",
  as: "user",
});

// User - SOSAlert
User.hasMany(SOSAlert, {
  foreignKey: "user_UUID",
  as: "sosAlerts",
  onDelete: "CASCADE",
});
SOSAlert.belongsTo(User, {
  foreignKey: "user_UUID",
  as: "user",
});

// User - CheckIn
User.hasMany(CheckIn, {
  foreignKey: "user_UUID",
  as: "checkIns",
  onDelete: "CASCADE",
});
CheckIn.belongsTo(User, {
  foreignKey: "user_UUID",
  as: "user",
});

export { User, Contact, SOSAlert, CheckIn };
