import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private bancoDeDados: CreateUserDto[] = [];

  create(user: CreateUserDto) {
    if (user.password !== user.passwordConfirm) {
      throw new UnauthorizedException(
        'As senhas digitadas não são compativeis',
      );
    }

    this.bancoDeDados.push(user);

    const bancoAuxiliar = this.bancoDeDados.map((user) => ({
      nome: user.name,
      email: user.email,
      phone: user.phone,
    }));

    return bancoAuxiliar;
  }

  read(id: string) {
    const encontrei = this.bancoDeDados.find((user) => user.id === id);
    if (!encontrei) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return encontrei;
  }
}
