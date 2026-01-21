
interface ValidationResult {
 valid: boolean;
 emailErr?: string | undefined;
 passErr?: string | undefined;
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const mobileRegex = /^\+?\s?(\d{1,4})?\s?(\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9})$/;

export function validateLoginFields(email?: string, password?: string): ValidationResult {
   let emailErr = '';
   let passErr = '';

   if (!email?.trim()) {
     emailErr = 'Email is required.';
   } else {
     if (!emailRegex.test(email)) {
       emailErr = 'Enter a valid Email.';
     }
   }

   if (!password?.trim()) {
     passErr = 'Password is required.';
   }


   const valid = !emailErr && !passErr;


   return { valid, emailErr, passErr };
 }

export const validatePasswordAndConfirm = (password: string, confirmPass: string, regForm:boolean=false) => {
   const hasUpper = /[A-Z]/.test(password);
   const hasLower = /[a-z]/.test(password);
   const hasNum = /\d/.test(password);
   const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);


   let passErr = '';
   let confirmPassErr = '';
   if (password == '') {
       passErr = `Please enter${regForm? '':' new'} password.`;


   }
   else if (password.length < 10 || !hasUpper || !hasLower || !hasNum || !hasSpecial) {
       passErr = 'Password must be at least 10 characters long and include uppercase and lowercase letters, numbers, and at least one special character.';


   }
   
   // Confirm password validation
   if (!passErr && password !== confirmPass) {
       confirmPassErr = 'Passwords do not match.';
   }
   return {
       isValid: passErr === '' && confirmPassErr === '',
       passErr,
       confirmPassErr
   };
};



