var express = require("express");
var router = express.Router();

const {
  addOrUpdateCharacter,
  getCharacters,
  deleteCharacter,
  getCharacterById,
} = require("./dynamo");

router.get("/apps/harrypotter", async (req, res) => {
  try {
    res.render("apps/harryPotter");
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.get("/apps/harrypotter/characters", async (req, res) => {
  try {
    const characters = await getCharacters();
    res.json(characters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.get("/apps/harrypotter/names", async (req, res) => {
  try {
    const characters = await getCharacters();
    res.render("apps/names");
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.get("/apps/harrypotter/characters/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const character = await getCharacterById(id);
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.post("/apps/harrypotter/characters", async (req, res) => {
  const character = req.body;
  try {
    const newCharacter = await addOrUpdateCharacter(character);
    res.json(newCharacter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.put("/apps/harrypotter/characters/:id", async (req, res) => {
  const character = req.body;
  const { id } = req.params;
  character.id = id;
  try {
    const newCharacter = await addOrUpdateCharacter(character);
    res.json(newCharacter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.delete("/apps/harrypotter/characters/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await deleteCharacter(id));
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

module.exports = router;
