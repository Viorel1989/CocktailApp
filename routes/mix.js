var express = require("express");
const axios = require("axios").default;
var router = express.Router();

/* GET users listing. */
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

module.exports = router;
