import authRoutes from "./routes/auth.routes.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import subjectRoutes from "./routes/subject.routes.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/subjects", subjectRoutes);

app.use("/api/v1/auth", authRoutes);
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "SOS Estudante API funcionando",
  });
});

export default app;