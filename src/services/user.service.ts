import { omit } from 'lodash';
import { DocumentDefinition } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';

export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePasswords'>
  >
) {
  try {
    return await UserModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

function findUser() {}

export async function validatePassword({
  email,
  password,
}: {
  email: UserDocument['email'];
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePasswords(password);

  if (!isValid) {
    return false;
  }

  return omit(user?.toJSON(), 'password');
}
