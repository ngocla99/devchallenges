'use strict';
const myQuestions = [
  {
    question: 'Javascript is _________ language.',
    answers: {
      a: 'Programming',
      b: 'Application',
      c: 'None of These',
      d: 'Scripting',
    },
    multi: false,
    correctAnswer: 'd',
  },
  {
    question:
      'Which of the following is a valid type of function javascript supports?',
    answers: {
      a: 'named function',
      b: 'anonymous function',
      c: 'both of the above',
      d: 'none of the above',
    },
    multi: false,
    correctAnswer: 'c',
  },
  {
    question:
      'Which built-in method returns the index within the calling String object of the first occurrence of the specified value?',
    answers: {
      a: 'getIndex()',
      b: 'location()',
      c: 'indexOf()',
      d: 'getLocation()',
    },
    multi: false,
    correctAnswer: 'c',
  },
  {
    question: 'Which one of the following is valid data type of JavaScript?',
    answers: {
      a: 'number',
      b: 'void',
      c: 'boolean',
      d: 'nothing',
    },
    multi: false,
    correctAnswer: 'c',
  },
  {
    question: 'Which of the following are advantages of JavaScript?',
    answers: {
      a: 'Less server interaction',
      b: 'Increased interactivity',
      c: 'More server interaction',
      d: 'Richer interface',
    },
    multi: true,
    correctAnswer: 'abd',
  },
  {
    question: 'Which type of JavaScript language?',
    answers: {
      a: 'Object-Oriented',
      b: 'Object-Based',
      c: 'Assembly-language',
      d: 'High-level',
    },
    multi: false,
    correctAnswer: 'b',
  },
];

const quizQuestion = document.querySelector('.quiz-question');

const answersEl = document.querySelectorAll('.answer');
const scoreEl = document.querySelector('.score-content');

const a_text = document.querySelector('.a-text');
const b_text = document.querySelector('.b-text');
const c_text = document.querySelector('.c-text');
const d_text = document.querySelector('.d-text');

const nextBtn = document.querySelector('.btn-next');
const prevBtn = document.querySelector('.btn-prev');
const submitBtn = document.querySelector('.btn-submit');

let currentQuiz = 0;
let score = 0;

const showBtn = function () {
  if (currentQuiz <= 0) {
    currentQuiz = 0;
    prevBtn.classList.add('hide');
    nextBtn.classList.remove('hide');
  } else if (currentQuiz >= myQuestions.length - 1) {
    currentQuiz = myQuestions.length - 1;
    nextBtn.classList.add('hide');
    submitBtn.classList.remove('hide');
  } else {
    prevBtn.classList.remove('hide');
    nextBtn.classList.remove('hide');
    submitBtn.classList.add('hide');
  }
};

const unselectAnswer = function () {
  answersEl.forEach((ans) => (ans.checked = false));
};

const getSelected = function () {
  let answers = '';
  answersEl.forEach((ans) => {
    if (ans.checked) {
      answers += ans.id;
    }
  });
  myQuestions[currentQuiz].selectedAnswer = answers;
};

const showSelectedAnswer = function () {
  const currentQuizData = myQuestions[currentQuiz];
  if (!currentQuizData.multi) {
    answersEl.forEach((ans) => {
      if (ans.id === myQuestions[currentQuiz].selectedAnswer) {
        ans.checked = true;
      }
    });
  } else {
    unselectAnswer();
    const answersArr = currentQuizData.selectedAnswer.split('');
    answersArr.forEach((ans) => {
      document.getElementById(`${ans}`).checked = true;
    });
  }
};

const loadQuiz = function () {
  showBtn();

  const currentQuizData = myQuestions[currentQuiz];
  quizQuestion.textContent = `Question ${currentQuiz + 1}: ${
    currentQuizData.question
  }`;
  a_text.textContent = currentQuizData.answers.a;
  b_text.textContent = currentQuizData.answers.b;
  c_text.textContent = currentQuizData.answers.c;
  d_text.textContent = currentQuizData.answers.d;

  // Bonus change type of input
  if (currentQuizData.multi) {
    answersEl.forEach((ans) => (ans.type = 'checkbox'));
  } else {
    answersEl.forEach((ans) => (ans.type = 'radio'));
  }

  if (myQuestions[currentQuiz].selectedAnswer) {
    showSelectedAnswer();
  } else {
    unselectAnswer();
  }
};

const CalcScore = function () {
  myQuestions.forEach((question) => {
    if (question.correctAnswer === question.selectedAnswer) {
      score++;
    }
  });
};

loadQuiz();

nextBtn.addEventListener('click', () => {
  getSelected();
  currentQuiz++;
  loadQuiz();
});

prevBtn.addEventListener('click', () => {
  getSelected();
  currentQuiz--;
  loadQuiz();
});

submitBtn.addEventListener('click', () => {
  getSelected();
  CalcScore();
  scoreEl.textContent = `${score} out of ${myQuestions.length}`;
  scoreEl.classList.remove('hide');
  prevBtn.classList.add('hide');
  submitBtn.textContent = 'Done!';
  console.log(myQuestions);
  submitBtn.disabled = true;
});
