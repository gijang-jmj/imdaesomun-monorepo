export const Modal = {
  /**
   * modal : login
   *
   * path : /login
   *
   * description : 로그인 모달
   */
  LOGIN: '/login',

  /**
   * modal : profile
   *
   * path : /profile
   *
   * description : 프로필 모달
   */
  PROFILE: '/profile',
} as const;

export type ModalValueType = (typeof Modal)[keyof typeof Modal];
