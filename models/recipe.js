const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
    amount: {
        type: Number,
        min: 1,
        max: 1,
        required: true, // Corrected typo
    },
    measurement: {
        type: String,
        enum: ['g', 'kg', 'tbsp', 'tsp', 'cup'],
        required: true,
    },
    ingredientName: {
        type: String,
        required: true,
    },
});

const instructionsSchema = new mongoose.Schema({
    stepNum: {
        type: Number,
        required: true,
    },
    step: {
        type: String, // Corrected type to String
        required: true,
    },
    totalPrepTime: {
        type: Number,
        required: true,
    },
    totalCookTime: {
        type: Number,
        required: true,
    },
    totalTime: {
        type: Number,
        required: true,
    },
});

const recipeSchema = new mongoose.Schema({
    recipeTitle: {
        type: String,
        required: true,
    },
    recipeImage: {
        type: String,
        required: true,
    },
    ingredients: [ingredientsSchema],
    instructions: [instructionsSchema],
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    recipes: [recipeSchema], // Renamed from 'recipe' to 'recipes' for clarity
});

module.exports = mongoose.model('UserRecipe', userSchema);
