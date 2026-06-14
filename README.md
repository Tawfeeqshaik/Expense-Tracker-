# Expense Tracker 💸

hey so this is my expense tracker project i made using html css and javascript. its basically a mini app where you can add your daily expenses and income and it shows your balance and stuff.

i made this to practice javascript mostly because i kept forgetting array methods lol

---

## how to run

just download the 3 files and open index.html in your browser thats literally it

make sure all 3 files are in the same folder otherwise the css and js wont load

```
expense-tracker/
├── index.html
├── style.css
└── script.js
```

## what it can do

- add expenses and income
- shows total balance, total income, total expenses
- you can filter by category (like food, transport etc)
- delete entries if you made a mistake
- clear all button to reset everything
- data doesnt disappear when you refresh (localStorage)

---

## categories

food, transport, shopping, entertainment, bills, salary, other

---

## what i used

- HTML
- CSS
- JavaScript (vanilla, no frameworks or anything)

---

## what i learned

ok so honestly i struggled a lot with localStorage at first i didnt know you have to convert the array to string before saving it (JSON.stringify) and then convert it back when reading (JSON.parse). took me a while to figure that out

also .filter() and .map() and .reduce() -- i knew these theoretically but actually using them in a real project made it click way better

and i finally understood why everyone says put the script tag at the bottom of body 😭 i had it in the head first and nothing was working

---

## known problems

- no edit button, if you mess up you have to delete and add again
- no graphs or charts
- if you clear browser data everything is gone
- doesnt sync across devices or anything like that

---

## future plans maybe

- add a pie chart for category wise spending
- export to csv
- filter by month
- dark mode


