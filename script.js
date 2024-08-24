document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const memo = document.getElementById('memo').value;
    const imageUpload = document.getElementById('image-upload').files[0];

    if (memo || imageUpload) {
        const recentSection = document.getElementById('recent-content');
        const photoSection = document.getElementById('photo-content');
        const noteSection = document.getElementById('note-content');

        // 사진 업로드 처리
        if (imageUpload) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '200px'; // 이미지의 최대 너비 설정
                img.style.marginTop = '10px'; // 이미지와 메모 사이에 간격 추가

                // 최근 메모 및 사진, 전체 사진에 추가
                const container = document.createElement('div');
                container.classList.add('item-container');
                container.appendChild(img);
                recentSection.appendChild(container);
                photoSection.appendChild(container.cloneNode(true)); // 전체 사진에도 추가
            };
            reader.readAsDataURL(imageUpload);
        }

        // 메모 처리
        if (memo) {
            const memoParagraph = document.createElement('p');
            memoParagraph.textContent = memo;

            // 최근 메모 및 전체 메모에 추가
            const container = document.createElement('div');
            container.classList.add('item-container');
            container.appendChild(memoParagraph);
            recentSection.appendChild(container);
            noteSection.appendChild(container.cloneNode(true)); // 전체 메모에도 추가
        }

        // 폼 필드를 비우기
        document.getElementById('memo').value = '';
        document.getElementById('image-upload').value = '';
    } else {
        alert('메모나 사진을 입력하세요.');
    }
});

// 탭 전환 기능
document.querySelectorAll('nav a').forEach(tab => {
    tab.addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).classList.remove('hidden');
    });
});

// 검색 기능
function filterItems(sectionId, searchBarId) {
    const query = document.getElementById(searchBarId).value.toLowerCase();
    const items = document.querySelectorAll(`#${sectionId} .item-container`);
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });

    if (query === '') {
        items.forEach(item => item.style.display = '');
    }
}

document.getElementById('photo-search-bar').addEventListener('input', () => filterItems('photo-content', 'photo-search-bar'));
document.getElementById('note-search-bar').addEventListener('input', () => filterItems('note-content', 'note-search-bar'));
