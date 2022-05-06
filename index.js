import inquirer from 'inquirer';
import {Block} from './src/Block.js';
import {BlockChain} from './src/BlockChain.js';

const NB_MIN_BLOCK = 1;
const NB_MAX_BLOCKS = 5;

const firstQuestion = {
    type: 'input',
    message : `How many blocks do you need ? (between ${NB_MIN_BLOCK} and ${NB_MAX_BLOCKS})`,
    name: "numberOfBlocks",
    validate : validateUserNbBlocks,
    askAnswered : true
}

function validateUserNbBlocks(input) {
    if (isNaN(input)) {
        return 'Please enter a number';
    }
    if (input < NB_MIN_BLOCK) {
        return `Sorry, I can't handle less than ${NB_MIN_BLOCK} block`
    }
    if (input > NB_MAX_BLOCKS) {
        return `Sorry, I can't handle more than ${NB_MAX_BLOCKS} blocks`
    }
    return true;
}

function createDataQuestions(answers) {
    const nbBlocks = answers.numberOfBlocks;
    const dataQuestions = [];
    for (let i = 0; i < nbBlocks; i++) {
        dataQuestions.push({
            type: 'input',
            message : `Enter data for block ${i+1}`,
            name: `block${i+1}`
        });
    }
    return dataQuestions
}

inquirer.prompt([firstQuestion])
.then(answers => {
        const chain = new BlockChain(answers.numberOfBlocks)
        inquirer.prompt(createDataQuestions(answers))
        .then(dataAnswers => {
            for (let i = 0; i < Object.keys(dataAnswers).length; i++) {
                chain.addNewBlock(new Block({index : i, data : dataAnswers[`block${i+1}`]}));
            }
            console.log('Your blockchain is : \n');
            chain.print();
        })
})