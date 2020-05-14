Feature: Movie Geek
  Being the movie geek I am, I want to quickly be able to find box 
  office hits, raitings and reviews to quench my movie thirst

  Background: Im on the site
    Given that I am on the IMDB site
    And I have pressed the menu-button to extend all links to the site

  Scenario: Finding upcoming releases
    When I press Coming Soon
    Then I should get a list of upcoming releases
    And the list should be empty because the theaters are closed

  Scenario: Finding top movies
    When I press the Top rated movies
    Then I should get a list of the top 250 movies
    And The "Nyckeln till frihet" should be number one

  Scenario: Finding upcoming releases on DVD
    When I press DVD & Blu-ray Releases
    Then I should get a list of upcoming releases that I can watch during this corona pandemic

  Scenario: Worst movies on IMDB
    When I press the 'Most popular movies' link
    And click on the 'Lowest Rated Movies' to the right
    Then I should get a list of the worst 100 movies
    And The Room with Tommy Wiseau should be on the list

  Scenario: Best fantasy Movie
    Given that I am on the 'Most Popular movies' page
    When I click on 'Fantasy' beneath 'Popular Movies by Genre'
    And klick on 'Feature films' Beneath 'Title Type'
    Then 'Star Wars: The Rise of Skywalker' should be in the top 10

