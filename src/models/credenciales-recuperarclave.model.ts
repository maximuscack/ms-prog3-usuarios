import {Model, model, property} from '@loopback/repository';

@model()
export class credencialesRecuperarclave extends Model {
  @property({
    type: 'string',
    required: true,
  })
  correo: string;


  constructor(data?: Partial<credencialesRecuperarclave>) {
    super(data);
  }
}

export interface RecuperarclaveRelations {
  // describe navigational properties here
}

export type RecuperarclaveWithRelations = credencialesRecuperarclave & RecuperarclaveRelations;
