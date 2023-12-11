const mongoose = require('mongoose');
const recipeSchema = require('./recipe');

const userSchema = new mongoose.Schema(
    {
        name: String,
        recipes: [recipeSchema],
        googleAuth: {
            id: {
                type: String,
                required: true,
            },
            name: String,
            email: String,
            avatar: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
