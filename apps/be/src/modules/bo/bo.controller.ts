// bo.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('bo')
export class BoController {
  // 这里可以定义一些通用的端点
  @Get("/test")
  async test() {
    return true
  }
}