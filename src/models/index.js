<<<<<<< HEAD
import User from "./User.js";
import Contact from "./Contact.js";
import SOSAlert from "./SOSAlert.js";
import CheckIn from "./CheckIn.js";
import SOSAlert from "./SOSAlert.js";


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
=======
import Chat from "./chat.js";
import User from "./user.js";
import Friend from "./friend.js";

//Friend Relationship getting all freinds related to a user

User.hasMany(Friend, {foreignKey: "user_id", as: "sentRequest"});
User.hasMany(Friend, {foreignKey: "friend_id", as: "recievedRequest"});
User.belongsTo(User, {foreignKey: "user_id", as: "requester"});
User.belongsTo(User, {foreignKey: "friend_id", as: "receiver"});

//Chat Relationship
User.hasMany(Chat, {foreignKey: "sender_id", as: "chatRequest"});
User.hasMany(Chat, {foreignKey: "receiver_id", as: "chatreciever"});
Chat.belongsTo(User, {foreignKey: "reciever_id", as: "chatSendOwner"});
Chat.belongsTo(User, {foreignKey: "sender_id", as: "chatReceiveOwner"});

export default {Friend, Chat, User }
>>>>>>> origin/Personal-work
