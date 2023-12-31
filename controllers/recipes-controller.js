const Users = require('../models/user');

module.exports = {
    allRecipes,
    showRecipe,
    newRecipe,
    createRecipe,
    deleteRecipe,
    editRecipe,
    updateRecipe,
};

async function allRecipes(req, res) {
    // console.log('hello');
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
    // console.log('show recipe here');
    const recipeId = req.params.id;
    const user = await Users.findOne({ 'recipes._id': recipeId });
    // console.log(user);
    const recipe = user.recipes.id(recipeId);
    console.log(user.id);
    console.log(recipeId);
    res.render('recipes/showRecipe', { user, recipe });
    // res.json(recipe);
}

function newRecipe(req, res) {
    res.render('recipes/new');
}

async function createRecipe(req, res) {
    req.user.recipes.push(req.body);
    await req.user.save();
    // console.log(req.user);
    res.redirect('/recipes');
}

async function deleteRecipe(req, res) {
    // console.log('it works!!');
    const recipeId = req.params.id;
    // console.log(recipeId);
    try {
        // Find the user that has the recipe with the given _id
        const user = await Users.findOne({ 'recipes._id': recipeId });

        // If the user is found, remove the recipe from the recipes array
        if (user._id.equals(req.user._id)) {
            user.recipes.pull({ _id: recipeId });

            // Save the user document after removing the recipe
            await user.save();

            console.log('Recipe has been removed');
        } else {
            console.log('User or recipe not found');
        }

        res.redirect('/recipes');
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function editRecipe(req, res) {
    // console.log(req.user);
    const recipeId = req.params.id;
    const user = await Users.findOne({ 'recipes._id': recipeId });
    const recipe = user.recipes.id(recipeId);
    if (user._id.equals(req.user._id)) {
        res.render(`recipes/editRecipes`, { user: req.user, recipe });
    } else {
        res.redirect('/recipes');
    }
    // console.log(recipe);

    // if (user._id.equals(req.user._id)) {
    // res.render(`/recipes/editRecipes`, { user,   recipe });
    // } else {
    //     res.redirect('/recipes');
    // }
}

async function updateRecipe(req, res) {
    const recipeId = req.params.id;
    console.log(req.body);
    try {
        const user = req.user;

        if (user) {
            const recipeToUpdate = user.recipes.id(recipeId);
            recipeToUpdate.set(req.body);

            await user.save();
            console.log('Recipe has been updated');
        } else {
            console.log('User or recipe not found');
        }

        res.redirect(`/recipes/${recipeId}`);
    } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).send('Internal Server Error');
    }
}
