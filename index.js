const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const employeeArray = [];

function initQuestions() {
    inquirer.prompt(
        {
            type: 'input',
            name: 'name',
            message: 'What is the Managers name?',
        },
        {
            type: 'input',
            name: 'employeeID',
            message: 'What is the Managers Employee ID?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the Managers Email address?',
        },
        {
            type: 'input',
            name: 'officeNum',
            message: 'What is the Managers Office Number?',
        }).then((answers) =>  new Manager(answers.name, answers.employeeID, answers.email, answers.officeNum),
            employeeArray.push(answers),
        console.log(employeeArray))
}

// function createEngineer() {

// }

initQuestions();