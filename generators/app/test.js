"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-javascript-directory:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "./index.js"))
      .withPrompts({ react: true })
      .withPrompts({ root: "src" });
  });

  it("creates files", () => {
    assert.file([
      "index.js",
      "components/index.js",
      "redux/index.js",
      "redux/actions/index.js",
      "redux/reducers/index.js",
      "redux/selectors/index.js",
      "redux/store/index.js",
      "redux/store/test.js"
    ]);
  });
});
