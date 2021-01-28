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

    const firebaseConfig = {
        apiKey: "AIzaSyBmM7e1CS7pg3Urg-MlfI_3rbBpoxK7hDM",
        authDomain: "pr15web.firebaseapp.com",
        databaseURL: "https://pr15web-default-rtdb.firebaseio.com",
        projectId: "pr15web",
        storageBucket: "pr15web.appspot.com",
        messagingSenderId: "684291786360",
        appId: "1:684291786360:web:c8e80a6c8c549587a44f8d",
        measurementId: "G-VNQSYSVG26"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

    const getData = () => {
        formAnswers.textContent = "LOAD";

        nextButton.classList.remove('d-none');
        sendButton.classList.add('d-none');
        previousButton.classList.add('d-none');

        firebase.database().ref().child('questions').once('value')
                .then(snap => playTest(snap.val()));
    }
    const playTest = (questions) => {
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
            NumberQuestion++;
            renderQuestions(NumberQuestion);
            firebase
            .database()
            .ref()
            .child('contacts')
            .push(finalAnswers);
        }
    }

    btnOpenModal.addEventListener('click', () => {
        ModalBlock.classList.add("d-block");
        getData();
    });

    closeModal.addEventListener('click', () => {
        ModalBlock.classList.remove("d-block");
    });
});