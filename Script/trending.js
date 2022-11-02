

let trendcontainer = document.querySelector('#trendcontainer');

async function trendingMovies(){

    try{
        let res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1`);
        let data = await res.json();
        console.log(data.results);
        data = data.results;
        displayMovieList(data);
    }
    catch(err){
        console.log(err);
    }
}

trendingMovies();


function displayMovieList(data){

    trendcontainer.innerHTML = null;

    data.forEach(function(ele, i) {
        let div = document.createElement('div');
        let img = document.createElement('img');
        img.src = `https://www.themoviedb.org/t/p/w220_and_h330_face${ele.poster_path}`;
        let title = document.createElement('h3');
        title.innerText = ele.title;
        let date = document.createElement('p');
        date.innerText = ele.release_date;
        div.append(img,title,date);
     trendcontainer.append(div);
     
                
    });
}