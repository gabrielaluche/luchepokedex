import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appImageFallback]',
})
export class ImageFallbackDirective {
  constructor() {}

  // O @HostListener "escuta" por eventos no elemento que tem a diretiva.
  // Aqui, ele vai esperar pelo evento 'error', que acontece quando uma imagem não carrega.
  @HostListener('error', ['$event'])
  loadFallbackImage(event: Event) {
    console.log('Imagem falhou, ativando fallback da diretiva...');

    const imgElement = event.target as HTMLImageElement;
    const currentSrc = imgElement.src;

    // Lógica para extrair o ID da URL que falhou (Dream World SVG)
    const idMatch = currentSrc.match(/\/(\d+)\.svg$/);

    if (idMatch) {
      const id = idMatch[1];
      // Define a imagem alternativa (PNG pixel art)
      imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    } else {
      // Se por algum motivo não conseguir extrair o ID, usa um placeholder genérico
      imgElement.src =
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
    }
  }
}
