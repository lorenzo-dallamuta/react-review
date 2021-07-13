```sh
npm install --save-dev eslint
./node_modules/.bin/eslint --init
touch .eslintignore
npm install --save-dev eslint-config-prettier eslint-plugin-prettier

npm install --save-dev prettier
touch .prettierrc.js
touch .prettierignore
```
package.json > scripts
"lint": "eslint . --ext .ts,.tsx",
"lint-and-fix": "eslint . --ext .ts,.tsx --fix"
"prettier-format": "prettier --config .prettierrc.js 'src/**/*.{ts,tsx}' --write"

install vscode prettier extension and set:
"[typescript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true
},
"[typescriptreact]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
},