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
import { UserDto, PhoneDto, GetUsersQueryDto } from './dto/user.dto';
import { nexmo } from '../config/nexmo.config';
import { ProductsService } from '../products/products.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { uploadImage } from '../config/cloudinary.config';
import { multerOptions } from '../config/multer.config';
import { FileUploadDto } from '../users/dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  private logger = new Logger('UsersController');

  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(
    @Query(ValidationPipe) { limit = 10, page = 0 }: GetUsersQueryDto,
  ): Promise<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;
    return this.usersService.getAllUser(page, limit);
  }

  @Delete()
  deleteAllUser(): Promise<void> {
    return this.usersService.deleteAllUser();
  }

  @Post()
  sendSMS(): void {
    nexmo.verify.request(
      {
        number: '84901989847',
        brand: 'Nexmo',
        code_length: '4',
      },
      (err, result) => {
        console.log(err ? err : result);
      },
    );
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.deleteUserById(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) userDto: UserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, userDto);
  }

  @Post('uploads')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Product image',
    type: FileUploadDto,
  })
  async uploadFile(@UploadedFile() file): Promise<string> {
    const result = await uploadImage(file);
    return result;
  }
}
