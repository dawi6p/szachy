import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'output/entities/User';
import { Repository, Like, IntegerType } from 'typeorm';

// This should be a real class/interface representing a user entity
export enum UserRole {
  User = 0,
  Admin = 1,
} 

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(szukany:string = ""): Promise<User[]> {
    let where = {}
    if (szukany.length){
      where = {Email: Like(`%${szukany}%`)}
    }
    return this.userRepository.find({where});
  }

  findOne(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({email});
  }

  findOneId(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({id});
  }


  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async save(User: User): Promise<void>{
    await this.userRepository.save(User);
  }

  async deleted(User: User): Promise<void>{
    await this.userRepository.update({id:User.id}, {deleted:User.deleted});
  }

  async updateEmail(User: User): Promise<void>{
    await this.userRepository.update({id:User.id}, {email:User.email});
  }

  async updateNickName(User: User): Promise<void>{
    await this.userRepository.update({id:User.id}, {nickName:User.nickName});
  }

  async updatePassword(User: User): Promise<void>{
    await this.userRepository.update({id:User.id}, {password:User.password});
  }

  async ban(User: User): Promise<void>{
    await this.userRepository.update({id:User.id}, {bannedUntil:User.bannedUntil});
  }
}
  