'use server'
import { mathjax } from 'mathjax-full/js/mathjax.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { SVG } from 'mathjax-full/js/output/svg.js';
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js';

export const createMathSvg = async (expression: string) => {
  // Get the expression from the query params, or use a default
  const mathExpression = expression || 'F = k \\frac{|q_1 q_2|}{r^2}';

  // Create a lightweight DOM adaptor and register it
  const adaptor = liteAdaptor();
  RegisterHTMLHandler(adaptor);

  // Set up the input and output jax
  const tex = new TeX({
    packages: ['base'] // Add more packages if needed
  });
  const svg = new SVG({
    fontCache: 'none' // prevents font caching so output is self-contained
  });

  // Create a MathJax document using the input and output jax
  const doc = mathjax.document('', { InputJax: tex, OutputJax: svg });

  // Convert the LaTeX expression to SVG
  const node = doc.convert(mathExpression, { display: true });
  const svgOutput = adaptor.outerHTML(node);


  // Return the raw SVG markup
  // Set the content-type to something appropriate (e.g. text/html or image/svg+xml)
  return svgOutput;
}