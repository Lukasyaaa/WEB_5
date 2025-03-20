document.addEventListener("DOMContentLoaded", () => {
    const listElement = document.querySelector(".tasks__list");
    const inputElement = document.querySelector(".tasks__input");
    const addElement = document.querySelector(".tasks__add");
    inputElement.addEventListener("input", (e) => {
        addElement.disabled = e.target.value === "";
    });
    addElement.addEventListener("click", () => {
        let linkElement = document.createElement("li");
        linkElement.classList.add("tasks__link");


        let linkTextElement = document.createElement("span");
        linkTextElement.innerText = inputElement.value;


        let linkDeleteElement = document.createElement("button");
        linkDeleteElement.classList.add("link-tasks__delete");
        linkDeleteElement.addEventListener("click", (e) => {
            linkElement.classList.add("_completed");
            e.currentTarget.remove();
            listElement.appendChild(linkElement);
        });


        linkElement.append(linkTextElement);
        linkElement.append(linkDeleteElement);
        listElement.insertAdjacentElement("afterbegin", linkElement);
        listElement.classList.add("_margin");
        inputElement.value = "";
    });
});