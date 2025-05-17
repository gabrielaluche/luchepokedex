import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private apiUrlTodos = 'https://pokeapi.co/api/v2/pokemon?limit=1000';

  constructor(private http: HttpClient) {}

  getListaPokemon(): Observable<any> {
      return this.http.get<any>(this.apiUrlTodos);
  }

}
