export const SearchIcon = ({
  width = "1.6rem",
  height = "1.6rem",
  className,
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
    ></path>
  </svg>
);

export const CardIcon = ({ width, height, className }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 81 70">
    <g
      transform="translate(0 2)"
      strokeWidth="4"
      stroke="#1e2d7d"
      fill="none"
      fillRule="evenodd"
    >
      <circle strokeLinecap="square" cx="34" cy="60" r="6"></circle>
      <circle strokeLinecap="square" cx="67" cy="60" r="6"></circle>
      <path d="M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547"></path>
    </g>
  </svg>
);
