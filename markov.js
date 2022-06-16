class MarkovMachine {

    /** build markov machine; read in text.*/
  
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      this.makeChains();
    //   this.makeText()
        this.count = 0
    }
  
    /** set markov chains:
     * 
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {
        // TODO
        let chains = new Map()
        for(let i = 0; i < this.words.length -1; i+= 1) {
            let key = this.words[i] + " " + this.words[i + 1]
            let val = this.words[i + 2] || null

            if(chains.has(key)) {
                chains.get(key).push(val)
            }
            else {
                chains.set(key, [val])
            }
        }
        // this.addStops(chains)
        this.chains = chains
      }

    addStops(map) {
        for(let key in map) {
            if((map.keys().indexOf(key) + 1)%3 === 0 && !key.endsWith(",") && key.indexOf(".") === -1) {
                map.get(key).push(null)
            }   
        }
    }

    findText(idx, arr) {
        let key = arr[idx]
        let valsIdx = this.randomInt(this.chains.get(key).length)

        if(this.chains.get(key)[valsIdx] === null) {
            this.count += 2
            return this.chains.get(key) + "."
        }

        this.count += 3
        return key + " " + this.chains.get(key)[valsIdx]
    }
  
    makeText(numWords = 10) {
      // TODO
      let text = []
      let entries = Array.from(this.chains.entries())
      let keys = Array.from(this.chains.keys())

      while(numWords >= this.count && entries.length !== 0) {
          let lastWord = text[text.length - 1]
          
        if(text.length === 0 || this.endsInPeriod(lastWord)) {
            let idx = this.findUpperCase(keys)
            text.push(this.findText(idx, keys))
            entries.pop()
            
        }
        else {
            let idx = this.randomInt(keys.length)
            let string = this.findText(idx, keys)
            // let key = keys[idx]
            let firstWord = string.slice(0, string.indexOf(" "))

            if(lastWord.toLowerCase().indexOf(firstWord.toLowerCase()) === -1 && string[0].toUpperCase() !== string[0]) {
                text.push(this.findText(idx, keys))
                entries.pop()
            }
        }
      }

      const outText = text[text.length - 1].endsWith(".") ? text.join(" ") : text.join(" ") + "."
      return outText
    }

    randomInt(n){ 
        return Math.floor(Math.random() * (n - 1))
    }

    endsInPeriod(string) {
        if(!string || !string.endsWith(".")) {
            return false
        }
        if(string.endsWith(".")) {
            return true
        }
    }

    isCapitalized(word) {
        if(word[0].toUpperCase() !== word[0]) {
            return false
        }
        return true
    }

    findUpperCase(arr) {
        let upperCase = arr.filter(key => key[0].toUpperCase() === key[0])
        if(upperCase.length === 0) {
            return this.randomInt(arr.length)
        }
        let randUpperCase = upperCase[this.randomInt(upperCase.length)]
        return arr.indexOf(randUpperCase)
    }

  }

module.exports = {
    MarkovMachine,
};