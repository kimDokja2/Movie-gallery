
//Sensei, no quería crearme una cuenta en RapidApi-Key porque tiene un limite de intentos, asi que busqué otra API de películas en TMDB. No me jale sensei 😭 
const baseUrl="https://api.themoviedb.org/3";
const apiKey="api_key=45a21631d0f43cfa02f7de25037a5536";

//para peliculas má populares
const apiUrl=baseUrl+"/discover/movie?sort_by=popularity.desc&"+apiKey+"&language=es-ES";



const imgUrl="https://image.tmdb.org/t/p/w500"


//ejemplos para luego guiarme como construir los URL
const URL2="https://api.themoviedb.org/3/search/movie?api_key=45a21631d0f43cfa02f7de25037a5536&query=woman&language=es-ES"
const URL="https://api.themoviedb.org/3/movie/popular?api_key=45a21631d0f43cfa02f7de25037a5536&language=es-ES&page=1"



const container=document.querySelector(".container");
async function obtenerPeliculas(url){
    const respuesta= await fetch(url);
    const data= await respuesta.json();
    const peliculas=data.results;
    console.log(peliculas);
    container.innerHTML = ""; 
    peliculas.forEach((pelicula, index) => {
       container.innerHTML += `
       <div class="peli-item">
           <div class="img-item">
                <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path} " alt="imagen">
                <div class="efecto-hover">
                <i class="fa-regular fa-circle-play"></i>
                </div>  
            </div> 
            <h4 class="titulo-item">${pelicula.title}</h4> 
       </div>
         
       `;
    });
}

async function generarTop5Carrusel(url){
    const respuesta= await fetch(url);
    const data= await respuesta.json();
    const peliculas=data.results;

    const carrusel=document.querySelector(".carrusel-peliculas")
    carrusel.innerHTML="";
    for(let index=0 ; index<5 ;index++){
        carrusel.innerHTML+=`<div class="bg-top${index+1} "> 
            
            <h1 class="titulo-peli">${peliculas[index].title}</h1>
            <span class="puntaje ">${peliculas[index].vote_average} </span>
            <p class="descripcion ">${peliculas[index].overview}</p>
            <a class="btn-ver" href="#">
            <i class="fa-solid fa-play"></i>
            Ver Película
            </a>
            
        </div>
        `;
    }
    //no encotre la forma de generarlos con un maldito for ya que no puedo usar el ${}dentro del .querySelector("${}") 😭😭😭
    document.querySelector(".bg-top1").style.backgroundImage = `url('https://image.tmdb.org/t/p/original${peliculas[0].backdrop_path}'`;
    document.querySelector(".bg-top2").style.backgroundImage = `url('https://image.tmdb.org/t/p/original${peliculas[1].backdrop_path}'`;
    document.querySelector(".bg-top3").style.backgroundImage = `url('https://image.tmdb.org/t/p/original${peliculas[2].backdrop_path}'`;
    document.querySelector(".bg-top4").style.backgroundImage = `url('https://image.tmdb.org/t/p/original${peliculas[3].backdrop_path}'`;
    document.querySelector(".bg-top5").style.backgroundImage = `url('https://image.tmdb.org/t/p/original${peliculas[4].backdrop_path}'`;
    }
    

//---------------carrusel--------------------    
const bolas=document.querySelectorAll(".bola");
const carrusel=document.querySelector(".carrusel");
let pos=0;
bolas.forEach(
    (bola, index)=>{
        
    bola.addEventListener( "click", ()=>{
        document.querySelector(".active").classList.remove("active");
        bola.classList.add("active");
        pos=index;
        carrusel.scrollLeft=carrusel.offsetWidth*index;
    })

});

function nextActive(){
            bolas[pos].classList.remove("active");
            if (pos<4){
                bolas[pos+1].classList.add("active");
                carrusel.scrollLeft=carrusel.offsetWidth*(pos+1);
                pos+=1;    
            }else{
                bolas[0].classList.add("active");
                carrusel.scrollLeft=carrusel.offsetWidth*(0);
                pos=0;  
            }
};
let intervaloID=null;
intervaloID=setInterval(nextActive,3500);



generarTop5Carrusel(apiUrl);
obtenerPeliculas(apiUrl);

