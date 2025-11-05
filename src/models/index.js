import User from "./User.js";
import Contact from "./Contact.js";
import SOSAlert from "./SOSAlert.js";
import CheckIn from "./CheckIn.js";


User.hasMany(Contact, {
  foreignKey: "userId",
  as: "contacts",
  onDelete: "CASCADE",
});
Contact.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(SOSAlert, {
  foreignKey: "userId",
  as: "sosAlerts",
  onDelete: "CASCADE",
});
SOSAlert.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(CheckIn, {
  foreignKey: "userId",
  as: "checkIns",
  onDelete: "CASCADE",
});
CheckIn.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export { User, Contact, SOSAlert, CheckIn };
