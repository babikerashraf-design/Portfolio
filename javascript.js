document.addEventListener('DOMContentLoaded', () => {

  let num1, num2, correctAnswer;
  let currentLang = 'de';

  function generateCaptcha() {
    num1 = Math.floor(Math.random() * 9) + 1;
    num2 = Math.floor(Math.random() * 9) + 1;
    correctAnswer = num1 + num2;

    const captchaQ = document.getElementById('captchaQuestion');
    if (captchaQ) {
      if (currentLang === 'ar') {
        captchaQ.textContent = `كم يساوي ${num1} + ${num2}؟`;
      } else {
        captchaQ.textContent = `Was ergibt ${num1} + ${num2}?`;
      }
    }
  }

  // Contact Form Ajax Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const captchaInput = document.getElementById('captchaInput');
      const captchaError = document.getElementById('captchaError');
      const submitBtn = document.getElementById('submitBtn');

      const userAnswer = captchaInput ? parseInt(captchaInput.value, 10) : null;

      if (userAnswer !== correctAnswer) {
        if (captchaError) captchaError.style.display = 'block';
        generateCaptcha();
        if (captchaInput) captchaInput.value = '';
        return;
      }

      if (captchaError) captchaError.style.display = 'none';

      const originalBtnText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.textContent = currentLang === 'ar' ? 'جاري الإرسال...' : 'Wird gesendet...';
        submitBtn.disabled = true;
      }

      const formData = new FormData(contactForm);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(async (response) => {
        let result = await response.json();
        if (response.status === 200) {
          alert(currentLang === 'ar' ? 'تم إرسال الرسالة بنجاح!' : 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.');
          contactForm.reset();
          generateCaptcha();
        } else {
          alert(result.message || (currentLang === 'ar' ? 'حدث خطأ أثناء الإرسال.' : 'Fehler beim Senden.'));
        }
      })
      .catch(() => {
        alert(currentLang === 'ar' ? 'خطأ في الاتصال بالشبكة. يرجى المحاولة لاحقاً.' : 'Netzwerkfehler. Bitte versuchen Sie es später erneut.');
      })
      .then(() => {
        if (submitBtn) {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }
      });
    });
  }

  generateCaptcha();

  // Mobile Hamburger Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav');
  const navMenuLinks = document.querySelectorAll('nav ul li a');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('is-active');
      navMenu.classList.toggle('nav-active');
    });

    navMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        navMenu.classList.remove('nav-active');
      });
    });
  }

  // Translations Object
  const translations = {
    de: {
      brandSub: 'Solidaritätsgemeinschaft',
      phoneText: '24/7 Hotline im Trauerfall: ',
      navAbout: 'Über Uns',
      navServices: 'Leistungen',
      navMembership: 'Mitgliedschaft',
      navContact: 'Kontakt',
      
      heroTitle: 'Gemeinschaft & Würde im Trauerfall',
      heroSub: 'Ihre islamische Bestattungsvorsorge nach Sunnah und Sharia in Deutschland.',
      heroBtn1: 'Soforthilfe im Trauerfall',
      heroBtn2: 'Mitglied werden',
      
      welcomeTitle: 'Willkommen bei Takaful Deutschland e.V.',
      welcomeP1: 'Als eingetragener Bestattungsverein stehen wir muslimischen Familien in ganz Deutschland bei. Unsere Gemeinschaft basiert auf dem Prinzip der gegenseitigen Solidarität (Takaful), um im Todesfall eine schnelle, würdevolle und islamkonforme Beisetzung ohne finanzielle Überlastung der Angehörigen zu gewährleisten.',
      welcomeP2: 'Wir übernehmen die vollständige Organisation, Überführung und administrative Abwicklung mit allen Behörden, damit Sie sich ganz auf das Gedenken und die Trauerarbeit konzentrieren können.',
      
      servicesSub: 'Gegenseitige Hilfe',
      servicesTitle: 'Unsere Leistungen',
      card1Title: 'Bestattungsorganisation',
      card1Desc: 'Überführung und Begleitung nach religiösen Vorschriften.',
      card2Title: 'Behörden & Formalitäten',
      card2Desc: 'Erledigung aller Urkunden und behördlichen Formalitäten.',
      card3Title: 'Beratung & Betreuung',
      card3Desc: 'Persönliche Ansprechpartner und Unterstützung im Trauerfall.',

      memberSub: 'Solidaritätsgemeinschaft',
      memberTitle: 'Transparente Mitgliedschaften',
      plan1Title: 'Familientarif',
      plan1Price: 'Solidaritätsbeitrag',
      plan1Desc: 'Absicherung für die gesamte Familie inklusive Kinder unter 18 Jahren.',
      plan1Item1: 'Vollständige Übernahme aller Beerdigungskosten',
      plan1Item2: 'Inklusive Ehepartner und minderjährige Kinder',
      plan1Item3: 'Weltweite Abwicklung & Transportkoordination',
      plan1Item4: '24/7 Notfall-Hotline & Vor-Ort-Betreuung',
      
      plan2Title: 'Einzelpersonentarif',
      plan2Price: 'Individualbeitrag',
      plan2Desc: 'Umfassende Absicherung und Care-Service für Einzelpersonen.',
      plan2Item1: 'Vollständige Übernahme aller Beerdigungskosten',
      plan2Item2: 'Direkte Abwicklung aller Dokumente und Behördengänge',
      plan2Item3: 'Islamkonforme Waschung und Beisetzung',
      plan2Item4: 'Keine versteckten Nebenkosten im Notfall',
      joinBtn: 'Jetzt Mitglied Werden',
      
      contactSub: 'Kontakt & Notfall',
      contactTitle: 'Schreiben Sie Uns',
      inputName: 'Ihr Name',
      inputEmail: 'E-Mail Adresse',
      inputPhone: 'Telefonnummer',
      inputText: 'Wie können wir Ihnen helfen?',
      attachmentLabel: 'Anhang hinzufügen (z.B. Dokumente, Formulare)',
      fileHint: 'Erlaubte Formate: PDF, DOC, DOCX, JPG, PNG (max. 10 MB)',
      captchaLabel: 'Sicherheitsfrage: Bitte lösen Sie die Aufgabe',
      captchaPlace: 'Ihre Antwort (Zahl)',
      captchaErr: 'Falsche Antwort. Bitte versuchen Sie es erneut.',
      submitBtn: 'Nachricht Absenden',
      
      footerDesc: 'Soziale Solidaritätsgemeinschaft für Bestattungen in Deutschland e.V. (Takaful)',
      footerAddressTitle: 'Vereinssitz & Anschrift:',
      footerAddressBody: 'Wiesbaden, Deutschland',
      footerCopy: '© Takaful Deutschland e.V. Alle Rechte vorbehalten.'
    },
    
    ar: {
      brandSub: 'جمعية التضامن الاجتماعي',
      phoneText: 'الخط الساخن للطوارئ 24/7: ',
      navAbout: 'من نحن',
      navServices: 'خدماتنا',
      navMembership: 'العضوية',
      navContact: 'اتصل بنا',
      
      heroTitle: 'التكافل والكرامة عند الكرب',
      heroSub: 'خدمات التكافل والدفن الإسلامي وفق السنة والشريعة الإسلامية في ألمانيا.',
      heroBtn1: 'المساعدة الفورية',
      heroBtn2: 'الانضمام للعضوية',
      
      welcomeTitle: 'مرحبًا بكم في تكافل ألمانيا',
      welcomeP1: 'بصفتنا جمعية مسجلة متخصصة في خدمات الدفن والتكافل، نقف إلى جانب العائلات المسلمة في جميع أنحاء ألمانيا. تقوم جمعيتنا على مبدأ التكافل الاجتماعي لضمان إتمام إجراءات الجنازة والدفن بشكل سريع ولائق وفق الشريعة الإسلامية دون أعباء مالية مجهدة.',
      welcomeP2: 'نتولى التنظيم الكامل لنقل الجثمان وإنهاء جميع المعاملات الإدارية والرسمية مع الجهات الحكومية لتخفيف العبء عن ذوي المتوفى.',
      
      servicesSub: 'الدعم والتكافل',
      servicesTitle: 'خدماتنا',
      card1Title: 'تنظيم الجنازات والدفن',
      card1Desc: 'نقل الجثمان والإشراف على التجهيز وفق الأحكام الشرعية.',
      card2Title: 'الإجراءات والمعاملات الرسمية',
      card2Desc: 'إنهاء استخراج كافة الأوراق واستكمال الإجراءات الحكومية.',
      card3Title: 'الإرشاد والدعم الاجتماعي',
      card3Desc: 'تقديم المساعدة المباشرة والتواصل الشخصي في حالات الوفاة.',

      memberSub: 'جمعية التكافل',
      memberTitle: 'اشتراكات العضوية',
      plan1Title: 'اشتراك العائلة',
      plan1Price: 'اشتراك تكافلي',
      plan1Desc: 'حماية وتغطية شاملة لجميع أفراد العائلة والأبناء تحت 18 عاماً.',
      plan1Item1: 'تغطية كاملة لجميع مصاريف وتكاليف الجنازة',
      plan1Item2: 'يشمل الزوج والزوجة والأبناء القاصرين',
      plan1Item3: 'تنسيق إجراءات النقل والدفن داخل وخارج ألمانيا',
      plan1Item4: 'خط طوارئ 24/7 ومتابعة مباشرة',
      
      plan2Title: 'الاشتراك الفردي',
      plan2Price: 'اشتراك فردي',
      plan2Desc: 'تغطية كاملة وخدمات متكاملة للأفراد.',
      plan2Item1: 'تغطية كاملة لجميع مصاريف وتكاليف الجنازة',
      plan2Item2: 'إنهاء كافة المعاملات والمستندات الرسمية',
      plan2Item3: 'الغسل والتكفين والدفن وفق الشريعة الإسلامية',
      plan2Item4: 'لا توجد أي رسوم أو تكاليف خفية عند الطوارئ',
      joinBtn: 'تحميل نموذج العضوية',
      
      contactSub: 'التواصل والطوارئ',
      contactTitle: 'تواصل معنا',
      inputName: 'الاسم الكامل',
      inputEmail: 'البريد الإلكتروني',
      inputPhone: 'رقم الهاتف',
      inputText: 'كيف يمكننا مساعدتك؟',
      attachmentLabel: 'إرفاق ملف (مثل المستندات أو الاستمارات)',
      fileHint: 'الصيغ المسموحة: PDF, DOC, DOCX, JPG, PNG (الحد الأقصى 10 ميجابايت)',
      captchaLabel: 'سؤال الأمان: يرجى حل المسألة',
      captchaPlace: 'إجابتك (رقم)',
      captchaErr: 'إجابة خاطئة. يرجى المحاولة مرة أخرى.',
      submitBtn: 'إرسال الرسالة',
      
      footerDesc: 'جمعية التضامن الاجتماعي لخدمات الدفن في ألمانيا (Takaful Deutschland e.V.)',
      footerAddressTitle: 'مقر الجمعية والعنوان:',
      footerAddressBody: 'مدينة فيسبادن (Wiesbaden)، ألمانيا',
      footerCopy: '© تكافل ألمانيا e.V. جميع الحقوق محفوظة.'
    }
  };

  // Language Switching Mechanics
  const langButtons = document.querySelectorAll('.lang-switch button');
  const htmlTag = document.documentElement;

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedLang = btn.textContent.trim().toLowerCase();
      currentLang = selectedLang;

      if (selectedLang === 'ar') {
        htmlTag.setAttribute('dir', 'rtl');
        htmlTag.setAttribute('lang', 'ar');
        applyTranslations('ar');
      } else {
        htmlTag.setAttribute('dir', 'ltr');
        htmlTag.setAttribute('lang', 'de');
        applyTranslations('de');
      }
      generateCaptcha();
    });
  });

  function applyTranslations(lang) {
    const d = translations[lang];
    if (!d) return;

    const brandSub = document.querySelector('.brand-sub');
    if (brandSub) brandSub.textContent = d.brandSub;

    const phoneSpan = document.querySelector('.emergency-info span');
    if (phoneSpan) phoneSpan.textContent = d.phoneText;

    const navLinks = document.querySelectorAll('nav ul li a');
    if (navLinks.length >= 4) {
      navLinks[0].textContent = d.navAbout;
      navLinks[1].textContent = d.navServices;
      navLinks[2].textContent = d.navMembership;
      navLinks[3].textContent = d.navContact;
    }

    const heroTitle = document.querySelector('.hero h2');
    const heroSub = document.querySelector('.hero p');
    const heroBtns = document.querySelectorAll('.hero-buttons .btn');
    if (heroTitle) heroTitle.textContent = d.heroTitle;
    if (heroSub) heroSub.textContent = d.heroSub;
    if (heroBtns[0]) heroBtns[0].textContent = d.heroBtn1;
    if (heroBtns[1]) heroBtns[1].textContent = d.heroBtn2;

    const welcomeTitle = document.querySelector('.welcome-content h2');
    const welcomePs = document.querySelectorAll('.welcome-content p');
    if (welcomeTitle) welcomeTitle.textContent = d.welcomeTitle;
    if (welcomePs[0]) welcomePs[0].textContent = d.welcomeP1;
    if (welcomePs[1]) welcomePs[1].textContent = d.welcomeP2;

    // Fixed Services Section Selectors
    const serviceSpan = document.querySelector('#services .section-title span');
    const serviceH2 = document.querySelector('#services .section-title h2');
    if (serviceSpan) serviceSpan.textContent = d.servicesSub;
    if (serviceH2) serviceH2.textContent = d.servicesTitle;

    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length >= 3) {
      serviceCards[0].querySelector('h3').textContent = d.card1Title;
      serviceCards[0].querySelector('p').textContent = d.card1Desc;
      serviceCards[1].querySelector('h3').textContent = d.card2Title;
      serviceCards[1].querySelector('p').textContent = d.card2Desc;
      serviceCards[2].querySelector('h3').textContent = d.card3Title;
      serviceCards[2].querySelector('p').textContent = d.card3Desc;
    }

    const memberSpan = document.querySelector('#membership .section-title span');
    const memberH2 = document.querySelector('#membership .section-title h2');
    if (memberSpan) memberSpan.textContent = d.memberSub;
    if (memberH2) memberH2.textContent = d.memberTitle;

    const memberCards = document.querySelectorAll('.membership-card');
    if (memberCards.length >= 2) {
      memberCards[0].querySelector('h3').textContent = d.plan1Title;
      memberCards[0].querySelector('.price').textContent = d.plan1Price;
      memberCards[0].querySelector('p').textContent = d.plan1Desc;
      const list1 = memberCards[0].querySelectorAll('ul li');
      if (list1.length >= 4) {
        list1[0].textContent = d.plan1Item1;
        list1[1].textContent = d.plan1Item2;
        list1[2].textContent = d.plan1Item3;
        list1[3].textContent = d.plan1Item4;
      }
      memberCards[0].querySelector('.btn').textContent = d.joinBtn;

      memberCards[1].querySelector('h3').textContent = d.plan2Title;
      memberCards[1].querySelector('.price').textContent = d.plan2Price;
      memberCards[1].querySelector('p').textContent = d.plan2Desc;
      const list2 = memberCards[1].querySelectorAll('ul li');
      if (list2.length >= 4) {
        list2[0].textContent = d.plan2Item1;
        list2[1].textContent = d.plan2Item2;
        list2[2].textContent = d.plan2Item3;
        list2[3].textContent = d.plan2Item4;
      }
      memberCards[1].querySelector('.btn').textContent = d.joinBtn;
    }

    const contactSpan = document.querySelector('#contact .section-title span');
    const contactH2 = document.querySelector('#contact .section-title h2');
    if (contactSpan) contactSpan.textContent = d.contactSub;
    if (contactH2) contactH2.textContent = d.contactTitle;

    const nameIn = document.getElementById('nameInput');
    const emailIn = document.getElementById('emailInput');
    const phoneIn = document.getElementById('phoneInput');
    const messageIn = document.getElementById('messageInput');
    const attachmentLabel = document.getElementById('attachmentLabel');
    const fileHint = document.getElementById('fileHint');

    if (nameIn) nameIn.placeholder = d.inputName;
    if (emailIn) emailIn.placeholder = d.inputEmail;
    if (phoneIn) phoneIn.placeholder = d.inputPhone;
    if (messageIn) messageIn.placeholder = d.inputText;
    if (attachmentLabel) attachmentLabel.textContent = d.attachmentLabel;
    if (fileHint) fileHint.textContent = d.fileHint;

    const captchaLabel = document.getElementById('captchaLabel');
    const captchaInput = document.getElementById('captchaInput');
    const captchaErr = document.getElementById('captchaError');
    const submitBtn = document.getElementById('submitBtn');

    if (captchaLabel) captchaLabel.textContent = d.captchaLabel;
    if (captchaInput) captchaInput.placeholder = d.captchaPlace;
    if (captchaErr) captchaErr.textContent = d.captchaErr;
    if (submitBtn) submitBtn.textContent = d.submitBtn;

    const footerP = document.querySelector('footer .footer-desc');
    const footerAddressTitle = document.querySelector('.footer-address-title');
    const footerAddressBody = document.querySelector('.footer-address-body');
    const footerCopy = document.querySelector('.footer-copy');

    if (footerP) footerP.textContent = d.footerDesc;
    if (footerAddressTitle) footerAddressTitle.textContent = d.footerAddressTitle;
    if (footerAddressBody) footerAddressBody.textContent = d.footerAddressBody;
    if (footerCopy) footerCopy.textContent = d.footerCopy;
  }

  // Smooth Scroll
  const navAnchors = document.querySelectorAll('a[href^="#"]');
  navAnchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header Shadow on Scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

});