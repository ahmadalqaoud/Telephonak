import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useFindAndModify: true,
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		})
		console.log(`mongodb connected ${conn.connection.host}`.cyan.underline)
	} catch (error) {
		console.error(` Error : ${error.message}`.red.underline.bold)
		process.exit(1)
	}
}

export default connectDB
