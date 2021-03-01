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