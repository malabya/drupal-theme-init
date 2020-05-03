'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        name: 'theme_name',
        message: 'Enter your new theme name',
        default: _.startCase(this.appname)
      },
      {
        name: 'theme_machine_name',
        message: 'Enter your theme machine name',
        default: function (answers) {
          return _.snakeCase(answers.themeName);
        }
      },
      {
        name: 'theme_description',
        message: 'Enter your theme description',
        default: function () {
          return 'My awesome theme'
        }
      },
      {
        name: 'theme_package',
        message: 'Enter your theme package',
        default: function () {
          return 'Custom'
        }
      },
      {
        type: 'list',
        name: 'theme_base',
        message: 'Base theme (i.e. classy, stable)',
        choices: [
          {
            value: 'classy',
            name: 'Classy'
          },
          {
            value: 'stable',
            name: 'Stable'
          }
        ]
      },
      {
        type: 'confirm',
        name: 'include_bootstrap',
        message: 'Would you like to include Bootstrap?',
        default: false,
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install() {
    this.installDependencies();
  }
};
