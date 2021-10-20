import { BnrData } from "@/store/app.config";

export class AppData {
  //MV
  public static heroDataList: HeroData[] = [
    {
      page: "Top",
      headingHtml: '<b><span>現場で使える</span></b><span class="PageHero__headingEn">Vue.js 3.X</span><span>実践ガイド</span>',
      descHtml: "Vew.js 3.xで実践する<br />クリエイティブ＆テクノロジーの手法を解説！<br />PWA対応、Firebase連携、Three.js組み込みなど<br />モダンな開発に使える現場のノウハウが満載！",
      cls: "-home"
    },
    {
      page: "About",
      headingHtml: "About",
      descHtml: "本書を徹底解剖！<br />目次の紹介とともに、<br />学んでいただきたい内容や意図をご紹介します。",
      cls: "-about"
    },
    {
      page: "Author",
      headingHtml: "Author",
      descHtml: "Webと映像を融合して、<br />世界にひとつのモノづくりを提供する。<br />MONSTER DIVEは、<br />「職人的なこだわりとオタク的な探究心」を持つ<br />プロフェッショナル＆スペシャリスト集団です。",
      cls: "-author"
    },
    {
      page: "Production note",
      headingHtml: "Production<br>note",
      descHtml: "本書執筆にあたって、<br />プロジェクト始動から販売/公開までの裏側を<br />プロジェクトメンバーが会話形式で暴露しています。",
      cls: "-note"
    },
    {
      page: "Q&A",
      headingHtml: "Q&A",
      descHtml: "本書やMONSTER DIVEについて、<br />よくある質問とその回答をご紹介します。",
      cls: "-qa"
    },
    {
      page: "NotFound",
      headingHtml: "NotFound",
      descHtml: "NotFound",
      cls: "-none"
    }
  ];
  // FOOTER
  public static bannerDataList: BnrData[] = [
    {
      src: "/img/banner-monsterdive.png",
      href: "https://www.monster-dive.com/",
      alt: "バナー：株式会社 MONSTER DIVE"
    },
    {
      src: "/img/banner-C&R.png",
      href: "https://www.c-r.com/",
      alt: "バナー：株式会社 C&R研究所"
    }
  ];
}