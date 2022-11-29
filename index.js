/*


skip-checks:true
*/


console.log('hi4')
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
      if(footer != null && footer.innerText == foot.text){
        footer.innerHTML = ""
      }
      console.log({ foot, footer })
    })
  },
  runWhenPageIsReady() {
    window.addEventListener('load', () => {
      console.log('windowloaded', { document })
      this.removeFooter()

    })
    console.log({ document })

  }

}
module.runWhenPageIsReady()