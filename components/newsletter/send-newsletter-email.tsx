"use client";

import { getNewsletterUsers, sendBulkNewsletterEmail } from "@/lib/queries";
import { NewletterEmail, SendNewsletterEmailType } from "@/lib/types";
import React from "react";

const SendNewsletterEmail = () => {
  const [emails, setEmails] = React.useState<SendNewsletterEmailType>();

  const getEmails = async () => {
    const response = await getNewsletterUsers();
    setEmails(response);
  };

  const sendEmails = async (emails: NewletterEmail) => {
    if (!emails) {
      return null;
    }
    await sendBulkNewsletterEmail(emails);
  };

  React.useEffect(() => {
    getEmails();
  }, []);

  const handleClick = () => {
    if (!emails) {
      return;
    }
    sendEmails(emails);
  };
  return (
    <div>
      SendNewsletterEmail
      <button onClick={handleClick}>SEND EMAILS</button>
    </div>
  );
};

export default SendNewsletterEmail;
