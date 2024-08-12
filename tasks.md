# OpenAsar & Undiscord Combination

An enhancement of the OpenAsar (oa) open source alternative to Discord's asar file for their official desktop client that adds support for userscripts (us) in Electrons Chromium environtment. 

### OpenAsar Edits
For the most part any edits or addiitions to the openasar files will be to duplicate functionalities from openasar or to redirect the existing functionality of oa to us instead

- **`win.js`:** conditionally select cdn to load from based on n. 
- **`asarUpdate.js`:** change asar source url
- **`index.js`:** *(top level)* retrieve userscript settings and set globally (???)
- **`bootstrap.js`:** call the usMan.js init() function to load userscript configs, metadata, scripts themselves, and set up the listeners for navigation in the main window. Use global userscript config variable and an imported function to inject userscripts into main window after oasar injections. 
- **`mainWindow.js`:** edit to change host info in sidebar to us info instead of openasar,~~ also add a settings menu item for the userscript config window~~ and apply listener
- **`paths.js`:** add the paths for the userscript files directory as well as the manifest or config file for userscript crap
 
### Userscript Specific Source File Additions
These will be brand new additions to the OpenAsar file, striking a balance between well organized/ non-repeated code and the minimalizing of edits made to the existing OpenAsar code for simplified automated updating purposes. 

- **`userscripts/index.js & preload.js`:** basically just duplicate and alter the ones under config (oa's settings window custom) to work for userscripts settings window.... 
- **`userscripts/usMan.js`:**  retrieving page matches for injecting userscripts when funciton called upon navigation, saving state data, updating metasdata,saving new userscripts, handling matches and injections, handling userscript dependancies, handling userscript conflicts on the same page, invoking any safety checks or features for handling the javascript for injection, etc
  - **`init()`:** will handle the loading of userscripts from new directory, loading on us config or manifest with metadata to display and state data, to be called on startup somewhere... like bootstrap.js where the rest of the css and oa specific js gets injected at startup
  - **`watch()`:** listeners for navigation in main window to trigger userscript injection.
- **`userscripts/usUpdater.js`:** will be incharge of checking userscripts manifest for any auto-updatable userscripts and attempting to retrive and install the new release in place of the old one for each one discovered. Create a main level setting to toggle this on and off for all userscripts. Check manifest for user selectable toggle for individual userscripts before attempting update on each one. Try to copy the new experimental updating proceedure openasar uses for discord module updates or whatever to ensure quickstart, using the current version until the update is complete and the app ready to restart.
- **`userscripts/usPolyfills.js`:** this will be a collection of polyfills to provide some support for api calls and function calls not supported by electrons chromium browser or that have been made standard by userscript managers in browsers.
- **`usConfig.html`:** Provide toggles, deletion triggers, and edit triggers for each loaded userscript file. Populate each script's metadata from the userscript file or a config file.  Provide a basic text editor for manual entry (copy and paste) and saving of userscripts through the GUI. Use oa's monaco package.

### Automation Scripts/ Workflows/ Actions
- Use openasars build scripts with minimal edits preferably to minify and prep the release package for my enhanced version as well. 
- Use hooks and workflows/actions to automate the upstream fetchign and merging of openasar updates into my forked repo and to then run some integration tests in order to ensure that the update did not contain breaking changes. 

**NOTES:**
- See about a renderer file for the us config window to handle the html funcitonalities
- Find oa code that creates entries to the settings and the user data cache json files and add userscripts and us global settings respectively
- fork the cdn repository and customize, etc
- find the installer scripts and fork that too