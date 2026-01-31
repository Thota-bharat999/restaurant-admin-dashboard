import MenuItem from "../models/MenuItemModel.js";


export const createMenuItem=async(req,resizeBy,next)=>{
    try{
        const{ name,
      description,
      category,
      price,
      ingredients,
      preparationTime,
      imageUrl,}=req.body
if(!name || !category || price===undefined || price<=0){
    return resizeBy.status(400).json({
        success:false,
        message:"Name, category, and price are required"
    })

}
const newMenuItem=await MenuItem.create({
       name,
      description,
      category,
      price,
      ingredients,
      preparationTime,
      imageUrl,
})
await newMenuItem.save()
resizeBy.status(201).json({
    success:true,
    data:newMenuItem
})

    }catch(error){
        next(error)
    }
}
// Get All Menu Items
export const getAllMenuItems=async(req,res,next)=>{
    try{
        const{category,isAvailable,minPrice,maxPrice}=req.query
        const filter={}
        if(category) filter.category=category
        if(isAvailable)
            filter.isAvailable=isAvailable==="true"
        if(minPrice || maxPrice){
            filter.price={}
            if(minPrice) filter.price.$gte=Number(minPrice)
            if(maxPrice) filter.price.$lte=Number(maxPrice)
        }
    const menuItems=await MenuItem.find(filter).sort({createdAt:-1});
    res.status(200).json({
        success:true,
        count: menuItems.length,
        data: menuItems,
    })

    }catch(error){
        next(error)
    }

}
// Get Single Menu Item
export const getMenuItem=async(req,res,next)=>{
    try{
        const menuItem=await MenuItem.findById(req.params.id);
        if(!menuItem){
            return res.status(404).json({
                success:false,
                message:"Menu Item not found"
            })
        }
        res.status(200).json({
            success:true,
            data:menuItem
        })

    }catch(error){
        next(error)
    }
}
// Update Menu Item
export const updateMenuItem=async(req,res,next)=>{
    try{
        const updateItem=await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true,runValidators:true}
        );
        if(!updateItem){
            return res.status(404).json({
                success:false,
                message:"Menu Item not found"
            })
        }
        res.status(200).json({
            success:true,
            data:updateItem,
        })

    }catch(error){
        next(error)
    }
}
// Delete Menu Item 
export const deleteMenuItem=async(req,res,next)=>{
    try{
        const deleteItem=await MenuItem.findByIdAndDelete(req.params.id);
        if(!deleteItem){
            return res.status(404).json({
                success:false,
                message:"Menu Item not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Menu Item deleted successfully"
        })
    }catch(error){
        next(error)
    }
}
// Search Menu Items
export const toggleAvailability=async(req,res,next)=>{
    try{
        const menuItem=await MenuItem.findById(req.params.id);
        if(!menuItem){
            return res.status(404).json({
                success:false,
                message:"Menu Item not found"
            })
        }
        menuItem.isAvailable=!menuItem.isAvailable
        await menuItem.save()
        res.status(200).json({
            success:true,
            data:menuItem
        })
    }catch(error){
        next(error)
    }
}