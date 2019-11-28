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
        type: "confirm",
        name: "redux",
        message: "Will this project include redux?",
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
    if (this.props.react) {
      this.fs.copy(this.templatePath("react"), this.destinationPath());
    }

    if (this.props.redux) {
      this.fs.copy(this.templatePath("redux"), this.destinationPath());
    }

    this.fs.copy(this.templatePath("shared"), this.destinationPath());
  }

  install() {
    this.installDependencies();
  }
};
