import Todo from "../models/TodoModel.js";

// select all Todos
export const selectAllTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find({});
        res.status(200).json(todos);
    } catch (err) {
        next(err);
    }
};

export const selectTodoByUserId = async (req, res, next) => {
    try {
        const todos = await Todo.findOne({
            user: req.params.user,
        });
        res.status(200).json(todos);
    } catch (error) {
        next(error);
    }
};
// create a new todo
export const createTodo = async (req, res, next) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
};

// delete todo
export const deleteTodo = async (req, res, next) => {
    try {
        const result = await Todo.findByIdAndDelete({ _id: req.params.id });

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

// update todo by id
export const updateTodo = async (req, res, next) => {
    try {
        const result = await Todo.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json("Category has been updated");
    } catch (err) {
        next(err);
    }
};
