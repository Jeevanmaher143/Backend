// const Contact = require("../models/Contact");

// // ADD MEMBER
// exports.addMember = async (req, res) => {
//   try {
//     const { name, role, phone, email } = req.body;

//     const member = new Contact({
//       name: req.body.name,
//       role: req.body.role,
//       phone: req.body.phone,
//       email: req.body.email,
//       photo: req.file ? `/uploads/contacts/${req.file.filename}` : "",
//     });

//     await member.save();
//     res.status(201).json(member);
//   } catch (error) {
//     res.status(500).json({ message: "Member not saved" });
//   }
// };

// // GET ALL
// exports.getMembers = async (req, res) => {
//   const members = await Contact.find();
//   res.json(members);
// };

// // UPDATE
// exports.updateMember = async (req, res) => {
//   const updated = await Contact.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json(updated);
// };

// // DELETE
// exports.deleteMember = async (req, res) => {
//   await Contact.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// };

const Contact = require("../models/Contact");

// ADD MEMBER
exports.addMember = async (req, res) => {
  try {
    const member = new Contact({
      name: req.body.name,
      role: req.body.role,
      phone: req.body.phone,
      email: req.body.email,
      photo: req.file ? req.file.path : "", // CLOUDINARY URL
    });

    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: "Member not saved" });
  }
};

// GET MEMBERS
exports.getMembers = async (req, res) => {
  const members = await Contact.find();
  res.json(members);
};

// UPDATE MEMBER
exports.updateMember = async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// DELETE MEMBER
exports.deleteMember = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
