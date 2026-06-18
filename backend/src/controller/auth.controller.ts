import { Body, Controller, Get, Post, Put, UseGuards, Req, BadRequestException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "src/auth/auth.dto";
import { RegisterDto } from "src/auth/register.dto";
import { UpdateProfileDto } from "src/auth/update-profile.dto";
import { PurchaseDto } from "src/auth/purchase.dto";
import { AuthService } from "src/service/auth.service";
import express from "express";

@Controller("/api/authLogin")
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) {}

    @Get('perfil')
    @UseGuards(AuthGuard('jwt'))
    getPerfil(@Req() req) {
        return this.authService.getProfile(req.user.userId);
    }

    @Put('perfil')
    @UseGuards(AuthGuard('jwt'))
    updatePerfil(@Req() req, @Body() dados: UpdateProfileDto) {
        return this.authService.updateProfile(req.user.userId, dados);
    }

    @Post('comprar')
    @UseGuards(AuthGuard('jwt'))
    comprarIngresso(@Req() req, @Body() dados: PurchaseDto) {
        return this.authService.purchaseTicket(req.user.userId, dados);
    }

    @Post('register')
    register(@Body() dados: RegisterDto) {
        return this.authService.register(dados);
    }

    @Post('/login')
    postAuthLog(@Body() loginDto: LoginDto, @Req() req: express.Request) {
        const authHeader = req.headers['authorization'];
        if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
                this.jwtService.verify(token);
                throw new BadRequestException('Você já está logado. Saia da conta atual para entrar em outra.');
            } catch (e) {
                if (e instanceof BadRequestException) throw e;
                // token inválido ou expirado, permite o login normalmente
            }
        }
        return this.authService.postAuthLog(loginDto);
    }
}