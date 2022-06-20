$(document).on("click", ".cocktailAnchor", function () {
  const cocktailName = $(this).data("cocktail-name");
  function showDescription(data) {
    const descriptionHeaderId = "descriptionHeader";

    if (!$("#" + descriptionHeaderId).length) {
      $(`
        <h5 class="mt-3" id ="' + ${descriptionHeaderId} + '">Description</h5>
        <p>${data.instructions}</p>
        <img src=${data.pic} />
        <p>${data.receipe}</p>
        `).insertAfter("#cocktailsList");
    }
  }

  $.ajax({
    type: "POST",
    url: "/",
    dataType: "json",
    data: JSON.stringify({ cocktailName: cocktailName }),
    contentType: "application/json",
    success: showDescription,
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
});
