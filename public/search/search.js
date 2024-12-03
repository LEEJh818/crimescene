// Firebase 초기화
const firebaseConfig = {
    apiKey: "AIzaSyD7g5DdSIGP7FB5Jjsejqjwd71HKjZK0XI",
    authDomain: "crime-scene-9a5f5.firebaseapp.com",
    projectId: "crime-scene-9a5f5",
    storageBucket: "crime-scene-9a5f5.appspot.com",
    messagingSenderId: "1056014636450",
    appId: "1:1056014636450:web:3ca8a4560bf0c135a7cefb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// 페이징 처리를 위한 변수
const itemsPerPage = 10;
let currentPage = 1;
let totalItems = 0;
let totalPages = 0;
let lastVisible = null;
let searchMode = false;

// 경찰서 목록 불러오기
function loadPoliceStations(page, searchQuery = null) {
    const resultDiv = document.getElementById('result');
    const paginationDiv = document.getElementById('pagination');
    resultDiv.innerHTML = '';
    paginationDiv.innerHTML = '';

    let query = db.collection('police').orderBy('경찰서명').limit(itemsPerPage);

    if (searchQuery) {
        query = db.collection('police')
            .where('경찰서명', '>=', searchQuery)
            .where('경찰서명', '<=', searchQuery + '\uf8ff')
            .orderBy('경찰서명')
            .limit(itemsPerPage);
        searchMode = true;
    } else {
        searchMode = false;
    }

    if (page > 1 && lastVisible) {
        query = query.startAfter(lastVisible);
    }

    query.get().then(querySnapshot => {
        if (!querySnapshot.empty) {
            lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        }

        querySnapshot.forEach(doc => {
            const data = doc.data();
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('police-item');
            itemDiv.innerHTML = `<h5>${data.경찰서명}</h5><p>${data.주소}</p>`;
            resultDiv.appendChild(itemDiv);
        });

        // 페이지네이션
        const startPage = Math.max(1, page - 2);
        const endPage = Math.min(totalPages, page + 2);

        if (page > 1) {
            const prevButton = document.createElement('button');
            prevButton.classList.add('btn', 'btn-secondary', 'mx-1');
            prevButton.innerText = '이전';
            prevButton.onclick = () => {
                currentPage--;
                loadPoliceStations(currentPage, searchQuery);
            };
            paginationDiv.appendChild(prevButton);
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.classList.add('btn', 'btn-secondary', 'mx-1');
            pageButton.innerText = i;
            pageButton.onclick = () => {
                currentPage = i;
                loadPoliceStations(currentPage, searchQuery);
            };
            if (i === page) {
                pageButton.classList.add('active');
            }
            paginationDiv.appendChild(pageButton);
        }

        if (page < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.classList.add('btn', 'btn-secondary', 'mx-1');
            nextButton.innerText = '다음';
            nextButton.onclick = () => {
                currentPage++;
                loadPoliceStations(currentPage, searchQuery);
            };
            paginationDiv.appendChild(nextButton);
        }
    })
    .catch(error => console.error('Error loading police stations:', error));
}

// 초기 로드 시 전체 경찰서 수 가져오기
db.collection('police').get().then(querySnapshot => {
    totalItems = querySnapshot.size;
    totalPages = Math.ceil(totalItems / itemsPerPage);
    loadPoliceStations(currentPage);
});


// 검색 함수
function searchPoliceStation() {
    const searchQuery = document.getElementById('search').value.trim();
    currentPage = 1; // 검색 시 첫 페이지로 설정
    if (searchQuery) {
        db.collection('police')
            .where('경찰서명', '>=', searchQuery)
            .where('경찰서명', '<=', searchQuery + '\uf8ff')
            .get()
            .then(querySnapshot => {
                totalItems = querySnapshot.size;
                totalPages = Math.ceil(totalItems / itemsPerPage);
                loadPoliceStations(currentPage, searchQuery);
            })
            .catch(error => console.error('Error searching police station:', error));
    } else {
        db.collection('police').get().then(querySnapshot => {
            totalItems = querySnapshot.size;
            totalPages = Math.ceil(totalItems / itemsPerPage);
            loadPoliceStations(currentPage);
        });
    }
}
