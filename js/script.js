window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const showTab = () => {
        const tabs = document.querySelectorAll('.tab');
        const tabsContent = document.querySelectorAll('.tab-item');

        tabs.forEach((item, index) => {
            item.addEventListener('click', e => {
                tabs.forEach(tab => tab.classList.remove('active'))
                tabsContent.forEach(content => content.classList.remove('active'));
                e.target.classList.add('active');
                tabsContent[index].classList.add('active');
            })
        })
    };

    showTab();

    const showModal = () => {
        const modal = document.querySelector('.modal'),
            closeModal = document.querySelector('.modal-close'),
            img = document.querySelectorAll('.tab-item img');
        

        img.forEach(item => {
            item.addEventListener('click', e => {
                modal.classList.add('modal-active');
                document.querySelector('.modal-content img').src = e.target.src;
            })
        });
       
        function close() {
            modal.classList.remove('modal-active')
        };

        closeModal.addEventListener('click', close);
        modal.addEventListener('click', close);

    };

    showModal();


});
