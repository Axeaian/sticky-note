db = [
  { title: "Hello World!", content: "First sticky test" },
  { title: "Second Sticky", content: "Let's see how it looks" }
];

//load sticky
function load(note) {
  let node = document.createElement("div");
  node.setAttribute("class", "sticky");

  let title = document.createElement("p");
  title.setAttribute("class", "title");
  let tit = document.createTextNode(note.title);
  title.appendChild(tit);
  node.appendChild(title);

  let content = document.createElement("p");
  content.setAttribute("class", "content");
  let cont = document.createTextNode(note.content);
  content.appendChild(cont);
  node.appendChild(content);

  document.getElementsByClassName("container")[0].prepend(node);
}

// load sticky from db
db.forEach(function(sticky) {
  load(sticky);
});
