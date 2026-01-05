import { Image } from '@imagekit/react';

const ImageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

export default ImageKit 