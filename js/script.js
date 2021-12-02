let pokemonRepository = (function(){

    let pokemonList = [];

let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Other functions remain here

  //fetching the api
    function loadList() {
      //loading message
    showLoadingMessage();
      //fetch data
    return fetch(apiUrl)
      .then(function (response) {
    return response.json();
    })
      .then(function (json) {
        //hide loading message
    hideLoadingMessage();
    json.results.forEach(function (item) {

      //convert pokemon names to uppercase
        let pokeName = item.name;
        
        pokeName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
        let pokemon = {
        name: pokeName,
        detailsUrl: item.url
        };
    add(pokemon);
    
      });

      //find the index of a pokemon by its name
      const index = (element)=> element.name === "Raticate"
      console.log(pokemonList.findIndex(index));
      
      /*let current = pokemonList[0]
      let next = pokemonList[0 + 1]  
      console.log(current)
      let next1 = pokemonList[1]
      console.log(next)*/

    })
    .catch(function (e) {
        //hide loading message
    hideLoadingMessage();
    console.error(e);
    })
  };

  //load pokemon detail 
    function loadDetails(pokemon, nextPoke, prevPoke){
    //show loading message
      showLoadingMessage();
    let url = pokemon.detailsUrl;
      return fetch(url).then(function(response){
      return response.json();
    })
        .then(function(details){
        //hide loading message
      hideLoadingMessage();
        //now we add the details to the item
        pokemon.imageUrl = details.sprites.front_shiny;
        pokemon.height = details.height;
        pokemon.types = details.types;
        
        
       let index1 = pokemonList.indexOf(pokemon)
       let next1 = index1 + 1;
       let prev1 = index1 - 1;
      //get the next pokemon details in the console
      nextPoke = pokemonList[next1]
      nextPoke.imageUrl = details.sprites.front_shiny;
      nextPoke.height = details.height;
       nextPoke.types = details.types;
      console.log(nextPoke);
      let prevPoke = pokemonList[prev1]
      prevPoke.imageUrl = details.sprites.front_shiny;
      prevPoke.height = details.height;
       prevPoke.types = details.types;
      console.log(prevPoke);

      
    }).catch(function(e){
        //hide loading message
        hideLoadingMessage();
        console.error(e);
    });
};


function getAll() {
      return pokemonList;
    };

//message on load 
let loadingMessage = document.querySelector(".loading-message");

function showLoadingMessage(){
loadingMessage.innerText = "Loading pokemons...please wait"
};

function hideLoadingMessage(){
loadingMessage.classList.add("remove");
};

function add(pokemon) {

    //adding typeof() to only allow addition of objects to the pokemonList  
    //let itemAttributes = Object.keys(pokemon)
    //const safeAttributes = ["name", "height", "types"]
          if(
              typeof(pokemon) === "object" &&
                "name" in pokemon &&
                "detailsUrl" in pokemon)  
            
            //safeAttributes.every(function(attr){
                //return attr in pokemon}))
              
          {
        pokemonList.push(pokemon)
          } else{
              document.write("<p>Error adding item, item needs to be an object and have the required 3 properties</p>")
          }
    };

//modal container(background)
    let modalContainer = document.querySelector("#modal-container");

    //make new function to show the pokemon modal on click 
    function showModal(pokemon, nextPoke, prevPoke){
    //remove modalContainer content
        modalContainer.innerHTML = ''
        
    //modal window (pokemon details)  
        let modal = document.createElement('div');
        modal.classList.add('modal');      

    //creating a child element containing the "close", "<", and ">" buttons
        let modalButtonsFlex = document.createElement("div");
        modalButtonsFlex.classList.add("modal-buttons");
        modal.appendChild(modalButtonsFlex);
    //swipe left button
        let swipeButtonLeft = document.createElement("button");
        swipeButtonLeft.classList.add("swipe-left", "button");
        swipeButtonLeft.innerText = "<";
        modalButtonsFlex.appendChild(swipeButtonLeft);
    //swipeButtonLeft.addEventListener("click", nextSibling)
    //close button
        let modalButtonClose = document.createElement('button');
        modalButtonClose.classList.add('close-modal', "button");
        modalButtonClose.innerText = "Close";
        modalButtonClose.addEventListener('click', hideModal);
        modalButtonsFlex.appendChild(modalButtonClose);
    //swipe right
        let swipeButtonRight = document.createElement("button");
        swipeButtonRight.classList.add("swipe-right", "button");
        swipeButtonRight.innerText = ">";
        modalButtonsFlex.appendChild(swipeButtonRight);
        //event listener for buttons
   swipeButtonRight.addEventListener("click", next);
     //    swipeButtonLeft.addEventListener("click", swipeModal(0));
    
   /* let current = pokemon.name;
        let findIndex = (element)=> element.name === current
        let index = pokemonList.findIndex(findIndex);
        console.log(index)
        //or with indexOf
       let index1 = pokemonList.indexOf(pokemon)

       let next1 = index1 + 1;
       let prev1 = index1 - 1;
      //get the next pokemon details in the console
      let nextPoke = pokemonList[next1]
      nextPoke = {
        name: pokemonList[next1].name,
        detailsUrl: pokemonList[next1].detailsUrl,
        }
      console.log(nextPoke.detailsUrl);*/
        
     // pokemon.imageUrl = details.sprites.front_shiny;
       // pokemon.height = details.height;
        //pokemon.types = details.types;
      //let getPrevPokeByIndex = pokemonList[prev1]
      //console.log(getPrevPokeByIndex)
        let index1 = pokemonList.indexOf(pokemon)
       let next1 = index1 + 1;
       let prev1 = index1 - 1;
      //get the next pokemon details in the console
      nextPoke = pokemonList[next1]
      
      console.log(nextPoke);
      prevPoke = pokemonList[prev1]
     
      console.log(prevPoke);
      function next(){
         //pokemon name (title)
        modalTitle.innerText = nextPoke.name;
    //modal content (pokemon image)
        modalImg.src = nextPoke.imageUrl;
    //modal content (height)
       modalPokemonInfo.innerHTML = ("<p>Height: " + nextPoke.height + "</p>" + "<p>Types: ")
    //modal content types
    //foreach loop on types
        nextPoke.types.forEach(item => {
       let pokeTypes = document.createElement('span');
        pokeTypes.innerText = item.type.name + " | ";
    });
      };


     //pokemon name (title)
        let modalTitle = document.createElement('h1');
        modalTitle.innerText = pokemon.name;
        modal.appendChild(modalTitle);
    //modal content (pokemon image)
        let modalImg = document.createElement("img");
        modalImg.src = pokemon.imageUrl;
        modal.appendChild(modalImg);
    //modal content (height)
        let modalPokemonInfo = document.createElement("p");
        modalPokemonInfo.innerHTML = ("<p>Height: " + pokemon.height + "</p>" + "<p>Types: ")
        modal.appendChild(modalPokemonInfo);
    //modal content types
    //foreach loop on types
        pokemon.types.forEach(item => {
        let pokeTypes = document.createElement('span');
        pokeTypes.innerText = item.type.name + " | ";
         modal.appendChild(pokeTypes);
    });

    //append modal window to parent
        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');


        //get pokemon index on the console upon clicking 
       
        
    }; //showModal function finished
    

  /*function swipeModal(){

  }*/


    //hide modal 
    function hideModal (){
    modalContainer.classList.remove("is-visible");
        };

//esc key to hide the modal
window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });


//click to hide modal 
modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();     
    }
    });


//showdetails of pokemons 
function showDetails(pokemon){
    pokemonRepository.loadDetails(pokemon).then(function () {
showModal(pokemon)
        })
      };


//function for click event 
function clickyEvent(button, pokemon){
button.addEventListener("click", function(){
    showDetails(pokemon)
})
};


function addListItem(pokemon){
    let pokemonListDOM = document.querySelector(".pokemon-list");
    let pokemonItem = document.createElement("li"); 
    pokemonListDOM.appendChild(pokemonItem);
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add("button");
    button.id = "show-details";
    pokemonItem.appendChild(button);
    //invoking clickevent function on the button
    clickyEvent(button, pokemon);
};



return {
    //nextElement: nextElement,
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    clickyEvent: clickyEvent,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    showModal: showModal,
    //swipeModal: swipeModal
};
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  //forEach() loop insteaf of the for loop
  pokemonRepository.getAll().forEach(function(pokemon, index){
    pokemonRepository.addListItem(pokemon);
    index = index + 1;

  })
  
});


