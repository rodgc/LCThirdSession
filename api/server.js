import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

// Wrap in async function to use await
await mongoose.connect(MONGO_URL, { dbName: "todos" });

// Object Model
const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    done: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todos", TodoSchema);

// Routes
app.get("/todos", async (_, res) => {
  const items = await Todo.find().sort({ createdAt: -1 });
  res.json(items);
});

app.get("/todos/:id", async (req, res) => {
  const item = await Todo.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

app.post("/todos", async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }
  const created = await Todo.create({ title });
  res.status(201).json(created);
});

app.delete("/todos/:id", async (req, res) => {
  const deleted = await Todo.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.status(204).end();
});

// Fix hardcoded port in log
// wrap in function to use await
app.listen(PORT, () => console.log(`API on http://localhost:8080`));
