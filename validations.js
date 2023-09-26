const password = document.getElementById('password');
const email = document.getElementById('email');
const validationMessages = document.getElementById('validation-messages');
const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', function (e) {
  e.preventDefault();

  const passwordValue = password.value;
  const emailValue = email.value;
  const isPasswordValid = checkPasswordStrength(passwordValue);
  console.log(checkPasswordStrength(passwordValue))
  const isEmailValid = validateEmail(emailValue);

  validationMessages.innerHTML = '';
  let isValid = true;

 
  if (!isPasswordValid) {
    validationMessages.innerHTML += 'Password is invalid. ';
    isValid = false;
  }

  if (!isEmailValid) {
    validationMessages.innerHTML += 'Email is invalid. ';
    isValid = false;
  }

  if (isValid) {
    validationMessages.innerHTML = 'Login successful!';
  } else {
    validationMessages.innerHTML += 'Login failed!';
  }

});


function checkPasswordStrength(password) {
  if (!password) return false;

  let includeNumbers = false;
  let includeSymbols = false;
  let includeUppercase = false;
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const symbols = ['!', '?', '@', '&', '*', '#', '.'];

  const passwordLength = password.length;

  if (passwordLength < 6) {
    return false;
  }

  for (let i = 0; i < passwordLength; i++) {
    if (numbers.includes(password[i])) {
      includeNumbers = true;
    }
    if (symbols.includes(password[i])) {
      includeSymbols = true;
    }
    if (password[i] === password[i].toUpperCase() && /[A-Z]/.test(password[i])) {
      includeUppercase = true;
    }
  }


  // weak case
  if (!includeUppercase && !includeSymbols && !includeNumbers) {
    return false;
  }
  // medium cases
  if (!includeUppercase && includeSymbols && includeNumbers) {
    return false;
  }
  if (includeNumbers && includeUppercase && !includeSymbols) {
    return false;
  }
  if (!includeNumbers && includeUppercase && includeSymbols) {
    return false;
  }
  //strong case
  if(includeNumbers && includeSymbols && includeUppercase){
    return true;
  }
}
checkPasswordStrength();


function validateEmail(email){
  if (!email) return false;

  const emailwithout1stChar = email.slice(1);
  const splitting = emailwithout1stChar.split('.');
  const tld = splitting[splitting.length - 1];
  const hasSingleAt = emailwithout1stChar.includes("@");
  const hasADot = emailwithout1stChar.includes('.');
  const isValidTLD = tld.length >= 2 && tld.length <= 4;
  

  //1st char is symbol case
  if(email[0] === '.' || email[0] === '@' || email[0] === '_'){
    return false;
  }

  if(isValidTLD && hasADot && hasSingleAt){
    return true;
  } 
  return false; 
}
validateEmail();

module.exports = { checkPasswordStrength, validateEmail };
