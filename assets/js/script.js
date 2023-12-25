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
        tags: ['viaggi', 'geo'],
        author: 'Fabio Mari',
        published: '2023-03-14',
        image: './assets/img/deep-sea.jpg alt="deep-sea"'
    },

    {
        id: '3',
        title: 'Viaggio culinario: alla ricerca dei sapori perduti',
        content: 'Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.',
        tags: ['cucina'],
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
 
    // Salvo in una variabile l'elemento dove inserire ogni news
    const newsWrapperEl = document.querySelector('.news')

    // Salvo in una variabile ogni card tramite la funzione
    newsCardEl = generateCard(news)

    // All'interno del wrapper vengono stampate le card
    newsWrapperEl.innerHTML += newsCardEl
    
})
    
// Salvo in una variabile tutti gli span
const spans = document.querySelectorAll('span')
    
    // Itero all'interno degli span e coloro ogni span in base al tag
    spans.forEach(span => {
        if (span.textContent.includes('cucina')) {
            span.classList.add('bg_purple')
        }
        else if (span.textContent.includes('geo')) {
            span.classList.add('bg-success')
        }
        else if (span.textContent.includes('viaggi')) {
            span.style.backgroundColor = 'red'
        }
        else if (span.textContent.includes('arte')) {
            span.classList.add('bg-warning')
        }
        else if (span.textContent.includes('tech')) {
            span.style.backgroundColor = 'blue'
        }
    })
    
    


function generateCard(news) {
        
        const cardMarkup = `
    <div class="article my-3 p-3">
        <div class="title d-flex justify-content-between">
            <h1 class="text-start fs-3 mb-0">${news.title}</h1>
            <i class="btn border border-0 fa-solid fa-bookmark ms-5 fs-4"></i>
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


function formatDate(dateInput) {
    
    const dataSplitted = dateInput.split('-')
    
    const dataOutput = `${dataSplitted[2]}/${dataSplitted[1]}/${dataSplitted[0]}`

    return dataOutput
}



