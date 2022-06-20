var express = require("express");
const { render } = require("pug");
const axios = require("axios").default;
var router = express.Router();

/* GET ingredients listing. */
router.get("/", function (req, res, next) {
  axios
    .get("http://www.thecocktaildb.com/api/json/v1/1/list.php?i=list", {
      params: {
        api_key: 1,
      },
    })
    .then(function (response) {
      console.log(response.data.drinks);
      let result = [];

      response.data.drinks.forEach((drink) => {
        const ingredient = `${drink.strIngredient1}`;
        result.push(ingredient);
      });
      res.render("mix", { ingredient: result });
    })

    .catch(function (error) {
      console.log(error);
    });
});

router.post("/", function (req, res, next) {
  const { ingredients } = req.body;
  console.log(ingredients);

  let params = new URLSearchParams();
  for (let x = 0; x < ingredients.length; x++) {
    params.append("i", ingredients[x]);
  }
  params.append("api_key", "1");
  console.log(params.toString());
  axios
    .get("http://www.thecocktaildb.com/api/json/v1/1/filter.php", { params })
    .then(function (response) {
      console.log(response.data.drinks);
      let cocktails = [];

      response.data.drinks.forEach((drink) => {
        const cocktail = `${drink.strDrink}`;
        cocktails.push(cocktail);
      });
      console.log(cocktails);

      res.render("mixList", { cocktailsList: cocktails });
    })

    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
