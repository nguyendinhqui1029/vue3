export function setTheme(isDark) {
  if(isDark) {
    document.querySelector(':root').style.setProperty('--primary-color', '#1a1a1a');
    document.querySelector(':root').style.setProperty('--second-color', '#FFFFFF');
    document.querySelector(':root').style.setProperty('--three-color', '#0B81FF');
    document.querySelector(':root').style.setProperty('--four-color', '#060606');
    document.querySelector(':root').style.setProperty('--five-color', '#cfcfcfba');
  } else {
    document.querySelector(':root').style.setProperty('--primary-color', '#0B81FF');
    document.querySelector(':root').style.setProperty('--second-color', '#FFFFFF');
    document.querySelector(':root').style.setProperty('--three-color', '#1a1a1a');
    document.querySelector(':root').style.setProperty('--four-color', '#060606');
    document.querySelector(':root').style.setProperty('--five-color', '#e2e2e2ba');
  }
}