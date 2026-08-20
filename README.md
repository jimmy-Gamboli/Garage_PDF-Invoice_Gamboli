# Garage_PDF-Invoice_Gamboli
This app is a part of the Garage take-home assignment. Below is some information regarding the app's use, its features, and its design. This list is not meant to be exhaustive.

# How to get started
Read our [Instructions for setup](garage-pdf-invoice/README.md) for details to run the app. It might be necessary to shell into the project root directory with a `cd garage-pdf-invoice` command.

# Features
The main functionality of the app is that it take a listing URL form https://shopGarage.com and is able to generate a PDF invoice with information about the listing from the URL. In addition, a few small features and additions were added to enhance the User interface and user experience in a relatively short amount of time
- 'Reset' button to clear the form
- Radio buttons allowing the user to decide if the Pdf should open in a new tab(default) or be downloaded
- Loading and error states
- Form validation for the URL

# Assumptions
- For the purpose of this project I assumed the listing ID will always be a Uuid v4 in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx. This assumption was made to sanitize a full shopGarage URL to get just the listing ID

# Tech Stack + External Libraries
- **Next.Js/React/Typescript** - The core stack to run the app frontend and backend
- **Tanstack Query** - Used to handle the mutation that interfaces with the backend routes. It also offers built-in support for handling loading and error states with the queries as well
- **Mantine UI** - Basic React component library used to provide basic styling and components used in app development in order to provide a better UI and UX
- **PlayWright/Chromium & Mustache** - Playwright/Chromium was used to drive browser automation that allowed for pdf generation. Mustache was used to insert specific listing attributes (price, make, model, etc...) into a predefined HTML template that the PDF was generated from
