import User from "../models/user.model.js";

const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            success: true,
            data: {
                user,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: `Server Error! get current User Error ${error}` });
    }   
};

export {getCurrentUser};