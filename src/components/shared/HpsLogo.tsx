const SEG =
  "M46.49,8.59 A48,48,0,0,1,61.51,8.59 L59.32,22.42 A34,34,0,0,0,48.68,22.42 Z";

const ANGLES = [45, 68, 91, 114, 137, 160, 183, 206, 229, 252, 275, 298];

export function HpsLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 148 112"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {ANGLES.map((a) => (
        <path
          key={a}
          d={SEG}
          fill="currentColor"
          transform={`rotate(${a},54,56)`}
        />
      ))}

      {/* Pill capsule — H */}
      <rect x="45" y="5" width="18" height="34" rx="9" fill="currentColor" />
      <text
        x="54"
        y="22"
        fontSize="14"
        fontWeight="900"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#111"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        H
      </text>

      {/* Right block — P / S */}
      <rect x="110" y="20" width="30" height="72" rx="3" fill="currentColor" />
      <text
        x="125"
        y="47"
        fontSize="22"
        fontWeight="900"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#111"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        P
      </text>
      <text
        x="125"
        y="78"
        fontSize="22"
        fontWeight="900"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#111"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        S
      </text>
    </svg>
  );
}
