`use strict`

document.addEventListener('DOMContentLoaded', function(){
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const ModalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');

    const playTest = () => {
        const renderQuestions = () => {
            questionTitle.textContent = "Какого цвета бургер вы хотите?";
            const name1 = "Стандарт";
            const name2 = "Черный";
            const src1 = "./image/burger.png";
            const src2 = "./image/burgerBlack.png";
            formAnswers.innerHTML = `
                <div class="answers-item d-flex flex-column">
                    <input type="radio" id="answerItem1" name="answer" class="d-none">
                    <label for="answerItem1" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src="${src1}" alt="burger">
                        <span>${name1}</span>
                    </label>
                </div>
                <div class="answers-item d-flex justify-content-center">
                    <input type="radio" id="answerItem2" name="answer" class="d-none">
                    <label for="answerItem2" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src="${src2}" alt="burger">
                        <span>${name2}</span>
                    </label>
                </div>
            `;
        }

        renderQuestions();
    }

    btnOpenModal.addEventListener('click', () => {
        
        ModalBlock.classList.add("d-block");
        playTest();
    });

    closeModal.addEventListener('click', () => {
        
        ModalBlock.classList.remove("d-block");
    });
});