/**
 * Hides the loader element after a 2 second delay when the window finishes loading.
 */
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
    }, 500);
});

/**
 * Removes the custom loader from the DOM.
 */
function hideLoader() {
    const loader = document.getElementById('custom-loader')
    if (loader) {
        loader.remove()
    }
}

/**
 * Shows the loader, performs any asynchronous tasks, and then hides the loader.
 */
async function loadContent() {
    showLoader()
    try {
        // Simulate some asynchronous task (e.g., fetching data)
        await new Promise(resolve => setTimeout(resolve, 2000))
        // Add your actual content loading logic here
    } catch (error) {
        console.error('Error loading content:', error)
    } finally {
        hideLoader()
    }
}

// Call loadContent when the window finishes loading
window.onload = function () {
    loadContent()
    // Keep the existing onload functionality
    // document.getElementById('independence-popup').classList.remove('hidden')
    animateNumber('projectCount', 500)
    animateNumber('customerCount', 1000)
}


/**
 * Toggles the visibility of the menu element when the menu-toggle element is clicked.
 */
document.getElementById('menu-toggle').addEventListener('click', function () {
    document.getElementById('menu').classList.toggle('hidden');
});

/**
 * Closes the independence popup by adding the 'hidden' class to the popup element.
 */
function closePopup() {
    document.getElementById('independence-popup').classList.add('hidden');
}

/**
 * Initializes the independence popup and animates the project and customer count numbers.
 * This function is called when the window finishes loading.
 */
window.onload = function () {
    // document.getElementById('independence-popup').classList.remove('hidden');
    animateNumber('projectCount', 500);
    animateNumber('customerCount', 1000);
}

/**
 * Animates a number element with the given ID to the specified end value.
 * The animation lasts for 2 seconds and uses requestAnimationFrame to update the number.
 * @param {string} elementId - The ID of the element to animate.
 * @param {number} endValue - The final value to animate the element to.
 */
function animateNumber(elementId, endValue) {
    let startValue = 0;
    let duration = 2000;
    let startTime = null;

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        let progress = (currentTime - startTime) / duration;
        progress = Math.min(progress, 1);
        let currentValue = Math.floor(startValue + progress * (endValue - startValue));
        document.getElementById(elementId).textContent = currentValue;
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

/**
 * Changes the image displayed on the page by fetching a random image from the picsum.photos API and updating the source of the image element.
 * The image is faded in and out during the transition to create a smooth animation effect.
 * This function is called every 10 seconds to continuously update the displayed image.
 */
function changeImage() {
    const img = document.getElementById('aboutImage');
    img.style.opacity = 0;
    setTimeout(() => {
        img.src = `https://picsum.photos/600/400?random=${new Date().getTime()}`;
        img.style.opacity = 1;
    });
}

setInterval(changeImage, 10000);

//    quotes
/**
 * Fetches a list of quotes from an API and returns them.
 * @returns {Promise<Array<{ text: string, author: string }>} - A promise that resolves to an array of quote objects, each with a 'text' and 'author' property.
 * If the API call fails, the promise resolves to an empty array.
 */
async function fetchQuotes() {
    try {
        const response = await fetch('https://type.fit/api/quotes');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return [];
    }
}

/**
 * Fetches a random quote from an API and updates the daily quote and author elements on the page.
 * If the API call fails, it displays a message indicating that the quote could not be fetched.
 */
async function updateQuote() {
    const quoteElement = document.getElementById('daily-quote');
    const authorElement = document.getElementById('quote-author');

    const quotes = await fetchQuotes();
    if (quotes.length > 0) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        quoteElement.textContent = `"${randomQuote.text}"`;
        authorElement.textContent = `- ${randomQuote.author || 'Unknown'}`;
    } else {
        quoteElement.textContent = "Failed to fetch quote. Please try again later.";
        authorElement.textContent = "";
    }
}

// Update quote on page load
updateQuote();

// Update quote every 10 seconds
setInterval(updateQuote, 10 * 1000);

/**
 * Handles the filtering and display of portfolio items based on selected categories.
 * This function is called when the DOM content has finished loading.
 */
document.addEventListener('DOMContentLoaded', function () {
    const categoryChips = document.querySelectorAll('.category-chip');
    const portfolioItems = document.querySelectorAll('#portfolio-grid > div');

    categoryChips.forEach(chip => {
        chip.addEventListener('click', function () {
            const category = this.getAttribute('data-category');

            categoryChips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            portfolioItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

/**
 * Initializes a Swiper carousel with the following configuration:
 * - Slides are displayed in an auto layout, with a 30px space between them.
 * - The carousel loops infinitely.
 * - Autoplay is enabled with a 3-second delay, and it continues playing even when the user interacts with the carousel.
 * - A pagination element is displayed and is clickable.
 * - The number of slides displayed changes based on the screen size:
 *   - On screens smaller than 640px, 2 slides are displayed.
 *   - On screens between 640px and 1024px, 3 slides are displayed.
 *   - On screens larger than 1280px, 4 slides are displayed.
 * - The carousel is in free mode, allowing the user to swipe freely.
 * - A scrollbar is displayed, but it is hidden by default.
 */
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
        1280: {
            slidesPerView: 4,
        },
    },
    freeMode: true,
    scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,
    },
});

