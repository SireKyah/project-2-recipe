const Users = require('../models/user');

module.exports = {
    allRecipes,
    newRecipe,
    createRecipe,
    showRecipe,
};

async function allRecipes(req, res) {
    try {
        const users = await Users.find().populate(
            'recipes.ingredients recipes.instructions'
        );
        res.render('recipes/allRecipes', { users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function showRecipe(req, res) {
    // console.log(req);
    const recipeId = req.params.id;
    const user = await Users.findOne({ 'recipes._id': recipeId });
    console.log(user);
    const recipe = user.recipes.id(recipeId);
    res.render('recipes/showRecipe', { user, recipe });
    // res.json(recipe);
}

function newRecipe(req, res) {
    res.render('recipes/new');
}

async function createRecipe(req, res) {
    req.user.recipes.push(req.body);
    await req.user.save();
    console.log(req.user);
    res.redirect('/recipes');
}
