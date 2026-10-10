const jwt = require("jsonwebtoken");
const { users } = require("../data");

const auth = (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token" });
        }

        const token = header.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = users.find(u => u.id === decoded.id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            ageGroup: user.ageGroup
        };

        next();

    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = auth;
