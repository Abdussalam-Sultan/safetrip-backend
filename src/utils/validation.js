import {body} from "express-validator";

const createUserValidation = [
    body("name")
    .notEmpty().withMessage("name is required")
    .isLength({min:4}).withMessage("name must be atleast 4 charcters long"),
    
    body("email").notEmpty().withMessage("Email address is required")
    .isEmail().withMessage("Invalid email format"),

    body("password").notEmpty().withMessage("Provide your Password")
    .isLength({min:8}).withMessage("Password must be atleast 8 character long"),

    //confirm Password must match password
    body("confirmPassword").notEmpty().withMessage("Confirm password is required")
    .custom((value, {req})=>{
        if(value !== req.body.password){
            throw new error ("Password did not match")
        }
        return true;
    }),

    body("phone").optional().isMobilePhone()
    .withMessage("Invalid phone number"),
];

const loginValidator = [
    body("email").notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

    body("password").notEmpty().withMessage("Password is required")
    .isLength({min:8})
    .withMessage("Password must be atleast 8 characters")
];

const changePasswordValidator = [
    body("oldPassword").notEmpty
    .withMessage('old password is require'),
    body("newpassword").notEmpty()
    .withMessage("New password is required")
    .isLength({min:8})
    .withMessage("New password must atleast 8 characters"),

    body("confirmPassword").notEmpty()
    .withMessage("New password is required")
    .custom((value, {req})=>{
        if(value !== req.body.password) {
            throw new error ("Password did not match")
        }
        return true;
    })
];

const forgotPasswordValidator = [
    body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),
];

const resetPasswordValidator = [
    body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),
    body("otp")
    .notEmpty().withMessage("OTP is required")
    .isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 characters"),
    body("newPassword")
    .notEmpty().withMessage("New password is required")
    .isLength({ min: 8 }).withMessage("New password must be at least 8 characters"),
];

const verifyEmailValidation = [
    body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),
    body("otp")
    .notEmpty().withMessage("OTP is required")
    .isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 characters"),
]

export {
    createUserValidation,
    loginValidator,
    changePasswordValidator,
    forgotPasswordValidator,
    resetPasswordValidator,
    verifyEmailValidation
}