import sequelize from "../config/sequelize.js";
import { DataTypes, UUIDV4 } from "sequelize";
import bcrypt from "bcrypt";

const User = sequelize.define ('User', {
    user_UUID: {type: DataTypes.UUID, autoIncrement:false, defaultValue:UUIDV4},
    fullname: {type: DataTypes.STRING, allowNull:false, unique:false},
    emailAddress: {type: DataTypes.STRING, allowNull:false, unique:true},
    password: {type: DataTypes.STRING, allowNull:false, unique:true},
    phoneNumber: {type: DataTypes.STRING, allowNull:false, unique:false}
}, {timestamps:true,
    hooks: {
        beforeCreate:async (user) => {
            user.fullname = user.fullname.toLowerCase();
            user.emailAddress = user.emailAddress.toLowerCase();
            if(user.password){
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt)
            }
        },
        beforeUpdate: async(user)=> {
            if(user.changed("fullname")){
                user.fullname = user.fullname.toLowerCase();
            }
            if(user.changed("emailAddress")) {
                user.emailAddress = user.emailAddress.toLowerCase();
            }
            if(user.password){
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt)
            }
        }
    }
}

);

User.prototype.verifyPassword = async function (password){
    return await bcrypt.compare(password, this.password)
};

export default User;