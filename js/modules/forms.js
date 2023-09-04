function forms() {
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

    // fetch('https://jsonplaceholder.typicode.com/posts', { /// возвращается Promise
//     method: 'POST',
//     body: JSON.stringify({name: 'Gleb'}),
//     headers: {
//         'Content-type': 'application/json'
//     }
// })  
//       .then(response => response.json())                /// Получаем ответ в формате JSON  => c помощью .json() превращаем json в объект и возвращает promise
//       .then(json => console.log(json))                  /// Выводим объект в консоль


}
export default forms;