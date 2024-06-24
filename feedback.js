
document.getElementById('feedbackForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const rating = document.getElementById('rating').value;
    const comments = document.getElementById('comments').value;
    const contact = document.getElementById('contact').value;
    const date = new Date().toISOString().split('T')[0];

    const feedback = { rating, comments, contact, date };

    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    alert('Thank you for your feedback!');
    event.target.reset();
});


window.onload = function() {
    if (document.getElementById('feedbackList')) {
        displayFeedback();
    }
}

function displayFeedback(filteredFeedbacks = null) {
    const feedbackList = document.getElementById('feedbackList');
    feedbackList.innerHTML = '';

    let feedbacks = filteredFeedbacks || JSON.parse(localStorage.getItem('feedbacks')) || [];
    let totalRating = 0;

    if (feedbacks.length === 0) {
        feedbackList.innerHTML = '<div class="no-feedback">No feedback available.</div>';
    } else {
        feedbacks.forEach(feedback => {
            totalRating += parseInt(feedback.rating);

            const feedbackDiv = document.createElement('div');
            feedbackDiv.classList.add('feedback');
            feedbackDiv.innerHTML = `
                <p><strong>Rating:</strong> ${feedback.rating}</p>
                <p><strong>Comments:</strong> ${feedback.comments}</p>
                <p><strong>Contact:</strong> ${feedback.contact}</p>
                <p><strong>Date:</strong> ${feedback.date}</p>
            `;
            feedbackList.appendChild(feedbackDiv);
        });

        const averageRating = totalRating / feedbacks.length || 0;
        document.getElementById('averageRating').innerText = `Average Rating: ${averageRating.toFixed(2)}`;
    }
}

function filterFeedback() {
    const rating = document.getElementById('filterRating').value;
    const date = document.getElementById('filterDate').value;

    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

    if (rating) {
        feedbacks = feedbacks.filter(fb => fb.rating == rating);
    }
    if (date) {
        feedbacks = feedbacks.filter(fb => fb.date >= date);
    }

    displayFeedback(feedbacks);
}
