import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/user.dto';
import { supabase } from '../database/supabase.configure';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private readonly jwtService: JwtService) {}

  async getCurrentUser(req) {
    try {
      const user = this.findUserById(req.user.sub);
      return user;
    } catch (error) {
      throw new Error(`Failed to get current user: ${error.message}`);
    }
  }
  async getUserById(id: string) {
    try {
      const user = this.findUserById(id);
      return user;
    } catch (error) {
      throw new Error(`Failed to get user by id: ${error.message}`);
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
  async findUserById(userId: string) {
    if (!userId) {
      throw new Error('Id not provided');
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .limit(1);
    if (error) {
      throw new Error(`Failed in function findUserById: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error(`User not found`);
    }

    const userProfile = data[0];
    return userProfile;
  }
}
