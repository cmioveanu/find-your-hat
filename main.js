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

    set field(array) {
        this._field = array;
    }

    print() {
        for(let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(" "));
        }
    }

    getInput() {
        let vertical = 0;    //initialize vertical and horizontal starting positions
        let horizontal = 0;
        let validPosition = true;

        while (validPosition === true) {
            const userInput = prompt("Which way would you like to move? Input D, U, R, or L for direction.");

            let invalidChar = false;    //if user inputs invalid directions, skip the rest of the loop and ask for valid input

            userInput === "D" ? vertical++ :
            userInput === "U" ? vertical-- :
            userInput === "R" ? horizontal++ :
            userInput === "L" ? horizontal-- :
            invalidChar = true;

            if(invalidChar === true) {
                console.log("Invalid input, please input D, U, R, or L for direction.");
                continue;
            }
           


            if (vertical < 0 || horizontal < 0) {
                validPosition = false;
                console.log("");
                console.log("Game over! You went off the grid.");
                console.log("");
            } else if (this.field[vertical][horizontal] === hat) {
                validPosition = false;
                console.log("");
                console.log("Congratulations! You found the hat!");
                console.log("");
            } else if (this.field[vertical][horizontal] === hole) {
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

    static generateField(height, width, percentage) {
        const fieldArray = [];      


        while (fieldArray.length < height) {    //fill the columns
            fieldArray.push([]);
        }

        fieldArray.forEach(verArray => {        //fill the rows
            while (verArray.length < width) {
                verArray.push(fieldCharacter);
            }
        });

        let percentageHoles = Math.round(height * width * percentage / 100);      //calculate how many holes and then add them

        while (percentageHoles > 0) {
            const randomVertical = Math.floor(Math.random() * height);
            const randomHorizontal = Math.floor(Math.random() * width);
            
            fieldArray[randomVertical][randomHorizontal] = hole;
            percentageHoles--;
        }

        let randomVertical = Math.floor(Math.random() * height);      // add the hat at an index further from the start, and set the start symbol
        let randomHorizontal = Math.floor(Math.random() * width);

        if(randomVertical === 0) { randomVertical++; }
        if(randomHorizontal === 0) { randomHorizontal++; }

        fieldArray[randomVertical][randomHorizontal] = hat;
        fieldArray[0][0] = pathCharacter;

        return fieldArray;
    }


}



const myField = new Field(Field.generateField(10, 20, 20));

myField.print();
myField.getInput();