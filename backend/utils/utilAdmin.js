import jwt from "jsonwebtoken";
export const createToken = (admin) => {
    return jwt.sign(
        {
            _id: admin._id,
            account: admin.account,
        },
        "my-32-character-ultra-secure-and-ultra-long-secret",
        {
            expiresIn: "30d",
        }
    );
};
