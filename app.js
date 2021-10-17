var express = require("express");
const DB = require("./data");

var app = express();
app.use(express.json());

app.get("/url", (req, res, next) => {
    res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});

app.get("/recipes", (req, res, next) => {
    // original simple way
    // var result = data.recipes.map(function (recipe) {
    //     return recipe.name;
    // });
    // res.json(result);

    console.log(DB);
    var recipes = DB.all();
    var recipeNames = recipes.map(recipe => recipe.name);
    res.json({ recipeNames });
});

app.get("/recipes/details/:name", (req, res, next) => {
    // var id = data.recipes.map( recipe => recipe.name);
    // const { name } = req.params;
    var name = req.params.name;
    var recipe = DB.find(name);
    
    if (!recipe) {
        return res.json({});
    }
    var details = {};
    let steps = recipe.instructions.length;
    let ingredients = recipe.ingredients;
    console.log(steps);
    console.log(ingredients);
    details = { ingredients: ingredients, numSteps: steps };
    res.json({ details });
});

app.post("/recipes", (req, res, next) => {
    var name = req.body.name;
    var recipe = DB.find(name);
    if (!!recipe) {
        return res.status(400).json({error: 'Recipe already exists'})
    }
    DB.add(req.body);
    res.status(201).send("");
});

app.put("/recipes", (req, res, next) => {
    var name = req.body.name;
    var recipe = DB.find(name);
    if (!!recipe) {
        DB.update(req.body);
        res.status(204).send("");
    } else {
        return res.status(404).json({error: 'Recipe does not exist'})
    }
});

app.delete("/recipes/:name", (req, res, next) => {
    var name = req.params.name;
    var recipe = DB.find(name);
    if (!!recipe) {
        DB.delete(name);
        res.status(204).send("");
    } else {
        return res.status(404).json({error: 'Recipe does not exist'})
    }
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});