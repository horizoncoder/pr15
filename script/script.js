`use strict`

document.addEventListener('DOMContentLoaded', function(){
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const ModalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const nextButton = document.querySelector('#next');
    const previousButton = document.querySelector('#prev');
    const sendButton = document.querySelector('#send');
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
        const finalAnswers = [];

        renderAnswers = (index) => {

            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');

                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');

                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value = "${answer.title}">
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

            switch(NumberQuestion){
                case 0:
                    questionTitle.textContent = `${questions[indexQuestion].question}`;
                    renderAnswers(indexQuestion);
                    nextButton.classList.remove('d-none');
                    sendButton.classList.add('d-none');
                    previousButton.classList.add('d-none');
                    break;
                case questions.length:
                    nextButton.classList.add('d-none');
                    previousButton.classList.add('d-none');
                    sendButton.classList.remove('d-none');
                    formAnswers.innerHTML = `
                    <label for="numberPhone" class="form-label">Enter your phone number</label>
                    <input type="phone" class="form-control" id="numberPhone">`;
                    break;
                case questions.length + 1:
                    formAnswers.textContent = "Thanks";
                    setTimeout(() => {
                        ModalBlock.classList.remove('d-block');
                    },2000)
                    break;
                default:
                    questionTitle.textContent = `${questions[indexQuestion].question}`;
                    renderAnswers(indexQuestion);
                    nextButton.classList.remove('d-none');
                    previousButton.classList.remove('d-none');
                    sendButton.classList.add('d-none');
            }
        }
        let NumberQuestion = 0;
        renderQuestions(NumberQuestion);

        const checkAnswer = () => {
            const obj = {};
            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id == 'numberPhone');

            inputs.forEach((input, index) => {
                if(NumberQuestion >= 0 && NumberQuestion <= questions.length - 1){
                    obj[`${index}${questions[NumberQuestion].question}`] = input.value;
                } else if(NumberQuestion === questions.length) {
                    obj["Phone number"] = input.value;
                }
                

            })

            finalAnswers.push(obj);
        }

        nextButton.onclick = () => {
            checkAnswer();
            NumberQuestion++;
            renderQuestions(NumberQuestion);
        }

        previousButton.onclick = () => {
            NumberQuestion--;
            renderQuestions(NumberQuestion);
        }

        sendButton.onclick = () => {
            checkAnswer();
            console.log(finalAnswers);
            NumberQuestion++;
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