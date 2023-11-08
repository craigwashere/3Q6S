My company has adopted the model behavior "3Q6S".  "3Q" is defined as quality employees, quality company, and quality products. "6S" refers to the general "5S" of workplace organization method derived from the Japanese terms "seiri, seiton, seiso, seiketsu, and shitsuke," which means "sorting, straightening, systemic cleaning, standardizing, and service." Lastly, the final "S" is for "saho" or behavior. We've added a section for safety.

We have a form we fill out periodically to measure how well we're adapting to the 6S philosophy. I thought it better to have this as an online form where the results are tallied automatically. The same backend services the evaulation form and the processing pages. It stores the results from the evaluation form in a .json file in a directory corresponding to the month taken. When the processing page is loaded, it will return the list of available surveys.

Both frontend pages are written with React.js. The survey is written in typescript, the processing is in Javascript, and the backend uses Node.js.

The survey page uses Formik for form handling and semantic-ui-react for most of the visuals. The processing page uses semantic-ui-react as well as custom .css.

Overall, this project is a "minimum viable product". I had this deployed on an AWS server and emailed the link for approval. I never received a response.
