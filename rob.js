class PetType {
    constructor (species, affectionate, irritable, lazy, scruffy, greedy) {
        // This is a string
        this.species = species;
        // All these are simple numbers between 1 and 100
        // They define the temperament of the animal
        this.affectionate = affectionate;
        this.irritable = irritable;
        this.lazy = lazy;
        this.scruffy = scruffy;
        this.greedy = greedy;
    }
}

// Define some types of pets, complete with temperaments, as global variables.
let croc = new PetType("crocodile", 1,10,7,5,8);
let bunny = new PetType("woodland bunny", 10,1,2,8,10);
let dog = new PetType("dog", 8,3,2,9,7);
let cat = new PetType("cat", 6,8,8,2,8);

class Mood {
    constructor (hungry, bored, dirty, angry, tired){
        // All these are simple numbers between 1 and 100
        // These are dynamic state vars, so all get set by functions as the program runs
        this.hungry = hungry;
        this.dirty = dirty;
        // When the pet is execrised, bored goes down but tired goes up
        this.bored = bored;
        this.tired = tired;
        // This gets computed from the other four
        // If it goes above 100, the owner gets bitten!
        this.angry = angry;
    }
}

class Cyberpet {
    constructor (name, type) {
    this.name = name, // string name
    this.type = type, // PetType object: so far croc, bunny, dog or cat

    // These get set when the user calls a play/clean/feed function
    this.play = true, // boolean, could poss set as true initially
    this.feed = true, // boolean
    this.clean = true, // boolean

    // mood gets calculated by status functions, and also gets referenced/queried by status functions
    // some status functions might bite the user, depending on result, to add a bit of a risk factor
    this.mood = new Mood(50, 50, 50, 50, 50), 

    // health gets worked out last
    // Only needs to be a simple number
    this.health = 100 // starts at full health
    }
    
    //
    // ACTION FUNCTIONS:
    //

    //changes feed false to true, adds 10 health-capped at 100 /// may modify for dog/not dog
    feedPet () {
        this.food = true;
        this.mood.hungry -= 2 * this.type.greedy;
        this.mood.tired -= 2 * this.type.lazy;
        this.mood.angry -= 100;

        this.mood.angry = this.mood.hungry + this.mood.bored + this.mood.tired + this.mood.dirty;
        this.mood.angry *= Math.floor(this.type.irritable/3);

        this.health += 10;
        if (this.health > 100) {
            this.health -= 20;
            console.log(`${this.name} is being overfed and getting overweight!`);
        }
    }

    //changes clean false to true, adds 10 health-capped at 100 /// may modify for dog/not dog
    cleanPet () {
        this.clean = true;
        this.mood.dirty -= 2 * this.type.scruffy;
        this.mood.tired += 3 * this.type.lazy;

        this.mood.angry = this.mood.hungry + this.mood.bored + this.mood.tired + this.mood.dirty;
        this.mood.angry *= Math.floor(this.type.irritable/3);

        if (this.mood.angry > 500) {
            console.log(`Ouch! ${this.name} the ${this.type.species} just bit you!`);
            console.log(`Maybe you should feed him?`);
        }

        if (this.health < 90) this.health += 10;
        else { 
            this.health = 100;
            console.log(`${this.name} is now really, really clean, and in perfect health!`);
        }
    }    

    //changes play false to true, adds 10 health-capped at 100 /// may modify for dog/not dog
    playWithPet () {
        this.play = true;
        this.mood.bored -= 2 * this.type.affectionate;
        this.mood.tired += 3 * this.type.lazy;

        this.mood.angry = this.mood.hungry + this.mood.bored + this.mood.tired + this.mood.dirty;
        this.mood.angry *= Math.floor(this.type.irritable/3);

        if (this.mood.angry > 500 && this.mood.tired > 70) {
            console.log(`Ouch! ${this.name} the ${this.type.species} just bit you!`);
            console.log(`Maybe play with him later?`);
        }

        if (this.health < 90) this.health += 10;
        else {
            this.health = 100;
            console.log(`${this.name} is so healthy he doen't really need any more play, but what the heck.`)
        }
    }

}


///////// hiding name-input, game space ///////////////
giveNameHeader.style.display = "none"
nameInputter.style.display = "none"
game.style.display = "none"
///////// hiding name-input, game space ///////////////

////////// animal selection from choosePet.html START ///////////
let animalSelect = "";

const dogSelect = document.getElementById("select-dog");
dogSelect.addEventListener("click", () => {
    animalSelect = dog;
    console.log(animalSelect);
    choosePetGrid.style.display = "none";
    choosePetTitle.style.display = "none";
    giveNameHeader.style.display = ""
    nameInputter.style.display = ""
})
   
const catSelect = document.getElementById("select-cat");
catSelect.addEventListener("click", () => {
    animalSelect = cat;
    console.log(animalSelect);
    choosePetGrid.style.display = "none";
    choosePetTitle.style.display = "none";
    giveNameHeader.style.display = ""
    nameInputter.style.display = ""
})

const bunnySelect = document.getElementById("select-bunny");
bunnySelect.addEventListener("click", () => {
    animalSelect = bunny;
    console.log(animalSelect);
    choosePetGrid.style.display = "none";
    choosePetTitle.style.display = "none";
    giveNameHeader.style.display = ""
    nameInputter.style.display = ""
})

const crocSelect = document.getElementById("select-croc");
crocSelect.addEventListener("click", () => {
    animalSelect = croc;
    console.log(animalSelect);
    choosePetGrid.style.display = "none";
    choosePetTitle.style.display = "none";
    giveNameHeader.style.display = ""
    nameInputter.style.display = ""
})
////////// animal selection from choosePet.html END ///////////


////////// naming of pet START ///////////
const input = document.getElementById("input");
const submit = document.getElementById("submit");

let petName = ""
const petNamer = () => {
    petName = input;
}

submit.addEventListener("click", () => {
    petNamer();
    giveNameHeader.style.display = "none"
    nameInputter.style.display = "none"
    game.style.display = ""
    // need to add instruction to change header ton include pet name
});
////////// naming of pet END ///////////


let myPet = new Cyberpet(petName, animalSelect);


////////// click event for feed/clean/play START/////////////////// 
const feedClick = document.getElementById("feedClick");
feedClick.addEventListener("click", () => {
    myPet.feedPet();
    console.log("feed test");
});

const cleanClick = document.getElementById("cleanClick");
cleanClick.addEventListener("click", () => {
    myPet.cleanPet();
    console.log("clean test");
});

const playClick = document.getElementById("playClick");
playClick.addEventListener("click", () => {
    myPet.playWithPet();
    console.log("play test");
});
////////// click event for feed/clean/play END///////////////////
