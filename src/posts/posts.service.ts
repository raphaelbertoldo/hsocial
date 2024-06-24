import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { supabase } from '../database/supabase.configure';

@Injectable()
export class PostsService {
  async create(req, {content}: CreatePostDto) {
    const user = req.user.sub
    try {
      await supabase.from('posts').insert({ owner: user, content: "okokokok"  });
      return 'This action adds a new post';
    } catch (error) {
      console.error("~error:", error)
    }
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
