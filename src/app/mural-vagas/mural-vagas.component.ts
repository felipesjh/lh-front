import { Component, OnInit } from '@angular/core';
import { Vaga } from '../model/Vaga';
import { VagasService } from '../vagas.service';

@Component({
  selector: 'app-mural-vagas',
  templateUrl: './mural-vagas.component.html',
  styleUrls: ['./mural-vagas.component.css']
})
export class MuralVagasComponent implements OnInit {

  public vagas: Vaga[] = [];
  constructor(private vagasService: VagasService) { }

  ngOnInit(): void {
    this.listarVagas();
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

  cadastrar(){
    this.vagasService.cadastrarVaga(this.vagas[1]).subscribe(
      vaga => {this.vagas[1] = new Vaga(0,"","","","data",1000)},
      err => {console.log("erro cadastrar")})
  }

  atualizar(id: number){
    this.vagasService.atualizarVaga(id, this.vagas[1]).subscribe(
      vaga => {this.vagas[1] = new Vaga(5,"55","teste","descricao","data",1000)},
      err => {console.log("erro atualizar")})
  }

  remover(id: number){
    this.vagasService.removerVaga(id).subscribe(
      vaga => {this.vagas[1] = new Vaga(5,"55","teste","descricao","data",1000)},
      err => {console.log("erro deletar")})
  }

}
