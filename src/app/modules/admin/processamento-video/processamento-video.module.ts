import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProcessamentoVideoComponent } from './processamento-video.component';
import { processamentoVideoRoutes } from './processamento-video.route';
import { ProcessamentoVideoService } from './services/processamento-video.service';
import { ListagemVideoComponent } from './listagem-video/listagem-video.component';
import { SharedModule } from 'app/shared/shared.module';
import { EnvioVideoComponent } from './envio-video/envio-video.component';

@NgModule({
    declarations: [
        ProcessamentoVideoComponent,
        ListagemVideoComponent,
        EnvioVideoComponent
    ],
    imports     : [
        RouterModule.forChild(processamentoVideoRoutes),
        SharedModule
    ],
    providers: [
        ProcessamentoVideoService
    ]
})
export class ProcessamentoVideoModule
{
}
