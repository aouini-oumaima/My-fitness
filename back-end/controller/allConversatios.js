const {createConversation, findUsers, handleMessage, latestMessage, getConversation}=require("../prisma/module/conversations")



exports.newConversation = async (req, res) => {
    try {
      const data = req.body;
  
    
  
      const createNewConversation = await createConversation(data);
     
      res.send(createNewConversation);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  exports.newMessage= async (req, res) =>{

    try {
      const msg = req.body;


      const createmsg = await handleMessage(msg)
      res.send(createmsg);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }


  exports.newLatest= async (req, res)=>{


    try{
      const latestmsg= await latestMessage(req.body)
res.send(latestmsg)
    } catch(err){
      console.log(err)
      res.status(500).send('Internal Server Error');
    }
  }

  exports.getAllConversations= async (req, res)=>{

console.log(req.params.uid)
    try{
      const allConv= await getConversation(req.params.uid)
res.send(allConv)
    } catch(err){
      console.log(err)
      res.status(500).send('Internal Server Error');
    }
  }