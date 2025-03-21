// 密码验证功能
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否已经通过验证
    if (!sessionStorage.getItem('authenticated')) {
        // 创建密码验证层
        const authOverlay = document.createElement('div');
        authOverlay.className = 'auth-overlay';
        authOverlay.innerHTML = `
            <div class="auth-container">
                <h2>公司内部照片系统</h2>
                <p class="auth-description">请输入访问密码以查看部门集体照</p>
                <div class="password-input-container">
                    <input type="password" id="password-input" placeholder="请输入密码">
                    <button id="submit-password">确认</button>
                </div>
                <p id="auth-error" class="auth-error"></p>
                <div class="portrait-rights-notice">
                    <h3>肖像权声明</h3>
                    <p>本网站展示的所有照片仅供公司内部使用，不得外传。所有照片中的员工肖像权受法律保护。</p>
                    <p>根据《中华人民共和国民法典》第一千零一十九条规定，任何组织或者个人不得以丑化、污损，或者利用信息技术手段伪造等方式侵害他人的肖像权。</p>
                    <p>公司已获得所有员工的肖像使用授权，仅用于内部团队展示与文化建设。如有疑问，请联系人力资源部门。</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(authOverlay);
        document.body.style.overflow = 'hidden'; // 防止滚动
        
        // 密码验证逻辑
        const passwordInput = document.getElementById('password-input');
        const submitButton = document.getElementById('submit-password');
        const errorMessage = document.getElementById('auth-error');
        
        // 设置密码 - 在实际应用中应该使用更安全的方式存储和验证密码
        const correctPassword = 'company2024'; // 示例密码
        
        // 提交按钮点击事件
        submitButton.addEventListener('click', validatePassword);
        
        // 回车键提交
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                validatePassword();
            }
        });
        
        function validatePassword() {
            const password = passwordInput.value.trim();
            
            if (password === correctPassword) {
                // 密码正确
                sessionStorage.setItem('authenticated', 'true');
                authOverlay.style.opacity = '0';
                setTimeout(() => {
                    authOverlay.remove();
                    document.body.style.overflow = 'auto'; // 恢复滚动
                }, 500);
            } else {
                // 密码错误
                errorMessage.textContent = '密码错误，请重试';
                passwordInput.value = '';
                passwordInput.focus();
                
                // 错误提示动画
                errorMessage.classList.add('shake');
                setTimeout(() => {
                    errorMessage.classList.remove('shake');
                }, 500);
            }
        }
    }
});