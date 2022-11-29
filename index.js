console.log('hi')
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
})
