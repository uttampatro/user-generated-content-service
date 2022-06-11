const User = require('../entity/User');

const register = async ({ email, password }) => {
    const user = new User({
        email,
        password,
    });
    await user.save();
    return user;
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ email, password });
    return user;
};

module.exports = { register, login };
