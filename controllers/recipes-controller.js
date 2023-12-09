const Recipe = require('../models/recipe');

module.exports = {
    allRecipes,
    newRecipe,
    createRecipe,
};

async function allRecipes(req, res) {
    try {
        const users = await User.find().populate(
            'recipes.ingredients recipes.instructions'
        );
        res.render('showUsers', { users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

function newRecipe(req, res) {
    res.render('recipes/new');
}

function createRecipe(req, res) {
    console.log(req.body);
    res.redirect('/recipes');
}
