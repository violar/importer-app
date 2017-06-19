import { PageViewModel, route, view, NavigationService } from "n-app";
import * as Routes from "./../routes";
import { inject } from "n-ject";
import { TodoRepository } from "./../../services/todo-repository/todo-repository";
import { given } from "n-defensive";
import { Todo } from "./../../models/todo";

@route(Routes.updateTodo)
@view("update-todo-view")
@inject("TodoRepository", "NavigationService")    
export class UpdateTodoViewModel extends PageViewModel
{
    private readonly _todoRepository: TodoRepository;
    private readonly _navigationService: NavigationService;
    private _todo: Todo;
    
    private _title: string;
    private _description: string;
    
    
    public get title(): string { return this._title; }
    public set title(value: string) { this._title = value; }
    
    public get description(): string { return this._description; }
    public set description(value: string) { this._description = value; }
    
    
    public constructor(todoRepository: TodoRepository, navigationService: NavigationService)
    {
        given(todoRepository, "todoRepository").ensureHasValue();
        given(navigationService, "navigationService").ensureHasValue();
        
        super();
        
        this._todoRepository = todoRepository;
        this._navigationService = navigationService;
        this._title = this._description = null;
    }
    
    public save(): void
    {
        this._todoRepository.updateTodo(this._todo.id, this._title, this._description)
            .then(() =>
            {
                this._navigationService.navigate(Routes.todos, null);
            });
    }
    
    protected onEnter(id: number): void
    {
        this._todoRepository.getTodos()
            .then(todos =>
            {
                this._todo = todos.find(t => t.id === id);
                this._title = this._todo.title;
                this._description = this._todo.description;
            });
    }
}