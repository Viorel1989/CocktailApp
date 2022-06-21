var express = require("express");
const axios = require("axios").default;
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/", function (req, res, next) {
  console.log(req.body.alcoholic);
  console.log(req.body.nonAlcoholic);
  const cocktailName = req.body.cocktailName;
  console.log(cocktailName);
  if (cocktailName === "") {
    res.render("index", { cocktailName: cocktailName });
  } else {
    console.log("call cocktail api");

    axios
      .get("http://www.thecocktaildb.com/api/json/v1/1/search.php", {
        params: {
          s: cocktailName,
          api_key: 1,
        },
      })
      .then(function (response) {
        // console.log(response);
        let result = [];
        let description = response.data.drinks[0];
        let instructions = description.strInstructions;
        let pic = description.strDrinkThumb;

        const ingredients = Object.keys(description)
          .filter((key) => key.includes("strIngredient"))
          .reduce((obj, key) => {
            return Object.assign(obj, {
              [key]: description[key],
            });
          }, {});
        const ingredientsNames = Object.values(ingredients).filter(function (
          el
        ) {
          return el != null;
        });
        // console.log(ingredientsNames);

        const measures = Object.keys(description)
          .filter((key) => key.includes("strMeasure"))
          .reduce((obj, key) => {
            return Object.assign(obj, {
              [key]: description[key],
            });
          }, {});
        const measuresNames = Object.values(measures);
        // console.log(measuresNames);

        let receipe = "";
        for (let i = 0; i < ingredientsNames.length; i++) {
          if (ingredientsNames[i] && measuresNames[i]) {
            receipe = receipe + `${ingredientsNames[i]}(${measuresNames[i]})`;
          } else if (ingredientsNames[i] && !measuresNames[i]) {
            receipe = receipe + `${ingredientsNames[i]}`;
          }
        }
        // console.log(receipe);

        if (req.body.alcoholic) {
          response.data.drinks.forEach((drink) => {
            if (drink.strAlcoholic == "Alcoholic") {
              const cocktail = `${drink.strDrink}`;
              result.push(cocktail);
            }
          });
        } else if (req.body.nonAlcoholic) {
          response.data.drinks.forEach((drink) => {
            if (drink.strAlcoholic == "Non alcoholic") {
              const cocktail = `${drink.strDrink}`;
              result.push(cocktail);
            }
          });
        } else {
          response.data.drinks.forEach((drink) => {
            const cocktail = `${drink.strDrink}`;
            result.push(cocktail);
          });
        }

        if (req.xhr) {
          res.json({ instructions: instructions, pic: pic, receipe: receipe });
        } else {
          res.render("index", {
            cocktail: result,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        res.render("index", { err: Error });
      });
  }
});

module.exports = router;
