
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