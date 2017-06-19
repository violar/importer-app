import { PageViewModel, NavigationService, DialogService, route, view } from "n-app";
import { TodoRepository } from "../../services/todo-repository/todo-repository";
import { inject } from "n-ject";
import * as Routes from "./../routes";

@route(Routes.createTodo)
@view("create-todo-view")    
@inject("TodoRepository", "NavigationService", "DialogService")
export class CreateTodoViewModel extends PageViewModel
{
    private readonly _todoRepository: TodoRepository;
    private readonly _navigationService: NavigationService;
    private readonly _dialogService: DialogService;
    
    
    private _title: string;
    private _description: string;
    
    
    public get title(): string { return this._title; }
    public set title(value: string) { this._title = value; }
    
    public get description(): string { return this._description; }
    public set description(value: string) { this._description = value; }
    
    
    public constructor(todoRepository: TodoRepository, navigationService: NavigationService, dialogService: DialogService)
    {
        super();
        
        this._todoRepository = todoRepository;
        this._navigationService = navigationService;
        this._dialogService = dialogService;
        
        this._title = this._description = null;
    }
    
    
    public submit(): void
    {
        this._todoRepository.addTodo(this.title, this.description)
            .then(() =>
            {
                this._dialogService.showSuccessMessage("Todo created");
                this._navigationService.navigate(Routes.todos, null);
            })
            .catch(() => this._dialogService.showErrorMessage("Failed to create Todo"));
    }
}