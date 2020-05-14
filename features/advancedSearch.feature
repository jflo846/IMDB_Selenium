Feature: Picky consumer
  As a really picky/consious movie consumer it is important
  for me to make advanced and specific search on the site.

  Background: Advanced search
    Given that I am on the IMDB site
    And I have pressed the All-button to extend all search options availible

  Scenario: Finding non English speaking movies
    Given that I choose 'Advanced Search' in the searchbar drop - down menu
    And that I choose 'Advanced Title Search'
    When I choose 'Animation' under the headline 'Genres'
    And 'Japan' within 'Countries'
    And pick 'Japanese' within 'Languages'
    And I click the search button on the bottom of the page
    Then I expect to find 'Spirited Away' in the results

  Scenario: Finding movies in film-noir-style
    Given that I choose 'Keywords' in the searchbar drop-down menu
    And that I type in 'film-noir' in the searchfeild
    When I click on the search button
    Then I should get searchresults including 'film-noir'
    And if I click on the link named 'film-noir-style'
    Then I expect to find 'Changelings' in the search result

  Scenario: Finding f-rated movies for my kid to watch
    Given that I choose 'Keywords' in the searchbar drop-down menu
    And write "f-rated" in the searchfield, I should see different search result, among them f-rated which I click
    When I select the topic "Genres"
    And pick "Music" and "Family"
    Then I expect to find "Happy Feet" among the search results