const markov = require("./markov");

const words = "The cat in the hat ate green eggs and ham."

describe("makeChains", function() {
    let mm

    beforeEach(function() {
        mm = new markov.MarkovMachine(words)
    })

    test("size", function() {
        expect(mm.chains.size).toEqual(9)
    })

    test("keys", function() {
        expect(mm.chains.has("The cat")).toEqual(true)
    })

    test("nulls", function() {
        expect(mm.chains.get("and ham.")).toEqual([null])
    })
})

describe("makeText", function() {
    let mm
    let text

    beforeEach(function() {
        mm = new markov.MarkovMachine(words)
        text = mm.makeText(10)
    })

    test("numWords", function() {
        let strings = text.split(" ")
        expect(strings.length).toBeLessThanOrEqual(10)
    })

    test("firstWordCapitalized", function() {
        expect(text[0]).toBe("T")
    })
})

describe("helperFunctions", function() {
    let mm

    beforeEach(function() {
        mm = new markov.MarkovMachine(words)
    })

    test("randomInt", function() {
        let num = mm.randomInt(5)
        expect(num).toBeLessThanOrEqual(5)
    })

    test("endsInPeriod", function() {
        expect(mm.endsInPeriod("yes.")).toBeTruthy()
        expect(mm.endsInPeriod("no")).toBeFalsy()
    })

    test("isCapitalized", function() {
        expect(mm.isCapitalized("Yes")).toBeTruthy()
        expect(mm.isCapitalized("no")).toBeFalsy()
    })

    test("findUpperCase", function() {
        expect(mm.findUpperCase(["The", "cat"])).toEqual(0)
        expect(mm.findUpperCase(["the", "cat"])).toBeDefined()
    })

    test("findText", function() {
        let arr = ["The cat", "and ham."]
        expect(mm.findText(0, arr)).toBe("The cat in")
    })
})