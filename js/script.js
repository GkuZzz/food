window.addEventListener('DOMContentLoaded', () => {


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





    // ТАЙМЕР

    const deadLine = '2023-09-01';
    function getTimeRemaining (endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }
        
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        }

    }

    const getZero = (num) => {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        
    

        

        const updateClock = () => {
            const t = getTimeRemaining(endtime);

            days.innerHTML =  getZero(t.days);
            hours.innerHTML =  getZero(t.hours);
            minutes.innerHTML =  getZero(t.minutes);
            seconds.innerHTML =  getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
        const timeInterval = setInterval(updateClock, 1000)
    }

    setClock('.timer', deadLine);


    // MODAL

    const btnModal = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('[data-close]')



    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    btnModal.forEach(btn => {
        btn.addEventListener('click', openModal)
    });

    

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);


    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        } 
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            closeModal()
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();
            clearInterval(modalTimerId);
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll)
   
    











});