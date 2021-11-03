import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';


const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb+srv://usuarioucaldas:qkG8PQ5iU244hMIT@cluster0.us0as.mongodb.net/usuariosDB?retryWrites=true&w=majority',
  host: 'localhost',
  port: 27017,
  user: 'usuarioucaldas',
  password: 'qkG8PQ5iU244hMIT',
  database: 'usuariosDB',
  useNewUrlParser: true
};
/*
saldarriaga
const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb+srv://usuarioucaldas:qkG8PQ5iU244hMIT@cluster0.us0as.mongodb.net/usuariosDB?retryWrites=true&w=majority',
  host: 'localhost',
  port: 27017,
  user: 'usuarioucaldas',
  password: 'qkG8PQ5iU244hMIT',
  database: 'usuariosDB',
  useNewUrlParser: true
};
/*
/*lopez*/
/*
const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb+srv://usuario_prog3:LhusuFrmt0xRRB7I@cluster0.0ziuo.mongodb.net/usuariosDB?retryWrites=true&w=majority',
  host: 'localhost',
  port: 27017,
  user: 'usuario_prog3',
  password: 'LhusuFrmt0xRRB7I',
  database: 'usuariosDB',
  useNewUrlParser: true
};
*/

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
