const express=require('express');//including the package used in project
const cors =require('cors');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('./models/User.js');//the schema used in project
const Product=require('./models/Product.js');
//const Artist=require('./models/Artist.js');
const Order=require('./models/Order.js');
const cookieParser=require('cookie-parser');
const imageDownloader=require('image-downloader');
const multer=require('multer');
const fs=require('fs');


require('dotenv').config()
const app=express();
const bcryptSalt=bcrypt.genSaltSync(10);
//const bcryptSalt1=bcrypt.genSaltSync(10);
const jwtSecret='apidkwbsapidkwbsapidkwbsapidkwbs';
//const jwtSecret1='apidkwbsapidkwbsapidkwbsapidkwbs1';
app.use(express.json());

app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));
mongoose.connect(process.env.MONGO_URL);
app.get('/test',(req,res)=>{
    res.json('test ok1');
});

   

app.post('/register',async(req,res)=>{
    const {name,email,password,govno}=req.body;
    if(!name||!email||!password)
         res.status(404).send("Provide required information");
    try{
        const userDoc=await User.create({
            name,
            email,
            govno,
            password:bcrypt.hashSync(password,bcryptSalt)
            
        });
        res.json(userDoc);
    }
      catch(e)
      {
           res.status(422).json(e);
      }
    
})
/*app.post('/register-artist',async(req,res)=>{
    const {name,email,password,govno}=req.body;
    if(!name||!email||!password||govno)
         res.status(404).send("Provide required information");
    try{
        const artistDoc=await Artist.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt1),
            govno
        });
        res.json(artistDoc);
    }
      catch(e)
      {
           res.status(422).json(e);
      }
    
})*/
app.post('/login',async(req,res)=>{
    const{email,password}=req.body;
    if(!email||!password)
         res.status(404).send("Provide required information");
    const UserDoc=await User.findOne({email});
    if(UserDoc){
        const passOk=bcrypt.compareSync(password,UserDoc.password);
        if(passOk){
            jwt.sign({email:UserDoc.email,id:UserDoc._id},jwtSecret,{},(err,token)=>{
                if(err)throw err;
                res.cookie('token',token).json(UserDoc);
            });

        
        }
        else
res.status(422).json('pass not ok');
        }   
         else{
        res.json('not found');
    }
})
/*app.post('/login-artist',async(req,res)=>{
    const{email,password}=req.body;
    if(!email||!password)
         res.status(404).send("Provide required information");
    const ArtistDoc=await Artist.findOne({email});
    if(ArtistDoc){
        const passOk=bcrypt.compareSync(password,Artist.password);
        if(passOk){
            jwt.sign({email:ArtistDoc.email,id:ArtistDoc._id},jwtSecret1,{},(err,token1)=>{
                if(err)throw err;
                res.cookie('token',token1).json(ArtistDoc);
            });

        
        }
        else
res.status(422).json('pass not ok');
        }   
         else{
        res.json('not found');
    }
})*/
app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    if(token){
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        if(err) throw err;
       const {name,email,_id,govno}=await  User.findById(userData.id);
        res.json({name,email,_id,govno});
    })

    
}
    else
    res.json(null);
    
})
/*app.get('/profile-artist',(req,res)=>{
    const {token1}=req.cookies;
    if(token1){
    jwt.verify(token1,jwtSecret1,{},async(err,artistData)=>{
        if(err) throw err;
       const {name,email,_id,govno}=await  Artist.findById(artistData.id);
        res.json({name,email,_id,govno});
    })

    
}
    else
    res.json(null);
    
})*/
app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})
/*app.post('/logout-artist',(req,res)=>{
    res.cookie('token','').json(true);
})*/
app.post('/upload-by-link',async(req,res)=>{
    const {link}=req.body;
    const newName='photo'+Date.now()+'.jpg';
    console.log(newName);
    await imageDownloader.image({
        url:link,
        dest:__dirname+'/uploads/'+newName,
    })
    res.json(newName);
   

})

const photosMiddleware=multer({dest:'uploads'});
app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
    const uploadedFiles=[];
    for(let i=0;i<req.files.length;i++){
        const {path,originalname}=req.files[i];
        const parts=originalname.split('.');
        const ext=parts[parts.length-1];
        const newPath=path+'.'+ext;
        
        fs.renameSync(path,newPath);
        uploadedFiles.push(newPath.replace('uploads',''));
        

    }
         res.json(uploadedFiles);
})

app.post('/products',async(req,res)=>{
    const {token}=req.cookies;
    const{title,owneraddress,addedPhotos,description,perks,catagory,stock,price,district,artistdes,history,artistauth}=req.body;
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        if(err) throw err;
     const productDoc= await Product.create({
               owner:userData.id,
               title,owneraddress,photos:addedPhotos,description,perks,catagory,stock,price,district,artistdes,history,artistauth
        })
        res.json(productDoc);
    })
   
})
app.get('/user-products',async(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        const {id}=userData;
        res.json(await Product.find({owner:id}))
    })
})
app.get('/products/:id',async(req,res)=>{
    const {id}=(req.params);
    res.json(await Product.findById(id));
})
app.put('/products',async(req,res)=>{
   
    const {token}=req.cookies;
    const{id,title,owneraddress,addedPhotos,description,perks,catagory,stock,price,district,artistdes,history,artistauth}=req.body; 
    
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        if (err) throw err;
        const productDoc=await Product.findById(id);
        if(userData.id===productDoc.owner.toString()){
           productDoc.set({
            
               title,owneraddress,photos:addedPhotos,description,perks,catagory,stock,price,district,artistdes,history,artistauth
           })
           await productDoc.save();
           res.json('ok');
        }
    })
})
app.get('/products',async(req,res)=>{
    res.json(await Product.find());
})
function getUserDataFromReq(req){
    return new Promise((resolve,reject)=>{
       jwt.verify(req.cookies.token,jwtSecret,{},async(err,userData)=>{
           if (err) throw err;
             resolve(userData);
       });
    });
}
app.post('/orders',async(req,res)=>{
    const userData=await getUserDataFromReq(req);
    const{product,home_address,contact_no,items,price}=req.body;
    Order.create({product,home_address,contact_no,items,price,user:userData.id}).then((doc)=>{
       
        res.json(doc);
    }).catch((err)=>{
          throw err;
    });
});

app.get('/orders',async(req,res)=>{
   const {token}=req.cookies;
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        const {id}=userData;
        res.json(await Order.find({user:id}));
});
});
app.delete('/products/delete/:id',async(req,res)=>{
   const {id:productid}=req.params;
   const p=await Product.findOneAndDelete({_id:productid});
   if(!p)
      res.status(404).send("No Product With Given Id"+productid);
       res.status(200).json({p});
})
  app.get('/search',async(req,res)=>{
    const {title,catagory}=req.query;
    const queryObject={};
    if(title)
    queryObject.title=title;
    if(catagory)
    queryObject.catagory=catagory;
    const p1=await Product.find(queryObject);
    res.status(200).json({p1});
  })    
app.listen(4000);

