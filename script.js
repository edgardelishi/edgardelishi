document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate elements
    const animateElements = document.querySelectorAll('.glass-card, h2, .hero-content > *');

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.transitionDelay = `${index % 3 * 100}ms`; // Stagger effect
        observer.observe(el);
    });

    // Skills Radar Chart
    const ctx = document.getElementById('skillsChart').getContext('2d');

    // Gradient for the chart area
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(124, 58, 237, 0.5)'); // Purple
    gradient.addColorStop(1, 'rgba(37, 99, 235, 0.1)'); // Blue

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Financial Analysis', 'Data Visualization', 'Budget & Forecasts', 'SAP', 'Business Strategy', 'Communication'],
            datasets: [{
                label: 'Proficiency Level',
                data: [95, 90, 85, 85, 80, 90],
                backgroundColor: gradient,
                borderColor: '#7c3aed',
                pointBackgroundColor: '#fff',
                pointBorderColor: '#7c3aed',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#7c3aed',
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: '#e5e7eb',
                        font: {
                            size: 14,
                            family: "'Outfit', sans-serif"
                        }
                    },
                    ticks: {
                        display: false,
                        backdropColor: 'transparent'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(5, 5, 5, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#e5e7eb',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            return context.raw + '% Proficiency';
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
});
