Feature: Consulta de guía

  @guia_creada 
  Scenario: Crear y consultar la guía recién creada
    Given que existe una guía creada válidamente
    When consulto la guía
    Then veo la información de mi guía

  @guia_defecto
  Scenario: Consultar guía por defecto
    When consulto la guía
    Then veo la información de mi guía
