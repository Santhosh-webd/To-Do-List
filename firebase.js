import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, set, update } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD72vMxTzuRcS8gv3DGAAqXuai9ONRT1oI",
    authDomain: "to-do-list-17c54.firebaseapp.com",
    databaseURL: "https://to-do-list-17c54-default-rtdb.firebaseio.com",
    projectId: "to-do-list-17c54",
    storageBucket: "to-do-list-17c54.firebasestorage.app",
    messagingSenderId: "167725168329",
    appId: "1:167725168329:web:a9ef499c0bcb5a6b3c7f18"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const createdatabase = getDatabase(app);
const collectionname = ref(createdatabase, "ToDo's");

let inputbox = document.getElementById("inputbox");
let list = document.getElementById("list");
let button = document.getElementById("button");

function ToDos() {
    const todovalidation = inputbox.value.trim();
    if (todovalidation === "") return;

    const creatingobject = {
        details: todovalidation,
        completed: false
    };

    push(collectionname, creatingobject);
    cleardatas();
}
function cleardatas() {
    inputbox.value = "";
}

inputbox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        ToDos();
    }
});

button.addEventListener("click", function () {
    ToDos();
});


onValue(collectionname, function (snapshot) {
    list.innerHTML = ""; 

    if (snapshot.exists()) {
        let alldata = Object.entries(snapshot.val());

        alldata.forEach((dd) => {
            const todoId = dd[0];
            const tododata = dd[1];

            let listitem = document.createElement("li");
            listitem.textContent = `${tododata.details}`;
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            listitem.appendChild(span);
            span.classList.add("cancel")

            if (tododata.completed) {
                listitem.classList.add("done");
            }

            listitem.addEventListener("click", function () {
                const newStatus = !tododata.completed;
                update(ref(createdatabase, `ToDo's/${todoId}`), { completed: newStatus });
            });

            span.addEventListener("click", function (event) {
                event.stopPropagation();
                remove(ref(createdatabase, `ToDo's/${todoId}`));
            });

            list.appendChild(listitem);
        });
    }
});
