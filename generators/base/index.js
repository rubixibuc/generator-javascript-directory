"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: "input",
        name: "root",
        message:
          "What is the relative path to this project's root source folder?",
        default: "src",
        store: true
      }
    ];

    return this.prompt(prompts);
  }

  install() {
    // Nothing to install
  }
};
