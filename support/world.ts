  import { setWorldConstructor } from '@cucumber/cucumber';
  import { actorCalled, Actor } from '@serenity-js/core';
  import { CallAnApi } from '@serenity-js/rest';

  class CustomWorld {
    actor: Actor;

    constructor() {
      this.actor = actorCalled('César').whoCan(
        CallAnApi.at('https://apiv2-test.coordinadora.com') // URL base real
      );
    }
  }

  setWorldConstructor(CustomWorld);
