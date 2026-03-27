const fs = require('fs')
const path = require('path')

// project templates
const templates = {
  react: {
    name: 'React Project',
    structure: {
      'src': {
        'components': {},
        'pages': {},
        'assets': {},
        'App.jsx': '// Main App component',
        'index.js': '// Entry point'
      },
      'public': {
        'index.html': '<!-- HTML template -->'
      },
      'package.json': '{ "name": "my-react-app" }',
      'README.md': '# My React App'
    }
  },
  node: {
    name: 'Node.js Project',
    structure: {
      'src': {
        'routes': {},
        'controllers': {},
        'models': {},
        'middleware': {},
        'index.js': '// Server entry point'
      },
      'config': {
        'db.js': '// Database config'
      },
      'package.json': '{ "name": "my-node-app" }',
      'README.md': '# My Node App',
      '.env': '# Environment variables'
    }
  },
  fullstack: {
    name: 'Full Stack Project',
    structure: {
      'client': {
        'src': {
          'components': {},
          'pages': {},
          'App.jsx': '// Client App'
        },
        'public': {
          'index.html': '<!-- Client HTML -->'
        }
      },
      'server': {
        'routes': {},
        'controllers': {},
        'models': {},
        'index.js': '// Server entry'
      },
      'README.md': '# Full Stack App'
    }
  }
}

// function to create folders and files
function createStructure(basePath, structure) {
  for (let key in structure) {
    let fullPath = path.join(basePath, key)
    let value = structure[key]

    if (typeof value === 'object' && Object.keys(value).length >= 0 && typeof value !== 'string') {
      // it's a folder
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true })
        console.log('  [folder] ' + fullPath)
      }
      // create contents inside
      if (Object.keys(value).length > 0) {
        createStructure(fullPath, value)
      }
    } else {
      // it's a file
      fs.writeFileSync(fullPath, value)
      console.log('  [file]   ' + fullPath)
    }
  }
}

// main function
function main() {
  let args = process.argv.slice(2)
  let templateName = args[0]
  let projectName = args[1] || 'my-project'

  if (!templateName) {
    console.log('\nFolder Architect - Project Structure Generator')
    console.log('----------------------------------------------')
    console.log('\nUsage: node index.js <template> <project-name>')
    console.log('\nAvailable templates:')
    for (let key in templates) {
      console.log('  - ' + key + ' (' + templates[key].name + ')')
    }
    console.log('\nExample: node index.js react my-app')
    return
  }

  if (!templates[templateName]) {
    console.log('Error: Template "' + templateName + '" not found.')
    console.log('Available templates: ' + Object.keys(templates).join(', '))
    return
  }

  let template = templates[templateName]
  let projectPath = path.join(process.cwd(), projectName)

  if (fs.existsSync(projectPath)) {
    console.log('Error: Folder "' + projectName + '" already exists!')
    return
  }

  console.log('\nCreating ' + template.name + ' structure: ' + projectName)
  console.log('')

  fs.mkdirSync(projectPath)
  createStructure(projectPath, template.structure)

  console.log('\nDone! Project created at: ' + projectPath)
}

main()