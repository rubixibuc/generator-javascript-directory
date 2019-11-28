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
            { name: "action", value: "action" },
            { name: "reducer", value: "reducer" },
            { name: "selector", value: "selector" }
          ],
          message: "What kind of redux component will this be?",
          default: "action"
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
    this.destinationRoot(`${this.props.root}/redux/${this.props.type}s`);
    this.fs.copyTpl(
      this.templatePath(`${this.props.type}/index.js`),
      this.destinationPath(
        `./${this.props.path}/${this.props.component}/index.js`
      ),
      {
        test: this.props.component,
        component: this.props.component
      }
    );
    if (this.fs.exists("./index.js")) {
      this.fs.append(
        "./index.js",
        `export { default as ${this.props.component} } from "./${
          this.props.path ? `${this.props.path}/` : ""
        }${this.props.component}"`
      );
    }

    this.fs.copyTpl(
      this.templatePath(`${this.props.type}/test.js`),
      this.destinationPath(
        `./${this.props.path}/${this.props.component}/test.js`
      ),
      {
        test: this.props.component,
        component: this.props.component
      }
    );
  }

  install() {
    return super.install();
  }
};
