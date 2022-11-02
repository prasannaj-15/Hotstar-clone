

let id;

let searchMovie = document.getElementById("searchMovie");
let container = document.querySelector("#container");
let mContainer = document.querySelector("#mContainer");
let errorDiv = document.querySelector("#errorDiv");
let movieList = document.querySelector("#movieList");
let year_dropdown = document.getElementById('dropdownYear');



// Trending Movies Display onMain Page
async function trendingMovies(){

    try{
        let res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1`);
        let data = await res.json();
        console.log(data.results);
        data = data.results;
        displayTrendingMovieList(data);
    }
    catch(err){
        console.log(err);
    }
}

trendingMovies();


function displayTrendingMovieList(data){

    mContainer.innerHTML = null;

    data.forEach(function(ele, i) {
        let div = document.createElement('div');
        let img = document.createElement('img');
        img.src = `https://www.themoviedb.org/t/p/w220_and_h330_face${ele.poster_path}`;
        let title = document.createElement('h3');
        title.innerText = ele.title;
        let date = document.createElement('p');
        date.innerText = ele.release_date;
        div.append(img,title,date);
        mContainer.append(div);
     
                
    });
}


// Search Movie fetching data using API
async function  getData(searchMovie){
    
    try{
        let res = await fetch(`https://www.omdbapi.com/?s=${searchMovie}&apikey=8733e40a`);
        // let res = await fetch(`https://www.omdbapi.com/?i=tt6194530&apikey=8733e40a`);
        let data = await res.json();
        // console.log(data.Search);
        displayMovieList(data.Search);
        
    }catch(err){
        errorFun();
    }
}

// getData("thor");


function findMovies(){
    let searchTerm = searchMovie.value.toLowerCase();
    console.log(searchTerm);
    container.innerHTML=null;
    if(searchTerm == ""){
        movieList.style.display = "none";
    }
    mContainer.style.display = "grid";
    getData(searchTerm);
    
}

// View selected movie details
async function selectMovie(ele,i){
    movieList.style.display = "none";
    let eleId = ele.imdbID;
    

    try{
        let res1 = await fetch(`https://www.omdbapi.com/?i=${eleId}&apikey=8733e40a`);
        let data1 = await res1.json();
        // console.log(data1);
        movieDetails(data1);
    }
    catch(err){
        console.log(err);
    }
    
}


function displayMovieList(movies){

    mContainer.innerHTML = null;
    // errorDiv.innerHTML=null;
    movieList.innerHTML=null;
    if(movies.length > 0){
        movieList.style.display = "block";
    }
    
    movies.forEach(function(ele, i) {
        let a = document.createElement('a');
        let div = document.createElement('div');
        let img = document.createElement('img');
        img.src = ele.Poster;
        let title = document.createElement('p');
        title.innerText = ele.Title;

        div.append(img,title);
        // mContainer.append(div);
        a.append(div);
        a.addEventListener("click", function(){
            mContainer.style.display = "none";
                    selectMovie(ele,i);
                });
        movieList.append(a);
                
    });

    movies.forEach(function(ele, i) {
        let div = document.createElement('div');
        let img = document.createElement('img');
        img.src = ele.Poster;
        let title = document.createElement('h3');
        title.innerText = ele.Title;
        let year = document.createElement('li');
        year.innerText = `Year : ${ele.Year}`;

        div.append(img,title,year);
        mContainer.append(div);
    });

    
}


function movieDetails(ele){
        
        container.innerHTML=null;

        let div = document.createElement('div');
        div.setAttribute("id", "mdetails");
        let img = document.createElement('img');
        img.src = ele.Poster;
        let div1 = document.createElement('div');
        let title = document.createElement('h2');
        title.innerText = `${ele.Title}`;
        let span = document.createElement("span");
        title.append(span);
        let ul1 = document.createElement('ul');
        let imdb = document.createElement('li');
        imdb.innerText = `IMDb ${ele.imdbRating}`;
           if(ele.imdbRating > 8.5){
            span.innerText = ` Recommended`;
           }else{
            span.style.display = "none";
           } 

        let duration = document.createElement('li');
        duration.innerText = ele.Runtime;
        let year = document.createElement('li');
        year.innerText = `Year : ${ele.Year}`;
        let lang = document.createElement('li');
        lang.innerText = ele.Language;
        
        let plot = document.createElement('p');
        plot.innerText = ele.Plot;

        let ul2 = document.createElement('ul');
        let director = document.createElement('li');
        director.innerText = `Director: ${ele.Director}`;
        let straring = document.createElement('li');
        straring.innerText = `Starring: ${ele.Actors}`;
        let genre = document.createElement('li');
        genre.innerText = `Genre: ${ele.Genre}`;

        ul1.append(imdb,duration,year,lang);
        ul2.append(director,straring,genre);
        div1.append(title,ul1,plot,ul2);
        div.append(img,div1);

        container.append(div);

}

function errorFun(){
    let errimg = document.createElement('img');
    errimg.src = "https://i.makeagif.com/media/11-04-2015/mfnzwt.gif";
    container.innerHTML=null;
    container.append(errimg);
}


function debounce(func, delay){

    if(id){
        clearTimeout(id);
    }

    id = setTimeout(function(){
        func(); //calling findMovie()
    },delay);

}


// Filter year movie



    // var date = new Date();
    // let year = date.getFullYear();
    // let current_year = year;
    // for(let i=1990; i< current_year;i++){
    //     let sel = document.createElement('option');
    //     if(i == current_year){     
    //         sel.setAttribute("selected value" , i);
    //         sel.innerText = i;
    //         year_dropdown.append(sel);
    //         // console.log(sel);
    //     }else{
    //         sel.setAttribute("value" , i);
    //         sel.innerText = i;
    //         year_dropdown.append(sel);
    //     }
        
    // }

// Date dropdown functionality
    // function getYearFunc(){
    //     let item = year_dropdown.value;
    //     console.log(item);             
    // } 

