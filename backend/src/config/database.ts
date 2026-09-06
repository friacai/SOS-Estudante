import mongoose from "mongoose";

export async function connectDatabase(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI não definida nas variáveis de ambiente.");
  }

  await mongoose.connect(mongoUri);

  console.log("🗄️ MongoDB conectado com sucesso.");
}