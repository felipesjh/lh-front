import { Component, OnInit } from '@angular/core';
import { Vaga } from '../model/Vaga';
import { VagasService } from '../vagas.service';

@Component({
  selector: 'app-vagas',
  templateUrl: './vagas.component.html',
  styleUrls: ['./vagas.component.css']
})
export class VagasComponent implements OnInit {

  public vaga: Vaga = new Vaga(0,"","","","",0);
  public vagas: Vaga[] = [];
  constructor(private vagasService: VagasService) { }

  ngOnInit(): void {
    this.listarVagas();
  }

  cadastrar(){
    this.vagasService.cadastrarVaga(this.vaga).subscribe(
      vaga => {this.vaga = new Vaga(5,"55","teste","descricao","data",1000)},
      err => {console.log("erro cadastrar")});

      window.location.href = "http://localhost:4200/mural";
  }

  atualizar(id: number){
    this.vagasService.atualizarVaga(id, this.vaga).subscribe(
      vaga => {this.vaga = new Vaga(5,"55","teste","descricao","data",1000)},
      err => {console.log("erro atualizar")});

      window.location.href = "http://localhost:4200/mural";
  }

  remover(id: number){
    this.vagasService.removerVaga(id).subscribe(
      vaga => {this.vaga = new Vaga(5,"55","teste","descricao","data",1000)},
      err => {console.log("erro deletar")});

      window.location.href = "http://localhost:4200/mural";
  }

  listarVagas(){

    this.vagasService.getVagas()
        .subscribe(
          retorna => {
            this.vagas = retorna.map(item=>{
              return new Vaga(
                item.id,
                item.nome,
                item.foto,
                item.descricao,
                item.data,
                item.salario
                )
              }
            )
          }
        )

  }
}
