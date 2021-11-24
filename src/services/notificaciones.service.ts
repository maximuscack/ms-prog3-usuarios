import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {configuraciones} from '../config/configuraciones';
import {Notificacioncorreo, Notificacionsms} from '../models';


const fetch = require("node-fetch");

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  enviarsms(notificacion : Notificacionsms): boolean{

    let url = `${configuraciones.url_notificaciones_email}?${configuraciones.arg_hash_notificaciones}=${configuraciones.hash_notificaciones}&${configuraciones.arg_destino_sms_notificaciones}=${notificacion.destino}&${configuraciones.arg_mensaje_sms_notificaciones}=${notificacion.mensaje}`;
   fetch(url)
   .then((data: any) => {
     return true;
       });
       return true;
   }


  enviarcorreo(notificacion : Notificacioncorreo): boolean{

    let url = `${configuraciones.url_notificaciones_sms}?${configuraciones.arg_hash_notificaciones}=${configuraciones.hash_notificaciones}&${configuraciones.arg_asunto_correo_notificaciones}=${notificacion.asunto}&${configuraciones.arg_destino_correo_notificaciones}=${notificacion.destinatario}&${configuraciones.arg_mensaje_correo_notificaciones}=${notificacion.mensaje}`;
   fetch(url)
   .then((data: any) => {
     return true;
       });
       return true;
   }
}

