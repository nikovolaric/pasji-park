import { SVGProps } from "react";

function Building(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.2513 5.83333H8.54297M6.2513 9.16667H8.54297M6.2513 12.5H8.54297M11.4596 5.83333H13.7513M11.4596 9.16667H13.7513M11.4596 12.5H13.7513M16.668 17.5V5.16667C16.668 4.23325 16.668 3.76654 16.4863 3.41002C16.3265 3.09641 16.0716 2.84144 15.758 2.68166C15.4014 2.5 14.9347 2.5 14.0013 2.5H6.0013C5.06788 2.5 4.60117 2.5 4.24465 2.68166C3.93105 2.84144 3.67608 3.09641 3.51629 3.41002C3.33464 3.76654 3.33464 4.23325 3.33464 5.16667V17.5M18.3346 17.5H1.66797"
        stroke="#31493C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Building;
