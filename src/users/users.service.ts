import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/user.dto';
import { supabase } from '../database/supabase.configure';

@Injectable()
export class UsersService {
  async findAll() {
    const { data, error } = await supabase.from('users').select('*');

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
