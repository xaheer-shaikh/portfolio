const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get repository name from git remote
try {
  const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf-8' }).trim();
  console.log('Remote URL:', remoteUrl);
  
  // Extract repository name from URL
  const repoMatch = remoteUrl.match(/github\.com[\/:]([\w-]+)\/([\w-]+)(\.git)?/);
  if (!repoMatch) {
    console.error('Could not extract repository name from remote URL');
    process.exit(1);
  }
  
  const username = repoMatch[1];
  const repoName = repoMatch[2];
  
  console.log(`Username: ${username}`);
  console.log(`Repository: ${repoName}`);
  
  // Build the project
  console.log('Building the project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Ensure out directory exists
  if (!fs.existsSync('out')) {
    fs.mkdirSync('out');
  }
  
  // Copy files from dist to out (if dist exists)
  if (fs.existsSync('dist')) {
    // Copy all files from dist to out
    const copyRecursiveSync = (src, dest) => {
      const exists = fs.existsSync(src);
      const stats = exists && fs.statSync(src);
      const isDirectory = exists && stats.isDirectory();
      
      if (isDirectory) {
        fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(childItemName => {
          copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
      } else {
        fs.copyFileSync(src, dest);
      }
    };
    
    copyRecursiveSync('dist', 'out');
  }
  
  // Create 404.html for SPA routing (copy index.html to 404.html)
  if (fs.existsSync('out/index.html')) {
    fs.copyFileSync('out/index.html', 'out/404.html');
  }
  
  console.log('Deployment ready in /out directory');
  console.log('To deploy to GitHub Pages manually, run:');
  console.log('git add out/ && git commit -m "Deploy to GitHub Pages" && git subtree push --prefix out origin gh-pages');
  
} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
}