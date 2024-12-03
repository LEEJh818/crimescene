const firebaseConfig = {
    apiKey: "AIzaSyD7g5DdSIGP7FB5Jjsejqjwd71HKjZK0XI",
    authDomain: "crime-scene-9a5f5.firebaseapp.com",
    projectId: "crime-scene-9a5f5",
    storageBucket: "crime-scene-9a5f5.appspot.com",
    messagingSenderId: "1056014636450",
    appId: "1:1056014636450:web:3ca8a4560bf0c135a7cefb"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Firebase 인증 상태 변경 이벤트 설정
firebase.auth().onAuthStateChanged((user) => {
    const authLink = document.getElementById('authLink');
    if (user) {
        // 로그인 상태일 때 'login'을 'mypage'로 변경
        authLink.textContent = 'mypage';
        authLink.setAttribute('href', '../login/mypage.html');

        // 로그아웃 버튼 생성
        const logoutLink = document.createElement('a');
        logoutLink.textContent = 'logout';
        logoutLink.classList.add('nav-link'); // 로그아웃 버튼에 클래스 추가
        logoutLink.style.cursor = 'pointer'; // 스타일 변경
        document.querySelector('.navbar-nav').appendChild(logoutLink);

        // 로그아웃 처리
        logoutLink.addEventListener('click', () => {
            firebase.auth().signOut()
                .then(() => {
                    alert('로그아웃 성공');
                    window.location.href = '../main/main.html';  // 로그아웃 후 로그인 페이지로 이동
                })
                .catch((error) => {
                    alert('로그아웃 실패: ' + error.message);
                });
        });
    } else {
        // 로그아웃 상태일 때 'login' 유지
        authLink.textContent = 'login';
        authLink.setAttribute('href', '../login/login.html');
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // 네비게이션바 클릭 이벤트
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target.getAttribute('href');
            location.href = target;
        });
    });

    // 메뉴 버튼 클릭 이벤트
    const menuButtons = document.querySelectorAll('.menu-button');
    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('onclick').split("'")[1];
            location.href = target;
        });
    });

    // 기록일지 접근 제한 설정
    const searchLink = document.querySelector('a[href="../search/search.html"]');
    searchLink.addEventListener('click', (event) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                // 로그인이 안 되어 있으면 경고창 출력
                event.preventDefault();
                alert('로그인해야 들어갈 수 있습니다.');
                window.location.href = '../login/login.html'; // 로그인 페이지로 리디렉션
            } else {
                // 로그인된 경우 기록일지로 이동
                location.href = '../search/search.html';
            }
        });
    });
});
