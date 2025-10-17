# Pokemon_Collection

Project Overview: 
Pokemon_Collection is a web application that allows you to browse multiple sets and the cards into your collection. The application tracks what you own in your own collection and also displays the collection of other people, you can like the collection of other users as well. The project is made with the express, ejs and mongodb with the help of TCGdex for the generation of pokemon cards.  

<img width="1094" height="910" alt="image" src="https://github.com/user-attachments/assets/70bc8409-f0df-4170-8054-25a95a3650e3" />

Data Model:
Users:
- email: String
- userName: String
- password: String

collectionbinders:
- binderID: String
- userID: String
- binderName: String
- userName: String
- likes: Number
- collectinoCards: [String]

Local Setup Guide: 
1. clone the git repository
2. make a .env file containing the following: 
  - MONGODBURI: /your url here/
3. in your terminal type npm start
4. once everything in installed type: node index.js. To start the application

Feature Mapping:
1. One to One Relationship: is the relationship of one user to one account and one collection Binder.
2. Many to Many Relationship: is done with the liking of collection. A user can like many collection and a collection can be like by many users.
3. One to Many Relationships: is done with each binder having several cards in it.
4. login/logout is supported with express-sessions and mongodb atlast to check credentials 
5. CRUD
  - Create - can create users and binders
  - Read - can fetch binders
  - Update - can update binder name
  - Delete - can delete binder content

Access Control: 
- Each user can only delete cards from a collection of their own but can see other's collection 
- pages can not be accessed when not logged in

 List of AI tools used: 
 - Chatgpt
 - Blackbox AI
