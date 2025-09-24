// 移动端导航菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // 点击导航链接时关闭菜单
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CTA按钮点击事件
document.querySelector('.cta-button').addEventListener('click', function() {
    document.querySelector('.blog-posts').scrollIntoView({
        behavior: 'smooth'
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// 文章卡片动画
const observeCards = () => {
    const cards = document.querySelectorAll('.post-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
};

// 标签点击效果
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function() {
        // 移除其他标签的激活状态
        document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
        // 添加当前标签的激活状态
        this.classList.add('active');
        
        // 这里可以添加筛选文章的逻辑
        console.log('选中标签:', this.textContent);
    });
});

// 页面加载完成后初始化动画
window.addEventListener('load', function() {
    observeCards();
    
    // 英雄区域文字动画
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 200);
});

// 添加CSS类用于标签激活状态
const style = document.createElement('style');
style.textContent = `
    .tag.active {
        background: #3498db !important;
        color: white !important;
        transform: translateY(-2px) !important;
    }
`;
document.head.appendChild(style);