import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger,
  UseInterceptors,
  Res,
  UploadedFile,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';

import { GetUser } from 'src/users/get-user-decorator';
import { User } from 'src/users/user.entity';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './user.service';
import { UserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  private logger = new Logger('UsersController');

  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUser();
  }

  @Delete()
  deleteAllUser(): Promise<void> {
    return this.usersService.deleteAllUser();
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) userDto: UserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, userDto);
  }
}
