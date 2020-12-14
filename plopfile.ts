const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt')

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection)
module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'React Component',

    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name?'
      },
      {
        // Documentation here: https://github.com/anc95/inquirer-file-tree-selection
        type: 'file-tree-selection',
        name: 'directory',
        message: 'Choose a directory to put this component in',
        onlyShowDir: true,
        root: 'src',
      }
    ],

    actions: [
      {
        type: 'add', 
        path: '{{ directory }}/{{ name }}/index.ts',
        templateFile: 'templates/component/index.hbs'
      },
      {
        type: 'add',
        path: '{{ directory }}/{{ name }}/{{ name }}.component.tsx',
        templateFile: 'templates/component/component.hbs'
      }
    ]
  })
}