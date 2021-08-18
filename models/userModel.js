const dbconnection = require('../database/database.config')
const nanoid = require('nanoid')
const bcrypt = require('bcrypt')
const { json } = require('body-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config()



function getAccountId(userId){
    
    let res =  dbconnection.query(" select id from account where user_id = ? " , [userId]) 
    console.log(res.results)
}




function getListeId(userId){
    
    const results =dbconnection.query(" select liste_mots.id from liste_mots join account on account.id = liste_mots.account_id where account.user_id = ?" , [userId], (error, results)=>{
        if(error) throw error 
        var listeId = results[0].id
        return  listeId 
        
    })
        
}


exports.register = async(username , password , email , res) => {

    try {


    const newId = nanoid.nanoid()
    const newAccountId = nanoid.nanoid()
    const newListId = nanoid.nanoid()
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password , salt)
    //new user
    dbconnection.query("insert into user (id , username , password , email) values ( ? , ? , ? , ? ) " , [ newId, username , hashedPassword , email ] , (error , results , fields)=>{
        if( error) throw error ;

        //new account
        
        dbconnection.query("insert into account (id , user_id) values ( ? , ? ) " , [ newAccountId , newId ] )


        dbconnection.query("insert into liste_mots (id , libelle , account_id) values ( ? , ? , ? ) " , [ newListId , '', newAccountId ] )
        
    
    
    
  
    })


    }catch(error){
        res.status(500).send()
    }
    
  



}






/*async function  getUserInfos(userId){
    const accountId =  
    
    await dbconnection.query(" select liste_mots.id from liste_mots join account on account.id = liste_mots.account_id where account.user_id = ?" , [userId])

    return { accountId , listeMotsId }
}*/



exports.login =   (username , password , res) => {
        dbconnection.query("select * from user where username = ?", [username] , (error , results)=>{
        if(error)throw error
        const valid = bcrypt.compareSync(  password , results[0].password )
        console.log(username +" "+ password)
        if( !results || !valid ){
            res.json({connected : false})
        
        }

        else {
            const user = { username : results[0].username , id : results[0].id }
            dbconnection.query(" select liste_mots.id from liste_mots join account on account.id = liste_mots.account_id where account.user_id = ?" , [user.id], (error, results)=>{
                if(error) throw error 
                const listeId = results[0].id
            
                dbconnection.query(" select id from account where user_id = ? " , [user.id],(error, results)=>{
                    const accountId = results[0].id



                   
                    const accessToken = jwt.sign(user , process.env.ACCESS_TOKEN_SECRET , { expiresIn : '10m'} )
                    const refreshToken = jwt.sign(user , process.env.REFRESH_TOKEN_SECRET )
                    let userInfo = { username : user.username  , id : user.id , email : user.email , accountId , listeId , accessToken , refreshToken}
                    console.log(userInfo)

                    res.json( {   userInfo } )
                }) 
  
            })
            
            
            
            
        }
    })
        
    
}




exports.authenticateToken = ( req , res , next )=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.sendStatus(401)
    }
    jwt.verify( token , process.env.ACCESS_TOKEN_SECRET , (error , user)=>{
        if(error) return res.sendStatus(403)

        req.username = user.username
        req.id = user.id
        next()
    } )
    


}



