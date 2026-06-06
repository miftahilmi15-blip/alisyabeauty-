import { getUserMembership } from "../features/users/membership.js";

export const renderHomePage = async (user) => {
    const page = document.getElementById('home-page');
    if (!page) return;

    const membershipColor = { Bronze: '#cd7f32', Silver: '#aaa', Gold: '#d4af37', Platinum: '#e5e4e2' };

    page.innerHTML = `
        <div class="home-hero">
            <img src="assets/logo/logo.png" alt="Alisya Beauty" class="home-logo" onerror="this.style.display='none'">
            <h1 class="home-title">Alisya Beauty</h1>
            <p class="home-subtitle">Premium Muslimah Salon</p>
        </div>

        <div class="home-profile-card">
            <img src="${user.photoURL || 'assets/logo/default-avatar.png'}" alt="Avatar" class="home-avatar">
            <div>
                <div class="home-welcome">Halo, <strong>${user.displayName?.split(' ')[0] || 'Kamu'}</strong> 👋</div>
                <div id="membership-badge" class="membership-badge">
                    <div class="spinner-sm" style="width:14px;height:14px;border-width:2px;"></div> Memuat membership...
                </div>
            </div>
        </div>

        <div class="home-menu-grid">
            <button class="home-menu-btn" data-page="booking">
                <i class="fa-solid fa-calendar-check"></i>
                <span>Booking</span>
            </button>
            <button class="home-menu-btn" data-page="gallery">
                <i class="fa-solid fa-images"></i>
                <span>Gallery</span>
            </button>
            <button class="home-menu-btn" data-page="shop">
                <i class="fa-solid fa-cart-shopping"></i>
                <span>Produk</span>
            </button>
            <button class="home-menu-btn" data-page="profile">
                <i class="fa-solid fa-circle-user"></i>
                <span>Profil</span>
            </button>
        </div>

        <div class="home-info-section">
            <h3><i class="fa-solid fa-circle-info"></i> Tentang Kami</h3>
            <p>Alisya Beauty adalah salon muslimah premium yang memberikan layanan perawatan terbaik dengan standar kenyamanan dan privasi tinggi.</p>
            <div class="home-contact-links">
                <a href="https://wa.me/" target="_blank" class="contact-btn whatsapp">
                    <i class="fa-brands fa-whatsapp"></i> WhatsApp
                </a>
                <a href="https://instagram.com/" target="_blank" class="contact-btn instagram">
                    <i class="fa-brands fa-instagram"></i> Instagram
                </a>
            </div>
        </div>
    `;

    page.querySelectorAll('.home-menu-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.page;
            document.querySelectorAll('.nav-link').forEach(nl => nl.classList.remove('active'));
            document.querySelector(`.nav-link[data-page="${target}"]`)?.classList.add('active');
            document.querySelectorAll('.spa-page').forEach(p => { p.style.display = 'none'; p.classList.remove('active'); });
            const targetPage = document.getElementById(target + '-page');
            if (targetPage) { targetPage.style.display = 'block'; targetPage.classList.add('active'); }
        });
    });

    try {
        const membership = await getUserMembership(user.uid);
        const badge = document.getElementById('membership-badge');
        if (badge && membership) {
            const level = membership.level || 'Bronze';
            const color = membershipColor[level] || '#cd7f32';
            badge.innerHTML = `<i class="fa-solid fa-crown" style="color:${color}"></i> <span style="color:${color}">${level}</span> · ${membership.points || 0} poin`;
        } else if (badge) {
            badge.innerHTML = '<i class="fa-solid fa-crown" style="color:#cd7f32"></i> <span style="color:#cd7f32">Bronze</span> · 0 poin';
        }
    } catch {
        const badge = document.getElementById('membership-badge');
        if (badge) badge.innerHTML = '<i class="fa-solid fa-crown" style="color:#cd7f32"></i> <span style="color:#cd7f32">Bronze</span> · 0 poin';
    }
};
