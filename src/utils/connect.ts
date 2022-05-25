import mongoose from 'mongoose';
import log from './logger';
import dotenv from 'dotenv';
dotenv.config();

async function connect() {
  try {
    await mongoose.connect(`${process.env.MONGODB_DATBASE_URL}`);
    log.info('Database connected');
  } catch (error) {
    log.error('Database error', error);
    process.exit(1);
  }
}

mongoose.connection.on('disconnected', () => {
  log.error('MongoDB disconnected!');
});

mongoose.connection.on('connected', () => {
  log.info('MongoDB connected!');
});

export default connect;
