"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-javascript-directory:app", () => {
  it("should create correct files when all defaults", () => {
    return helpers.run(path.join(__dirname, "./index.js")).then(() => {
      assert.file(["MyComponent/index.js"]);
      assert.fileContent(
        "MyComponent/index.js",
        /export default \(\) => \({}\)/
      );
      assert.fileContent(
        "MyComponent/test.js",
        /import MyComponent from ".\/index.js"/
      );
      assert.fileContent(
        "MyComponent/test.js",
        /describe\("MyComponent", \(\) => {/
      );
    });
  });

  it("should create correct files when type: react-native", () => {
    return helpers
      .run(path.join(__dirname, "./index.js"))
      .withPrompts({ type: "reducer" })
      .then(() => {
        assert.fileContent(
          "MyComponent/index.js",
          /export default \(state = {}, { type }\) => {/
        );
        assert.fileContent(
          "MyComponent/test.js",
          /import MyComponent from ".\/index.js"/
        );
        assert.fileContent(
          "MyComponent/test.js",
          /describe\("MyComponent", \(\) => {/
        );
      });
  });

  it("should create correct files when type: react-native", () => {
    return helpers
      .run(path.join(__dirname, "./index.js"))
      .withPrompts({ type: "selector" })
      .then(() => {
        assert.fileContent(
          "MyComponent/index.js",
          /export default state => state/
        );
        assert.fileContent(
          "MyComponent/test.js",
          /import MyComponent from ".\/index.js"/
        );
        assert.fileContent(
          "MyComponent/test.js",
          /describe\("MyComponent", \(\) => {/
        );
      });
  });
});
