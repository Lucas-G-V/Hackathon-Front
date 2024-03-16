import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ImagemCompactada } from '../models/processamento-video';
import { ProcessamentoVideoService } from '../services/processamento-video.service';

@Component({
  selector: 'listagem-video',
  templateUrl: './listagem-video.component.html',
})
export class ListagemVideoComponent implements OnInit{
 
  listaUploads: ImagemCompactada[] = [];

  constructor(
    private _processamentoVideoService : ProcessamentoVideoService,
    private _matDialog: MatDialog,
    private _changeDetectorRef: ChangeDetectorRef,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this._processamentoVideoService.getAllImagens().subscribe((result) => {
        this.listaUploads = result;
        this._changeDetectorRef.markForCheck();
      });
    
  }

  add() {
      this._route.navigate(['/video/criar']);
  }
}
