import { Route } from "@angular/router";
import { ProcessamentoVideoComponent } from "./processamento-video.component";
import { ListagemVideoComponent } from "./listagem-video/listagem-video.component";
import { EnvioVideoComponent } from "./envio-video/envio-video.component";

export const processamentoVideoRoutes: Route[] = [
    {
        path     : '',
        component: ProcessamentoVideoComponent,
        children: [
            {
                path     : '',
                component: ListagemVideoComponent,
            },
            {
                path     : 'criar',
                component: EnvioVideoComponent,
            }
        ]
    }
];