$("#ingredientsForm").submit(function (e) {
  let ingredients = $("input[name='ingredients']").serializeArray();
  console.log(ingredients);
  if (ingredients.length === 0) {
    e.preventDefault();
    $("#ingredientsFeedback").css("display", "inline");
  }
});
