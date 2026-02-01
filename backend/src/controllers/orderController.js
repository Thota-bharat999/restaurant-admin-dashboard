import Order from "../models/OrderModel.js";

// Create a new Order
export const createOrder=async(req,resizeBy,next)=>{
    try{
        const{items,customerName,tableNumber}=req.body;
        // console.log(items);
        if(!items || items.length===0){
            return resizeBy.status(400).json({
                success:false,
                message:"Order must contain at least one item"
            })
        }
        const totalAmount=items.reduce((sum,item)=>
            sum+item.price*item.quantity,0
        );
        const newOrder=await Order.create({
            items,
            totalAmount,
            customerName,
            tableNumber
        });
        resizeBy.status(201).json({
            success:true,
            data:newOrder
        })

    }catch(error){
        next(error)
    }
}

// Get All Orders with filters
export const getAllOrders=async(req,res,next)=>{
    try{
        const{status,page=1,limit=10}=req.query;
        const filter={}
        if(status) filter.status=status;
        const skip=(Number(page-1)*Number(limit))
        const orders=await Order.find(filter)
        .sort({createdAt:-1})
        .skip(skip)
        .limit(Number(limit))
        const totalOrders=await Order.countDocuments(filter);
        res.status(200).json({
            success:true,
            totalOrders,
            currentPage:Number(page),
            totalPages:Math.ceil(totalOrders/limit),
            data:orders,
        })

    }catch(error){
        next(error)
    }
}

// get Single Order by Id 
export const getOrderById=async(req,res,next)=>{
    try{
        const order=await Order.findById(req.params.id).populate("items.menuItem");
        if(!order){
            return res.status(404).json({
                success:false,
                message:"Order not found"
            })
        }
        res.status(200).json({
            success:true,
            data:order,
        });

    }catch(error){
        next(error)
    }
}
// Update Order Status
export const updateOrderStatus=async(req,res,next)=>{
    try{
        const {status}=req.body;
        if(!status){
            return res.status(400).json({
                success:false,
                message:"Status is required"
            })
        }
        const order=await Order.findByIdAndUpdate(
            req.params.id,
            {status},
            {new:true,runValidators:true}
        )
        if(!order){
            return res.status(404).json({
                success:false,
                message:"Order not found"
            })
        }
        res.status(200).json({
            success:true,
            data:order
        })
    }catch(error){
        next(error)
    }
}