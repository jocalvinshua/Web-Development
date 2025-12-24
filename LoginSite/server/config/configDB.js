import mongoose from 'mongoose';

const configDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('Database connected successfully');
  });

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

export default configDB;