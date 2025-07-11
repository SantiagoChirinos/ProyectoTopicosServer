import { Schema } from 'mongoose';

/**
 * Esquema de Mongoose para la colección de usuarios.
 */
export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});
