
export function emailValidation(email) {  //validate email : return false if invalid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email == null || "") {
      return false;
    }
    if (!emailRegex.test(email)) {
      return false;
    } else {
      return true;
    }
  }
  export function passwordValidation(password) {  //validate email : return false if invalid
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password == null || "") {
      return false;
    }
    if (!strongPasswordRegex.test(password)) {
      return false;
    } else {
      return true;
    }
  }