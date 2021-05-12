

const baseURL = 'https://pokeapi.co/api/v2/type/';



async function matchupFinder(clicked_id) {
    let selectedType = baseURL + clicked_id + '/';
    findTyping(selectedType);
    
}

function findTyping(selectedType) {
    fetch(selectedType)
        .then(results => {
            // console.log(results);
            return results.json();
        })
        .then(json => {
            // console.log(json);
            damageFrom(json);
            damageTo(json);
            document.querySelector("#userSelection").innerText = json.name;
        })

        .catch(err => console.log(err))

}

let greatAgainst = document.querySelector('#greatAgainstResults');
let terribleAgainst = document.querySelector('#terribleAgainstResults');

function damageTo(json) {
    let doubleToArray = json.damage_relations.double_damage_to;
    // console.log(doubleTo);

    while (document.querySelector('#greatAgainstResults').firstChild) {
        document.querySelector('#greatAgainstResults').removeChild(document.querySelector('#greatAgainstResults').firstChild);
        
    }
 
    if (doubleToArray.length === 0) {
        greatAgainst.innerText = "None, BUT its immune against Ghost Type moves, BUT ghost is immune to normal moves so ¯\_(ツ)_/¯ ";
    }
    else {

        for (let i = 0; i < doubleToArray.length; i++) {
            console.log("double to:" + doubleToArray[i].name);
            let doubleTo = doubleToArray[i].name;
            let para = document.createElement("p");
            greatAgainst.appendChild(para).innerText = doubleTo.toString();
        }
    }


}

function damageFrom(json) {
    let doubleFromArray = json.damage_relations.double_damage_from;
    // console.log(doubleFrom);

    while (document.querySelector('#terribleAgainstResults').firstChild) {
        document.querySelector('#terribleAgainstResults').removeChild(document.querySelector('#terribleAgainstResults').firstChild);
        
    }

    if (doubleFromArray.length === 0) {
        terribleAgainst.innerText = "None";
    }
    else {

        for (let i = 0; i < doubleFromArray.length; i++) {
            console.log("double from:" + doubleFromArray[i].name);
            let doubleFrom = doubleFromArray[i].name;
            let para = document.createElement("p");
            terribleAgainst.appendChild(para).innerText = doubleFrom.toString();
        }
    }

}