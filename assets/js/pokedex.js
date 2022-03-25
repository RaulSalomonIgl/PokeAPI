const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            clear();
            pokeImage("./assets/image/404-Pokemon.png")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            clear();
            //Information
            let id = data.id;
            const PokeName = document.getElementById("pName");
            const PokeId = document.getElementById("pId");
            const Candys = document.getElementById("candys");

            PokeName.innerHTML = pokeName.toUpperCase()
            PokeId.innerHTML = `#${id}`;
            Candys.innerHTML = `${pokeName.toUpperCase()} CANDY`;
                //Stats
            pokeInformation(data);
            

            //Image
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            
            //Moves
            pokeMoves(data);
            
            //Types
            pokeTypes(data);
        }
    });
}

const pokeInformation = (data) => {
    const hp = document.getElementById("hp");
    const attack = document.getElementById("attack");
    const defense = document.getElementById("defense");
    const specialAttack = document.getElementById("special-attack");
    const specialDefense = document.getElementById("special-defense");
    const speed = document.getElementById("speed");
    const weight = document.getElementById("weight");
    const height = document.getElementById("height");

    hp.innerHTML = `${(data.stats[0].stat.name).toUpperCase()}: ${data.stats[0].base_stat}/${data.stats[0].base_stat}`;
    attack.innerHTML = data.stats[1].base_stat;
    defense.innerHTML = data.stats[2].base_stat;
    specialAttack.innerHTML = data.stats[3].base_stat;
    specialDefense.innerHTML = data.stats[4].base_stat;
    speed.innerHTML = data.stats[5].base_stat;
    weight.innerHTML = data.weight;
    height.innerHTML = data.height;

    let stats = [data.stats[1].base_stat,data.stats[2].base_stat,data.stats[3].base_stat,data.stats[4].base_stat,data.stats[5].base_stat]; 

    stats.forEach(statsFunction);

    function statsFunction(item,index){
        let ul = document.getElementById("power"+index);
        let counter = 1;
        for (let i = 25; i <= item && counter <=5 ; i+=25) {
            let li = document.createElement("li");
            ul.appendChild(li);
            counter++;
        }
    }

    

}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const pokeMoves = (data) =>{
    let moves = 0;
    data.moves.forEach((element,index,array) => {
        moves++;
    });
    
    let movesLegth;
    if(moves >= 4){
        movesLegth = 4;
    }else{
        movesLegth = moves;
    }

    for(let index = 0; index < movesLegth; index++){
        let atq = document.getElementById("atq"+index);
        atq.innerHTML = data.moves[Math.floor(Math.random() * moves)].move.name;
    }
}

const pokeTypes = (data) =>{
    let types = "";
    data.types.forEach((element,index,array) => {
        if(types == ""){
            types += data.types[index].type.name;
        }
        else{
            types += ` / ${data.types[index].type.name}`;
        }
        
    });
    const pokeTypes = document.getElementById("types");
    pokeTypes.innerHTML = types;

}
const clearList = () =>{

    for (let index = 0; index < 5; index++) {
        
        let ul = document.getElementById("power"+index);
        let lis = ul.getElementsByTagName('li');
        let vec = [];

        for(i=0;i<lis.length;i++){
            if(lis[i].parentNode==ul)
                vec.push(lis[i]);
        }

        vec.forEach(element => {
            ul.removeChild(element);
        });

    }
}
const clear = () =>{
    const PokeName = document.getElementById("pName");
    const PokeId = document.getElementById("pId");
    const Candys = document.getElementById("candys");

    PokeName.innerHTML = "Not found"
    PokeId.innerHTML = 404;
    Candys.innerHTML = "";

    //Moves
    for(let index = 0; index < 4; index++){
        let atq = document.getElementById("atq"+index);
        atq.innerHTML = "";
    }

    //Types
    const pokeTypes = document.getElementById("types");
    pokeTypes.innerHTML = "";

    //Image
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = "";
    
    //Information
    const hp = document.getElementById("hp");
    const attack = document.getElementById("attack");
    const defense = document.getElementById("defense");
    const specialAttack = document.getElementById("special-attack");
    const specialDefense = document.getElementById("special-defense");
    const speed = document.getElementById("speed");
    const weight = document.getElementById("weight");
    const height = document.getElementById("height");

    hp.innerHTML = "";
    attack.innerHTML = "";
    defense.innerHTML = "";
    specialAttack.innerHTML = "";
    specialDefense.innerHTML = "";
    speed.innerHTML = "";
    weight.innerHTML = "";
    height.innerHTML = "";

    clearList();
}

const search = () =>{
    console.log("Hi")
    const searchBar = document.getElementById("active-search");
    console.log(searchBar.classList)
    if(searchBar.classList.contains("hidden")){
        searchBar.classList.remove("hidden");
        let btn = document.getElementById("btn-active");
        btn.classList.add("right");
    }
    else{
        searchBar.classList.add("hidden");
        let btn = document.getElementById("btn-active");
        btn.classList.remove("right");
    }
    
}