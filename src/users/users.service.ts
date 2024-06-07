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
  //  TODO update user
  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
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
  // TODO - adicionar o id ao campos followers do usuario que sera bsucado com o userFollowedId
  async follow(user, userFollowedId: string) {
    const { id } = user;
    let userFollowed;
    let userFollowing;
    let allFollowers = [] as string[];
    let allFollowing = [] as string[];
    await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) throw new Error(`Error ${error.message}`);
        userFollowing = data;
      });
    if (
      userFollowing?.following?.length &&
      userFollowing.following.indexOf(userFollowedId) == -1
    ) {
      allFollowing = [...userFollowing.following, userFollowedId];
    } else {
      allFollowing = [userFollowedId];
    }

    await supabase
      .from('users')
      .update({ following: allFollowing })
      .eq('id', id)
      .maybeSingle()
      .then(({ error }) => {
        if (error) throw new Error(`Error ${error.message}`);
      });
    await supabase
      .from('users')
      .select('*')
      .eq('id', userFollowedId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) throw new Error(`Error ${error.message}`);
        userFollowed = data;
      });
    if (
      userFollowed?.followers?.length &&
      userFollowed.followers.indexOf(id) == -1
    ) {
      allFollowers = [...userFollowed.followers, id];
    } else {
      allFollowers = [id];
    }

    await supabase
      .from('users')
      .update({ followers: allFollowers })
      .eq('id', userFollowedId)
      .maybeSingle()
      .then(({ error }) => {
        if (error) throw new Error(`Error ${error.message}`);
      });
    return `User followed ✅`;
  }
}
