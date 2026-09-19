//It will not throw error even if create multiple variables on the same name.
var count = 1
var name ="Prabu"
var name = "Krish"
console.log(count)
console.log(name)
count = 5
console.log(count)


let status= "Pending"
console.log(status)
status = "Passed"; // value changed
console.log(status)
//let status= “failed” // not allowed error

const status1 = "Success"
console.log(status1)
// status1 = "failed" not allowed
// console.log(status1)