import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {configuraciones} from '../config/configuraciones';
import {Credenciales, Credencialescambioclave, credencialesRecuperarclave, Notificacioncorreo, Notificacionsms, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {AdministradordeclavesService, NotificacionesService, sesionUsuariosService} from '../services';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository,
    @service(AdministradordeclavesService)
    public servicioclaves :AdministradordeclavesService,
    @service(NotificacionesService)
    public servicionotificaciones : NotificacionesService,
    @service(sesionUsuariosService)
    private serviviosesionusuario : sesionUsuariosService
    ) {}

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    let clave = this.servicioclaves.GenerarClaveAleatoria();

    let notifficacion= new Notificacioncorreo();
      notifficacion.destinatario= usuario.correo;
      notifficacion.asunto = "registro en el sistema";
      notifficacion.mensaje = `hola ${usuario.nombre} <br /> su clave de acceso al sistema es  ${clave} y su usuario es el correo electronico`;
      this.servicionotificaciones.enviarcorreo(notifficacion);

    let clavecifrada = this.servicioclaves.CifrarTexto(clave);
    usuario.clave =clavecifrada;
    return this.usuarioRepository.create(usuario);
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }



  /**
seccion de seguridad

 */

@post("/identificar-usuarios",{
  responses:{
    '200':{
      description:"identificacion de usuarios"
    }
  }
})
async identificar(
  @requestBody() credenciales:Credenciales
): Promise <object>{

  let usuario = await this.serviviosesionusuario.validarcredenciales(credenciales);

  let token = "";
  if(usuario){
    usuario.clave="";
    token =await this.serviviosesionusuario.creartoken(usuario)

    }
  return {
    tk: token,
    usuario: usuario
  };
}

//

@post("/recuperar-clave",{
  responses:{
    '200':{
      description:"recuperar clave de usuarios"
    }
  }
})
async recuperarclave(
  @requestBody() Credenciales :credencialesRecuperarclave
): Promise <boolean >{

  let usuario =await this.usuarioRepository.findOne({
    where:{
    correo : Credenciales.correo
  }
  });


  if(usuario){
    let clave = this.servicioclaves.GenerarClaveAleatoria();
    let clavecifrada = this.servicioclaves.CifrarTexto(clave);
    usuario.clave = clavecifrada;
    await this.usuarioRepository.updateById(usuario.id, usuario);
//
    let notifficacion= new Notificacionsms();
    notifficacion.destino= usuario.celular;
   notifficacion.mensaje = `${configuraciones.saludo_notificaciones} ${usuario.nombre} ${usuario.nombre}${configuraciones.arg_mensaje_recuperar_clave}${clave}`;
   this.servicionotificaciones.enviarsms(notifficacion);

     return true;
  }
  return false;
}

//

@post("/cambiar-clave",{
  responses:{
    '200':{
      description:"cambiar clave de usuarios"
    }
  }
})
async cambiarclave(
  @requestBody() datos :Credencialescambioclave
): Promise <boolean >{

  let usuario =await this.usuarioRepository.findById(datos.id);


  if(usuario){

    if(usuario.clave == datos.clave_actual){


       usuario.clave = datos.nueva_clave;
      await this.usuarioRepository.updateById(datos.id, usuario);
      // enviar email al usuario notificando el cambio de contraseña
      let notifficacion= new Notificacioncorreo();
      notifficacion.destinatario= usuario.correo;
      notifficacion.asunto = configuraciones.asunto_cambio_clave;
      notifficacion.mensaje = `${configuraciones.saludo_notificaciones} ${usuario.nombre} <br /> ${configuraciones.mensaje_cambio_clave}`;
      this.servicionotificaciones.enviarcorreo(notifficacion);



      return true;
    }else {
      return false;
    }



  }
  return false;
}




}


