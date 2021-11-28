export namespace configuraciones{
  export const url_notificaciones_email ="http://127.0.0.1:5000/email"

  export const url_notificaciones_sms ="http://127.0.0.1:5000/sms"



  export const hash_notificaciones="admin123";


  export const asunto_cambio_clave="cambio de contraseña"
  export const saludo_notificaciones = "hola"
  export const mensaje_cambio_clave="se ha modificado su contraseña en el sistema"
  export const arg_hash_notificaciones ="hash";
  export const arg_destino_correo_notificaciones="correo_destino"
  export const arg_mensaje_correo_notificaciones="mensaje"
  export const arg_asunto_correo_notificaciones="asunto"

  export const arg_mensaje_recuperar_clave="su nueva clave solicitada es"

  export const arg_destino_sms_notificaciones="destino"
  export const arg_mensaje_sms_notificaciones="mensaje"
  export const url_crear_token="http://localhost:5001/crear-token";
  export const arg_nombre_token= "nombre"
  export const arg_id_persona_token= "id"
  export const arg_id_rol_token= "id_rol"
}
