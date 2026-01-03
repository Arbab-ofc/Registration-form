const form = document.getElementById('registrationForm');
const successBanner = document.getElementById('successBanner');

const countryRules = {
  US: { code: '+1', pattern: /^[2-9]\d{9}$/, hint: '10 digits, cannot start with 0 or 1 (e.g. 4155552671)' },
  UK: { code: '+44', pattern: /^7\d{9}$/, hint: '10 digits for mobiles without leading zero (e.g. 7123456789)' },
  CA: { code: '+1', pattern: /^[2-9]\d{9}$/, hint: '10 digits, cannot start with 0 or 1 (e.g. 4385551234)' },
  AU: { code: '+61', pattern: /^4\d{8}$/, hint: '9 digits for mobiles without leading zero (e.g. 412345678)' },
  IN: { code: '+91', pattern: /^[6-9]\d{9}$/, hint: '10 digits, start with 6-9 (e.g. 9876543210)' },
  PK: { code: '+92', pattern: /^3\d{9}$/, hint: '10 digits for mobiles without leading zero (e.g. 3311234567)' }
};

const validators = {
  fullName: (value) => {
    const clean = value.trim();
    if (clean.length < 2) return 'Full name must be at least 2 characters.';
    if (!/^[A-Za-z ]+$/.test(clean)) return 'Full name can include letters and spaces only.';
    return '';
  },
  fatherName: (value) => {
    const clean = value.trim();
    if (clean.length < 2) return "Father's name must be at least 2 characters.";
    if (!/^[A-Za-z ]+$/.test(clean)) return "Father's name can include letters and spaces only.";
    return '';
  },
  dob: (value) => {
    if (!value) return 'Date of birth is required.';
    const inputDate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - inputDate.getFullYear() - (today < new Date(today.getFullYear(), inputDate.getMonth(), inputDate.getDate()) ? 1 : 0);
    if (isNaN(inputDate.getTime())) return 'Please enter a valid date.';
    if (inputDate >= today) return 'Date of birth must be in the past.';
    if (age < 13) return 'You must be at least 13 years old.';
    return '';
  },
  address: (value) => {
    const clean = value.trim();
    if (clean.length < 10) return 'Address must be at least 10 characters.';
    return '';
  },
  phone: (value, country) => {
    const digits = value.replace(/\D/g, '');
    const rule = countryRules[country] || countryRules.US;
    if (!digits) return 'Phone number is required.';
    if (!rule.pattern.test(digits)) return `Use a valid format: ${rule.hint}`;
    return '';
  }
};

const fieldConfig = {
  fullName: document.getElementById('fullNameField'),
  fatherName: document.getElementById('fatherNameField'),
  dob: document.getElementById('dobField'),
  address: document.getElementById('addressField'),
  phone: document.getElementById('phoneField')
};

const inputs = {
  fullName: document.getElementById('fullName'),
  fatherName: document.getElementById('fatherName'),
  dob: document.getElementById('dob'),
  address: document.getElementById('address'),
  phone: document.getElementById('phone'),
  countryCode: document.getElementById('countryCode')
};

const messages = {
  fullName: document.getElementById('fullNameMessage'),
  fatherName: document.getElementById('fatherNameMessage'),
  dob: document.getElementById('dobMessage'),
  address: document.getElementById('addressMessage'),
  phone: document.getElementById('phoneMessage')
};

const setFieldState = (fieldKey, message) => {
  const field = fieldConfig[fieldKey];
  field.classList.remove('form-field--error', 'form-field--success');
  messages[fieldKey].textContent = message;

  if (message) {
    field.classList.add('form-field--error');
  } else {
    field.classList.add('form-field--success');
  }
};

const validateField = (fieldKey) => {
  switch (fieldKey) {
    case 'fullName':
      return validators.fullName(inputs.fullName.value);
    case 'fatherName':
      return validators.fatherName(inputs.fatherName.value);
    case 'dob':
      return validators.dob(inputs.dob.value);
    case 'address':
      return validators.address(inputs.address.value);
    case 'phone':
      return validators.phone(inputs.phone.value, inputs.countryCode.value);
    default:
      return '';
  }
};

const handleInput = (fieldKey) => {
  const message = validateField(fieldKey);
  setFieldState(fieldKey, message);
};

inputs.fullName.addEventListener('input', () => handleInput('fullName'));
inputs.fatherName.addEventListener('input', () => handleInput('fatherName'));
inputs.dob.addEventListener('change', () => handleInput('dob'));
inputs.address.addEventListener('input', () => handleInput('address'));
inputs.phone.addEventListener('input', () => handleInput('phone'));

inputs.countryCode.addEventListener('change', () => {
  const rule = countryRules[inputs.countryCode.value];
  if (rule) {
    const sample = rule.hint.match(/\(([^)]+)\)/);
    inputs.phone.placeholder = sample ? sample[1] : rule.hint;
  }
  handleInput('phone');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  successBanner.classList.remove('success-banner--visible');

  const fields = ['fullName', 'fatherName', 'dob', 'address', 'phone'];
  let hasError = false;

  fields.forEach((key) => {
    const message = validateField(key);
    setFieldState(key, message);
    if (message) hasError = true;
  });

  if (hasError) {
    successBanner.classList.remove('success-banner--visible');
    form.querySelector('.form-field--error .form-field__input, .form-field--error .form-field__textarea')?.focus();
    return;
  }

  successBanner.classList.add('success-banner--visible');
  form.reset();
  Object.keys(fieldConfig).forEach((key) => fieldConfig[key].classList.remove('form-field--success', 'form-field--error'));
});
