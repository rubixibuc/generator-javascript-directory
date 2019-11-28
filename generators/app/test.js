"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-javascript-directory:app", () => {
  it("should create correct files when react: true, redux: true", () => {
    return helpers
      .run(path.join(__dirname, "./index.js"))
      .withPrompts({ react: true, redux: true, root: "src" })
      .then(() => {
        assert.file([
          "components/index.js",
          "redux/index.js",
          "redux/actions/index.js",
          "redux/reducers/index.js",
          "redux/selectors/index.js",
          "redux/store/index.js",
          "redux/store/test.js",
          "shared/index.js"
        ]);
      });
  });

  it("should create correct files when react: false, redux: true", () => {
    return helpers
      .run(path.join(__dirname, "./index.js"))
      .withPrompts({ react: false, redux: true, root: "src" })
      .then(() => {
        assert.file([
          "redux/index.js",
          "redux/actions/index.js",
          "redux/reducers/index.js",
          "redux/selectors/index.js",
          "redux/store/index.js",
          "redux/store/test.js",
          "shared/index.js"
        ]);
      });
  });

  it("should create correct files when react: true, redux: false", () => {
    return helpers
      .run(path.join(__dirname, "./index.js"))
      .withPrompts({ react: true, redux: false, root: "src" })
      .then(() => {
        assert.file(["components/index.js", "shared/index.js"]);
      });
  });

  it("should create correct files when react: false, redux: false", () => {
    return helpers
      .run(path.join(__dirname, "./index.js"))
      .withPrompts({ react: false, redux: false, root: "src" })
      .then(() => {
        assert.file(["shared/index.js"]);
      });
  });
});
