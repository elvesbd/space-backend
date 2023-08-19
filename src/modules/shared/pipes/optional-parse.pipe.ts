import { ArgumentMetadata, ParseIntPipe } from '@nestjs/common';

export class OptionalParseIntPipe extends ParseIntPipe {
  override async transform(value: string, metadata: ArgumentMetadata) {
    if (typeof value === 'undefined') return undefined;

    return super.transform(value, metadata);
  }
}
