const ap_module = {
  // footer
  tryingLimit: 20,
  optimizeFooter() {
    const footers = [
      { // newsup
        class: "footer .mg-footer-copyright .row p",
        text: "Proudly powered by WordPress | Theme: Newsup by Themeansar.",
        secondColumn: ".mg-footer-widget-area .wp-block-categories",
      },
      { // default mag
        class: "footer#colophon .site-info",
        text: "Copyright All right reserved Theme: Default Mag by ThemeInWP",
        secondColumn: ".twp-footer-widget .wp-block-categories",
      },
      { // chrome news
        class: ".site-info .col-1.color-pad",
        text: "Copyright © All rights reserved. | ChromeNews by AF themes.",
        secondColumn : ".site-footer .widget_categories",   
      },
      { // dearftnews
        class: "footer#colophon .footer-copyright-wraper .site-info",
        text: "Proudly powered by WordPress | Theme: DraftNews by WalkerWP.",
        secondColumn : "footer#colophon .widget_categories",  
      },
      { // maxnews
        class: ".mg-footer-copyright .col-md-6.text-xs p",
        text: "Proudly powered by WordPress | Theme: Max News by Themeansar.",
        secondColumn : "footer .widget_categories",  
      },
      { // blook
        class: "footer .blook-container .site-info",
        text: "Copyright © 2022 krakowzprzewodnikiem.pl. All rights reserved. | Theme: Blook By Themeinwp. | Powered by WordPress",
        secondColumn : "footer .widget_categories",  
      },
      { // oceanly news dark
        class: "footer.site-footer .footer-bottom-area-wrap.c-wrap",
        text: "Copyright © 2022 urumcajsa.pl.\n\nTheme: Oceanly News Dark by ScriptsTown",
        secondColumn : "footer .widget_categories",  
      },
      { // intimate
        class: "footer.site-footer .copyright",
        text: "COPYRIGHT ALL RIGHTS RESERVED 2022 THEME: INTIMATE BY TEMPLATE SELL.",
        secondColumn : "footer .widget_categories",
      },
      { // newsment
        class: ".site-info .row .col-sm-12",
        text: "Copyright © Wszystkie prawa zastrzeżone. | CoverNews by AF themes.",
        secondColumn : "footer .widget_categories",
      },
      // {
      //   // telegram
      //   class: ".site-info .row .col-sm-12",
      //   text: "Copyright © Wszystkie prawa zastrzeżone. | CoverNews by AF themes."    
      // },
      // {
      //   // supernews
      //   class: ".site-info .row .col-sm-12",
      //   text: "Copyright © Wszystkie prawa zastrzeżone. | CoverNews by AF themes."    
      // },
    ] 
    for( const foot of footers ){
      const footer = document.querySelector(foot.class)
      if( footer?.innerText != foot.text){ continue }
      footer.innerHTML = "&nbsp;&nbsp;&nbsp;Made with ❤️ by " + location.host

      const secondColumn = document.querySelector( foot?.secondColumn )
      if( !secondColumn) { return true }

      const secColParent = secondColumn.parentElement.parentElement

      secColParent.classList.remove('col-xl-4')
      secColParent.classList.remove('col-sm-6')

      // console.log({ secColParent })
      secColParent.style.cssText = `
        display: flex !important;
        align-items:center;
        justify-content:space-around;
        margin:0 !important;
      `
      secColParent.classList.add("mg-widget")
      secColParent.classList.add("widget")

      for( const index of [0, 3]){
        const ul = document.createElement("ul")
        // console.log('setting ul')
        // ul.cssText = `
        //   list-style:none !important;
        //   flex:1 !important;
        // `
        ul.style.listStyle = 'none';
        ul.style.flex = 1;
        for( const childIndex of [0, 1, 2]){
          const child = secondColumn.children?.[0]
          if(child){
            ul.append(child)
          }
        }
        secColParent.append(ul)
      }

      secondColumn.parentElement.remove()
      secColParent.children[0].style.flex = "1"

      return true
    }
    return false
  },
  async inPromise( functionName ) {
    return await new Promise( res => {

      const resp = this[functionName]()
      if(resp || this.tryingLimit < 1){ res( resp ) }

      const interval = setInterval(()=>{

        const resp = this[functionName]()
        if(resp || this.tryingLimit < 1){ clearInterval(interval); res( resp ) }
        this.tryingLimit--

      },250)
    })
  },

  // cookies
  acceptCookies(){
    document.cookie = "ap_module_popup=true";
    document.querySelector('.customCookiesPopup').style.display = "none"
  },
  makeCookiesPopup(){
    if(this.functions.getCookie('ap_module_popup')){ return }
    const cookies = document.createElement("div")
    cookies.className = "customCookiesPopup"
    cookies.innerHTML = /*html*/`
      <style>
        .customCookiesPopup {
          position:fixed;
          display:flex;
          flex-direction:column;
          right:5px;
          bottom:5px;
          border-radius:5px;
          background:linear-gradient(#222, #444);
          font-weight:bold;
          color:#fff;
          z-index:1000000;
        }
        .customCookiesPopup p {
          text-align:center;
          margin:0;
          padding:2rem;
          padding-bottom:.25rem;
          font-size:1.2rem;
        }
        .customCookiesPopup > div {
          display:flex;
          justify-content:end;
          padding:.5rem 1rem;
        }
        .customCookiesPopup > div > a,
        .customCookiesPopup > div > .ap_module_button{
          border:3px solid #fff;
          text-decoration:none;
          padding:.25rem .75rem;
          margin:.25rem;
          border-radius:3px;
          color:inherit;
          cursor:pointer;
        }
      </style>
      <p>W celu zapewnienia wyższej jakości usług <br/>na tej stronie użyto plików cookie.</p>
      <div>
        <a href="https://ec.europa.eu/info/cookies_pl" target="_blank">Więcej</a>
        <div class="ap_module_button" onclick="ap_module.acceptCookies()"> Akceptuję </div>
      </div>
    `
    document.body.append(cookies)
  },

  // change fonts to pl
  plFontSwap(){
    const style = document.createElement("style")
    if( this.functions.getFont('h1') === 'Merriweather' ){
      style.innerHTML += `
        h1, h2, h3, h4, h5, h6, input, .twp-secondary-font {
            font-family: "sans-serif" !important;
            font-size:1.2em;
        }
      `
    }
    if( this.functions.getFont('body') === 'Source Sans Pro' ){
      style.innerHTML += `
        html body {
            color: #000;
            font-family: "sans-serif" !important;
        }
      `
    }
    if( this.functions.getFont('figcaption h3 a') === 'Roboto' ){
      style.innerHTML += `
        html, body, body h1, body h2, body h3, body h4, body h5, body h6, body .main-navigation a, body .font-family-1, body .site-description, body .trending-posts-line, body .widget-title, body .em-widget-subtitle, body .grid-item-metadata .item-metadata, body .af-navcontrols .slide-count, body .figure-categories .cat-links, body .nav-links a {
            font-family: 'Source Sans Pro',sans-serif !important;
        }
      `
    }
    if( this.functions.getFont('.entry-header h3 a') === 'Libre Franklin' ){
      style.innerHTML += `
        h1, h2, h3, h4, h5, h6, .widget_recent_entries a, .blook-single-next-post p {
            font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif; !important;
        }
      `
    }
    if( this.functions.getFont('h1') === 'Roboto' ){
      style.innerHTML += `
        html body, body h1, body h2, body h3, body h4, body h5, body h6, body .main-navigation a, body .font-family-1, body .site-description, body .trending-posts-line, body .widget-title, body .em-widget-subtitle, body .grid-item-metadata .item-metadata, body .af-navcontrols .slide-count, body .figure-categories .cat-links, body .nav-links a  {
            font-family: 'Source Sans Pro',sans-serif !important;
        }
      `
    }
    document.head.append( style )
  },

  functions : {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
    getFont(selector){
      const element = document.querySelector(selector)
      if(!element){ return false }
      return window.getComputedStyle(element).getPropertyValue('font-family').replace(/['"]+/g, '')
    }

  },
  runWhenPageIsReady() {
    window.addEventListener('load', async () => {
      this.plFontSwap()
      this.makeCookiesPopup()
      await this.inPromise('optimizeFooter')
    })
  }
}

console.log({ "ap_module" : "v_3" })

ap_module.runWhenPageIsReady()