import { Router } from "express";
import {getTodos, addTodo, updateTodo, deleteTodo} from "../controllers/todos"

const router: Router = Router();

router.post("/todos", addTodo);

router.get("/todos", getTodos);

router.put("/edit-todo/:id", updateTodo);

router.delete("/delete-todo/:id", deleteTodo);

console.log(Router())

export default router