// const { url } = require("inspector");

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



    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
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
   
    

    // Bспользуем классы для карточек 


    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.transfer = 100;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);


            this.changeToRUB();

        }


        changeToRUB() {
            this.price = +this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element)
            } else {
                this.classes.forEach(className => {
                    element.classList.add(className)
                })

            };

            


            element.innerHTML = `
                    
                        <img src= ${this.src} alt= ${this.alt}>
                        <h3 class="menu__item-subtitle"> ${this.title} </h3>
                        <div class="menu__item-descr"> ${this.description} </div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
                    
            `;
            this.parent.append(element)
        }
    }


    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`)
        }

        return await res.json()  // возвращаем промис!!!!
    }

    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });


    axios.get('http://localhost:3000/menu')
        .then(data => data.data.forEach(({img, altimg, title, descr, price}) => {
                    new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        }))
        
    
    // ФОРМЫ!



    const forms = document.querySelectorAll('form');


    const message = {
        loading: 'Загрузка',
        success: 'Cпасибо, мы с вами свяжемся',
        fail: 'Cломалось'
    };

    forms.forEach(item => {
        bindPostData(item)
    });


    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: data
        })

        return await res.json()  // возвращаем промис!!!!
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status')
            statusMessage.textContent = message.loading;   
            form.append(statusMessage);

           
           


            const formData = new FormData(form); // объект formData в который передается форма(всегда проверяем name у формы)


            // Трансформация formData в JSON
            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                statusMessage.textContent = message.success;
                statusMessage.remove()
            }).catch(() => {
                statusMessage.textContent = message.fail;
            }).finally(() => {
                form.reset();
            })

        })
    }

    // TODO: НЕ ЗАБЫТЬ ЗАПУСТИТЬ JSON-SERVER DB.JSON //


    // Slider

    const slides = document.querySelectorAll('.offer__slide');
    const prev = document.querySelector('.offer__slider-prev');
    const next = document.querySelector('.offer__slider-next');
    const total = document.querySelector('#total');
    const current = document.querySelector('#current');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(slidesWrapper).width
    
    let slideIndex = 1;
    let offset = 0;
    
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }


    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex'
    slidesField.style.transition = '0.5s all'

    slidesWrapper.style.overflow ='hidden'

    slides.forEach(slide => {
        slide.style.width = width;
    });


    next.addEventListener('click', () => {
        if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
            offset = 0
        } else {
            offset += +width.replace(/\D/g, '')
        }
        slidesField.style.transform = `translateX(-${offset}px)`


        if (slideIndex == slides.length) {
            slideIndex = 1
        } else {
            slideIndex++
        }


        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex
        }
    })

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.replace(/\D/g, '') * (slides.length - 1)
        } else {
            offset -= +width.replace(/\D/g, '')
        }
        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == 1) {
            slideIndex = slides.length
        } else {
            slideIndex--
        };

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex
        };
    })


    // showSlides(slideIndex);
    // 

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');


    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }

    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }


    // prev.addEventListener('click', () => {
    //     plusSlides(-1)
    // })
    // next.addEventListener('click', () => {
    //     plusSlides(1)
    // })


});







// fetch('https://jsonplaceholder.typicode.com/posts', { /// возвращается Promise
//     method: 'POST',
//     body: JSON.stringify({name: 'Gleb'}),
//     headers: {
//         'Content-type': 'application/json'
//     }
// })  
//       .then(response => response.json())                /// Получаем ответ в формате JSON  => c помощью .json() превращаем json в объект и возвращает promise
//       .then(json => console.log(json))                  /// Выводим объект в консоль
