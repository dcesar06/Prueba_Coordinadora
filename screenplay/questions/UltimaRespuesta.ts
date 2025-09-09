import { Question } from '@serenity-js/core';
import { LastResponse } from '@serenity-js/rest';

export class UltimaRespuesta {
  static status = (): Question<Promise<number>> =>
    LastResponse.status();

  static body = (): Question<Promise<any>> =>
    LastResponse.body();

  static isError = (): Question<Promise<boolean>> =>
    Question.about('si la última respuesta es un error', async actor => {
      const body = await LastResponse.body().answeredBy(actor);
      
      return body?.isError === true;
    });
}
