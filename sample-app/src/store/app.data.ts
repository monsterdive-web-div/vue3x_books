import { HeroData, BnrData, ChapterData, ChapterDetailData, CarouselAboutData, FaqData } from "@/store/app.config";

export class AppData {
  //COMMON
  public static appTitle = "現場で使えるVue.js 3.X 実践ガイド";
  public static newsPath = "http://localhost:3001/wp-json/wp/v2/posts/";
  public static newsCategoriesPath = "http://localhost:3001/wp-json/wp/v2/categories/";
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

  // ABOUT
  public static chapterDataList: ChapterData[] = [
    {
      category: "CHAPTER 01",
      title: "ベースとなる知識の確認〜導入編"
    },
    {
      category: "CHAPTER 02",
      title: "ベースとなるWebサイトの作成〜基本編"
    },
    {
      category: "CHAPTER 03",
      title: "機能的なWebサイトの作成〜実践編"
    },
    {
      category: "CHAPTER 04",
      title: "魅力的なWebアプリの作成〜応用編"
    }
  ];
  public static chapterDetailDataList2: ChapterDetailData[][] = [
    [
      {
        index: "001",
        title: "開発ツールを準備する",
        subList: ["本書で使用する開発ツール"],
        detailHtml: "この第1章では、Vue3.xを使うために必要となる環境の確認、本書で使用するものを中心にVue.jsの基礎知識やメソッドを説明していきます。"
      },
      {
        index: "002",
        title: "開発環境を準備する",
        subList: ["本書で使用する開発環境の構築"],
        detailHtml: "Vue.jsを使う上で必要な環境について解説していきます。"
      },
      {
        index: "003",
        title: "Vue.jsの概要を知る",
        subList: ["Vue3.xの恩恵", "Class StyleとObject Style", "各メソッド、APIなどVue 2.xからの追加・変更点", "ライフサイクルフック", "コンポーネント間の値の受け渡し", "リアクティブなプロパティの宣言（ref、reactive）"],
        detailHtml:
          "2020年秋に正式リリースされたVue3.0ですが、前項で解説した導入/インストールはこれまでのVue2.xとは大きく変わりはありません。しかし、メジャーバージョンのアップデートですので記述方式の変更、新機能の追加などVue2.xとの変更点がいくつもあります。変更点を踏まえて、Vue.jsの基本的な知識やテンプレート構文を実際に本書で用いる箇所を中心に解説していきます。"
      },
      {
        index: "004",
        title: "ディレクティブを確認する",
        subList: ["本書で主に使うディレクティブ", "その他のディレクティブ"],
        detailHtml: "Vue2.xを使い慣れている人にはおなじみでしょうが、Vue3.xにももちろんディレクティブはあります。Vue.jsのディレクティブはよくできていて、シンプルな機能、考え方をしていますのでわかりやすいと思います。使い慣れている人も念のためにおさらいしていきましょう。"
      },
      {
        index: "005",
        title: "ルーティングと状態を制御する",
        subList: ["Vue Router", "Vuex", "コラム inject / provide"],
        detailHtml:
          "ルーティングは、URLごとに違うコンポーネントを表示する機能の実装に用います。また大規模なプロジェクトになるとコンポーネントも複雑になっていき深いコンポーネントどうしのデータのやり取りは非常に複雑になるため、なるべくシンプルにデータの受け渡しなどを行うために状態管理の実装が必要になります。どちらもSPA(Single Page Application)を構築するうえで、非常に重要なところになりますので、詳しく解説していきます。"
      }
    ],
    [
      {
        index: "006",
        title: "Vue.jsを利用したWebサイト構築の流れを確認する",
        subList: ["本書で扱う制作手法", "Webサイト制作フロー", "コラム Viteとは"],
        detailHtml: "この2章では、1章で解説した導入・基礎知識をベースにVue.jsを用いて実際に一般的によくある複数ページ存在するWebサイト（本書の紹介サイト）を例に制作しながら解説していきます。"
      },
      {
        index: "007",
        title: "Webサイトの要件定義・画面設計を決める",
        subList: ["Webサイト要件定義", "Webサイト画面設計"],
        detailHtml: "まずWebサイト制作は、必要な要件を洗い出し、必要なページ・コンテンツ・機能を定義し設計するところからスタートします。コードを書き始める前に詳細かつ精度の高い設計を行うことこそ、開発をスムーズに行うために最も重要な条件と言えます。"
      },
      {
        index: "008",
        title: "Vue.jsを設計する",
        subList: ["ディレクトリ設計", "命名規則", "Vue CLI のプロジェクト作成", "Vue CLI プロジェクトのカスタマイズ"],
        detailHtml: "サイト実装の設計図にあたるディレクトリ設定を考えて、実際にVue CLIのプロジェクトを作成し、コードレベルで解説していきます。"
      },
      {
        index: "009",
        title: "コンポーネント構成を設計する",
        detailHtml: "コンポーネントを設計するコツは、一つ一つは小さく作って、ページごとに必要なコンポーネントを組み立てていくことです。そうすることで、共通する部品を使いまわすことが容易になる上に、コードのメンテナンス性も上がります。実際にコードを書いてコンポーネントの制作を解説していきます。"
      },
      {
        index: "010",
        title: "ルーティングを設定する",
        detailHtml: "Vue Routerを用いて実際にどのように設定するのかを解説しています。"
      },
      {
        index: "011",
        title: "ページ共通のコンポーネントを作る",
        subList: ["ヘッダーコンポーネント", "メニューコンポーネント", "フッターコンポーネント", "モーダルコンポーネント", "ヒーローコンポーネント"],
        detailHtml: "ページを跨いで全体で使用するコンポーネントについて、機能の洗い出しから実際のコードまで解説してきます。"
      },
      {
        index: "012",
        title: "各ページコンポーネントをつくる",
        subList: ["Topページコンポーネント", "Aboutページコンポーネント", "Authorページコンポーネント", "ProductionNoteページコンポーネント", "Q&Aページコンポーネント"],
        detailHtml: "各ページ共通のコンポーネントを1つずつ順番に解説していきます。"
      },
      {
        index: "013",
        title: "状態を管理する",
        subList: ["ページの現在地", "メニューOPEN有無", "モーダルOPEN有無 / モーダルID", "コラム TypeScriptにおける定義の仕方"],
        detailHtml: "Vuexの解説とともに、Webサイトで管理する状態（メニューの開閉やモーダル）などについて実際のコードを元に解説しています。"
      },
      {
        index: "014",
        title: "Webサイトを整える",
        subList: ["404 NotFound", "Title、Description"],
        detailHtml: "エラーページ対応や、ページ遷移によるTitle、Descriptionなどの設定について解説しています。"
      }
    ],
    [
      {
        index: "015",
        title: "開発環境の準備",
        subList: ["本章で取り扱う内容"],
        detailHtml: "第2章で制作した基本的なWebサイトをスタート地点として、実践的な機能を追加していきます。"
      },
      {
        index: "016",
        title: "外部のJavaScriptライブラリを使おう",
        subList: ["コラム ライセンスの話", "パッケージ管理システム", "GSAP", "axios"],
        detailHtml: "本書で紹介するアニメーションライブラリライブラリ、HTTPクライアントライブラリの導入から使い方まで解説しています。またコラムでライセンスについても触れています。"
      },
      {
        index: "017",
        title: "WordPressと連携する",
        subList: ["Dockerを使ってローカル開発環境を構築する", "WP REST API", "コラム カスタム投稿を追加するには？", "WP REST APIを使ってページを表示する", "ルーティングを設定して記事を表示する"],
        detailHtml: "コンテンツ管理システムとしてよく使われているWordPressについて、Dockerでのローカル環境の作成から、WP REST APIでJSON出力し、Vue.jsプロジェクト側で記事詳細を表示するまで解説しています。"
      },
      {
        index: "018",
        title: "Webサイトをアプリ化する（PWA）",
        subList: ["PWAを構成する技術", "PWAの導入", "manifest.json", "キャッシュ", "コラム オフライン時に特別な画面を表示する", "プッシュ通知"],
        detailHtml: "PWA対応として、導入からよく使われるホームスクリーンアイコンやキャッシュ管理などを解説しています。プッシュ通知については概要紹介だけで実装は【019.Firebaseと連携する】で解説しています。"
      },
      {
        index: "019",
        title: "Firebaseと連携する",
        subList: ["Firebaseの主な機能", "Firebaseのプロジェクト", "OpenID認証(Firebase Authentication)", "プッシュ通知の実装(Firebase Cloud Messaging)", "サイトを公開する（Firebase Hosting）"],
        detailHtml: "Firebaseを使うメリット、Vue.jsプロジェクトでのユーザー認証、プッシュ通知の実装、サイトの公開までを実際のコードを元に解説しています。"
      },
      {
        index: "020",
        title: "機能を拡張する（Vueプラグイン、ライブラリの紹介）",
        subList: ["本書で扱うVueプラグイン、ライブラリ", "vue3-tabs", "Swiper", "vuex-persistedstate"],
        detailHtml: "Vue3.x対応されているVueプラグインがまだ少ない中、タブ、カルーセル、ローカルストレージなど対応されているいくつかのプラグインを紹介します。"
      }
    ],
    [
      {
        index: "021",
        title: "アニメーションの種類",
        subList: ["ベクター画像（アニメーション）とラスター画像（アニメーション）", "コラム モックアップとプロトタイプ"],
        detailHtml: "第2章で構築したWebサイトをベースに、魅力的なサイトとなるように演出について解説していきます。"
      },
      {
        index: "022",
        title: "SVGアニメーションと連携しよう",
        subList: ["SVGアニメーションの手法", "CSS、SMIL", "JavaScript、SVGアニメーションライブラリ", "Anime.jsのインストール", "メニューの開閉にSVGアニメーションに適用させる"],
        detailHtml: "SVGアニメーションの手法の紹介や、メニューの開閉にSVGアニメーションを実際に実装する方法について解説しています。"
      },
      {
        index: "023",
        title: "Canvas/WebGLと連携する",
        subList: ["Three.jsをインストールする", "コラム 開発時によく使うもの", "シーン・カメラ・レンダラーを設置してオブジェクトを表示する", "マウスとの連動", "ページ遷移のアニメーション"],
        detailHtml: "3Dの代表的なライブラリであるThree.jsの導入から、シェーダを使ったアニメーション実装まで実際に解説しています。"
      }
    ]
  ];
  public static carouselAboutDataList: CarouselAboutData[] = [
    {
      src: "/img/about/about-carousel-01.png",
      srcL: "/img/about/about-carousel-01.png",
      alt: "カルーセル1枚目"
    },
    {
      src: "/img/about/about-carousel-02.png",
      srcL: "/img/about/about-carousel-02.png",
      alt: "カルーセル2枚目"
    },
    {
      src: "/img/about/about-carousel-03.png",
      srcL: "/img/about/about-carousel-03.png",
      alt: "カルーセル3枚目"
    },
    {
      src: "/img/about/about-carousel-04.png",
      srcL: "/img/about/about-carousel-04.png",
      alt: "カルーセル4枚目"
    },
    {
      src: "/img/about/about-carousel-05.png",
      srcL: "/img/about/about-carousel-05.png",
      alt: "カルーセル5枚目"
    }
  ];
  //  FAQ
  public static faqDataList: FaqData[] = [
    {
      question: "書籍を購入したい",
      answer:
        '一般の書店、もしくはネット書店（Amazon）よりご購入ください。<br><a href="https://www.amazon.co.jp/dp/4863543522" target="_blank">Amazonで購入する</a> | <a href="https://bit.ly/3w3xdgY" target="_blank">HMV&BOOKS onlineで購入する</a> | <a href="https://books.rakuten.co.jp/rb/16729323/" target="_blank">楽天ブックスで購入する</a> | <a href="https://www.yodobashi.com/product/100000009003430352/" target="_blank">ヨドバシ.comで購入する</a>'
    },
    {
      question: "正誤表を見たい",
      answer: '書籍をご利用いただく中で、間違いではないかと思われる箇所が見つかった場合は、お手数をおかけ致しますが、株式会社 C&R研究所の訂正情報ページをご確認ください。<br><a href="https://www.c-r.com/reader/reader_errata.html" target="_blank">訂正情報（株式会社 C&R研究所サイトへ）</a>'
    },
    {
      question: "サンプルファイルをダウンロードしたい",
      answer: 'サンプルファイルは、GitHubよりダウンロードいただけます。<br><a href="https://github.com/monsterdive-web-div/vue3x_books" target="_blank">GitHub</a>'
    },
    {
      question: "書籍について技術的な質問をしたい",
      answer: "大変恐縮ですが、書籍についての技術的な質問にはお答えしておりません。間違いではないかと思われる箇所については、株式会社 C&R研究所の訂正情報ページをご確認ください。"
    },
    {
      question: "海外からでも購入することはできる？",
      answer: "一般書店でのお取り扱いは日本国内のみとなります。<br>ネット書店でご購入いただく場合は、各サイトごとに配送サービスが異なりますので、予めお調べください。"
    },
    {
      question: "Vue.jsを用いた開発を依頼したい",
      answer: '業務のご依頼やご相談は、MONSTER DIVE の「問い合わせフォーム」からお問い合わせください。<br><a href="https://www.monster-dive.com/contact/form_business.php" target="_blank">業務のご相談</a>'
    },
    {
      question: "テックイベントや勉強会に登壇してもらいたい",
      answer: '登壇のご依頼やご相談は、MONSTER DIVE の「問い合わせフォーム」からお問い合わせください。<br><a href="https://www.monster-dive.com/contact/form_business.php" target="_blank">登壇のご相談</a>'
    },
    {
      question: "執筆者と一緒に働きたい",
      answer: 'MONSTER DIVEへの求人エントリーをご検討の方は、各職種の募集要項をご確認の上、以下からお問い合わせください。<br><a href="https://www.monster-dive.com/contact/form_job.php" target="_blank">求人エントリー</a>'
    }
  ];
}
