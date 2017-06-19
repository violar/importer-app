import { ComponentViewModel, element, bind, view } from "n-app";
import { Todo } from "../../models/todo";

@element("todo")
@bind("value", "editValue", "deleteValue")    
@view("todo-view")    
export class TodoViewModel extends ComponentViewModel
{
    public get todo(): Todo { return this.getBound<Todo>("value"); }
    
    
    public editTodo(): void
    {
        this.getBound<Function>("editValue")(this.todo);
    }
    
    public deleteTodo(): void
    {
        this.getBound<Function>("deleteValue")(this.todo);
    }
}