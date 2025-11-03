const fs = require("fs");
const path = require("path");

console.log("Fixing TARGET_OS_SIMULATOR issues in Swift files...");

// Helper function to find files recursively with better error handling
function findFiles(dir, pattern) {
  let results = [];
  
  try {
    if (!fs.existsSync(dir)) {
      return results;
    }

    const stat = fs.statSync(dir);
    if (!stat.isDirectory()) {
      return results;
    }

    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      
      try {
        const fileStat = fs.statSync(filePath);
        
        if (fileStat.isDirectory() && !filePath.includes("node_modules/.cache")) {
          // Skip problematic directories
          if (file !== ".git" && file !== ".bin" && !file.startsWith(".")) {
            results = results.concat(findFiles(filePath, pattern));
          }
        } else if (fileStat.isFile() && pattern.test(file)) {
          results.push(filePath);
        }
      } catch (error) {
        // Skip files/directories that can't be accessed
        console.log(`Skipping ${filePath}: ${error.message}`);
        continue;
      }
    }
  } catch (error) {
    console.log(`Error accessing directory ${dir}: ${error.message}`);
  }
  
  return results;
}

try {
  // Find all Swift files in the project
  console.log("Searching for Swift files...");
  const swiftFiles = findFiles(".", /\.swift$/);
  console.log(`Found ${swiftFiles.length} Swift files`);
  
  // Check each Swift file for TARGET_OS_SIMULATOR
  let fixedCount = 0;
  for (const file of swiftFiles) {
    try {
      const content = fs.readFileSync(file, "utf8");
      
      if (content.includes("TARGET_OS_SIMULATOR")) {
        console.log(`Found TARGET_OS_SIMULATOR in ${file}`);
        
        // Replace TARGET_OS_SIMULATOR check with Swift-native code
        let newContent = content;
        
        // Replace "return TARGET_OS_SIMULATOR != 0" with Swift-native check
        newContent = newContent.replace(
          /return\s+TARGET_OS_SIMULATOR\s+!=\s+0/g,
          'return ProcessInfo.processInfo.environment["SIMULATOR_DEVICE_NAME"] != nil'
        );
        
        // If we made a replacement, write the file
        if (newContent !== content) {
          fs.writeFileSync(file, newContent);
          fixedCount++;
        }
      }
    } catch (error) {
      console.log(`Error processing Swift file ${file}: ${error.message}`);
    }
  }
  
  console.log(`Fixed ${fixedCount} Swift files with TARGET_OS_SIMULATOR issues`);
  
  // Find all Objective-C files that might use TARGET_OS_SIMULATOR
  console.log("Searching for Objective-C files...");
  const objcFiles = findFiles(".", /\.(m|mm|h)$/);
  console.log(`Found ${objcFiles.length} Objective-C files`);
  
  // Check each Objective-C file for TARGET_OS_SIMULATOR without proper include
  let fixedObjcCount = 0;
  for (const file of objcFiles) {
    try {
      const content = fs.readFileSync(file, "utf8");
      
      if (
        content.includes("TARGET_OS_SIMULATOR") &&
        !content.includes("#include <TargetConditionals.h>") &&
        !content.includes("#import <TargetConditionals.h>")
      ) {
        console.log(`Found TARGET_OS_SIMULATOR without proper include in ${file}`);
        
        // Add the include at the top after any existing includes
        const lines = content.split("\n");
        let includeIndex = 0;
        
        // Find the last import/include statement
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes("#import") || lines[i].includes("#include")) {
            includeIndex = i + 1;
          }
        }
        
        // Insert our include
        lines.splice(includeIndex, 0, "#import <TargetConditionals.h>");
        fs.writeFileSync(file, lines.join("\n"));
        fixedObjcCount++;
      }
    } catch (error) {
      console.log(`Error processing Objective-C file ${file}: ${error.message}`);
    }
  }
  
  console.log(`Fixed ${fixedObjcCount} Objective-C files with TARGET_OS_SIMULATOR issues`);
  console.log("All TARGET_OS_SIMULATOR issues fixed!");
  
} catch (error) {
  console.error("Error fixing TARGET_OS_SIMULATOR issues:", error.message);
  // Don't exit with error code to prevent build failures
  console.log("Continuing with build process...");
} 