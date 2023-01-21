import { send } from "@emailjs/browser";

// contact action function
export default async function contactAction({ request }) {
  const data = await request.formData();

  const submission = {
    email: data.get("email"),
    message: data.get("message"),
  };

  let toSend = {
    from_email: submission.email,
    message: submission.message,
  };

  let response = {
    emailError: undefined,
    messageError: undefined,
    success: undefined,
    serviceError: undefined,
  };
  //   error if there is no email
  if (!submission.email) {
    response.emailError = "Please enter a valid email";
  }
  //   return error if message is too short
  if (submission.message.length < 20) {
    response.messageError = "Please enter at least 20 chars";
  }

  if (!response.emailError && !response.messageError) {
    await send(
      "service_impact_app",
      "template_impact_app",
      toSend,
      "mMD3lCvskkDRCL8ir"
    )
      .then(() => {
        response.success = "Your message was successfully sent";
      })
      .catch((error) => {
        console.log(error);
        response.serviceError = true;
      });
  }

  return response;
}
