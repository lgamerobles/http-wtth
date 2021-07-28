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
import { Subscriber } from '../dto/subscriber.dto';
import { ResetPin } from '../dto/resetpin.dto';
import { quitarRedirect } from '../dto/quitarRedirect.dto';
import { map, catchError } from 'rxjs/operators';
import axios from 'axios';
import qs from 'qs';

const log = require('simple-node-logger').createSimpleLogger();

/*INICIO URL'S para métodos*/
    //let url_claroid ="http://192.168.37.151:8282/"; //desa
    //let url_claroid ="http://claroid-msa_claroid-ms:3000/"; //prod Anterior
    let url_claroid ="http://claroid_msa:3000/"; //prod Actual
    //let url_login ="https://192.168.37.151:9443/";//desa
    let url_login ="https://wso2is.edx.conecel.com/";//prod
    //let url_activa ="http://192.168.37.146:8082/";//desa
    //let url_activa ="http://10.31.32.13:8282/";//prod Anterior
    let url_activa ="http://10.31.32.115:80/";//prod
    //let url_querySubcriber = "http://192.168.37.205:8001/Rest/GrupoLink/V2.0/QuerySubscriber";//desa
    let url_querySubcriber = "http://esbgold.integra.conecel.com/Rest/GrupoLink/V2.0/QuerySubscriber";//prod
    //let url_redirect = "http://192.168.37.205:8001/Rest/Subscriber/V1.0/UpdateProperty";//desa
    let url_redirect = "http://esbgold.integra.conecel.com/Rest/Subscriber/V1.0/UpdateProperty";//prod
/*FIN URL'S para métodos*/

/*inicio prometheus*/
/*const express = require('express');
const promMid = require('express-prometheus-middleware');
const app = express();

const PORT = 9091;

  app.use(promMid({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  }));
  app.listen(PORT, () => {
  console.log(`Example api is listening on http://localhost:${PORT}`);
});*/
/*fin prometheus*/

@Controller('/api/profile')
export class FooController {
  //private readonly logger = new Logger();
    constructor(
        private readonly httpService: HttpService,
    ) {}

    @Post('quitarRedirect')
    async quitarRedirect(@Body() quitar: quitarRedirect){
      var axios = require('axios');
      var config = {
        method: 'post',
        url: url_redirect,
        headers: {
          'Content-Type': 'application/json',
        },
        data : quitar
      };
      var respuesta='';
      await axios(config)
      .then(function (response) {
        respuesta=response.data;
        //console.log(JSON.stringify(response.data));
        log.info('Método quitarRedirect - ', response.data, ' ejecutado el ', new Date().toJSON());
      })
      .catch(function (error) {
        if (error.response) {
          respuesta='{"error": "'+error.response.status+'",'+' "descripcion": "'+error.response.statusText+'"}';
          log.info('Error Método quitarRedirect - ', respuesta, ' ejecutado el ', new Date().toJSON());
        } else if (error.request) {
            respuesta = error.request;
            log.info('Error Método quitarRedirect - ', respuesta, ' ejecutado el ', new Date().toJSON());
        } else {
           respuesta = error.message;
          log.info('Error Método quitarRedirect - ', respuesta, ' ejecutado el ', new Date().toJSON());
        }
      });
      return respuesta;
    }
    @Post ('resetPin')
    async resetPin(@Body() reset: ResetPin)
    {
      var axios = require('axios');
      var respuesta = '';
      //console.log(reset);
      var config = {
        method: 'post',
        url: url_claroid+'claroId/v2/pin/reset',
        headers: {
          'Content-Type': 'application/json'
        },
        data : reset
      };
      log.info('Método Actualiza pin Claro Id - IN', reset, ' ejecutado el ', new Date().toJSON());
      await axios(config)
      .then(function (response) {
        respuesta = response.data;
      })
      .catch(function (error) {
        if (error.response) {
          //console.log(error.response);
          respuesta='{"error": "'+error.response.status+'",'+' "descripcion": "'+error.response.statusText+'"}';
          //console.log(respuesta);
        } else if (error.request) {
            respuesta = error.request;
        } else {
           respuesta = error.message;
        }
      });
      log.info('Método Actualiza pin Claro Id - OUT', respuesta, ' ejecutado el ', new Date().toJSON());

      return respuesta;
    }

    @Post('subscriberId')
    async subscriberId(@Body() subscriber: Subscriber)
    {
      var axios = require('axios');
      var config = {
        method: 'post',
        url: url_querySubcriber,
        headers: {
          'Content-Type': 'application/json'/*,
          'Cookie': 'dtCookie=9DBA62B84B569257D95CAD6C023CB909|1|2||1'*/
        },
        data : subscriber
      };
      var respuesta = "";
      await axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        log.info('Método subscriberId - ', response.data, ' ejecutado el ', new Date().toJSON());
        respuesta = response.data;
      })
      .catch(function (error) {
        if (error.response) {
          respuesta=error.response;
          log.info('Método Error subscriberId - ', error.response.data, ' ejecutado el ', new Date().toJSON());
          //console.log(error.response.data);
        } else if (error.request) {
            //console.log(error.request);
            respuesta = error.request;
            log.info('Método Error subscriberId - ', error.response.data, ' ejecutado el ', new Date().toJSON());
        } else {
            //console.log('Error', error.message);
            respuesta = error.message;
            log.info('Método Error subscriberId - ', error.response.data, ' ejecutado el ', new Date().toJSON());
        }
      });
      return respuesta;
    }

    // create a custom timestamp format for log statements
    @Post('recuperaPass')
    async recuperaPass(@Body() recupera: Recupera)
    {
      var axios = require('axios');
      /*var data = JSON.stringify({"claroID":"rsoledil@claro.com.ec"});*/
      //http://192.168.37.151:8282/claroId/v2/passwords/recovery //desarrollo
      let respuesta = null;
      var config = {
        method: 'post',
        url: url_claroid+'claroId/v2/passwords/recovery',
        headers: {
          'companyId': 'AMCO',
          'Content-Type': 'application/json'
        },
        rejectUnauthorized: false,
        data : recupera
      };

      await axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        log.info('Método recovery Claro Id - ', response.data, ' ejecutado el ', new Date().toJSON());
        respuesta=response.data;
      })
      .catch(function (error)
      {
          if (error.response) {
            respuesta=error.response;
            //console.log(error.response.data);
            log.info('Método recovery Claro Id - ', error.response.data, ' ejecutado el ', new Date().toJSON());
            respuesta = error.response.data;
          } else if (error.request) {
              //console.log(error.request);
              log.info('Método recovery Claro Id - ', error.request, ' ejecutado el ', new Date().toJSON());
              respuesta = error.request;
          } else {
              //console.log('Error', error.message);
              log.info('Método recovery Claro Id - ', error.message, ' ejecutado el ', new Date().toJSON());
              respuesta = error.message;
          }
          log.info('Método Create recuperaPass - ', error.config, ' ejecutado el ', new Date().toJSON());
      });
      return respuesta;
    }

    @Post('verify')
    async verify(@Body() verify: Verify)
    {
      //http://claroid-msa_claroid-ms:3000
      //http://192.168.37.151:8282/claroId/v2/tokens/verify
      var axios = require('axios');
      let respuesta=null;
      var config = {
        method: 'post',
        url: url_claroid+'claroId/v2/tokens/verify',
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
          log.info('Método Verify Claro Id - ', error.response.data, ' ejecutado el ', new Date().toJSON());
         respuesta = error.response.data;
        } else if (error.request) {
            console.log(error.request);
            log.info('Método Verify Claro Id - ', error.request, ' ejecutado el ', new Date().toJSON());
            respuesta = error.request;
        } else {
            console.log('Error', error.message);
            log.info('Método Verify Claro Id - ', error.message, ' ejecutado el ', new Date().toJSON());
            respuesta = error.message;
        }
        log.info('Método Verify - ', error.config, ' ejecutado el ', new Date().toJSON());
      });
      return respuesta;
    }

    @Post('resetPassword')
    async resetPassword(@Body() resetPassword: ResetPassword)
    {
      //http://claroid-msa_claroid-ms:3000
      //http://192.168.37.151:8282/claroId/v2/passwords/reset   //desarrollo
      //var axios = require('axios');
      //var data = JSON.stringify({"claroID":"lgame@grupo-link.com","resetToken":"3815","password":"789456","identificationCard":{"identify":"0941168569","expeditionDate":"10/01/1990"}});
      /*console.log(resetPassword);
      let respuesta = null;
      var config = {
        method: 'post',
        url: url_claroid+'claroId/v2/passwords/reset',
        headers: {
          'companyId': 'AMCO',
          'Content-Type': 'application/json'
        },
        rejectUnauthorized: false,
        data : resetPassword
      };

      axios(config)
      .then(function (response) {
        console.log(response);
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
      return respuesta;*/

      var axios = require('axios');
      var data = resetPassword;
      log.info('Método resetPassword Claro Id - ', data, ' ejecutado el ', new Date().toJSON());
      var config = {
        method: 'post',
        url: url_claroid+'claroId/v2/passwords/reset',
        headers: {
          'companyId': 'AMCO',
          'Content-Type': 'application/json'
        },
        data : data
      };
      var respuesta='';
      await axios(config)
      .then(function (response) {
        //console.log(response.data);
        respuesta=response.data;
        //console.log(JSON.stringify(response.data));
        log.info('Método resetPassword Claro Id - ', response.data, ' ejecutado el ', new Date().toJSON());
      })
      .catch(function (error) {
        if (error.response) {
         respuesta = error.response;
         //console.log(error.response.data);
         log.info('Método resetPassword Claro Id - ', error.response, ' ejecutado el ', new Date().toJSON());
         respuesta = error.response.data;
        } else if (error.request) {
            log.info('Método resetPassword Claro Id - ', error.request, ' ejecutado el ', new Date().toJSON());
            respuesta = error.request;
        } else {
            //console.log('Error', error.message);
            log.info('Método resetPassword Claro Id - ', error.response, ' ejecutado el ', new Date().toJSON());
            respuesta = error.message;
        }
      });
      return respuesta;
    }

    @Post('send')
    async send(@Body() send: Send)
    {
      //http://claroid-msa_claroid-ms:3000
      //http://192.168.37.151:8282/claroId/v2/tokens/send
        var axios = require('axios');
        let respuesta = null;
        var config = {
          method: 'post',
          url: url_claroid+'claroId/v2/tokens/send',
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
      //claroid-msa_claroid-ms:3000
      //http://192.168.37.146:8082/servlet/microGateway/invoke
      log.info('Método updatePass Entrada - ', olvida, ' ejecutado el ', new Date().toJSON());
      return this.httpService.post(url_claroid+"claroId/v2/passwords/reset",
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
      //http://claroid-msa_claroid-ms:3000
      //http://192.168.37.151:8282/claroId/v2/users/activate
        var axios = require('axios');
        let respuesta = null;
        var data = activaUser;
        var config = {
            method: 'post',
            url: url_claroid+'claroId/v2/users/activate',
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
             log.info('Método Activa Claro Id - ', error.response.data, ' ejecutado el ', new Date().toJSON());
             respuesta = error.response.data;
            } else if (error.request) {
                console.log(error.request);
                log.info('Método Activa Claro Id - ', error.request, ' ejecutado el ', new Date().toJSON());
                respuesta = error.request;
            } else {
                console.log('Error', error.message);
                log.info('Método Activa Claro Id - ', error.message, ' ejecutado el ', new Date().toJSON());
                respuesta = error.message;
            }
            log.info('Método activaUser Claro Id - ', error.config, ' ejecutado el ', new Date().toJSON());
          });
          return respuesta;
    }

    @Patch('/:claroId')
    async updatePerfil(@Body() update: UpdatePerfil, @Param('claroId') claroId: string)
    {
        //http://claroid-msa_claroid-ms:3000
        //http://192.168.37.151:8282/claroId/v2/users/
        /*  log.info('Método updatePerfil Entrada - ', update, ' ejecutado el ', new Date().toJSON());
          var jsonRequest = JSON.stringify(update);
          log.info('Método updatePerfil Correo - ', claroId, ' ejecutado el ', new Date().toJSON());
          var request = require('request');
          var options = {
            'method': 'PATCH',
            'url': url_claroid+'claroId/v2/users/'+claroId,
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
          });*/
          var respuesta=null;
          var axios = require('axios');
          //var data = JSON.stringify({"contactMedium":[{"enable":true,"type":"cellphone","value":"0985214785"}]});
          var data= update;
          log.info('Método updatePerfil Entrada - ', data, ' ejecutado el ', new Date().toJSON());

          var config = {
            method: 'patch',
            url: url_claroid+'claroId/v2/users/'+claroId,
            headers: {
              'Content-Type': 'application/json'
            },
            rejectUnauthorized: false,
            data : data
          };

          await axios(config)
          .then(function (response) {
            //console.log(response.status);
            respuesta = response.data;
            log.info('Método updatePerfil Salida - ', response.data, ' ejecutado el ', new Date().toJSON());
          })
          .catch(function (error) {
            respuesta=error;
            log.info('Método updatePerfil Salida - ', error, ' ejecutado el ', new Date().toJSON());
          });
          return respuesta;
    }

    @Post('create')
    async createMessage(@Body() message: MessageDto)
    {
      //http://claroid-msa_claroid-ms:3000
      //http://192.168.37.151:8282/claroId/v2/users
      var axios = require('axios');
      let respuesta = null;
      var data = message;
      var config = {
        method: 'post',
        url: url_claroid+'claroId/v2/users',
        headers: {
          'companyId': 'AMCO',
          'Content-Type': 'application/json'
        },
        rejectUnauthorized: false,
        data : data
      };
      log.error('Método Create Claro Id Request - ', data, ' ejecutado el ', new Date().toJSON());
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
      //http://claroid-msa_claroid-ms:3000
      //http://192.168.37.151:8282/claroId/v2/users/
      log.info('Método buscarId Entrada - ', claroId, ' ejecutado el ', new Date().toJSON());
      const response = await this.httpService.get(url_claroid+'claroId/v2/users/'+claroId).toPromise();
      log.info('Método buscarId Salida - ', response.data, ' ejecutado el ', new Date().toJSON());
      return response.data;
    }

    @Get('/obtenerProfile')
     async obtenerProfile(@Query() params): Promise<any>
     {//http://claroid-msa_claroid-ms:3000
       //http://192.168.37.151:8654/claroId/v1/profile?subscriberId='+params.subscriberId+'&profileId='+params.profileId).toPromise();
       //console.log(params);
       log.info('Método obtenerProfile Entrada - ', params, ' ejecutado el ', new Date().toJSON());
       const response = await this.httpService.get(url_claroid+'claroId/v1/profile?subscriberId='+params.subscriberId+'&profileId='+params.profileId).toPromise();
       log.info('Método obtenerProfile Salida - ', response.data, ' ejecutado el ', new Date().toJSON());
       return response.data;
     }

     @Post('loginId')
     loginId(@Body() login: LoginDto)
     {

       const params="grant_type="+login.grant_type+
                    "&username="+login.username+
                    "&password="+login.password+
                    "&client_id=BXnru6IVISnr_1NZ5yNEZgPujiMa"+
                    "&client_secret=FGhI1PyIXrSw4017QdoLZ9NAQt4a"; //producción
                    /*"&client_id=T0o2JIaTbqSjryaGlvRK_BbC6qga"+
                    "&client_secret=E3BfzWqni0U1UyAg3tvQVW8ou3ca"; *///desarrollo
        log.info('Método loginId Entrada - ', params, ' ejecutado el ', new Date().toJSON());
        //https://wso2is_identity-server:9443
        //https://192.168.37.151:9443/oauth2/token/
       return this.httpService.post(url_login+"oauth2/token/",
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
     { //http://claroid-msa_claroid-ms:3000
       //http://192.168.37.151:8282/claroId/v2/user/identification
       log.info('Método ValidateCedula Entrada - ', validate, ' ejecutado el ', new Date().toJSON());
       return this.httpService.post(url_claroid+"claroId/v2/user/identification",
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
       //http://192.168.37.146:8082/servlet/microGateway/invoke
       //http://10.31.32.13 8282
        var axios = require('axios');
        let respuesta=null;
        var config = {
          method: 'post',
          url: url_activa+'servlet/microGateway/invoke',
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
          //console.log(JSON.stringify(response.data));
          log.info('Método Regulariza Claro Id - ', response.data, ' ejecutado el ', new Date().toJSON());
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
     {//http://claroid-msa_claroid-ms:3000
       //http://192.168.37.151:8282/claroId/v2/user/pin
       let object: any="{ pin: "+pin+", claroID: "+claroID+" }";
       log.info('Método pin Entrada - ', object, ' ejecutado el ', new Date().toJSON());
       return this.httpService.post(url_claroid+"claroId/v2/user/pin",
       object,
       { headers: {'Content-type': 'application/json'},}).pipe(map((res) => {
         log.info('Método pin Salida - ', res.data, ' ejecutado el ', new Date().toJSON());
         return res.data;
       }));
     }

     @Post('activaWtth')
     async activaWtth(@Body() aWth: ActivaWtth)
     {
       //http://192.168.37.146:8082/servlet/microGateway/invoke
       //http://10.31.32.13:8282
       var axios = require('axios');
       let respuesta =null;
        var config = {
          method: 'post',
          url: url_activa+'servlet/microGateway/invoke',
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
