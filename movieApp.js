// id to keep track of which element to remove (this would be better not in global scope)
let currentId = 0;

// list of all of movies in memory for sorting / repainting
let moviesList = [];

// let sortMovie = true;
// let sortByRating = true;

let sortedMovie = [];

$(function() {
    // when you click the delete button, remove the closest parent tr
  
    $("#new-movie-form").on("submit", function(evt) {
        evt.preventDefault();
        let title = $("#movie-name").val();
        let rating = $("#movie-rating").val();

        let movieData = { title, rating, currentId };
        console.log(movieData);
        const HTMLtoAppend = createMovieDataHTML(movieData);

        currentId++
        moviesList.push(movieData);

        $("#movie-data").append(HTMLtoAppend);
        $("#new-movie-form").trigger("reset");

    });
  
    // when the delete button is clicked, remove the closest parent tr and remove from the array of movies
  
    $("tbody").on("click", ".btn.btn-danger", function(evt) {
        let indexToRemoveAt = +evt.target.id;
        // find the index where this movie is

        // ??? What does the below line of code mean 
        // let indexToRemoveAt = moviesList.findIndex(movie => movie.currentId === +$(evt.target).data("deleteId"));

        moviesList = moviesList.filter(function(obj){
            // console.log(indexToRemoveAt);
            // ?? why won't this filter!!
            return obj.currentId !== indexToRemoveAt;
        });
        // moviesList.splice(indexToRemoveAt, 1)
        // console.log(moviesList);

        // remove it from the DOM
        $(evt.target)
        .closest("tr")
        .remove();

    });

    $(".fas").on("click", function(evt){

        let direction = $(evt.target).hasClass("fa-sort-down") ? "down" : "up";
        let keyToSortBy = $(evt.target).attr("id");
        let sortedMoviesList = sortBy(moviesList, keyToSortBy, direction);

        // empty the table
        $("#movie-data").empty();

        for (let movie of sortedMoviesList){
            const HTMLtoAppend = createMovieDataHTML(movie);
            $("#movie-data").append(HTMLtoAppend);
        };

        // if there is bottom arrow, it will be removed. 
        // if there isn't bottom arrow, it will be added.
        $(evt.target).toggleClass("fa-sort-down");

        // if there is up arrow, it will be removed. 
        // if there isn't up arrow, it will be added.
        $(evt.target).toggleClass("fa-sort-up");
    });
});
  
function createMovieDataHTML(data) {
    return `
    <tr>
        <td>${data.title}</td>
        <td>${data.rating}</td>
        <td>
            <button class="btn btn-danger" data-delete-id=${data.currentId} id=${data.currentId}>
            Delete
            </button>
        </td>
    <tr>
    `;
}

function sortBy(arr, keyToSortBy, direction){
    return arr.sort(function(a,b){
        // changes string to numbers
        if(keyToSortBy === "rating"){
            a[keyToSortBy] = +a[keyToSortBy];
            b[keyToSortBy] = +b[keyToSortBy];
        }
        if(a[keyToSortBy] < b[keyToSortBy]){
            return direction === "up" ? -1 : 1;
        }
        else if(a[keyToSortBy] > b[keyToSortBy]){
            return direction === "up" ? 1 : -1;
        }
        // if both values are the same
        return 0;
    });
}

// function sortRating(){
//     // sort by rating
//     if (!sortByRating){
//         moviesList.sort(function(a,b){
//             return a.rating - b.rating;
//         })

//         // remove existing table data
//         $("#movie-data tr").remove();

//         for (let movie of moviesList){
//             let movieData = movie;
//             const HTMLtoAppend = createMovieDataHTML(movieData);
    
//             // moviesList.push(movieData);
    
//             $("#movie-data").append(HTMLtoAppend);
//         }
//         sortByRating = true;
//     }

//     else if (sortByRating){
//         moviesList.sort(function(a,b){
//             return b.rating - a.rating;
//         })
        
//         // remove existing table data
//         $("#movie-data tr").remove();

//         for (let movie of moviesList){
//             let movieData = movie;
//             const HTMLtoAppend = createMovieDataHTML(movieData);
    
//             // moviesList.push(movieData);
    
//             $("#movie-data").append(HTMLtoAppend);
//         }
//         sortByRating = false;
//     }
// }

// function sortName(){
//     // sort by name
//     if (sortMovie){
//         moviesList.sort(function(a,b){
//             const movieA = a.title.toUpperCase();
//             const movieB = b.title.toUpperCase();
//             if(movieA < movieB){
//                 return -1;
//             }
//             if(movieA > movieB){
//                 return 1;
//             }
//             // names must be equal
//             return 0;
//         })

//         // remove existing table data
//         $("#movie-data tr").remove();

//         for (let movie of moviesList){
//             let movieData = movie;
//             const HTMLtoAppend = createMovieDataHTML(movieData);
    
//             // moviesList.push(movieData);
    
//             $("#movie-data").append(HTMLtoAppend);
//         }
//         sortMovie = false;
//     }

//     else if (!sortMovie) {
//         moviesList.sort(function(a,b){
//             const movieA = a.title.toUpperCase();
//             const movieB = b.title.toUpperCase();
//             if(movieA < movieB){
//                 return 1;
//             }
//             if(movieA > movieB){
//                 return -1;
//             }
//             // names must be equal
//             return 0;
//         })

//         // remove existing table data
//         $("#movie-data tr").remove();

//         for (let movie of moviesList){
//             let movieData = movie;
//             const HTMLtoAppend = createMovieDataHTML(movieData);
    
//             // moviesList.push(movieData);
    
//             $("#movie-data").append(HTMLtoAppend);
//         }
//         sortMovie = true;
//     }
// }
