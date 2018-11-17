$(document).ready(function () {

    $("button").on("click", function () {
        
    });

    var animals = ["cat", "dog", "tiger"];
    function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < animals.length; i++) {
            var a = $("<button>");
            a.addClass("animal-btn");
            a.attr("data-animal", animals[i]);
            a.text(animals[i]);
            $("#buttons-view").append(a);
        }
    }
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        animals.push(animal);
        renderButtons();
    });

    $(document).on("click", ".animal-btn", function() {
        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                $("#gifs-appear-here").empty();
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var animalImage = $("<img>");
                    animalImage.attr("src", results[i].images.fixed_height.url);
                    gifDiv.append(p);
                    gifDiv.append(animalImage);
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            });
    })


    renderButtons();


})
