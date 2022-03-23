const logoLoader = ({ src, width }: { src: string; width: number }): string =>
  `https://robohash.org/${src}?set=set4&bgset=&size=${width}x${width}`;

export default logoLoader;
