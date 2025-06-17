// Importa modelos, serviços, utilitários e operadores RxJS
import { Component, OnInit, Input } from '@angular/core'; // Importa os módulos necessários do Angular
import { PokedexService } from 'src/app/services/pokedex.service'; // Importa o serviço responsável por fazer requisições à API
import { PokemonCardMapper } from 'src/app/shared/mapper/PokemonCardMapper'; // Importa a classe responsável por mapear os dados da API para o modelo utilizado na aplicação
import { PokemonInfoMapper } from 'src/app/shared/mapper/PokemonInfoMapper'; // Importa a classe responsável por mapear as informações detalhadas do Pokémon
import { Pokemon } from 'src/app/shared/model/pokemon'; // Importa o modelo Pokemon que representa a estrutura dos dados do Pokémon
import { PokemonColorUtils } from 'src/app/shared/util/pokemon-color-utils';
import { Subject, debounceTime, forkJoin, map } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalhePokemonComponent } from '../detalhe-pokemon/detalhe-pokemon.component';

// Componente que representa a lista de Pokémons
@Component({
  selector: 'app-lista-pokemon', // Nome da tag HTML que representa esse componente
  templateUrl: './lista-pokemon.component.html', // Caminho do template HTML
  styleUrls: ['./lista-pokemon.component.scss'], // Caminho do CSS
})
export class ListaPokemonComponent implements OnInit {
  // Lista principal (todos os Pokémons carregados da API)
  listaGeral: Pokemon[] = [];

  // Lista usada para exibir após aplicar filtro
  listaFiltrada: Pokemon[] = [];

  // Lista exibida na tela com base na paginação
  listaPokemonExibida: any[] = [];

  // Texto digitado no campo de busca
  filtro = '';

  // Controle de paginação
  pagina = 0;
  itensPorPagina = 20;

  // Suporte a debounce (atraso) na busca
  filtroSubject: Subject<string> = new Subject<string>();

  //Modal
  name: String = 'Angular';
  text: String = 'The text';

  constructor(
    public pokedexService: PokedexService, // Serviço que acessa a API
    private mapper: PokemonCardMapper, // Converte a resposta da API para modelo interno
    private infoMapper: PokemonInfoMapper, // Converte detalhes do Pokémon para modelo interno
    private modalService: NgbModal
  ) {}

  // Função chamada quando o usuário digita na busca
  filtraPokemon(event: any): void {
    this.filtroSubject.next(event); // Envia valor para o Subject (com debounce)
  }

  // Aplica o filtro na lista geral
  aplicarFiltro(filtro: string): void {
    this.filtro = filtro;

    // Filtra por nome (ignorando maiúsculas/minúsculas)
    this.listaFiltrada = this.listaGeral.filter((item) =>
      item.nome.includes(filtro.toLowerCase())
    );

    // Reinicia lista exibida e paginação
    this.listaPokemonExibida = [];
    this.pagina = 0;
    this.carregarMaisPokemons();
  }

  // Adiciona mais Pokémons na tela (scroll infinito)
  carregarMaisPokemons() {
    const inicio = this.pagina * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;

    // Usa lista filtrada se houver filtro ativo
    const baseLista = this.filtro ? this.listaFiltrada : this.listaGeral;

    // Adiciona mais itens à lista exibida
    const novosPokemons = baseLista.slice(inicio, fim);
    this.listaPokemonExibida.push(...novosPokemons);
    this.pagina++;
  }

  // Inicializa o componente
  ngOnInit(): void {
    // Aplica debounce na busca (espera 300ms após digitação)
    this.filtroSubject.pipe(debounceTime(300)).subscribe((filtro) => {
      this.aplicarFiltro(filtro);
    });

    // Busca lista de Pokémons na API
    this.pokedexService.getListaPokemon().subscribe((response) => {
      //Mapeia a lista inicial
      const listaGeral = this.mapper.mapFromDTO(response);
      //cria um array de Observables
      const requests = listaGeral.map((pokemon) =>
        this.pokedexService.getPokemonById(pokemon.nome).pipe(
          map((info) => {
            //combina o objeto inicial com as informações detalhadas
            pokemon.info = this.infoMapper.mapFromDTO(info);
            return pokemon; //retorna o pokemon "enriquecido"
          })
        )
      );
      //Usa forkjoin para esperar todas as requisiçoes terminarem
      forkJoin(requests).subscribe((pokemonsCompletos) => {
        console.log('Todos os detalhes dos pokémons foram carregados.');

        //A partir de agora, a listaGeral tem todos os dados necessários
        this.listaGeral = pokemonsCompletos;
        this.listaFiltrada = this.listaGeral;
        //Carregamos os primeiros pokémons na tela
        this.carregarMaisPokemons();
      });
    });
  }

  // Estilo visual do card com base no tipo do Pokémon
  // Método que retorna o tipo Pokémon, incluindo gradiente de fundo e sombra
  getStyleColors(pokemon: any) {
    // Validação: verifica se pokemon.info e pokemon.info.types existem e possuem ao menos um item
    return this.pokedexService.getStyleColors(pokemon);
  }

  //Metodo que vai enviar os dados do objeto pokemon com as informações do Pokemon retornadas pela API
  telaPokemonDetalhe(pokemon: Pokemon): void {
    console.log('Abrindo detalhe para:', pokemon);
  }

  abrirDetalhe(pokemon: any): void {
    const modalRef = this.modalService.open(DetalhePokemonComponent, {
      centered: true,
      // As classes abaixo ajudam a centralizar e estilizar o fundo
      windowClass: 'modal-maior',
    });

    modalRef.componentInstance.pokemon = pokemon;

    modalRef.result.then(
      (result) => {
        // Este bloco é executado se o modal for fechado com .close()
        console.log(`Modal fechado com resultado: ${result}`);
        if (result === 'saved') {
          console.log('O modal foi salvo, vou atualizar o que for preciso.');
          // this.getCardStyle(pokemon); // Se precisar chamar a função novamente.
          // ou this.recarregarLista();
        }
      },
      (reason) => {
        // Este bloco é executado se o modal for dispensado (clicando fora, ESC, ou .dismiss())
        console.log(`Modal dispensado com motivo: ${reason}`);
      }
    );
  }
}
