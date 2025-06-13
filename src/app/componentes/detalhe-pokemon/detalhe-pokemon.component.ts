import { Component, Input, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';
import { Pokemon } from 'src/app/shared/model/pokemon';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalhe-pokemon',
  templateUrl: './detalhe-pokemon.component.html',
  styleUrls: ['./detalhe-pokemon.component.scss'],
})
export class DetalhePokemonComponent implements OnInit {
  @Input() title: string = '';
  @Input() text: string = '';

  @Input() modalId: string = '';
  @Input() closeLabel: string = '';
  @Input() saveLabel: string = '';
  @Input() pokemon: Pokemon | any;

  ngOnInit(): void {
    // Pode deixar vazio se não precisar fazer nada na inicialização
  }
  
  constructor(
    public pokeService: PokedexService,
    public activeModal: NgbActiveModal
  ) {}

  saveChangeModal(idmodal: string) {
    console.log('close' + ' : ' + idmodal);

    if (idmodal == 'exampleModalLive1') {
      console.log('save title value : ' + this?.title);
      this.pokeService.saveTitle(this.title);
    }

    if (idmodal == 'exampleModalLive2') {
      console.log('save text value : ' + this.text);
      this.pokeService.saveText(this.text);
    }

    this.activeModal.close(); // fecha o modal após salvar
  }

  fechar(): void {
    this.activeModal.dismiss(); // ou .close() se quiser finalizar normalmente
  }
}
