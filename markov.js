class MarkovMachine {

    /** build markov machine; read in text.*/
  
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      this.makeChains();
      this.makeText()
    }
  
    /** set markov chains:
     * 
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {
        // TODO
        this.chains = {}
        for(let i = 0; i < this.words.length - 1; i++) {
            let word1 = this.words[i]
            let word2 = this.words[i + 1]
            let key = word1 + " " + word2

            if(Object.keys(this.chains).indexOf(key) !== -1) {
                this.chains[key].push(this.words[i + 2])
            }
            else {
                this.chains[word1 + " " + word2] = [this.words[i + 2] || null]
            }
        }
        this.addStops(this.chains)
      }
      
    isCapitalized(word) {
        if(word[0].toUpperCase() !== word[0]) {
            return false
        }
        return true
    }

    addStops(obj) {
        for(let key in obj) {
            if((Object.keys(obj).indexOf(key) + 1)%3 === 0 && !key.endsWith(",") && key.indexOf(".") === -1) {
                obj[key].push(null)
                obj[key] = this.shuffle(obj[key])
            }   
        }
    }

    findText(idx) {
        let entries = Object.entries(this.chains)
        let valsIdx = this.randomInt(entries[idx][1].length)

        if(entries[idx][1][valsIdx] === null) {
            return entries[idx][0] + "."
        } 

        else {
            return entries[idx][0] + " " + entries[idx][1][valsIdx]
       }
    }
  
    makeText(numWords = 20) {
      // TODO
      let text = []

      while(text.length < numWords) {
          let lastWord = text[text.length - 1]
          
        if(text.length === 0 || this.endsInPeriod(lastWord)) {
            let idx = this.findUpperCase()
            text.push(this.findText(idx))
            
        }
        else {
            let idx = this.randomInt(Object.keys(this.chains).length)
            let string = this.findText(idx)
            let firstWord = string.slice(0, string.indexOf(" "))

            if(lastWord.toLowerCase().indexOf(firstWord.toLowerCase()) === -1 && string[0].toUpperCase() !== string[0]) {
                text.push(this.findText(idx))
            }
        }
      }

      const outText = text[text.length - 1].endsWith(".") ? text.join(" ") : text.join(" ") + "."
      return outText
    }

    randomInt(n){ 
        return Math.floor(Math.random() * (n - 1))
    }

    shuffle(array) {
        let length = array.length

        while (length > 0) {
            let index = Math.floor(Math.random() * length);
            length--;
            let temp = array[length];
            array[length] = array[index];
            array[index] = temp;
        }

        return array;
    }

    endsInPeriod(string) {
        if(!string || !string.endsWith(".")) {
            return false
        }
        if(string.endsWith(".")) {
            return true
        }
    }

    findUpperCase() {
        let keys = Object.keys(this.chains);
        let upperCase = keys.filter(key => key[0].toUpperCase() === key[0])
        let randUpperCase = upperCase[this.randomInt(upperCase.length)]
        return keys.indexOf(randUpperCase)
    }

  }

module.exports = {
    MarkovMachine,
};