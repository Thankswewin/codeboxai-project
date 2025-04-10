document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('light-icon');
    const darkIcon = document.getElementById('dark-icon');
    const themeText = document.getElementById('theme-text');
    
    // Check for saved theme preference or use default light theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme on page load
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'block';
        themeText.textContent = 'Light Mode';
    }
    
    // Toggle theme when button is clicked
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Check current theme
            const currentTheme = document.documentElement.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                // Switch to light theme
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                lightIcon.style.display = 'block';
                darkIcon.style.display = 'none';
                themeText.textContent = 'Dark Mode';
            } else {
                // Switch to dark theme
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                lightIcon.style.display = 'none';
                darkIcon.style.display = 'block';
                themeText.textContent = 'Light Mode';
            }
        });
    }
    // Handle payment page if it exists
    const paymentTabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Handle tab switching
    if (paymentTabs.length > 0) {
        // Check if URL has a hash for direct navigation
        if (window.location.hash === '#subscription') {
            // Activate subscription tab
            paymentTabs.forEach(tab => {
                if (tab.getAttribute('data-tab') === 'subscription') {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
            
            // Show subscription content, hide credits content
            document.getElementById('credits-tab').style.display = 'none';
            document.getElementById('subscription-tab').style.display = 'block';
        }
        
        // Add click handlers for tabs
        paymentTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                paymentTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all tab contents
                tabContents.forEach(content => {
                    content.style.display = 'none';
                });
                
                // Show selected tab content
                const tabId = this.getAttribute('data-tab') + '-tab';
                document.getElementById(tabId).style.display = 'block';
            });
        });
    }
    
    // Handle credit purchase form if it exists
    const creditForm = document.getElementById('credit-form');
    if (creditForm) {
        // Set up amount button functionality
        const amountButtons = document.querySelectorAll('.amount-btn');
        const creditAmountInput = document.getElementById('credit-amount');
        
        amountButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                amountButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Update credit amount input
                const amount = this.textContent.replace('$', '');
                creditAmountInput.value = amount;
            });
        });
        
        // Form submission handler
        creditForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const creditAmount = document.getElementById('credit-amount').value;
            const cardNumber = document.getElementById('card-number').value;
            const expiry = document.getElementById('expiry').value;
            const cvc = document.getElementById('cvc').value;
            
            // Basic validation
            if (!validateEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            if (!validateCardNumber(cardNumber)) {
                showError('Please enter a valid card number');
                return;
            }
            
            if (!validateExpiry(expiry)) {
                showError('Please enter a valid expiry date (MM/YY)');
                return;
            }
            
            if (!validateCVC(cvc)) {
                showError('Please enter a valid CVC code');
                return;
            }
            
            // Simulate payment processing
            showProcessing();
            
            // In a real application, you would send this data to a server
            setTimeout(() => {
                // Store credit info in localStorage
                const currentCredits = parseInt(localStorage.getItem('credits') || '0');
                const purchasedCredits = parseInt(creditAmount) * 10; // $1 = 10 credits
                const totalCredits = currentCredits + purchasedCredits;
                localStorage.setItem('credits', totalCredits.toString());
                
                // Show success message
                showSuccess(creditAmount, totalCredits);
            }, 2000);
        });
    }
    
    // Handle subscription plan selection if elements exist
    const selectPlanButtons = document.querySelectorAll('.select-plan-btn');
    if (selectPlanButtons.length > 0) {
        selectPlanButtons.forEach(button => {
            button.addEventListener('click', function() {
                const planType = this.getAttribute('data-plan');
                const subscriptionForm = document.getElementById('subscription-form');
                
                // Show the subscription form
                subscriptionForm.style.display = 'block';
                
                // Scroll to the form
                subscriptionForm.scrollIntoView({ behavior: 'smooth' });
                
                // Set plan details
                let planName, planPrice;
                switch(planType) {
                    case 'basic':
                        planName = 'Basic Plan';
                        planPrice = '9.99';
                        break;
                    case 'pro':
                        planName = 'Pro Plan';
                        planPrice = '19.99';
                        break;
                    case 'premium':
                        planName = 'Premium Plan';
                        planPrice = '29.99';
                        break;
                    default:
                        planName = 'Basic Plan';
                        planPrice = '9.99';
                }
                
                // Update form with plan details
                document.getElementById('plan-name').textContent = planName;
                document.getElementById('plan-price').textContent = `$${planPrice}/month`;
                document.getElementById('selected-plan').value = planType;
            });
        });
        
        // Handle subscription form submission
        const subscriptionForm = document.getElementById('subscription-form');
        if (subscriptionForm) {
            subscriptionForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Get form values
                const email = document.getElementById('sub-email').value;
                const cardNumber = document.getElementById('sub-card-number').value;
                const expiry = document.getElementById('sub-expiry').value;
                const cvc = document.getElementById('sub-cvc').value;
                const planType = document.getElementById('selected-plan').value;
                
                // Basic validation
                if (!validateEmail(email)) {
                    showError('Please enter a valid email address');
                    return;
                }
                
                if (!validateCardNumber(cardNumber)) {
                    showError('Please enter a valid card number');
                    return;
                }
                
                if (!validateExpiry(expiry)) {
                    showError('Please enter a valid expiry date (MM/YY)');
                    return;
                }
                
                if (!validateCVC(cvc)) {
                    showError('Please enter a valid CVC code');
                    return;
                }
                
                // Simulate payment processing
                showProcessing();
                
                // In a real application, you would send this data to a server
                setTimeout(() => {
                    // Store subscription info in localStorage
                    localStorage.setItem('subscription', planType);
                    localStorage.setItem('subscriptionActive', 'true');
                    
                    // Show success message
                    showSubscriptionSuccess(planType);
                }, 2000);
            });
        }
    }
    
    // Get feature cards and add hover effects if they exist
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Utility functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validateCardNumber(cardNumber) {
        // Basic validation - in a real app, use a proper card validation library
        return /^\d{16}$/.test(cardNumber.replace(/\s/g, ''));
    }
    
    function validateExpiry(expiry) {
        return /^\d{2}\/\d{2}$/.test(expiry);
    }
    
    function validateCVC(cvc) {
        return /^\d{3,4}$/.test(cvc);
    }
    
    function showError(message) {
        alert(message); // In a real app, use a better UI for errors
    }
    
    function showProcessing() {
        const submitButton = document.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = 'Processing...';
            submitButton.disabled = true;
        }
    }
    
    function showSuccess(amount, totalCredits) {
        const container = document.querySelector('.container');
        if (container) {
            container.innerHTML = `
                <h1>Payment Successful!</h1>
                <div class="success-message">
                    <p>Thank you for your purchase of $${amount}.</p>
                    <p>Your account has been credited with ${amount * 10} credits.</p>
                    <p>Your total balance is now ${totalCredits} credits.</p>
                    <div class="success-actions">
                        <a href="ide.html" class="btn-primary">Go to IDE</a>
                        <a href="index.html" class="btn-secondary">Return to Home</a>
                    </div>
                </div>
            `;
        }
    }
    
    function showSubscriptionSuccess(planType) {
        const container = document.querySelector('.container');
        if (container) {
            let planName, planPrice;
            switch(planType) {
                case 'basic':
                    planName = 'Basic Plan';
                    planPrice = '9.99';
                    break;
                case 'pro':
                    planName = 'Pro Plan';
                    planPrice = '19.99';
                    break;
                case 'premium':
                    planName = 'Premium Plan';
                    planPrice = '29.99';
                    break;
                default:
                    planName = 'Basic Plan';
                    planPrice = '9.99';
            }
            
            container.innerHTML = `
                <h1>Subscription Activated!</h1>
                <div class="success-message">
                    <p>Thank you for subscribing to our ${planName}.</p>
                    <p>Your subscription is now active at $${planPrice}/month.</p>
                    <p>You now have access to premium AI models and features.</p>
                    <div class="success-actions">
                        <a href="ide.html" class="btn-primary">Go to IDE</a>
                        <a href="index.html" class="btn-secondary">Return to Home</a>
                    </div>
                </div>
            `;
        }
    }
});
