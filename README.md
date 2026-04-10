# 🍽️ MyFoodbook (Recipe Finder App)

## 📌 Project Description

MyFoodbook is an elegant, responsive web application that helps users intuitively discover, filter, and view their favorite recipes. Inspired by modern design concepts, it features a glassmorphism UI, a dynamic light/dark mode, and interactive controls to give users a delightful experience while browsing meals. This project demonstrates proficiency in standard web technologies (HTML, CSS, JavaScript) alongside modern principles of dynamic, client-side data fetching and rendering.

## 🎯 Purpose

The primary objectives of this project are to:
- Work extensively with external APIs using asynchronous JavaScript (`fetch`, `async/await`).
- Use Higher-Order Array Functions (`filter`, `sort`, `map`, `reduce`) to manipulate state without standard loops.
- Build a polished, responsive, and accessible user interface utilizing Vanilla CSS and modern techniques.
- Provide a robust client-side search, sort, and filtering system.

## 🌐 API Used

This project relies on the [TheMealDB API](https://www.themealdb.com/api.php).

Specifically, it fetches endpoints like:
- **Search:** `https://www.themealdb.com/api/json/v1/1/search.php?s={query}`

## ✨ Key Features

- **Dynamic Data Fetching:** Loads recipe details (name, image, category, instructions, and ingredients) interactively from TheMealDB.
- **Search & Filter:** Find any meal by name, or filter by specific categories like Beef, Chicken, Dessert, Seafood, or Vegetarian.
- **Sorting Mechanisms:** Sort recipes alphabetically (A-Z or Z-A).
- **Favorites (Like) System:** Toggle a heart icon to save favorite recipes interactively.
- **Detailed Modals:** Click on any recipe to open an aesthetically pleasing modal featuring the meal's full ingredient list and step-by-step instructions.
- **Light & Dark Mode:** Accessible theme toggle button that adjusts the layout's aesthetic, complete with smooth transitions.
- **Responsive & Premium Design:** Uses glassmorphism panels, CSS Variables for seamless theme transitions, Font Awesome icons, and standard mobile-first practices.

## 🛠️ Technologies Used

- **HTML5:** Semantic architecture.
- **CSS3:** Custom properties (themes), Flexbox, Grid, Glassmorphism design elements.
- **JavaScript (ES6+):** Vanilla JS, modern array methods, DOM manipulation, Fetch API.
- **Font Awesome:** Icons for the UI.
