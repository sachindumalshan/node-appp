// Main JavaScript file for SEO Optimizer
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('seoForm');
    const optimizeBtn = document.getElementById('optimizeBtn');
    const loadingSection = document.getElementById('loadingSection');
    const textarea = document.getElementById('roughDescription');
    
    // Character counter for textarea
    if (textarea) {
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.cssText = 'text-align: right; margin-top: 5px; font-size: 12px; color: #666;';
        textarea.parentNode.appendChild(charCounter);
        
        function updateCharCounter() {
            const length = textarea.value.length;
            charCounter.textContent = `${length} characters`;
            
            if (length > 500) {
                charCounter.style.color = '#e53e3e';
            } else if (length > 300) {
                charCounter.style.color = '#dd6b20';
            } else {
                charCounter.style.color = '#666';
            }
        }
        
        textarea.addEventListener('input', updateCharCounter);
        updateCharCounter();
    }
    
    // Form submission handler
    if (form) {
        form.addEventListener('submit', function(e) {
            const description = textarea.value.trim();
            
            if (description.length < 10) {
                e.preventDefault();
                showNotification('Please enter at least 10 characters for better optimization.', 'error');
                return;
            }
            
            // Show loading state
            showLoading();
        });
    }
    
    // Auto-resize textarea
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
    
    // Add fade-in animation to results
    const resultsSection = document.querySelector('.results-section');
    if (resultsSection) {
        resultsSection.classList.add('fade-in');
    }
    
    // Add pulse animation to optimize button on hover
    if (optimizeBtn) {
        optimizeBtn.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        optimizeBtn.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
    }
});

// Show loading state
function showLoading() {
    const loadingSection = document.getElementById('loadingSection');
    const optimizeBtn = document.getElementById('optimizeBtn');
    
    if (loadingSection) {
        loadingSection.style.display = 'block';
        loadingSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    if (optimizeBtn) {
        optimizeBtn.disabled = true;
        optimizeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }
}

// Copy to clipboard function
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            showCopyNotification();
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyNotification();
        } else {
            showNotification('Failed to copy to clipboard', 'error');
        }
    } catch (err) {
        console.error('Fallback: Could not copy text: ', err);
        showNotification('Copy not supported in this browser', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Show copy notification
function showCopyNotification() {
    const notification = document.getElementById('copyNotification');
    if (notification) {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
}

// Generic notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    switch (type) {
        case 'error':
            notification.style.background = '#e53e3e';
            break;
        case 'success':
            notification.style.background = '#48bb78';
            break;
        default:
            notification.style.background = '#4299e1';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Download results function
function downloadResults() {
    const results = document.querySelector('.results-section');
    if (!results) return;
    
    let content = 'SEO OPTIMIZATION RESULTS\n';
    content += '========================\n\n';
    
    // Extract each result section
    const resultCards = results.querySelectorAll('.result-card');
    resultCards.forEach(card => {
        const title = card.querySelector('h3').textContent.trim();
        const text = card.querySelector('p').textContent.trim();
        content += `${title}:\n${text}\n\n`;
    });
    
    // Add suggestions
    const suggestions = results.querySelectorAll('.suggestion-item span');
    if (suggestions.length > 0) {
        content += 'SEO SUGGESTIONS:\n';
        suggestions.forEach((suggestion, index) => {
            content += `${index + 1}. ${suggestion.textContent.trim()}\n`;
        });
    }
    
    // Create and download file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-results-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Results downloaded successfully!', 'success');
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .char-counter {
        transition: color 0.3s ease;
    }
`;
document.head.appendChild(style);

// Smooth scroll for all internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.getElementById('seoForm');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape to clear textarea
    if (e.key === 'Escape') {
        const textarea = document.getElementById('roughDescription');
        if (textarea && document.activeElement === textarea) {
            textarea.value = '';
            textarea.dispatchEvent(new Event('input'));
        }
    }
});

// Progressive Web App features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // You can register a service worker here for offline functionality
        console.log('SEO Optimizer loaded successfully');
    });
}