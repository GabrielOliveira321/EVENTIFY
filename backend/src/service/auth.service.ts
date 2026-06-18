import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "src/auth/auth.dto";
import * as bcrypt from 'bcrypt';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/modules/user.model";
import { Purchase } from "src/modules/purchase.model";
import { RegisterDto } from "src/auth/register.dto";
import { UpdateProfileDto } from "src/auth/update-profile.dto";
import { PurchaseDto } from "src/auth/purchase.dto";

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Purchase)
        private purchaseRepository: Repository<Purchase>,
    ) { }

    async postAuthLog(dados: LoginDto) {
        if (!dados) {
            throw new BadRequestException('Nenhum dado foi enviado');
        }

        const usuarioEncontrado = await this.userRepository.findOne({
            where: {
                email: dados.email.toLowerCase().trim()
            }
        });

        if (!usuarioEncontrado) {
            throw new UnauthorizedException('E-mail ou senha inválidos');
        }

        const senhaValida = await bcrypt.compare(
            dados.password.trim(),
            usuarioEncontrado.password
        );

        if (!senhaValida) {
            throw new UnauthorizedException('E-mail ou senha inválidos');
        }

        const payload = {
            sub: usuarioEncontrado.id,
            email: usuarioEncontrado.email,
        };

        const token = this.jwtService.sign(payload, {
            expiresIn: '3h',
        });

        return {
            access_token: token,
            usuario: {
                id: usuarioEncontrado.id,
                email: usuarioEncontrado.email,
            }
        };
    }

    async register(dados: RegisterDto) {
        if (!dados) {
            throw new BadRequestException('Nenhum dado enviado');
        }

        const email = dados.email.toLowerCase().trim();

        const usuarioExiste = await this.userRepository.findOne({
            where: { email }
        });

        if (usuarioExiste) {
            throw new BadRequestException('E-mail já cadastrado'); 
        }

        const hash = await bcrypt.hash(dados.password.trim(), 10);

        const novoUsuario = await this.userRepository.save({
            name: dados.name,
            email,
            password: hash,
        });

        const payload = {
            sub: novoUsuario.id,
            email: novoUsuario.email,
        };

        const token = this.jwtService.sign(payload, {
            expiresIn: '3h',
        });

        return {
            access_token: token,
            usuario: {
                id: novoUsuario.id,
                email: novoUsuario.email,
            }
        };
    }

    async getProfile(userId: number) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('Usuário não encontrado');

        const { password, ...perfil } = user;
        return perfil;
    }

    async updateProfile(userId: number, dados: UpdateProfileDto) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('Usuário não encontrado');

        await this.userRepository.update(userId, dados);

        const atualizado = await this.userRepository.findOne({ where: { id: userId } });
        const { password, ...perfil } = atualizado!;
        return perfil;
    }

    async purchaseTicket(userId: number, dados: PurchaseDto) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('Usuário não encontrado');

        const confirmationCode = `EVT-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

        const purchase = await this.purchaseRepository.save({
            userId,
            ...dados,
            confirmationCode,
        });

        return {
            id: purchase.id,
            confirmationCode: purchase.confirmationCode,
            userEmail: user.email,
            eventTitle: purchase.eventTitle,
            ticketName: purchase.ticketName,
            quantity: purchase.quantity,
            totalPrice: purchase.totalPrice,
            paymentMethod: purchase.paymentMethod,
            createdAt: purchase.createdAt,
        };
    }
}