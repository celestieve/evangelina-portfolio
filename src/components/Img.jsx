import SIZES from '../image-sizes.json';

// <img> for files made by `npm run images`: adds the 800px version to srcset
// and the real width/height so the browser can reserve space while it loads.
export default function Img({ src, sizes = '(max-width: 760px) 100vw, 50vw', ...rest }) {
  const name = src.split('/').pop().replace(/\.webp$/, '');
  const dim = SIZES[name];
  const srcSet = dim?.small ? `${src.replace(/\.webp$/, `-${dim.small}.webp`)} ${dim.small}w, ${src} ${dim.width}w` : undefined;
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={dim?.width}
      height={dim?.height}
      decoding="async"
      {...rest}
    />
  );
}
