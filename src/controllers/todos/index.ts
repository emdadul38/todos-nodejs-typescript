import {Request, Response} from "express";
import { ITodo } from "../../types/todo";
import Todo from "../../models/todo"

const getTodos = async(req: Request, res: Response): Promise<void> => {
	try {
		const todo: ITodo[] = await Todo.find();
		res.status(200).json(todo);
	} catch (err) {
		throw err
	}
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
	try {
		const body = req.body as Pick<ITodo, "user" | "text" | "priority">
		console.log(body) ;
  
	  	const todo: ITodo = new Todo({
			user: body.user,
			text: body.text,
			priority: body.priority,
	  	})	
		console.log(todo);

	  	const newTodo: ITodo = await todo.save()
	  	const allTodos: ITodo[] = await Todo.find()
  
	  	res
			.status(201)
			.json({ message: "Todo added", todo: newTodo, todos: allTodos })
	} catch (err) {
		console.log(err)
	  	throw err
	}
  }

const updateTodo = async (req: Request, res: Response): Promise<void> => {
	try {
	  	const {
			params: { id },
			body,
	  	} = req
	  	const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
			{ _id: id },
			body
		  )
		  
	  	const allTodos: ITodo[] = await Todo.find()
	  	res.status(200).json({
			message: "Todo updated",
			todo: updateTodo,
			todos: allTodos,
	  	});
	} catch (err) {
	  	throw err
	}
  }

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
	try {
	  	const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
			req.params.id
	  	)
	  	const allTodos: ITodo[] = await Todo.find()
	  
		res.status(200).json({
			message: "Todo deleted",
			todo: deletedTodo,
			todos: allTodos,
	  	});
	} catch (err) {
	  	throw err;
	}
  }
  
  export { getTodos, addTodo, updateTodo, deleteTodo }