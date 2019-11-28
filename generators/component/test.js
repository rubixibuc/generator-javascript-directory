"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-javascript-directory:app", () => {
  it("should create correct files when type: react", () => {
    return helpers
      .run(path.join(__dirname, "./index.js"))
      .withPrompts({ type: "react" })
      .then(() => {
        assert.file(["MyComponent/index.js"]);
        assert.fileContent(
          "MyComponent/test.js",
          /import MyComponent from ".\/index.js"/
        );
      });
  });

  it("should create correct files when type: react-native", () => {
    return helpers
      .run(path.join(__dirname, "./index.js"))
      .withPrompts({ type: "react-native" })
      .then(() => {
        assert.fileContent(
          "MyComponent/index.js",
          /import { StyleSheet, View } from "react-native"/
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

  it("should create correct files when path: inputs", () => {
    return helpers
      .run(path.join(__dirname, "./index.js"))
      .withPrompts({ path: "inputs" })
      .then(() => {
        assert.file(["inputs/MyComponent/index.js"]);
        assert.fileContent(
          "inputs/MyComponent/test.js",
          /import MyComponent from ".\/index.js"/
        );
        assert.fileContent(
          "inputs/MyComponent/test.js",
          /describe\("MyComponent", \(\) => {/
        );
      });
  });
});
