import {
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
} from '@angular/core';
import { Header } from '../components/header/header';
import { PokemonService } from '../../service/pokemon-service';
import { Pokemon } from '../../model/pokemon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [Header, RouterOutlet],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  public id: InputSignal<number> = input.required<number>();

  private _pokeService: PokemonService;

  private _currentPokemon: Signal<Pokemon | null>;

  constructor() {
    this._pokeService = inject(PokemonService);
    this._currentPokemon = this._pokeService.currentPokemon;
  }

  ngOnInit(): void {
    this._pokeService.getPokemonById(this.id());
  }

  get currentPokemon() {
    return this._currentPokemon;
  }
}
