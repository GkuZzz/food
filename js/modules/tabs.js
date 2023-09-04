function tabs() {


    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    // ТАБЫ

    //функция скрывает контент и убирает активный класс у табов
    const hideTabContent = () => {   
        tabsContent.forEach(item => {  // получаем каждый элемент и скрываем его
            item.style.display = 'none';   
        });
        
        tabs.forEach(tab => { // убираем активный класс
            tab.classList.remove('tabheader__item_active');
        });
    };


    const showTabContent = (i = 0) => {  
        tabsContent[i].style.display = 'block';    // получаем клнетент и добавляем активный класс 
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();



    tabsParent.addEventListener('click', (e) => {   
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) { // сравниваем сооиетствие клика с нужным элементом
            tabs.forEach((item, i) => {
                if (target == item) {        //запускаем функции
                    hideTabContent();
                    showTabContent(i)
                }
            })
        }
    })
}


export default tabs;