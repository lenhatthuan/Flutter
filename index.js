const express = require("express");
// const bodyParser = require("body-parser");

const app = express();
// app.use(bodyParser.json());
app.listen(3000, () => console.log(`Server is running.`));

var admin = require("firebase-admin");
var serviceAccount = require("./flutter-df361-firebase-adminsdk-5rfcp-7d6421d420.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get("/users", async (req, res) => {
  admin
    .auth()
    .listUsers()
    .then((listUsersResult) => res.json({ users: listUsersResult.users }))
    .catch((error) => res.send("Error listing users:", error));
});

app.get("/user/:userEmail", async (req, res) => {
  admin
    .auth()
    .getUserByEmail(req.params.userEmail)
    .then((userRecord) => res.json({ user: userRecord }))
    .catch((error) => res.send("Error fetching user data:", error));
});

// // get user by email
// admin
//   .auth()
//   .getUserByEmail(email)
//   .then((userRecord) =>
//     console.log(`Successfully fetched user data: ${userRecord.toJSON()}`)
//   )
//   .catch((error) => console.log("Error fetching user data:", error));

// // get list user
// const listAllUsers = () => {
//   admin
//     .auth()
//     .listUsers()
//     .then((listUsersResult) =>
//       listUsersResult.users.forEach((userRecord) =>
//         console.log("user", userRecord.toJSON())
//       )
//     )
//     .catch((error) => console.log("Error listing users:", error));
// };
