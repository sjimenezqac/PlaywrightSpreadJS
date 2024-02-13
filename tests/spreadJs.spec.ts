import {test, expect} from '@playwright/test'

test('can interact with spreadJS', async ({page})=>{
    await page.goto('https://developer.mescius.com/spreadjs/demos/sample/features/worksheet/initialize-sheet/purejs/')
    // await page.goto('http://localhost:4200/quick-start')
    const spreadDiv = await page.locator('div[gcuielement="gcSpread"]')
    await expect(spreadDiv).toBeVisible()

    const SLEEP_TIME = 1000
    const inputText = 'Welcome to spreadJS with playwright demo'
    const inputVal1 = 3
    const inputVal2 = 5
    const sumRes = inputVal1 + inputVal2
    const minRes = Math.min(inputVal1, inputVal2)

    // const inputValues = {inputText, inputVal1, inputVal2}

    await page.waitForTimeout(2000)

    await sheetSetValue(page,0,0,inputText)

    await page.waitForTimeout(SLEEP_TIME)
    
    // Write labels
    await sheetSetValue(page,1,0,'Val 1')
    await sheetSetValue(page,2,0,'Val 2')
    await sheetSetValue(page,3,0,'SUM=')
    await sheetSetValue(page,4,0,'MIN=')

    await page.waitForTimeout(SLEEP_TIME)
    
    // Write Values
    await sheetSetValue(page,1,1,inputVal1)
    await sheetSetValue(page,2,1,inputVal2)

    await page.waitForTimeout(SLEEP_TIME)

    // Enter formulas
    await sheetSetFormula(page, 3,1,'=B2+B3')
    await sheetSetFormula(page, 4,1, '=MIN(B2:B3)')

    // Read results from formula cells
    let sumResInSS = await sheetGetValue(page, 3,1)
    let minResInSS = await sheetGetValue(page, 4,1)

    // const resultValues = await page.evaluate(({inputText, inputVal1, inputVal2})=>{

    //     let spreadHostElement = document.querySelector('[gcuielement="gcSpread"]');
    //     let spreadInstance = GC.Spread.Sheets.findControl(spreadHostElement); // Need to fix type checking.
    //     const sheet = spreadInstance.getActiveSheet();
        
    //     sheet.setValue(0,0,inputText)
    //      // Write labels
    //     sheet.setValue(1,0,'Val 1')
    //     sheet.setValue(2,0,'Val 2')
    //     sheet.setValue(3,0,'SUM=')
    //     sheet.setValue(4,0,'MIN=')

    //     // Write Values
    //     sheet.setValue(1,1,inputVal1)
    //     sheet.setValue(2,1,inputVal2)
    
    //     // Enter formulas
    //     sheet.setFormula(3,1,'=B2+B3')
    //     sheet.setFormula(4,1, '=MIN(B2:B3)')
    
    //     // Read results from formula cells
    //     let sumResInSS = sheet.getValue(3,1)
    //     let minResInSS = sheet.getValue(4,1)
    //     return {sumResInSS, minResInSS}
    // }, inputValues)
    
    // const {sumResInSS, minResInSS} = resultValues
    
    console.log('Sum value is ', sumResInSS)
    console.log('Min value is ', minResInSS)
    expect(sumResInSS, "Sum value").toBe(sumRes)
    expect(minResInSS,"Min value").toBe(minRes)

    // await page.close()
    await page.pause() // Used to leave browser open on cli execution: npx playwright test
    
})

async function sheetSetFormula(page, row,col, formulaString){
    await page.evaluate(({row, col, formulaString})=>{
        let spreadHostElement = document.querySelector('[gcuielement="gcSpread"]');
        let spreadInstance = GC.Spread.Sheets.findControl(spreadHostElement); // Need to fix type checking.
        const sheet = spreadInstance.getActiveSheet();
        sheet.setFormula(row,col, formulaString)
    },{row, col, formulaString})
}

async function sheetSetValue(page, row,col, value){
    await page.evaluate(({row, col, value})=>{
        let spreadHostElement = document.querySelector('[gcuielement="gcSpread"]');
        let spreadInstance = GC.Spread.Sheets.findControl(spreadHostElement); // Need to fix type checking.
        const sheet = spreadInstance.getActiveSheet();
        sheet.setValue(row,col, value)
    },{row, col, value})
}

async function sheetGetValue(page, row,col){
    return await page.evaluate(({row, col, value})=>{
        let spreadHostElement = document.querySelector('[gcuielement="gcSpread"]');
        let spreadInstance = GC.Spread.Sheets.findControl(spreadHostElement); // Need to fix type checking.
        const sheet = spreadInstance.getActiveSheet();
        return sheet.getValue(row,col, value)
    },{row, col})
}