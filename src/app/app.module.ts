import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaPokemonComponent } from './componentes/lista-pokemon/lista-pokemon.component';
import { DetalhePokemonComponent } from './componentes/detalhe-pokemon/detalhe-pokemon.component';
import { CardPokemonComponent } from './componentes/card-pokemon/card-pokemon.component';
import { SearchHeaderComponent } from './componentes/search-header/search-header.component';
import { PokedexService } from './services/pokedex.service';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ListaPokemonComponent,
    DetalhePokemonComponent,
    CardPokemonComponent,
    SearchHeaderComponent,
  ],
  
  entryComponents: [
    DetalhePokemonComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [PokedexService],
  bootstrap: [AppComponent],
})
export class AppModule {}
