import mongoose from "mongoose"

async function connectToDatabase() {
  try {
    const mon = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`Connected to MongoDB at ${mon.connection.host}`)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}

export {connectToDatabase}  
