export function validateLogin({ email, password }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
}

export function validateDPR(form) {
  const errors = {};

  if (!form.projectId) {
    errors.projectId = 'Please select a project';
  }

  if (!form.date) {
    errors.date = 'Date is required';
  }

  if (!form.weather) {
    errors.weather = 'Please select a weather condition';
  }

  if (!form.workDescription.trim()) {
    errors.workDescription = 'Work description is required';
  } else if (form.workDescription.trim().length < 20) {
    errors.workDescription = 'Description must be at least 20 characters';
  }

  if (!form.workerCount && form.workerCount !== 0) {
    errors.workerCount = 'Worker count is required';
  } else if (parseInt(form.workerCount, 10) < 1) {
    errors.workerCount = 'Must be at least 1 worker';
  } else if (parseInt(form.workerCount, 10) > 500) {
    errors.workerCount = 'Maximum 500 workers allowed';
  }

  return errors;
}
