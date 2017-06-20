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


    public newImport(): void
    {
        this._navigationService.navigate(Routes.createTodo, null);
    }
}