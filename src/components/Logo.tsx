type LogoProps = {
  className?: string;
  width?: number;
  height?: number;
};

export default function Logo({ className, width, height }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="Ορθόλεξο — εκμάθηση ελληνικής ορθογραφίας. Μάθε να γράφεις σωστά!"
      className={className}
      width={width}
      height={height}
      decoding="async"
    />
  );
}
