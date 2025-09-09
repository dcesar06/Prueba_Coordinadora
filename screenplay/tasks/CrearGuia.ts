import { Task } from '@serenity-js/core';
import { Send, PostRequest } from '@serenity-js/rest';

type Dinamicos = {
  referenciaRecaudo?: string;
  valorRecaudar?: number;     // lo convertimos a string al enviar
};

const payloadBase = {
  identificacion: "890904713",
  divisionCliente: "00",
  idProceso: 100001,
  codigoPais: 170,
  valoracion: "200000",
  tipoCuenta: 3,
  contenido: "reloj",
  codigoProducto: "123",
  nivelServicio: 22,
  detalle: [
    { pesoReal: 1, largo: 5, ancho: 5, alto: 3, unidades: 1, ubl: 0, referencia: "ref# detalle" }
  ],
  datosRemitente: {
    identificacionRemitente: "102030404",
    detalleRemitente: "Casa",
    tipoViaRemitente: "7",
    viaRemitente: "15",
    numeroRemitente: "53 48",
    codigoCiudadRemitente: "76001000",
    descripcionTipoViaRemitente: "Calle",
    direccionRemitente: "Calle 53 # 53 48",
    nombreRemitente: "Remitente Prueba",
    indicativoRemitente: "57",
    celularRemitente: "3007876543",
    correoRemitente: "pruebaremitente@coo.com"
  },
  datosDestinatario: {
    identificacionDestinatario: "1254511109",
    detalleDestinatario: "Casa",
    tipoViaDestinatario: "5",
    viaDestinatario: "15",
    numeroDestinatario: "45 93",
    descripcionTipoViaDestinatario: "Calle",
    direccionDestinatario: "calle 45 93",
    codigoCiudadDestinatario: "76001000",
    nombreDestinatario: "Destinatario Prueba",
    indicativoDestinatario: "57",
    celularDestinatario: "3216549825",
    correoDestinatario: "pruebadestinatario@coor.com"
  },
  // Estos dos se sobreescriben con lo que venga del feature:
  valorRecaudar: "1600000",
  referenciaRecaudo: "REF-PLACEHOLDER",
  tipoGuia: 1,
  referenciaGuia: "123",
  usuario: "prueba@coordinaora.com",
  fuente: "envios",
  observaciones: "prueba RCE"
};

export class CrearGuia {
  static conDatos = (datos: Dinamicos) =>
    Task.where(`#actor crea una guía`,
      Send.a(
        PostRequest.to('/guias/cm-guias-ms/guia')
          .with({
            ...payloadBase,
            ...(datos.referenciaRecaudo !== undefined
              ? { referenciaRecaudo: String(datos.referenciaRecaudo).trim() }
              : {}),
            ...(datos.valorRecaudar !== undefined
              ? { valorRecaudar: String(datos.valorRecaudar) }
              : {}),
          })
          
          .using({
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${process.env.API_TOKEN}`, 
            }
          })
      )
    );
}
