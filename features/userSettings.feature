Feature: User settings
  As a user of IMDB
  I want to be able to change my account settings
  So that the information is correct

  Background: Logged in
    Given that I am have signed in to my account
    And I am on the frontpage

  Scenario: Edit bio
    When I click on my name
    And chose 'Account settings'
    And I pick 'Edit profile'
    And I write something in my 'bio'
    And click on 'Save Description'
    Then my bio should display what I just wrote