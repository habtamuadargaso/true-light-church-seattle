interface PlayGlyphProps {
  size?: number;
}

export default function PlayGlyph({ size = 48 }: PlayGlyphProps) {
  const triangleSize = size * 0.34;
  return (
    <span
      className="flex items-center justify-center rounded-full bg-gold/90"
      style={{ width: size, height: size }}
    >
      <span
        className="ml-1 block"
        style={{
          width: 0,
          height: 0,
          borderTop: `${triangleSize * 0.6}px solid transparent`,
          borderBottom: `${triangleSize * 0.6}px solid transparent`,
          borderLeft: `${triangleSize}px solid #0b1f3a`,
        }}
      />
    </span>
  );
}
