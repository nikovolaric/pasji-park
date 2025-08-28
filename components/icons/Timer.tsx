import { SVGProps } from "react";

function Timer(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_5329_1142)">
        <path
          d="M12.0846 15.8327L13.7513 17.4993L17.5013 13.7493M18.3222 10.4576C18.3305 10.3059 18.3346 10.1531 18.3346 9.99935C18.3346 5.39698 14.6037 1.66602 10.0013 1.66602C5.39893 1.66602 1.66797 5.39698 1.66797 9.99935C1.66797 14.5289 5.28173 18.2143 9.78338 18.3299M10.0013 4.99935V9.99935L13.1166 11.557"
          stroke="#31493C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_5329_1142">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Timer;
