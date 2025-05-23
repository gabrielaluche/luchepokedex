import { Component, OnInit, Input } from '@angular/core'; // Importa os módulos necessários do Angular
import { PokedexService } from 'src/app/services/pokedex.service'; // Importa o serviço responsável por fazer requisições à API
import { SearchHeaderComponent } from '../search-header/search-header.component'; // Importa o componente de cabeçalho de busca
import { PokeapiMapper } from 'src/app/shared/mapper/pokeapi-mapper'; // Importa a classe responsável por mapear os dados da API para o modelo utilizado na aplicação
import { Pokemon } from 'src/app/shared/model/pokemon'; // Importa o modelo Pokemon que representa a estrutura dos dados do Pokémon

@Component({
  //Decorador que define o metadados do componente
  selector: 'app-lista-pokemon', // Nome da tag HTML que representa esse componente
  templateUrl: './lista-pokemon.component.html', // Caminho do template HTML
  styleUrls: ['./lista-pokemon.component.scss'], // Caminho do CSS
})
export class ListaPokemonComponent implements OnInit {
  // Classe do componente que implementa o ciclo de vida OnInit
  // Lista que será exibida na tela, contendo os Pokémons filtrados
  listaPokemon: Pokemon[] = [];
  // String que armazena o texto digitado no campo de filtro
  filtro = '';
  // Lista geral com todos os Pokémons retornados pela API
  listaGeral: Pokemon[] = [];
  // Lista com os Pokémons mapeados para um modelo mais adequado (classe Pokemon)
  listaMap: Pokemon[] = [];
  // Injeção de dependências via construtor
  constructor(
    private pokedexService: PokedexService, // Serviço responsável por fazer requisições à API
    private mapper: PokeapiMapper // Classe responsável por transformar (mapear) os dados da API para modelos utilizados na aplicação
  ) {}

  // Método que filtra a lista de Pokémons com base no evento (texto digitado)
  filtraPokemon(event: any): void {
    this.listaPokemon = this.listaGeral.filter((item) =>
      // Filtra pelo nome que inclui o texto digitado
      item.nome.includes(event as string)
    );
  }

  // Método do ciclo de vida que é executado automaticamente quando o componente é inicializado
  ngOnInit(): void {
    // Chamada ao serviço para buscar a lista de Pokémons
    this.pokedexService.getListaPokemon().subscribe((response) => {
      // Faz a requisição à API e obtém a resposta
      this.listaPokemon = this.mapper.mapFromDTO(response.results); // Mapeia os dados da API para o modelo Pokemon
      this.listaGeral = this.listaPokemon; // Armazena a lista geral de Pokémons
    });
  }

  setFallbackImage(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    const currentSrc = imgElement.src;

    const idMatch = currentSrc.match(/\/(\d+)\.gif$/);

    if (idMatch) {
      const id = idMatch[1];
      imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
    }
  }
}
