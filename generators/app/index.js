'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the badass ${chalk.red('generator-cwf-theme')} generator!`)
    );

    const prompts = [
      {
        name: 'themeName',
        message: 'Enter your new theme name',
        default: _.startCase(this.appname)
      },
      {
        name: 'themeMachineName',
        message: 'Enter your theme machine name',
        default: function (answers) {
          return _.snakeCase(answers.themeName);
        }
      },
      {
        name: 'themeDescription',
        message: 'Enter your theme description',
        default: function () {
          return 'My awesome theme'
        }
      },
      {
        name: 'themePackage',
        message: 'Enter your theme package',
        default: function () {
          return 'Custom'
        }
      },
      {
        type: 'list',
        name: 'themeBase',
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
        name: 'includeBootstrap',
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
    // Copy the theme files.
    this.fs.copyTpl(
      this.templatePath('_theme.info.yml'),
      this.destinationPath(this.props.themeMachineName + '.info.yml'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('_theme.theme'),
      this.destinationPath(this.props.themeMachineName + '.theme'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('_theme.libraries.yml'),
      this.destinationPath(this.props.themeMachineName + '.libraries.yml'),
      this.props
    );

    // Copy the twig files.
    this.fs.copyTpl(
      this.templatePath('templates/**/*'),
      this.destinationPath('templates'),
      this.props,
      { globOptions: { dot: true } }
    );

    // Copy the SASS & JS files
    this.fs.copyTpl(
      this.templatePath('src/**/*'),
      this.destinationPath('src'),
      this.props,
      { globOptions: { dot: true } }
    );

    // Copy the build files.
    this.fs.copyTpl(
      this.templatePath('_Gulpfile.js'),
      this.destinationPath('Gulpfile.js'),
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.props
    );
  }

  install() {
    this.installDependencies();
  }
};
