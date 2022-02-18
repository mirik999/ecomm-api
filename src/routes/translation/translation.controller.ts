import { Controller, Get, Param } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('translation')
@Controller('translation')
export class TranslationController {
  constructor(private translationService: TranslationService) {}

  @Get(':code')
  @ApiOkResponse({description: 'Success translation list'})
  @ApiParam({ name: 'code' })
  async getAll(@Param('code') code): Promise<Record<string, string>> {
    console.log('triggger');
    return this.translationService.getAllTranslationForUi(code);
  }
}
