import { Controller, Post, Body, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

import Response from '../common/response/response';

import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { RestorePasswordDto } from './dto/restorepassword.dto';

@ApiUseTags('Autenticación')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService
    ) { }

    @ApiOperation({
        title: 'iniciar sesion',
        description: 'Login, metodo post para el inicio de sesión'
    })
    @ApiResponse({
        status: 200,
        description: 'Login Correcto, retorna un token'
    })
    @ApiResponse({
        status: 401,
        description: 'credenciales invalidas, no autorizado'
    })
    @ApiResponse({
        status: 400,
        description: 'ningun dato llego al servidor'
    })
    @Post('/login')
    public async login(@Body() login: LoginDto): Promise<any> {
        //600, son 6 dias dado el formato de moment (YYYYMMDDHmm)
        if (login !== undefined) {
            let res = await this.authService.login(login, 600);
            if (res) {
                return Response
                    .status({ statusCode: HttpStatus.OK, state: 'OK' })
                    .message('login OK')
                    .json({
                        data: this.jwtService.sign(res)
                    })
                ;
            }
            return Response
                .status({ statusCode: HttpStatus.UNAUTHORIZED, state: 'UNAUTHORIZED'})
                .message('Credenciales no validas')
                .json({ data: [] })
            ;
        }
        return Response
            .status({ statusCode: HttpStatus.BAD_REQUEST, state:'BAD_REQUEST' })
            .message('Ningun dato llego al servidor')
            .json({ data: [] })
        ;
    }

    @Post('/singup')
    public async signup(@Body() signup: SignUpDto) {
        return;
    }

    @Put('restorepassword')
    @UseGuards(AuthGuard())
    public async restorePassword(@Body() rpDto: RestorePasswordDto) {

    }

}