import {Model, model, property} from '@loopback/repository';

@model()
export class Notificacioncorreo extends Model {
  @property({
    type: 'string',
    required: true,
  })
  destinatario: string;

  @property({
    type: 'string',
    required: true,
  })
  asunto: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;

  @property({
    type: 'string',
    required: true,
  })
  adjunto: string;


  constructor(data?: Partial<Notificacioncorreo>) {
    super(data);
  }
}

export interface NotificacioncorreoRelations {
  // describe navigational properties here
}

export type NotificacioncorreoWithRelations = Notificacioncorreo & NotificacioncorreoRelations;
