import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http:AxiosAdapter,
  ) {}
  
  async executeSeed() {

    

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10'); 

    const pokemons = data.results.map(({url,name}) => {
      const no:number = +url.split('/')[url.split('/').length - 2];
      const pokemons = {
        name,
        no
      }

      return pokemons;  
    }); 

    await this.pokemonService.createMany(pokemons);

    return data.results;
  }

}
