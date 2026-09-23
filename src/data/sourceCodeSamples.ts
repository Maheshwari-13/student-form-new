export const HTML_CODE_SAMPLE = `<!-- Semantic Student Registration Form (HTML5) -->
<div class="registration-container">
  <header class="form-header">
    <div class="header-seal">
      <img src="assets/university_crest.svg" alt="Samrat Ashok Technological Institute Seal" class="crest-icon" />
    </div>
    <div class="header-titles">
      <h2>Samrat Ashok Technological Institute</h2>
      <p class="subtitle">Admissions & Student Academic Records • Session 2026–2027</p>
    </div>
  </header>

  <form id="studentRegistrationForm" novalidate autocomplete="on">
    <!-- Progress Indicator -->
    <nav class="stepper-nav" aria-label="Registration Progress">
      <ol class="step-list">
        <li class="step-item active" data-step="1">1. Personal Info</li>
        <li class="step-item" data-step="2">2. Contact Details</li>
        <li class="step-item" data-step="3">3. Academic Profile</li>
        <li class="step-item" data-step="4">4. Campus & Electives</li>
        <li class="step-item" data-step="5">5. Verification</li>
      </ol>
    </nav>

    <!-- SECTION 1: PERSONAL INFORMATION -->
    <fieldset class="form-section active" id="section-1">
      <legend class="section-title">Personal Details</legend>
      
      <!-- Student Photo Upload -->
      <div class="photo-upload-wrapper">
        <label for="studentPhoto" class="field-label">Student Passport Photo</label>
        <div class="photo-dropzone" id="photoDropzone">
          <img id="photoPreview" src="default-avatar.png" alt="Student Preview" class="photo-thumb" />
          <input type="file" id="studentPhoto" name="studentPhoto" accept="image/png, image/jpeg, image/webp" />
          <span class="upload-hint">Drag & drop image or click to browse (Max 5MB)</span>
        </div>
        <p class="field-error" id="error-photo"></p>
      </div>

      <div class="form-grid grid-3">
        <div class="field-group">
          <label for="firstName" class="field-label required">First Name</label>
          <input type="text" id="firstName" name="firstName" required placeholder="e.g. Alexander" aria-required="true" />
          <span class="field-error" id="error-firstName"></span>
        </div>

        <div class="field-group">
          <label for="middleName" class="field-label">Middle Name</label>
          <input type="text" id="middleName" name="middleName" placeholder="Optional" />
        </div>

        <div class="field-group">
          <label for="lastName" class="field-label required">Last Name</label>
          <input type="text" id="lastName" name="lastName" required placeholder="e.g. Wright" aria-required="true" />
          <span class="field-error" id="error-lastName"></span>
        </div>
      </div>

      <div class="form-grid grid-3">
        <div class="field-group">
          <label for="dob" class="field-label required">Date of Birth</label>
          <input type="date" id="dob" name="dob" required aria-required="true" />
          <span class="field-error" id="error-dob"></span>
        </div>

        <div class="field-group">
          <label for="gender" class="field-label required">Gender</label>
          <select id="gender" name="gender" required aria-required="true">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          <span class="field-error" id="error-gender"></span>
        </div>

        <div class="field-group">
          <label for="bloodGroup" class="field-label required">Blood Group</label>
          <select id="bloodGroup" name="bloodGroup" required>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option><option value="A-">A-</option>
            <option value="B+">B+</option><option value="B-">B-</option>
            <option value="O+">O+</option><option value="O-">O-</option>
            <option value="AB+">AB+</option><option value="AB-">AB-</option>
          </select>
          <span class="field-error" id="error-bloodGroup"></span>
        </div>
      </div>
    </fieldset>

    <!-- Navigation Buttons -->
    <div class="form-actions">
      <button type="button" id="prevBtn" class="btn btn-secondary" style="display:none;">Back</button>
      <button type="button" id="nextBtn" class="btn btn-primary">Continue to Contact Details</button>
      <button type="submit" id="submitBtn" class="btn btn-submit" style="display:none;">Submit Registration</button>
    </div>
  </form>
</div>`;

export const CSS_CODE_SAMPLE = `/* Appropriate Clean Form Stylesheet (CSS) */
:root {
  --primary-navy: #0f172a;
  --accent-blue: #0284c7;
  --accent-hover: #0369a1;
  --surface-bg: #f8fafc;
  --card-bg: #ffffff;
  --border-subtle: #e2e8f0;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --error-crimson: #dc2626;
  --success-emerald: #16a34a;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}

body {
  font-family: var(--font-family);
  background-color: var(--surface-bg);
  color: var(--text-main);
  margin: 0;
  padding: 2rem 1rem;
}

.registration-container {
  max-width: 900px;
  margin: 0 auto;
  background: var(--card-bg);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.05);
  overflow: hidden;
}

.form-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.75rem 2rem;
  border-bottom: 1px solid var(--border-subtle);
  background: linear-gradient(to right, #f8fafc, #ffffff);
}

.stepper-nav {
  padding: 1rem 2rem;
  background: #f1f5f9;
  border-bottom: 1px solid var(--border-subtle);
}

.step-list {
  display: flex;
  list-style: none;
  gap: 1rem;
  margin: 0;
  padding: 0;
  overflow-x: auto;
}

.step-item {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-muted);
  white-space: nowrap;
}

.step-item.active {
  color: var(--accent-blue);
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 4px;
}

fieldset.form-section {
  border: none;
  margin: 0;
  padding: 2rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 1.5rem;
}

.form-grid {
  display: grid;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}

.grid-3 { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
.grid-2 { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.field-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
}

.field-label.required::after {
  content: " *";
  color: var(--error-crimson);
}

input, select, textarea {
  height: 2.625rem;
  padding: 0.5rem 0.875rem;
  font-size: 0.9375rem;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease;
  background-color: #ffffff;
}

input:focus-visible, select:focus-visible, textarea:focus-visible {
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
}

input.is-invalid, select.is-invalid {
  border-color: var(--error-crimson);
  background-color: #fffbfa;
}

.field-error {
  font-size: 0.75rem;
  color: var(--error-crimson);
  margin: 0;
  min-height: 1rem;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  background: #f8fafc;
  border-top: 1px solid var(--border-subtle);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 150ms ease;
  border: none;
}

.btn-primary {
  background: var(--primary-navy);
  color: #ffffff;
}
.btn-primary:hover { background: #1e293b; }

.btn-secondary {
  background: #ffffff;
  border: 1px solid var(--border-subtle);
  color: var(--text-main);
}
.btn-secondary:hover { background: #f1f5f9; }

.btn-submit {
  background: var(--accent-blue);
  color: #ffffff;
}
.btn-submit:hover { background: var(--accent-hover); }

/* Print Formatting for Admission Slips */
@media print {
  body { background: #fff; padding: 0; }
  .stepper-nav, .form-actions, .no-print { display: none !important; }
  .registration-container { box-shadow: none; border: 1px solid #000; }
}`;

export const JS_CODE_SAMPLE = `// Robust Form Validation and Interaction Controller (JavaScript)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('studentRegistrationForm');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  
  let currentStep = 1;
  const totalSteps = 5;

  // Validation Rules
  const validators = {
    firstName: (val) => val.trim().length >= 2 ? '' : 'First name must be at least 2 characters',
    lastName: (val) => val.trim().length >= 2 ? '' : 'Last name must be at least 2 characters',
    email: (val) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val) ? '' : 'Please enter a valid email address',
    phone: (val) => /^[+0-9\\s-()]{8,18}$/.test(val) ? '' : 'Valid phone number required (8-18 digits)',
    dob: (val) => {
      if (!val) return 'Date of birth is required';
      const birth = new Date(val);
      const ageDiff = Date.now() - birth.getTime();
      const ageDate = new Date(ageDiff);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      return age >= 16 ? '' : 'Applicant must be at least 16 years of age';
    },
    gender: (val) => val ? '' : 'Please select a gender option',
    bloodGroup: (val) => val ? '' : 'Please select applicant blood group',
    program: (val) => val ? '' : 'Please select an academic program',
    qualifyingScore: (val) => {
      const num = parseFloat(val);
      return (!isNaN(num) && num > 0) ? '' : 'Please enter a valid qualifying score';
    },
    declarationAgreed: (checked) => checked ? '' : 'Applicant must agree to the academic declaration',
    digitalSignature: (val) => val.trim().length >= 3 ? '' : 'Please enter your digital signature',
  };

  // Real-time Input Validation Handler
  function validateField(input) {
    const name = input.name;
    const errorEl = document.getElementById(\`error-\${name}\`);
    if (!validators[name] || !errorEl) return true;

    const value = input.type === 'checkbox' ? input.checked : input.value;
    const errorMsg = validators[name](value);

    if (errorMsg) {
      input.classList.add('is-invalid');
      errorEl.textContent = errorMsg;
      return false;
    } else {
      input.classList.remove('is-invalid');
      errorEl.textContent = '';
      return true;
    }
  }

  // Attach live event listeners to inputs
  form.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('input', () => validateField(field));
    field.addEventListener('blur', () => validateField(field));
  });

  // Step Navigation Logic
  function navigateStep(newStep) {
    // Hide current section
    const currentSection = document.getElementById(\`section-\${currentStep}\`);
    if (currentSection) currentSection.classList.remove('active');

    // Show new section
    currentStep = newStep;
    const nextSection = document.getElementById(\`section-\${currentStep}\`);
    if (nextSection) nextSection.classList.add('active');

    // Update Progress Stepper Indicator
    document.querySelectorAll('.step-item').forEach((item) => {
      const stepNum = parseInt(item.getAttribute('data-step'), 10);
      item.classList.toggle('active', stepNum === currentStep);
    });

    // Button states
    prevBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
    if (currentStep === totalSteps) {
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'inline-flex';
    } else {
      nextBtn.style.display = 'inline-flex';
      submitBtn.style.display = 'none';
    }
  }

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Save to LocalStorage / Registry
    const existing = JSON.parse(localStorage.getItem('registered_students') || '[]');
    const newRecord = {
      id: 'REG-2026-' + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
      status: 'Pending Review',
      ...data
    };
    existing.unshift(newRecord);
    localStorage.setItem('registered_students', JSON.stringify(existing));

    alert(\`Registration successful! Assigned Student ID: \${newRecord.id}\`);
    form.reset();
    navigateStep(1);
  });
});`;
