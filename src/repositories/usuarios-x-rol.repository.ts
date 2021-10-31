import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {UsuariosXRol, UsuariosXRolRelations} from '../models';

export class UsuariosXRolRepository extends DefaultCrudRepository<
  UsuariosXRol,
  typeof UsuariosXRol.prototype.id,
  UsuariosXRolRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(UsuariosXRol, dataSource);
  }
}
