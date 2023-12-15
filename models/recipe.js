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
        enum: ['g', 'kg', 'tbsp', 'tsp', 'cup', 'piece'],
        required: true,
    },
    ingredientName: {
        type: String,
        required: true,
    },
});

const descriptionsSchema = new mongoose.Schema({
    recipeDescription: {
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
    descriptions: [descriptionsSchema],
    ingredients: [ingredientsSchema],
    instructions: [instructionsSchema],
});

module.exports = recipeSchema;
