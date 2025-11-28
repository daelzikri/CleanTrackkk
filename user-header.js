/**
 * CleanTrack User Header Component (NEXT-GEN EDITION)
 * File: user-header.js
 * Fitur:
 * - Desktop: Floating Glass Bar + Logout Button.
 * - Mobile: Full Screen Dark Glass Overlay + Tombol Close 'X'.
 */

function renderHeader(activePage) {
    // 1. Cek Sesi
    const currentUser = getActiveSession();
    if (!currentUser) {
        window.location.href = 'Login.html';
        return;
    }

    // --- CONFIGURATION STYLES ---

    // Desktop: Active (Glowing Dot Indicator)
    const dActive = "relative text-sm font-bold text-slate-900 transition-colors after:content-[''] after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full after:shadow-[0_0_10px_rgba(42,98,200,0.8)]";
    // Desktop: Inactive
    const dInactive = "relative text-sm font-medium text-slate-500 hover:text-primary transition-colors";

    // Mobile: Menu Item Style (Large & Bold)
    const mItemClass = "group flex items-center gap-6 p-4 rounded-2xl transition-all duration-300 hover:bg-white/10";
    const mActiveText = "text-white font-black text-2xl tracking-tight";
    const mInactiveText = "text-slate-400 group-hover:text-white font-bold text-2xl tracking-tight";
    const mIconActive = "text-primary bg-white/10 p-3 rounded-full shadow-[0_0_15px_rgba(42,98,200,0.5)]";
    const mIconInactive = "text-slate-500 group-hover:text-primary p-3 rounded-full border border-white/5 group-hover:border-white/20";

    // Link Data
    const links = [
        { id: 'reports', href: 'MyWasteReports.html', icon: 'description', text: 'Laporan Saya' },
        { id: 'map', href: 'MapView.html', icon: 'map', text: 'Peta Jelajah' },
        { id: 'new', href: 'ReportNew.html', icon: 'add_a_photo', text: 'Buat Laporan' },
        { id: 'profile', href: 'UserProfile.html', icon: 'account_circle', text: 'Profil & Akun' },
        { id: 'notifications', href: 'Notifications.html', icon: 'notifications', text: 'Notifikasi' }
    ];

    // Build Desktop Nav
    const desktopNav = links.filter(l => l.id !== 'notifications').map(l => 
        `<a href="${l.href}" class="${activePage === l.id ? dActive : dInactive}">${l.text}</a>`
    ).join('');

    // Build Mobile Nav (Full Screen List)
    const mobileNav = links.map(l => {
        const isActive = activePage === l.id;
        return `
        <a href="${l.href}" class="${mItemClass}">
            <div class="${isActive ? mIconActive : mIconInactive}">
                <span class="material-symbols-outlined text-3xl">${l.icon}</span>
            </div>
            <span class="${isActive ? mActiveText : mInactiveText}">${l.text}</span>
            ${isActive ? '<span class="ml-auto w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(42,98,200,1)] animate-pulse"></span>' : ''}
        </a>`;
    }).join('');

    // --- HTML STRUCTURE ---
    const headerHTML = `
    <!-- FLOATING NAVBAR (Desktop & Mobile Trigger) -->
    <div class="fixed top-4 left-4 right-4 z-40 transition-all duration-300">
        <header class="bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg shadow-slate-200/50">
            <div class="px-4 sm:px-6">
                <div class="flex items-center justify-between h-16 md:h-20">
                    
                    <!-- LEFT: LOGO -->
                    <a href="MyWasteReports.html" class="flex items-center gap-3 group">
                        <div class="relative w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-md border border-slate-100 group-hover:scale-105 transition-transform">
                            <span class="material-symbols-outlined text-2xl text-primary drop-shadow-[0_2px_4px_rgba(42,98,200,0.3)]">recycling</span>
                        </div>
                        <div class="flex flex-col">
                            <span class="text-xl font-black tracking-tighter text-slate-900 leading-none group-hover:text-primary transition-colors">CleanTrack</span>
                            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">Smart City App</span>
                        </div>
                    </a>

                    <!-- CENTER: DESKTOP NAV -->
                    <nav class="hidden lg:flex items-center gap-8 bg-slate-50/50 px-8 py-2.5 rounded-full border border-slate-100/50">
                        ${desktopNav}
                    </nav>

                    <!-- RIGHT: PROFILE (Desktop) & TOGGLE (Mobile) -->
                    <div class="flex items-center gap-3">
                        
                        <!-- Desktop Actions -->
                        <div class="hidden lg:flex items-center gap-4">
                            <a href="Notifications.html" class="relative w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-slate-50 border border-slate-100 shadow-sm transition-all hover:text-primary group">
                                <span class="material-symbols-outlined text-xl text-slate-500 group-hover:text-primary">notifications</span>
                                <span id="header-notif-dot" class="hidden absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
                            </a>
                            
                            <div class="h-8 w-px bg-slate-200"></div>

                            <!-- Profile Pill -->
                            <div class="flex items-center gap-3 cursor-pointer group" onclick="window.location.href='UserProfile.html'">
                                <div class="text-right">
                                    <p class="text-xs font-bold text-slate-900 leading-none" id="header-name">${currentUser.name}</p>
                                    <p class="text-[10px] text-primary font-mono mt-0.5 font-bold" id="header-points">${currentUser.points} Pts</p>
                                </div>
                                <div class="relative">
                                    <img id="header-avatar" src="${currentUser.avatar}" class="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md group-hover:ring-2 ring-primary/20 transition-all">
                                    <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                                </div>
                            </div>

                            <!-- NEW: DESKTOP LOGOUT BUTTON -->
                            <button onclick="logoutUser()" class="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-100 shadow-sm ml-2" title="Keluar">
                                <span class="material-symbols-outlined text-xl">logout</span>
                            </button>
                        </div>

                        <!-- Mobile Toggle Button -->
                        <button onclick="toggleMobileMenu()" class="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg shadow-slate-900/20 active:scale-90 transition-all z-50">
                            <span class="material-symbols-outlined text-2xl" id="menu-icon">menu</span>
                        </button>

                    </div>
                </div>
            </div>
        </header>
    </div>

    <!-- PADDING FOR FIXED HEADER -->
    <div class="h-24 md:h-32"></div>

    <!-- FULL SCREEN MOBILE OVERLAY (Dark Glass) -->
    <div id="mobile-menu-overlay" class="fixed inset-0 z-[45] bg-slate-900/95 backdrop-blur-xl opacity-0 pointer-events-none transition-all duration-500 flex flex-col justify-center">
        
        <!-- Background Blobs Decoration -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] pointer-events-none"></div>

        <!-- NEW: CLOSE BUTTON 'X' (MOBILE) -->
        <button onclick="toggleMobileMenu()" class="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-[60] backdrop-blur-md border border-white/10">
            <span class="material-symbols-outlined text-2xl">close</span>
        </button>

        <div class="container mx-auto px-6 relative z-10 h-full flex flex-col">
            
            <!-- User Info (Top of Overlay) -->
            <div class="mt-24 mb-8 flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                <img id="overlay-avatar" src="${currentUser.avatar}" class="w-14 h-14 rounded-full border-2 border-white/20">
                <div>
                    <p class="text-white font-bold text-lg" id="overlay-name">${currentUser.name}</p>
                    <p class="text-primary font-mono font-bold text-sm" id="overlay-points">${currentUser.points} Pts</p>
                </div>
            </div>

            <!-- Navigation Links -->
            <nav class="flex-1 space-y-2 overflow-y-auto custom-scroll">
                ${mobileNav}
            </nav>

            <!-- Bottom Action -->
            <div class="py-8 mt-4 border-t border-white/10">
                <button onclick="logoutUser()" class="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-red-500/10 text-red-400 font-bold border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
                    <span class="material-symbols-outlined">logout</span>
                    Keluar Aplikasi
                </button>
                <p class="text-center text-white/20 text-xs mt-6 font-mono">CleanTrack v3.0 &bull; By @naufal</p>
            </div>

        </div>
    </div>
    `;

    const target = document.getElementById('app-header');
    if (target) {
        target.innerHTML = headerHTML;
        checkSmartNotification();
        
        // Listeners for auto-update
        window.addEventListener('walletUpdated', updateHeaderVisuals);
        window.addEventListener('profileUpdated', updateHeaderVisuals);
    }
}

// --- LOGIC ---

window.toggleMobileMenu = function() {
    const overlay = document.getElementById('mobile-menu-overlay');
    const icon = document.getElementById('menu-icon');
    const body = document.body;

    if (overlay.classList.contains('opacity-0')) {
        // OPEN
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        // Ikon menu utama bisa berubah atau tetap, karena kita sudah punya tombol X terpisah
        // icon.innerText = 'close'; 
        body.style.overflow = 'hidden'; // Lock Scroll
    } else {
        // CLOSE
        overlay.classList.add('opacity-0', 'pointer-events-none');
        icon.innerText = 'menu';
        body.style.overflow = ''; // Unlock Scroll
    }
}

function updateHeaderVisuals() {
    const updatedSession = getActiveSession();
    if (!updatedSession) return;

    const ids = {
        name: ['header-name', 'overlay-name'],
        points: ['header-points', 'overlay-points'],
        avatar: ['header-avatar', 'overlay-avatar']
    };

    ids.name.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.textContent = updatedSession.name;
    });
    
    ids.points.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.textContent = updatedSession.points + ' Pts';
    });

    ids.avatar.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.src = updatedSession.avatar;
    });
}

function checkSmartNotification() {
    const currentUser = getActiveSession();
    if (!currentUser) return;
    const reports = JSON.parse(sessionStorage.getItem('shared_reports')) || [];
    const hasUnread = reports.some(r => r.userId === currentUser.id && r.status === 'Resolved' && !r.rating);
    const dot = document.getElementById('header-notif-dot');
    if (dot) hasUnread ? dot.classList.remove('hidden') : dot.classList.add('hidden');
}