import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { supabase } from '../database/supabase.configure';
import { hashPassword } from 'src/utils/functions';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .limit(1);

    if (error || !users || users.length === 0) {
      throw new UnauthorizedException('This user not exists');
    }

    const user = users[0];

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async signIn(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { email: user.email, sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
    };
  }

  async signUp({ name, email, password }) {
    try {
      await supabase
        .from('users')
        .insert({ name, email, password: await hashPassword(password) });
      return `User registerd with successfull`;
    } catch (error) {
      console.error(`Error when register rthis user: `);
    }
  }
}
