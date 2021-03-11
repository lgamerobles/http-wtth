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
import { map } from 'rxjs/operators';
import axios from 'axios'
import qs from 'qs'

const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'mylogfile.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },
log = SimpleNodeLogger.createSimpleLogger( opts );


@Controller('/profile')
export class FooController {
  private readonly logger = new Logger();
    constructor(
        private readonly httpService: HttpService,
    ) {}
    // create a custom timestamp format for log statements

    @Post('recuperaPass')
    recuperaPass(@Body() recupera: Recupera):any
    {
      log.info('Método Recupera Contrasenia Entrada - ', recupera, ' ejecutado el ', new Date().toJSON());
      return this.httpService.post("http://192.168.37.146:8082/servlet/microGateway/invoke",
      recupera,
      {
        headers: {
          'Content-Type': 'application/json',
          'idRequest': 'RecoveryPassClaroId',
        },
      }).pipe(map((res) => {
        if(res.statusText=="OK"){
          log.info('Método Recupera Contrasenia Salida - ', res.data, ' ejecutado el ', new Date().toJSON());
          return res.data;
        }else{
          log.info('Método Recupera Contrasenia Salida - ', res.config, ' ejecutado el ', new Date().toJSON());
        }

        }

      ));

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
    activaUser(@Body() activaUser: ActivaUser)
    {
      log.info('Método updatePass Entrada - ', activaUser, ' ejecutado el ', new Date().toJSON());
      return this.httpService.post("http://192.168.37.146:8082/servlet/microGateway/invoke",
      activaUser,
      {
        headers: {
          'Content-Type': 'application/json',
          'idRequest': 'VerifyUserClaroId',
        },
      }).pipe(map((res) => {
        log.info('Método updatePass Salida - ', res.data, ' ejecutado el ', new Date().toJSON());
          return res.data;
        }));
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
       log.info('Método create Entrada - ', message, ' ejecutado el ', new Date().toJSON());
        return this.httpService.post("http://192.168.37.151:8282/claroId/v2/user",
        message,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }).pipe(map((res) => {
          log.info('Método create Salida - ', res.data, ' ejecutado el ', new Date().toJSON());
        return res.data;
      }));
    }

   @Get('/buscarId/:claroId')
    async buscarClaroId(@Param('claroId') claroId: string, @Query() params): Promise<any>
    {
      log.info('Método buscarId Entrada - ', claroId, ' ejecutado el ', new Date().toJSON());
      const response = await this.httpService.get('http://192.168.37.151:8654/claroId/v1/profile/'+claroId).toPromise();
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
                    "&client_id="+login.client_id+
                    "&client_secret="+login.client_secret;
        log.info('Método loginId Entrada - ', params, ' ejecutado el ', new Date().toJSON());

       return this.httpService.post("http://192.168.37.151:8181/auth/realms/ClaroID/protocol/openid-connect/token",
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
     regularizaChip(@Body() regulariza: RegularizaDto){
       log.info('Método regularizacionChip Entrada - ', regulariza, ' ejecutado el ', new Date().toJSON());
       return this.httpService.post("http://192.168.37.146:8082/servlet/microGateway/invoke",
       regulariza,
       {
         headers: {
           'Content-type': 'application/x-www-form-urlencoded',
           'idRequest':'RegularizacionChipHW',
         },
       }).pipe(map((res) => {
         log.info('Método regularizacionChip Salida - ', res.data, ' ejecutado el ', new Date().toJSON());
         return res.data;
       }));
     }


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

}
