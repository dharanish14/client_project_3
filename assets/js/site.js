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

  const sendViaEndpoint = async (endpoint, form) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(new FormData(form)),
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

  const showIDCardModal = (name, idNumber) => {
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
            <div style="width: 80px; height: 80px; border-radius: 50%; background: rgba(59, 162, 160, 0.15); border: 2px dashed #3BA2A0; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3BA2A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
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
            <div>
              <div style="font-size: 0.5rem; color: #ACBDC6; text-transform: uppercase; letter-spacing: 0.04em;">Issue Date</div>
              <div style="font-size: 0.75rem; font-weight: 600; color: #ffffff;">${issueDate}</div>
            </div>
            <div>
              <div style="font-size: 0.5rem; color: #ACBDC6; text-transform: uppercase; letter-spacing: 0.04em;">Authority</div>
              <div style="font-size: 0.75rem; font-weight: 600; color: #ffffff;">NUNP Lead</div>
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
  };

  const enhanceFormMailto = () => {
    document.querySelectorAll('form[data-mailto]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formKey = form.dataset.formKey || '';
        const endpoint = form.dataset.formEndpoint || formEndpoints[formKey] || '';
        const isJoinForm = formKey === 'join';
        const isVolunteerForm = formKey === 'volunteer';
        
        let newMemberId = defaultActiveMembers;
        if (isJoinForm || isVolunteerForm) {
          newMemberId = incrementActiveMembersCount();
        }

        const nameInput = form.querySelector('[name="Name"]') || form.querySelector('input[type="text"]');
        const volunteerName = nameInput ? nameInput.value : 'User';

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
          const skillsVal = form.querySelector('[name="Skills"]')?.value || '';
          const volunteerData = {
            id: `VOL-${String(newMemberId).padStart(6, '0')}`,
            name: volunteerName,
            email: emailVal,
            phone: phoneVal,
            area: areaVal,
            profession: professionVal,
            availability: availabilityVal,
            skills: skillsVal,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
          };
          const existing = JSON.parse(window.localStorage.getItem('nunp_volunteers') || '[]');
          existing.push(volunteerData);
          window.localStorage.setItem('nunp_volunteers', JSON.stringify(existing));
        }

        if (endpoint) {
          if (endpoint.includes('your-form-id')) {
            form.reset();
            showIDCardModal(volunteerName, newMemberId);
            return;
          }
          sendViaEndpoint(endpoint, form)
            .then(() => {
              form.reset();
              showIDCardModal(volunteerName, newMemberId);
            })
            .catch(() => {
              showCustomSuccessModal(
                'Submission Failed',
                'The submission endpoint is temporarily unavailable. Please try again or email us directly at nunp.chennai@gmail.com.',
                false
              );
            });
          return;
        }

        // Default local submit (demo + mailto)
        const recipient = form.dataset.mailto;
        const subject = encodeURIComponent(form.dataset.mailtoSubject || 'NUNP website enquiry');
        const formData = new FormData(form);
        const bodyLines = [];
        formData.forEach((value, key) => {
          bodyLines.push(`${key}: ${value}`);
        });
        const body = encodeURIComponent(bodyLines.join('\n'));
        
        form.reset();
        showIDCardModal(volunteerName, newMemberId);
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
    // Seed Join the Movement submissions
    if (!window.localStorage.getItem('nunp_joins')) {
      const mockJoins = [
        {
          id: 'JOIN-000101',
          name: 'Joshua M',
          email: 'joshua.m@outlook.com',
          phone: '7654321098',
          city: 'Velachery',
          role: 'Campus Ambassador',
          message: 'I want to represent NUNP in my college and run drives.',
          date: 'Jun 14, 2026'
        },
        {
          id: 'JOIN-000102',
          name: 'Ananya S',
          email: 'ananya.s@gmail.com',
          phone: '9812345678',
          city: 'Tambaram',
          role: 'Youth Fellow',
          message: 'Ready to participate in youth fellowship and lead events.',
          date: 'Jun 15, 2026'
        },
        {
          id: 'JOIN-000103',
          name: 'Ramesh Kumar',
          email: 'ramesh.k@gmail.com',
          phone: '9876543210',
          city: 'Adyar',
          role: 'Supporter',
          message: 'Happy to support local campaigns and outreach.',
          date: 'Jun 10, 2026'
        }
      ];
      window.localStorage.setItem('nunp_joins', JSON.stringify(mockJoins));
    }

    // Seed Volunteer Registration submissions
    if (!window.localStorage.getItem('nunp_volunteers')) {
      const mockVolunteers = [
        {
          id: 'VOL-000101',
          name: 'Priya Dharshini',
          email: 'priya.d@yahoo.com',
          phone: '8765432109',
          area: 'Mylapore',
          profession: 'Software Engineer',
          availability: 'Weekends',
          skills: 'Teaching kids, public speaking, managing local drives.',
          date: 'Jun 11, 2026'
        },
        {
          id: 'VOL-000102',
          name: 'Vignesh R',
          email: 'vignesh.r@gmail.com',
          phone: '9080706050',
          area: 'Anna Nagar',
          profession: 'Business Analyst',
          availability: 'Both',
          skills: 'Data collection, spreadsheets, surveys, event prep.',
          date: 'Jun 13, 2026'
        },
        {
          id: 'VOL-000103',
          name: 'Deepa S',
          email: 'deepa.s@gmail.com',
          phone: '9122334455',
          area: 'T-Nagar',
          profession: 'College Student',
          availability: 'Weekends',
          skills: 'Photography, social media marketing, content writing.',
          date: 'Jun 15, 2026'
        }
      ];
      window.localStorage.setItem('nunp_volunteers', JSON.stringify(mockVolunteers));
    }
  };

  const init = () => {
    injectCommonLayout();
    seedVolunteersIfEmpty();
    setActiveMembersCount(getActiveMembersCount());
    setActiveNav();
    enhanceMobileNav();
    enhanceReveal();
    enhanceCounters();
    enhanceRoleSelector();
    enhanceFormMailto();
    fixBrokenLogos();
    setCurrentYear();
    if (window.lucide) window.lucide.createIcons();
    if (window.AOS) window.AOS.init({ once: true, duration: 700, offset: 80 });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
