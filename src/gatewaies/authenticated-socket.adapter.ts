import { INestApplicationContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export class AuthenticatedSocketIoAdapter extends IoAdapter {
  private readonly jwtService: JwtService;
  constructor(private app: INestApplicationContext) {
    super(app);
    this.jwtService = this.app.get(JwtService);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    options.allowRequest = async (request, allowFunction) => {
      try {
        const token = (request as any)?._query?.token;
        // verify token
        const verified = token && (await this.jwtService.verify(token));
        // verify success
        if (verified) return allowFunction(null, true);
        // verify error
        return allowFunction('Unauthorized', false);
      } catch (e) {
        console.log(e, 'getDataUserFromToken Error: ');
        return allowFunction('Unauthorized', false);
      }
    };

    return super.createIOServer(port, options);
  }
}
