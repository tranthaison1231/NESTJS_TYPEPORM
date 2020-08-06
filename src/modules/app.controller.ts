import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { uploadImage } from '@/config/cloudinary.config';
import { multerOptions } from '@/config/multer.config';
import { AuthGuard } from '@nestjs/passport';
import { AwsService } from '../shared/aws.service';
import { FileUploadDto } from '../shared/upload/file-upload.dto';

@Controller('api')
@ApiTags('Default')
export class AppController {
  constructor(private awsService: AwsService) {}

  @Post('uploads')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Up load image',
  })
  @ApiBody({
    description: 'Image',
    type: FileUploadDto,
  })
  async uploadFile(@UploadedFile() file): Promise<string> {
    const result = await uploadImage(file);
    return result;
  }
}
