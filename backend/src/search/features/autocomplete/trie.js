class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;

    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }

    node.isEnd = true;
  }

  searchPrefix(prefix) {
    let node = this.root;

    for (let char of prefix) {
      if (!node.children[char]) return [];
      node = node.children[char];
    }

    return this._dfs(node, prefix);
  }

  _dfs(node, prefix) {
    let results = [];

    if (node.isEnd) results.push(prefix);

    for (let char in node.children) {
      results = results.concat(
        this._dfs(node.children[char], prefix + char)
      );
    }

    return results;
  }
}