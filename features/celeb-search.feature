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
| 1988      | 1989    | 05-05       |
| 1965      | 2015    | 08-20       |

Scenario: No results shown
Given that I am on the page for advanced name search
And I enter 2020 as startyear and 2020 as endyear
And 08-08 as day and month for birthdate
And press the button to search for non born people
Then I shall se that there are no celebs born on the day I searched for
And if I klick on the IMDB home button I shall come back to the startpage
