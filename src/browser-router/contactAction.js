// contact action function
export default async function contactAction({ request }) {
  const data = await request.formData();

  const submission = {
    email: data.get("email"),
    message: data.get("message"),
  };

  let response = {
    emailError: undefined,
    messageError: undefined,
    success: undefined,
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
    response.success = "Your message was successfully sent";
  }

  return response;
}
