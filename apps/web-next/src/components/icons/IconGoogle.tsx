import Image from 'next/image';
import googlePng from '@imdaesomun/assets/icons/google.png';

export const IconGoogle = ({ className }: { className?: string }) => {
  return <Image className={className} src={googlePng} alt="Icon Google" />;
};
