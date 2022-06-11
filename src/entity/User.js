const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 6,
    },
    password: {
        type: String,
        required: true,
        max: 255,
        min: 8,
    },
    articles: {
        type: Schema.Types.ObjectId,
        ref: 'article',
    },
});

module.exports = mongoose.model('user', userSchema);
