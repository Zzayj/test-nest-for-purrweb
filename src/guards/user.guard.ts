/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new UnauthorizedException('Токен не передан');
      }
      if (authHeader.split(' ')[0] != 'Bearer') {
        throw new UnauthorizedException('Неверный тип токена');
      }
      const token = authHeader.split(' ')[1];

      try {
        const user = this.jwtService.verify(token)['id'];
        const owner = req.params['userId'] | req.query['userId'];
        req['owner'] = owner
        return (
          user == owner || this.jwtService.verify(token)['role'] == 'ADMIN'
        );
      } catch {
        throw new ForbiddenException('Token expired');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
