import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter, imageStorage } from '../utils/file-upload.util';

@Controller('upload')
export class UploadController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: imageStorage,
      fileFilter: imageFileFilter,
    })
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = `/uploads/${file.filename}`;
    return { imageUrl };
  }
}
