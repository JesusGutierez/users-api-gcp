const { Router } = require('express')
const router = Router()

const admin = require("firebase-admin")

const db = admin.firestore()

router.post("/api/users", async (req, res) => {
    try {
        await db
            .collection("users")
            .doc("/" + req.body.id + "/")
            .create({ name: req.body.name, lastName: req.body.lastName, email: req.body.email  })
        return res.status(204).json();
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get("/api/users/:user_id", async (req, res) => {
    try {
        const doc = db.collection("users").doc(req.params.user_id)
        const item = await doc.get()
        const response = item.data()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.get("/api/users", async (req, res) => {
    try {
        const query = await db.collection("users")
        const querySnapshot = await query.get()
        const docs = querySnapshot.docs

        const response = docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            lastName: doc.data().lastName,
            email: doc.data().email
        }))

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json()
    }

})

router.delete("/api/users/:user_id", async (req, res) => {
    try {
        const document = db.collection('users').doc(req.params.user_id)
        await document.delete()
        return res.status(200).json()
    } catch (error) {
        return res.status(500).json()
    }
})

router.put("/api/users/:user_id", async (req, res) => {
    try {
        const document = db.collection('users').doc(req.params.user_id)
        await document.update({
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email
        })
        return res.status(200).json()
    } catch (error) {
        return res.status(500).json()
    }
})

module.exports = router