import { PageViewModel, NavigationService, DialogService, route, view } from "n-app";
import { given } from "n-defensive";
import { TodoRepository } from "../../services/todo-repository/todo-repository";
import { Todo } from "../../models/todo";
import * as Routes from "./../routes";
import { inject } from "n-ject";

@route(Routes.todos)
@view("todos-view")
@inject("TodoRepository", "NavigationService", "DialogService")
export class TodosViewModel extends PageViewModel
{
    private readonly _todoRepository: TodoRepository;
    private readonly _navigationService: NavigationService;
    private readonly _dialogService: DialogService;
    private _todos: Array<Todo>;
    
    
    public get todos(): Array<Todo> { return this._todos; }
    
    
    public constructor(todoRepository: TodoRepository, navigationService: NavigationService, dialogService: DialogService)
    {
        given(todoRepository, "todoRepository").ensureHasValue();
        given(navigationService, "navigationService").ensureHasValue();
        given(dialogService, "dialogService").ensureHasValue();
        
        super();
        
        this._todoRepository = todoRepository;
        this._navigationService = navigationService;
        this._dialogService = dialogService;
        this._todos = new Array<Todo>();
    }
    
    
    public editTodo(todo: Todo): void
    {
        this._navigationService.navigate(Routes.updateTodo, { id: todo.id });
    }
    
    public deleteTodo(todo: Todo): void
    {
        this._todoRepository
            .deleteTodo(todo.id)
            .then(() => this._todoRepository.getTodos())
            .then(t => this._todos = t);
    }
    
    
    protected onEnter(): void
    {
        this._todoRepository.getTodos()
            .then(t =>
            {
                this._todos = t;
                this._dialogService.showSuccessMessage("Todos loaded");
            })
            .catch(() => this._dialogService.showErrorMessage("Failed to load Todos"));
    }
}