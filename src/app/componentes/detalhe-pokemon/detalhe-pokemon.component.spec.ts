import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhePokemonComponent } from './detalhe-pokemon.component';

describe('DetalhePokemonComponent', () => {
  let component: DetalhePokemonComponent;
  let fixture: ComponentFixture<DetalhePokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhePokemonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
