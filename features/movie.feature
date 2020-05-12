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