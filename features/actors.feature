Feature: Actors
Since I am really in to different actors and actresses
I want to find out who's hot and who's not.

Background: Im on the site
Given that I am on the IMDB site
And I have pressed the menu-button to extend all links to the site


  Scenario:I want to know who the most popular celebs are
    When I have clicked the 'Most popular celebs' link in the menu
    Then I shall se a list of the most popular celebs on IMDB
    And since I love Chris Hemsworth I want to make sure he is on the list