// 顶部导航交互逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const topNavMenu = document.getElementById('top-nav-menu');

    if (mobileMenuToggle && topNavMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            topNavMenu.classList.toggle('active');
        });

        // 点击菜单项后关闭移动菜单
        const menuItems = topNavMenu.querySelectorAll('.top-nav-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mobileMenuToggle.classList.remove('active');
                    topNavMenu.classList.remove('active');
                }
            });
        });

        // 点击菜单外部关闭菜单
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768) {
                const isClickInsideMenu = topNavMenu.contains(event.target);
                const isClickOnToggle = mobileMenuToggle.contains(event.target);

                if (!isClickInsideMenu && !isClickOnToggle && topNavMenu.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    topNavMenu.classList.remove('active');
                }
            }
        });
    }

    // 顶部导航的暗黑模式切换
    const topDarkModeToggle = document.getElementById('top-dark-mode-toggle');
    if (topDarkModeToggle) {
        topDarkModeToggle.addEventListener('click', function() {
            // 触发原有的暗黑模式切换逻辑
            const sidebarDarkModeToggle = document.getElementById('dark-mode-toggle');
            if (sidebarDarkModeToggle) {
                sidebarDarkModeToggle.click();
            }
        });
    }

    // 监听窗口大小变化,关闭移动菜单
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
            if (topNavMenu) topNavMenu.classList.remove('active');
        }
    });
});
