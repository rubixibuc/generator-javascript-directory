"use strict";
const BaseGenerator = require("../base");

module.exports = class extends BaseGenerator {
  prompting() {
    return super.prompting().then(parentProps => {
      const prompts = [
        {
          type: "list",
          name: "type",
          choices: [
            { name: "react", value: "react" },
            { name: "react-native", value: "react-native" }
          ],
          message: "Will this be a react or react native component",
          default: "react"
        },
        {
          type: "input",
          name: "component",
          message: "What should the component be named?",
          default: "MyComponent"
        },
        {
          type: "input",
          name: "path",
          message: "Enter any path prefix if necessary",
          default: ""
        }
      ];

      return this.prompt(prompts).then(props => {
        this.props = { ...parentProps, ...props };
      });
    });
  }

  writing() {
    this.destinationRoot(`${this.props.root}/components`);
    this.fs.copyTpl(
      this.templatePath(`${this.props.type}/index.js`),
      this.destinationPath(
        `./${this.props.path}/${this.props.component}/index.js`
      ),
      {
        component: this.props.component
      }
    );
    this.fs.copyTpl(
      this.templatePath(`${this.props.type}/test.js`),
      this.destinationPath(
        `./${this.props.path}/${this.props.component}/test.js`
      ),
      {
        component: this.props.component
      }
    );
  }

  install() {
    return super.install();
  }
};
