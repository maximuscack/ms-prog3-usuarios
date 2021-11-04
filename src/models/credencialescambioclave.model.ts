import {Model, model, property} from '@loopback/repository';

@model()
export class Credencialescambioclave extends Model {
  @property({
    type: 'string',
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  clave_actual: string;

  @property({
    type: 'string',
    required: true,
  })
  nueva_clave: string;


  constructor(data?: Partial<Credencialescambioclave>) {
    super(data);
  }
}

export interface CredencialescambioclaveRelations {
  // describe navigational properties here
}

export type CredencialescambioclaveWithRelations = Credencialescambioclave & CredencialescambioclaveRelations;
