const fs = require("fs");
const inquirer = require("inquirer");
const questions = [
        {
            type: "input",
            name: "projectTitle",
            message: "Enter your project title:",
        },
        {
            type: "input",
            name: "description",
            message: "Enter a description for your project: "
        },
        {
            type: "input",
            name: "installation",
            message: "Enter your project's installation instructions:",
        },
        {
            type: "checkbox",
            name: "technology",
            message: "Select the technology stack used for this project: ",
            choices: [
                "HTML",
                "CSS",
                "JAVASCRIPT",
                "NODE.js",
                "RUBY",
                "Open"
            ]
        },
        {
            type: "input",
            name: "usage",
            message: "Enter your project's usage info:"
        },
        {
            type: "input",
            name: "contribution",
            message: "Enter your project's contributing information:"
        },
        {
            type: "input",
            name: "license",
            message: "Enter your project's license information:"
        },
        {
            type: "input",
            name: "username",
            message: "Enter your GitHub username: "
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email: "
        }
    ]
// function to start program
function init() {
    inquirer.prompt(questions)
        .then(function(data) {
            writeToFile("README.md", generateMarkdown(data));
            console.log(data)
        })
}
init();