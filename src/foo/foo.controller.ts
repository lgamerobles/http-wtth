import { Controller,
         Get,
         Post,
         Patch,
         HttpService,
         Body,
         HttpCode,
         HttpStatus,
         Res,
         Param,
         Query,
         Req,
         Logger } from '@nestjs/common';
import { Observable,
         throwError } from 'rxjs';
import { MessageDto } from '../dto/mensaje-dto';
import { LoginDto } from '../dto/login-dto';
import { ValidateCedulaDto } from '../dto/validateCed-dto';
import { PinDto } from '../dto/pin-dto';
import { UpdatePerfil } from '../dto/updatePerfil.dto';
import { Recupera } from '../dto/recupera.dto';
import { RegularizaDto } from '../dto/regulariza-dto';
import { OlvidaPass } from '../dto/olvida.dto';
import { ActivaUser } from '../dto/activa.dto';
import { ActivaWtth } from '../dto/activawtth-dto';
import { Send } from '../dto/send.dto';
import { Verify } from '../dto/verify.dto';
import { ResetPassword } from '../dto/reset.dto';
import { map, catchError } from 'rxjs/operators';
import axios from 'axios'
import qs from 'qs'

const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'mylogfile.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },
log = SimpleNodeLogger.createSimpleLogger( opts );


@Controller('/api/profile')
export class FooController {
  private readonly logger = new Logger();
    constructor(
        private readonly httpService: HttpService,
    ) {}

    // create a custom timestamp format for log statements

    @Post('recuperaPass')
    async recuperaPass(@Body() recupera: Recupera)
    {

      var axios = require('axios');
      /*var data = JSON.stringify({"claroID":"rsoledil@claro.com.ec"});*/
      let respuesta=null;
      var config = {
        method: 'post',
        url: 'http://192.168.37.151:8282/claroId/v2/passwords/recovery',
        headers: {
          'companyId': 'AMCO',
          'Content-Type': 'application/json'
        },
        rejectUnauthorized: false,
        data : recupera
      };

      await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        log.info('Método recovery Claro Id - ', response.data, ' ejecutado el ', new Date().toJSON());
        respuesta=response.data;
      })
      .catch(function (error)
      {
          if (error.response) {
            respuesta=error.response;
           console.log(error.response.data);
          //log.info('Método recovery Claro Id - ', error.response.data, ' ejecutado el ', new Date().toJSON());
           respuesta = error.response.data;
          } else if (error.request) {
              console.log(error.request);
              //log.info('Método recovery Claro Id - ', error.request, ' ejecutado el ', new Date().toJSON());
              respuesta = error.request;
          } else {
              console.log('Error', error.message);
              //log.info('Método recovery Claro Id - ', error.message, ' ejecutado el ', new Date().toJSON());
              respuesta = error.message;
          }
          log.info('Método Create recuperaPass - ', error.config, ' ejecutado el ', new Date().toJSON());
      });
      return respuesta;
    }

    @Post('verify')
    async verify(@Body() verify: Verify)
    {
      var axios = require('axios');
      let respuesta=null;
      var config = {
        method: 'post',
        url: 'http://192.168.37.151:8282/claroId/v2/tokens/verify',
        headers: {
          'Content-Type': 'application/json'
        },
        rejectUnauthorized: false,
        data : verify
      };

      await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        respuesta=response.data;
      })
      .catch(function (error) {
        if (error.response) {
          respuesta=error.response;
         console.log(error.response.data);
        //log.info('Método Verify Claro Id - ', error.response.data, ' ejecutado el ', new Date().toJSON());
         respuesta = error.response.data;
        } else if (error.request) {
            console.log(error.request);
            //log.info('Método Verify Claro Id - ', error.request, ' ejecutado el ', new Date().toJSON());
            respuesta = error.request;
        } else {
            console.log('Error', error.message);
            //log.info('Método Verify Claro Id - ', error.message, ' ejecutado el ', new Date().toJSON());
            respuesta = error.message;
        }
        log.info('Método Verify - ', error.config, ' ejecutado el ', new Date().toJSON());
      });
      return respuesta;
    }

    @Post('resetPassword')
    async resetPassword(@Body() resetPassword: ResetPassword)
    {
      var axios = require('axios');
      //var data = JSON.stringify({"claroID":"lgame@grupo-link.com","resetToken":"3815","password":"789456","identificationCard":{"identify":"0941168569","expeditionDate":"10/01/1990"}});
      let respuesta = null;
      var config = {
        method: 'post',
        url: 'http://192.168.37.151:8282/claroId/v2/passwords/reset',
        headers: {
          'companyId': 'AMCO',
          'Content-Type': 'application/json'
        },
        rejectUnauthorized: false,
        data : resetPassword
      };

      axios(config)
      .then(function (response) {
         respuesta=response.data;
         console.log(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          respuesta=error.response;
         console.log(error.response.data);
        log.info('Método resetPassword Claro Id - ', error.response.data, ' ejecutado el ', new Date().toJSON());
         respuesta = error.response.data;
        } else if (error.request) {
            console.log(error.request);
            log.info('Método resetPassword Claro Id - ', error.request, ' ejecutado el ', new Date().toJSON());
            respuesta = error.request;
        } else {
            console.log('Error', error.message);
            log.info('Método resetPassword Claro Id - ', error.message, ' ejecutado el ', new Date().toJSON());
            respuesta = error.message;
        }
        log.info('Método resetPassword - ', error.config, ' ejecutado el ', new Date().toJSON());
      });
      return respuesta;
    }
    @Post('send')
    async send(@Body() send: Send)
    {
        var axios = require('axios');
        let respuesta = null;
        var config = {
          method: 'post',
          url: 'http://192.168.37.151:8282/claroId/v2/tokens/send',
          headers: {
            'Content-Type': 'application/json'
          },
          rejectUnauthorized: false,
          data : send
        };
        await axios(config)
        .then(function (response) {
          //console.log(JSON.stringify(response.data));
          log.info('Método Send Claro Id - ', response.data, ' ejecutado el ', new Date().toJSON());
          respuesta=response.data;
        })
        .catch(function (error) {
          if (error.response) {
            respuesta=error.response;
           console.log(error.response.data);
          log.info('Método Send Claro Id - ', error.response.data, ' ejecutado el ', new Date().toJSON());
           respuesta = error.response.data;
            } else if (error.request) {
                console.log(error.request);
                log.info('Método Send Claro Id - ', error.request, ' ejecutado el ', new Date().toJSON());
                respuesta = error.request;
            } else {
                console.log('Error', error.message);
                log.info('Método Send Claro Id - ', error.message, ' ejecutado el ', new Date().toJSON());
                respuesta = error.message;
            }
            log.info('Método Send - ', error.config, ' ejecutado el ', new Date().toJSON());
        });
        return respuesta;
    }

    @Post('updatePass')
    olvidaPass(@Body() olvida: OlvidaPass)
    {
      log.info('Método updatePass Entrada - ', olvida, ' ejecutado el ', new Date().toJSON());
      return this.httpService.post("http://192.168.37.146:8082/servlet/microGateway/invoke",
      olvida,
      {
        headers: {
          'Content-Type': 'application/json',
          'idRequest': 'ResetPassClaroId',
        },
      }).pipe(map((res) => {
         log.info('Método updatePass Salida - ', res.data, ' ejecutado el ', new Date().toJSON());
          return res.data;
        }));
    }

    @Post('activaUser')
    async activaUser(@Body() activaUser: ActivaUser)
    {
        var axios = require('axios');
        let respuesta = null;
        var data = activaUser;
        var config = {
            method: 'post',
            url: 'http://192.168.37.151:8282/claroId/v2/users/activate',
            headers: {
              'Content-Type': 'application/json'
            },
            rejectUnauthorized: false,
            data : data
          };
        log.info('Método Activa Claro Id - ', data, ' ejecutado el ', new Date().toJSON());
        await axios(config)
          .then(function (response) {
            //console.log(JSON.stringify(response.data));
            log.info('Método Activa Claro Id - ', JSON.stringify(response.data), ' ejecutado el ', new Date().toJSON());
            respuesta = response.data;
          })
          .catch(function (error) {
            if (error.response) {
             console.log(error.response.data);
             //log.info('Método Activa Claro Id - ', error.response.data, ' ejecutado el ', new Date().toJSON());
             respuesta = error.response.data;
            } else if (error.request) {
                console.log(error.request);
                //log.info('Método Activa Claro Id - ', error.request, ' ejecutado el ', new Date().toJSON());
                respuesta = error.request;
            } else {
                console.log('Error', error.message);
                //log.info('Método Activa Claro Id - ', error.message, ' ejecutado el ', new Date().toJSON());
                respuesta = error.message;
            }
            log.info('Método Create Claro Id - ', error.config, ' ejecutado el ', new Date().toJSON());
          });
          return respuesta;
    }

    @Patch('/:claroId')
    async updatePerfil(@Body() update: UpdatePerfil, @Param('claroId') claroId: string)
    {
          log.info('Método updatePerfil Entrada - ', update, ' ejecutado el ', new Date().toJSON());
          var jsonRequest = JSON.stringify(update);
          log.info('Método updatePerfil Correo - ', claroId, ' ejecutado el ', new Date().toJSON());
          var request = require('request');
          var options = {
            'method': 'PATCH',
            'url': 'http://192.168.37.151:8282/claroId/v2/user/'+claroId,
            'headers': {
              'Content-Type': 'application/json'
            },
            rejectUnauthorized: false,
            body: JSON.stringify(jsonRequest)
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.statusCode);
            if(response.statusCode == 204){
              log.info('Método updatePerfil Salida - ', response.body, ' ejecutado el ', new Date().toJSON());
              return response.statusCode;
            } else{
              log.info('Método updatePerfil Salida - ', response.body, ' ejecutado el ', new Date().toJSON());
              return response.body;
            }
          });
    }

    @Post('create')
    async createMessage(@Body() message: MessageDto)
    {
      var axios = require('axios');
      let respuesta = null;
      var data = message;
      var config = {
        method: 'post',
        url: 'http://192.168.37.151:8282/claroId/v2/users',
        headers: {
          'companyId': 'AMCO',
          'Content-Type': 'application/json'
        },
        rejectUnauthorized: false,
        data : data
      };
      log.info('Método Create Claro Id Request - ', config, ' ejecutado el ', new Date().toJSON());
      await axios(config)
      .then(function (response) {
        log.info('Método Create Claro Id - ', JSON.stringify(response.data), ' ejecutado el ', new Date().toJSON());
        respuesta = response.data;
      })
      .catch(function (error) {
        if (error.response) {
         //console.log(error.response.data);
         log.info('Método Create Claro Id - ', error.response.data, ' ejecutado el ', new Date().toJSON());
         respuesta = error.response.data;
        } else if (error.request) {
            //console.log(error.request);
            log.info('Método Create Claro Id - ', error.request, ' ejecutado el ', new Date().toJSON());
            respuesta = error.request;
        } else {
            //console.log('Error', error.message);
            log.info('Método Create Claro Id - ', error.message, ' ejecutado el ', new Date().toJSON());
            respuesta = error.message;
        }
        log.info('Método Create Claro Id - ', error.config, ' ejecutado el ', new Date().toJSON());
      });
      return respuesta;
    }

   @Get('/buscarId/:claroId')
    async buscarClaroId(@Param('claroId') claroId: string, @Query() params): Promise<any>
    {
      log.info('Método buscarId Entrada - ', claroId, ' ejecutado el ', new Date().toJSON());
      const response = await this.httpService.get('http://192.168.37.151:8282/claroId/v2/users/'+claroId).toPromise();
      log.info('Método buscarId Salida - ', response.data, ' ejecutado el ', new Date().toJSON());
      return response.data;
    }

    @Get('/obtenerProfile')
     async obtenerProfile(@Query() params): Promise<any>
     {
       console.log(params);
       log.info('Método obtenerProfile Entrada - ', params, ' ejecutado el ', new Date().toJSON());
       const response = await this.httpService.get('http://192.168.37.151:8654/claroId/v1/profile?subscriberId='+params.subscriberId+'&profileId='+params.profileId).toPromise();
       log.info('Método obtenerProfile Salida - ', response.data, ' ejecutado el ', new Date().toJSON());
       return response.data;
     }

     @Post('loginId')
     loginId(@Body() login: LoginDto)
     {

       const params="grant_type="+login.grant_type+
                    "&username="+login.username+
                    "&password="+login.password+
                    "&client_id=T0o2JIaTbqSjryaGlvRK_BbC6qga"+
                    "&client_secret=E3BfzWqni0U1UyAg3tvQVW8ou3ca";
        log.info('Método loginId Entrada - ', params, ' ejecutado el ', new Date().toJSON());

       return this.httpService.post("https://192.168.37.151:9443/oauth2/token/",
       params,
       {
         headers: {
           'Content-type': 'application/x-www-form-urlencoded',
         },
       }).pipe(map((res) => {
         //console.log(res.data);
         log.info('Método loginId Salida - ', res.data, ' ejecutado el ', new Date().toJSON());
         return res.data;
       }));
     }

     @Post('ValidateCedula')
     validate(@Body() validate: ValidateCedulaDto)
     {
       log.info('Método ValidateCedula Entrada - ', validate, ' ejecutado el ', new Date().toJSON());
       return this.httpService.post("http://192.168.37.151:8282/claroId/v2/user/identification",
       validate,
       {
         headers: {
           'Content-type': 'application/json'
         },
       }).pipe(map((res) => {
         //console.log(res.data);
         log.info('Método ValidateCedula Salida - ', res.data, ' ejecutado el ', new Date().toJSON());
         return res.data;
       }));
     }

     @Post('regularizacionChip')
     async regularizaChip(@Body() regulariza: RegularizaDto)
     {
       /*console.log(regulariza);
       log.info('Método regularizacionChip Entrada - ', regulariza, ' ejecutado el ', new Date().toJSON());
       return this.httpService.post("http://192.168.37.146:8082/servlet/microGateway/invoke",
       regulariza,
       {
         headers: {
           'Content-type': 'application/json',
           'idRequest':'Regularizacion_Chip_HW_Aut',
         },
       }).pipe(map((res) => {
         log.info('Método regularizacionChip Salida - ', res.data, ' ejecutado el ', new Date().toJSON());
         return res.data;
       }));*/
        var axios = require('axios');
        //var data = JSON.stringify({"device":{"deviceID":"895930100086390309","serviceNumber":"0959730001"},"customer":{"identification":"1250021621","expeditionDate":"16/07/2020"}});
        let respuesta=null;
        var config = {
          method: 'post',
          url: 'http://192.168.37.146:8082/servlet/microGateway/invoke',
          headers: {
            'companyId': 'AMCO',
            'idRequest': 'Regularizacion_Chip_HW_Aut',
            'Content-Type': 'application/json'
          },
          rejectUnauthorized: false,
          data : regulariza
        };

        await axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          respuesta =response.data;
        })
        .catch(function (error) {
          if (error.response) {
          console.log(error.response.data);
          respuesta = error.response.data;
         } else if (error.request) {
             console.log(error.request);
             respuesta = error.request;
         } else {
             console.log('Error', error.message);
             respuesta = error.message;
         }
         log.info('Método Regulariza Claro Id - ', error.config, ' ejecutado el ', new Date().toJSON());
        });

        return respuesta;
     }

     @Post('pin')
     async pin(pin, claroID)
     {
       let object: any="{ pin: "+pin+", claroID: "+claroID+" }";
       log.info('Método pin Entrada - ', object, ' ejecutado el ', new Date().toJSON());
       return this.httpService.post("http://192.168.37.151:8282/claroId/v2/user/pin",
       object,
       { headers: {'Content-type': 'application/json'},}).pipe(map((res) => {
         log.info('Método pin Salida - ', res.data, ' ejecutado el ', new Date().toJSON());
         return res.data;
       }));
     }

     @Post('activaWtth')
     async activaWtth(@Body() aWth: ActivaWtth)
     {
       /*log.info('Método ActivaWTTH Entrada - ', aWth, ' ejecutado el ', new Date().toJSON());
       return this.httpService.post("http://192.168.37.146:8082/servlet/microGateway/invoke",
       aWth,
       {
         headers: {
           'Content-type': 'application/json',
           'idRequest': 'ActivationWtth'
         },
       }).pipe(map((res) => {
         log.info('Método ActivaWTTH Salida - ', res.data, ' ejecutado el ', new Date().toJSON());
         return res.data;
       }));*/
       var axios = require('axios');
       let respuesta =null;
        var config = {
          method: 'post',
          url: 'http://192.168.37.146:8082/servlet/microGateway/invoke',
          headers: {
            'companyId': 'AMCO',
            'IdRequest': 'WTTH:activacion',
            'Content-Type': 'application/json'
          },
          rejectUnauthorized: false,
          data: aWth
        };
        log.info('Método ActivaWTTH Entrada - ', config, ' ejecutado el ', new Date().toJSON());
        await axios(config)
        .then(function (response) {
          //console.log(JSON.stringify(response.data));
          log.info('Método ActivaWTTH Salida - ', response.data, ' ejecutado el ', new Date().toJSON());
          respuesta = response.data;
        })
        .catch(function (error) {
          if (error.response) {
          log.info('Método ActivaWTTH Salida - ', error.response.data, ' ejecutado el ', new Date().toJSON());
          respuesta = error.response.data;
         } else if (error.request) {
             log.info('Método ActivaWTTH Salida - ', error.request, ' ejecutado el ', new Date().toJSON());
             respuesta = error.request;
         } else {
             log.info('Método ActivaWTTH Salida - ', error.message, ' ejecutado el ', new Date().toJSON());
             respuesta = error.message;
         }

        });
        return respuesta;
     }

}
