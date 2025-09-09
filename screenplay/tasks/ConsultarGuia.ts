import { Task } from '@serenity-js/core';
import { GetRequest, Send } from '@serenity-js/rest';

export class ConsultarGuia {

  
  static porCodigo = (codigo: string) =>
    Task.where(
      `#actor consulta la guía con código ${codigo}`,
      Send.a(
        GetRequest.to(`/guias/cm-guias-consultas-ms/guia/${encodeURIComponent(codigo)}`)
          .using({
            headers: { 'Accept': 'application/json' },
          }),
      ),
    );
}
