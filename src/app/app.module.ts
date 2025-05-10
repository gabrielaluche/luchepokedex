import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaPokemonComponent } from './componentes/lista-pokemon/lista-pokemon.component';
import { DetalhePokemonComponent } from './componentes/detalhe-pokemon/detalhe-pokemon.component';
import { CardPokemonComponent } from './componentes/card-pokemon/card-pokemon.component';
import { SearchHeaderComponent } from './componentes/search-header/search-header.component';
import { PokedexService } from './services/pokedex.service';

@NgModule({
  declarations: [
    AppComponent,
    ListaPokemonComponent,
    DetalhePokemonComponent,
    CardPokemonComponent,
    SearchHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PokedexService],
  bootstrap: [AppComponent]
})
export class AppModule { }
