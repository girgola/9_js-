'use strict'

let main_Wraper = document.getElementById('main_Wraper')
let overlay = document.getElementById('overlay')
let popup_content = document.getElementById('content')
let closeIcon = document.getElementById('closeIcon')


function ajax(url, callback) {
    let request = new XMLHttpRequest()
    request.open('GET', url)
    request.addEventListener('load', function () {
        // console.log(this.responseText);
        let mosuli_data = JSON.parse(this.responseText)
        // console.log(mosuli_data);

        callback(mosuli_data);

    })
    request.send()
}
function create_post(item) {
    let div_wrapper = document.createElement('div')
    div_wrapper.classList.add('posts')
    div_wrapper.setAttribute('data_id', item.id)

    div_wrapper.addEventListener('click', function (event) {
        let id = event.currentTarget.getAttribute('data_id')
        overlay.classList.add('active')
        let server_url = `https://jsonplaceholder.typicode.com/posts/${id}`
        ajax(server_url, function (mosuli_data) {
            console.log(mosuli_data);
            overlay_description(mosuli_data)
        })
        console.log(id);

    })

    let post_id = document.createElement('h4')
    post_id.innerText = item.id

    let post_title = document.createElement('h2')
    post_title.innerText = item.title

    div_wrapper.appendChild(post_id)
    div_wrapper.appendChild(post_title)
    main_Wraper.appendChild(div_wrapper)

    console.log(div_wrapper);

    function overlay_description(item) {
        let desctription = document.createElement('p')
        desctription.innerText = item.body
        popup_content.appendChild(desctription)
    }
}
closeIcon.addEventListener('click', function () {
    overlay.classList.remove('active')
    popup_content.innerHTML = ' '
})


ajax('https://jsonplaceholder.typicode.com/posts', function (mosuli_data) {
    mosuli_data.forEach((item) => {
        // console.log(item);
        create_post(item)
    });
});
