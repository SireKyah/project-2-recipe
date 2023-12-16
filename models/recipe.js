const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
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
    },
    {
        timestamps: true,
    }
);

const descriptionsSchema = new mongoose.Schema(
    {
        recipeDescription: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const instructionsSchema = new mongoose.Schema(
    {
        stepNum: {
            type: Number,
            required: true,
        },
        step: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const recipeSchema = new mongoose.Schema(
    {
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
    },
    {
        timestamps: true,
    }
);

module.exports = recipeSchema;
