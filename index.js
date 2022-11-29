console.log('hi6')
const ap_module = {
  tryingLimit: 10,
  removeFooter() {
    const footers = [
      {
        class: ".site-footer.twp-footer.footer-active.show",
        text: "Copyright All right reserved Theme: Default Mag by ThemeInWP"    
      }

    ] 
    for( const foot of footers ){
      const footer = document.querySelector(foot.class)
      if(footer != null && footer.innerText == foot.text){
        footer.innerHTML = "&nbsp;&nbsp;&nbsp;Made with ❤️ by " + location.host
        return true
      }
      return false
    }
  },
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
        .customCookiesPopup > div > a{
          border:3px solid #fff;
          text-decoration:none;
          padding:.5rem;
          margin:.25rem;
          border-radius:3px;
          color:inherit;
        }
      </style>
      <p>W celu zapewnienia wyższej jakości usług <br/>na tej stronie użyto plików cookie.</p>
      <div>
        <a href="https://ec.europa.eu/info/cookies_pl" target="_blank">Więcej</a>
        <a href="#" onclick="ap_module.acceptCookies()"> Akceptuję </a>
      </div>
    `
    document.body.append(cookies)
  },
  functions : {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
  },
  async inPromise( functionName ) {
    return await new Promise( res => {
      const interval = setInterval(()=>{
        const resp = this[functionName]()
        console.log({resp})
        if(resp || this.tryingLimit < 1){
          clearInterval(interval)
          res( resp )
        }
        this.tryingLimit--
      },300)
    })
  },
  runWhenPageIsReady() {
    window.addEventListener('load', async () => {
      await this.inPromise('removeFooter')
      this.makeCookiesPopup()
    })
  }
}
ap_module.runWhenPageIsReady()