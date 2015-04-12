(ns markov-elear.generator)

(defn word-chain [word-transitions]
  (reduce (fn [r t]
            (merge-with clojure.set/union r
                        (let [[a b c ] t]
                          {[a b] (if c #{c} #{})})))
          {}
          word-transitions))

(defn text->word-chain [s]
  (let [words (clojure.string/split s #"[\s|\n]")
        word-transitions (partition-all 3 1 words)]
    (word-chain word-transitions)))

(defn chain->text [chain]
  (apply str (interpose " " chain)))

(defn walk-chain [prefix chain results]
  (let [suffixes (get chain prefix)]
    (if (empty? suffixes)
      results
      (let [suffix                 (first (shuffle suffixes))
            new-prefix             [(last prefix) suffix]
            results-with-spaces    (chain->text results)
            results-char-count     (count results-with-spaces)
            suffix-char-count      (inc (count suffix))
            new-results-char-count (+ results-char-count suffix-char-count)]
        (if (>= new-results-char-count 140)
          results
          (recur new-prefix chain (conj results suffix)))))))

(defn generate-text [start-phrase word-chain]
  (let [prefix       (clojure.string/split start-phrase #" ")
        result-chain (walk-chain prefix word-chain prefix)
        result-text  (chain->text result-chain)]
    result-text))

(defn process-file [fname]
 (text->word-chain
  (slurp (clojure.java.io/resource fname))))

(def files ["quangle-wangle.txt" "monad.txt" "clojure.txt" "functional.txt"
            "jumblies.txt" "pelican.txt" "pobble.txt"])

(def prefix-list ["On the" "They went" "And all" "We think"
                  "For every" "No other" "To a" "And every"
                  "We, too," "For his" "And the" "But the"
                  "Are the" "The Pobble" "For the" "When we"
                  "In the" "Yet we" "With only" "Are the"
                  "Though the"  "And when"
                  "We sit" "And this" "No other" "With a"
                  "And at" "What a" "Of the"
                  "O please" "So that" "And all" "When they"
                  "But before" "Whoso had" "And nobody" "And it's"
                  "For any" "For example," "Also in" "In contrast"])

(def functional-leary (apply merge-with clojure.set/union (map process-file files)))

(defn end-at-last-punctuation [text]
  (let [trimmed-to-last-punct (apply str (re-seq #"[\s\w]+[^.!?,]*[.!?,]" text))
        trimmed-to-last-word (apply str (re-seq #".*[^a-zA-Z]+" text))
        result-text (if (empty? trimmed-to-last-punct)
                      trimmed-to-last-word
                      trimmed-to-last-punct)
        cleaned-text (clojure.string/replace result-text #"[,| ]$" ".")]
    (clojure.string/replace cleaned-text #"\"" "'")))

(defn tweet-text []
  (let [text (generate-text (-> prefix-list shuffle first) functional-leary)]
    (end-at-last-punctuation text)))

