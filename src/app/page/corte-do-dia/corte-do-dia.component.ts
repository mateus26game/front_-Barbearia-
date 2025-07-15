import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-corte-do-dia',
  standalone: false,
  
  templateUrl: './corte-do-dia.component.html',
  styleUrl: './corte-do-dia.component.css'
})
export class CorteDoDiaComponent {

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
    this.CortedoDia();
  }

  CortedoDia(): void {
    this.usuarioService.CortedoDia().subscribe(data => {
      this.usuarios = data;
    });
  }

 // Função para extrair só o "HH:mm" do OffsetTime (ex: "10:30:00-03:00" -> "10:30")
  formatarHorario(horarioComOffset: string): string {
    if (!horarioComOffset) return '';
    return horarioComOffset.split('-')[0].substring(0, 5);
  }

  corteshojepdf(): void {
    this.usuarioService.corteshojepdf().subscribe(pdfBlob => {
      const url = window.URL.createObjectURL(pdfBlob);
  
      // Funciona tanto no mobile quanto no navegador
      const link = document.createElement('a');
      link.href = url;
      link.download = `nota_fiscal_.pdf`;
      link.click();
  
      window.URL.revokeObjectURL(url);
    });
  }

 
  

}
