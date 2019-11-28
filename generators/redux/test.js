"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const fs = require("fs-extra");

describe("generator-javascript-directory:redux", () => {
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

  it("should append new component export to main index file", () => {
    return helpers
      .run(path.join(__dirname, "./index.js"))
      .inTmpDir(dir => {
        fs.ensureFileSync(path.join(dir, "src/redux/actions/index.js"));
      })
      .then(() => {
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
});
