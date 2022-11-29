const ap_module = {
  // footer
  tryingLimit: 20,
  removeFooter() {
    const footers = [
      {
        // newsup
        class: "footer .mg-footer-copyright .row p",
        text: "Proudly powered by WordPress | Theme: Newsup by Themeansar."    
      },
      {
        // default mag
        class: "footer#colophon .site-info",
        text: "Copyright All right reserved Theme: Default Mag by ThemeInWP"    
      },
      {
        // chrome news
        class: ".site-info .col-1.color-pad",
        text: "Copyright © All rights reserved. | ChromeNews by AF themes."    
      },
      {
        // newsment
        class: ".site-info .row .col-sm-12",
        text: "Copyright © Wszystkie prawa zastrzeżone. | CoverNews by AF themes."    
      },
      {
        // maxnews
        class: ".mg-footer-copyright .col-md-6.text-xs p",
        text: "Proudly powered by WordPress | Theme: Max News by Themeansar."
      },
      {
        // blook
        class: "footer .blook-container .site-info",
        text: "Copyright © 2022 krakowzprzewodnikiem.pl. All rights reserved. | Theme: Blook By Themeinwp. | Powered by WordPress"
      },
      {
        // oceanly news dark
        class: "footer.site-footer .footer-bottom-area-wrap.c-wrap",
        text: "Copyright © 2022 urumcajsa.pl.\n\nTheme: Oceanly News Dark by ScriptsTown"
      },
      {
        // intimate
        class: "footer.site-footer .copyright",
        text: "COPYRIGHT ALL RIGHTS RESERVED 2022 THEME: INTIMATE BY TEMPLATE SELL."
      },
      {
        // newsment pl
        class: "footer.site-footer .site-info .col-sm-12",
        text: "Copyright © All rights reserved. | CoverNews by AF themes."
      },
    ] 
    for( const foot of footers ){
      const footer = document.querySelector(foot.class)
      if(footer != null && footer.innerText == foot.text){
        footer.innerHTML = "&nbsp;&nbsp;&nbsp;Made with ❤️ by " + location.host
        return true
      }
    }
    return false
  },
  async inPromise( functionName ) {
    return await new Promise( res => {
      const interval = setInterval(()=>{
        const resp = this[functionName]()
        if(resp || this.tryingLimit < 1){
          clearInterval(interval)
          res( resp )
        }
        this.tryingLimit--
      },200)
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
        html body {
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




    document.head.append( style )
  },
  runWhenPageIsReady() {
    window.addEventListener('load', async () => {
      this.plFontSwap()
      this.makeCookiesPopup()
      await this.inPromise('removeFooter')
    })
  }
}
ap_module.runWhenPageIsReady()