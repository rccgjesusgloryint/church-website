"use client";

import { NewletterEmail, SendNewsletterEmailType } from "@/lib/types";
import React from "react";

const SendNewsletterEmail = () => {
  const [emails, setEmails] = React.useState<SendNewsletterEmailType>();

  // const sendEmails = async (emails: NewletterEmail) => {
  //   if (!emails) {
  //     return null;
  //   }
  //   await sendBulkNewsletterEmail(emails);
  // };

  // const handleClick = () => {
  //   if (!emails) {
  //     return;
  //   }
  //   sendEmails(emails);
  // };
  return (
    <div>
      SendNewsletterEmail
      {/* <button onClick={handleClick}>SEND EMAILS</button> */}
    </div>
  );
};

export default SendNewsletterEmail;
