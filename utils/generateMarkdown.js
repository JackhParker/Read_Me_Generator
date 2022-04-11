function generateMarkdown(userResponses, userInfo) {

  var draftToC = `## Table of Contents`;

  if (userResponses.installation !== '') { draftToC += `
  * [Installation](#installation)` };

  if (userResponses.usage !== '') { draftToC += `
  * [Usage](#usage)` };

  if (userResponses.contributing !== '') { draftToC += `
  * [Contributing](#contributing)` };

  if (userResponses.tests !== '') { draftToC += `
  * [Tests](#tests)` };


  var draftMarkdown = 
  `# ${userResponses.title}
  ![Badge for GitHub repo top language](https://img.shields.io/github/languages/top/${userResponses.username}/${userResponses.repo}?style=flat&logo=appveyor) ![Badge for GitHub last commit](https://img.shields.io/github/last-commit/${userResponses.username}/${userResponses.repo}?style=flat&logo=appveyor)
  
  Check out the badges hosted by [shields.io](https://shields.io/).
  
  
  ## Description 
  
  *The what, and why of the Project* 
  
  ${userResponses.description}
  `
  draftMarkdown += draftToC;

  draftMarkdown += 
  `
  * [License](#license)`;

  if (userResponses.installation !== '') {
  draftMarkdown +=
  `
  ## Installation
  
  *Steps required to install project / how to get it running:*
  
  ${userResponses.installation}`
  };
  
  if (userResponses.usage !== '') {
  draftMarkdown +=
  `
  ## Usage 
  
  *Instructions and examples for use:*
  ${userResponses.usage}`
  };
  
  if (userResponses.contributing !== '') {

  draftMarkdown +=
  `
  ## Contributing
  
  *If you would like to contribute it, you can follow these guidelines for how to do so.*
  ${userResponses.contributing}`
  };
  
  if (userResponses.tests !== '') {

  draftMarkdown +=
  `
  ## Tests
  
  *Tests for application and how to run them:*
  
  ${userResponses.tests}`
  };

  draftMarkdown +=
  `
  ## License
  
  ${userResponses.license}
  `;

  draftMarkdown += 
  `
  ---
  ## Questions?

  For any questions, please contact me with the information below:
  GitHub: [@${userInfo.login}](${userInfo.url})
  `;

  return draftMarkdown;
  
}

module.exports = generateMarkdown;
