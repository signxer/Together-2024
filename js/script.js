// 照片缩放功能
document.addEventListener('DOMContentLoaded', function() {
    // 检测是否为移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // 创建全屏查看模式的容器
    if (isMobile) {
        const fullscreenViewer = document.createElement('div');
        fullscreenViewer.className = 'fullscreen-viewer';
        fullscreenViewer.innerHTML = `
            <div class="fullscreen-image-container">
                <img class="fullscreen-image" src="" alt="全屏查看">
                <button class="close-fullscreen">×</button>
            </div>
        `;
        document.body.appendChild(fullscreenViewer);
        
        // 关闭全屏查看模式
        const closeButton = document.querySelector('.close-fullscreen');
        closeButton.addEventListener('click', function() {
            fullscreenViewer.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // 添加双指缩放和拖动功能
        const fullscreenImage = document.querySelector('.fullscreen-image');
        let initialScale = 1;
        let currentScale = 1;
        let initialDistance = 0;
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let translateX = 0;
        let translateY = 0;
        
        // 处理触摸开始事件
        fullscreenImage.addEventListener('touchstart', function(e) {
            if (e.touches.length === 2) {
                // 双指触摸，准备缩放
                initialDistance = getDistance(e.touches[0], e.touches[1]);
                initialScale = currentScale;
                e.preventDefault();
            } else if (e.touches.length === 1) {
                // 单指触摸，准备拖动
                isDragging = true;
                startX = e.touches[0].clientX - translateX;
                startY = e.touches[0].clientY - translateY;
                e.preventDefault();
            }
        });
        
        // 处理触摸移动事件
        fullscreenImage.addEventListener('touchmove', function(e) {
            if (e.touches.length === 2) {
                // 双指缩放
                const currentDistance = getDistance(e.touches[0], e.touches[1]);
                currentScale = initialScale * (currentDistance / initialDistance);
                
                // 限制缩放范围
                currentScale = Math.max(1, Math.min(currentScale, 3));
                
                this.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
                e.preventDefault();
            } else if (e.touches.length === 1 && isDragging) {
                // 单指拖动
                translateX = e.touches[0].clientX - startX;
                translateY = e.touches[0].clientY - startY;
                
                this.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
                e.preventDefault();
            }
        });
        
        // 处理触摸结束事件
        fullscreenImage.addEventListener('touchend', function() {
            if (currentScale <= 1) {
                // 如果缩小到原始大小或更小，重置位置
                currentScale = 1;
                translateX = 0;
                translateY = 0;
                this.style.transform = 'translate(0, 0) scale(1)';
            }
            isDragging = false;
        });
        
        // 计算两个触摸点之间的距离
        function getDistance(touch1, touch2) {
            const dx = touch1.clientX - touch2.clientX;
            const dy = touch1.clientY - touch2.clientY;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }
    
    // 获取所有照片元素
    const photos = document.querySelectorAll('.photo');
    
    // 为每张照片添加点击事件
    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            if (isMobile) {
                // 移动端：打开全屏查看模式
                const fullscreenViewer = document.querySelector('.fullscreen-viewer');
                const fullscreenImage = document.querySelector('.fullscreen-image');
                
                // 设置全屏图片的源
                fullscreenImage.src = this.src;
                
                // 显示全屏查看模式
                fullscreenViewer.classList.add('active');
                document.body.style.overflow = 'hidden'; // 防止背景滚动
                
                // 重置缩放和位置
                fullscreenImage.style.transform = 'translate(0, 0) scale(1)';
            } else {
                // 桌面端：保持原有的缩放功能
                this.classList.toggle('zoomed');
                
                // 更改鼠标样式
                if (this.classList.contains('zoomed')) {
                    this.style.cursor = 'zoom-out';
                } else {
                    this.style.cursor = 'zoom-in';
                }
            }
        });
        
        // 仅为桌面端添加鼠标移动事件
        if (!isMobile) {
            photo.addEventListener('mousemove', function(e) {
                if (this.classList.contains('zoomed')) {
                    // 获取鼠标在图片上的相对位置
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // 计算鼠标位置的百分比
                    const xPercent = x / rect.width * 100;
                    const yPercent = y / rect.height * 100;
                    
                    // 设置图片的变换原点，使放大效果以鼠标位置为中心
                    this.style.transformOrigin = `${xPercent}% ${yPercent}%`;
                }
            });
        }
    });
});