const Design = require('../models/design')

//we will create controllers for
//getUserDesigns
//getUserDesignsById
//saveDesign
//deleteDesign

exports.getUserDesigns = async (req, res) => {
    //get the user Id
    //get all the designs of this user, then sort by updatedAt
    //return res.status 200, success as true
  try {
    const userId = req.user.userId
    // const designs = (await Design.find({userId})).sort({updatedAt: -1})
    const designs = (await Design.find({userId})).sort()
    res.status(200).json({
        success: true,
        data: designs
    })
  } catch (e){
    console.error("Error fetching designs: ", e)
    //res.status...
    res.status(500).json({
        success: false,
        message: 'Failed to fetch designs'
    })
  }
}

exports.getUserDesignsbyId = async (req, res) => {
  try {
      //get the user Id
      //get the id of the particular Design being requested for
      //find the particular design requested by user, using findone
      //if not desig present retuen 404 status
      //return res.status 200, success as true if the design is found
    const userId = req.user.userId
    if(!userId){res.status(404).json('Cant access designs, You need to login first')}

    const designId = req.params.id

    const design = await Design.findOne({_id: designId, userId})
    if(!design){
        res.status(404).json({
            success: false,
            message: 'Design not find, or you do not have permission to view this design'
        })
    }

    res.status(200).json({
        success: true,
        data: design,
        message: "Design downloaded successfully "
    })
  } catch (error){
    console.log(`Error getting design by ID ${error}`)
    res.status(500).json({
        success: false,
        message: 'Failed to fetch design by ID'
    })
  }
}


exports.saveDesign = async (req, res) => {
  try {
    //get the user Id, 
    // get from req the design data = design Id, name canvasData, width, height, category,
    //if there is a design id, then updateId
    //if each data was sent, then update that design with the data sent
    //also save the time design was updated
    // const updatedDesign = await design.save()
    //return res.status 200, success as true with data: updatedDesign

    const userId = req.user.userId
    if(!userId){res.status(404).json('Cant access designs, You need to login first')}

    const {designId, name, canvasData, width, height, category } = req.body

    if(designId){
        const design = await Design.findOne({_id: designId, userId})
        if(!design){
            res.status(404).json({
                success: false,
                message: 'Error you dont have permissions to save to this design'
            })
        }

        if (name) design.name = name
        if (canvasData) design.canvasData = canvasData
        if (width) design.width = width
        if (height) design.height = height
        if (category) design.category = category

        design.updatedAt = Date.now()
        const updatedDesign = await design.save()

        res.status(200).json({
            success: true,
            data: updatedDesign,
            message: 'Design updated successfully'
        })
    } else {
        //Now in the scenarie where the design is not present, we create a new design
        //cosnst saveDesign = await newDesign.save(), and we return it
        // return res.status 200, success as true with data: newDesign
        const newDesign = new Design({
            userId,
            name: name || 'Untitled Design',
            canvasData,
            width,
            height,
            category
        })
        
        const savedDesign = await newDesign.save()

        res.status(200).json({
            success: true,
            data: savedDesign,
            message: 'Design saved successfully'
        })
    }
  } catch (error){
    console.log(`Error while saving design: ${error}`)
    //res.status...
    res.status(500).json({
        success: false,
        message: 'Error saving design'
    })
  }
}

exports.deleteDesign = async (req, res) => {
  try {
    //get the user Id, 
    // get from req the design data = design Id, name canvasData, width, height, category, 
    // const design = await Design.findOne({_id: designId, userID})
    // if deisng is not found or no permission, return error 404

    const userId = req.user.id
    const designId = req.params.id

    const design = Design.findOne({_id : designId, userId})
    if (!design){
        res.status(404).json({
            success: false,
            message: 'cant find requested file to delete'
        })
    }

    Design.deleteOne({_id: designId})

    res.status(404).json({
            success: success,
            message: 'design deleted successfully'
        })
    

    //if design found and can delete, Design.deleteOne({id: designId})
    // return res.status 200, success as true with message: deleted successfully

  } catch (e){
    console.log(`Error while deleting design: ${error}`)
    //res.status...
    res.status(500).json({
        success: false,
        message: 'Error deleting design'
    })
  }
}
