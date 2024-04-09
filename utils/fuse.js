const fs = require("fs");
const path = require("path");

// Use path.join to get the correct file path
const rawBookData = fs.readFileSync(
  path.join(__dirname, "../seeds/bookData.json")
);
const books = JSON.parse(rawBookData);

const Fuse = require("fuse.js");
const fuse = new Fuse(books, {
  keys: ["title", "author.firstName", "author.lastName"],
});

console.log(fuse.search("farenheit 451"));
console.log(fuse.search("Rae"));
console.log(fuse.search("Bradbery"));
console.log(fuse.search("Philsophy"));

