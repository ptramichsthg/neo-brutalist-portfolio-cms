const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
        results.push(filePath);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Remove Tailwind `dark:` classes.
  // We match "dark:" followed by any non-whitespace and non-quote/bracket break chars.
  // Actually, simplest is to match \bdark:[^\s'"`{}]+
  // In tailwind, classes end at whitespace or quote.
  content = content.replace(/\bdark:[^\s'"`{}]+/g, '');

  if (file.endsWith('Navbar.tsx')) {
    // Remove theme props
    content = content.replace(/theme\?: 'light' \| 'dark';\s*/g, '');
    content = content.replace(/onToggleTheme\?: \(\) => void;\s*/g, '');
    content = content.replace(/,\s*theme = 'light',\s*onToggleTheme/g, '');

    // Replace all ternary theme checks with the light mode equivalent
    // Pattern: \${theme === 'dark' \? '[^']*' : '([^']*)'}
    content = content.replace(/\$\{theme === 'dark' \? '[^']*' : '([^']*)'\}/g, '$1');

    // Remove the Desktop toggle button block:
    // It's a button with aria-label="Toggle Dark Mode"
    // Let's remove lines containing aria-label="Toggle Dark Mode" and surrounding tags.
    // Easier with regex that matches the button element
    content = content.replace(/<button[^>]*aria-label="Toggle Dark Mode"[\s\S]*?<\/button>/g, '');
  }

  // Cleanup extra spaces inside classNames
  content = content.replace(/className="([^"]*)"/g, (match, p1) => {
    return `className="${p1.replace(/\s{2,}/g, ' ').trim()}"`;
  });
  content = content.replace(/className=\{`([^`]*)`\}/g, (match, p1) => {
    return `className={\`${p1.replace(/\s{2,}/g, ' ').trim()}\`}`;
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Cleaned:', file);
  }
});

// Delete useDarkMode hook
if (fs.existsSync('./src/hooks/useDarkMode.ts')) {
   fs.unlinkSync('./src/hooks/useDarkMode.ts');
   console.log('Deleted useDarkMode.ts');
}
