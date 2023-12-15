const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipes-controller');

router.get('/', recipeController.allRecipes);

router.get('/new', recipeController.newRecipe);

router.post('/', recipeController.createRecipe);

router.get('/:id', recipeController.showRecipe);

router.delete('/:id/delete', recipeController.deleteRecipe);

module.exports = router;
