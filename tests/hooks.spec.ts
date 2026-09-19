import {test} from '@playwright/test'
test.describe("basic test", ()=>{
test.beforeAll(()=>{
    console.log("before all block executed")
})
test.beforeEach(()=>{
    console.log("before each block executed")
})

test.afterEach(()=>{
    console.log("after each block")
})

test.afterAll(()=>{
        console.log("after all block")

})
test('test case 1', async ({ page }) => {
console.log("test case 1 executed")
});


test('test case 2', async ({ page }) => {
console.log("test case 2 executed")

});
})


/*
before all - 1
before each - run before each test 1
test case 1 - execution
after each - run after test 1
before each - run before each test 2
test case 2 - execution
after each - run after test 1
after all - run finally
*/

