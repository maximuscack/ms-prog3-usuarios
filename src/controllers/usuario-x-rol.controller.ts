import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UsuariosXRol} from '../models';
import {UsuariosXRolRepository} from '../repositories';

export class UsuarioXRolController {
  constructor(
    @repository(UsuariosXRolRepository)
    public usuariosXRolRepository : UsuariosXRolRepository,
  ) {}

  @post('/usuarios-x-rols')
  @response(200, {
    description: 'UsuariosXRol model instance',
    content: {'application/json': {schema: getModelSchemaRef(UsuariosXRol)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuariosXRol, {
            title: 'NewUsuariosXRol',
            exclude: ['id_rol'],
          }),
        },
      },
    })
    usuariosXRol: Omit<UsuariosXRol, 'id'>,
  ): Promise<UsuariosXRol> {
    return this.usuariosXRolRepository.create(usuariosXRol);
  }

  @get('/usuarios-x-rols/count')
  @response(200, {
    description: 'UsuariosXRol model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UsuariosXRol) where?: Where<UsuariosXRol>,
  ): Promise<Count> {
    return this.usuariosXRolRepository.count(where);
  }

  @get('/usuarios-x-rols')
  @response(200, {
    description: 'Array of UsuariosXRol model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UsuariosXRol, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UsuariosXRol) filter?: Filter<UsuariosXRol>,
  ): Promise<UsuariosXRol[]> {
    return this.usuariosXRolRepository.find(filter);
  }

  @patch('/usuarios-x-rols')
  @response(200, {
    description: 'UsuariosXRol PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuariosXRol, {partial: true}),
        },
      },
    })
    usuariosXRol: UsuariosXRol,
    @param.where(UsuariosXRol) where?: Where<UsuariosXRol>,
  ): Promise<Count> {
    return this.usuariosXRolRepository.updateAll(usuariosXRol, where);
  }

  @get('/usuarios-x-rols/{id}')
  @response(200, {
    description: 'UsuariosXRol model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UsuariosXRol, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UsuariosXRol, {exclude: 'where'}) filter?: FilterExcludingWhere<UsuariosXRol>
  ): Promise<UsuariosXRol> {
    return this.usuariosXRolRepository.findById(id, filter);
  }

  @patch('/usuarios-x-rols/{id}')
  @response(204, {
    description: 'UsuariosXRol PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuariosXRol, {partial: true}),
        },
      },
    })
    usuariosXRol: UsuariosXRol,
  ): Promise<void> {
    await this.usuariosXRolRepository.updateById(id, usuariosXRol);
  }

  @put('/usuarios-x-rols/{id}')
  @response(204, {
    description: 'UsuariosXRol PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuariosXRol: UsuariosXRol,
  ): Promise<void> {
    await this.usuariosXRolRepository.replaceById(id, usuariosXRol);
  }

  @del('/usuarios-x-rols/{id}')
  @response(204, {
    description: 'UsuariosXRol DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuariosXRolRepository.deleteById(id);
  }
}
