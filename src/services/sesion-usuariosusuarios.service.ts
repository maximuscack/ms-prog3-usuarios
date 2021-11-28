import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {ANY, repository} from '@loopback/repository';
import {configuraciones as config} from '../config/configuraciones';
import {Credenciales, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
const fetch = require('node-fetch');
@injectable({scope: BindingScope.TRANSIENT})
export class sesionUsuariosService {
  constructor(
    @repository(UsuarioRepository)
     private UsuarioRepository : UsuarioRepository)
   {}

  /*
   * Add service methods here
   */



  async validarcredenciales(credenciales :Credenciales){
    let usuario =await this.UsuarioRepository.findOne({
      where:{
      correo : credenciales.usuario,
      clave: credenciales.clave
    }
    });
      return usuario;
  }





  async creartoken(usuario: Usuario): Promise<string>{
    let url_crear_token =`${config.url_crear_token}?${config.arg_nombre_token}=${usuario.nombre}${config.arg_id_persona_token}=${usuario.id}&${config.arg_id_rol_token}=${usuario.rolTemporal}`;
    let token  ="";
    await fetch(url_crear_token)
    .then((res : any) => {
      token = res.text();
      console.log(token);
    })

    return token;


}

}

