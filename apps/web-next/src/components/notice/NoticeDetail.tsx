'use client';

import { useState } from 'react';
import { IconDate } from '@/components/icons/IconDate';
import { IconDepartment } from '@/components/icons/IconDepartment';
import { IconView } from '@/components/icons/IconView';
import { IconLink } from '@/components/icons/IconLink';
import {
  formatDate,
  formatNumberWithComma,
  splitByNewline,
} from '@imdaesomun/shared/utils/format-util';
import { getNoticeCorporationTypeKor } from '@imdaesomun/shared/helpers/notice-helper';
import NoticeSaveButton from './NoticeSaveButton';
import { Notice } from '@imdaesomun/shared/types/notice';
import { postToUrl } from '@imdaesomun/shared/utils/link-util';
import { useNoticeSaved } from '@/hooks/useNoticeSaved';

interface NoticeDetailProps {
  id: string;
  notice: Notice;
}

export const NoticeDetail = ({ id, notice }: NoticeDetailProps) => {
  const [showAllFiles, setShowAllFiles] = useState(false);
  const { isSaved, handleSaveClick } = useNoticeSaved(id);

  const visibleFiles =
    showAllFiles || notice.files.length <= 2
      ? notice.files
      : notice.files.slice(0, 2);

  const hiddenFilesCount = notice.files.length - visibleFiles.length;

  const showMoreFilesText = showAllFiles
    ? '첨부파일 접기'
    : `첨부파일 더보기(${hiddenFilesCount})`;

  const saveButtonClass = isSaved
    ? 'bg-teal-500-10 text-teal-500 hover:bg-teal-200'
    : 'bg-gray-500-10 text-gray-500 hover:bg-gray-300';

  const saveButtonText = isSaved ? '저장됨' : '저장하기';

  const openPostFileLink = (fileId: string, fileLink: string) => {
    postToUrl(fileLink, {
      attachNo: fileId,
    });
  };

  return (
    <div className="mx-4 mt-2 mb-24 rounded-xl bg-white p-4 shadow-sm transition-colors md:p-6">
      <div className="mb-4 flex flex-col gap-2 border-b border-gray-100 pb-4">
        <div className="flex flex-col">
          <span className="text-body-bold text-teal-500">
            {getNoticeCorporationTypeKor(notice.corporation)}
          </span>
          <span className="text-subtitle-bold">{notice.title}</span>
        </div>
        <div className="flex flex-wrap gap-x-3">
          <div className="flex items-center gap-1">
            <IconDate className="w-4 text-gray-500" />
            <span className="text-body text-gray-500">
              {formatDate(notice.regDate)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <IconView className="w-4 text-gray-500" />
            <span className="text-body text-gray-500">
              {formatNumberWithComma(notice.hits)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <IconDepartment className="w-4 text-gray-500" />
            <span className="text-body text-gray-500">{notice.department}</span>
          </div>
        </div>
      </div>
      <div className="mb-4 flex flex-col items-start gap-2 border-b border-gray-100 pb-4">
        <p className="text-label-bold text-gray-500">
          첨부파일 <span className="text-caption">* 미리보기만 제공해요</span>
        </p>
        {notice.files.length === 0 ? (
          <span className="text-body text-gray-500">첨부파일 없음</span>
        ) : (
          visibleFiles.map((file, index) => (
            <div key={index}>
              {file.fileId ? (
                <button
                  onClick={() => openPostFileLink(file.fileId!, file.fileLink)}
                  className="text-body cursor-pointer text-start text-teal-500 underline"
                >
                  {file.fileName}
                </button>
              ) : (
                <a
                  href={file.fileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body cursor-pointer text-start text-teal-500 underline"
                >
                  {file.fileName}
                </a>
              )}
            </div>
          ))
        )}
        {notice.files.length > 2 && (
          <button
            onClick={() => setShowAllFiles(!showAllFiles)}
            className="text-label cursor-pointer text-teal-500"
          >
            {showMoreFilesText}
          </button>
        )}
      </div>
      <div className="text-body mb-8 flex flex-col gap-4 break-all">
        {notice.contents.map((content, index) => (
          <div key={index} className="flex flex-col gap-4">
            {splitByNewline(content).map((line, lineIndex) => (
              <p key={lineIndex}>{line}</p>
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <a
          href={notice.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-9/12 cursor-pointer items-center justify-center gap-1 rounded-xl bg-teal-500 px-4 py-2 text-white transition-colors hover:bg-teal-600 md:flex-1"
        >
          <span className="text-body">공고 열기</span>
          <IconLink className="w-4" />
        </a>
        <NoticeSaveButton
          isSaved={isSaved}
          saveButtonClass={saveButtonClass}
          saveButtonText={saveButtonText}
          onClick={() => handleSaveClick(id, isSaved)}
        />
      </div>
    </div>
  );
};
