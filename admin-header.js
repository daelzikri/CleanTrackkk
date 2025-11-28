/**
 * CleanTrack Admin Header Component (FLOATING GLASS EDITION)
 * File: admin-header.js
 * Fitur:
 * - Floating Navigation Bar (Melayang dengan margin di semua device).
 * - Glassmorphism Effect (Backdrop blur + Border transparan).
 * - Pill-shaped Active Menu (Gradient & Glow).
 * - Pulsing Status Ring pada Profil.
 * - Mobile: Compact Floating Bar + Glass Sidebar Drawer (Konsisten Design).
 * - NEW: Logout Button on Desktop Header.
 */

function renderAdminHeader(activePage) {
    // --- 1. CONFIGURATION STYLES ---

    // Desktop: Active Menu (Pill Shape + Gradient + Glow)
    const dActive = "px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/30 transform transition-all duration-300 scale-105 flex items-center gap-2";
    
    // Desktop: Inactive Menu
    const dInactive = "px-5 py-2.5 rounded-full text-gray-500 dark:text-gray-400 font-medium hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:text-primary transition-all duration-300 flex items-center gap-2";

    // Mobile Sidebar: Active (UPDATED: MATCHING DESKTOP GRADIENT & ROUNDNESS)
    const mActive = "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30 rounded-2xl font-bold transition-all";
    
    // Mobile Sidebar: Inactive (UPDATED ROUNDNESS)
    const mInactive = "flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 hover:text-primary rounded-2xl font-medium transition-colors";

    // Menu Definitions
    const menus = [
        { id: 'dashboard', href: 'AdministratorDashboard.html', icon: 'dashboard', text: 'Dashboard' },
        { id: 'reports', href: 'AdminReports.html', icon: 'description', text: 'Laporan' },
        { id: 'map', href: 'AdminMap.html', icon: 'map', text: 'Peta Ops' },
        { id: 'users', href: 'AdminUsers.html', icon: 'group', text: 'Warga' },
        { id: 'rewards', href: 'AdminRewards.html', icon: 'inventory_2', text: 'Hadiah' }
    ];

    // Generate HTML Links
    const desktopNav = menus.map(m => 
        `<a href="${m.href}" class="${activePage === m.id ? dActive : dInactive}">
            ${activePage === m.id ? `<span class="material-symbols-outlined text-lg">check_circle</span>` : ''}
            ${m.text}
        </a>`
    ).join('');

    const mobileNav = menus.map(m => 
        `<a href="${m.href}" class="${activePage === m.id ? mActive : mInactive}">
            <span class="material-symbols-outlined text-xl">${m.icon}</span>
            ${m.text}
        </a>`
    ).join('');

    // --- 2. MAIN HEADER STRUCTURE ---
    const headerHTML = `
    <!-- FLOATING NAVBAR CONTAINER -->
    <!-- Responsive Margin: Top-3 di Mobile, Top-4 di Desktop -->
    <div class="fixed top-3 left-3 right-3 md:top-4 md:left-4 md:right-4 z-50 transition-all duration-300">
        
        <header class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-xl shadow-gray-200/40 dark:shadow-black/50">
            <div class="px-4 sm:px-6">
                <!-- Responsive Height: h-16 di Mobile, h-20 di Desktop -->
                <div class="flex items-center justify-between h-16 md:h-20">
                    
                    <!-- LEFT: LOGO & MOBILE TOGGLE -->
                    <div class="flex items-center gap-3 md:gap-4">
                        <!-- Mobile Toggle Button (Hanya di Mobile) -->
                        <button onclick="toggleAdminSidebar()" class="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors active:scale-95">
                            <span class="material-symbols-outlined text-2xl">menu</span>
                        </button>

                        <!-- Brand Identity -->
                        <a href="AdministratorDashboard.html" class="flex items-center gap-2 md:gap-3 group">
                            <div class="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-gradient-to-br from-primary to-secondary rounded-xl text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                                <span class="material-symbols-outlined text-lg md:text-2xl">admin_panel_settings</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-lg md:text-xl font-black tracking-tight text-gray-900 dark:text-white leading-none group-hover:text-primary transition-colors">CleanTrack</span>
                                <span class="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] hidden sm:block">Command Center</span>
                            </div>
                        </a>
                    </div>

                    <!-- CENTER: DESKTOP PILL NAVIGATION (Hidden on Mobile) -->
                    <nav class="hidden lg:flex items-center gap-1 bg-gray-100/50 dark:bg-gray-800/50 p-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                        ${desktopNav}
                    </nav>

                    <!-- RIGHT: PROFILE & TOOLS -->
                    <div class="flex items-center gap-2 md:gap-3">
                        
                        <!-- Notification Bell (Glassy) -->
                        <div class="relative">
                            <button onclick="toggleAdminNotif()" class="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-primary hover:bg-blue-50 transition-all border border-gray-100 dark:border-gray-700">
                                <span class="material-symbols-outlined text-lg md:text-xl">notifications</span>
                                <span id="notif-indicator" class="hidden absolute top-2 right-2 w-2 h-2 bg-red-500 border border-white rounded-full animate-ping"></span>
                                <span id="notif-indicator-static" class="hidden absolute top-2 right-2 w-2 h-2 bg-red-500 border border-white rounded-full"></span>
                            </button>
                            
                            <!-- Dropdown -->
                            <div id="admin-notif-dropdown" class="hidden absolute right-0 mt-4 w-72 md:w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden origin-top-right transform transition-all z-[60]">
                                <div class="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                                    <h3 class="font-bold text-sm text-gray-800 dark:text-white">Notifikasi</h3>
                                    <span class="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">Live</span>
                                </div>
                                <div id="notif-list" class="max-h-64 overflow-y-auto custom-scroll"></div>
                            </div>
                        </div>

                        <!-- Divider (Desktop Only) -->
                        <div class="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

                        <!-- Profile (Pulsing Ring) -->
                        <div class="flex items-center gap-3 pl-1 cursor-pointer group relative">
                            <div class="text-right hidden xl:block">
                                <p class="text-xs font-bold text-gray-900 dark:text-white leading-none mb-1 group-hover:text-primary transition-colors">Super Admin</p>
                                <p class="text-[10px] text-gray-400 font-mono">ID: ADM-001</p>
                            </div>
                            
                            <div class="relative">
                                <!-- Pulsing Ring Animation -->
                                <span class="absolute inset-0 rounded-full border-2 border-green-500 opacity-75 animate-ping"></span>
                                <span class="absolute inset-0 rounded-full border-2 border-green-500"></span>
                                
                                <img src="https://ui-avatars.com/api/?name=Admin+System&background=1a1a1a&color=fff&bold=true" 
                                     class="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border-2 border-white dark:border-gray-900 shadow-sm relative z-10">
                                
                                <!-- Status Dot -->
                                <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full z-20"></span>
                            </div>
                        </div>

                        <!-- NEW: Logout Button (Desktop Only) -->
                        <button onclick="confirmLogout()" class="hidden md:flex w-9 h-9 md:w-10 md:h-10 rounded-full items-center justify-center bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 hover:text-red-600 transition-all border border-red-100 dark:border-red-800 ml-2" title="Keluar">
                            <span class="material-symbols-outlined text-lg md:text-xl">logout</span>
                        </button>

                    </div>
                </div>
            </div>
        </header>
    </div>

    <!-- PADDING FOR FIXED HEADER -->
    <!-- Mobile: 80px, Desktop: 96px -->
    <div class="h-24 md:h-32"></div>

    <!-- MOBILE SIDEBAR (FLOATING GLASS DRAWER) -->
    <div id="admin-backdrop" onclick="toggleAdminSidebar()" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[90] hidden transition-opacity opacity-0"></div>

    <!-- Sidebar Container: Updated Colors & Roundness to match Header -->
    <aside id="admin-sidebar" class="fixed top-3 bottom-3 left-3 w-[280px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl z-[100] shadow-2xl rounded-2xl border border-white/20 dark:border-gray-700/50 transform -translate-x-[120%] transition-transform duration-300 ease-out flex flex-col lg:hidden">
        
        <div class="p-5 border-b border-gray-100/50 dark:border-gray-800/50 flex justify-between items-center">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                    <span class="material-symbols-outlined text-lg">admin_panel_settings</span>
                </div>
                <span class="font-black text-lg text-gray-900 dark:text-white tracking-tight">Menu Admin</span>
            </div>
            <button onclick="toggleAdminSidebar()" class="w-8 h-8 rounded-full bg-gray-100/50 dark:bg-gray-800/50 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors">
                <span class="material-symbols-outlined text-lg">close</span>
            </button>
        </div>

        <nav class="flex-1 overflow-y-auto p-4 space-y-2">
            <p class="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Navigasi Utama</p>
            ${mobileNav}
        </nav>

        <div class="p-4 mt-auto border-t border-gray-100/50 dark:border-gray-800/50 bg-gray-50/30 dark:bg-black/20 rounded-b-2xl">
            <div class="flex items-center gap-3 mb-4 px-2">
                <img src="https://ui-avatars.com/api/?name=Admin+System&background=1a1a1a&color=fff&bold=true" class="w-10 h-10 rounded-full border border-gray-200">
                <div>
                    <p class="text-sm font-bold text-gray-900 dark:text-white">Super Admin</p>
                    <p class="text-xs text-green-600 font-medium">● Online</p>
                </div>
            </div>
            <button onclick="confirmLogout()" class="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold border border-red-100 dark:border-red-900 hover:bg-red-100 transition-all">
                <span class="material-symbols-outlined text-lg">logout</span>
                Logout
            </button>
        </div>
    </aside>
    `;

    const target = document.getElementById('app-header');
    if (target) target.innerHTML = headerHTML;

    updateNotifIndicator();
}

// --- UTILITIES ---

window.toggleAdminSidebar = function() {
    const backdrop = document.getElementById('admin-backdrop');
    const sidebar = document.getElementById('admin-sidebar');
    const body = document.body;

    if (sidebar.classList.contains('-translate-x-[120%]')) {
        // OPEN
        backdrop.classList.remove('hidden');
        setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
        
        sidebar.classList.remove('-translate-x-[120%]');
        body.style.overflow = 'hidden';
    } else {
        // CLOSE
        backdrop.classList.add('opacity-0');
        sidebar.classList.add('-translate-x-[120%]');
        
        setTimeout(() => backdrop.classList.add('hidden'), 300);
        body.style.overflow = '';
    }
}

window.confirmLogout = function() {
    if(confirm("Akhiri sesi Admin?")) {
        sessionStorage.removeItem('active_session');
        window.location.href = 'index.html';
    }
}

window.toggleAdminNotif = function() {
    const dropdown = document.getElementById('admin-notif-dropdown');
    const list = document.getElementById('notif-list');
    
    dropdown.classList.toggle('hidden');

    if (!dropdown.classList.contains('hidden')) {
        // Load Real Data
        const reports = JSON.parse(sessionStorage.getItem('shared_reports')) || []; 
        const pendingReports = reports.filter(r => r.status === 'Pending');

        if (pendingReports.length === 0) {
            list.innerHTML = `
                <div class="flex flex-col items-center justify-center p-8 text-gray-400">
                    <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                        <span class="material-symbols-outlined text-2xl text-gray-300">notifications_paused</span>
                    </div>
                    <p class="text-xs font-bold">Semua Aman</p>
                    <p class="text-[10px]">Tidak ada laporan tertunda.</p>
                </div>
            `;
        } else {
            list.innerHTML = pendingReports.map(r => `
                <div class="p-3 border-b border-gray-50 dark:border-gray-800 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors group" onclick="window.location.href='AdminReportDetail.html?id=${r.id}'">
                    <div class="flex items-start gap-3">
                        <div class="shrink-0 mt-1">
                            <span class="relative flex h-2 w-2">
                              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                        </div>
                        <div>
                            <p class="text-xs font-bold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">Laporan Baru #${r.id}</p>
                            <p class="text-[10px] text-gray-500 line-clamp-1 mt-0.5">${r.description}</p>
                            <p class="text-[9px] text-gray-400 font-mono mt-1">${r.date}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
}

function updateNotifIndicator() {
    const reports = JSON.parse(sessionStorage.getItem('shared_reports')) || [];
    const hasPending = reports.some(r => r.status === 'Pending');
    const indicator = document.getElementById('notif-indicator');
    const indicatorStatic = document.getElementById('notif-indicator-static');
    
    if (indicator && indicatorStatic) {
        if (hasPending) {
            indicator.classList.remove('hidden');
            indicatorStatic.classList.remove('hidden');
        } else {
            indicator.classList.add('hidden');
            indicatorStatic.classList.add('hidden');
        }
    }
}

// Close Dropdown Outside Click
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('admin-notif-dropdown');
    const button = document.querySelector('button[onclick="toggleAdminNotif()"]');
    if (dropdown && button && !dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.classList.add('hidden');
    }
});