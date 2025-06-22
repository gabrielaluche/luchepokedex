import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ListaPokemonComponent } from './componentes/lista-pokemon/lista-pokemon.component';
import { CardPokemonComponent } from './componentes/card-pokemon/card-pokemon.component';
import { SearchHeaderComponent } from './componentes/search-header/search-header.component';
import { DetalhePokemonComponent } from './componentes/detalhe-pokemon/detalhe-pokemon.component';

import { PokedexService } from './services/pokedex.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PadIdPipe } from './pipes/pad-id.pipe';
import { ImageFallbackDirective } from './directives/image-fallback.directive';

@NgModule({
  declarations: [
    AppComponent,
    ListaPokemonComponent,
    CardPokemonComponent,
    SearchHeaderComponent,
    DetalhePokemonComponent,
    PadIdPipe,
    ImageFallbackDirective,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbNavModule
  ],
  providers: [PokedexService],
  bootstrap: [AppComponent],
})
export class AppModule {}
