    // Firebase 초기화
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
      };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Initialize Firestore
    const db = firebase.firestore();

    // Fetch documents from 'notice' collection
    db.collection('notice').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const noticeItem = `<div class="notice-item">
                <div class="notice-item-title">
                    ${data.제목}
                    <i class="fas fa-plus"></i>
                </div>
                <div class="notice-item-content">${data.내용}</div>
            </div>`;
            document.getElementById('notice-list').innerHTML += noticeItem;
        });

        // 이벤트 리스너 추가 (동적으로 추가된 요소에도 적용)
        document.querySelectorAll('.notice-item-title').forEach(item => {
            item.addEventListener('click', () => {
                const noticeItem = item.parentElement;
                const icon = item.querySelector('i');
                noticeItem.classList.toggle('open');
                if (noticeItem.classList.contains('open')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });
        });
    }).catch((error) => {
        console.error("Error fetching documents: ", error);
    });

    // 비밀번호 확인 기능
    document.getElementById('writeButton').addEventListener('click', () => {
        const passwordModal = new bootstrap.Modal(document.getElementById('passwordModal'));
        passwordModal.show();
    });

    document.getElementById('passwordSubmitButton').addEventListener('click', async () => {
        const inputPassword = document.getElementById('passwordInput').value;
        const passwordDocRef = db.collection('passwd').doc('board');

        try {
            const doc = await passwordDocRef.get();
            if (doc.exists) {
                const passwordData = doc.data();
                if (inputPassword === passwordData.admin1) {
                    window.location.href = 'notice_admin.html'; // 비밀번호가 맞으면 관리자 페이지로 이동
                } else {
                    alert('비밀번호가 맞지 않습니다.');
                }
            } else {
                alert('비밀번호 설정이 잘못되었습니다.');
            }
        } catch (error) {
            console.error("Error checking password: ", error);
        }
    });
