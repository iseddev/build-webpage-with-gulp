console.log("Inside of: vendors/math.js")

const add = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => a / b

const opers = (a, b) => {
	console.log(add(a, b))
	console.log(subtract(a, b))
	console.log(multiply(a, b))
	console.log(divide(a, b))
}

opers(34, 12)
