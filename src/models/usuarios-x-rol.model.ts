import {Entity, model, property} from '@loopback/repository';

@model()
export class UsuariosXRol extends Entity {

  @property({
    type: 'string',
  })
  id_rol?: string;

  @property({
    type: 'string',
  })
  id_usuario?: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  constructor(data?: Partial<UsuariosXRol>) {
    super(data);
  }
}

export interface UsuariosXRolRelations {
  // describe navigational properties here
}

export type UsuariosXRolWithRelations = UsuariosXRol & UsuariosXRolRelations;
