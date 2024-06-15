// import User from "../model/User.js";

// USER PROFILE
const profile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User profile retrieved successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// LOGOUT USER
const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      secure: true,
      httpOnly: true,
      maxAge: 1,
    });

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { profile, logout };
