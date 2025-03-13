import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-main-atividade',
  standalone: false,
  templateUrl: './main-atividade.component.html',
  styleUrl: './main-atividade.component.css'
})
export class MainAtividadeComponent {
  usuario = {
    nome: '',
    diaTrabalho: '',
    inicioTrabalho: '',
    fimExpediente: ''
  };

  usuarios: any[] = []; 

 constructor(private usuarioService: UsuarioService) { }



 ngOnInit(): void {
  this.listarUsuarios();
}

listarUsuarios(): void {
  this.usuarioService.listarUsuarios().subscribe((data) => {
    this.usuarios = data;
  });
}

 

 
 adicionarUsuario() {
  // Adicionando ":00" aos campos de horário, caso não tenha sido incluído
  this.usuario.inicioTrabalho = this.usuario.inicioTrabalho + ':00';
  this.usuario.fimExpediente = this.usuario.fimExpediente + ':00';

  this.usuarioService.adicionarUsuario(this.usuario).subscribe(response => {
    console.log('Usuário adicionado com sucesso!', response);
    
  }, error => {
    console.error('Erro ao adicionar usuário', error);
    
  });
}

excluirUsuario(id: string) {
  this.usuarioService.excluirUsuario(id).subscribe(
    (response) => {
      console.log('Usuário excluído com sucesso!', response);
      
      this.listarUsuarios();  // Atualiza a lista após exclusão
    },
    (error) => {
      console.error('Erro ao excluir usuário', error);
     
    }
  );
}



}