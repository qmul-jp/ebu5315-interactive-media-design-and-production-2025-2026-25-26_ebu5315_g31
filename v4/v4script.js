// ========== 多语言支持 ==========
let currentLang = 'zh';
const translations = {
    en: {
        site_name: "CircleMaster", nav_home: "Home", nav_game: "Games", nav_quiz: "Quiz", login_register: "Login/Register",
        home_breadcrumb: "Home", current_breadcrumb: "Circle Theorems",
        hero_title: "Learn Circle Theorems Easily", hero_subtitle: "GCSE Math Interactive Learning And Animation",
        hero_usp: "✨ Interactive Games | AI Assistant | Adaptive Quiz | Animated Theorems ✨",
        start_btn: "Start Learning", main_theorems_title: "📐 Main Circle Theorems",
        th1_title: "Inscribed Angle Theorem", th1_desc: "Angles subtended by the same arc are equal, half the central angle.",
        th2_title: "Thales' Theorem", th2_desc: "Angle subtended by a diameter is a right angle (90°).",
        th3_title: "Cyclic Quadrilateral", th3_desc: "Opposite angles sum to 180°.",
        watch_title: "🎬 Watch & Learn",
        slide1_caption: "Theorem 1: Inscribed Angle = ½ Central Angle", slide1_detail: "∠APB = ½ ∠AOB",
        slide2_caption: "Theorem 2: Angle in a semicircle = 90°", slide2_detail: "If AB is diameter, ∠ACB = 90°",
        slide3_caption: "Theorem 3: Cyclic Quadrilateral", slide3_detail: "∠A+∠C=180°, ∠B+∠D=180°",
        ad_text: "🌟 Special Offer: Get Premium Geometry Pack! 🌟", ad_btn: "Buy Now",
        ai_greeting: "✨ AI Tutor | Ask me about circle theorems ✨", ai_disclaimer: "💡 AI Demo: Supports context memory, try asking continuously!",
        contact_title: "📬 Contact Us", form_name: "Name", form_email: "Email", form_message: "Message",
        policy_consent: "I agree to the ", policy_link: "Data Privacy Policy", submit_btn: "Submit", reset_btn: "Reset",
        data_policy_text: "Transparent Data Policy: We collect name/email for inquiry responses only, not shared.",
        footer_copyright: "© 2026 CircleMaster | Geometry Learning | Inclusive Design",
        footer_ethical: "♿ Accessibility: Color-blind friendly | Adjustable fonts | Subtitles | Bilingual | Dark Mode",
        modal_title: "Account Access", login_tab: "Login", register_tab: "Register", login_btn: "Sign In", register_btn: "Create Account",
        colorblind_notice: "🎨 This website is friendly to color-blind users. Please click the button at the bottom to switch color schemes.",
        contact_opt_notice: "📧 The information collected in 'Contact Us' is only used for system optimization suggestions. Rest assured, your privacy is protected. Thank you for your feedback!",
        colorblind_btn: "🌈 Colorblind Friendly Mode"
    },
    zh: {
        site_name: "CircleMaster", nav_home: "首页", nav_game: "游戏挑战", nav_quiz: "知识测验", login_register: "登录/注册",
        home_breadcrumb: "首页", current_breadcrumb: "圆定理学习",
        hero_title: "轻松学会圆定理", hero_subtitle: "GCSE数学 交互式学习与动画",
        hero_usp: "✨ 互动游戏 | AI助手 | 自适应测验 | 动画定理 ✨",
        start_btn: "开始学习", main_theorems_title: "📐 主要圆定理",
        th1_title: "圆周角定理", th1_desc: "同弧所对的圆周角相等，且等于圆心角的一半。",
        th2_title: "直径所对圆周角", th2_desc: "直径所对的圆周角是直角（90°）。",
        th3_title: "圆内接四边形", th3_desc: "圆内接四边形对角互补。",
        watch_title: "🎬 动画演示",
        slide1_caption: "定理1：圆周角 = 圆心角的一半", slide1_detail: "∠APB = ½ ∠AOB",
        slide2_caption: "定理2：直径所对的圆周角 = 90°", slide2_detail: "若AB为直径，∠ACB = 90°",
        slide3_caption: "定理3：圆内接四边形对角互补", slide3_detail: "∠A+∠C=180°, ∠B+∠D=180°",
        ad_text: "🌟 限时特惠：购买高级几何学习包，解锁全部挑战！ 🌟", ad_btn: "立即抢购",
        ai_greeting: "✨ AI学习助手 | 随时解答圆定理问题 ✨", ai_disclaimer: "💡 AI演示：支持上下文记忆，试试连续提问！",
        contact_title: "📬 联系我们", form_name: "姓名", form_email: "电子邮箱", form_message: "留言内容",
        policy_consent: "我已阅读并同意", policy_link: "数据隐私政策", submit_btn: "提交信息", reset_btn: "重置",
        data_policy_text: "透明数据政策：我们仅收集姓名邮箱用于回复咨询，绝不向第三方出售。所有数据仅作模拟演示，符合伦理与隐私保护。",
        footer_copyright: "© 2026 CircleMaster | 几何学习 | 包容性设计",
        footer_ethical: "♿ 无障碍：色盲友好配色 | 可调字体 | 字幕 | 双语 | 深色模式",
        modal_title: "账户访问", login_tab: "登录", register_tab: "注册", login_btn: "登录", register_btn: "注册新账户",
        colorblind_notice: "🎨 本网站对于色觉障碍人士友好，请点击页面底部按钮进行颜色转换。",
        contact_opt_notice: "📧 联系我们所收集到的信息仅作为系统优化建议使用，请不要担心信息泄露，感谢您的建议！",
        colorblind_btn: "🌈 色盲友好模式"
    }
};

function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        let key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) el.innerText = translations[currentLang][key];
    });
    const policyTextP = document.querySelector('#dataPolicyBox p:first-child span[data-i18n="data_policy_text"]');
    const colorblindP = document.querySelector('#dataPolicyBox p:nth-child(2) span[data-i18n="colorblind_notice"]');
    const contactOptP = document.querySelector('#dataPolicyBox p:nth-child(3) span[data-i18n="contact_opt_notice"]');
    if(policyTextP) policyTextP.innerText = translations[currentLang].data_policy_text;
    if(colorblindP) colorblindP.innerText = translations[currentLang].colorblind_notice;
    if(contactOptP) contactOptP.innerText = translations[currentLang].contact_opt_notice;
    // 更新幻灯片字幕（当前显示的）
    const activeSlide = document.querySelector('.slide.active');
    if (activeSlide) {
        const caption = activeSlide.querySelector('.slide-caption');
        if (caption) document.getElementById('liveSubtitle').innerText = caption.innerText;
    }
}

document.getElementById('langEn').onclick = () => { currentLang = 'en'; updateLanguage(); };
document.getElementById('langZh').onclick = () => { currentLang = 'zh'; updateLanguage(); };
updateLanguage();

// ========== 字体调节 & 深色模式 ==========
let currentFontSize = 16;
function setBodyFontSize(size) { document.body.style.fontSize = size + 'px'; }
document.getElementById('increaseFont').onclick = () => { currentFontSize = Math.min(22, currentFontSize+2); setBodyFontSize(currentFontSize); };
document.getElementById('decreaseFont').onclick = () => { currentFontSize = Math.max(12, currentFontSize-2); setBodyFontSize(currentFontSize); };
document.getElementById('resetFont').onclick = () => { currentFontSize = 16; setBodyFontSize(16); };
document.getElementById('darkModeToggle').onclick = () => { document.body.classList.toggle('dark-mode'); };

// ========== 色盲友好模式 ==========
const colorblindBtn = document.getElementById('colorblindToggleBtn');
colorblindBtn.onclick = () => {
    document.body.classList.toggle('colorblind-friendly');
    const isActive = document.body.classList.contains('colorblind-friendly');
    colorblindBtn.style.background = isActive ? '#2b6e3c' : '#6b7280';
    setTimeout(() => { colorblindBtn.style.background = ''; }, 300);
};

// ========== 返回顶部按钮 ==========
const backToTopBtn = document.getElementById('backToTopBtn');
backToTopBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ========== 幻灯片轮播（带自动播放） ==========
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('slideDots');
let currentSlide = 0;
let slideInterval;

function updateSlide(index) {
    slides.forEach((s,i)=> s.classList.toggle('active', i===index));
    document.querySelectorAll('.dot').forEach((d,i)=> d.classList.toggle('active', i===index));
    const subText = slides[index].querySelector('.slide-caption')?.innerText || '';
    document.getElementById('liveSubtitle').innerText = subText;
    currentSlide = index;
}

function createDots() {
    slides.forEach((_,i)=>{
        let dot = document.createElement('div');
        dot.classList.add('dot');
        if(i===0) dot.classList.add('active');
        dot.addEventListener('click',()=>{ stopAutoSlide(); updateSlide(i); startAutoSlide(); });
        dotsContainer.appendChild(dot);
    });
}

function startAutoSlide() { slideInterval = setInterval(()=> updateSlide((currentSlide+1)%slides.length), 6000); }
function stopAutoSlide() { if(slideInterval) clearInterval(slideInterval); }

document.getElementById('prevSlide').onclick = () => { stopAutoSlide(); updateSlide((currentSlide-1+slides.length)%slides.length); startAutoSlide(); };
document.getElementById('nextSlide').onclick = () => { stopAutoSlide(); updateSlide((currentSlide+1)%slides.length); startAutoSlide(); };
createDots(); updateSlide(0); startAutoSlide();

// ========== AI 聊天机器人（增强版：打字机效果 + 上下文） ==========
const aiChatDiv = document.getElementById('aiChatMessages');
const aiInput = document.getElementById('aiUserInput');
const aiSend = document.getElementById('aiSendBtn');
let conversationHistory = [];

function addAIMessage(text, isUser = false, useTyping = false) {
    if (!useTyping || isUser) {
        const msgDiv = document.createElement('div');
        msgDiv.className = isUser ? 'user-msg' : 'bot-msg';
        msgDiv.innerText = text;
        aiChatDiv.appendChild(msgDiv);
        aiChatDiv.scrollTop = aiChatDiv.scrollHeight;
        conversationHistory.push({ role: isUser ? 'user' : 'bot', content: text });
        if (conversationHistory.length > 6) conversationHistory.shift();
        return;
    }
    // 打字机效果
    const msgDiv = document.createElement('div');
    msgDiv.className = 'bot-msg';
    aiChatDiv.appendChild(msgDiv);
    let i = 0;
    function type() {
        if (i < text.length) {
            msgDiv.innerText += text.charAt(i);
            i++;
            aiChatDiv.scrollTop = aiChatDiv.scrollHeight;
            setTimeout(type, 20);
        } else {
            conversationHistory.push({ role: 'bot', content: text });
            if (conversationHistory.length > 6) conversationHistory.shift();
        }
    }
    type();
}

function botResponse(query) {
    const q = query.toLowerCase();
    if (q.includes('再解释') || q.includes('详细')) {
        return "当然！圆周角定理：同弧所对的圆周角相等，且等于圆心角的一半。例如，在圆O中，弧AB所对的圆周角∠ACB = ½∠AOB。";
    }
    if (q.includes('圆周角') || q.includes('inscribed')) {
        return "圆周角定理：同弧所对的圆周角相等，且等于圆心角的一半。需要我举个具体例子吗？";
    }
    if (q.includes('直径') || q.includes('thales')) {
        return "直径所对的圆周角是90°，称为泰勒斯定理。例如，若AB是直径，则圆上任意一点C满足∠ACB=90°。";
    }
    if (q.includes('内接四边形') || q.includes('cyclic')) {
        return "圆内接四边形对角互补，外角等于内对角。即∠A+∠C=180°, ∠B+∠D=180°。";
    }
    if (q.includes('练习') || q.includes('quiz')) {
        return "好的！请回答：在圆中，直径所对的角是多少度？(提示：90°) 或者，圆内接四边形的一个外角等于什么？(答案：它的内对角)";
    }
    if (q.includes('谢谢') || q.includes('感谢')) {
        return "不客气！继续加油学习几何吧！";
    }
    if (conversationHistory.length >= 2 && conversationHistory[conversationHistory.length-2]?.content.includes('圆周角')) {
        return "您刚才问过圆周角定理，需要我再详细解释一下吗？或者可以问我其他定理。";
    }
    return "我专注于圆定理～可以问我关于圆周角、圆心角、直径定理或圆内接四边形的问题！例如：“什么是圆周角定理？”或者“出一道练习题”。";
}

aiSend.onclick = () => {
    let msg = aiInput.value.trim();
    if(!msg) return;
    addAIMessage(msg, true, false);
    const reply = botResponse(msg);
    setTimeout(()=>{ addAIMessage(reply, false, true); }, 300);
    aiInput.value = '';
};
aiInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') aiSend.click(); });

// ========== 联系表单（增强验证与成功提示） ==========
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const policyCheck = document.getElementById('policyConsent');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const policyError = document.getElementById('policyError');
const formFeedback = document.getElementById('formFeedback');

function validateEmail(email) {
    return /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email);
}

function clearErrors() {
    nameError.innerText = '';
    emailError.innerText = '';
    messageError.innerText = '';
    policyError.innerText = '';
    formFeedback.innerText = '';
    formFeedback.className = 'form-feedback';
}

contactForm.onsubmit = (e) => {
    e.preventDefault();
    clearErrors();
    let isValid = true;

    if (!nameInput.value.trim()) {
        nameError.innerText = currentLang === 'zh' ? '请填写姓名' : 'Please enter your name';
        isValid = false;
    }
    if (!emailInput.value.trim()) {
        emailError.innerText = currentLang === 'zh' ? '请填写邮箱' : 'Please enter your email';
        isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        emailError.innerText = currentLang === 'zh' ? '请输入有效的邮箱地址' : 'Please enter a valid email address';
        isValid = false;
    }
    if (!messageInput.value.trim()) {
        messageError.innerText = currentLang === 'zh' ? '请填写留言内容' : 'Please enter your message';
        isValid = false;
    }
    if (!policyCheck.checked) {
        policyError.innerText = currentLang === 'zh' ? '请同意数据隐私政策' : 'Please agree to the privacy policy';
        isValid = false;
    }

    if (isValid) {
        formFeedback.innerText = currentLang === 'zh' ? '✅ 提交成功！我们会尽快回复您。感谢您的反馈！' : '✅ Submitted successfully! We will reply soon. Thank you for your feedback!';
        formFeedback.classList.add('success-message');
        contactForm.reset();
        setTimeout(() => { formFeedback.innerText = ''; formFeedback.classList.remove('success-message'); }, 5000);
    }
};

// 重置按钮
const resetBtn = document.querySelector('.btn-reset');
if (resetBtn) {
    resetBtn.onclick = () => {
        contactForm.reset();
        clearErrors();
    };
}

// ========== 辅助功能 ==========
document.getElementById('startLearningBtn').onclick = () => { document.getElementById('aiAssistantCard').scrollIntoView({ behavior: 'smooth' }); };
document.getElementById('homeLink').onclick = (e) => { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); };
document.querySelectorAll('#gameLinkPlaceholder, #quizLinkPlaceholder').forEach(btn=>{
    btn.onclick=(e)=>{ e.preventDefault(); alert(currentLang === 'zh' ? "游戏与测验模块将在后续版本推出。首页AI助手已上线！" : "Game & Quiz modules coming soon. The AI assistant is ready!"); };
});

// ========== 登录/注册模态框 ==========
const modal = document.getElementById('authModal');
const authBtn = document.getElementById('authBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const tabBtns = document.querySelectorAll('.tab-btn');
const loginPane = document.getElementById('loginPane');
const registerPane = document.getElementById('registerPane');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginError = document.getElementById('loginError');
const registerError = document.getElementById('registerError');

function openModal() { modal.classList.add('show'); }
function closeModal() { modal.classList.remove('show'); }
authBtn.onclick = (e) => { e.preventDefault(); openModal(); };
closeModalBtn.onclick = closeModal;
modal.onclick = (e) => { if(e.target === modal) closeModal(); };

tabBtns.forEach(btn => {
    btn.onclick = () => {
        const tab = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if(tab === 'login') {
            loginPane.classList.add('active');
            registerPane.classList.remove('active');
        } else {
            registerPane.classList.add('active');
            loginPane.classList.remove('active');
        }
        loginError.innerText = '';
        registerError.innerText = '';
    };
});

loginForm.onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const pwd = document.getElementById('loginPassword').value.trim();
    if(!email || !pwd) { loginError.innerText = currentLang === 'zh' ? "请填写邮箱和密码" : "Please fill in email and password"; return; }
    if(!email.includes('@')) { loginError.innerText = currentLang === 'zh' ? "请输入有效的邮箱地址" : "Please enter a valid email address"; return; }
    alert(currentLang === 'zh' ? `演示登录成功！\n欢迎回来，${email}` : `Demo login successful!\nWelcome back, ${email}`);
    closeModal();
    loginForm.reset();
};

registerForm.onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pwd = document.getElementById('regPassword').value.trim();
    const confirm = document.getElementById('regConfirm').value.trim();
    if(!name || !email || !pwd || !confirm) { registerError.innerText = currentLang === 'zh' ? "请填写所有字段" : "Please fill all fields"; return; }
    if(!email.includes('@')) { registerError.innerText = currentLang === 'zh' ? "邮箱格式不正确" : "Invalid email format"; return; }
    if(pwd.length < 6) { registerError.innerText = currentLang === 'zh' ? "密码长度至少6位" : "Password must be at least 6 characters"; return; }
    if(pwd !== confirm) { registerError.innerText = currentLang === 'zh' ? "两次输入的密码不一致" : "Passwords do not match"; return; }
    alert(currentLang === 'zh' ? `演示注册成功！\n用户名: ${name}\n邮箱: ${email}\n您已可以登录。` : `Demo registration successful!\nUsername: ${name}\nEmail: ${email}\nYou can now log in.`);
    closeModal();
    registerForm.reset();
    document.querySelector('.tab-btn[data-tab="login"]').click();
};