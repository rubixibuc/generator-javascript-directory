"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the best practice ${chalk.red(
          "generator-javascript-directory"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "confirm",
        name: "react",
        message: "Will this be a react or react native project?",
        default: true
      },
      {
        type: "input",
        name: "root",
        message: "What is the relative path to this projects route folder",
        default: "src"
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.destinationRoot(this.props.root);
    this.log(`using root ${this.props.root}`);
    this.fs.copy(this.templatePath("react"), this.destinationPath());
  }

  install() {
    this.installDependencies();
  }
};
