
const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "What is the full form of USB?",
        choices: ["Universal Serial Bus", " United States of America Business", "User Serial Business", "Universal Serial Battery"],
        answer: "Universal Serial Bus"
    },
    {
        question: "Which of the following is a type of computer memory?",
        choices: ["Input Memory", "Output Memory", "Virtual Memory", "Secondary Memory"],
        answer: "Virtual Memory"
    },
    {
        question: "What is a browser?",
        choices: ["A type of software", "A type of hardware", "A type of network", "A type of modem"],
        answer: "A type of software"
    },
    {
        question: "Which of the following is a type of network?",
        choices: ["LAN", "CPU", "USB", "RAM"],
        answer: "LAN"
    },
    {
        question: "What is the full form of PDF?",
        choices: ["Portable Document Format", "Personal Data Format", "Personal Document Format", "Portable Data Format"],
        answer: "Portable Document Format"
    },
    {
        question: "The Third Generation Computer was made with____.",
        choices: ["Vacuum Tube", "Discrete Components", "Integrated circuits", "Bio Chips"],
        answer: "Integrated circuits"
    },
    {
        question: "Who invented the first computer mouse?",
        choices: ["Steve Jobs", "Douglas Engelbart", "Bill Gates", "Tim Berners-Lee"],
        answer: "Douglas Engelbart"
    },
    {
        question: "Which of the following is a type of computer virus?",
        choices: ["Trojan horse", "Worm", "Spyware", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "What was the first computer called?",
        choices: ["UNIVAC", " ENIAC", "EDVAC", "ABC"],
        answer: "LAN"
    },
    {
        question: "Who is considered the father of modern computing?",
        choices: ["Steve Jobs", "Bill Gates", "Alan Turing", "Charles Babbage"],
        answer: "Charles Babbage"
    },
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = `Q${currentQuestionIndex + 1}. ${questionDetails.question}`;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            const allChoices = document.querySelectorAll('.choice');
            allChoices.forEach(choice => choice.classList.remove('selected'));

            // Select the clicked choice
            choiceDiv.classList.add('selected');
            
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});
