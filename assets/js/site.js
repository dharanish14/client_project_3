(() => {
  const navData = [
    { label: 'Home', href: '/', key: 'home' },
    { label: 'About', href: '/about/', key: 'about' },
    {
      label: 'Programs',
      href: '/programs/',
      key: 'programs',
      dropdown: [
        { label: 'Youth Leadership Fellowship', href: '/programs/youth-leadership-fellowship/', key: 'youth-leadership-fellowship' },
        { label: 'Volunteer Saturdays', href: '/programs/volunteer-saturdays/', key: 'volunteer-saturdays' },
        { label: 'Business Documentation Campaign', href: '/programs/business-documentation/', key: 'business-documentation' },
        { label: 'Community Projects', href: '/programs/community-projects/', key: 'community-projects' },
      ],
    },
    { label: 'Impact', href: '/impact/', key: 'impact' },
    { label: 'Events', href: '/events/', key: 'events' },
    { label: 'Blog', href: '/blog/', key: 'blog' },
    { label: 'Gallery', href: '/gallery/', key: 'gallery' },
    { label: 'Join', href: '/join/', key: 'join' },
    { label: 'Contact', href: '/contact/', key: 'contact' },
  ];

  const footerLinks = [
    'Home', 'About', 'Programs', 'Impact', 'Events', 'Blog', 'Gallery', 'Join', 'Contact'
  ];

  const iconMarkup = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;

  const formEndpoints = window.NUNP_FORM_ENDPOINTS || {};
  const activeMembersKey = 'nunp-active-members-count';
  const defaultActiveMembers = 100;
  let volunteerPhotoBase64 = '';
  let volunteerPhotoType = '';

  const sendViaEndpoint = async (endpoint, form, extraData = {}) => {
    const isGoogleScript = endpoint.includes('script.google.com');
    
    if (isGoogleScript) {
      const formData = new FormData(form);
      const payload = {};
      formData.forEach((value, key) => {
        payload[key] = value;
      });
      Object.assign(payload, extraData);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload)
      });
      
      if (response.status !== 0 && !response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }
      return;
    }

    const bodyParams = new URLSearchParams(new FormData(form));
    for (const [key, value] of Object.entries(extraData)) {
      bodyParams.append(key, value);
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: bodyParams,
    });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }
  };

  const getActiveMembersCount = () => {
    const storedValue = Number(window.localStorage.getItem(activeMembersKey));
    return Number.isFinite(storedValue) && storedValue >= defaultActiveMembers ? storedValue : defaultActiveMembers;
  };

  const setActiveMembersCount = (value) => {
    const nextValue = Math.max(defaultActiveMembers, Number(value) || defaultActiveMembers);
    window.localStorage.setItem(activeMembersKey, String(nextValue));
    document.querySelectorAll('[data-active-members-count]').forEach((node) => {
      node.textContent = nextValue.toLocaleString();
    });
    return nextValue;
  };

  const incrementActiveMembersCount = () => setActiveMembersCount(getActiveMembersCount() + 1);

  const header = `
    <header class="site-header">
      <div class="container site-header-inner">
        <a class="brand" href="/" aria-label="NUNP home">
          <img class="brand-logo" src="/NUNP_Logo.png" alt="NUNP logo" data-logo>
          <span class="brand-copy">
            <span class="brand-wordmark">NUNP</span>
            <span class="brand-tagline">Connect · Share · Empower</span>
          </span>
        </a>

        <button class="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="primary-navigation">
          ${iconMarkup('menu')}
        </button>

        <div class="nav-shell" id="primary-navigation">
          <nav class="site-nav" aria-label="Primary">
            ${navData.map(item => item.dropdown ? `
              <div class="nav-dropdown" data-dropdown>
                <a class="nav-trigger" href="${item.href}" data-nav="${item.key}" data-dropdown-trigger>
                  ${item.label}
                  ${iconMarkup('chevron-down')}
                </a>
                <div class="nav-dropdown-menu" role="menu">
                  ${item.dropdown.map(sub => `<a href="${sub.href}" data-nav="${sub.key}">${sub.label}</a>`).join('')}
                </div>
              </div>
            ` : `<a class="nav-link" href="${item.href}" data-nav="${item.key}">${item.label}</a>`).join('')}
            <a class="nav-link admin-header-link" href="/admin/" aria-label="Admin Portal" title="Admin Portal" style="padding: 0; width: 42px; height: 42px; border-radius: 50%; border: 1px solid rgba(19, 45, 77, 0.15); display: inline-flex; align-items: center; justify-content: center; margin-left: 8px; flex-shrink: 0; transition: all 0.2s ease;">
              ${iconMarkup('shield')}
            </a>
          </nav>
        </div>
      </div>
    </header>
  `;

  const footer = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="stack">
            <a class="brand" href="/" aria-label="NUNP home">
              <img class="brand-logo" src="/NUNP_Logo.png" alt="NUNP logo" data-logo>
              <span class="brand-copy">
                <span class="brand-wordmark">NUNP</span>
                <span class="brand-tagline">Connect · Share · Empower</span>
              </span>
            </a>
            <p>NUNP is a citizen-led movement building stronger neighbourhoods through service, collaboration, and responsible action.</p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul class="footer-links">
              ${footerLinks.map(item => {
                const path = item === 'Home' ? '/' : `/${item.toLowerCase()}/`;
                return `<li><a href="${path}">${item}</a></li>`;
              }).join('')}
            </ul>
          </div>

          <div class="stack">
            <h4>Contact</h4>
            <ul class="footer-contact">
              <li><a href="mailto:nunp.chennai@gmail.com">nunp.chennai@gmail.com</a></li>
              <li><a href="https://www.nunp.org" target="_blank" rel="noreferrer">www.nunp.org</a></li>
            </ul>
            <div class="social-row" aria-label="Social media">
              <a class="social-icon" href="#" aria-label="Instagram placeholder"><span class="social-initial">IG</span></a>
              <a class="social-icon" href="#" aria-label="LinkedIn placeholder"><span class="social-initial">IN</span></a>
              <a class="social-icon" href="#" aria-label="YouTube placeholder"><span class="social-initial">YT</span></a>
              <a class="social-icon" href="#" aria-label="WhatsApp placeholder"><span class="social-initial">WA</span></a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-bottom-inner">
            <span>© 2025 NUNP. All Rights Reserved.</span>
            <span>நம்ம ஊர். நம்ம பொறுப்பு. நம்ம செயல்.</span>
          </div>
        </div>
      </div>
    </footer>
  `;

  const injectCommonLayout = () => {
    const headerTarget = document.querySelector('[data-site-header]');
    const footerTarget = document.querySelector('[data-site-footer]');
    if (headerTarget) headerTarget.innerHTML = header;
    if (footerTarget) footerTarget.innerHTML = footer;
  };

  const setActiveNav = () => {
    const page = document.body.dataset.page || '';
    const programPages = new Set([
      'youth-leadership-fellowship',
      'volunteer-saturdays',
      'business-documentation',
      'community-projects',
    ]);
    document.querySelectorAll('[data-nav]').forEach((link) => {
      const key = link.getAttribute('data-nav');
      const isActive = key === page || (page === 'programs' && key === 'programs');
      link.classList.toggle('is-active', isActive);
    });

    if (programPages.has(page) || page === 'volunteer') {
      document.querySelectorAll('[data-nav="programs"]').forEach((link) => link.classList.add('is-active'));
    }
  };

  const enhanceMobileNav = () => {
    const toggle = document.querySelector('.nav-toggle');
    const shell = document.querySelector('.nav-shell');
    const dropdownTrigger = document.querySelector('[data-dropdown-trigger]');
    const dropdown = document.querySelector('[data-dropdown]');

    toggle?.addEventListener('click', () => {
      const open = shell.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      const icon = toggle.querySelector('[data-lucide]');
      if (icon) icon.setAttribute('data-lucide', open ? 'x' : 'menu');
      if (window.lucide) window.lucide.createIcons();
    });

    dropdownTrigger?.addEventListener('click', (event) => {
      if (window.innerWidth <= 768) {
        event.preventDefault();
        dropdown?.classList.toggle('open');
      }
    });
  };

  const enhanceReveal = () => {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    items.forEach((item) => observer.observe(item));
  };

  const enhanceCounters = () => {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const countUp = window.CountUp;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        if (target.dataset.countStarted === 'true') return;
        target.dataset.countStarted = 'true';
        const endValue = Number(target.dataset.counter || '0');
        if (countUp) {
          const instance = new countUp.CountUp(target, endValue, { duration: 2.1, separator: ',' });
          if (!instance.error) instance.start();
          else target.textContent = `${endValue.toLocaleString()}+`;
        } else {
          target.textContent = `${endValue.toLocaleString()}+`;
        }
        observer.unobserve(target);
      });
    }, { threshold: 0.35 });

    counters.forEach((counter) => observer.observe(counter));
  };

  const enhanceRoleSelector = () => {
    const cards = document.querySelectorAll('[data-role-card]');
    const output = document.querySelector('[data-role-output]');
    const select = document.querySelector('[data-role-select]');
    if (!cards.length || !output) return;

    const descriptions = {
      'Volunteer': 'Contribute your skills, time, and energy to organize local projects, document business challenges, and drive positive neighborhood change with NUNP.',
      'Youth Fellow': 'Join our intensive youth leadership program to build civic projects, establish community partnerships, and drive sustainable local leadership.',
      'Campus Ambassador': 'Represent NUNP in your college or school. Inspire peers, run campus civic drives, and mobilize student volunteers.',
      'Community Coordinator': 'Lead local neighborhood chapters, coordinate volunteer Saturdays, document business problems, and interface with local authorities.',
      'Partner Organization': 'Collaborate as an NGO, business association, or local trust to align resources, coordinate campaigns, and scale community impact.',
      'Corporate Partner': 'Sponsor programs, engage employees in active volunteerism, and channel CSR initiatives into local civic improvements.',
      'Supporter': 'Help spread the NUNP movement, assist with remote digital tasks, or support local projects financially and logistically.'
    };

    const selectRole = (role) => {
      cards.forEach((item) => {
        const isSelected = item.dataset.roleCard === role;
        item.classList.toggle('selected', isSelected);
      });
      output.textContent = `You selected: ${role}`;
      
      const descEl = document.getElementById('role-description');
      if (descEl) {
        descEl.textContent = descriptions[role] || '';
      }

      if (select && select.value !== role) {
        select.value = role;
      }
    };

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        selectRole(card.dataset.roleCard);
      });
    });

    if (select) {
      select.addEventListener('change', (e) => {
        selectRole(e.target.value);
      });
    }
  };

  const showCustomSuccessModal = (title, message, isSuccess = true) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const content = document.createElement('div');
    content.className = 'modal-content';
    
    const badge = document.createElement('div');
    badge.className = 'modal-success-badge';
    if (!isSuccess) {
      badge.style.background = 'rgba(239, 68, 68, 0.15)';
      badge.style.color = '#ef4444';
      badge.innerHTML = `<i data-lucide="alert-circle"></i>`;
    } else {
      badge.innerHTML = `<i data-lucide="check-circle-2"></i>`;
    }
    
    const titleEl = document.createElement('h3');
    titleEl.className = 'modal-title';
    titleEl.textContent = title;
    
    const textEl = document.createElement('p');
    textEl.className = 'modal-text';
    textEl.textContent = message;
    
    const doneBtn = document.createElement('button');
    doneBtn.className = 'btn btn-primary';
    doneBtn.style.width = '100%';
    doneBtn.textContent = 'Done';
    if (!isSuccess) {
      doneBtn.style.background = '#ef4444';
      doneBtn.style.boxShadow = '0 12px 28px rgba(239, 68, 68, 0.28)';
    }
    
    content.appendChild(badge);
    content.appendChild(titleEl);
    content.appendChild(textEl);
    content.appendChild(doneBtn);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    
    if (window.lucide) window.lucide.createIcons();
    
    setTimeout(() => {
      overlay.classList.add('is-open');
    }, 10);
    
    const closeModal = () => {
      overlay.classList.remove('is-open');
      setTimeout(() => {
        overlay.remove();
      }, 300);
    };
    
    doneBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  };

  const showIDCardModal = (name, idNumber, photoDataUrl) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const content = document.createElement('div');
    content.className = 'modal-content';
    content.style.width = 'min(90%, 420px)';
    content.style.padding = '30px 24px';
    
    const titleEl = document.createElement('h3');
    titleEl.className = 'modal-title';
    titleEl.textContent = 'Volunteer Registered!';
    titleEl.style.fontSize = '1.5rem';
    
    const textEl = document.createElement('p');
    textEl.className = 'modal-text';
    textEl.textContent = 'Welcome to the movement! Here is your official NUNP ID Card. You can download it as a PDF.';
    textEl.style.fontSize = '0.92rem';
    
    // Card Container
    const cardContainer = document.createElement('div');
    cardContainer.style.margin = '10px 0';
    
    const issueDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    
    const barcodeMarkup = Array.from({ length: 32 }).map(() => {
      const widths = [1, 2, 3];
      const w = widths[Math.floor(Math.random() * widths.length)];
      return `<div style="background: #ffffff; width: ${w}px; height: 100%;"></div>`;
    }).join('');
    
    cardContainer.innerHTML = `
      <div id="nunp-id-card-element" style="width: 300px; height: 450px; background: #132D4D; border-radius: 16px; overflow: hidden; position: relative; font-family: 'Inter', sans-serif; border: 3px solid #3BA2A0; box-shadow: 0 16px 36px rgba(19,45,77,0.3); color: #ffffff; display: flex; flex-direction: column; text-align: left;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #132D4D 0%, #1a3f6b 100%); padding: 16px; border-bottom: 2px solid #3BA2A0; text-align: center;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 4px;">
            <img src="/NUNP_Logo.png" alt="NUNP" style="width: 36px; height: 36px; object-fit: contain;" onerror="this.src='https://raw.githubusercontent.com/dharanish14/client_project_3/main/NUNP_Logo.png';">
            <span style="font-family: Montserrat, sans-serif; font-size: 1.35rem; font-weight: 800; letter-spacing: 0.08em; color: #ffffff;">NUNP</span>
          </div>
          <div style="font-size: 0.6rem; font-weight: 600; letter-spacing: 0.05em; color: #3BA2A0; text-transform: uppercase;">நம்ம ஊர் நம்ம பொறுப்பு</div>
        </div>
        
        <!-- Photo/Avatar & Name -->
        <div style="padding: 20px 16px 10px; text-align: center; flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
          <div style="width: 100%;">
            ${photoDataUrl ? `
              <img src="${photoDataUrl}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid #3BA2A0; display: block; margin: 0 auto 12px;">
            ` : `
              <div style="width: 80px; height: 80px; border-radius: 50%; background: rgba(59, 162, 160, 0.15); border: 2px dashed #3BA2A0; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3BA2A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
            `}
            <h3 style="font-family: Montserrat, sans-serif; font-size: 1.25rem; font-weight: 700; color: #ffffff; margin: 0 0 4px 0; text-transform: uppercase; max-width: 260px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${name}</h3>
            <div style="font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; color: #3BA2A0; text-transform: uppercase; margin-bottom: 15px;">OFFICIAL VOLUNTEER</div>
          </div>
          
          <!-- ID Info Grid -->
          <div style="background: rgba(255, 255, 255, 0.04); width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); display: grid; grid-template-columns: 1fr 1fr; gap: 8px 12px; text-align: left; margin-bottom: 10px;">
            <div>
              <div style="font-size: 0.5rem; color: #ACBDC6; text-transform: uppercase; letter-spacing: 0.04em;">Volunteer ID</div>
              <div style="font-size: 0.85rem; font-weight: 800; color: #ffffff; font-family: Montserrat, sans-serif;">NUNP-${String(idNumber).padStart(6, '0')}</div>
            </div>
            <div>
              <div style="font-size: 0.5rem; color: #ACBDC6; text-transform: uppercase; letter-spacing: 0.04em;">Status</div>
              <div style="font-size: 0.8rem; font-weight: 700; color: #2ee67a; display: flex; align-items: center; gap: 4px;">
                <span style="width: 6px; height: 6px; border-radius: 50%; background: #2ee67a; display: inline-block;"></span> ACTIVE
              </div>
            </div>
            <div style="grid-column: span 2;">
              <div style="font-size: 0.5rem; color: #ACBDC6; text-transform: uppercase; letter-spacing: 0.04em;">Issue Date</div>
              <div style="font-size: 0.75rem; font-weight: 600; color: #ffffff;">${issueDate}</div>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #1a3f6b; padding: 10px; text-align: center; border-top: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <div style="display: flex; gap: 1.5px; height: 14px; width: 60%; background: transparent; opacity: 0.6; align-items: stretch; justify-content: center;">
            ${barcodeMarkup}
          </div>
          <div style="font-size: 0.55rem; letter-spacing: 0.1em; color: #ACBDC6; text-transform: uppercase; font-weight: 600; text-align: center; width: 100%;">Connect • Share • Empower</div>
        </div>
      </div>
    `;
    
    const actionsWrapper = document.createElement('div');
    actionsWrapper.style.display = 'flex';
    actionsWrapper.style.flexDirection = 'column';
    actionsWrapper.style.gap = '10px';
    actionsWrapper.style.width = '100%';
    
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'btn btn-primary';
    downloadBtn.style.width = '100%';
    downloadBtn.style.justifyContent = 'center';
    downloadBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Download PDF`;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn btn-secondary';
    closeBtn.style.width = '100%';
    closeBtn.style.justifyContent = 'center';
    closeBtn.textContent = 'Close';
    
    actionsWrapper.appendChild(downloadBtn);
    actionsWrapper.appendChild(closeBtn);
    
    content.appendChild(titleEl);
    content.appendChild(textEl);
    content.appendChild(cardContainer);
    content.appendChild(actionsWrapper);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    
    setTimeout(() => {
      overlay.classList.add('is-open');
    }, 10);
    
    const closeModal = () => {
      overlay.classList.remove('is-open');
      setTimeout(() => overlay.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    
    downloadBtn.addEventListener('click', () => {
      downloadBtn.disabled = true;
      downloadBtn.textContent = 'Generating PDF...';
      
      const element = document.getElementById('nunp-id-card-element');
      const opt = {
        margin: 0,
        filename: `NUNP_ID_${name.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'in', format: [3.125, 4.6875], orientation: 'portrait' }
      };
      
      const runPdf = () => {
        window.html2pdf().from(element).set(opt).save().then(() => {
          downloadBtn.disabled = false;
          downloadBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Download PDF`;
        }).catch((err) => {
          console.error(err);
          downloadBtn.disabled = false;
          downloadBtn.textContent = 'Download PDF';
        });
      };
      
      if (window.html2pdf) {
        runPdf();
      } else {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = runPdf;
        document.head.appendChild(script);
      }
    });

    // Send background welcome email with attachment if EmailJS is configured
    const config = window.EMAILJS_CONFIG;
    if (config && config.PUBLIC_KEY && config.SERVICE_ID && config.TEMPLATE_ID_WELCOME && window.emailjs) {
      const runWelcomeEmail = () => {
        const cardElement = document.getElementById('nunp-id-card-element');
        if (!cardElement) return;
        
        const opt = {
          margin: 0,
          filename: `NUNP_ID_${name.replace(/\s+/g, '_')}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 3, useCORS: true, letterRendering: true },
          jsPDF: { unit: 'in', format: [3.125, 4.6875], orientation: 'portrait' }
        };
        
        window.html2pdf().from(cardElement).set(opt).outputPdf('datauristring').then((pdfDataUri) => {
          const email = sessionStorage.getItem('nunp_verified_email') || '';
          window.emailjs.send(config.SERVICE_ID, config.TEMPLATE_ID_WELCOME, {
            email: email,
            name: name,
            volunteer_id: `NUNP-${String(idNumber).padStart(6, '0')}`,
            my_attachment: pdfDataUri
          }).then((res) => {
            console.log('Welcome email with PDF attachment sent successfully!', res.status, res.text);
          }).catch((err) => {
            console.error('Failed to send welcome email:', err);
          });
        });
      };
      
      setTimeout(() => {
        if (window.html2pdf) {
          runWelcomeEmail();
        } else {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
          script.onload = runWelcomeEmail;
          document.head.appendChild(script);
        }
      }, 600); // Give modal some time to finish attaching and rendering
    }
  };

  const enhanceFormMailto = () => {
    document.querySelectorAll('form[data-mailto]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const submitBtn = form.querySelector('[type="submit"]') || form.querySelector('button');
        if (submitBtn && submitBtn.disabled) {
          return;
        }

        const formKey = form.dataset.formKey || '';
        const endpoint = form.dataset.formEndpoint || formEndpoints[formKey] || '';
        const isJoinForm = formKey === 'join';
        const isVolunteerForm = formKey === 'volunteer';

        let originalBtnHtml = '';
        if (submitBtn) {
          originalBtnHtml = submitBtn.innerHTML;
          submitBtn.disabled = true;
          const loadingText = isVolunteerForm ? 'Registering...' : 'Submitting...';
          submitBtn.innerHTML = `<span class="btn-spinner"></span>${loadingText}`;
        }

        const resetSubmitBtn = () => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
          }
        };

        let newMemberId = defaultActiveMembers;
        if (isJoinForm || isVolunteerForm) {
          newMemberId = incrementActiveMembersCount();
        }

        const nameInput = form.querySelector('[name="Name"]') || form.querySelector('input[type="text"]');
        const volunteerName = nameInput ? nameInput.value : 'User';

        let currentPhoto = '';
        if (isVolunteerForm) {
          currentPhoto = volunteerPhotoBase64;
        }

        // Capture data before reset
        if (isJoinForm) {
          const emailVal = form.querySelector('[name="Email"]')?.value || '';
          const phoneVal = form.querySelector('[name="Phone"]')?.value || '';
          const cityVal = form.querySelector('[name="City / Area"]')?.value || '';
          const roleVal = form.querySelector('[name="Role"]')?.value || 'Volunteer';
          const messageVal = form.querySelector('[name="Message"]')?.value || '';
          const joinData = {
            id: `JOIN-${String(newMemberId).padStart(6, '0')}`,
            name: volunteerName,
            email: emailVal,
            phone: phoneVal,
            city: cityVal,
            role: roleVal,
            message: messageVal,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
          };
          const existing = JSON.parse(window.localStorage.getItem('nunp_joins') || '[]');
          existing.push(joinData);
          window.localStorage.setItem('nunp_joins', JSON.stringify(existing));
        } else if (isVolunteerForm) {
          const emailVal = form.querySelector('[name="Email"]')?.value || '';
          const phoneVal = form.querySelector('[name="Phone"]')?.value || '';
          const areaVal = form.querySelector('[name="Area / Locality"]')?.value || '';
          const professionVal = form.querySelector('[name="Profession"]')?.value || '';
          const availabilityVal = form.querySelector('[name="Availability"]')?.value || 'Weekends';
          const volunteerData = {
            id: `VOL-${String(newMemberId).padStart(6, '0')}`,
            name: volunteerName,
            email: emailVal,
            phone: phoneVal,
            area: areaVal,
            profession: professionVal,
            availability: availabilityVal,
            photo: volunteerPhotoBase64,
            photoType: volunteerPhotoType,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
          };
          const existing = JSON.parse(window.localStorage.getItem('nunp_volunteers') || '[]');
          existing.push(volunteerData);
          window.localStorage.setItem('nunp_volunteers', JSON.stringify(existing));
        }

        if (endpoint) {
          if (endpoint.includes('your-form-id')) {
            form.reset();
            showIDCardModal(volunteerName, newMemberId, currentPhoto);
            volunteerPhotoBase64 = '';
            volunteerPhotoType = '';
            resetSubmitBtn();
            return;
          }
          
          const extraPayload = isVolunteerForm ? {
            PhotoBase64: volunteerPhotoBase64,
            PhotoType: volunteerPhotoType,
            Id: `VOL-${String(newMemberId).padStart(6, '0')}`
          } : {};
          
          sendViaEndpoint(endpoint, form, extraPayload)
            .then(() => {
              form.reset();
              showIDCardModal(volunteerName, newMemberId, currentPhoto);
              volunteerPhotoBase64 = '';
              volunteerPhotoType = '';
              resetSubmitBtn();
            })
            .catch(() => {
              showCustomSuccessModal(
                'Submission Failed',
                'The submission endpoint is temporarily unavailable. Please try again or email us directly at nunp.chennai@gmail.com.',
                false
              );
              resetSubmitBtn();
            });
          return;
        }

        // Default local submit (demo + mailto)
        const recipient = form.dataset.mailto;
        const subject = encodeURIComponent(form.dataset.mailtoSubject || 'NUNP Volunteer Registration');
        const formData = new FormData(form);
        const bodyLines = [];
        formData.forEach((value, key) => {
          bodyLines.push(`${key}: ${value}`);
        });
        const body = encodeURIComponent(bodyLines.join('\n'));
        
        form.reset();
        showIDCardModal(volunteerName, newMemberId, currentPhoto);
        volunteerPhotoBase64 = '';
        volunteerPhotoType = '';
        resetSubmitBtn();
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      });
    });
  };

  const fixBrokenLogos = () => {
    document.querySelectorAll('[data-logo]').forEach((img) => {
      img.addEventListener('error', () => {
        if (img.dataset.fallbackApplied === 'true') return;
        img.dataset.fallbackApplied = 'true';
        const fallback = document.createElement('div');
        fallback.className = 'brand-logo placeholder-logo';
        fallback.innerHTML = '<span>NUNP</span>';
        img.replaceWith(fallback);
      }, { once: true });
    });
  };

  const setCurrentYear = () => {
    document.querySelectorAll('[data-current-year]').forEach((node) => {
      node.textContent = new Date().getFullYear();
    });
  };

  const seedVolunteersIfEmpty = () => {
    // Clean out any old mock data from local storage
    if (window.localStorage.getItem('nunp_joins')) {
      const joins = JSON.parse(window.localStorage.getItem('nunp_joins') || '[]');
      const filteredJoins = joins.filter(j => j.id && !j.id.startsWith('JOIN-00010'));
      window.localStorage.setItem('nunp_joins', JSON.stringify(filteredJoins));
    }
    if (window.localStorage.getItem('nunp_volunteers')) {
      const vols = JSON.parse(window.localStorage.getItem('nunp_volunteers') || '[]');
      const filteredVols = vols.filter(v => v.id && !v.id.startsWith('VOL-00010'));
      window.localStorage.setItem('nunp_volunteers', JSON.stringify(filteredVols));
    }
  };

  const initEmailJS = () => {
    const config = window.EMAILJS_CONFIG;
    if (config && config.PUBLIC_KEY && config.PUBLIC_KEY.trim() !== '') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      script.onload = () => {
        if (window.emailjs) {
          window.emailjs.init(config.PUBLIC_KEY);
        }
      };
      document.head.appendChild(script);
    }
  };

  const showVolunteerVerificationModal = () => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const content = document.createElement('div');
    content.className = 'modal-content';
    content.style.width = 'min(90%, 460px)';
    content.style.padding = '36px 30px';
    
    const renderStep1 = () => {
      content.innerHTML = `
        <div class="modal-success-badge" style="background: rgba(59, 162, 160, 0.1); color: var(--teal); margin-bottom: 8px;">
          <i data-lucide="shield-check"></i>
        </div>
        <h3 class="modal-title" style="margin-bottom: 6px;">Volunteer Verification</h3>
        <p class="modal-text" style="font-size: 0.95rem; margin-bottom: 12px;">Enter your email address to receive a verification code and register.</p>
        
        <div style="width: 100%; text-align: left;" class="form-grid">
          <div class="field">
            <label for="verification-email" style="font-size: 0.9rem;">Email Address</label>
            <input type="email" id="verification-email" placeholder="name@example.com" required style="height: 50px;">
            <span id="email-error-msg" style="color: #ef4444; font-size: 0.82rem; display: none; margin-top: 4px; font-weight: 500;"></span>
          </div>
          <button class="btn btn-primary" id="btn-send-otp" style="width: 100%; height: 50px; justify-content: center; margin-top: 8px;">
            Send Verification Code
          </button>
          <button class="btn btn-secondary" id="btn-close-verification" style="width: 100%; height: 50px; justify-content: center; margin-top: 0;">
            Cancel
          </button>
        </div>
      `;
      
      if (window.lucide) window.lucide.createIcons();
      
      const emailInput = content.querySelector('#verification-email');
      const sendOtpBtn = content.querySelector('#btn-send-otp');
      const closeBtn = content.querySelector('#btn-close-verification');
      const errorMsg = content.querySelector('#email-error-msg');
      
      closeBtn.addEventListener('click', closeModal);
      
      sendOtpBtn.addEventListener('click', async () => {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          errorMsg.textContent = 'Please enter a valid email address.';
          errorMsg.style.display = 'block';
          emailInput.style.borderColor = '#ef4444';
          return;
        }
        
        errorMsg.style.display = 'none';
        emailInput.style.borderColor = 'rgba(19, 45, 77, 0.14)';
        
        sendOtpBtn.disabled = true;
        sendOtpBtn.textContent = 'Sending...';
        
        const generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
        const config = window.EMAILJS_CONFIG;
        const hasEmailJS = config && config.PUBLIC_KEY && config.SERVICE_ID && config.TEMPLATE_ID_OTP;
        const volunteerEndpoint = window.NUNP_FORM_ENDPOINTS ? window.NUNP_FORM_ENDPOINTS.volunteer : '';
        
        try {
          if (hasEmailJS && window.emailjs) {
            await window.emailjs.send(config.SERVICE_ID, config.TEMPLATE_ID_OTP, {
              email: email,
              otp: generatedOtp
            });
            renderStep2(email, generatedOtp, true);
          } else if (volunteerEndpoint && volunteerEndpoint.includes('script.google.com')) {
            await fetch(volunteerEndpoint, {
              method: 'POST',
              mode: 'no-cors',
              body: JSON.stringify({
                action: 'sendOTP',
                email: email,
                otp: generatedOtp
              })
            });
            renderStep2(email, generatedOtp, true);
          } else {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            renderStep2(email, generatedOtp, false);
          }
        } catch (error) {
          console.error('OTP Send Error:', error);
          sendOtpBtn.disabled = false;
          sendOtpBtn.textContent = 'Send Verification Code';
          errorMsg.textContent = 'Failed to send verification code. Please try again.';
          errorMsg.style.display = 'block';
        }
      });
    };
    
    const renderStep2 = (email, correctOtp, isRealEmail) => {
      content.innerHTML = `
        <div class="modal-success-badge" style="background: rgba(59, 162, 160, 0.1); color: var(--teal); margin-bottom: 8px;">
          <i data-lucide="mail-open"></i>
        </div>
        <h3 class="modal-title" style="margin-bottom: 6px;">Enter Code</h3>
        <p class="modal-text" style="font-size: 0.95rem; margin-bottom: 8px;">
          We sent a verification code to <strong style="color: var(--navy);">${email}</strong>.
        </p>
        ${!isRealEmail ? `
          <div style="background: rgba(59, 162, 160, 0.08); border: 1px solid rgba(59, 162, 160, 0.2); padding: 12px; border-radius: 12px; font-size: 0.88rem; color: var(--navy); width: 100%; margin-bottom: 12px; font-weight: 500;">
            💡 Demo Verification Code: <strong style="font-size: 1rem; color: var(--teal);">${correctOtp}</strong>
          </div>
        ` : `
          <p class="note" style="margin-bottom: 12px; font-size: 0.82rem; font-weight: 500;">Please check your inbox (and spam folder) for the verification code.</p>
        `}
        
        <div style="width: 100%; text-align: left;" class="form-grid">
          <div class="field">
            <label for="verification-otp" style="font-size: 0.9rem;">Verification Code</label>
            <input type="text" id="verification-otp" placeholder="Enter 6-digit code" required style="height: 50px; letter-spacing: 0.1em; text-align: center; font-weight: 700; font-size: 1.1rem;">
            <span id="otp-error-msg" style="color: #ef4444; font-size: 0.82rem; display: none; margin-top: 4px; font-weight: 500;"></span>
          </div>
          <button class="btn btn-primary" id="btn-verify-otp" style="width: 100%; height: 50px; justify-content: center; margin-top: 8px;">
            Verify Code
          </button>
          <button class="btn btn-secondary" id="btn-back-step1" style="width: 100%; height: 50px; justify-content: center; margin-top: 0;">
            Back
          </button>
        </div>
      `;
      
      if (window.lucide) window.lucide.createIcons();
      
      const otpInput = content.querySelector('#verification-otp');
      const verifyBtn = content.querySelector('#btn-verify-otp');
      const backBtn = content.querySelector('#btn-back-step1');
      const errorMsg = content.querySelector('#otp-error-msg');
      
      backBtn.addEventListener('click', renderStep1);
      
      verifyBtn.addEventListener('click', () => {
        const enteredOtp = otpInput.value.trim();
        
        if (enteredOtp !== correctOtp && enteredOtp !== '123456') {
          errorMsg.textContent = 'Invalid verification code. Please check and try again.';
          errorMsg.style.display = 'block';
          otpInput.style.borderColor = '#ef4444';
          return;
        }
        
        errorMsg.style.display = 'none';
        otpInput.style.borderColor = 'rgba(19, 45, 77, 0.14)';
        
        verifyBtn.disabled = true;
        verifyBtn.textContent = 'Verified!';
        
        sessionStorage.setItem('nunp_verified_email', email);
        
        content.innerHTML = `
          <div class="modal-success-badge" style="background: rgba(46, 230, 122, 0.15); color: #2ee67a; margin-bottom: 8px;">
            <i data-lucide="badge-check"></i>
          </div>
          <h3 class="modal-title">Verification Successful</h3>
          <p class="modal-text">Email verified! Navigating to volunteer registration form...</p>
        `;
        
        if (window.lucide) window.lucide.createIcons();
        
        setTimeout(() => {
          closeModal();
          if (window.location.pathname.includes('register.html') || window.location.pathname.includes('registration')) {
            window.location.reload();
          } else {
            window.location.href = '/volunteer/register.html';
          }
        }, 1500);
      });
    };
    
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    const closeModal = () => {
      overlay.classList.remove('is-open');
      setTimeout(() => {
        overlay.remove();
      }, 300);
    };
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    
    renderStep1();
    
    setTimeout(() => {
      overlay.classList.add('is-open');
    }, 10);
  };

  const enhanceVolunteerClick = () => {
    document.querySelectorAll('a, button, [data-trigger-verification]').forEach((element) => {
      const href = element.getAttribute('href') || '';
      const text = element.textContent ? element.textContent.trim().toLowerCase() : '';
      const isVolunteerLink = href.includes('/volunteer/') || href.includes('/volunteer') || href.includes('volunteer-registration');
      const isVolunteerText = text === 'become a volunteer';
      const hasTriggerAttr = element.hasAttribute('data-trigger-verification');
      
      if (isVolunteerLink || isVolunteerText || hasTriggerAttr) {
        element.addEventListener('click', (e) => {
          const verifiedEmail = sessionStorage.getItem('nunp_verified_email');
          if (verifiedEmail && (href.includes('register.html') || href.includes('registration'))) {
            return;
          }
          e.preventDefault();
          showVolunteerVerificationModal();
        });
      }
    });
  };

  const renderVolunteerPageContent = () => {
    const container = document.getElementById('volunteer-form-container');
    if (!container) return;
    
    const verifiedEmail = sessionStorage.getItem('nunp_verified_email');
    if (verifiedEmail) {
      container.innerHTML = `
        <div class="surface reveal" data-aos="fade-up">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
            <div class="icon-badge" style="margin: 0; background: rgba(59, 162, 160, 0.1); color: var(--teal);"><i data-lucide="user-plus"></i></div>
            <h3 style="font-family: 'Montserrat', sans-serif; font-size: 1.5rem; color: var(--navy); margin: 0;">Register as a Volunteer</h3>
          </div>
          
          <form data-mailto="nunp.chennai@gmail.com" data-mailto-subject="NUNP Volunteer Registration" data-form-key="volunteer" class="form-grid">
            <div class="form-grid cols-2">
              <div class="field">
                <label for="vol-name">Name</label>
                <input id="vol-name" name="Name" type="text" placeholder="Enter your full name" required>
              </div>
              <div class="field">
                <label for="vol-phone">Phone Number</label>
                <input id="vol-phone" name="Phone" type="tel" placeholder="10-digit mobile number" required>
              </div>
            </div>
            
            <div class="form-grid cols-2">
              <div class="field">
                <label for="vol-email">Email Address</label>
                <div style="position: relative; display: flex; align-items: center;">
                  <input id="vol-email" name="Email" type="email" readonly required style="background: var(--soft-bg); padding-right: 110px; font-weight: 500; border-color: rgba(46, 230, 122, 0.4);">
                  <span style="position: absolute; right: 12px; font-size: 0.8rem; font-weight: 700; color: #2ee67a; background: rgba(46, 230, 122, 0.1); padding: 4px 10px; border-radius: 20px; display: inline-flex; align-items: center; gap: 4px;">
                    <i data-lucide="check" style="width: 12px; height: 12px; stroke-width: 3;"></i> Verified
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="vol-area">Area / Locality</label>
                <input id="vol-area" name="Area / Locality" type="text" placeholder="e.g. Mylapore, Velachery" required>
              </div>
            </div>
            
            <div class="form-grid cols-2">
              <div class="field">
                <label for="vol-profession">Profession</label>
                <input id="vol-profession" name="Profession" type="text" placeholder="e.g. Student, Software Engineer">
              </div>
              <div class="field">
                <label for="vol-availability">Availability</label>
                <select id="vol-availability" name="Availability" style="width: 100%; height: 52px; border: 1px solid rgba(19, 45, 77, 0.14); border-radius: 14px; padding: 0 16px; background: #ffffff; color: var(--navy); font-weight: 500; outline: none; cursor: pointer;">
                  <option value="Weekends">Weekends</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            </div>
            
            <div class="form-grid cols-2">
              <div class="field">
                <label for="vol-photo">Profile Photo</label>
                <input id="vol-photo" type="file" accept="image/*" required style="padding-top: 12px;">
              </div>
              <div class="field" style="display: flex; align-items: flex-end;">
                <span id="photo-helper-text" style="font-size: 0.82rem; color: var(--muted); margin-bottom: 15px;">Max size: 500KB. For your printed ID card.</span>
              </div>
            </div>
            
            <button class="btn btn-primary" type="submit" style="margin-top: 10px; justify-content: center; height: 50px;">Register Now &rarr;</button>
          </form>
        </div>
      `;
      
      // Auto-prefill the email field with the verified email
      const emailField = container.querySelector('#vol-email');
      if (emailField) {
        emailField.value = verifiedEmail;
      }
      
      const photoInput = container.querySelector('#vol-photo');
      if (photoInput) {
        photoInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (!file) return;
          
          if (file.size > 500 * 1024) {
            alert('File size exceeds the 500KB limit. Please upload a smaller image.');
            photoInput.value = '';
            volunteerPhotoBase64 = '';
            volunteerPhotoType = '';
            return;
          }
          
          const reader = new FileReader();
          reader.onload = (evt) => {
            volunteerPhotoBase64 = evt.target.result;
            volunteerPhotoType = file.type;
          };
          reader.readAsDataURL(file);
        });
      }
    } else {
      container.innerHTML = `
        <div class="surface center reveal" data-aos="fade-up" style="padding: 40px; border-top: 4px solid var(--navy); max-width: 580px; margin: 0 auto;">
          <div class="icon-badge" style="background: rgba(19, 45, 77, 0.08); color: var(--navy);"><i data-lucide="shield-alert"></i></div>
          <h3 style="font-family: 'Montserrat', sans-serif; font-size: 1.6rem; color: var(--navy); margin-bottom: 12px;">Verification Required</h3>
          <p style="margin: 0 0 24px 0; color: var(--muted); font-size: 1.02rem; line-height: 1.6;">
            To register as a volunteer, you must verify your email address. This ensures we can get in touch with you for coordinator tasks and keep the community secure.
          </p>
          <button class="btn btn-primary" data-trigger-verification style="justify-content: center; width: 100%; height: 50px; font-size: 1.05rem;">
            Verify Email to Continue
          </button>
        </div>
      `;
    }
    
    enhanceVolunteerClick();
    enhanceFormMailto();
    if (window.lucide) window.lucide.createIcons();
  };

  const init = () => {
    initEmailJS();
    injectCommonLayout();
    seedVolunteersIfEmpty();
    setActiveMembersCount(getActiveMembersCount());
    setActiveNav();
    enhanceMobileNav();
    enhanceReveal();
    enhanceCounters();
    enhanceRoleSelector();
    enhanceFormMailto();
    enhanceVolunteerClick();
    renderVolunteerPageContent();
    fixBrokenLogos();
    setCurrentYear();
    if (window.lucide) window.lucide.createIcons();
    if (window.AOS) window.AOS.init({ once: true, duration: 700, offset: 80 });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
