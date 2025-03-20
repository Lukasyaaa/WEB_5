document.addEventListener("DOMContentLoaded", () => {
    const imagesElements = document.querySelectorAll(".slider__item");


    if(imagesElements.length > 2){
        const getIdCurrentImageElement = (currentImageElement) => {
            for(let i = 0; i < imagesElementsMassive.length; i++){
                if(imagesElementsMassive[i] === currentImageElement){
                    return i;
                }
            }
        }


        const imagesElementsMassive = Array.from(imagesElements);
        /*Позиционируем Вторую Картинку - справа, а Последнюю Слева
        Так Как это Картинки с Которыми Пользователь будет Взаимодействовать в Первую Очередь*/
        imagesElementsMassive[1].style.left = "100%";
        imagesElementsMassive[imagesElementsMassive.length - 1].style.left = "-100%";
       
        const nextButtonElement = document.querySelector(".slider__arrow_next");
        const prevButtonElement = document.querySelector(".slider__arrow_prev");
   
        nextButtonElement.addEventListener("click", () => {
            const currentImageElement = document.querySelector(".slider__item._current");
            //Передаем HTML элемент, чтобы не создавать его лишний раз в функции
            const currentImageId = getIdCurrentImageElement(currentImageElement);
   
            /*Располагаем Объект, что был Активным до нажатия по Клавише - Слева И
            Делаем Его не Активным*/
            currentImageElement.style.left = "-100%";
            currentImageElement.classList.remove("_current");
   
            /*Делаем Объект, что располагался После Активного(до нажатия) - Активным*/
            imagesElementsMassive[(currentImageId + 1) % imagesElementsMassive.length].style.left = 0;
            imagesElementsMassive[(currentImageId + 1) % imagesElementsMassive.length].classList.add("_current");
   
            /*Располагаем Объект, что находился Перед Новым Активным - Справа*/
            imagesElementsMassive[(currentImageId + 2) % imagesElementsMassive.length].style.left = "100%";
        });
   
        prevButtonElement.addEventListener("click", () => {
            const currentImageElement = document.querySelector(".slider__item._current");
            //Передаем HTML элемент, чтобы не создавать его лишний раз в функции
            const currentImageId = getIdCurrentImageElement(currentImageElement);
   
            /*Располагаем Объект, что был Активным до нажатия по Клавише - Справа И
            Делаем Его не Активным*/
            currentImageElement.style.left = "100%";
            currentImageElement.classList.remove("_current");
           
            /*Делаем Объект, что располагался Перед Активным(до нажатия) - Активным*/
            const newCurrentImageId = (currentImageId === 0) ? imagesElementsMassive.length - 1 : currentImageId - 1;
            imagesElementsMassive[newCurrentImageId].style.left = 0;
            imagesElementsMassive[newCurrentImageId].classList.add("_current");
           
            /*Располагаем Объект, что находился Перед Новым Активным - Слева*/
            imagesElementsMassive[
                (newCurrentImageId === 0) ? imagesElementsMassive.length - 1 : newCurrentImageId - 1
            ].style.left = "-100%";
        });
    }
});