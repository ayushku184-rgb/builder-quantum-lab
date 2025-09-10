import { Link } from "react-router-dom";

export function InteractiveLogo() {
  return (
    <Link
      to="/dashboard"
      className="inline-flex items-center justify-center w-10 h-10"
      title="SwasthyaSetu"
      aria-label="SwasthyaSetu Home"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F31d63168d6704ed39c45fa67e82c61be%2F76ac77f61a034ec5aba0266e31d45a09?format=webp&width=128"
        alt="SwasthyaSetu logo"
        className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-white"
        loading="eager"
        decoding="async"
      />
    </Link>
  );
}

export default InteractiveLogo;
