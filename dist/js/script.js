let pokemonRepository=function(){let e=[],t="https://pokeapi.co/api/v2/pokemon/?limit=150";let n=document.querySelector(".loading-message");function o(){n.innerText="Loading pokemons...please wait"}function i(){n.style.display="none"}function a(t){"object"==typeof t&&"name"in t&&"detailsUrl"in t?e.push(t):document.write("<p>Error adding item, item needs to be an object and have the required 3 properties</p>")}document.querySelector("#modal-container");let r=document.querySelector(".pokemon-list"),l=document.querySelector(".search-button"),c=document.querySelector(".search-input");function s(){let t=c.value.toLowerCase(),n=e.map(function(e){return e.name.toLowerCase()}).indexOf(t);null!==t&&p(e[n])}function d(t){let n=$(".modal-body"),o=$(".modal-title");o.empty(),n.empty();let i=$('<h1 class="text-capitalize">'+t.name+"</h1>"),a=$('<img class="modal-img">');a.attr("src",t.imageUrl);let r=$("<p>Height: "+t.height+"</p><p>Weight: "+t.weight+"kg </p><p>Types : </p>");o.append(i),n.append(a),n.append(r),t.types.forEach(e=>{let t=document.createElement("span");t.innerText=e.type.name+" | ",n.append(t)});let l=$(".btn-left");$(".btn-right").on("click",s),l.on("click",d);let c=e.indexOf(t)+1;function s(){nextPokemon=e[c+1],p(nextPokemon)}function d(){c<=1||(prevPokemon=e[c-2],p(prevPokemon))}document.addEventListener("keyup",e=>{"ArrowRight"===e.key&&s()}),document.addEventListener("keyup",e=>{"ArrowLeft"===e.key&&d()})}function p(e){pokemonRepository.loadDetails(e).then(function(){d(e)})}return c.addEventListener("keyup",function(){let e=document.querySelectorAll(".pokemon-list li"),t=c.value.toLowerCase();for(let n=0;n<e.length;n++){let o=e[n];(o=o.innerText||o.textContent).toLowerCase().indexOf(t)>-1?(e[n].style.display="",e[n].classList.add("first")):e[n].style.display="none"}}),l.addEventListener("click",s),l.dataset.toggle="modal",l.dataset.target="#modal-container",window.addEventListener("keydown",e=>{"Enter"===e.key&&s()}),{getAll:function(){return e},add:a,addListItem:function(e){let t=document.createElement("li");t.classList.add("group-list-item"),r.appendChild(t);let n=document.createElement("button");n.innerText=e.name,n.classList.add("btn","btn-primary"),n.dataset.toggle="modal",n.dataset.target="#modal-container",t.appendChild(n),n.addEventListener("click",function(){p(e)})},showDetails:p,loadList:function(){return o(),fetch(t).then(function(e){return e.json()}).then(function(e){i(),e.results.forEach(function(e){let t=e.name;a({name:t=t.charAt(0).toUpperCase()+t.slice(1),detailsUrl:e.url})})}).catch(function(e){i(),console.error(e)})},loadDetails:function(e){o();let t=e.detailsUrl;return fetch(t).then(function(e){return e.json()}).then(function(t){i(),e.imageUrl=t.sprites.other.dream_world.front_default,e.height=t.height,e.types=t.types,e.weight=t.weight}).catch(function(e){i(),console.error(e)})},showModal:d,search:s}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});
