import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable} from "rxjs";
import { map} from "rxjs/operators";

import { AuthService } from "app/core/auth/auth.service";
import { environment } from "environments/environment";
import { ImagemCompactada, Video } from "../models/processamento-video";
import { DomSanitizer } from '@angular/platform-browser';


@Injectable()
export class ProcessamentoVideoService {
    UrlApi : string = environment.UrlApiBack;
    constructor(private http: HttpClient, private _authService : AuthService, private sanitizer: DomSanitizer) {}

    public postVideo(video : Video): Observable<any> {
        console.log(video)
        const path = "/api/videos/upload";
        const formData = new FormData();
        formData.append('videoFile', video.videoFile, video.videoFile.name);
        formData.append('nomeUsuario', video.nomeUsuario)
        formData.append('nomeVideo', video.tituloVideo)
        return this.http.post<any>(this.UrlApi + path,formData)
          .pipe();
    }

    public getAllImagens(): Observable<ImagemCompactada[]> {
        const path = "/api/videos";
        return this.http.get<ImagemCompactada[]>(this.UrlApi + path, this.ObterHeaderJson())
          .pipe();
    }


    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this._authService.accessToken
            })
    
        };
        }
}