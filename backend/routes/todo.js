import express from "express";
import {
    selectAllTodos,
    selectTodoByUserId,
    createTodo,
    deleteTodo,
    updateTodo,
} from "../controllers/todoController.js";
const router = express.Router();

// select all todos
router.get("/", selectAllTodos);
// select all todos
router.get("/:id", selectTodoByUserId);

// create todo
router.post("/", createTodo);

// delete todo
router.delete("/:id", deleteTodo);

// update name todo
router.patch("/:id", updateTodo);

export default router;
