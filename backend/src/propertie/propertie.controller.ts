import { Controller } from '@nestjs/common';
import { PropertieService } from './propertie.service';

@Controller('propertie')
export class PropertieController {
  constructor(private readonly propertieService: PropertieService) {}
}
