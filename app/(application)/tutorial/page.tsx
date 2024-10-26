import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="TutorialPage">
      <div className="main">
        <h3 className="title">Tutorial</h3>
        <br></br>

        <br></br>
        <p>
          Read the question at the top<br></br>
          <br></br>
          Choose 1 of the 4 options that you think is correct<br></br>
          <br></br>
          When chosen it will automatically be selected when clicked<br></br>
          <br></br>
          If it’s right, it will highlight green and the wrong options will be
          highlighted red<br></br>
          <br></br>
          You gain score for the correct options
        </p>
        <br></br>

        <br></br>
        <a className="nav-button text-center" href="/quizzes">
          Back
        </a>
      </div>
    </div>
  );
};

export default page;
