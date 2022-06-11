const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const date = new Date()

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
    },
    imageUrl: {
        type: String,
        required: true,

    },
    createdAt: {
        type: String,
        default: date.toString().split('').slice(4,10).join(''),
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        
    },
});

module.exports = mongoose.model('article', articleSchema);

