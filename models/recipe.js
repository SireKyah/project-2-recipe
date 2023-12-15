const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
    amount: {
        type: Number,
        min: 1,
        max: 1,
        required: true,
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
        type: String,
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

module.exports = recipeSchema;
