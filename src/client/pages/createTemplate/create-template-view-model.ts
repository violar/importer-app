import { PageViewModel, NavigationService, DialogService, route, view } from "n-app";
import { TodoRepository } from "../../services/todo-repository/todo-repository";
import { inject } from "n-ject";
import * as Routes from "./../routes";

@route(Routes.createTemplate)
@view("create-template-view")
@inject("TodoRepository", "NavigationService", "DialogService")
export class CreateTemplateViewModel extends PageViewModel
{
    private readonly _todoRepository: TodoRepository;
    private readonly _navigationService: NavigationService;
    private readonly _dialogService: DialogService;


    private _attributeName: string;


    public get attributeName(): string { return this._attributeName; }
    public set attributeName(value: string) { this._attributeName = value; }


    public constructor(todoRepository: TodoRepository, navigationService: NavigationService, dialogService: DialogService)
    {
        super();

        this._todoRepository = todoRepository;
        this._navigationService = navigationService;
        this._dialogService = dialogService;

        this._attributeName = null;
    }


    
}