const dbconnection = require('../database/database.config')
const axios = require('axios')


exports.getTranslation = (searchedWord , res) =>{

    const options = {
        method: 'GET',
        url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/api/get',
        params: {q: searchedWord , langpair: 'en|fr', de: 'a@b.c', onlyprivate: '0', mt: '1'},
        headers: {
          'x-rapidapi-key': '56383b2111msh7e68de03b026541p1d6c16jsn4adab3e3754b',
          'x-rapidapi-host': 'translated-mymemory---translation-memory.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
          res.json({ word : response.data})
      }).catch(function (error) {
          console.error(error);
      });


    
}