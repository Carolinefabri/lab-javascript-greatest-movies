// Iteration 1: All directors? - Get the array of all directors.
// Bonus: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    const directors = moviesArray.map((movie) => movie.director);
    const uniqDirectors = [...new Set(directors)];
    return uniqDirectors;
}

/* Set não permite elementos duplicados.

[...new Set(directors)]: O operador de propagação (spread operator) ...
 é usado para desestruturar o conjunto retornado por Set(directors). 
 Isso significa que os elementos do conjunto são extraídos e formam um novo array.
 [...new Set(directors)] cria um novo array chamado uniqDirectors contendo apenas os
  diretores únicos presentes no array directors. Ao utilizar o Set para eliminar duplicatas e, 
  em seguida, o operador de propagação para transformar o conjunto em um array, 
 garantimos que cada diretor apareça apenas uma vez no resultado final.
 */


// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    const StevenSpielbergDramaMovies = moviesArray.filter((movie) => 
       movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
    );

return StevenSpielbergDramaMovies.length;

}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
if (!moviesArray.length){
    return 0;
}
const sum = moviesArray.reduce((acc , movie) => {
    if(movie.score) {
        acc += movie.score;
    }
    return acc;
},0);

return Math.round((sum/moviesArray.length)* 100) / 100;

}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
const dramaMovies = moviesArray.filter ((movie) =>
movie.genre.includes ("Drama")
);
return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    const copy = moviesArray.slice(0);
    const sortedMovies = copy.sort((moviesA, movieB) => {
      if (moviesA.year === movieB.year) {
        return moviesA.title.localeCompare(movieB.title);
      }
      return moviesA.year - movieB.year;
    });
  
    return sortedMovies;
  }

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {

    const copy = moviesArray.slice(0);
  const titles = copy.map((movie) => movie.title);
  const sortedTitles = titles.sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });
  return sortedTitles.slice(0, 20);
}



/// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    return moviesArray.map((movie) => {
      const times = movie.duration.split(" ");
      const hours = times[0].replace("h", "");
      let result = Number(hours) * 60;
      if (times[1]) {
        const minutes = times[1].replace("min", "");
        result += Number(minutes);
      }
      // const movieCopy = { ...movie };
      // const movieCopy = structuredClone(movie);
      const movieCopy = {};
      for (let key in movie) {
        movieCopy[key] = movie[key];
      }
      movieCopy.duration = result;
  
      return movieCopy;
    });
  }
  
  // BONUS - Iteration 8: Best yearly score average - Best yearly score average
  function bestYearAvg(moviesArray) {
    if (!moviesArray.length) {
      return null;
    }
  
    const moviesByYear = moviesArray.reduce((acc, movie) => {
      if (acc[movie.year]) {
        acc[movie.year].push(movie);
      } else {
        acc[movie.year] = [movie];
      }
      return acc;
    }, {});
  
    const years = Object.keys(moviesByYear);
  
    let bestYear = years.reduce((prevResult, year) => {
      const avgScore = scoresAverage(moviesByYear[year]);
      const result = { year, score: avgScore };
      if (!Object.keys(prevResult).length) {
        return result;
      }
      if (avgScore > prevResult.score) {
        return result;
      }
      if (avgScore === prevResult.score && year < prevResult.year) {
        return result;
      }
      return prevResult;
    }, {});
  
    return `The best year was ${bestYear.year} with an average score of ${bestYear.score}`;
  }