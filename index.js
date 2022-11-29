/*


skip-checks:true
*/


console.log('hi5')
const module = {
  removeFooter() {
    const footers = [
      {
        class: ".site-footer .twp-footer .footer-active .show",
        text: "Copyright All right reserved Theme: Default Mag by ThemeInWP"    
      }

    ] 
    footers.forEach(foot => {
      const footer = document.querySelector(foot.class)
      console.log({ foot, footer })
      if(footer != null && footer.innerText == foot.text){
        footer.innerHTML = ""
        return true
      }
      return false
    })
  },
  async inPromise( functionName ) {
    return await new Promise( res => {
      const interval = setInterval(()=>{
        const resp = this[functionName]()
        if(resp){
          clearInterval(interval)
          res(resp)
        }
      },300)
    })
  },
  runWhenPageIsReady() {
    window.addEventListener('load', async () => {
      console.log('windowloaded', { document })
      const inProm = await this.inPromise('removeFooter')
      console.log({ inProm })
    })
  }
}
module.runWhenPageIsReady()