import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rol, RolRelations, Usuario, UsuariosXRol} from '../models';
import {UsuariosXRolRepository} from './usuarios-x-rol.repository';
import {UsuarioRepository} from './usuario.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly id_rol_usuario: HasManyThroughRepositoryFactory<Usuario, typeof Usuario.prototype.id,
          UsuariosXRol,
          typeof Rol.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuariosXRolRepository') protected usuariosXRolRepositoryGetter: Getter<UsuariosXRolRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Rol, dataSource);
    this.id_rol_usuario = this.createHasManyThroughRepositoryFactoryFor('id_rol_usuario', usuarioRepositoryGetter, usuariosXRolRepositoryGetter,);
    this.registerInclusionResolver('id_rol_usuario', this.id_rol_usuario.inclusionResolver);
  }
}
