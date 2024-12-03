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
const storage = firebase.storage();

document.getElementById('writeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const nickname = document.getElementById('nickname').value;
    const content = document.getElementById('content').value;
    const file = document.getElementById('file').files[0];
    const password = document.getElementById('password').value;  // 비밀번호 입력 필드에서 가져옴
    const date = new Date();

    if (!password) {
        alert('비밀번호를 입력해주세요.');
        return;
    }

    if (file) {
        const storageRef = storage.ref();
        const fileRef = storageRef.child('uploads/' + file.name);

        fileRef.put(file).then(() => {
            fileRef.getDownloadURL().then((url) => {
                addPostToFirestore(title, nickname, content, date, url, password);
            });
        }).catch((error) => {
            console.error('Error uploading file: ', error);
        });
    } else {
        addPostToFirestore(title, nickname, content, date, null, password);
    }
});

function addPostToFirestore(title, nickname, content, date, imageUrl, password) {
    db.collection('board').orderBy('번호', 'desc').limit(1).get().then((snapshot) => {
        let lastNumber = 0;
        if (!snapshot.empty) {
            lastNumber = snapshot.docs[0].data().번호;
        }

        const newPost = {
            제목: title,
            글쓴이: nickname,
            내용: content,
            날짜: date,
            번호: lastNumber + 1,
            이미지: imageUrl || '',
            비밀번호: password // 입력한 비밀번호 저장
        };

        db.collection('board').add(newPost).then(() => {
            alert('등록 완료되었습니다.');
            window.location.href = "../board/board.html";
        }).catch((error) => {
            console.error('Error adding document: ', error);
        });
    }).catch((error) => {
        console.error('Error getting last document: ', error);
    });
}

