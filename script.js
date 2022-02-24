let input = document.getElementById('input');
let search = document.getElementById('searchBtn');
let container = document.getElementById('container');
let nextprev = document.getElementById('nextprev');

const apiURL = 'https://api.lyrics.ovh';
async function searchSongs(term){
   
let res=await fetch(`${apiURL}/suggest/${term}`);
let data=await res.json();
console.log(data);
showData(data);
}

function showData(data){
container.innerHTML='';
let element="";
data.data.forEach(ele=>{
    element+=`<li>
    <span>${ele.artist.name}</span>
    <button class="btn"  type="button" onclick="getLyrics('${ele.artist.name}','${ele.title}')">Get Lyrics</button>
</li>`
})
let result=`<ul>${element}</ul>`
container.innerHTML=result;
nextprev.innerHTML='';
if(data.prev){
    nextprev.innerHTML+=`<button class="btn" id="prev" onclick="getmoreSongs('${data.prev}')">Prev</button>`;
}
if(data.next){
    nextprev.innerHTML+=`<button class="btn" id="next" onclick="getmoreSongs('${data.next}')">Next</button>`;
}
}
async function getmoreSongs(url){
let res=await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
let data=await res.json();
showData(data);
}
async function getLyrics(artist,title){
let res=await fetch(`${apiURL}/v1/${artist}/${title}`);
let data=await res.json();
container.innerHTML=data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
}

search.addEventListener('click', e => {
    e.preventDefault();
    let term =input.value.trim();
    searchSongs(term);
    input.value='';
})