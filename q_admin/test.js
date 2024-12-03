
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyD7g5DdSIGP7FB5Jjsejqjwd71HKjZK0XI",
  authDomain: "crime-scene-9a5f5.firebaseapp.com",
  projectId: "crime-scene-9a5f5",
  storageBucket: "crime-scene-9a5f5.appspot.com",
  messagingSenderId: "1056014636450",
  appId: "1:1056014636450:web:3ca8a4560bf0c135a7cefb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let quizzes = [];
let currentQuizIndex = 0;
let correctAnswersCount = 0;

window.onload = function() {
  loadQuizzes();
};

async function loadQuizzes() {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = '';

  try {
    const querySnapshot = await getDocs(collection(db, 'quiz'));
    if (querySnapshot.empty) {
      quizContainer.innerHTML = '<p>퀴즈가 없습니다.</p>';
      return;
    }

    quizzes = [];
    querySnapshot.forEach(doc => {
      quizzes.push({ id: doc.id, ...doc.data() });
    });

    if (quizzes.length > 0) {
      currentQuizIndex = 0;
      correctAnswersCount = 0;
      showQuiz(currentQuizIndex);
    }
  } catch (error) {
    console.error("Error loading quizzes: ", error);
    quizContainer.innerHTML = '<p>퀴즈를 불러오는 데 실패했습니다.</p>';
  }
}

function showQuiz(index) {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = '';

  if (index < quizzes.length) {
    const quiz = quizzes[index];

    const questionElement = document.createElement('div');
    questionElement.classList.add('quiz-question');
    questionElement.textContent = quiz.question;

    const optionsElement = document.createElement('div');
    optionsElement.classList.add('quiz-options');

    quiz.options.forEach((option, i) => {
      const optionButton = document.createElement('button');
      optionButton.textContent = `${i + 1}) ${option}`;
      optionButton.onclick = () => {
        checkAnswer(i + 1, quiz.answer);
      };
      optionsElement.appendChild(optionButton);
    });

    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);

    const feedback = document.createElement('div');
    feedback.classList.add('quiz-feedback');
    quizContainer.appendChild(feedback);

    const emoji = document.createElement('div');
    emoji.classList.add('emoji', 'neutral');
    quizContainer.appendChild(emoji);

  } else {
    showResults();
  }
}

function checkAnswer(selectedOption, correctOption) {
  const feedback = document.querySelector('.quiz-feedback');
  const emoji = document.querySelector('.emoji');

  if (selectedOption === correctOption) {
    feedback.textContent = '정답입니다!';
    emoji.className = 'emoji happy'; // 웃는 이모티콘
    correctAnswersCount++;
  } else {
    feedback.textContent = '틀렸습니다.';
    emoji.className = 'emoji sad'; // 우는 이모티콘
  }

  setTimeout(() => {
    currentQuizIndex++;
    if (currentQuizIndex < quizzes.length) {
      showQuiz(currentQuizIndex);
    } else {
      showResults();
    }
  }, 600); // 1초 후 다음 문제로 이동
}

function showResults() {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = `<h2>퀴즈 완료!</h2>
                             <p>정답 수: ${correctAnswersCount} / ${quizzes.length}</p>
                             <button class="retry-button" onclick="window.retryQuiz()">다시 풀기</button>`;
}

window.retryQuiz = function() {
  loadQuizzes();
}
