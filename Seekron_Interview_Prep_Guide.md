# Seekron: Intelligent Search Engine — Interview Preparation Guide

This guide is designed to help you ace your interview. It starts with simple, conversational answers to your key questions, followed by the technical details of the system's architecture.

---

## 1. Simple Q&A for the Interviewer (Quick Reference)

### Q1: What does this project do?
* **Simple Answer:** Seekron is a full-stack, local search engine. It allows users to search through a collection of documents using queries, ranks the results by relevance, provides real-time autocomplete suggestions as you type, corrects spelling mistakes, and highlights the matching search words in the results.

### Q2: How does it mimic the Google search engine?
* **Simple Answer:** It implements the core logic that Google uses behind the scenes:
  1. **Crawling/Loading:** It reads text documents.
  2. **Preprocessing:** It cleans and prepares the text (lowercasing, removing useless words like "is/the", and stemming words to their roots).
  3. **Indexing:** It builds an **Inverted Index** (the core database structure Google uses).
  4. **Ranking:** It uses **TF-IDF** and vector math to calculate a relevance score so the best-matching documents appear at the top.
  5. **User Experience:** It includes real-time autocomplete suggestions, spell correction for typos, and text highlighting.

### Q3: What is an inverted index, and how does it help to retrieve documents?
* **Simple Answer:** A regular index maps a *Document* $\rightarrow$ *Words inside it*. An **Inverted Index** does the opposite: it maps a *Word* $\rightarrow$ *List of Document IDs containing that word*.
* **How it helps:** Instead of reading every single document from start to finish to see if a word exists (which is very slow), the engine does a single lookup for that word in the Inverted Index and instantly gets the list of documents containing it.

### Q4: What does the inverted index map? Does it map every single word in the document, and why not?
* **Simple Answer:** It maps unique preprocessed terms to their document IDs and term frequencies. 
* **Does it map every word?** No. It excludes **Stopwords** (common words like "and", "the", "is", "in", "of"). 
* **Why not?** Because stopwords appear in almost every document and carry no unique meaning. Including them would bloat the index size and ruin the relevance ranking by making all documents look equally matchable.

### Q5: What database are you using, and where is your data?
* **Simple Answer:** We are not using a traditional external database like MySQL or MongoDB. Instead, we use a lightweight, file-based storage system. The raw data and the built search indexes are stored as local **JSON files** in the `backend/src/data/` folder. This keeps the application simple, portable, and fast to run locally.

### Q6: What is TF-IDF ranking, and how does it work?
* **Simple Answer:** TF-IDF stands for **Term Frequency - Inverse Document Frequency**. It is a formula that calculates how important a word is to a document:
  1. **Term Frequency (TF):** How often a word appears in a specific document. (More occurrences = higher importance). We use a log formula to make sure a word appearing 100 times doesn't overpower everything else.
  2. **Inverse Document Frequency (IDF):** How rare the word is across the *entire* collection of documents. (Rarier words like "Quantum" get high weight; common words like "data" get low weight).
  3. **Score:** We multiply these two values ($\text{TF} \times \text{IDF}$) to score each document. The document with the highest mathematical match score goes to the top.

### Q7: How did you implement category-based filtering?
* **Simple Answer:** In our sample dataset, documents are tagged with categories (like `technology`, `science`, `business`, `health`). When the user clicks a category filter in the frontend UI, React sends that filter selection to our search service, which filters down the search results list so that only documents belonging to the selected category are displayed.

### Q8: How did you highlight the query term in the documents?
* **Simple Answer:** We created a utility helper (`highlighter.js`) in the frontend. When displaying the document text, we split the search query into individual words, create a regular expression (regex) to find all occurrences of those words (case-insensitive), and replace them by wrapping them in HTML `<mark>` tags styled with a yellow background.

### Q9: How are you implementing the auto-completer?
* **Simple Answer:** We use a **Trie (Prefix Tree)** data structure. 
  1. During startup, the engine extracts all words from the documents and inserts them into the Trie.
  2. When the user types a query, we capture the last word.
  3. We search the Trie for that prefix. The Trie traverses its tree nodes to find the matching path and runs a Depth-First Search (DFS) to quickly gather and return up to 5 words starting with those characters.

### Q10: What if I search for something that is not in the documents?
* **Simple Answer:** 
  1. **Spell Correction:** First, our spell corrector uses **Levenshtein Distance** (edit distance) to see if you made a typo. If it finds a close matching word in our vocabulary (within 2 edits), it suggests that corrected word.
  2. **Empty State:** If the query terms genuinely do not exist anywhere in the index (even after spell correction), the boolean search yields an empty list of document IDs, and the interface displays a clean, user-friendly "No results found" page.

---

## 2. System Architecture

```
                     +---------------------------------------+
                     |         Frontend (React + Vite)       |
                     |  - Theme Control (Light/Dark)         |
                     |  - Autocomplete & Spell Suggestions   |
                     |  - Highlighting & Ranking Explanation |
                     +---------------------------------------+
                                         |
                                         | HTTP (fetch)
                                         v
                     +---------------------------------------+
                     |         Backend (Node.js + Express)   |
                     +---------------------------------------+
                                         |
          +------------------------------+------------------------------+
          |                              |                              |
          v                              v                              v
+-------------------+          +-------------------+          +-------------------+
| Preprocessing     |          | Query Engine      |          | Feature Services  |
| - Tokenizer       |          | - Boolean Parser  |          | - Autocomplete    |
| - Stopwords       |          | - Phrase Search   |          |   (Trie)          |
| - Custom Stemmer  |          | - Cosine Sim      |          | - Spell Correction|
+-------------------+          +-------------------+          |   (Levenshtein DP)|
          |                              |                    +-------------------+
          |                              |                              |
          +------------------------------+------------------------------+
                                         |
                                         v
                     +---------------------------------------+
                     |          Storage Layer (JSON)         |
                     |  - documents.json (Raw docs)          |
                     |  - index.json (Inverted Index)        |
                     +---------------------------------------+
```

---

## 3. Tech Stack
* **Frontend:** React + Vite + TailwindCSS + React Router DOM
* **Backend:** Node.js + Express
* **Database/Storage:** Plain JSON files (`documents.json`, `index.json`, `metadata.json`)

---

## 4. Deep Dive: Core Algorithms

* **Inverted Index Map:** `word -> { docId: termFrequency }`
* **Stopwords Filter:** Removes common noise words (e.g., "is", "the", "and").
* **Stemmer:** Rules to strip suffix endings like "ing", "ed", and "s" to match variations of words (e.g., "coding", "coded", "codes" all stem to "cod").
* **Trie Tree for Autocomplete:** Fast prefix lookup in $O(\text{prefix length})$ time, followed by Depth-First Search (DFS) to collect spelling recommendations.
* **Wagner-Fischer (Levenshtein Distance) for Spell Correction:** Calculates minimum insert/delete/replace edits using a 2D Dynamic Programming matrix to correct terms.
* **Log-Normalized TF:** dampens repetitive word counts.
* **IDF calculation:** gives higher weight to rare search words.
