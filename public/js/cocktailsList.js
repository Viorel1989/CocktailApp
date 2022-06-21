$("#ingredientsForm").click(function () {
    let ingredients = []

    (function() {
        let url = $('input[type="chceckbox]')
                    .filter(':checked')
                    .toArray()
            console.log(url)
    })

// $("#ingredientsForm").click(function () {
//   $.getJSON("/mix", function (data) {
//     $(
//       '<h3 id="cocktailsByIngredientHeader">Here is a list of cocktails you may like</h3'
//     ).insertAfter("#ingredientsForm");
//     $(
//       '<ul "list-group list-group-flush" id="cocktailsByIngredient"></ul>'
//     ).insertAfter("cocktailsByIngredientHeader");
//     $.each(data.result, function (i, result) {
//       $("#cocktailsByIngredient").append(
//         '<li class="list-group-item">' + result + "</li>"
//       );
//     });
//   });
// });
