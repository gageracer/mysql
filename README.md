This is the repo for the Question 2 – Back-end Code
Create a simple script that handles a user login
•
•
•
•
•
Use any scripting language
Assume you have a MySQL server running:
o
 Hostname: localhost
o
 Username: gtmetrix
o
 Password: testpass
o
 Database: gtmetrixdb
In that database, you have a table:
CREATE TABLE users (
user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(255) NOT NULL UNIQUE,
password CHAR(60) NOT NULL
);
There are no restrictions on the username
Password is stored using bcrypt
The script should then:
•
 On first access (i.e. no form submitted)
o
 Print out a simple form with username, password fields and a submit button
•
 On form submission
o
 Fetch the user record
o
 Validate the username and password

 If it validates, then print a simple HTML page "Welcome [username]!"

 If it fails, print the login form again with a login error and prefill the username input value



To run it: clone the repo then `npm i` or `pnpm i` if you have pnpm. Then run the index.js with `node index.js`.
You should have the page in your `localhost:3000/`. I have failed get the response back to the page, my query works, but
It also gets stuck on the server. This was my first attempt for something like this and I enjoyed the challenge.
