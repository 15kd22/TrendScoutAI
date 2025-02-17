// API key for MediaStack
const API_KEY = '39cba78f121e1e569b24bf018528a7ac'; // Sign up at https://mediastack.com/

async function getTrends() {
    const topicInput = document.getElementById('topicInput');
    const resultsContainer = document.getElementById('results');
    const topic = topicInput.value.trim().toLowerCase();

    if (!topic) {
        resultsContainer.innerHTML = '<p class="error">Please enter a topic</p>';
        return;
    }

    // Show loading state
    resultsContainer.innerHTML = '<p class="loading">Finding latest trends...</p>';

    try {
        // Using RSS2JSON converter to get Google News RSS feed
        const response = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search?q=${topic}&hl=en-US&gl=US&ceid=US:en`
        );

        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const trendingArticles = data.items.slice(0, 5);
            let html = '<h2>Latest Trends in ' + topic.charAt(0).toUpperCase() + topic.slice(1) + '</h2>';
            
            trendingArticles.forEach(article => {
                html += `
                    <div class="trend-item">
                        <div class="trend-title">${article.title}</div>
                        <div class="trend-description">${article.description}</div>
                        <a href="${article.link}" target="_blank">Read more</a>
                    </div>
                `;
            });

            resultsContainer.innerHTML = html;
        } else {
            resultsContainer.innerHTML = '<p class="error">No trends found for this topic</p>';
        }
    } catch (error) {
        resultsContainer.innerHTML = '<p class="error">Error fetching trends. Please try again later.</p>';
        console.error('Error:', error);
    }
}

// Add event listener for Enter key
document.getElementById('topicInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getTrends();
    }
}); 