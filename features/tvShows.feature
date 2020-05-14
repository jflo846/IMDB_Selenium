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

  Scenario: Old shows
    Given that I click the 'Top Rated Shows' link in the menu
    When I choose to sort by release date by descending order
    Then I should see the oldest tv-show "Alfred Hitchcock Presents" on the list

  Scenario: Pick show by genre
    Given that I click the 'Browse TV Shows by Genre' link in the menu
    When I scroll down the page to the section 'Popular TV Shows by Genre'
    And choose 'Talk Show' for tv-shows I want to see
    Then I should se a list of the most popular talk shows
    And that "A Little Late with Lilly Singh" is one of them