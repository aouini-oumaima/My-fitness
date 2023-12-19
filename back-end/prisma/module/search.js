const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

async function addsearch(data){
    console.log(data)
  const search=  await prisma.search_history.create({
        data: {
          search_history_id: data.search_history_id,
          user_id: data.user_id,
        },
      });
      return search;
}
async function deleteSearch(id) {
    const deletedSearch = await prisma.search_history.delete({
      where: {
        id: parseInt(id),
      },
    });
    return deletedSearch;
  }
  async function getAllSearches() {
    const searches = await prisma.search_history.findMany();
    return searches;
  }
  async function getSearchById(id) {
    const userSearch = await prisma.search_history.findMany({  
       where: {
         user_id: id
       }
    })
    return userSearch;
}

module.exports = {addsearch , deleteSearch ,getAllSearches,getSearchById}