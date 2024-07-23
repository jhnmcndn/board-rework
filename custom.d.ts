declare namespace JSX {
  interface IntrinsicElements {
    marquee: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      behavior?: string;
      direction?: string;
      scrollDelay?: string;
    };
  }
}
