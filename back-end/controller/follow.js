const { addFollow ,getAllCurrent ,getAllForeign } = require("../prisma/module/follow");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// exports.addNewFollow = async (req, res) => {
//   const { current, foreign } = req.body; // Assuming that req.body contains the current and foreign user IDs
// console.log(req.body)
//   try {
//     await addFollow(current, foreign); // Assuming addFollow function adds the follow relationship correctly

//     const followOne = await prisma.follows.findFirst({
//       where: {
//         current_user_id: current,
//         foreign_user_ids: foreign,
//       },
//     });
    
//     const followTwo = await prisma.follows.findFirst({
//       where: {
//         current_user_id: foreignUserId,
//         foreign_user_ids: currentUserId,
//       },
//     });

//     if (followOne && followTwo) {
//       console.log('good');
//       return res.status(200).json({ message: "Users follow each other" });
//     } else {
//       console.log("zaab");
//       return res.status(200).json({ message: "Users do not follow each other" });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

 exports.addNewFollow = async (req, res) => {
  const data = req.body;
  console.log(data)

  try{
    const follownew= await addFollow(data)
    console.log(follownew) 
    res.send("created")
  } catch (error){
    console.log(error)
    res.status(500).send('we have a error abonne ')
  }
};
   

exports.CurrentFollow=async(req,res)=> {
  const id = req.body;
  try {
    const currentFollowUsers = await getAllCurrent(id);
    res.status(200).json(currentFollowUsers);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'you have a error ' });
  }
}
exports.ForeignFollow=async(req,res)=> {
  const id = req.body;
  try {
    const foreignFollow = await getAllForeign(id);
    res.status(200).json(foreignFollow );
    console.log(foreignFollow)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'you have a error  ' });
  }
}