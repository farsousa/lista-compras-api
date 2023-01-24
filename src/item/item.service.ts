import { Item } from './entities/item.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly repository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = this.repository.create(createItemDto);
    return await this.repository.save(item);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(codigo: string) {
    const item = await this.repository.findOne({
      where: {
        codigo: codigo,
      },
    });
    if (!item) {
      throw new NotFoundException(`Item ${codigo} not found`);
    }
    return item;
  }

  async update(codigo: string, updateItemDto: UpdateItemDto) {
    const item = await this.repository.preload({
      codigo: codigo,
      ...updateItemDto,
    });
    if (!item) {
      throw new NotFoundException(`Item ${codigo} not found`);
    }
    return this.repository.save(item);
  }

  async remove(codigo: string) {
    const item = await this.findOne(codigo);
    if (!item) {
      throw new NotFoundException(`Item ${codigo} not found`);
    }
    return this.repository.remove(item);
  }
}
