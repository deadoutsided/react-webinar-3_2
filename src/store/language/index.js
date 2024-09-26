import StoreModule from "../module";
import enText from "./en-text";
import ruText from "./ru-text";

class Language extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      text: ruText,
      currentLanguage: 'ru-RU',
    }
  }

  changeLanguage(lang){
    if(lang === 'en-EN'){
      this.setState({
        ...this.getState(),
        text: enText,
        currentLanguage: 'en-EN',
      })
      console.log('EN')
      return
    }
    this.setState({
      ...this.getState(),
      text: ruText,
      currentLanguage: 'ru-RU',
    })
    console.log('RU')
  }

  translate(phrase) {
    if(phrase === undefined) return 'phrase not found'
    console.log(phrase + ' PHRASE - ' + this.getState().text[phrase])
    return this.getState().text[phrase] ? this.getState().text[phrase] : 'phrase not found';
  }
}

export default Language
