const { addsearch , deleteSearch ,getAllSearches ,getSearchById} = require("../prisma/module/search");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.addSearch = async (req, res) => {
    try {
      const data = req.body;
      const searchResults =await addsearch(data);
      res.json(searchResults);
    } catch (error) {
        console.log(error)
      res.status(500).send({ message: error.message });
    }
  };
  
  exports.deleteSearch = async (req, res) => {
    try {
      const id = req.params.id; // Assuming you pass the search ID in the URL parameter
      const deletedSearch = await deleteSearch(parseInt(id));
      res.json(deletedSearch);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  };
  exports.getAllSearches = async (req, res) => {
    try {
      const searches = await getAllSearches();
      res.json(searches);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  };
  
exports.getSearch=async (req, res)=>{
    const { id } = req.params; 
    console.log(id)
    try {
      const userSearch = await getSearchById(id)
      res.send(userSearch)
      console.log(userSearch)
    } catch (error){
      console.error(error);
      res.status(500).send(' Server Error');
    }
}
