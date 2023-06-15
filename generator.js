// Initializing the structure stack array and the current structure
let structureStack = []; 
let currentStructure = ''; 

// The generateStructure function creates a folder structure based on the entered path
function generateStructure() {
  // Retrieving the path input element
  const pathInput = document.getElementById('path');
  
  // Retrieving the structure output element
  const structureOutput = document.getElementById('structure');

  // Trimming spaces at the beginning and end of the path string
  const path = pathInput.value.trim();
  
  // Generating the structure string
  const structure = generateStructureString(path);

  // Adding the current structure to the structure stack
  structureStack.push(currentStructure);
  
  // Updating the current structure
  currentStructure += structure;

  // Displaying the current structure
  structureOutput.textContent = currentStructure;
}

// The generateStructureString function creates a structure string based on the path
function generateStructureString(path) {
  // Splitting the path into parts
  const parts = path.split('/');
  
  // Initializing the structure string
  let structure = '';

  // Initializing the current indentation
  let currentIndent = '';

  // Looping through each part of the path
  for (let i = 0; i < parts.length; i++) {
    // Getting the current part
    const part = parts[i];

    // If it is the first part, add it with leading characters
    // and update the current indentation
    if (i === 0) {
      structure += '|–––' + part + '\n';
      currentIndent += '|   ';
    } else {
      // If it is not the first part, add it with leading characters
      // and update the current indentation
      structure += currentIndent.slice(0, -1) + '|–––' + part + '\n';
      currentIndent += '   ';
    }

    // If it is the last part, add it with leading characters
    if (i === parts.length - 1) {
      structure += currentIndent.slice(0, -1) + '|___' + part + '\n';
    }
  }

  // Return the generated structure string
  return structure;
}

// The undoLastAction function removes the last structure from the stack
function undoLastAction() {
  // If there are structures in the stack
  if (structureStack.length > 0) {
    // Remove the last structure from the stack
    const previousStructure = structureStack.pop();
    
    // Update the current structure
    currentStructure = previousStructure;
    
    // Display the current structure
    const structureOutput = document.getElementById('structure');
    structureOutput.textContent = currentStructure;
  }
}

// The clearStructure function clears the structure stack and the current structure
function clearStructure() {
  // Clear the structure stack
  structureStack = [];
  
  // Clear the current structure
  currentStructure = '';

  // Display the current structure
  const structureOutput = document.getElementById('structure');
  structureOutput.textContent = '';
}

// The copyStructure function copies the current structure to the clipboard
function copyStructure() {
  // Get the structure output element
  const structureOutput = document.getElementById('structure');
  
  // Create a new range
  const range = document.createRange();
  
  // Select the structure output element
  range.selectNode(structureOutput);
  
  // Remove all ranges from the selection
  window.getSelection().removeAllRanges();
  
  // Add the new range to the selection
  window.getSelection().addRange(range);
  
  // Copy the selected text to the clipboard
  document.execCommand('copy');
  
  // Remove all ranges from the selection
  window.getSelection().removeAllRanges();
}
