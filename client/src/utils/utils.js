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

export function formatUrl(url) {
  return url.replace(/\//gi, '%2f').replace(/=/gi,'%3D');
}

export function delay(ms) {
  try {
    return new Promise(resolve => setTimeout(resolve, ms));
  } catch (error) {
    console.log(error)
  }
}