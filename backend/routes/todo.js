import express from "express";
import {
    selectAllTodos,
    selectTodoByUserId,
    createTodo,
    deleteTodo,
    updateTodo,
} from "../controllers/todoController.js";
const router = express.Router();

// select all categories
router.get("/", selectAllTodos);
// select all categories
router.get("/:id", selectTodoByUserId);

// create category
router.post("/", createTodo);

// delete category
router.delete("/:id", deleteTodo);

// update name category
router.patch("/:id", updateTodo);

export default router;
