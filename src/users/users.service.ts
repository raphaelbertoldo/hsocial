import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/user.dto';
import { supabase } from '../database/supabase.configure';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private readonly jwtService: JwtService) {}

  async getProfile(req) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error('Token not provided');
      }

      const tokenString = token.replace('Bearer ', '');

      const decodedToken = this.jwtService.decode(tokenString);
      if (!decodedToken || !decodedToken['email']) {
        throw new Error('Invalid token or missing email');
      }

      const userId = decodedToken['sub'];

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .limit(1);
      if (error) {
        throw new Error(`Failed to query user: ${error.message}`);
      }

      if (!data || data.length === 0) {
        throw new Error(`User not found with email`);
      }

      const userProfile = data[0];

      return userProfile;
    } catch (error) {
      throw new Error(`Failed to get user profile: ${error.message}`);
    }
  }
  async findAll() {
    const { data, error } = await supabase.from('users').select('*');

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
