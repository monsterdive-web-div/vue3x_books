import { NewsData, NewsCategory } from "@/store/app.config";
import * as THREE from "three";
import SimplexNoise from "simplex-noise";
// News
/**
 * セットされたカテゴリーでフィルタリングして返す
 * @param newsData
 * @param category
 */
export const getCategoryNewsData = (newsData: NewsData[], category: number): NewsData[] => {
  const retDataList: NewsData[] = [];
  for (const data of newsData) {
    if (category === NewsCategory.ALL || data.category === category) retDataList.push(data);
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

const simplex = new SimplexNoise(Math.random);

function clamp(a: number) {
  return Math.max(0, Math.min(1, a));
}
/**
MIT License

Copyright (c) 2009 - 2020 [Codrops](https://tympanus.net/codrops)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
export const getGeometry = (detail: number, offsettop: number): THREE.BufferGeometry => {
  offsettop = offsettop || 0;
  const geometry = new THREE.BufferGeometry();
  const number = detail;
  const width = 2;
  const height = 2;

  const gran = width / number;
  const granH = (gran * Math.sqrt(3)) / 2;
  const rows = height / granH;

  const offsets = [];
  const positions = [];
  const centroids = [];
  const control0 = [];
  const control1 = [];
  const randoms = [];
  const uvs = [];
  let currentShift = 0;
  const bary = [];
  let currentheight = 0;
  const scale = 2;

  for (let j = 0; j < rows; j++) {
    currentheight = j * granH;
    if (j % 2 === 1) {
      currentShift = -gran / 2;
    } else {
      currentShift = 0;
    }
    for (let i = 0; i <= number; i++) {
      const sign = Math.sign(i * gran + currentShift - width / 2);
      // first triangle
      positions.push(i * gran + currentShift - width / 2, currentheight - height / 2, 0);
      uvs.push((i * gran + currentShift) / width, currentheight / height);
      positions.push(i * gran + gran / 2 + currentShift - width / 2, granH + currentheight - height / 2, 0);
      uvs.push((i * gran + gran / 2 + currentShift) / width, (granH + currentheight) / height);
      positions.push(i * gran - gran / 2 + currentShift - width / 2, granH + currentheight - height / 2, 0);
      uvs.push((i * gran - gran / 2 + currentShift) / width, (granH + currentheight) / height);

      let simp = simplex.noise2D(i / rows, j / rows) + Math.random();
      const o = clamp(currentheight / height + (2 * simp) / detail);
      let r = Math.random();
      offsets.push(o, clamp(o + 0.1 * offsettop), clamp(o + 0.1 * offsettop));
      randoms.push(r, r, r);
      const c = [i * gran + currentShift - width / 2, currentheight - height / 2, 0];
      centroids.push(...c, ...c, ...c);

      const ctrl0 = [scale * sign * THREE.MathUtils.randFloat(-0.3, 0.3), -scale * THREE.MathUtils.randFloat(-0.3, 0.3) * 1.5, -THREE.MathUtils.randFloatSpread(0.5)];
      const ctrl1 = [scale * sign * THREE.MathUtils.randFloat(0.3, 0.6), -scale * THREE.MathUtils.randFloat(0.3, 0.6) * 1.5, -THREE.MathUtils.randFloatSpread(0.5)];
      control0.push(...ctrl0, ...ctrl0, ...ctrl0);
      control1.push(...ctrl1, ...ctrl1, ...ctrl1);

      bary.push(0, 0, 1, 0, 1, 0, 1, 0, 0);
      // second triangle
      positions.push(i * gran + currentShift - width / 2, currentheight - height / 2, 0);
      uvs.push((i * gran + currentShift) / width, currentheight / height);
      positions.push(i * gran + gran + currentShift - width / 2, currentheight - height / 2, 0);
      uvs.push((i * gran + gran + currentShift) / width, currentheight / height);
      positions.push(i * gran + gran / 2 + currentShift - width / 2, granH + currentheight - height / 2, 0);
      uvs.push((i * gran + gran / 2 + currentShift) / width, (granH + currentheight) / height);

      simp = simplex.noise2D((i + 1) / rows, j / rows) + Math.random();
      const o1 = clamp(currentheight / height + (2 * simp) / detail);
      r = Math.random();
      offsets.push(o1, o1, clamp(o1 + 0.1 * offsettop));
      randoms.push(r, r, r);
      const c1 = [i * gran + currentShift - width / 2, currentheight - height / 2, 0];

      control0.push(...ctrl0, ...ctrl0, ...ctrl0);
      control1.push(...ctrl1, ...ctrl1, ...ctrl1);

      centroids.push(...c1, ...c1, ...c1);
      bary.push(0, 0, 1, 0, 1, 0, 1, 0, 0);
    }
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));
  geometry.setAttribute("bary", new THREE.BufferAttribute(new Float32Array(bary), 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(uvs), 2));
  geometry.setAttribute("offset", new THREE.BufferAttribute(new Float32Array(offsets), 1));
  geometry.setAttribute("centroid1", new THREE.BufferAttribute(new Float32Array(centroids), 3));
  geometry.setAttribute("control0", new THREE.BufferAttribute(new Float32Array(control0), 3));
  geometry.setAttribute("control1", new THREE.BufferAttribute(new Float32Array(control1), 3));
  geometry.setAttribute("random", new THREE.BufferAttribute(new Float32Array(randoms), 1));

  return geometry;
};
export const getCategoryStr = (catId: number): string => {
  if (catId == NewsCategory.BOOK) {
    return "Book";
  } else if (catId == NewsCategory.AUTHOR) {
    return "Author";
  } else {
    return "All";
  }
};
export const getCategoryNum = (catName: string): number => {
  if (catName == "Book") {
    return NewsCategory.BOOK;
  } else if (catName == "Author") {
    return NewsCategory.AUTHOR;
  } else {
    return NewsCategory.ALL;
  }
};
export const findObjectByKey = (array: object[], key: keyof object, value: number): object => {
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
  return {};
};
