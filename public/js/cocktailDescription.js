$(document).on("click", ".cocktailAnchor", function () {
  const cocktailName = $(this).data("cocktail-name");
  function showDescription(data) {
    $("#descriptionSection").empty();
    $(`
      <div id="descriptionSection">
      <h5 class="mt-3">Description</h5>
      <p>${data.instructions}</p>
      <img src=${data.pic} width="800" height="600"/>
      <p class="mt-3 mb-5" id="receipeParagraph">${data.receipe}</p>
      </div>
      `).insertAfter("#cocktailsList");
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
