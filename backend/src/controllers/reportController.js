import Order from "../models/OrderModel.js"

// Get Top Selling Items

export const getTopSellingMenuItems=async(req,res,next)=>{
    try{
        const result=await Order.aggregate([
            {$unwind:"$items"},
            {
                $group:{
                    _id:"$items.menuItem",
                    totalQuantitySold:{$sum:"$items.quantity"}
                },
            },
            {
                $lookup:{
                    from: "menuitems",
                    localField:"_id",
                    foreignField:"_id",
                    as:"menuItemDetails",

                },
            },
            { $unwind: "$menuItemDetails" },

      // 5. Sort by quantity sold
      { $sort: { totalQuantitySold: -1 } },

      // 6. Limit top 5
      { $limit: 5 },

      // 7. Shape final response
      {
        $project: {
          _id: 0,
          menuItemId: "$menuItemDetails._id",
          name: "$menuItemDetails.name",
          category: "$menuItemDetails.category",
          price: "$menuItemDetails.price",
          totalQuantitySold: 1,
        },
      },
        ])
         res.status(200).json({
      success: true,
      data: result,
    });


    }catch(error){
        next(error)
    }
}