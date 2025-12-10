import React from "react";
import { MdFeedback } from "react-icons/md";

type Props = {};

const FeedbackComponent = (props: Props) => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <a
        href="https://feedback.jesusgloryintl.com"
        target="_blank"
        rel="noopener noreferrer"
        title="Give Feedback"
      >
        <MdFeedback className="cursor-pointer hover:text-black transition-transform drop-shadow-lg scale-[2]" />
      </a>
    </div>
  );
};

export default FeedbackComponent;
