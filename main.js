db = [
  { title: "Hello World!", content: "First sticky test" },
  { title: "Second Sticky", content: "Let's see how it looks" }
];

let state = "save";
let stateIndicator = document.getElementById("state");
let editB = document.getElementById("edit");
let addB = document.getElementById("add");
let deleteB = document.getElementById("delete");
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
stateIndicator.innerText = state;

//to edit sticky
function edit() {
  if (state === "save" || state === "edit") {
    state = "edit";
    stateIndicator.innerText = state;
    editB.innerText = "Editing... ";
    let pArray = document.querySelectorAll("p");
    pArray.forEach(function(item) {
      item.setAttribute("contenteditable", "true");
    });
  } else {
    alert("Please save to continue");
  }
}

//to add sticky
function addItem() {
  if (state === "save" || state === "add") {
    if (db.length > 0 && db[0].title === "" && db[0].content === "") {
      alert("Please use empty sticky first");
    } else {
      state = "add";
      stateIndicator.innerText = state;
      load({ title: "", content: "" });
      db.unshift({ title: "", content: "" });
      pArray = document.querySelectorAll("p");
      pArray[0].setAttribute("contenteditable", "true");
      pArray[0].addEventListener("input", function() {
        db[0].title = this.innerText;
      });
      pArray[1].setAttribute("contenteditable", "true");
      pArray[1].addEventListener("input", function() {
        db[0].content = this.innerText;
      });
    }
  } else {
    alert("Please save to continue");
  }
}

function deleteItem() {
  if (state === "save" || state === "delete") {
    state = "delete";
    stateIndicator.innerText = state;
    let stickies = document.getElementsByClassName("sticky");
    for (let i = 0; i < stickies.length; i++) {
      let node = document.createElement("span");
      node.setAttribute("class", "cross");
      node.innerText = "X";
      stickies[i].appendChild(node);
      node.addEventListener("click", function() {
        node.parentNode.remove();
      });
    }
  } else {
    alert("Please save to continue");
  }
}

function reloadDB() {
  let pArray = document.querySelectorAll("p");
  console.log(pArray);
  let dblength = db.length;
  for (i = 0; i < dblength * 2; i++) {
    if (i < pArray.length) {
      if (i % 2 === 0) {
        db[i / 2].title = pArray[i].innerText;
      } else {
        db[i / 2 - 0.5].content = pArray[i].innerText;
      }
    } else {
      if (i % 2 === 0) {
        db.pop();
      }
    }
  }
}

//to save sticky
function save() {
  if (state === "edit" || state === "add") {
    let pArray = document.querySelectorAll("p");
    pArray.forEach(function(item) {
      item.setAttribute("contenteditable", "false");
    });
    editB.innerText = "Edit";
    state = "save";
    stateIndicator.innerText = state;
    reloadDB();
    console.log(db);
  }
  if (state === "delete") {
    let stickies = document.getElementsByClassName("sticky");
    for (let i = 0; i < stickies.length; i++) {
      let cross = document.getElementsByClassName("cross");
      for (let i = 0; i < cross.length; i++) {
        cross[i].remove();
      }
    }
    state = "save";
    stateIndicator.innerText = state;
    reloadDB();
    console.log(db);
  }
}
editB.addEventListener("click", function() {
  edit();
});

addB.addEventListener("click", function() {
  addItem();
});

deleteB.addEventListener("click", function() {
  deleteItem();
});
saveB.addEventListener("click", function() {
  save();
});
