import { UserModel } from "../models/User.js";
import { hashPassword, comparePassword } from "./password.service.js";
import { generateToken } from "./jwt.service.js";

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export async function registerUser(data: RegisterUserData) {
  const name = data.name.trim();
  const email = data.email.trim().toLowerCase();

  if (name.length < 2) {
    throw new Error("O nome deve ter pelo menos 2 caracteres.");
  }

  if (passwordIsInvalid(data.password)) {
    throw new Error("A senha deve ter pelo menos 8 caracteres.");
  }

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new Error("Este e-mail já está cadastrado.");
  }

  const passwordHash = await hashPassword(data.password);

  const user = await UserModel.create({
    name,
    email,
    passwordHash,
  });

  return user;
}

export async function loginUser(data: LoginUserData) {
  const email = data.email.trim().toLowerCase();

  if (passwordIsInvalid(data.password)) {
    throw new Error("E-mail ou senha inválidos.");
  }

  const user = await UserModel.findOne({ email });

  if (!user || !user.isActive) {
    throw new Error("E-mail ou senha inválidos.");
  }

  const passwordMatches = await comparePassword(
    data.password,
    user.passwordHash,
  );

  if (!passwordMatches) {
    throw new Error("E-mail ou senha inválidos.");
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = generateToken(user._id.toString());

  return {
    token,
    user,
  };
}

function passwordIsInvalid(password: string): boolean {
  return typeof password !== "string" || password.length < 8;
}