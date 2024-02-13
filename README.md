Small PoC of Playwright interacting with SpreadJS instance in an Angular application

### Precondition
App under test must expose SpreadJS module to window context so that it can be visible by automation execution.

### Prerequisites:  
Option 1 (default): Clone, install and run demo app: https://github.com/sjimenezqac/AngularSpreadJSSample  
Option 2: Use SpreadJS provided demo app (not an Angular app):  
`await page.goto('https://developer.mescius.com/spreadjs/demos/sample/features/worksheet/initialize-sheet/purejs/')`

### Steps
1. `npm install`
2. `npx playwright test --headed` , or, `npx playwright test --ui`
3. `npx playwright show-report`  
  
<br/>  

**NOTE:** waitForTimeout() have been intentionally added for demo purposes. 
