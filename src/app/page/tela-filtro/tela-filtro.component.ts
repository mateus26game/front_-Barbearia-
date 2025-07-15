import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-tela-filtro',
  templateUrl: './tela-filtro.component.html',
  styleUrls: ['./tela-filtro.component.css'],
  standalone:false
})
export class TelaFiltroComponent implements OnInit {

  usuario = {
    nome: '',
    diaParaCorte: '',
    inicioDoCorte: '',
    tipoServico: '',
    statusServico: '',
    statusPagamento: '',
    precoBarbearia: null
  };

  // Aqui você controla o filtro de pagamento
  statusSelecionado: string = 'PAGO';  // padrão PAGO, pode deixar vazio '' se quiser listar tudo inicialmente

  usuarios: any[] = [];
  usuarioSelecionadoId: number | null = null;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.buscarClientes();  // já busca filtrando por padrão "PAGO"
  }

  listarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  buscarClientes(): void {
    if (this.statusSelecionado === '') {
      // Sem filtro: busca todos
      this.usuarioService.listarUsuarios().subscribe(data => {
        this.usuarios = data;
      });
    } else {
      // Busca filtrando pelo status de pagamento
      this.usuarioService.listarPorStatusPagamento(this.statusSelecionado).subscribe(data => {
        this.usuarios = data;
      });
    }
  }

  gerarNota(id: number): void {
    this.usuarioService.gerarNotaFiscal(id).subscribe(pdfBlob => {
      const url = window.URL.createObjectURL(pdfBlob);
  
      // Funciona tanto no mobile quanto no navegador
      const link = document.createElement('a');
      link.href = url;
      link.download = `nota_fiscal_${id}.pdf`;
      link.click();
  
      window.URL.revokeObjectURL(url);
    });
  }


  gerarTodasNotaFiscal(): void {
    this.usuarioService.gerarTodasNotaFiscal().subscribe(pdfBlob => {
      const url = window.URL.createObjectURL(pdfBlob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = 'todas_notas_fiscais.pdf';
      link.click();
  
      window.URL.revokeObjectURL(url);
    });
  }
  
  
}
