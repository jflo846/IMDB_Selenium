Feature: odd Stuff to test
As a function varied I also want the site to work for me

Background: Advanced search
    Given that I am on the IMDB site


Scenario: Finding independent movies from less commercial companies
    Given that I write "independent" in the search field 
    And use arrow to getdown two steps and select the suggestion Independent Spirit Awards with enter
    Then a search result shall include the category "Best Female Lead" 
    When clicking the picture on the winner "Renée Zellweger" I expect to be directed to her site