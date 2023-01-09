import { Document, model, Schema } from 'mongoose';
import { User } from '../domain/user.entity';

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
