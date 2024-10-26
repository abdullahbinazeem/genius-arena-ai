import Container from "@/components/container";
import React from "react";

const page = () => {
  return (
    <Container>
      <div>
        <p>Hello</p>

        <div className="mt-10">
          <input
            type="text"
            placeholder="course category"
            className="border-2"
          />
          <button className="block mt-2 p-3 bg-blue-500">
            Create a Course
          </button>
        </div>
      </div>
    </Container>
  );
};

export default page;
