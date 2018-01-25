let state = {regex: '', replacement: '' };

const getParentNames = (node) => {
  const names = [];
  for (let cur = node.parentElement; cur; cur = cur.parentElement) {
    names.push(cur.nodeName);
  }
  return names;
}

const update = () => {
  chrome.storage.local.get(['regex', 'replacement'], ({regex='', replacement=''}) => {
    if (state.regex === regex && state.replacement === replacement) {
      return;
    }

    state = { regex, replacement };
    const r = new RegExp(regex, 'gi');

    const acceptNode = (node) => {
      if (r.test(node.nodeValue)) {
        const parentNames = getParentNames(node);
        if (parentNames.includes('SCRIPT')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_REJECT;
    };
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode });
    debugger;

    while(walker.nextNode()) {
      walker.currentNode.nodeValue = walker.currentNode.nodeValue.replace(r, replacement);
    }

  });
};


update();
chrome.storage.onChanged.addListener(update);
