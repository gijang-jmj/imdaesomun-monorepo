import Image from 'next/image';
import BmcPng from '@imdaesomun/assets/icons/bmc.png';

export const IconBmc = ({ className }: { className?: string }) => {
  return <Image className={className} src={BmcPng} alt="Icon BMC" />;
};
