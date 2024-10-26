import React from "react";

type Props = {};

const page = (props: Props) => {
  const rows = Array.from({ length: 10 }, (v, i) => ({
    placement: `#${i + 1}`,
    name: jsCookies().name.map(),
    score: jsCookies().score.map(),
  }));
  return (
    <div className="grid place-content-center w-full h-[100vh]">
      <div style={{ width: "70vw" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ width: "15%", padding: "8px", textAlign: "left" }}>
                Placement
              </th>
              <th
                style={{ width: "70%", padding: "8px", textAlign: "left" }}
              ></th>
              <th style={{ width: "15%", padding: "8px", textAlign: "left" }}>
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td style={{ padding: "8px", textAlign: "left" }}>
                  {row.placement}
                </td>
                <td style={{ padding: "8px", textAlign: "left" }}>
                  {row.name}
                </td>
                <td style={{ padding: "8px", textAlign: "left" }}>
                  {row.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a className="nav-button text-center mt-24 m-auto" href="/quizzes">
        Back
      </a>
    </div>
  );
};

export default page;
