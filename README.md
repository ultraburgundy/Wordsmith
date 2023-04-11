# Wordsmith

Wordsmith is my first beginner project as a front-end developer, and it is a word-guessing game that challenges players to guess a random word within a certain number of guesses.

v1.1
better readability
removed the category-specific code since will be using an API to fetch words
fixed minor bugs
removed unnecessary classes
tailwindCSS is now incorporated

v1.2
adjusted/improved styling
typescript compiling
score table has been added

v1.2.1
adjusted typescript file for better maintainability.

FUTURE-TO-DO (v1.3)
> add player name input
    > store player name input associated with score into localStorage
        > call
> improve on styling
    > pulse effect on alphabet letter press event
        > make it responsive for small screens
> adjust score weights
    > conditional weights 
        > (if word.length > 4) => score is adjusted to be higher than 10points per letter, 1++ for each letter, hard-capping at 20. ()
