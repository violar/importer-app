import { Controller, httpGet, route, view, StyleBundle, TemplateBundle, ScriptBundle } from "n-web";


@route("/")
@httpGet
@view("default-view")
export class DefaultController extends Controller
{
    public async execute(): Promise<any>
    {
        let styles = new StyleBundle("styles", "src/client/static/styles", "styles")
            .include("src/client/static/styles/bootstrap.css")
            .include("src/client/static/styles/font-awesome.css")
            .include("src/client/static/styles/bootstrap-material-design.css")
            .include("src/client/pages")
            .include("src/client/components");
        
        let templates = new TemplateBundle("templates")
            .include("src/client");

        let scripts = new ScriptBundle("scripts", "src/client/static/scripts", "scripts")
            .include("src/client/static/scripts/jquery.js")   
            .include("src/client/static/scripts/bootstrap.js")
            .include("src/client/static/scripts/arrive.js")
            .include("src/client/static/scripts/material.js")
            .include("src/client/static/scripts/app-bundle.js");
                
        return {
            styles: await styles.render(),
            templates: await templates.render(),
            scripts: await scripts.render()
        };
    }
}