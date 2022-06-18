var express = require("express");
const axios = require("axios").default;
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/", function (req, res, next) {
  const cocktailName = req.body.cocktailName;

  console.log("call cocktail api");

  axios
    .get("http://www.thecocktaildb.com/api/json/v1/1/search.php", {
      params: {
        s: cocktailName,
        api_key: 1,
      },
    })
    .then(function (response) {
      let result = [];

      response.data.drinks.forEach((drink) => {
        const cocktail = `${drink.strDrink}`;
        result.push(cocktail);
      });
      res.render("index", { cocktail: result });
    })

    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
