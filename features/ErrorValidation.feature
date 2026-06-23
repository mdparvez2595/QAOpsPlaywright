Feature: Commerce validation with Error validation
  @ZOO
  Scenario: placing the order
    Given Enter a E-Commerce validation with entering "<userName>" and "<password>"
    Then  Error message should show


    Examples:
    |   userName             | password |
    |Mohamedparvez@gmail.com |  Test@123|
    |Test@gmail.com          | Teddy@123|