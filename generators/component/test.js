"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const fs = require("fs-extra");

describe("generator-javascript-directory:component", () => {
  it("should create correct files when all defaults", () => {
    return helpers.run(path.join(__dirname, "./index.js")).then(() => {
      assert.file(["MyComponent/index.js"]);
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

  it("should append new component export to main index file", () => {
    return helpers
      .run(path.join(__dirname, "./index.js"))
      .inTmpDir(dir => {
        fs.ensureFileSync(path.join(dir, "src/components/index.js"));
      })
      .then(() => {
        assert.file(["MyComponent/index.js"]);
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

  it("should append new component export to main index file when path is provided", () => {
    return helpers
      .run(path.join(__dirname, "./index.js"))
      .withPrompts({ path: "path" })
      .inTmpDir(dir => {
        fs.ensureFileSync(path.join(dir, "src/components/index.js"));
      })
      .then(() => {
        assert.file(["path/MyComponent/index.js"]);
        assert.fileContent(
          "path/MyComponent/test.js",
          /import MyComponent from ".\/index.js"/
        );
        assert.fileContent(
          "path/MyComponent/test.js",
          /describe\("MyComponent", \(\) => {/
        );
      });
  });
});
