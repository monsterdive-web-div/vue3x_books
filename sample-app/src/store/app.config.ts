/**
 * MVデータ
 */
export interface HeroData {
  page: string;
  headingHtml: string;
  descHtml: string;
  cls: string;
}
/**
 * バナーデータ
 */
export interface BnrData {
  src: string;
  href: string;
  alt: string;
}
/**
 * MODAL設定
 */
 export const ModalId = {
  NONE: -1
} as const;
/**
 * DispatchType
 */
export const DispatchType = {
  MENU_OPEN: "menuOpen",
  MENU_CLOSE: "menuClose",
  MENU_TOGGLE: "menuToggle",
  MODAL_OPEN: "modalOpen",
  MODAL_CLOSE: "modalClose",
  SET_MODAL: "setModal",
  SET_PAGE: "setPage"
} as const;

/**
 * Aboutカルーセル
 */
export interface CarouselAboutData {
  src: string;
  srcL: string;
  alt: string;
}
