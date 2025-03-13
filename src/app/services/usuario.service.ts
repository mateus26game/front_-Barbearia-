import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';


  constructor(private http: HttpClient) { }

  adicionarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/adicionar`, usuario);
  }

  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }

  excluirUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletar/${id}`);
  }

  atualizarUsuario(id: string, usuario: any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}${id}`, usuario)
  }
}
