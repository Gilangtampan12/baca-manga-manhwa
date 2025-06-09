const comics = [
    {
        type: 'manhwa',
        title: 'Manhwa 1',
        cover: 'cover1.jpg',
        rating: '⭐ 4.8',
        genre: 'Action, Fantasy',
        desc: 'Deskripsi singkat tentang Manhwa 1.',
        chapters: [
            {
                name: 'Chapter 1',
                pages: ['page1.jpg', 'page2.jpg']
            },
            {
                name: 'Chapter 2',
                pages: ['page3.jpg', 'page4.jpg']
            }
        ]
    },
    {
        type: 'manga',
        title: 'Akuyaku Reijo no Ani ni Tensei Shimashita',
        cover: 'cover-manga1.jpg',
        rating: '⭐ 4.7',
        genre: 'Adventure, Shounen',
        desc: 'Deskripsi singkat tentang Manga 1.',
        chapters: [
            {
                name: 'Chapter 1',
                pages: ['manga1.jpg', 'manga2.jpg', 'manga3.jpg', 'manga4.jpg', 'manga5.jpg', 'manga6.jpg', 'manga7.jpg', 'manga8.jpg', 'manga9.jpg', 'manga10.jpg']
            },
            {
                name: 'Chapter 2',
                pages: ['manga1-3.jpg', 'manga1-4.jpg']
            }
        ]
    },
    {
        type: 'manhwa',
        title: 'Manhwa 2',
        cover: 'cover2.jpg',
        rating: '⭐ 4.5',
        genre: 'Romance, Slice of Life',
        desc: 'Deskripsi singkat tentang Manhwa 2.',
        chapters: [
            {
                name: 'Chapter 1',
                pages: ['page2-1.jpg', 'page2-2.jpg']
            },
            {
                name: 'Chapter 2',
                pages: ['page2-3.jpg', 'page2-4.jpg']
            }
        ]
    }
];

const manhwaList = document.getElementById('manhwa-list');
const reader = document.getElementById('reader');
const readerTitle = document.getElementById('reader-title');
const readerCover = document.getElementById('reader-cover');
const readerRating = document.getElementById('reader-rating');
const readerGenre = document.getElementById('reader-genre');
const readerDesc = document.getElementById('reader-desc');
const chapterList = document.getElementById('chapter-list');
const manhwaImages = document.getElementById('manhwa-images');
const backButton = document.getElementById('back-button');
const nextJudulButton = document.getElementById('next-judul');

let currentManhwaIndex = 0;

function showComicList() {
    reader.classList.add('hidden');
    manhwaList.innerHTML = '';
    comics.forEach((comic, index) => {
        const card = document.createElement('div');
        card.className = 'manhwa-card';
        card.innerHTML = `
            <img src="${comic.cover}" alt="${comic.title}">
            <div class="manhwa-info">
                <h3 class="manhwa-title">[${comic.type.toUpperCase()}] ${comic.title}</h3>
            </div>
        `;
        card.addEventListener('click', () => {
            currentManhwaIndex = index;
            showReader(comic);
        });
        manhwaList.appendChild(card);
    });
}

function showReader(comic) {
    reader.classList.remove('hidden');
    manhwaList.innerHTML = '';
    
    // Set info comic
    readerCover.src = comic.cover;
    readerTitle.textContent = comic.title;
    readerRating.textContent = `Rating: ${comic.rating}`;
    readerGenre.textContent = `Genre: ${comic.genre}`;
    readerDesc.textContent = comic.desc;
    
    // Clear chapter list & images
    chapterList.innerHTML = '<h3>Pilih Chapter:</h3>';
    manhwaImages.innerHTML = '';
    
    // Show chapter buttons
    comic.chapters.forEach((chapter) => {
        const chapterButton = document.createElement('button');
        chapterButton.textContent = chapter.name;
        chapterButton.style.margin = '5px';
        chapterButton.addEventListener('click', () => {
            showChapterPages(chapter);
        });
        chapterList.appendChild(chapterButton);
    });
    
    // Next Judul button
    if (currentManhwaIndex < comics.length - 1) {
        nextJudulButton.classList.remove('hidden');
    } else {
        nextJudulButton.classList.add('hidden');
    }
}

function showChapterPages(chapter) {
    manhwaImages.innerHTML = '';
    chapter.pages.forEach((pageSrc) => {
        const img = document.createElement('img');
        img.src = pageSrc;
        img.className = 'reader-image';
        manhwaImages.appendChild(img);
    });
}

backButton.addEventListener('click', showComicList);

nextJudulButton.addEventListener('click', () => {
    if (currentManhwaIndex < comics.length - 1) {
        currentManhwaIndex++;
        showReader(comics[currentManhwaIndex]);
    }
});

// Initial load
showComicList();

const toggleThemeBtn = document.getElementById('toggle-theme');

toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    toggleThemeBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});
