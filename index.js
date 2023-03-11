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

function createManager() {
    inquirer.prompt(
        [{
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
        }]).then((answers) => {
            const manager = new Manager(answers.name, answers.employeeID, answers.email, answers.officeNum);
            employeeArray.push(manager);
            console.log(manager);
        }
        )
}

function createEmployee() {
    inquirer.prompt(
        [{
            type: 'list',
            name: 'job',
            message: 'What is the employees job?"=',
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the employees name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the employees ID?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the employees email?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the engineers github username?',
            when: (input) => input.job === 'Engineer'
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is the interns school?',
            when: (input) => input.job === 'Intern'
        },
        {
            type: 'confirm',
            name: 'addExtraEmployee',
            message: 'Would you like to add another Employee?',
            default: false
        }])
        .then((answers) => {
            if (job === 'Engineer') {
                const engineer = new Engineer(answers.name, answers.employeeID, answers.email, answers.github);
                employeeArray.push(engineer);
                console.log(engineer);
            }
            else if (job === 'Intern') {
                const intern = new Intern(answers.name, answers.employeeID, answers.email, answers.school);
                employeeArray.push(intern);
                console.log(intern);
            }
            if (addExtraEmployee) {
                return createEmployee(employeeArray);
            } else {
                return employeeArray;
            }
        }
        )
}


function initQuestions() {
    createManager()
        .then(createEmployee)
        .then(employeeArray => {
            return render(employeeArray);
        })
        .then(HTMLblock => {
            return fs.writeFileSync(outputPath, HTMLblock, "UTF-8");
        })
        .catch(err => {
            console.log(err);
        });
}

initQuestions();