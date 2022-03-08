const express = require('express')
const middlewareCntroller = require('../controllers/middlewareController')

var router = express.Router()

//DB models
const CategoryModule = require('../models/category')

//=========================================================
router.get('/category', middlewareCntroller.verifyTokenAndQAAuth, (req, res) => {
    return res.status(200).json({ success: true, role: req.user.role })
})

//category Post
router.post('/category', middlewareCntroller.verifyTokenAndQAAuth, async (req, res) => {
    const title = req.body.title

    if (!title) {
        res.status(401).json({ success: false, message: 'thieu tieu de' })
    }

    try {
        //check ex in db
        const category = await CategoryModule.findOne({title: title})
        if(category) {
            return res.status(401).json({ success: false, message: 'Category da ton tai' })
        }

        const saveCategory = await CategoryModule({ title })
        await saveCategory.save()

        //all ok
        return res.status(200).json({ success: true, message: 'Save category success' })
    } catch (error) {
        return res.status(401).json({ success: false, message: 'erro server' })
    }
})

//Get All Category
router.get('/all-category', middlewareCntroller.verifyTokenAndQAAuth, async (req, res) => {

    try {
        const categorys = await CategoryModule.find()

        if (categorys == '') {
            return res.status(200).json({ message: 'Chua co category', success: false })
        }

        res.status(200).json({ dataCategorys: categorys, success: true })

    } catch (error) {
        return res.status(500).json({ success: false, message: 'loi server' + error })
    }
})

//Get one category
router.get('/category/:id', middlewareCntroller.verifyTokenAndQAAuth,async (req, res) => {
    const id = req.params.id
  
    try {
        const data = await CategoryModule.findById({ _id: id })
  
        if (!data) {
            return res.status(401).json({ success: false, message: 'Categoy khong ton tai' })
        }
  
        return res.status(200).json({ success: true, data})
    } catch (error) {
        res.json(error)
    }
  
  })

//Edit Category
router.put('/category/:id', middlewareCntroller.verifyTokenAndQAAuth, async (req, res) => {
    const id = req.params.id
    const title = req.body.title
    try {
        const data = await CategoryModule.findByIdAndUpdate({ _id: `${id}` }, {title})
  
        if (!data) {
            return res.status(401).json({ success: false, message: 'tai khoan khong ton tai' })
        }
  
        return res.status(200).json({ success: true, message: 'cap nhat thanh cong' })
    } catch (error) {
        res.json(error)
    }
  })

// Del Category
router.delete('/category/:id', middlewareCntroller.verifyTokenAndQAAuth, async (req, res) => {
    const id = req.params.id
    try {
        const data = await CategoryModule.findByIdAndDelete({ _id: `${id}` })

        if (!data) {
            return res.status(401).json({ success: false, message: 'Category khong ton tai' })
        }

        return res.status(200).json({ success: true, message: 'xoa thanh cong' })
    } catch (error) {
        res.json(error)
    }
})

module.exports = router