console.log("Inside of: vendors/full_names.js")

const names = ["John", "Peter", "Sandy"]

const lastName = "Doe"

const fullNames = names.map(user => {
	console.log(`${user} ${lastName}`)
})
