import {createGlobalStyle} from 'styled-components';
export const GlobalStyle = 
createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, 
  del, dfn, img, ins, kbd, q, s, samp,
  small, strike, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  @font-face {font-family: "iconfont";
  src: url('./statics/iconfont/iconfont.eot?t=1543320344114'); /* IE9*/
  src: url('./statics/iconfont/iconfont.eot?t=1543320344114#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
  url('./statics/iconfont/iconfont.ttf?t=1543320344114') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('./statics/iconfont/iconfont.svg?t=1543320344114#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

`;