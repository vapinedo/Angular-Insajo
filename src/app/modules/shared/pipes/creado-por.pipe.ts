import { Pipe, PipeTransform } from '@angular/core';
import { UsuarioService } from '@core/services/usuario.service';

@Pipe({ name: 'creadoPor' })
export class CreadoPorPipe implements PipeTransform {

  constructor(private usuarioSvc: UsuarioService) {}

  async transform(id: any) {
    const user = await this.usuarioSvc.readbyId(id);
    return "Hola";
  }
}