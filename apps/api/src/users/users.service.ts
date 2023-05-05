import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'output/entities/User';
import { Repository } from 'typeorm';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({email});
  }

  /*async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }*/

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async save(User: User): Promise<void>{
    await this.userRepository.save(User);
  }
}
  