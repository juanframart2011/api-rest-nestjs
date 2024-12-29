import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';
import { userActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Role } from 'src/common/enum/rol.enum';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed) private readonly breedRepository: Repository<Breed>
  ){}

  async create(createCatDto: CreateCatDto, user:userActiveInterface) {
    
    const breed = await this.validateBreed(createCatDto.breed);

    return await this.catRepository.save({
      ...createCatDto,
      breed,
      userEmail: user.email,
    });
  }

  async findAll(user:userActiveInterface) {
    if(user.role === Role.ADMIN){
      return await this.catRepository.find();
    }
    return await this.catRepository.find({
      where: {userEmail: user.email}
    });
  }

  async findOne(id: number,user:userActiveInterface) {

    const cat = await this.catRepository.findOneBy({
      id
    });

    if( !cat ){
      throw new BadRequestException('cat not found');
    }

    this.validateOwnership(cat,user);
    
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto,user:userActiveInterface) {
    
    await this.findOne(id, user );
    return await this.catRepository.update(id, {
      ...updateCatDto,
      breed: updateCatDto.breed ? await this.validateBreed(updateCatDto.breed) : undefined,
      userEmail: user.email,
    })
  }

  async remove(id: number,user:userActiveInterface) {
    return await this.catRepository.softDelete({id});
  }

  private async validateBreed(breed: string) {
    const breedEntity = await this.breedRepository.findOneBy({ name: breed });
  
    if (!breedEntity) {
      throw new BadRequestException('Breed not found');
    }
  
    return breedEntity;
  }

  private validateOwnership(cat:Cat, user:userActiveInterface){
    if( user.role !== Role.ADMIN && cat.userEmail !== user.email){
      throw new UnauthorizedException();
    }
  }
}