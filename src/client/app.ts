import { ClientApp } from "n-app";
import { ComponentInstaller, Registry } from "n-ject";
import { InmemoryTodoRepository } from "./services/todo-repository/inmemory-todo-repository";
import * as Routes from "./pages/routes";
import { TodoViewModel } from "./components/todo/todo-view-model";
import { TodosViewModel } from "./pages/todos/todos-view-model";
import { CreateTodoViewModel } from "./pages/createTodo/create-todo-view-model";
import { UpdateTodoViewModel } from "./pages/updateTodo/update-todo-view-model";



class Installer implements ComponentInstaller
{
    public install(registry: Registry): void
    {
        registry.registerSingleton("TodoRepository", InmemoryTodoRepository);
    }
}

const pages = [TodosViewModel, CreateTodoViewModel, UpdateTodoViewModel];

const app = new ClientApp("#app")
    .enableDevMode()
    .useAccentColor("#7ab53b")
    .useInstaller(new Installer())
    .registerComponents(TodoViewModel)
    .registerPages(...pages)
    .useAsInitialRoute(Routes.todos)
    .useAsUnknownRoute(Routes.todos)
    ;

app.bootstrap();