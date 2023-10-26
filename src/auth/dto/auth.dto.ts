/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class AuthJwtDto {
  @ApiProperty({
    description: 'JWT auth token',
    example:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ.-xN_h82PHVTCMA9vdoHrcZxH-x5mb11y1537t3rGzcM',
    type: String,
  })
  access_token: string;
}
