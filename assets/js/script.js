// Milestone 2

// Step 1: struttura dei dati

const newsList = [
    {
        id: '1',
        title: 'Scoperta di una nuova specie di papera di gomma',
        content: 'Scoperta di una nuova specie di papera di gomma.',
        tags: ['geo', 'tech'],
        author: 'Diana Rossi',
        published: '2023-02-11',
        image: './assets/img/rubber-duck.jpg alt="rubber-duck"'
    },

    {
        id: '2',
        title: 'Esplorando le profondità marine: il mistero degli abissi',
        content: 'Esplorando le profondità marine: il mistero degli abissi',
        tags: ['viaggi'],
        author: 'Fabio Mari',
        published: '2023-03-14',
        image: './assets/img/deep-sea.jpg alt="deep-sea"'
    },

    {
        id: '3',
        title: 'Viaggio culinario: alla ricerca dei sapori perduti',
        content: 'Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.',
        tags: ['cucina', 'geo'],
        author: 'Marta Bianchi',
        published: '2023-04-20',
        image: './assets/img/kitchen-food.jpg alt="kitchen-food"'
    },

    {
        id: '4',
        title: 'Arte moderna: oltre i confini convenzionali',
        content: "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste a artisti emergenti.",
        tags: ['arte', 'tech'],
        author: 'Gabriele Neri',
        published: '2023-05-29',
        image: './assets/img/modern-art.jpg alt="modern-art"'
    }

]

// Step 2 - Stampa dei dati in pagina

// Dall'array di oggetti estrapolo con il ciclo for each ogni singolo oggetto (news)
newsList.forEach(news => {

    // Se il valore del secondo tag è indefinito
    if (news.tags[1] === undefined) {

        // Al posto di undefined non ci sarà scritto niente
        news.tags[1] = '';
    }
})

// Salvo in una variabile l'elemento dove inserire ogni news
const newsWrapperEl = document.querySelector('.news')

// Stampo in pagina all'interno del wrapper tutte le news con una funzione
renderNews(newsList, newsWrapperEl);
// Coloro tramite la funzione tutti i tag
colorTag();
// Rendo cliccabile il bookmark
selectBookmark();

firstBookmark(newsList)

// Salvo in una variabile il select
const selectTagsEl = document.getElementById('tags');

// Al variare del valore all'interno del select viene scatenata la funzione
selectTagsEl.addEventListener('change', function (e) {

    // Seleziono il wrapper dove inserire le card
    const newsWrapperEl = document.querySelector('.news');

    // Svuoto il wrapper
    newsWrapperEl.innerHTML = '';

    // Salvo in un array le news filtrate in base al tag selezionato
    const filteredNews = newsList.filter(news => {
        return (news.tags).includes(e.target.value) || e.target.value === 'allTags';
    })

    // Inserisco tramite la funzione l'array di news filtrate all'interno del wrapper
    renderNews(filteredNews, newsWrapperEl);
    // Coloro tramite la funzione i tag delle news filtrate
    colorTag();

    // Se il valore del select è politica
    if (e.target.value === 'politica') {

        // Viene mostrato in pagina che non ci sono news disponibili
        newsWrapperEl.innerHTML = `<h2 class="text-white">No news available.</h2>`
        document.body.style.backgroundColor = '#023047'
    }

    // Rendo cliccabile il bookmark
    selectBookmark();
    // Al bookmark della prima news aggiungo la classe per renderlo pieno
    firstBookmark(filteredNews)

})



// Creo l'array e lo inserisco in un set, dove posso salvare le news col bookmark selezionato senza duplicati
const savedNews = new Set([newsList[0]]);

// Salvo in una variabile tutti i bookmark
const bookmarks = document.querySelectorAll('.fa-bookmark');


bookmarks.forEach(bookmark => {
    // Al click di ogni bookmark
    bookmark.addEventListener('click', function(){

        // Salvo in una variabile il data attribute del bookmark
        const cardId = bookmark.getAttribute('data-id')

        const card = newsList.find(news => news.id === cardId);

        // Se la card non è presente nell'array viene aggiunta, altrimenti no
        if (card) {
            savedNews.add(card)
            console.log(savedNews);
        }
        
    })
})

// Salvo in una variabile il checkbox
const checkboxEl = document.getElementById('saved_news')

// Al cambio di valore del checkbox
checkboxEl.addEventListener('change', function(){
    // Se il checkbox è selezionato
    if (checkboxEl.checked) {
        // Svuoto il wrapper
        newsWrapperEl.innerHTML = ''

        // Tramite la funzione inserisco nel wrapper le news salvate
        renderNews(savedNews, newsWrapperEl)
        // Coloro i tag
        colorTag()
        // Rendo cliccabili i bookmark
        selectBookmark()

        // Salvo in una variabile tutti gli i
        const iElements = document.querySelectorAll('i')
        iElements.forEach(iEl => {
            // Aggiungo ad ogni i salvato la classe
            iEl.classList.add('fa-solid')
        })

        console.log(savedNews);

        // Altrimenti quando il checkbox non è selezionato
    } else {

        // Svuoto il wrapper
        newsWrapperEl.innerHTML = ''

        // Inserisco nel wrapper tutte le news
        renderNews(newsList, newsWrapperEl)
        colorTag()
        selectBookmark()
        // Rendo selezionato il primo bookmark 
        firstBookmark(newsList)

    }
    
})


/**
 * Generate the markup for a news card
 * @param {object} news The news object
 * @returns object
 */
function generateCard(news) {

    const cardMarkup = `
        <div class="card-${news.id} my-3 p-3" data-id="${news.id}">
        <div class="title d-flex justify-content-between">
        <h1 class="text-start fs-3 mb-0">${news.title}</h1>
        <i id="bookmark-${news.id}" class="btn border border-0 fa-regular fa-bookmark ms-5 fs-4" data-id="${news.id}"></i>
        </div>
            <h6 class="text-start mb-0">pubblicato da ${news.author}</h6>
            <span class="fs_12">in data ${formatDate(news.published)}</span>
            <h6 class="d-block my-2">${news.content}</h6>
            <img class="pb-3" width="100%" src=${news.image}>
            <div class="tags">
                <span class="badge p-2">${news.tags[0]}</span>
                <span class="badge p-2">${news.tags[1]}</span>
            </div>
        </div>`

    return cardMarkup


}

/**
 * Renders the list of news into the dom element
 * @param {Array} newsList The list of news
 * @param {object} domElement The node where append the news list
*/
function renderNews(newsList, domElement) {

    newsList.forEach(news => {

        // Salvo in una variabile ogni card tramite la funzione
        newsCardEl = generateCard(news);

        // All'interno del wrapper vengono stampate le card
        domElement.insertAdjacentHTML('beforeend', newsCardEl);

    })
}

/**
 * Color the all tags with specific colors
 */
function colorTag() {
    // Salvo in una variabile tutti gli span
    const spans = document.querySelectorAll('span');

    // Itero all'interno degli span e coloro ogni span in base al tag
    spans.forEach(span => {
        if (span.textContent.includes('cucina')) {
            span.classList.add('bg_purple');
        }
        else if (span.textContent.includes('geo')) {
            span.classList.add('bg-success');
        }
        else if (span.textContent.includes('viaggi')) {
            span.style.backgroundColor = 'red';
        }
        else if (span.textContent.includes('arte')) {
            span.classList.add('bg-warning');
        }
        else if (span.textContent.includes('tech')) {
            span.style.backgroundColor = 'blue';
        }
    })
}

/**
 * Format the date from the American format to the Italian one
 * @param {string} date 
 * @returns string
 */
function formatDate(dateInput) {

    const dataSplitted = dateInput.split('-');

    const dataOutput = `${dataSplitted[2]}/${dataSplitted[1]}/${dataSplitted[0]}`;

    return dataOutput;
}

/**
 * Makes clickable the news bookmark
 */
function selectBookmark() {
    // Salvo in una variabile gli elementi i
    const iElements = document.querySelectorAll('i');

    // Itero all'interno degli elementi i
    iElements.forEach(iEl => {

        // Al click dell'i (bookmark) viene aggiunta o rimossa una classe
        iEl.addEventListener('click', function () {
            iEl.classList.remove('fa-regular')
            iEl.classList.add('fa-solid')
        })
    })
}

function firstBookmark(list) {

    if (list[0].id === '1') {
        
        const firstNewsBookmark = document.getElementById('bookmark-1')
        
        firstNewsBookmark.classList.add('fa-solid')
    }
}