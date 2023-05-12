let submitBtn = document.getElementById("submitBtn");
let shinyBtn = document.getElementById("shinyBtn");
let upBtn = document.getElementById("upBtn");
let downBtn = document.getElementById("downBtn");
let shinyText = document.getElementById("shinyText")
let sprite = document.getElementById("sprite");
let backSprite = document.getElementById("backSprite");
let shinySprite = document.getElementById("shinySprite");
let pokemonName = document.getElementById("pokemonName");
let pokemonNumber = document.getElementById("pokemonNumber");
let moveList = document.getElementById("moveList");
let moveDisplay = document.getElementById("moveDisplay");
let moveBtn = document.getElementById("moveBtn");
let pokeInput = document.getElementById("pokeInput");
let pokeBG = document.getElementById("pokeBG");
let pokeGenus = document.getElementById("pokeGenus")
let pokeEntry = document.getElementById("pokeEntry")
let firstAbility = document.getElementById("firstAbility")
let secondAbility = document.getElementById("secondAbility")
let thirdAbility = document.getElementById("thirdAbility")
let type1 = document.getElementById("type1");
let type2 = document.getElementById("type2");
let firstEvolution = document.getElementById("firstEvolution");
let secondEvolution = document.getElementById("secondEvolution");
let thirdEvolution = document.getElementById("thirdEvolution");
let firstEvolutionName = document.getElementById("firstEvolutionName");
let secondEvolutionName = document.getElementById("secondEvolutionName");
let thirdEvolutionName = document.getElementById("thirdEvolutionName");
let data;
let firstCall;
let pokeNumber = 1;
let first = "";
let second = "";
let third = "";
let firstEvo = "";
let secondEvo = "";
let thirdEvo = "";
let evoCount = 0;
let showMoves = false;
let moreData;
let evoData;
let shiny = false;
let arrow = true;
let abilityOne = "";
let abilityTwo = "";
let abilityThree = "";
let typeOne = "";
let typeTwo = "";
let pokeName = "";
let i = 0;
let moves = [];

GetData();


submitBtn.addEventListener('click', function () {
    evoCount = 0;
    arrow = false;
    // secondEvolution.src = "";
    // thirdEvolution.src = "";
    pokeName = pokeInput.value.toLowerCase();
    GetData();
    // GetEvolutions();
})

randomBtn.addEventListener('click', function(){
    arrow = true;
    pokeNumber = Math.floor(Math.random(649) * 650); 
    GetData();
    let i = 0;
    while (i != 50){
        console.log(Math.floor(Math.random(649) * 650));
        i++;
    }
    i = 0;
})

upBtn.addEventListener('click', function () {
    pokeNumber += 1;
    if (pokeNumber > 649) pokeNumber = 1;
    arrow = true;
    secondEvolution.src = "";
    thirdEvolution.src = "";
    secondEvolutionName.innerText = "";
    thirdEvolutionName.innerText = "";
    spriteData = "";
    GetData();
})
downBtn.addEventListener('click', function () {
    pokeNumber -= 1;
    if (pokeNumber <= 0) pokeNumber = 649;
    arrow = true;
    secondEvolution.src = "";
    thirdEvolution.src = "";
    spriteData = "";
    GetData();
})


shinyBtn.addEventListener('click', function () {
    shiny = !shiny;
    if (shiny) {
        shinyText.innerText = "Make Normal";
    } else { shinyText.innerText = "Make Shiny" }
    // GetData();
    secondEvolutionName.innerText = "";
    thirdEvolutionName.innerText = "";
    firstEvolution.src = "";
    secondEvolution.src = "";
    thirdEvolution.src = "";
    MakeShiny();
})
// GetEvolution();

moveBtn.addEventListener('click', function(){
    showMoves = !showMoves
    if (showMoves){
        moveDisplay.className = "";
    }else{
        moveDisplay.className = "hidden";
    }
})

async function GetData() {
    firstEvo = "";
    secondEvo = "";
    thirdEvo = "";
    // type1= "";
    // type2="";
    // typeOne.src = "";
    // typeTwo.src = "";
    if (arrow == false) {
        firstCall = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokeName);
        data = await firstCall.json();
        pokeNumber = data.id;
        
    } else {
        firstCall = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokeNumber);
        data = await firstCall.json();
    }

    // GetLocation();
    pokemonName.innerText = data.name;
    pokemonNumber.innerText = "#" + pokeNumber;
    if (pokeNumber < 10){
        pokemonNumber.innerText = "#00" + pokeNumber;
    }else if (pokeNumber < 100) pokemonNumber.innerText = "#0" + pokeNumber;
    console.log(data);
    abilityOne = (data.abilities[0].ability.name)
    firstAbility.innerText = "Ability 1: " + abilityOne;
    secondAbility.innerText = "Ability 2: N/A";
    thirdAbility.innerText = "Ability 3: N/A";
    console.log("Ability 1: " + abilityOne);
    if (data.abilities.length > 1) {
        abilityTwo = data.abilities[1].ability.name;
        secondAbility.innerText = "Ability 2: " + abilityTwo;
        console.log("Ability 2: " + abilityTwo);
    }
    if (data.abilities.length > 2) {
        abilityThree = data.abilities[2].ability.name;
        thirdAbility.innerText = "Ability 3: " + abilityThree;
        console.log("Ability 3: " + abilityThree);
    }
    moves = [""];
    console.log(data.moves.length);
    for (i = 0; i < data.moves.length; i++) {
        moves[i] = data.moves[i].move.name + " ";
        // console.log("Move " + (i+1) + " is " + moves[i]);
    }
    console.log(moves);
    moveList.innerText = moves;
    typeOne = data.types[0].type.name;
    console.log(typeOne);
    pokeBG.src = "Assets/"+ typeOne + "BG.png";
    // pokeBG.src = "Assets/"+ typeTwo + "BG.png";
    type1.src = "Assets/"+ typeOne + ".png";
    typeTwo = "";
    type2.src = "";
    if (data.types.length > 1) {
        typeTwo = data.types[1].type.name;
        type2.src = "Assets/"+ typeTwo + ".png";
        console.log(typeTwo);
    }
    console.log(data.abilities[0])
    if (shiny == false) {
        sprite.src = data.sprites.front_default;
        // backSprite.src = data.sprites.back_default;
    } else {
        sprite.src = data.sprites.front_shiny;
        // backSprite.src = data.sprites.back_shiny;
    }
    firstEvolutionName.innerText = "";
    secondEvolutionName.innerText = "N/A";
    thirdEvolutionName.innerText = "N/A";
    let Evolving = await fetch(data.species.url)
    console.log(Evolving);

    moreData = await Evolving.json()
    console.log(moreData);
    // pokeEntry.innerText = moreData.genera[4].genus;
    // console.log(moreData.flavor_text_entries[4].flavor_text);
    pokeGenus.innerText = moreData.flavor_text_entries[4].flavor_text;

    console.log(moreData.evolution_chain);
    let Evolved = await fetch(moreData.evolution_chain.url);
    evoData = await Evolved.json();
    console.log(evoData);
    firstEvo = evoData.chain.species.name;
    firstEvolutionName.innerText = firstEvo;
    
    console.log(firstEvo);
    if (evoData.chain.evolves_to.length > 0) {
        evoCount = 1;
        second = evoData.chain.evolves_to[0].species.name;
        console.log(second);
        secondEvo = evoData.chain.evolves_to[0].species.name;
        secondEvolutionName.innerText = secondEvo;
        if (evoData.chain.evolves_to[0].evolves_to.length > 0) {
            evoCount = 2;
            third = evoData.chain.evolves_to[0].evolves_to[0].species.name;
            console.log(third);
            // thirdEvolutionName.innerText = await third;
            thirdEvo = evoData.chain.evolves_to[0].evolves_to[0].species.name;
            console.log(thirdEvo);
            thirdEvolutionName.innerText = thirdEvo;
        }
        
    }
    
    firstEvolution.src = "";
    secondEvolution.src = "";
    thirdEvolution.src = "";
    MakeShiny()
}

async function MakeShiny() {

    if (shiny) {
        sprite.src = data.sprites.front_shiny;
        // backSprite.src = data.sprites.back_shiny;
    } else {
        sprite.src = data.sprites.front_default;
        // backSprite.src = data.sprites.back_default;
    }

    const evoOne = await fetch('https://pokeapi.co/api/v2/pokemon/' + firstEvo);
    spriteData = await evoOne.json();
    if (shiny == false) {
        firstEvolution.src = spriteData.sprites.front_default;
    } else { firstEvolution.src = spriteData.sprites.front_shiny; }
    if (evoCount > 0) {
        let evoTwo = await fetch('https://pokeapi.co/api/v2/pokemon/' + secondEvo);
        spriteData = await evoTwo.json();
        if (shiny == false) {
            secondEvolution.src = spriteData.sprites.front_default;
        } else { secondEvolution.src = spriteData.sprites.front_shiny; }
        // console.log(evoData.chain.evolves_to[0].species.name);
    }
    if (evoCount > 1) {
        let evoThree = await fetch('https://pokeapi.co/api/v2/pokemon/' + thirdEvo);
        spriteData = await evoThree.json();
        if (shiny == false) {
            thirdEvolution.src = spriteData.sprites.front_default;
            console.log(spriteData.sprites.front_default);
        } else { thirdEvolution.src = spriteData.sprites.front_shiny; }
        console.log(spriteData);
    }
    // if (shiny){
    //     sprite.src = data.sprites.front_shiny;
    //     backSprite.src = data.sprites.back_shiny;
    //     firstEvolution.src = data.sprites.front_shiny;
    //     secondEvolution.src = data.sprites.front_shiny;
    //     thirdEvolution.src = data.sprites.front_shiny;
    // }else{
    //     sprite.src = data.sprites.front_default;
    //     backSprite.src = data.sprites.back_default;
    //     firstEvolution.src = data.sprites.front_default;
    //     secondEvolution.src = data.sprites.front_default;
    //     thirdEvolution.src = data.sprites.front_default;
    // }
}

async function GetEvolutions() {
    // let evoURL = await fetch ('https://pokeapi.co/api/v2/evolution-trigger/shroomish/');
    // evoData = await evoURL.json();
    // console.log(evoData);
}

async function GetLocation(){
    let locationAPIData = data.location_area_encounters;
    console.log(locationAPIData);
    let locationData = await fetch('https://pokeapi.co/api/v2/pokemon/1/encounters');
    console.log(locationData);
    console.log(locationData.body);
    if (locationData == []){
        console.log("No Location Found");
    }else{
        console.log("Location Found");
    }
}