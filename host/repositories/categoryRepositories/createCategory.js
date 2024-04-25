import Category from '../../models/Categories.js'

export default async function createCategory(category){
  try {
    return await Category.create(category)
  } catch (error) {
    console.log(error)
  }
}