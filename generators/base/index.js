"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(
        `Welcome to the best practice ${chalk.red(
          "generator-javascript-directory"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "root",
        message:
          "What is the relative path to this project's root source folder",
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
