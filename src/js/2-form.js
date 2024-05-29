import debounce from 'lodash.debounce';

const STORAGE_KEY = 'feedback-form-state';

const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

let formData = {
  email: '',
  message: '',
  ...savedFormData,
};

const refs = {
  feedbackForm: document.querySelector('.js-feedback-form'),
};

refs.feedbackForm.addEventListener('submit', onFormSubmit);
refs.feedbackForm.addEventListener('input', debounce(onFormInput, 250));

if (savedFormData) {
  const keys = Object.keys(savedFormData);

  for (const key of keys) {
    refs.feedbackForm.elements[key].value = savedFormData[key];
  }
}

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  if (
    evt.currentTarget.elements.email.value.trim() === '' ||
    evt.currentTarget.elements.message.value.trim() === ''
  ) {
    alert('Fill please all fields');
    return;
  }

  console.log('formData', formData);

  evt.preventDefault();
  evt.currentTarget.reset();

  localStorage.removeItem(STORAGE_KEY);

  clearFormData();
}

function clearFormData() {
  const keys = Object.keys(formData);

  for (const key of keys) {
    formData[key] = '';
  }
}
