`use strict`

document.addEventListener('DOMContentLoaded', function(){
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const ModalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const nextButton = document.querySelector('#next');
    const previousButton = document.querySelector('#prev');
    const questions = [
        {
            question: "Какого цвета бургер вы хотите?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];

    const playTest = () => {

        renderAnswers = (index) => {

            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');

                answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src="${answer.url}" alt="burger">
                        <span>${answer.title}</span>
                    </label>
                `;
                formAnswers.appendChild(answerItem);
            });
        }

        const renderQuestions = (indexQuestion) => {
            formAnswers.innerHTML = ``;
            if(indexQuestion == 0){
                previousButton.classList.add('hidden');
            }
            else if(indexQuestion == questions.length - 1){
                nextButton.classList.add('hidden');
            }
            else{
                previousButton.classList.remove('hidden')
                nextButton.classList.remove('hidden')
            }
            questionTitle.textContent = `${questions[indexQuestion].question}`;
            renderAnswers(indexQuestion);
        }
        let NumberQuestion = 0;
        renderQuestions(NumberQuestion);

        nextButton.onclick = () => {
            NumberQuestion++;
            renderQuestions(NumberQuestion);
        }

        previousButton.onclick = () => {
            NumberQuestion--;
            renderQuestions(NumberQuestion);
        }
    }

    btnOpenModal.addEventListener('click', () => {
        ModalBlock.classList.add("d-block");
        playTest();
    });

    closeModal.addEventListener('click', () => {
        ModalBlock.classList.remove("d-block");
    });
});