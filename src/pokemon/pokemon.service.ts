import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    const { name, no } = createPokemonDto;
    try {
      const pokemon = await this.pokemonModel.create({
        name: name.toLowerCase(),
        no,
      });
      return pokemon;
    } catch (error) {
      this.handleException(error);
    }
  }

  async createMany(createPokemonDto: CreatePokemonDto[]) {
    try {
      const pokemons = await this.pokemonModel.create(
        createPokemonDto.map(({ name, no }) => ({
          name: name.toLowerCase(),
          no,
        })),
      );
      return pokemons;
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll(querParameters: PaginationDto) {
    const { limit = 10, offset = 0 } = querParameters;
    return this.pokemonModel
      .find()
      .skip(offset)
      .limit(limit)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: +term });
    }
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findOne({ _id: term });
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    if (!pokemon) throw new NotFoundException(`Pokemon #${term} not found`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(term);

      const { name, no } = updatePokemonDto;
      if (name) pokemon.name = name.toLowerCase().trim();
      if (no) pokemon.no = no;

      return await pokemon.save();
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    const result = await this.pokemonModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Pokemon #${id} not found`);
    }
    return;
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon already exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create pokemon - Check server logs`,
    );
  }
}
