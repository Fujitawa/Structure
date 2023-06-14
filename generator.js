	let structureStack = [];
let currentStructure = ''; 

function generateStructure() {
  const pathInput = document.getElementById('path');
  const structureOutput = document.getElementById('structure');

  const path = pathInput.value.trim();
  const structure = generateStructureString(path);

  structureStack.push(currentStructure);
  currentStructure += structure;

  structureOutput.textContent = currentStructure;
}

function generateStructureString(path) {
  const parts = path.split('/');
  let structure = '';

  let currentIndent = '';

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (i === 0) {
      structure += '|–––' + part + '\n';
      currentIndent += '|   ';
    } else {
      structure += currentIndent.slice(0, -1) + '|–––' + part + '\n';
      currentIndent += '   ';
    }

    if (i === parts.length - 1) {
      structure += currentIndent.slice(0, -1) + '|___' + part + '\n';
    }
  }

  return structure;
}

function undoLastAction() {
  if (structureStack.length > 0) {
    const previousStructure = structureStack.pop();
    currentStructure = previousStructure;
    const structureOutput = document.getElementById('structure');
    structureOutput.textContent = currentStructure;
  }
  
  
  
}

function clearStructure() {
  structureStack = [];
  currentStructure = '';

  const structureOutput = document.getElementById('structure');
  structureOutput.textContent = '';
}





 function copyStructure() {
      const structureOutput = document.getElementById('structure');
      const range = document.createRange();
      range.selectNode(structureOutput);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
    }
    
    
    
    
