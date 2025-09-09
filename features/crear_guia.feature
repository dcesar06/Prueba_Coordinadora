Feature: Crear guías con servicio Recaudo Contra Entrega
  @solo_crear
  Scenario Outline: Crear guía con diferentes valores y referencias
    Given que César quiere crear una guía
    And tiene todos los datos obligatorios para "Recaudo Contra Entrega"
    And la "Referencia de recaudo" es "<referencia>"
    And el "Valor a recaudar" es <valor>
    When él envía los datos
    Then el sistema debe responder con error "<isError>"

      Examples:
      | referencia                           | valor     | isError |
      | REF123456                            | 150000    | false   |  # camino feliz
      |                                      | 50000     | true    |  # referencia vacía -> obligatorio
      | REF123456789012345678901234567       | 1000      | false   |  # longitud = 30 -> válido
      | REF123456789012345678901234567890X   | 1000      | true    |  # longitud > 30 -> error
      | @#$%/Ref-123                         | 500000    | true   |  # caracteres especiales permitidos
      | 123456789                            | 250000    | false   |  # referencia numérica válida
      | RefA1                                | 1         | false   |  # valor mínimo aceptado
      | REF23456                             | 16000000  | false   |  # valor máximo aceptado
      | REF12345                             | 0         | true    |  # menor al mínimo -> error
      | REF12345                             | 16000001  | true    |  # mayor al máximo -> error
      | REF123456                            | ABC123    | false   |
