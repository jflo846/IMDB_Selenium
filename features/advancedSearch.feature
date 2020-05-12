Feature: Picky consumer
As a really picky/consious movie consumer it is important 
for me to make advanced and specific search on the site.

Background: Advanced search
    Given that I am on the IMDB site
    And I have pressed the All-button to extend all search options availible 

  Scenario: Finding non English speaking movies
    Given that I choose 'Advanced Search' in the searchbar drop-down menu
    And that I choose 'Advanced Title Search'
    When I choose 'Animated' under the headline Genres
    And 'Japan' within Countries
    And pick 'Japanese' within 'Languages'
    And I click the search button on the bottom of the page
    Then I expect to find 'Spirited Away' in the results