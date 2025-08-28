import { SVGProps } from "react";

function TwoLine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="10"
      viewBox="0 0 22 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 1L21 1"
        stroke="#31493C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M1 9L21 9"
        stroke="#31493C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default TwoLine;
