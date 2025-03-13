
import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-adicionar-usuario',
  standalone: false,
  templateUrl: './adicionar-usuario.component.html',
  styleUrls: ['./adicionar-usuario.component.css']
})
export class AdicionarUsuarioComponent {
  usuario = {
    nome: '',
    diaTrabalho: '',
    inicioTrabalho: '',
    fimExpediente: ''
  };

  constructor(private usuarioService: UsuarioService) { }

  usuarios: any[] = []; 

  adicionarUsuario() {
    // Adicionando ":00" aos campos de horário, caso não tenha sido incluído
    this.usuario.inicioTrabalho = this.usuario.inicioTrabalho + ':00';
    this.usuario.fimExpediente = this.usuario.fimExpediente + ':00';
  
    this.usuarioService.adicionarUsuario(this.usuario).subscribe(response => {
      console.log('Usuário adicionado com sucesso!', response);
    }, error => {
      console.error('Erro ao adicionar usuário', error);
      alert('Erro ao adicionar usuário!');
    });
  }

  
 listarUsuarios(){
  
  this.usuarioService.listarUsuarios().subscribe(
    (response) => {
      this.usuarios = response;  
      console.log('Usuários:', this.usuarios);
    },
    (error) => {
      console.error('Erro ao listar usuários:', error);
      alert('Erro ao listar usuários!');
    }
  );
 }
  
}


