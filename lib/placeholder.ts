export const shimmer =
    (w: number, h: number) =>
        `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs><linearGradient id="g"><stop stop-color="#222" offset="20%"/><stop stop-color="#333" offset="50%"/><stop stop-color="#222" offset="70%"/></linearGradient></defs>
      <rect width="${w}" height="${h}" fill="#222"/><rect id="r" width="${w}" height="${h}" fill="url(#g)"/>
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

export const toBase64 = (s: string) =>
    typeof window === "undefined" ? Buffer.from(s).toString("base64") : window.btoa(s);