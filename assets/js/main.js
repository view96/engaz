/**
 * إنجاز للخراطة العامة | Engaz For General Machining & Concrete Plants
 * Interactive JavaScript Logic (Clean, Modular & Performance Optimized)
 * - Dynamic Year in Footer
 * - Throttled Header & ScrollSpy Navigation
 * - Accessible Mobile Navigation Drawer
 * - Product Category Filtering
 * - Interactive WhatsApp Quotation Modal
 * - Emergency Maintenance Dispatch via WhatsApp
 * - Toast Notification System
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // --------------------------------------------------------------------------
    // 1. Current Year in Footer
    // --------------------------------------------------------------------------
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --------------------------------------------------------------------------
    // 2. Header Scroll Effect & ScrollSpy (Throttled via requestAnimationFrame)
    // --------------------------------------------------------------------------
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let isScrolling = false;

    function handleScroll() {
        const scrollY = window.pageYOffset;

        // Header Scrolled Style
        if (header) {
            if (scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // ScrollSpy (Only active if sections exist on the current page)
        if (sections.length > 0) {
            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 120;
                const sectionId = current.getAttribute('id');

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${sectionId}` || href === `index.html#${sectionId}`) {
                            link.classList.add('active');
                        } else if (href.startsWith('#')) {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }

        isScrolling = false;
    }

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(handleScroll);
            isScrolling = true;
        }
    }, { passive: true });

    // Initial check on page load
    handleScroll();

    // --------------------------------------------------------------------------
    // 3. Mobile Navigation Drawer
    // --------------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const drawerClose = document.getElementById('drawer-close');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openDrawer() {
        if (!mobileDrawer) return;
        mobileDrawer.classList.add('open');
        if (drawerBackdrop) drawerBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        if (!mobileDrawer) return;
        mobileDrawer.classList.remove('open');
        if (drawerBackdrop) drawerBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // --------------------------------------------------------------------------
    // 4. Product Category Filtering (Catalog Page)
    // --------------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterBtns.length > 0 && productCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    const category = card.getAttribute('data-category') || '';
                    const categories = category.split(/\s+/);
                    if (filterValue === 'all' || category === filterValue || categories.includes(filterValue)) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(15px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 250);
                    }
                });
            });
        });
    }

    // --------------------------------------------------------------------------
    // 5. Interactive WhatsApp Quotation Modal
    // --------------------------------------------------------------------------
    const quoteModal = document.getElementById('quote-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalProductName = document.getElementById('modal-product-name');
    const modalHiddenProduct = document.getElementById('modal-hidden-product');
    const quoteModalForm = document.getElementById('quote-modal-form');
    const quoteBtns = document.querySelectorAll('.request-quote-btn');

    function openQuoteModal(productTitle, productCode) {
        if (!quoteModal) return;
        if (modalProductName) modalProductName.textContent = `${productTitle} [كود: ${productCode}]`;
        if (modalHiddenProduct) modalHiddenProduct.value = productTitle;
        quoteModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeQuoteModal() {
        if (!quoteModal) return;
        quoteModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    quoteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const product = btn.getAttribute('data-product') || 'منتج غير محدد';
            const code = btn.getAttribute('data-code') || 'ENG-00';
            openQuoteModal(product, code);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeQuoteModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeQuoteModal);

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && quoteModal && quoteModal.classList.contains('active')) {
            closeQuoteModal();
        }
    });

    // Submit Quote to WhatsApp
    if (quoteModalForm) {
        quoteModalForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const product = modalHiddenProduct ? modalHiddenProduct.value : 'منتج';
            const name = document.getElementById('quote-name')?.value.trim() || 'غير محدد';
            const phone = document.getElementById('quote-phone')?.value.trim() || 'غير محدد';
            const address = document.getElementById('quote-address')?.value.trim() || 'غير محدد';
            const quantity = document.getElementById('quote-quantity')?.value.trim() || 'طقم كامل';
            const model = document.getElementById('quote-model')?.value.trim() || 'غير محدد';
            const notes = document.getElementById('quote-notes')?.value.trim() || 'لا يوجد';

            const whatsappMessage = 
`*طلب عرض سعر قطع غيار - إنجاز للخراطة العامة*
---------------------------------------
👤 *الاسم / الشركة:* ${name}
📞 *رقم الهاتف:* ${phone}
📍 *العنوان / موقع المحطة:* ${address}
🔹 *المنتج المطلوب:* ${product}
📦 *الكمية التقديرية:* ${quantity}
⚙️ *طراز الخلاطة / المحطة:* ${model}
📝 *ملاحظات / أبعاد:* ${notes}
---------------------------------------
مرحباً، أرجو موافاتي بعرض السعر والمدة التقديرية للتسليم والتوريد.`;

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/201126041955?text=${encodedMessage}`;

            showToast('جاري فتح واتساب لإرسال طلب عرض السعر...');
            closeQuoteModal();

            setTimeout(() => {
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            }, 400);
        });
    }

    // --------------------------------------------------------------------------
    // 6. Emergency Maintenance Dispatch Form (طلب صيانة فورية)
    // --------------------------------------------------------------------------
    const emergencyForm = document.getElementById('emergency-form');

    if (emergencyForm) {
        emergencyForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const clientName = document.getElementById('client-name')?.value.trim() || 'غير محدد';
            const clientPhone = document.getElementById('client-phone')?.value.trim() || 'غير محدد';
            const plantLocation = document.getElementById('plant-location')?.value.trim() || 'غير محدد';
            const urgencyLevel = document.getElementById('urgency-level')?.value || 'عادي';
            const faultType = document.getElementById('fault-type')?.value || 'عطل ميكانيكي عام';
            const faultDetails = document.getElementById('fault-details')?.value.trim() || 'يرجى المعاينة والتواصل';

            const emergencyMessage = 
`🚨 *طلب صيانة فورية وعاجلة - إنجاز للخراطة العامة* 🚨
---------------------------------------------
👤 *العميل / المحطة:* ${clientName}
📞 *هاتف الموقع:* ${clientPhone}
📍 *موقع المحطة:* ${plantLocation}
⚡ *درجة الطوارئ:* ${urgencyLevel}
⚙️ *نوع العطل:* ${faultType}
📋 *تفاصيل المشكلة والملاحظات:* ${faultDetails}
---------------------------------------------
برجاء سرعة التنسيق وإرسال فريق الصيانة أو تجهيز قطع الغيار البديلة.`;

            const encodedMsg = encodeURIComponent(emergencyMessage);
            const emergencyUrl = `https://wa.me/201126041955?text=${encodedMsg}`;

            showToast('تم تجهيز طلب الصيانة بنجاح، جاري التحويل لواتساب...');

            setTimeout(() => {
                window.open(emergencyUrl, '_blank', 'noopener,noreferrer');
            }, 400);
        });
    }

    // --------------------------------------------------------------------------
    // 7. Custom Toast Notification System
    // --------------------------------------------------------------------------
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastText = document.getElementById('toast-text');

        if (!toast || !toastText) return;

        toastText.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }
});
