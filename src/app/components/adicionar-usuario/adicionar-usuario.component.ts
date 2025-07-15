import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.component.html',
  styleUrls: ['./adicionar-usuario.component.css'],
  standalone: false
})
export class AdicionarUsuarioComponent implements OnInit {

  usuario = {
    nome: '',
    diaParaCorte: '',
    inicioDoCorte: '',
    tipoServico: '',
    statusServico: '',
    statusPagamento: '',
    precoBarbearia: null
  };

  usuarios: any[] = [];
  usuarioSelecionadoId: number | null = null;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  // Função para extrair só o "HH:mm" do OffsetTime (ex: "10:30:00-03:00" -> "10:30")
  formatarHorario(horarioComOffset: string): string {
    if (!horarioComOffset) return '';
    return horarioComOffset.split('-')[0].substring(0, 5);
  }

  adicionarOuAtualizarUsuario(): void {
    // Adiciona ":00-03:00" ao horário para enviar o formato OffsetTime esperado no backend
    if (this.usuario.inicioDoCorte && this.usuario.inicioDoCorte.length === 5) {
      this.usuario.inicioDoCorte = this.usuario.inicioDoCorte + ':00-03:00';
    }

    if (this.usuarioSelecionadoId) {
      this.usuarioService.atualizarUsuario(this.usuarioSelecionadoId.toString(), this.usuario)
        .subscribe(() => {
          Swal.fire('Sucesso!', 'Cliente atualizado com sucesso!', 'success');
          this.limparFormulario();
          this.listarUsuarios();
        });
    } else {
      this.usuarioService.adicionarUsuario(this.usuario)
        .subscribe(() => {
          Swal.fire('Sucesso!', 'Cliente adicionado com sucesso!', 'success');
          this.limparFormulario();
          this.listarUsuarios();
        });
    }
  }

  editarUsuario(usuario: any): void {
    this.usuario = { ...usuario };
    // Remove offset para preencher o input time com "HH:mm"
    if (this.usuario.inicioDoCorte) {
      this.usuario.inicioDoCorte = this.formatarHorario(this.usuario.inicioDoCorte);
    }
    this.usuarioSelecionadoId = usuario.id;
  }

  excluirUsuario(id: string): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você quer realmente excluir este cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.excluirUsuario(id).subscribe(() => {
          Swal.fire(
            'Excluído!',
            'Cliente excluído com sucesso.',
            'success'
          );
          this.listarUsuarios();
          if (this.usuarioSelecionadoId === +id) {
            this.limparFormulario();
          }
        });
      }
    });
  }

  limparFormulario(): void {
    this.usuario = {
      nome: '',
      diaParaCorte: '',
      inicioDoCorte: '',
      tipoServico: '',
      statusServico: '',
      statusPagamento: '',
      precoBarbearia: null
    };
    this.usuarioSelecionadoId = null;
  }
}
