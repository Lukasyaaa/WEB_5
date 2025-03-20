document.addEventListener("DOMContentLoaded", () => {
    const createErrorDescription = (errorContainer, errorFinder) =>{
        if(!errorContainer.classList.contains("_error")){
            let messageElement = document.createElement("div");
            messageElement.innerText = errorFinder();
            messageElement.classList.add("error");
            errorContainer.classList.add("_error");
            errorContainer.append(messageElement);
        }
    }
    
    const nameFieldElement = document.querySelector("#contactform li:nth-child(1)");
    const inputNameElement = document.querySelector("input#name");
    const nameErrorFinder = () => {
        if(inputNameElement.value.length < 2){
            return "Довжина Ім'я має бути Більше, або Дорівнювати 2 !";
        } else if (inputNameElement.value.length > 30){
            return "Довжина Ім'я має бути Менше за 30 !";
        } else {
            return "Довжина Ім'я має Складатися із символів Алфавіту, Дефісу, або Пробілу !";
        }
    }

    const emailFieldElement = document.querySelector("#contactform li:nth-child(2)");
    const inputEmailElement = document.querySelector("input#email");
    const emailErrorFinder = () => {
        return "Некоректний запис !";
    }

    const ageFieldElement = document.querySelector("#contactform li:nth-child(3)");
    const inputAgeElement = document.querySelector("input#age");
    const ageErrorFinder = () => {
        if(!/^\d+$/.test(inputAgeElement.value)){
            return "Введіть Ціле Позитивне Число !";
        } else if(parseInt(inputAgeElement.value, 10) < 18) {
            return "Введений Вами вік має Бути більше 18 !";
        } else {
            return "Введений Вами вік має Бути Менше 130 !";
        }
    }

    const websiteFieldElement = document.querySelector("#contactform li:nth-child(4)");
    const inputWebsiteElement = document.querySelector("input#company");
    const websiteErrorFinder = () => {
        return "Некоректний запис !";
    }

    const messageFieldElement = document.querySelector("#contactform li:nth-child(5)");
    const inputMessageElement = document.querySelector("textarea#message");
    const messageErrorFinder = () => {
        if(inputMessageElement.value.length < 10){
            return "Довжина Повідомлення має бути Більше 10 !";
        } else if (inputMessageElement.value.length > 150){
            return "Довжина Повідомлення має бути менше 150 !";
        }
    }

    [inputNameElement, inputEmailElement, inputAgeElement, inputWebsiteElement, inputMessageElement].forEach(inputElement =>{
        inputElement.addEventListener("focus", () =>{
            if(inputElement.parentNode.classList.contains("_error")){
                inputElement.parentNode.classList.remove("_error");
                inputElement.nextElementSibling.remove();
            }
        });
    });

    const formElement = document.querySelector("#contactform");
    formElement.addEventListener("submit", (e) => {
        const inputName = inputNameElement.value;
        const inputAge = inputAgeElement.value;
        const inputEmail = inputEmailElement.value;
        const inputWebsite = inputWebsiteElement.value;
        const inputMessage = inputMessageElement.value;
    
        if (inputName.length < 2 || inputName.length > 30 || !(/^[-A-Za-zА-Яа-яЁё ]+$/u.test(inputName))) {
            e.preventDefault();
            createErrorDescription(nameFieldElement, nameErrorFinder);
        }
    
        if (!(/^\d+$/.test(inputAge)) || parseInt(inputAge, 10) < 18 || parseInt(inputAge, 10) > 130) {
            e.preventDefault();
            createErrorDescription(ageFieldElement, ageErrorFinder);
        }
    
        if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputEmail))) {
            e.preventDefault();
            createErrorDescription(emailFieldElement, emailErrorFinder);
        }
    
        if (!(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/.test(inputWebsite))) {
            e.preventDefault();
            createErrorDescription(websiteFieldElement, websiteErrorFinder);
        }
    
        if (inputMessage.length < 10 || inputMessage.length > 150) {
            e.preventDefault();
            createErrorDescription(messageFieldElement, messageErrorFinder);
        }
    });
});