let data = {
    "recipes": [
      {
        "name": "scrambledEggs",
        "ingredients": [
          "1 tsp oil",
          "2 eggs",
          "salt"
        ],
        "instructions": [
          "Beat eggs with salt",
          "Heat oil in pan",
          "Add eggs to pan when hot",
          "Gather eggs into curds, remove when cooked",
          "Salt to taste and enjoy"
        ]
      },
      {
        "name": "garlicPasta",
        "ingredients": [
          "500mL water",
          "100g spaghetti",
          "25mL olive oil",
          "4 cloves garlic",
          "Salt"
        ],
        "instructions": [
          "Heat garlic in olive oil",
          "Boil water in pot",
          "Add pasta to boiling water",
          "Remove pasta from water and mix with garlic olive oil",
          "Salt to taste and enjoy"
        ]
      },
      {
        "name": "chai",
        "ingredients": [
          "400mL water",
          "100mL milk",
          "5g chai masala",
          "2 tea bags or 20 g loose tea leaves"
        ],
        "instructions": [
          "Heat water until 80 C",
          "Add milk, heat until 80 C",
          "Add tea leaves/tea bags, chai masala; mix and steep for 3-4 minutes",
          "Remove mixture from heat; strain and enjoy"
        ]
      }
    ]
};

const DB = {};
DB.all = function() {
    return data.recipes;
}

DB.find = function(name) {
    for (let i = 0; i < data.recipes.length; i++) {
        if (name == data.recipes[i].name) {
            return data.recipes[i];
        }
    }
    return undefined;
}

DB.add = function(recipe) {
    data.recipes.push(recipe);
}

DB.update = function(recipe) {
    var currentRecipe = DB.find(recipe.name);
    currentRecipe.ingredients = recipe.ingredients;
    currentRecipe.instructions = recipe.instructions;
    console.log(currentRecipe);
}

DB.delete = function(name) {
    for (let i = 0; i < data.recipes.length; i++) {
        console.log(`name: ${name}, data.recipe: ${data.recipes[i].name}`)
        if (name == data.recipes[i].name) {
            data.recipes.splice(i, 1);
            console.log(i);
            break;
        }

    }
}

module.exports = DB;