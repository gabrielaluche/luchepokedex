import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ListaPokemonComponent } from './componentes/lista-pokemon/lista-pokemon.component';
import { CardPokemonComponent } from './componentes/card-pokemon/card-pokemon.component';
import { SearchHeaderComponent } from './componentes/search-header/search-header.component';
import { DetalhePokemonComponent } from './componentes/detalhe-pokemon/detalhe-pokemon.component';

import { PokedexService } from './services/pokedex.service';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    ListaPokemonComponent,
    CardPokemonComponent,
    SearchHeaderComponent,
    DetalhePokemonComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [PokedexService],
  bootstrap: [AppComponent],
})
export class AppModule {}
