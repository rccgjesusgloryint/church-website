import React from "react";
import { FeedbackForm } from "../../../components/feedback/feedback-form";
import Navbar2 from "../../../components/navbar/Navbar2";
import Navbar from "../../../components/navbar/Navbar";

type Props = {};

const Feedback = (props: Props) => {
  return (
    <>
      <Navbar />
      <FeedbackForm />
    </>
  );
};

export default Feedback;
