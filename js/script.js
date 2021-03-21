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

        if (closeModal && modal) {
            closeModal.addEventListener('click', close);
            modal.addEventListener('click', close);
        }
    };

    showModal();

    const readMore = () => {
        const show = document.querySelector('.plus'),
            hide = document.querySelector('.minus'),
            content = document.querySelector('.contact-us__information_hide');

        show.addEventListener('click', () => {
            content.classList.add('active');
            show.style.display = 'none';
            document.querySelector('.show-more p').style.display = 'none';
            hide.style.display = 'block';
        });

        hide.addEventListener('click', () => {
            content.classList.remove('active');
            show.style.display = 'block';
            document.querySelector('.show-more p').style.display = 'block';
            hide.style.display = 'none';
        });
    };
    readMore();

});
