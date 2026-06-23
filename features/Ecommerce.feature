Feature: Commerce validation
  @Regression
  Scenario: placing the order
    Given Enter a Commerce validation by entering "mohamedparvez22@gmail.com" and "Test@123"
    When Add "ZARA COAT 3" to the cart
    Then verify the "ZARA COAT 3" is present in cart page
    When enter the valid card details and select country
    Then verify that order is placed in order history page 

  @Validation
  Scenario: placing the order
    Given Enter a E-Commerce validation with entering "<userName>" and "<password>"
    Then  Error message should show


    Examples:
    |   userName             | password |
    |Mohamedparvez@gmail.com |  Test@123|
    |Test@gmail.com          | Teddy@123|    