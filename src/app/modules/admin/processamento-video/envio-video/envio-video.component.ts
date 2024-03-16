import { ChangeDetectorRef, Component, ElementRef, ViewChildren, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FormBaseComponent } from 'app/shared/utils/form-base.component';
import { Video } from '../models/processamento-video';
import { ProcessamentoVideoService } from '../services/processamento-video.service';

@Component({
    selector     : 'envio-video',
    templateUrl  : './envio-video.component.html'
})
export class EnvioVideoComponent extends FormBaseComponent
{
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    errors: any[] = [];
    videoForm : FormGroup;
    video : Video
    videoEscolhido : File

    constructor(private fb: FormBuilder,
        private _videoService : ProcessamentoVideoService,
        private _router : Router,
        private _matDialog: MatDialog,
        private _changeDetectorRef : ChangeDetectorRef) {
        super();
        this.validationMessages = {
            tituloVideo: {
                required: 'Coloque o título',
                maxlength: 'Máximo de 255 caracteres'
            },
            nomeUsuario: {
                required: 'Coloque o nome do usuário',
                maxlength: 'Máximo de 255 caracteres',
            }, 
            video: {
                required: 'Coloque o video'
            },
        }
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }


    ngOnInit(): void {
        this.videoForm = this.fb.group({
            tituloVideo: ['', [Validators.required, Validators.maxLength(255)]],
            nomeUsuario: ['', [Validators.required, Validators.maxLength(255)]],
            video : [, Validators.required]
        })
    }


    ngAfterViewInit(): void {
        super.configurarValidacaoFormularioBase(this.formInputElements, this.videoForm);
    }

    submitForm(){
        this.video = Object.assign({}, this.video, this.videoForm.value);
        this.video.videoFile = this.videoEscolhido;
        this._videoService.postVideo(this.video).subscribe(
          response => {
                this.processarSucesso()
           },
            error => console.log(error)
        )
    }

    processarSucesso(){
        this.videoForm.reset();
        this.errors = [];
        this.navegaParaList()
    }


    navegaParaList(){
        this._router.navigate(['/video'])
    }

    fileChangeEvent(files: FileList){
        if (files && files.length > 0) {
            this.videoEscolhido = files[0];
        }
    }
}
