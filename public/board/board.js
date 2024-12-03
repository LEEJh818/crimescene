// Firebase 초기화
const firebaseConfig = {
    apiKey: "AIzaSyD7g5DdSIGP7FB5Jjsejqjwd71HKjZK0XI",
    authDomain: "crime-scene-9a5f5.firebaseapp.com",
    projectId: "crime-scene-9a5f5",
    storageBucket: "crime-scene-9a5f5.appspot.com",
    messagingSenderId: "1056014636450",
    appId: "1:1056014636450:web:3ca8a4560bf0c135a7cefb"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let allDocs = [];
let filteredDocs = [];
const pageSize = 10;
let currentPage = 0;

// 페이지 렌더링 함수
function renderPage(docs) {
    const opinionList = document.getElementById('opinion-list');
    opinionList.innerHTML = '';
    const start = currentPage * pageSize;
    const end = start + pageSize;
    const pageDocs = docs.slice(start, end);

    pageDocs.forEach((doc, index) => {
        const data = doc.data();
        const date = data.날짜.toDate ? data.날짜.toDate() : new Date(data.날짜);
        const row = document.createElement('tr');
        row.innerHTML = 
        `<th scope="row">${docs.length - (start + index)}</th>
            <td><a href="#" class="title-link" data-id="${doc.id}">${data.제목}</a></td>
            <td>${data.글쓴이}</td>
            <td>${date.toLocaleDateString()}</td>`;
        opinionList.appendChild(row);
    });
}

// 첫 페이지 로드
function getFirstPage() {
    db.collection('board').orderBy('번호', 'asc').get().then((snapshot) => {
        allDocs = snapshot.docs.reverse();  // 최신순으로 정렬
        filteredDocs = allDocs;
        currentPage = 0;
        renderPage(filteredDocs);
    }).catch((error) => {
        console.error('Error getting documents: ', error);
    });
}

function getNextPage() {
    if ((currentPage + 1) * pageSize >= filteredDocs.length) return;
    currentPage++;
    renderPage(filteredDocs);
}

function getPrevPage() {
    if (currentPage === 0) return;
    currentPage--;
    renderPage(filteredDocs);
}

function searchDocuments() {
    const searchType = document.getElementById('searchType').value;
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();

    filteredDocs = allDocs.filter(doc => {
        const data = doc.data();
        if (searchType === '제목') {
            return data.제목.toLowerCase().includes(searchInput);
        } else if (searchType === '글쓴이') {
            return data.글쓴이.toLowerCase().includes(searchInput);
        }
        return false;
    });

    currentPage = 0;
    renderPage(filteredDocs);
}

document.getElementById('searchButton').addEventListener('click', searchDocuments);
document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchDocuments();
    }
});
document.getElementById('prevPage').addEventListener('click', getPrevPage);
document.getElementById('nextPage').addEventListener('click', getNextPage);

// 초기 페이지 로드
getFirstPage();

// 비밀번호 확인 후 페이지 이동 함수
function checkPasswordAndRedirect(password, targetId) {
    // 관리자 비밀번호 확인
    db.collection('passwd').doc('board').get().then((adminDoc) => {
        if (adminDoc.exists) {
            const adminData = adminDoc.data();
            const adminPassword = adminData.admin1;

            // 작성자 비밀번호 확인
            db.collection('board').doc(targetId).get().then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    const writerPassword = data.비밀번호;

                    if (adminPassword === password || writerPassword === password) {
                        // 비밀번호가 일치하면 적절한 페이지로 이동
                        if (adminPassword === password) {
                            window.location.href = `../board/board_admin.html?id=${targetId}`;
                        } else {
                            window.location.href = `../detail/detail.html?id=${targetId}`;
                        }
                    } else {
                        alert('비밀번호가 일치하지 않습니다.');
                    }
                } else {
                    console.error('문서가 존재하지 않습니다.');
                }
            }).catch((error) => {
                console.error('작성자 비밀번호 확인 중 오류 발생: ', error);
            });
        } else {
            console.error('관리자 비밀번호 문서가 존재하지 않습니다.');
        }
    }).catch((error) => {
        console.error('관리자 비밀번호 확인 중 오류 발생: ', error);
    });
}

// 의견 게시판 목록에서 상세 페이지 링크 클릭 시 비밀번호 모달 표시
document.addEventListener('click', function(event) {
    if (event.target && event.target.matches('.title-link')) {
        event.preventDefault();
        const targetId = event.target.getAttribute('data-id');

        // 모달 표시
        const passwordModal = new bootstrap.Modal(document.getElementById('passwordModal'));
        passwordModal.show();

        // 모달 확인 버튼 클릭 시 비밀번호 확인
        document.getElementById('confirmPasswordBtn').addEventListener('click', function() {
            const passwordInput = document.getElementById('passwordInput').value.trim();
            console.log('입력된 비밀번호:', passwordInput); // 디버깅용 콘솔 로그
            checkPasswordAndRedirect(passwordInput, targetId);
            passwordModal.hide();
        }, { once: true }); // 이벤트 리스너를 한 번만 실행하도록 설정
    }
});
