import "./Loader.css";

// loader extrait de CodePen
const Loader = () => (
  <svg
    className="login-loader"
    viewBox="0 0 55 100"
    role="status"
    aria-label="Connexion en cours"
  >
    {[6, 26, 46].map((cx, index) => (
      <circle key={cx} fill="#fff" cx={cx} cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin={`${(index + 1) / 10}s`}
        />
      </circle>
    ))}
  </svg>
);

export default Loader;
