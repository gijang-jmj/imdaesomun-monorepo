import Image from 'next/image';
import IhPng from '@imdaesomun/assets/icons/ih.png';

export const IconIh = ({ className }: { className?: string }) => {
  return <Image className={className} src={IhPng} alt="Icon IH" />;
};
