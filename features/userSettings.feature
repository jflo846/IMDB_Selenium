Feature: User settings
  As a user of IMDB
  I want to be able to change my account settings
  So that the information is correct

  Background: Logged in
    Given that I am have signed in to my account
    And I am on the frontpage
    When I click on my name
    And chose 'Account settings'

  Scenario: Edit bio
    When I pick 'Edit profile'
    And I write something in my 'bio'
    And click on 'Save Description'
    Then my bio should display what I just wrote

  Scenario: Change User ID
    When I pick 'Edit profile'
    And I click on 'Edit' next to my name
    And change my name
    And click on 'Save Changes'
    Then my name should have changed

  Scenario: Change password
    When click on 'Login and security'
    And click on 'Edit' next to 'Password'
    And enter my current password
    And enter my new password
    And reenter my new password
    And click on 'Save changes'
    Then my password should be updated
    And I should get the message 'Success You have successfully modified your account!'
    And I should be able to change it back to the original password