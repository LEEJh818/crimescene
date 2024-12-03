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

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const postId = getQueryParam('id');

if (postId) {
    db.collection('board').doc(postId).get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            const date = data.날짜.toDate ? data.날짜.toDate() : new Date(data.날짜);
            document.getElementById('postTitle').textContent = data.제목;
            document.getElementById('postAuthor').textContent = data.글쓴이;
            document.getElementById('postDate').textContent = date.toLocaleDateString();
            document.getElementById('postContent').textContent = data.내용;
            if (data.이미지) {
                const img = document.createElement('img');
                img.src = data.이미지;
                img.alt = '첨부 이미지';
                document.getElementById('postContent').appendChild(img);
            }
            loadComments();
        } else {
            console.error('No such document!');
        }
    }).catch((error) => {
        console.error('Error getting document:', error);
    });
} else {
    console.error('No postId found in URL');
}

function loadComments() {
    db.collection('board').doc(postId).collection('comments').orderBy('date').get().then((querySnapshot) => {
        const commentsContainer = document.getElementById('comments');
        commentsContainer.innerHTML = ''; // 댓글 내용 초기화

        querySnapshot.forEach((doc) => {
            const comment = doc.data();
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            
            // 댓글 작성자 및 내용 표시
            commentElement.innerHTML = `
                <div class="comment-author">${comment.author}</div>
                <div class="comment-date">${comment.date.toDate().toLocaleDateString()}</div>
                <div class="comment-content">${comment.content}</div>
            `;
            
            commentsContainer.appendChild(commentElement);
        });
    }).catch((error) => {
        console.error('Error getting comments:', error);
    });
}

// 뒤로가기 버튼 클릭 시 목록으로 이동
document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = '../board/board.html'; // 목록 페이지 URL로 변경
});

document.getElementById('deleteButton').addEventListener('click', () => {
    if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
        db.collection('board').doc(postId).delete().then(() => {
            window.location.href = "../board/board.html"; // 게시글 삭제 후 목록 페이지로 이동
        }).catch((error) => {
            console.error('Error removing document: ', error);
        });
    }
});