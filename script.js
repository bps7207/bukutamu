// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Views
    const landingSection = document.getElementById('landing-section');
    const formSection = document.getElementById('form-section');

    // Buttons
    const btnShowForm = document.getElementById('btn-show-form');
    const btnBack = document.getElementById('btn-back');

    // Form Elements
    const form = document.getElementById('bukutamu-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.querySelector('.btn-text');
    const loader = document.querySelector('.loader');

    // Message Cards
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const resetBtn = document.getElementById('reset-btn');
    const retryBtn = document.getElementById('retry-btn');

    // ==========================================================
    // IMPORTANT: REPLACE THIS URL WITH YOUR GOOGLE APPS SCRIPT URL
    // ==========================================================
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzeAgRw_Mc4RTCUnYG-Km-LcetPAz-XPmkpVVJhz1RHs9uGnEp7tMX8p5SXYhH24ats/exec';

    // Navigation Logic
    btnShowForm.addEventListener('click', () => {
        // Hide landing, show form
        landingSection.classList.add('hidden');
        formSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    btnBack.addEventListener('click', () => {
        // Hide form, show landing
        formSection.classList.add('hidden');
        landingSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Form Submission Logic
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Check if URL is configured
        if (scriptURL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
            alert("Harap konfigurasi Google Apps Script URL di dalam file script.js terlebih dahulu.");
            console.warn("URL Web App belum diatur.");
            return;
        }

        // Show loading state
        setLoadingState(true);

        const formData = new FormData(form);

        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // Success
                showSuccess();
            } else {
                // Error from server
                showError();
                console.error('Server responded with status:', response.status);
            }
        } catch (error) {
            // Network error
            showError();
            console.error('Error submitting form:', error);
        } finally {
            setLoadingState(false);
        }
    });

    // Reset form to write another entry
    resetBtn.addEventListener('click', () => {
        form.reset();
        successMessage.classList.add('hidden');

        // Go back to landing page after success
        formSection.classList.add('hidden');
        form.classList.remove('hidden');
        landingSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Retry on error
    retryBtn.addEventListener('click', () => {
        errorMessage.classList.add('hidden');
        form.classList.remove('hidden');
    });

    function setLoadingState(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            btnText.classList.add('hidden');
            loader.classList.remove('hidden');
        } else {
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            loader.classList.add('hidden');
        }
    }

    function showSuccess() {
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');
    }

    function showError() {
        form.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }

    // Set dynamic year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
