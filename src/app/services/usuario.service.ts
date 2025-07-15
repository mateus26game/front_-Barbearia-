import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
private apiUrl = 'http://localhost:8080/api/barbearias';


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

  atualizarUsuario(id: string, usuario: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/atualizar/${id}`, usuario);
}



listarPorStatusPagamento(status: string) {
  return this.http.get<any[]>(`${this.apiUrl}/filtrar`, {
    params: { statusPagamento: status }
  });
}

}
