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
    })
    .catch(function (e) {
        //hide loading message
    hideLoadingMessage();
    console.error(e);
    })
  };

  //load pokemon detail 
    function loadDetails(pokemon){
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
    function showModal(pokemon){
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
        swipeButtonLeft.addEventListener("click", previous)
    
 
    let index = pokemonList.indexOf(pokemon)


    function next() {
      let pokemonIndex = index + 1
      nextPokemon = pokemonList[pokemonIndex + 1];
      showDetails(nextPokemon)
    };

    function previous() {
      if(index <= 1) return
      let pokemonIndex = Number(index) -1
      prevPokemon = pokemonList[pokemonIndex - 1]
      showDetails(prevPokemon)
    }


    
    //search navigation
  let searchBtn = document.querySelector(".search-button");
  let searchInput = document.querySelector(".search-input");
  //searchBtn.addEventListener("click", filterItem);
  

  //not sure why if i try to pass the "name" dynamically (as from the input box) it results in empty string, if i 
  //write the pokemon name as an argument in the code it works :/
  
 function filter(){
  var filteredObject = pokemonList.filter((item) => 
  item.name === searchInput.value)
return filteredObject;
};
filter()

  console.log(filter())
           
/*function filterItem(){
  if(searchInput.value === ""){
    console.log("h")
  }
  if(searchInput.value === "bulbasaur"){
    console.log("hey")
  }else{console.log("what")}
};
*/
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
        
    }; //showModal function finished




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
   // searchPokemon: searchPokemon
};
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  //forEach() loop insteaf of the for loop
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);;

  })
  
});


