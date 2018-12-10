db = [
  { title: "Hello World!", content: "First sticky test" },
  { title: "Second Sticky", content: "Let's see how it looks" }
];

let state = "save";
let editB = document.getElementById("edit");
let saveB = document.getElementById("save");

//load sticky
function load(note) {
  let node = document.createElement("div");
  node.setAttribute("class", "sticky");

  let title = document.createElement("p");
  title.setAttribute("class", "title");
  title.setAttribute("contenteditable", "false");
  let tit = document.createTextNode(note.title);
  title.appendChild(tit);
  node.appendChild(title);

  let content = document.createElement("p");
  content.setAttribute("class", "content");
  content.setAttribute("contenteditable", "false");
  let cont = document.createTextNode(note.content);
  content.appendChild(cont);
  node.appendChild(content);

  document.getElementsByClassName("container")[0].prepend(node);
}

// load sticky from db
db.forEach(function(sticky) {
  load(sticky);
});

//to edit sticky
function edit() {
  if (state === "save" || state === "edit") {
    state = "edit";
    editB.innerText = "Editing... ";
    let pArray = document.querySelectorAll("p");
    pArray.forEach(function(item) {
      item.setAttribute("contenteditable", "true");
    });
  }
}

//to save sticky
function save() {
  if (state === "edit") {
    let pArray = document.querySelectorAll("p");
    pArray.forEach(function(item) {
      item.setAttribute("contenteditable", "false");
    });
    editB.innerText = "save";
  }
}

editB.addEventListener("click", function() {
  edit();
});
saveB.addEventListener("click", function() {
  save();
});
