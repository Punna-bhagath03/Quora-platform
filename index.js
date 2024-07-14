const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "Punna Bhagath",
    content: "I love building projects",
  },
  {
    id: uuidv4(),
    username: "Enuganti Karthik",
    content: "Currently working on Web development",
  },
  {
    id: uuidv4(),
    username: "Varun Perala",
    content: "I Got my first internship!",
  },
];

//index route
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
//new route
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

//post route (adding form into array)
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

//view route for specific id
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

//updaing using patch route
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(post);
  res.redirect("/posts");
});

//serving edit form using GET route

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

//deleting post using DELETE route

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

//listening port
app.listen(port, () => {
  console.log("Listening to port 8080");
});
