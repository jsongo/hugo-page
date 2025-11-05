// 图片点击放大功能
(function() {
    'use strict';
    
    // 创建 lightbox 容器
    function createLightbox() {
        const overlay = document.createElement('div');
        overlay.className = 'image-lightbox-overlay';
        overlay.innerHTML = `
            <span class="image-lightbox-close">&times;</span>
            <img class="image-lightbox-content" src="" alt="">
        `;
        document.body.appendChild(overlay);
        return overlay;
    }
    
    // 初始化图片点击事件
    function initImageLightbox() {
        const articleContent = document.querySelector('.article-content');
        if (!articleContent) return;
        
        const lightbox = createLightbox();
        const lightboxImg = lightbox.querySelector('.image-lightbox-content');
        const closeBtn = lightbox.querySelector('.image-lightbox-close');
        
        // 获取所有文章内容中的图片
        const images = articleContent.querySelectorAll('img');
        
        images.forEach(img => {
            // 跳过小图标和头像
            if (img.width < 100 || img.closest('.article-meta')) {
                return;
            }
            
            img.addEventListener('click', function(e) {
                e.preventDefault();
                lightboxImg.src = this.src;
                lightboxImg.alt = this.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // 关闭 lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target === lightboxImg) {
                closeLightbox();
            }
        });
        
        // ESC 键关闭
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
    
    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initImageLightbox);
    } else {
        initImageLightbox();
    }
})();
