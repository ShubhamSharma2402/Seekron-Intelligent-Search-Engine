// word -> { docId: termFrequency }

export class InvertedIndex {
  constructor() {
    this.index = {};
  }

  add(term, docId) {
    if (!this.index[term]) {
      this.index[term] = {};
    }

    if (!this.index[term][docId]) {
      this.index[term][docId] = 0;
    }

    this.index[term][docId]++;
  }

  get(term) {
    return this.index[term] || {};
  }

  getAll() {
    return this.index;
  }
}