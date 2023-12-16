const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipes-controller');

const ensureLoggedin = require('../config/ensureLoggedin');

router.get('/', recipeController.allRecipes);

router.get('/new', ensureLoggedin, recipeController.newRecipe);

router.post('/', ensureLoggedin, recipeController.createRecipe);

router.get('/:id', recipeController.showRecipe);

router.delete('/:id/delete', ensureLoggedin, recipeController.deleteRecipe);

router.get('/:id/edit', ensureLoggedin, recipeController.editRecipe);

router.put('/:id', ensureLoggedin, recipeController.updateRecipe);

module.exports = router;
