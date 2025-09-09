import { Given, When, Then } from '@cucumber/cucumber';
import { Ensure, equals } from '@serenity-js/assertions';
import { UltimaRespuesta } from '../screenplay/questions/UltimaRespuesta.ts';
import { CrearGuia } from '../screenplay/tasks/CrearGuia.ts';
import { ConsultarGuia } from '../screenplay/tasks/ConsultarGuia.ts';

let lastCodigoCreado: string | null = null;


Given('que existe una guía creada válidamente', async function () {
  const referencia = `AUTO-${Date.now()}`;
  const valor = 150000;

  await this.actor.attemptsTo(
    CrearGuia.conDatos({
      referenciaRecaudo: referencia,
      valorRecaudar: valor,
    }),
  );

  const body = await UltimaRespuesta.body().answeredBy(this.actor);

  lastCodigoCreado = body?.data?.codigo_remision ?? null;
  console.log('DEBUG código creado:', lastCodigoCreado);
});


When('consulto la guía', async function () {
  const codigoPorDefecto = process.env.CODIGO_GUIA_SEMILLA || '99021679337';
  const codigo = lastCodigoCreado ?? codigoPorDefecto;

  console.log('DEBUG consultando código:', codigo);

  await this.actor.attemptsTo(
    ConsultarGuia.porCodigo(String(codigo)),
  );
});


Then('veo la información de mi guía', async function () {
  const status = await UltimaRespuesta.status().answeredBy(this.actor);
  const body   = await UltimaRespuesta.body().answeredBy(this.actor);

  console.log('DEBUG consulta status:', status);
  console.log('DEBUG consulta body:', JSON.stringify(body, null, 2));

  await this.actor.attemptsTo(
    Ensure.that(status, equals(200)),
  );

  if (lastCodigoCreado) {
    const codigoDevuelto =
         body?.data?.codigoRemision   
      ?? body?.data?.codigo_remision  
      ?? null;

    await this.actor.attemptsTo(
      Ensure.that(String(codigoDevuelto), equals(String(lastCodigoCreado))),
    );
  }
});
