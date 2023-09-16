const express=require('express');//including the package used in project
const cors =require('cors');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('./models/User.js');//the schema used in project
const Product=require('./models/Product.js');
const Order=require('./models/Order.js');
const cookieParser=require('cookie-parser');
const imageDownloader=require('image-downloader');
const multer=require('multer');
const fs=require('fs');

require('dotenv').config()
const app=express();
const bcryptSalt=bcrypt.genSaltSync(10);
const jwtSecret='apidkwbsapidkwbsapidkwbsapidkwbs';
app.use(express.json());

app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));
mongoose.connect(process.env.MONGO_URL);
app.get('/test',(req,res)=>{
    res.json('test ok');
});

   

app.post('/register',async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const userDoc=await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        });
        res.json(userDoc);
    }
      catch(e)
      {
           res.status(422).json(e);
      }
    
})
app.post('/login',async(req,res)=>{
    const{email,password}=req.body;
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
app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    if(token){
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        if(err) throw err;
       const {name,email,_id}=await  User.findById(userData.id);
        res.json({name,email,_id});
    })

    
}
    else
    res.json(null);
    
})
app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})
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
    const{title,owneraddress,addedPhotos,description,perks,catagory,stock,price}=req.body;
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        if(err) throw err;
     const productDoc= await Product.create({
               owner:userData.id,
               title,owneraddress,photos:addedPhotos,description,perks,catagory,stock,price,
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
    const{id,title,owneraddress,addedPhotos,description,perks,catagory,stock,price}=req.body; 
    
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        if (err) throw err;
        const productDoc=await Product.findById(id);
        if(userData.id===productDoc.owner.toString()){
           productDoc.set({
            
               title,owneraddress,photos:addedPhotos,description,perks,catagory,stock,price,
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
app.listen(4000);