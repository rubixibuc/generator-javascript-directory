"use strict";
const BaseGenerator = require("../base");

module.exports = class extends BaseGenerator {
  prompting() {
    return super.prompting().then(parentProps => {
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
        }
      ];

      return this.prompt(prompts).then(props => {
        this.props = { ...parentProps, ...props };
      });
    });
  }

  writing() {
    this.log(JSON.stringify(this.props));
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
    return super.install();
  }
};
