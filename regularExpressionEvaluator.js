/**
 * Write a function that takes two strings as arguments, s and p
 * and returns a boolean denoting whatever s matches p
 * 
 * p is a sequence of any number of the following:
 *    1. a-z - which stands for itself
 *    2. . - which matches any character
 *    3. * - which matches 0 or more occurrences of the previous 
 *           single character
 * 
 *      s = "aba", p = "ab" => false
 *      s = "aa", p = "a*" => true
 *      s = "ab", p = ".*" => true
 *      s = "ab", p = "." => false
 *      s = "aab", p = "c*a*b" => true
 *      s = "aaa", p = "a*" => true
 * 
 */

/** Problem analyzing
 * 
 * Input: two strings. s - string. p - pattern
 * Output: boolean (does the string match the pattern)
 * Constraint: p : not empty and always valid.
 * Edge cases: .*b here in this example I can't assure that it will work. therefore it's better to start from right to left better.
 * Analyze: 
 *     a-z: means a direct match.
 *     . : any character is valid.
 *     *: here is the problem. 
 *         - any number of occurrence of the previous character.
 *         - maybe the string must be mapped in reverse (backwards).
 *         - OR split the string according to '*' then takes the last element of the splited string.
 *   
 * Can I use regular expressions? => NO.
 * 
 * Working steps: 
 * 1. Split the string according to '*' character.
 * 2. treat each character of those sub strings as a direct match, only the last item of the n-1 items of the substrings array.
 * 3. the last characters of a (n-1) sub string are the characters before a star.
 *    3.1. it can has 0 occurence on the original char.
 *             my plan for this is that if I found the char doesn't match I'll return nothing and move to next one.
 *    3.2. it can has only one or many occurence.
 *             and here if I found one occurence I'll check the next if it doesn't match also return 
 *             nothing and more to next char and pattern.
 */

function isMatch(s, p) {
    const patternsArray = p.split('*')
    const inputStringArray = [...s]
    let result = true;
    patternsArray.forEach((patterns, patternIndex) => {
        if (patternIndex === patternsArray.length - 1) {
            result = nonStarPatterns(patterns, inputStringArray)
        } else {
            result = starPatterns(patterns, inputStringArray)
        }

    })
    return result;
}

function nonStarPatterns(patterns, stringArray) {
    let result = true;
    [...patterns].map(pattern => {
        let originalChar = stringArray.shift()
        if (pattern === '.') {
            if (!originalChar) {
                result = false
            }
        } else {
            if (!isCharMatch(originalChar, pattern)) {
                result = false
            }
        }
    })
    if (stringArray.length !== 0) {
        result = false;
    }
    return result
}

function starPatterns(patterns, stringArray) { // return a boolean
    let result = true;
    [...patterns].map((pattern, index) => {
        if (index === patterns.length - 1) { // This means that the char has a star symbol after it.
            do {
                var originalChar = stringArray.shift()
                var result = isCharMatch(originalChar, pattern)
                console.log('Char:', originalChar, ' Pattern: ', pattern, 'Match result:', result)
            } while (result && stringArray.length !== 0)
            if (!result) {
                stringArray.unshift(originalChar)
            }
        } else { // Normal chars a-z or .
            if (!matchNotStar(pattern, stringArray)) {
                result = false
            }
        }
    })
    return result;
}

function matchNotStar(pattern, stringArray) {
    let result = true
    if (pattern === '.') {
        // it does not matter which charater is appearing.
        let originalChar = stringArray.shift()
        if (!originalChar) {
            result = false
        }
    } else {
        // direct match to a character.
        let originalChar = stringArray.shift()
        if (!isCharMatch(originalChar, pattern)) {
            result = false;
        }
    }
    return result
}

function isCharMatch(char, pattern) {
    if (pattern === char) {
        return true
    } else if (pattern === '.') {
        return true
    }
    return false
}


console.log(isMatch('aab', '.*b'))

/**
 * ab*a
 * ['ab', 'a']
 *
 * 'ab' -> a, then moving to the second which is b
 *
 */