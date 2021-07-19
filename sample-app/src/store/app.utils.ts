import { NewsData, NewsCategory } from "@/store/app.config";
// News
/**
 * セットされたカテゴリーでフィルタリングして返す
 * @param newsData
 * @param category
 */
export const getCategoryNewsData = (newsData: NewsData[], category: number): NewsData[] => {
  const retDataList: NewsData[] = [];
  for (const data of newsData) {
    if (category === NewsCategory.ALL || data.categories[0] === category) retDataList.push(data);
  }
  return retDataList;
};

/**
 * datetime属性用に変換
 * @param dateStr 2021-03-22T10:10:34
 */
export const getDataDateTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
export const getCategoryStr = (catId: number): string => {
  if (catId == NewsCategory.BOOK) {
    return "BOOK";
  } else if (catId == NewsCategory.AUTHOR) {
    return "AUTHOR";
  } else {
    return "ALL";
  }
};
export const findObjectByKey = (array: object[], key: keyof object, value: string): object => {
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
  return {};
};
