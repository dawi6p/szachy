import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,  private jwtService: JwtService) {}
  logedUsersId: Number[] = [];

  async signIn(username: string, pass: string): Promise<any> 
  {
    const user = await this.usersService.findOne(username);
    if(!user){
      return {
        access_token: "Unauthorized", 
      };
    }
    if(this.logedUsersId.includes(user.id))
    {
      return {
        access_token: "Unauthorized", 
      };
    }
    if (!await argon2.verify(user?.password, pass)) {
      return {
        access_token: "Unauthorized", 
      };
    }

    if(user.deleted != null) throw new HttpException("To Konto zostało usunięte! W Dniu " + user.deleted, 200);
    if(user.bannedUntil != null && Date.parse(user.bannedUntil.toISOString()) > Date.now()) throw new HttpException("Zostłeś zbanowany typie! Konto odblokowuje się dnia " + user.bannedUntil, 200);

    this.logedUsersId.push(user.id);
    
    const payload = { adminPower: user.adminPowerId, registrationDate: user.registrationDate, nickName: user.nickName, email: user.email, id: user.id};
    let token = {
      access_token: await this.jwtService.signAsync(payload),
    };
    return token;
  }

  async logout(access_token :string)
  {
    let temp = await this.jwtService.decode(access_token);

    if(temp == "Unauthorized" || temp == null) return;

    this.logedUsersId.splice(this.logedUsersId.indexOf(temp['id']), 1);
  }
}