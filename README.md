```sh
npm install --save-dev eslint
./node_modules/.bin/eslint --init
```
package.json > scripts
"lint": "eslint . --ext .ts,.tsx",
"lint-and-fix": "eslint . --ext .ts,.tsx --fix"
