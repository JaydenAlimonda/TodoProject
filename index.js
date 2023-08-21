const addTodoForm = document.getElementById("addTodoForm");
const todoList = document.getElementById("todoList");

function getTodo() {
    axios.get("https://api.vschool.io/jaydenAlimonda/todo")
        .then(response => listData(response.data)) 
        .catch(error => console.log(error))
}

function listData(data) {
    todoList.innerHTML = ""; // Clear the existing list
   
    for (let i = 0; i < data.length; i++) {
        const listItem = document.createElement("li");
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = data[i].completed;
        checkbox.addEventListener("change", () => {
            completeTodo(data[i]._id, checkbox.checked);
        });

        listItem.appendChild(checkbox);

        listItem.textContent = `${data[i].title}: $${data[i].price}: ${data[i].description} `;

        if (data[i].completed) {
            listItem.style.textDecoration = "line-through";
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteTodo(data[i]._id);
        });


            const img = document.createElement("img");
            img.src = data[i].imgUrl;
            img.style.maxWidth = "70px";
            img.style.maxHeight = "70px";
            img.style.minWidth = "70px";
            img.style.minHeight = "70px";
         listItem.appendChild(checkbox)
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
        listItem.appendChild(img);
    }
}

getTodo();

//      ADD TODO

addTodoForm.addEventListener("submit", function(e){
    e.preventDefault()
    const newTodo = {
        title: addTodoForm.title.value,
        price: addTodoForm.price.value,
        description: addTodoForm.description.value,
        imgUrl: addTodoForm.imgUrl.value,
        completed: false
    }
    axios.post("https://api.vschool.io/jaydenAlimonda/todo", newTodo)
        .then(response => {
            console.log(response.data)
            addTodoForm.title.value = "";
            addTodoForm.price.value = "";
            addTodoForm.description.value = "";
            addTodoForm.imgUrl.value = "";
            getTodo()
        })
        .catch(error => console.log(error))
})
//      DELETE FUNCTION
function deleteTodo(id) {
    axios.delete(`https://api.vschool.io/jaydenAlimonda/todo/${id}`)
        .then(response => {
            console.log("Todo deleted:", response.data);
            getTodo();
        })
        .catch(error => console.error("Error deleting todo:", error));
}
//      CHECK BOX FUNCTION

function completeTodo(id, completed) {
    axios.put(`https://api.vschool.io/jaydenAlimonda/todo/${id}`, { completed })
        .then(response => {
            console.log("Todo complete:", response.data);
            getTodo();
        })
        .catch(error => console.error("Error completing todo:", error));
}

