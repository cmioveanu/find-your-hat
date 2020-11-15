const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
    }

    get field() {
        return this._field;
    }

    print() {
        console.log(this.field[0].join(" "));
        console.log(this.field[1].join(" "));
        console.log(this.field[2].join(" "));
    }

    getInput() {
        let vertical = 0;    //initialize vertical and horizontal starting positions
        let horizontal = 0;
        let validPosition = true;

        while (validPosition === true) {
            const userInput = prompt("Which way would you like to move? Input D, U, R, or L for direction.");

            userInput === "D" ? vertical++ :
            userInput === "U" ? vertical-- :
            userInput === "R" ? horizontal++ :
            userInput === "L" ? horizontal-- :
            console.log("Invalid input, please input D, U, R, or L for direction.");


            if (vertical < 0 || horizontal <0) {
                validPosition = false;
                console.log("");
                console.log("Game over! You went off the grid.");
                console.log("");
            } else if (this.field[vertical][horizontal] === "^") {
                validPosition = false;
                console.log("");
                console.log("Congratulations! You found the hat!");
                console.log("");
            } else if (this.field[vertical][horizontal] === "O") {
                validPosition = false;
                console.log("");
                console.log("Game over! You fell into a hole.");
                console.log("");
            } else {
                this.field[vertical][horizontal] = pathCharacter;
                this.print();
            }

            
        }
    }



}



const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

myField.print();
myField.getInput();