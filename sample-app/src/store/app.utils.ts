import { NewsData, NewsCategory } from "@/store/app.config";
// News
/**
 * セットされたカテゴリーでフィルタリングして返す
 * @param newsData
 * @param category
 */
export const getCategoryNewsData = (newsData: NewsData[], category: string): NewsData[] => {
  const retDataList: NewsData[] = [];
  for (const data of newsData) {
    if (category === NewsCategory.ALL || data.category === category) retDataList.push(data);
  }
  return retDataList;
};
/**
 * datetime属性用に変換
 * @param dateStr
 */
export const getDataDateTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
