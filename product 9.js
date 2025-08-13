 // Sample product data
const products = [
            {
                id: 1,
                name: "HP PROBOOK 450 G10",
                description: " Intel core i5, 8GB RAM, 512GB SSD, 8th Generation.",
                image: "Lap 1.jpg",
                price: "Ksh 55,000"
            },
            {
                id: 1,
                name: "DELL LATITUDE 7480",
                description: "Intel core i7, 16GB RAM, 256GB SSD, 7th Gen, 14 Inch Display, Touchscreen.",
                image: "Lap 2.jpg",
                price: "Ksh 28,000"
            },
            {
                id: 1,
                name: "HP 240 G7",
                description: "Intel i5, 10th Gen 8GB RAM,256GB SSD, Radeon Graphics, 14 Inch Display.",
                image: "Lap 3.jpg",
                price: "Ksh 33,000"
            },
            {
                id: 1,
                name: "DELL XPS 13 9365",
                description: "Intel i5-7y54, 7th Gen, 8GB RAM, 256GB SSD, 13 Inch Display, Touch Screen",
                image: "Lap 4.jpg",
                price: "Ksh 45,000"
            },
            {
                id: 1,
                name: "HP PROBOOK 450 G8",
                description: "Intel core i5-1155u, 8GB RAM, 512GB SSD, Intel Iris Graphics, 15.6 Inch Display, 1080 Resolution, Backlit.",
                image: "Lap 5.jpg",
                price: "Ksh 48,000"
            },
            {
                id: 1,
                name: "DELL 3189/90 PENTIUM",
                description: "Intel core i5, 4GB RAM, 128GB SSD, touchscreen.",
                image: "Lap 6.jpg",
                price: "Ksh 48,000"
            },
            {
                id: 1,
                name: "BAJEAL M500",
                description: "Wireless, LED lights, Comfortable, Gaming vibes.",
                image: "Mouse 1.jpg",
                price: "Ksh 3,800"
            },
            {
                id: 1,
                name: "LOGITECH M170",
                description: "Wireless connectivity.",
                image: "Mouse 2.jpg",
                price: "Ksh2,200"
            },
            {
                id: 1,
                name: "HP MOUSE M160",
                description: "Gaming mouse, Wired, comfy.",
                image: "Mouse 3.jpg",
                price: "Ksh 2,300"
            },
            {
                id: 1,
                name: "HP MOUSE X500",
                description: "Wired.",
                image: "Mouse 5.jpg",
                price: "Ksh 2,600"
            },
            {
                id: 1,
                name: "LOGITECH M185",
                description: "Wireless, Plug and Play, Super Comfort.",
                image: "Mouse 6.jpg",
                price: "Ksh 2,300"
            },
            {
                id: 1,
                name: "SAMSUNG",
                description: "Wireless, Super silk, Offer comfort.",
                image: "Mouse 7.jpg",
                price: "Ksh2,200"
            },
            {
                id: 1,
                name: "JBL Headset",
                description: "Wireless, Pure Bass, Noise cancellation.",
                image: "HeadP 1.jpg",
                price: "Ksh 5,000"
            },
            {
                id: 1,
                name: "JBL S700",
                description: "Wireless, Noise cancellation, Comfortable.",
                image: "HeadP 2.jpg",
                price: "Ksh 5,500"
            },
            {
                id: 1,
                name: "NEW BEE",
                description: "Wireless, Durable battery, Type-C charger, Clean Audio.",
                image: "HeadSet 1.png",
                price: "Ksh 3,600"
            },
            {
                id: 1,
                name: "WD BLUE",
                description: "500GB Storage",
                image: "HDD 1.jpeg",
                price: "Ksh 2,500"
            },
            {
                id: 1,
                name: "WD BLUE",
                description: "1TB Storage, 2.7 Inch",
                image: "HDD 2.jpg",
                price: "Ksh 4,500"
            },
            {
                id: 1,
                name: "WD BLUE",
                description: "1TB Storage, 2.7 Inch",
                image: "NVMe 1.jpg",
                price: "Ksh 4,500"
            },
            {
                id: 1,
                name: "INTERAL SSD",
                description: "Fast, SATA Compatible.",
                image: "SSD 1.jpg",
                price: "Ksh 1,600 - 5,000"
            }
            
        ];

        // Generate WhatsApp order URL

        function generateWhatsAppURL(name, description, price) {
            const message = `Hi! I'm interested in ordering:\n\n*Product:* ${name}\n*Description:* ${description}\n*Price:* ${price}\n\n When can I get it?`;
            const phone = "254725574224"; // Replace with your actual WhatsApp number
            return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        }

        // Add event listeners to order buttons
        function addOrderButtonListeners() {
            const orderButtons = document.querySelectorAll('.order-btn');
            orderButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const name = this.getAttribute('data-product-name');
                    const price = this.getAttribute('data-product-price');
                    const description = this.getAttribute('data-product-description');

                    const whatsappURL = generateWhatsAppURL(name, description, price);
                    window.location.href = whatsappURL; // ✅ Opens WhatsApp in the same tab
                });
            });
        }


    let modalTimer = null;

    // Show modal
    function showDescriptionModal(productName, description) {
        if (modalTimer) clearTimeout(modalTimer);

        const existingModal = document.getElementById('descriptionModal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.id = 'descriptionModal';
        modal.className = 'description-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="modal-content bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-96 overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-white pr-4">${productName}</h3>
                        <button class="close-modal text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl font-bold leading-none">×</button>
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">${description}</p>
                    <div class="mt-4 text-center">
                        <div class="inline-flex items-center text-xs text-gray-400 dark:text-gray-500">
                            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            Auto-closes in <span class="countdown">6</span> seconds
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close-modal').addEventListener('click', closeDescriptionModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeDescriptionModal();
        });

        let countdown = 6;
        const countdownElement = modal.querySelector('.countdown');

        modalTimer = setInterval(() => {
            countdown--;
            if (countdownElement) countdownElement.textContent = countdown;
            if (countdown <= 0) closeDescriptionModal();
        }, 4000);
    }

    function closeDescriptionModal() {
        if (modalTimer) {
            clearTimeout(modalTimer);
            modalTimer = null;
        }
        const modal = document.getElementById('descriptionModal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    }

    // Attach listeners to "Read More" buttons
    function addReadMoreListeners() {
        const buttons = document.querySelectorAll('.read-more-btn');
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const name = this.getAttribute('data-product-name');
                const desc = this.getAttribute('data-product-description');
                showDescriptionModal(name, desc);
            });
        });
    }


    // Create product card HTML
        function createProductCard(product) {
            return `
                <div class="product-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col">
                    <div class="aspect-[4/3] overflow-hidden relative bg-gray-100 dark:bg-gray-700">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="animate-pulse bg-gray-200 dark:bg-gray-600 rounded-full w-8 h-8"></div>
                        </div>
                        <img src="images/products/${product.image}" 
                             alt="${product.name}" 
                             class="w-full h-full object-cover hover:scale-105 transition-transform duration-300 relative z-10"
                             loading="lazy"
                             decoding="async"
                             onload="this.style.opacity=1; this.previousElementSibling.style.display='none';"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                             style="opacity: 0; transition: opacity 0.3s;">
                        <div class="absolute inset-0 bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm hidden">
                            <svg class="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="p-6 flex flex-col flex-1">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">${product.name}</h3>
                        <div class="flex-1 mb-4">
                            <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                ${product.description.length > 80 ? product.description.substring(0, 80) + '...' : product.description}
                            </p>
                            ${product.description.length > 80 ? 
                                `<button class="text-primary text-sm font-medium mt-1 hover:underline read-more-btn" 
                                         data-product-name="${product.name}" 
                                         data-product-description="${product.description}">Read more</button>` : ''}
                        </div>
                        <div class="mt-auto">
                            <div class="text-center mb-4">
                                <span class="text-2xl font-bold text-primary block">${product.price}</span>
                            </div>
                            <button data-product-name="${product.name}" 
                                    data-product-price="${product.price}"
                                    class="order-btn w-full bg-primary hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 text-base">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                </svg>
                                Order
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

            function initProductGallery() {
                const container = document.getElementById('productContainer');
                const prevBtn = document.getElementById('prevBtn');
                const nextBtn = document.getElementById('nextBtn');

                // Render products
                container.innerHTML = products.map(createProductCard).join('');
                addOrderButtonListeners();
                addReadMoreListeners();
                updateButtonStates();
                addMouseDragScrolling();

                prevBtn.addEventListener('click', () => {
                    closeDescriptionModal();
                    scrollProducts('prev');
                });

                nextBtn.addEventListener('click', () => {
                    closeDescriptionModal();
                    scrollProducts('next');
                });

                container.addEventListener('scroll', updateButtonStates);
                window.addEventListener('resize', updateButtonStates);

                function getCardWidth() {
                    const firstCard = container.querySelector('.product-card');
                    return firstCard ? firstCard.offsetWidth + 16 : 0;
                }

                function getCardsPerView() {
                    const width = window.innerWidth;
                    if (width >= 1024) return 4;
                    if (width >= 768) return 3;
                    if (width >= 480) return 2;
                    return 1;
                }

                function scrollProducts(direction) {
                    const cardWidth = getCardWidth();
                    const cardsPerView = getCardsPerView();
                    const scrollAmount = cardWidth * cardsPerView;
                    const currentScroll = container.scrollLeft;
                    const newScroll = direction === 'next' ? currentScroll + scrollAmount : currentScroll - scrollAmount;
                    container.scrollTo({ left: newScroll, behavior: 'smooth' });
                }

                function updateButtonStates() {
                    const maxScroll = container.scrollWidth - container.clientWidth;
                    prevBtn.disabled = container.scrollLeft <= 0;
                    nextBtn.disabled = container.scrollLeft >= maxScroll - 1;
                }
            }

            function addMouseDragScrolling() {
                const container = document.getElementById('productContainer');
                let isDragging = false;
                let startX = 0;
                let scrollLeft = 0;
                let startScrollLeft = 0;
                let dragDistance = 0;

                container.addEventListener('mousedown', (e) => {
                    if (e.button !== 0) return;
                    isDragging = true;
                    startX = e.pageX - container.offsetLeft;
                    scrollLeft = container.scrollLeft;
                    startScrollLeft = container.scrollLeft;
                    dragDistance = 0;
                    container.style.scrollBehavior = 'auto';
                    closeDescriptionModal();
                    e.preventDefault();
                });

                container.addEventListener('mouseleave', endDrag);
                container.addEventListener('mouseup', endDrag);

                function endDrag() {
                    if (isDragging) {
                        isDragging = false;
                        snapToCard();
                    }
                }

                container.addEventListener('mousemove', (e) => {
                    if (!isDragging) return;
                    const x = e.pageX - container.offsetLeft;
                    const walk = (x - startX) * 1.5;
                    dragDistance = walk;
                    container.scrollLeft = scrollLeft - walk;
                });

                container.addEventListener('click', (e) => {
                    const isImportantClick = e.target.closest('.read-more-btn, .order-btn, button, a');
                    if (Math.abs(dragDistance) > 5 && !isImportantClick) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }, true);

                container.addEventListener('contextmenu', (e) => {
                    if (isDragging) e.preventDefault();
                });

                function getCardWidth() {
                    const firstCard = container.querySelector('.product-card');
                    return firstCard ? firstCard.offsetWidth + 16 : 0;
                }

                function getCardsPerView() {
                    const width = window.innerWidth;
                    if (width >= 1024) return 4;
                    if (width >= 768) return 3;
                    if (width >= 480) return 2;
                    return 1;
                }

                function snapToCard() {
                    const cardWidth = getCardWidth();
                    const cardsPerView = getCardsPerView();
                    const currentScroll = container.scrollLeft;
                    const cardIndex = Math.round(currentScroll / cardWidth);
                    let targetScroll = cardIndex * cardWidth;

                    if (Math.abs(dragDistance) > cardWidth / 2) {
                        const pageSize = cardWidth * cardsPerView;
                        const currentPage = Math.floor(startScrollLeft / pageSize);

                        if (dragDistance > 0) {
                            targetScroll = Math.max(0, currentPage * pageSize - pageSize);
                        } else {
                            const maxScroll = container.scrollWidth - container.clientWidth;
                            targetScroll = Math.min(maxScroll, (currentPage + 1) * pageSize);
                        }
                    }

                    const maxScroll = container.scrollWidth - container.clientWidth;
                    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
                    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
                    setTimeout(() => {
                        container.style.scrollBehavior = 'auto';
                    }, 300);
                }
            }

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', initProductGallery);


