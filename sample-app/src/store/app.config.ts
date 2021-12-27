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

// News
/**
 * News 1記事のデータ
 */
export interface NewsData {
  title: string;
  category: string;
  date: string;
}
/**
 * News カテゴリー設定
 */
export const NewsCategory = {
  ALL: "All",
  BOOK: "Book",
  AUTHOR: "Author"
} as const;

//ABOUT
/**
 * Aboutカルーセル
 */
export interface CarouselAboutData {
  src: string;
  srcL: string;
  alt: string;
}
/**
 * About目次データ
 */
export interface ChapterData {
  category: string;
  title: string;
}
export interface ChapterDetailData {
  index: string;
  title: string;
  subList?: string[];
  detailHtml: string;
}
// Faq
/**
 * Faq 1つのQ&A
 */
export interface FaqData {
  question: string;
  answer: string;
}
