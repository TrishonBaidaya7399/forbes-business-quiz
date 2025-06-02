import mailgun from "mailgun-js";

export async function validateEmail(
  email: string
): Promise<{ isValid: boolean; message: string }> {
  try {
    const mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY || "",
      domain: process.env.MAILGUN_DOMAIN || "",
    });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validation = await new Promise<any>((resolve, reject) => {
      mg.validate(email, (error, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });

    // Check validation results
    if (validation.is_valid) {
      return { isValid: true, message: "Email is valid" };
    } else {
      let message = "Invalid email address";

      if (validation.reason) {
        switch (validation.reason) {
          case "mailbox_does_not_exist":
            message = "Ez az e-mail cím nem létezik";
            break;
          case "invalid_syntax":
            message = "Érvénytelen e-mail formátum";
            break;
          case "disposable_email":
            message = "Ideiglenes e-mail címek nem engedélyezettek";
            break;
          default:
            message = "Érvénytelen e-mail cím";
        }
      }

      return { isValid: false, message };
    }
  } catch (error) {
    console.error("Email validation error:", error);
    return {
      isValid: false,
      message: "E-mail validáció sikertelen. Kérjük, próbálja újra.",
    };
  }
}
