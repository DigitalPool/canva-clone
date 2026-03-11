const express = require('express')
const router = express.Router()
const authenticatedRequest = require('../middleware/auth-middleware')
const designControllers = require('../controllers/design-controller')

router.use(authenticatedRequest)

// Remember that the authenticatedRequests will reject the user, 
// if their id is not authenticated for the request or resources 
// they are trying to access. And if it is authenticated, it calls 
// the next method to tell the router to procees to the next things in the Routes file.

router.get('/', designControllers.getUserDesigns)
router.get('/:id', designControllers.getUserDesignsbyId)
router.post('/', designControllers.saveDesign)
router.delete('/:id', designControllers.deleteDesign)

module.exports = router