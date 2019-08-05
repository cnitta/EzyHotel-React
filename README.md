# EzyHotel-React
Instructions to step up  
**Before you git clone, make sure to back up your work separately and also to commit your changes first.**
1. Open up your command prompt/terminal.  
2. Navigate to the react project folder  
3. Enter the following command in order
   - Install all the required modules.  
      ``npm install ``   
   - Install the webpack if required.  
      ``npm run build:dll``  
4. Check if you can run the React project.
   - Start the project  
   ``npm start``

### Potential Issues:
1. **Packages with High vulnerablility**  
Please following the instructions as stated in the command prompt/terminal to run  
``npm audit fix``  
2. **Found CRLF instead of LF**  
This is regarding the newline used in the files. Please run the following command to resolve this issue. Please note that the processing will take some time to complete. __*Replace [dir] with your own directory path*__    
``npx eslint --fix [dir]``  
3. **ERROR in ./app/translations/en.json**  
I am not sure why there is an additional semi-colon there in the first place. To resolve, go to [dirpath]/app/translations/en.json. Remove the semi-colon and save the file. You should be able to load the project.

### Key Note
1. If you want to change the sidebar menu, please edit at **/app/api/ui/menu.js**
   - Please note that I did not include the multi-level configuration. So if you need it, please refer to the pro      template in original template.
2. If you change the link in the sidebar menu in step 1, please make sure you update the route in **/app/containers/App/Application.js**  
3. To link the page to a constant keyword, define them in **/app/containers/pageListAsync.js**   


### Main Private Repo:
https://github.com/bernicecpz/ezyhotel-react-redux
