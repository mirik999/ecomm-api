import { Controller, Get } from '@nestjs/common';

@Controller('translation')
export class TranslationController {
  @Get()
  getAll(): string {
    return 'hello world';
  }
}
