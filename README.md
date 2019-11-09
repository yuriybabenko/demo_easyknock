Requirements
=====

This is a basic API call and test key:

https://api.bridgedataoutput.com/api/v2/OData/test/Property?access_token=6baca547742c6f96a6ff71b138424f21 

Your assignment is to write a program that will:
1. Read the API output.
2. Parse the API output.
3. Load the parsed API output onto the screen.
4. The program should also be able to accept inputs to return the value associated with a specific key. In this case, a user should be able to request AssociationAmenities and the program should return the value associated.
5. Check the code into Github (please double check it runs) and send us the repo where we can pull it down to run it ourselves.
Feel free to use the language of your choice but ideally this would be built in NodeJS and React.

Implementation
=====
Application was developed using NodeJS on the backend, and React on the frontend. Basic HTML & CSS UI for ease of viewing & testing.

Setup & testing
=====
1. Clone repository.
2. Run `node server.js`.
3. Visit `http://127.0.0.1:3000/`.
4. Enter `AssociationAmenities` (or any other first-level child name of a property listing object) in the textfield next to any property, and click the "Look up" button. 
 