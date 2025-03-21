// 照片缩放功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有照片元素
    const photos = document.querySelectorAll('.photo');
    
    // 为每张照片添加点击事件
    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            // 切换zoomed类来实现缩放效果
            this.classList.toggle('zoomed');
            
            // 更改鼠标样式
            if (this.classList.contains('zoomed')) {
                this.style.cursor = 'zoom-out';
            } else {
                this.style.cursor = 'zoom-in';
            }
        });
        
        // 添加鼠标移动事件，实现放大后的平移效果
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
    });
});