console.warn('Webformula Core: Debug mode');

window.getBoundVariables = () => {
  console.log(window.page.getVariableReferences());
}

window.getPageTemplate = () => {
  console.log(window.page.getTemplate());
}

window.getRoutes = () => {
  console.log(window.webformulaRoutes);
}
