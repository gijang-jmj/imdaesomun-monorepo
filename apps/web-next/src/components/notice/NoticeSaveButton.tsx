'use client';

import { IconBookmark } from '../icons/IconBookmark';
import { IconBookmarkCheck } from '../icons/IconBookmarkCheck';

interface NoticeSaveButtonProps {
  isSaved: boolean;
  saveButtonClass: string;
  saveButtonText: string;
  onClick: () => void;
}

const NoticeSaveButton = ({
  isSaved,
  saveButtonClass,
  saveButtonText,
  onClick,
}: NoticeSaveButtonProps) => {
  return (
    <button
      className={`flex h-12 flex-3/12 cursor-pointer items-center justify-center gap-1 rounded-xl px-4 py-2 transition-colors md:flex-1 ${saveButtonClass}`}
      onClick={onClick}
    >
      <span className="text-body hidden md:inline-block">{saveButtonText}</span>
      {isSaved ? (
        <IconBookmarkCheck className="w-4" />
      ) : (
        <IconBookmark className="w-4" />
      )}
    </button>
  );
};

export default NoticeSaveButton;
