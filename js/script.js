window.addEventListener('DOMContentLoaded', () => {


    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');





    
    

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
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();



    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i)
                }
            })
        }
    })


























});