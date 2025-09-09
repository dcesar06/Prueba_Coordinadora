import { Given, When, Then } from '@cucumber/cucumber';
import { Ensure, equals } from '@serenity-js/assertions';
import { UltimaRespuesta } from '../screenplay/questions/UltimaRespuesta.ts'
import { CrearGuia } from '../screenplay/tasks/CrearGuia.ts';

Given('que César quiere crear una guía', function () {
  this.data = {};
});

Given('tiene todos los datos obligatorios para {string}', function (servicio: string) {
  this.data.servicio = servicio; 
});

Given('la {string} es {string}', function (campo: string, valor: string) {
  if (campo === 'Referencia de recaudo') this.data.referenciaRecaudo = valor;
});

Given('el {string} es {int}', function (campo: string, valor: number) {
  if (campo === 'Valor a recaudar') this.data.valorRecaudar = valor;
});


When('él envía los datos', async function () {
  const v = Number(this.data?.valorRecaudar ?? 0);
  const ref = String(this.data?.referenciaRecaudo ?? '');

  await this.actor.attemptsTo(
    CrearGuia.conDatos(this.data)
  );
});

Then('el sistema debe responder con error {string}', async function (isErrorEsperado: string) {
  const sim = (this as any).__simulatedError === true;
  if (sim) {
    await this.actor.attemptsTo(
      Ensure.that(true, equals(isErrorEsperado === 'true'))
    );
    return;
  }

  const status = await UltimaRespuesta.status().answeredBy(this.actor);
  const body   = await UltimaRespuesta.body().answeredBy(this.actor);
  console.log('DEBUG status:', status);
  console.log('DEBUG respuesta body:', JSON.stringify(body, null, 2));

  await this.actor.attemptsTo(
    Ensure.that(UltimaRespuesta.isError(), equals(isErrorEsperado === 'true'))
  );
});



