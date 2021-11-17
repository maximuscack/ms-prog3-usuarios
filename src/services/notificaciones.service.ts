import {injectable, /* inject, */ BindingScope} from '@loopback/core';

import { Notificacioncorreo } from '../models';
//import fetch from 'node-fetch';

import {configuraciones} from '../config/configuraciones';
@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */


  async enviarcorreo(notificacion : Notificacioncorreo): Promise <boolean>{

    let url = `${configuraciones.url_notificaciones_email}?hash=${configuraciones.hash_notificaciones}&correo_destino=${notificacion.destinatario}&asunto=${notificacion.asunto}&mensaje=${notificacion.mensaje}`;
    console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log(response)
  if(response.ok){
    return true
  }

    return false;
  }
}
