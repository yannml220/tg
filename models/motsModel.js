const dbconnection = require('../database/database.config')
const userModel = require('./userModel')


exports.getAll = ( res , listeId ) => {
    dbconnection.query("SELECT * from mot ", (error, results ,fields)=> {
        if (error) throw error;
        
        
        res.json({ data : results})
      });
}




exports.getById = ( id , res ) => {

    dbconnection.query("SELECT * from mot where id = ?" , [id] ,  (error,results)=> {
        if (error) throw error;
        
        
        res.json({ data : results})
      });
}




exports.create = (libelle , traduction , listeId , res) => {

    let newRecord = {
		libelle : libelle,
		traduction : traduction,
		listeId : listeId
	}

	let today = new Date().toISOString().split('T')[0]
	console.log(newRecord)
	dbconnection.query("INSERT INTO mot ( libelle , traduction , date_ajout,   liste_id)  VALUES  (?,?,'"+today +"', ?) " , 
	Object.values(newRecord) , (error, results) =>{
		if (error) throw error;

		res.json({ status : 'success' , data : results})
	} )


}



exports.update = (id , libelle , traduction ,  res) => {

    
    let newRecord = {
        libelle : libelle  ,
        traduction : traduction,
        
    }
     
    let sql = "UPDATE mot SET libelle = ? , traduction = ?   WHERE id = '"+id +"' "
    dbconnection.query( sql , Object.values(newRecord) , (error , results ) =>{
        if (error) throw error;


        if( res.affectedRows == 0){
            res.json({ status : 'failed' })
            return
        }
        
        const newItem = { id : id , ...newRecord }
        console.log("data : "+ results)
        res.send({ status : 'success' , data : newItem  })
    })


}


exports.delete = (id , res) => {

    dbconnection.query("DELETE FROM sont_synonyme where mot_id = ?" , [id] ,  (error,results)=> {
        if (error) throw error;
        


        dbconnection.query("DELETE FROM mot where id = ?" , [id] ,  (error,results)=> {
            if (error) throw error;
            
            
            res.json({ data : results})
          });
        
       
      });

    

}



exports.deleteAll = res => {

    dbconnection.query("DELETE FROM mot "  , ( error , results )=>{
		if (error) throw error 

		res.json({data : results})
	})
}