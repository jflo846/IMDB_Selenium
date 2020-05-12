Feature: TV-shows
  While I'm done watching one tv-show i easily want to find another
  tv-show to watch because I have too much free time to spend watching tv.

  Background: Im on the site
    Given that I am on the IMDB site
    And I have pressed the menu-button to extend all links to the site

  Scenario: Most popular shows
    Given that I click the 'Most popular shows' link in the menu
    When I choose to sort by IMDB rating
    Then I should be able to se the 100 most popular tv shows
    And I expect "Game of Thrones" to be one of them