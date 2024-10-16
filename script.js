// Desenvolva sua lógica aqui
const body = document.body;
const main = document.createElement("main");
let array = [];
function renderSite() {
    const header = document.createElement("header");
    const h1 = document.createElement("h1");
    const form = document.createElement("form");
    const input = document.createElement("input");
    const buttonAdd = document.createElement("button");
    const h2 = document.createElement("h2");

    h1.innerText = "Doooing";
    main.className = "container";
    form.className = "form-add-task";
    input.className = "input-add-task";
    input.placeholder = "Writer my task...";
    buttonAdd.className = "button-add-item";
    buttonAdd.innerText = "Add";

    document.body.insertBefore(header, body.children[0]);
    header.append(h1);
    document.body.insertBefore(main, body.children[2]);
    main.append(form);
    form.append(input, buttonAdd);

    h2.innerText = "Without any task registered...";
    h2.className = "text-without-task";

    if (array.length === 0) {
        main.append(h2);
    }
}

function addNewTask() {
    const input = document.querySelector("input");
    const form = document.querySelector("form");
    const h2 = document.querySelector(".text-without-task");
    function removeAll() {
        const ul = document.querySelector("ul");
        ul.remove();
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let task = {
            name: input.value,
            id: array.length,
        };
        removeAll();
        array.push(task);
        input.value = "";
        renderTasks(array);
        console.log(task.id);
        removeTask(array);
        h2.classList.add("hide");
    });
    const arrayJSON = JSON.stringify(array);

    localStorage.setItem("listaDeAfazeres", arrayJSON);
}

function renderTasks(list) {
    let ul = document.createElement("ul");
    let h2 = document.querySelector(".text-without-task");

    list.forEach((element) => {
        let li = document.createElement("li");
        let p = document.createElement("p");
        let button = document.createElement("button");

        button.setAttribute("data-id", element.id);
        p.innerText = element.name;
        button.className = "button-delete";
        button.innerText = "Excluir";

        ul.append(li);
        li.append(p, button);
    });
    if (array.length > 0) {
        h2.classList.add("hide");
    }
    main.append(ul);
}

function removeTask(list) {
    let button = document.querySelectorAll(".button-delete");
    let h2 = document.querySelector(".text-without-task");

    console.log(button);
    function removeUl() {
        const ul = document.querySelector("ul");
        ul.remove();
    }
    button.forEach((btn) => {
        btn.addEventListener("click", () => {
            let id = Number(btn.getAttribute("data-id"));
            console.log(id);

            const taskIndex = list.findIndex((task) => task.id === id);
            if (taskIndex !== -1) {
                list.splice(taskIndex, 1);
                removeUl();
                if (array.length === 0) {
                    main.append(h2);
                }

                renderTasks(list);
            }

            if (list.length === 0) {
                h2.classList.remove("hide");
            }
            removeTask(list);
        });
    });
    const arrayItemRemovidoJSON = JSON.stringify(list);
    localStorage.setItem("listaDeAfazeres", arrayItemRemovidoJSON);
}

function pegaDadosNoLocalStorage() {
    const dadosNoLocalStorageJSON = localStorage.getItem("listaDeAfazeres");

    if (dadosNoLocalStorageJSON) {
        array = JSON.parse(dadosNoLocalStorageJSON);

        renderTasks(array);
    }
}

renderSite();
pegaDadosNoLocalStorage();
addNewTask();
removeTask(array);
