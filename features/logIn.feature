Feature: Logged in user
  As the movie geek I am
  I want to be able to log in to IMDB
  So that I can save favorites and check off the movies and series I have seen

  Scenario: Log in
    Given that I am on the IMDB Website
    And I click on 'Sign In'
    And pick 'Sign in with IMDb'
    When I enter my email
    And I enter my password
    And click on 'Sign-In'
    Then the place where it stood 'Sign In' should display my name
