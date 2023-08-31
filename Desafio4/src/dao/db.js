import mongoose from 'mongoose';

const dbURI = 'mongodb+srv://kyoz3:zabuza22@ecommerce-cluster.hmi72zs.mongodb.net/ecommerce?retryWrites=true&w=majority';

const connectToDB = async () => {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
};

export { connectToDB }; // Cambio en la exportación
  