const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            message: "Enter your GitHub username:",
            name: "username"
        },
        {
            message: "Enter your project title:",
            name: "title"
        },
        {
            message: "Enter a description for your project:",
            name: "description"
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
            message: "Enter your project's acceptance criteria:",
            name: "userAcceptanceCriteria"
        },
        {
            message: "Enter your project's installation instructions:",
            name: "installation"
        },
        {
            message: "Enter your project's usage info:",
            name: "usage"
        },
        {
            message: "Enter your project's credits information:",
            name: "credits"
        },
        {
            message: "Enter your project's license information:",
            name: "license"
        },
        {
            message: "Enter your project's contributing information:",
            name: "contributing"
        },
        {
            message: "Enter your project's testing information:",
            name: "tests"
        }
    ])
}

function generateReadMe(data) {
    return `# ${data.title}
## Description
${data.description}

## Technology
${data.technology}

## Acceptance Criteria
\`\`\`
${data.userAcceptanceCriteria}
\`\`\`

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Technology](#technology)
* [Credits](#credits)
* [License](#license)

## Installation
${data.installation}

## Usage
${data.usage}

## Credits
${data.credits}

## License
${data.license}

## Contributing
${data.contributing}

## Tests
${data.tests}

## Questions
\`\`\`
Email : ${data.userEmail}
\`\`\`
![Picture of me](${data.userPictureUrl})`;
}
const readMeArray = {
    title: "",
    description: "",
    userAcceptanceCriteria: "",
    installation: "",
    usage: "",
    technology: "",
    credits: "",
    license: "",
    contributing: "",
    tests: "",
    userEmail: "",
    userPictureUrl: ""
};

async function init() {
    console.log("Begin:");
    try {
        const answer = await promptUser();

        readMeArray.title = answer.title;
        readMeArray.description = answer.description;
        readMeArray.userAcceptanceCriteria = answer.userAcceptanceCriteria;
        readMeArray.installation = answer.installation;
        readMeArray.technology = answer.technology;
        readMeArray.usage = answer.usage;
        readMeArray.credits = answer.credits;
        readMeArray.license = answer.license;
        readMeArray.contributing = answer.contributing;
        readMeArray.tests = answer.tests;

        const queryUrl = `https://api.github.com/users/${answer.username}`;
        axios.get(queryUrl).then(function (res) {
            readMeArray.userEmail = res.data.email;
            readMeArray.userPictureUrl = res.data.avatar_url;

            const readMeData = generateReadMe(readMeArray);
            writeFile("Example_README.md", readMeData);
        });
        console.log("You Did it!! Check Example_README.md");
    }
    catch (err) {
        console.log(err);
    }
}
init();