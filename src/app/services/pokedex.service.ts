import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=150';

  constructor(private http: HttpClient) {}

  getListaPokemon(): Observable<any> {
    return this.http.get<any>(this.apiURL);
    //se nenhum nome for digitado, carregar lista com uma quantidade de pokemons (exemplo: listar os 150 primeiros)
  }
}
