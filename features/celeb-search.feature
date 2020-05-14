 Feature: I want to seach IMDB for all kind of celebs 
 I really want to know all there is to know about celebs, when and where they are born, how tall they are
 and when someone died.
 
  Background: Advanced search
    Given that I am on the IMDB site
    And I have pressed the All-button to extend all search options availible
    And that I choose 'Advanced Search' in the searchbar drop - down menu

  Scenario Outline:I want to know which celebs that are born a certain year and on a certain day
    Given that I clicked on the link for advanced name search
    When I enter <startYear> and <endYear> in the birthdate box
    And I enter <dayAndMonth> in the birthday box
    And I click on the yellow search button on the bottom of the page
    Then I should get a list of the celebs that where born on that day
    And if I want to know more about that person I shall be able to click on the name of the celebrity

Examples:
| startYear | endYear | dayAndMonth |
| 2020      |2020     | 05-20       |
| 1988      | 1989    | 05-05       |