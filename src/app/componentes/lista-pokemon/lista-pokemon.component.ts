// Importa modelos, serviços, utilitários e operadores RxJS
import { PokemonInfo } from './../../shared/model/PokemonInfo.model';
import { Component, OnInit, Input } from '@angular/core'; // Importa os módulos necessários do Angular
import { PokedexService } from 'src/app/services/pokedex.service'; // Importa o serviço responsável por fazer requisições à API
import { SearchHeaderComponent } from '../search-header/search-header.component'; // Importa o componente de cabeçalho de busca
import { PokemonCardMapper } from 'src/app/shared/mapper/PokemonCardMapper'; // Importa a classe responsável por mapear os dados da API para o modelo utilizado na aplicação
import { PokemonInfoMapper } from 'src/app/shared/mapper/PokemonInfoMapper'; // Importa a classe responsável por mapear as informações detalhadas do Pokémon
import { Pokemon } from 'src/app/shared/model/pokemon'; // Importa o modelo Pokemon que representa a estrutura dos dados do Pokémon
import { PokemonColorUtils } from 'src/app/shared/util/pokemon-color-utils';
import { Subject, debounceTime } from 'rxjs';

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

  constructor(
    private pokedexService: PokedexService, // Serviço que acessa a API
    private mapper: PokemonCardMapper, // Converte a resposta da API para modelo interno
    private infoMapper: PokemonInfoMapper, // Converte detalhes do Pokémon para modelo interno
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
      this.listaGeral = this.mapper.mapFromDTO(response); // Converte para modelo interno
      this.listaFiltrada = this.listaGeral; // Inicialmente, exibe todos os pokemons

      // Para cada Pokémon, busca seus detalhes (como tipos, habilidades etc.)
      this.listaGeral.forEach((pokemon) => {
        this.pokedexService.getPokemonById(pokemon.nome).subscribe((info) => {
          pokemon.info = this.infoMapper.mapFromDTO(info);
        });
      });
      console.log('Tamanho da lista geral ' + this.listaGeral.length);
      this.carregarMaisPokemons(); // Carrega primeiros itens
    });
  }

  // Método que define uma imagem alternativa para exibição caso a imagem não não seja encontrada
  setFallbackImage(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    const currentSrc = imgElement.src;
    const idMatch = currentSrc.match(/\/(\d+)\.svg$/);
    // Verifica se o ID do Pokémon pode ser extraído do URL da imagem
    if (idMatch) {
      const id = idMatch[1];
      // Se o ID for encontrado, define a imagem alternativa (PNG) para o Pokémon
      imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
    }
  }

  // Estilo visual do card com base no tipo do Pokémon
  // Método que retorna o tipo Pokémon, incluindo gradiente de fundo e sombra
  getCardStyle(pokemon: any): any {
    // Validação: verifica se pokemon.info e pokemon.info.types existem e possuem ao menos um item
    if (!pokemon?.info?.types || pokemon.info.types.length === 0) {
      return {}; // Estilo padrão ou vazio para evitar quebra
    }

    const bgStyle = PokemonColorUtils.getGradientFromApiTypes(
      pokemon.info?.types
    );
    const boxShadow = this.getBoxShadow(pokemon.info?.types?.[0]?.type?.name);

    return {
      ...bgStyle,
      'background-size': 'cover',
      'background-position': 'initial',
      'background-position-x': 'center',
      'background-position-y': 'center',
      'background-blend-mode': 'luminosity',
      'box-shadow': boxShadow,
    };
  }

  // Define sombra do card com base no tipo do Pokémon
  getBoxShadow(type: string): string {
    return PokemonColorUtils.getTypeBorderGlowFromApi(type);
  }

  // Cores associadas aos tipos dos Pokémons (usadas para ícones, etc.)
  typeColors: { [key: string]: string } = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
    normal: '#A8A878',
  };
}
