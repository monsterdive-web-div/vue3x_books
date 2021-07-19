<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import PageBreadcrumbs from "@/components/pages/PageBreadcrumbs.vue";
import firebase from "firebase";
import { FirebaseAuth } from "@/firebase/auth";

export default defineComponent({
  name: "ProductionNote",
  components: {
    PageBreadcrumbs
  },
  setup() {
    const state = reactive({
      loginStatus: false
    });
    onMounted(() => {
      FirebaseAuth.onAuthStateChanged(user => {
        if (user) {
          console.log("ログインしています。");
          state.loginStatus = true;
        } else {
          console.log("ログインしていません。");
          state.loginStatus = false;
        }
      });
    });
    const onSignInGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      FirebaseAuth.signInWithPopup(provider)
        .then(() => {
          console.log("ログインしました。");
          state.loginStatus = true;
        })
        .catch(error => {
          const signinError = `
        サインインエラー
        エラーメッセージ： ${error.message}
        エラーコード: ${error.code}
        `;
          console.log(signinError);
        });
    };
    const onSignInFacebook = () => {
      const provider = new firebase.auth.FacebookAuthProvider();
      FirebaseAuth.signInWithPopup(provider)
        .then(() => {
          console.log("ログインしました。");
          state.loginStatus = true;
        })
        .catch(error => {
          const signinError = `
        サインインエラー
        エラーメッセージ： ${error.message}
        エラーコード: ${error.code}
        `;
          console.log(signinError);
        });
    };
    const onSignInTwitter = () => {
      const provider = new firebase.auth.TwitterAuthProvider();
      FirebaseAuth.signInWithPopup(provider)
        .then(result => {
          state.loginStatus = true;
          const user = result.user;
          console.log(">>onSignInTwitter | ログインしました。user", user);
        })
        .catch(error => {
          const signinError = `
      サインインエラー
      エラーメッセージ： ${error.message}
      エラーコード: ${error.code}
      `;
          console.log(signinError);
        });
    };
    const onSignOut = () => {
      FirebaseAuth.onAuthStateChanged(user => {
        FirebaseAuth.signOut()
          .then(() => {
            console.log("ログアウトしました");
            state.loginStatus = false;
            console.log(user);
            location.reload();
          })
          .catch(error => {
            console.log(`ログアウト時にエラーが発生しました (${error})`);
          });
      });
    };
    return {
      onSignInGoogle,
      onSignInFacebook,
      onSignInTwitter,
      onSignOut,
      ...toRefs(state)
    };
  }
});
</script>

<template>
  <PageBreadcrumbs label="Production note" />
  <section class="ProductionNote">
    <h2 v-if="!loginStatus" class="ProductionNote__heading">
      <span>Production Noteを⾒るには</span>
      <span>ログインが必要です。</span>
    </h2>
    <div class="ProductionNote__inner">
      <ul class="ProductionNote__buttons">
        <li class="ProductionNote__buttonItem">
          <button type="button" class="ProductionNote__button" @click="onSignInFacebook" v-if="!loginStatus">
            <span class="-facebook">Facebook ID</span>
            でLogin
          </button>
          <button type="button" class="ProductionNote__button" @click="onSignOut" v-if="loginStatus">
            ログアウト
          </button>
        </li>
        <li class="ProductionNote__buttonItem" v-if="!loginStatus">
          <button type="button" class="ProductionNote__button" @click="onSignInTwitter">
            <span class="-twitter">Twitter ID</span>
            でLogin
          </button>
        </li>
        <li class="ProductionNote__buttonItem" v-if="!loginStatus">
          <button type="button" class="ProductionNote__button" @click="onSignInGoogle">
            Google ID でLogin
          </button>
        </li>
      </ul>
    </div>
  </section>
  <section v-if="loginStatus" class="Talk">
    <h2 class="Talk__title">本書籍を出版するあたって</h2>
    <p class="Talk__paragraph">
      MONSTER DIVE がなぜWebのナレッジコミュニティなどではなくVue.jsの書籍を出版したのか。
      <br />
      書籍出版に至るまでの制作裏話を、プロジェクトチームメンバーにインタビューしました。
    </p>
    <section class="Talk__interviewee">
      <h3 class="Talk__intervieweeHead">インタビュー参加者プロフィール</h3>
      <dl class="Talk__intervieweeList">
        <dt class="Talk__intervieweeName">RKY</dt>
        <dd class="Talk__intervieweeBio">
          取締役 / WEBプロダクション事業部長、 出版社やフリーランスの立場で紙媒体を手掛けた後、Web業界に転身。 プロデューサー／WEBプロダクション事業部長。浦和レッズサポ歴27年。
        </dd>
        <dt class="Talk__intervieweeName">ARK</dt>
        <dd class="Talk__intervieweeBio">
          取締役 / クリエイティブディレクター / チーフクリエイター、 自動車会社、映像製作会社、放送局、Web制作会社、フリーランスを経てMDに参加。
        </dd>
        <dt class="Talk__intervieweeName">YAM</dt>
        <dd class="Talk__intervieweeBio">
          WEBプロダクション事業部 フロントエンドエンジニア、 アニメーターとして就職後、美術系大学を卒業。Webクリエイターに転身後は、フロントエンドを中心に設計・開発を担当。 半径100kmなら自転車で移動したい人。
        </dd>
        <dt class="Talk__intervieweeName">MMR</dt>
        <dd class="Talk__intervieweeBio">
          WEBプロダクション事業部 マークアップエンジニア、 学校卒業後ずっとWeb業界で活動してきた生粋のWebエンジニア。堅実なマークアップが持ち味。 ゲーマーとしての腕はまだ社内に見せていない。
        </dd>
      </dl>
    </section>
    <section class="Talk__section">
      <h3 class="Talk__heading">WEBプロダクションが「紙」へのチャレンジ</h3>
      <h4 class="Talk__subHeading">なぜ、Vue.js 3.X の書籍を出版することになったか？</h4>
      <p class="Talk__paragraph">
        <b>RKY</b>
        2020年春頃に、弊社の
        <a href="https://www.monster-dive.com/blog/" target="_blank">ブログ</a>
        で投稿していた記事をきっかけにC&amp;R研究所さんから書籍出版のお問い合わせをいただきました。といってもMONSTER DIVEはWeb制作会社なので、自分たちで書籍出版するといったことは当然経験がありませんでした。 ただせっかく弊社のブログがこのようなお話に発展したので、チャレンジしてみたいという気持ちと MONSTER
        DIVEの制作会社としてのPRにも有用できるのではないかという判断でプロジェクトをスタートしました。
      </p>
      <p class="Talk__paragraph">
        <b>ARK</b>
        弊社では決まったJSフレームワークを使うという決まりはなく品質や保守運用性を担保しつつも好き好きなものを使用していますが、Vue.jsは日本ではjQueryのように日本では誰もが知っているワードとなっていますので、Vue3.xのタイミングで社内向けへの資料としても何かまとまったものがあってもいいな。と思っていたところでしたので、ちょうどいいタイミングでお声がけしていただき、それならば社内だけでなく、ナレッジシェアしようかという話になりました。
      </p>
      <h4 class="Talk__subHeading">書籍の内容はどのように決まっていったか？</h4>
      <p class="Talk__paragraph">
        <b>RKY</b>
        軸としては「中級者向けに対しての技術書」に設定しました。理由としてはシンプルで、 既に初心者向けの書籍が出版されていたというのと、入門編は別軸でお話が進んでいるというお話を共有いただいていたので。
      </p>
      <p class="Talk__paragraph">
        <b>ARK</b>
        一般的な書籍って基本的なメソッドを使って、アプリ作っておしまい。という参考書のようなものが多い印象なので、「Vue.jsはアプリだけ作るものではないよね」という方針で章立てを組んでいきました。「実践で使える」書籍っていうのは非常に少ないんですよね。そこを制作会社 MONSTER
        DIVEとしての概念や使い方を紹介することで、より「実践的」な書籍になったのかなと感じています。
      </p>
      <h4 class="Talk__subHeading">Vue.jsと他のフレームワークで大きな違いは？</h4>
      <p class="Talk__paragraph">
        <b>ARK</b>
        まず、手軽さというか導入しやすいですよね。どちらかというとVue.jsはマークアップ思考のツールなので、プログラミングがよくわかっていなくても使い易いですよね。
      </p>
      <p class="Talk__paragraph">
        <b>YAM</b>
        そうですね、私もARKと似てしまいますが、その他のJSフレームワークだとサイト全体に組み込まないといけないけど、Vue.jsだとモジュール、パーツ単位で使えるので導入しやすいところが良いところかと思います。
      </p>
      <p class="Talk__paragraph">
        <b>MMR</b>
        お二人と同じにはなりますが、Vue.jsは「とっつきやすい」ですよね。多くの人が手軽に触れるからこそトレンドになりますし、コミュニティも大きくなります。コミュニティが大きくなれば技術記事の情報量が豊富になるので、また新たな人に触れられる機会が多くなる。「とっつきやすい」っていうのは大事ですね。
      </p>
      <h3 class="Talk__heading">今までの経験とは異なる成果物</h3>
      <h4 class="Talk__subHeading">書籍出版に至るまでで苦労した点は？</h4>
      <p class="Talk__paragraph">
        <b>ARK</b>
        Webと違って紙というというところですかね。口頭ではなくテキストで解説しないといけないというのはなかなか難しかったです。
      </p>
      <p class="Talk__paragraph">
        <b>YAM</b>
        確かにそこですね。出版されたものを加筆修正できないので、基礎となる部分の調査や裏取には時間がかかりましたね。
      </p>
      <p class="Talk__paragraph">
        <b>MMR</b>
        私はソースコードの部分をメインに担当していたので、自分が書いたソースコードが売り物になる。というプレッシャーですかね。ブラウザを通して描画されたものではなく、ピュアなコードとして見た時どう見えるのかを考えて書くのが大変でした。
      </p>
      <h4 class="Talk__subHeading">逆に良かった点は？</h4>
      <p class="Talk__paragraph">
        <b>ARK</b>
        やはり書籍を出すという経験ですね。自分の経歴として映像の成果物、Webの成果物は今まで沢山経験をしてきたけど、書籍は初めての経験でしたね。
      </p>
      <p class="Talk__paragraph">
        <b>YAM</b>
        実装する必要な部分の知見はあるのですが、執筆するにあたってスタンダードな部分を改めて情報を取り入れられたので、理解をより深められたことですかね。
      </p>
      <p class="Talk__paragraph">
        <b>MMR</b>
        苦労した点でソースコードを売るのはプレッシャーと言いましたが、売り物になるといった点ではプレッシャー越えるくらいのモチベーションになりました。あとはWebとは違って「物理的に成果物が残せる」というのはのは嬉しかったです。
      </p>
      <h3 class="Talk__heading">Vue.jsで普通のウェブサイトを作ってみよう</h3>
      <h4 class="Talk__subHeading">
        書籍と合わせてウェブサイトを構築しましたが、注目してもらいたいポイントなどは？
      </h4>
      <p class="Talk__paragraph">
        <b>ARK</b>
        ウェブアプリケーションではなく、ウェブサイトというところですかね。実践的な観点で、アプリだけではなく、普通のウェブサイトが作れるんだよ。というところは注目してもらえればと思います。
      </p>
      <p class="Talk__paragraph">
        <b>YAM</b>
        書籍と合わせて、Vue.jsと外部サービスの連携もちゃんとウェブサイトに反映しているところですかね。
      </p>
      <p class="Talk__paragraph">
        <b>MMR</b>
        私はマークアップエンジニアとして、いい意味でVue.jsのフレームワークに振り回されないように、妥協しないHTMLを書いたところですかね。
      </p>
      <h4 class="Talk__subHeading">この書籍をどんな人に読んでほしい？</h4>
      <p class="Talk__paragraph">
        <b>ARK</b>
        専門学校や入門書でVue.jsを知り、実際にWebサイトを作ってみたい人には勿論ですが、浅く広く知れるという点ではディレクターの人には最適かと思います。
      </p>
      <p class="Talk__paragraph">
        <b>YAM</b>
        単なる入門書ではなくより実践向けなので、一歩先を目指しているエンジニア1年目とかの人に読んでもらいたいですね。
      </p>
      <p class="Talk__paragraph">
        <b>MMR</b>
        Vue.jsに限ったことではないですが、フレームワークを触ってみたい、試してみたいと思いつつも今のスキルでなんとかなってしまう焦燥感みたいなものがある人とかには最適かなと思います。自分ができることの選択肢を増やすという意味でもオススメです。
      </p>
      <p class="Talk__paragraph">
        <b>RKY</b>
        ステップアップしたい人ですよね。この書籍から「制作会社の匂い」を感じていただければと思います。
      </p>
      <h4 class="Talk__subHeading">この書籍を読む読者に対してひとこと</h4>
      <p class="Talk__paragraph">
        <b>RKY</b>
        この本を読んで弊社に興味を持った方は、ぜひ MONSTER DIVE に応募してください！笑
      </p>
      <p class="Talk__paragraph">
        <b>ARK</b>
        Webは自由なので難しいことは考えず、気軽にまずは手を動かして作ってみてほしいですね。この本がきっかけの一つになってくれればなと思います。
      </p>
      <p class="Talk__paragraph">
        <b>YAM</b>
        JSフレームワークを使う第一歩として読んでいただければなと思います。
      </p>
      <p class="Talk__paragraph">
        <b>MMR</b>
        技術書を読むというのは「手元で動かすところまでセット」だと思っている方ですかね。最初はコピペで全然良くて、手触りを確かめたうえで「こうすればもっと良くなるかも」を盛り込んで、自分の土台を作ってもらいたいです。この本がその土台の一つになれば嬉しいです。
      </p>
      <h3 class="Talk__heading">最後に</h3>
      <p class="Talk__paragraph">
        まずは気軽にVue.jsに触れてみることですね。その導入サポートとして『現場で使えるVue.js 3.X 実践ガイド』を是非ご活用ください。
      </p>
      <p class="Talk__paragraph">
        <a href="https://www.amazon.co.jp/dp/4863543522" target="_blank">
          現場で使えるVue.js 3.X 実践ガイド - を購入する
        </a>
      </p>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.ProductionNote {
  margin-top: 36px;
}

.ProductionNote__heading {
  max-width: 1000px;
  margin: 0 auto;
  font-size: em(30, 16);
  line-height: 1.73;
  color: $COLOR_MAIN;
  @include lg(max) {
    padding: 0 20px;
  }
  @include md(max) {
    font-size: em(22, 16);
  }

  > span {
    display: inline-block;
  }
}

.ProductionNote__inner {
  margin-top: 60px;
  padding: 80px 0;
  background-color: #fafdf5;
  box-shadow: 0 3px 6px rgba(#000, 0.06);
  @include md(max) {
    margin-top: 30px;
    padding: 40px 20px;
  }
}

.ProductionNote__buttons {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  justify-content: center;
  @include md(max) {
    display: block;
  }
}

.ProductionNote__buttonItem {
  list-style-type: none;
  width: calc((100% - 40px) / 3);
  @include md(max) {
    width: 100%;
  }

  &:not(:first-child) {
    @include md(min) {
      margin-left: 20px;
    }
    @include md(max) {
      margin-top: 15px;
    }
  }
}

.ProductionNote__button {
  width: 100%;
  padding: 24px 0;
  display: block;
  font-size: em(20, 16);
  line-height: 1.6;
  background-color: transparent;
  border: 0 none;
  border-radius: 40px;
  box-shadow: $SHADOW_BASE;
  cursor: pointer;
  @include md(max) {
    padding: 13px 0;
    font-size: em(15, 16);
  }

  > span {
    &.-facebook {
      color: #1877f2;
    }
    &.-twitter {
      color: #1da1f2;
    }
  }
}

.Talk {
  max-width: 800px;
  margin: 70px auto 0;
  @include lg(max) {
    padding: 0 20px;
  }
}

.Talk__title {
  margin: 0;
  padding-bottom: 4px;
  font-size: em(24, 16);
  font-weight: $FONT_WEIGHT_BASE_NORMAL;
  line-height: 1.6;
  border-bottom: 2px solid $COLOR_MAIN;
}

.Talk__paragraph {
  margin: em(20, 15) 0 0;
  font-size: em(15, 16);
  line-height: 1.73;

  a {
    color: $COLOR_MAIN;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  b {
    margin-right: 1em;
    font-weight: $FONT_WEIGHT_BASE_DEMIBOLD;
  }

  em {
    font-style: normal;
    background-color: #f2ffc9;
  }
}

.Talk__interviewee {
  margin-top: 40px;
  display: flex;
  @include md(max) {
    display: block;
  }
}

.Talk__intervieweeHead {
  margin: 0 em(32, 16) 0 0;
  flex-shrink: 0;
  font-size: em(16, 16);
  @include md(max) {
    margin: 0;
  }
}

.Talk__intervieweeList {
  margin: 0;
  @include md(max) {
    margin-top: 20px;
  }
}

.Talk__intervieweeName {
  margin-bottom: 6px;
  font-size: em(10, 16);
  line-height: 1.4;
  font-weight: $FONT_WEIGHT_BASE_BOLD;

  &:not(:first-child) {
    margin-top: 24px;
  }
}

.Talk__intervieweeBio {
  margin: 0;
  font-size: em(12, 16);
}

.Talk__section {
  margin-top: 72px;
}

.Talk__heading {
  margin: 0;
  font-size: em(20, 16);
  font-weight: $FONT_WEIGHT_BASE_DEMIBOLD;
  color: $COLOR_MAIN;

  &:not(:first-child) {
    margin-top: 50px;
  }
}

.Talk__subHeading {
  position: relative;
  margin: 0;
  padding-left: 16px;
  font-size: em(16, 16);
  line-height: 1.625;
  font-weight: $FONT_WEIGHT_BASE_DEMIBOLD;

  &::before {
    content: "";
    position: absolute;
    top: 5px;
    left: 0;
    bottom: 5px;
    width: 4px;
    background-color: $COLOR_MAIN;
  }

  &:not(:first-child) {
    margin-top: 36px;
  }
}

.Talk__image {
  margin: 40px 0;
}
</style>
