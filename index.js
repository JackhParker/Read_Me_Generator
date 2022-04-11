const inquirer = require('inquirer');
const fs = require(`fs`);
const util = require('util');

const api = require('./utils/api.js');
const generateMarkdown = require('./utils/generateMarkdown.js');

const prompt = ([
    {
        type: 'input',
        message: "What is your GitHub username?",
        name: 'username',
        default: 'Project-dev',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A GitHub username is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is the name of your GitHub repo?",
        name: 'repoName',
        default: 'readme-generator',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A GitHub repo is required for a badge.");
            }
            return true;
        }
    },
        {
            type:`input`,
            message:`Whats the title?`,
            name: `Title`,
            default: `Project Title`,
            validate: function (answer) {
                if(answer.length < 1) {
                    return console.log(`A Title is required.`);
                }
                return true;
            }
        },
        {
            type:`input`,
            message:`Write a description of your project.`,
            name:`Description`,
            default: `Project Description`,
            validate: function (answer) {
                if(answer.length < 1) {
                    return console.log(`A description is required.`);
                }
                return true;
            }
        },
        {
            type:`input`,
            message:`Please add in a table of contents.`,
            name:`Table of Contents`,
        },
        {
            type: `input`,
            message: "If needed, describe the steps required to install your project.",
            name: `installation`
        },
        {
            type: `input`,
            message: "Provide instructions and examples of your project, if needed.",
            name: `usage`
        },
        {
            type: `input`,
            message: "Provide guidelines on how other developers can contribute to your project.",
            name: `contributing`
        },
        {
            type: `input`,
            message: "Provide any tests written for your application and provide examples.",
            name: `tests`
        },
        {
            type: `list`,
            message: `Choose a license for your project.`,
            choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
            name: `license`
        },
        {
            type:`input`,
            message:`If you are open to feed back add in instructions for questions`,
            name:`Questions`
        },
    ])


function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }
        console.log("Success! Your README.md file has been generated")
    });
}
const writeFileAsync = util.promisify(writeToFile);

async function init() {
    try {
        const userResponses = await inquirer.prompt(prompt);
        console.log("Your responses: ", userResponses);
    
        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);
    
        console.log("Generating your README next...")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);
    
        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
};


init();
