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

        if (show) {
            show.addEventListener('click', () => {
                content.classList.add('active');
                show.style.display = 'none';
                document.querySelector('.show-more p').style.display = 'none';
                hide.style.display = 'block';
            });
        }

        if (hide) {
            hide.addEventListener('click', () => {
                content.classList.remove('active');
                show.style.display = 'block';
                document.querySelector('.show-more p').style.display = 'block';
                hide.style.display = 'none';
            });
        }
    };
    readMore();

    const showFans = () => {
        const fansBlock = document.querySelector('.fans');
        const btnShowFans = document.querySelector('.show-fans');
        const btnHideFans = document.querySelector('.hide-fans');



        let fans = [];
        const getFans = async (url) => {
            let res = await fetch(url);
            res = await res.json()
            fans = res.data
        }

        if(btnShowFans) {
            btnShowFans.addEventListener('click', async () => {
                if (fans.length == 0) {
                    await getFans('https://reqres.in/api/users?page=2')
                }
    
                btnShowFans.style.display = 'none';
                btnHideFans.style.display = 'block';
                fansBlock.style.display = 'flex';
                fans.map(item => {
                    const fan = document.createElement('div');
                    fan.classList.add('fan');
                    fan.innerHTML = `
                    <img src="${item.avatar}" alt="">
                    <div class="fan-info">
                      <p class="fan-name">${item.first_name} ${item.last_name}</p>
                      <p class="fan-mail">${item.email}</p>
                    </div>
                    `
                    fansBlock.appendChild(fan)
                })
                btnHideFans.addEventListener('click', () => {
                    fansBlock.innerHTML = ``
                    btnShowFans.style.display = 'block';
                    btnHideFans.style.display = 'none';
                    fansBlock.style.display = 'none';
                })
            })
        }
    };
    showFans();

    const showForm = () => {
        const form = document.querySelector('.form-block');
        const btnShowForm = document.querySelector('.message-btn__action');
        const btnCloseForm = document.querySelector('.close');

        const hideForm = () => {
            form.classList.remove('form-block__active')
        }

        if(btnShowForm) {
            btnShowForm.addEventListener('click', () => {
                form.classList.add('form-block__active')
            })
        }

        if(btnCloseForm) {
            btnCloseForm.addEventListener('click', () => {
                hideForm();
            })
        }

        document.addEventListener('click', e => {
            if(e.target.classList.contains('form-block')) {
                hideForm();
            }
        })
    }
    showForm();

    const submitForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            successMessage = 'Спасибо! Я скоро с Вами свяжусь!',
            loadingMessage = 'Загрузка...';
        
        const form = document.querySelector('.form');
        let statusMessage = document.createElement('div');

        statusMessage.style.cssText = `
            text-align: center;
            padding-bottom: 20px;
            font-size: 1.2rem;
        `;

        const validate = () => {
            const formPhone = document.querySelector('.form-phone');

            if (formPhone) {
                formPhone.addEventListener('input', () => {
                    formPhone.value = formPhone.value.replace(/\D/g,'');
                })
            }
        }

        validate(form);
        if (form) {
            form.addEventListener('submit', e => {
                e.preventDefault();
                form.appendChild(statusMessage);
    
                statusMessage.textContent = loadingMessage;
    
                const formData = new FormData(form)
                let body = {
                    email: document.querySelector('.form-email').value,
                    phone: document.querySelector('.form-phone').value,
                    message: document.querySelector('form textarea').value ? document.querySelector('form textarea').value: 'Сообщения нет'
                };
    
                formData.forEach((item, index) => {
                    body[index] = item;
                })
    
                postData(body)
                    .then(res => {
                        if(res.status !== 404) {
                            statusMessage.textContent = successMessage;
                        }
                    })
                    .catch(err => {
                        statusMessage.textContent = errorMessage;
                        console.error('Error')
                    })
                    .finally(() => {
                        document.querySelector('.form-email').value = ''
                        document.querySelector('.form-phone').value = ''
                        document.querySelector('form textarea').value = ''
                        
                        setTimeout(() => {
                            document.querySelector('.form-block').classList.remove('form-block__active');
                            statusMessage.textContent = ''
                        }, 2000)
                    })
            })
        }

        const postData = body => {
            return fetch('../server/server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body),
                credentials: 'include'
            })
        }


    };
    submitForm();

    const slider = () => {
        const slides = document.querySelectorAll('.slide-item');
        const dotRight = document.querySelector('.dot-right');
        const dotLeft = document.querySelector('.dot-left');

        let idx = 0;
        function run() {
            idx++;
            showSlide();
        }

        function showSlide() {
            if(idx > slides.length - 1) {
                idx = 0;
            } else if(idx < 0) {
                idx = slides.length - 1;
            }
            
            
            slides.forEach(item => {
                item.style.transition = `.5s all`
                item.style.transform = `translate(${-idx * 100}%)`
            })

        }

        if(dotRight) {
            dotRight.addEventListener('click', () => {
                idx++;
                showSlide()
            })
        }

        if (dotLeft) {
            dotLeft.addEventListener('click', () => {
                idx--;
                showSlide()
            })
        }
    }
    slider();

    const burgerMenu = () => {
        const menuBtn = document.querySelector('.menu');
        const menuContent = document.querySelector('.menu-blur');
        const closeMenu = document.querySelector('.menu-close');

        if(menuBtn) {
            menuBtn.addEventListener('click', () => {
                menuContent.classList.add('menu-active');
            })
        }
        function hideMenu() {
            menuContent.classList.remove('menu-active');
        }
        
        closeMenu.addEventListener('click', hideMenu)

        document.addEventListener('click', e => {
            console.log(e.target);
            
        })
        
    }
    burgerMenu();

});
