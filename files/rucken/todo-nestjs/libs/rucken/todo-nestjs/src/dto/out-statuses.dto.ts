import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { StatusDto } from './status.dto';
import { MetaDto } from '@rucken/core-nestjs';

export class OutStatusesDto {
  @Type(() => StatusDto)
  @ApiModelProperty({ type: StatusDto, isArray: true })
  statuses: StatusDto[];

  @Type(() => MetaDto)
  @ApiModelProperty({ type: MetaDto })
  meta: MetaDto;
}
