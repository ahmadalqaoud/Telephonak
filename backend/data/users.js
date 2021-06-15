import bcrypt from 'bcryptjs'
const users = [
	{
		name: 'Abdallah Sabbagh',
		email: 'afsabbagh9@gmail.com',
		password: bcrypt.hashSync('Sabbagh1999#', 10),
		isAdmin: true,
	},
	{
		name: 'Mohammad hussien',
		email: 'dev@dev.com',
		password: bcrypt.hashSync('Sabbagh1999#', 10),
	},
	{
		name: 'Saleh ahmad',
		email: 'dev2@dev.com',
		password: bcrypt.hashSync('Sabbagh1999#', 10),
	},
]

export default users
