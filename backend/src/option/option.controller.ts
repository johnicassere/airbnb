import { Body, Controller, Post } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('option')
@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  @ApiOperation({
    summary:
      'Criar uma opção para uma propriedade, exemplo: Chuveiro, Secador, Banheira',
  })
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionService.create(createOptionDto);
  }
}
