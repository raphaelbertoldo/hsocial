import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('user')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('me')
  getCurrentUser(@Req() req: Request) {
    return this.usersService.getCurrentUser(req);
  }

  @Get('profile/:id')
  getProfile(@Param() params: { id: string }) {
    return this.usersService.getUserById(params.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Post('follow/:userToFollowId')
  follow(@User() user, @Param('userToFollowId') userToFollowId: string) {
    return this.usersService.follow(user, userToFollowId);
  }
}
