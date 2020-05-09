"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-drupal-theme-init:app", () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
      themeName: "Drupal",
      themeMachineName: "drupal",
      themeDescription: "Drupal theme",
      themePackage: "Custom",
      themeBase: "stable"
    });
  });

  it("creates files", () => {
    assert.file([
      "drupal.info.yml",
      "drupal.theme",
      "drupal.breakpoints.yml",
      "drupal.libraries.yml",
      "package.json"
    ]);
  });
});
